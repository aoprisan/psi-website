import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { createHash } from "node:crypto";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// `base` differs by target:
//   - dev (`vite`):              "/"               — root, easy local URL
//   - web build (`vite build`):  "/psi-website/"   — GitHub Pages project path
//   - mobile build (MOBILE=1):   "./"              — relative for Capacitor
export default defineConfig(({ command }) => {
  const isMobile = process.env.MOBILE === "1";
  const isBuild = command === "build";

  let base = "/";
  if (isMobile) base = "./";
  else if (isBuild) base = "/psi-website/";

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      // Capacitor ships the whole bundle inside the app already, and service
      // workers do not run from its custom scheme — so web builds only.
      ...(isMobile ? [] : [offlinePlugin(base)]),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      target: "es2022",
      sourcemap: false,
    },
    server: {
      port: 3000,
    },
  };
});

/**
 * Emits a service worker that precaches the whole build.
 *
 * The private space is meant to be reachable during a panic attack, in a
 * basement, on a dying connection. Anything less than "works with the
 * network off" is a promise the app cannot keep — and since the app has no
 * backend, full precaching is both sufficient and cheap.
 *
 * Written by hand rather than pulled in as a dependency: the whole point is
 * that this site makes no requests it does not control.
 */
function offlinePlugin(base: string): Plugin {
  let publicDir = "";
  return {
    name: "psi-offline",
    apply: "build",
    configResolved(config) {
      publicDir = config.publicDir;
    },
    generateBundle(_options, bundle) {
      const files = Object.keys(bundle)
        .filter((name) => name !== "sw.js")
        .map((name) => base + name);
      // Files under `public/` are copied straight through and never appear
      // in the rollup bundle, so they have to be walked separately.
      const statics = listFiles(publicDir).map((name) => base + name);
      // The shell must be cached under the path the browser actually
      // navigates to, not just as "index.html".
      const precache = [...new Set([base, base + "index.html", ...files, ...statics])];
      const version = createHash("sha256")
        .update(precache.join("|"))
        .digest("hex")
        .slice(0, 12);

      this.emitFile({
        type: "asset",
        fileName: "sw.js",
        source: serviceWorkerSource(base, precache, version),
      });
    },
  };
}

/** Relative paths of every file under `dir`, recursively. */
function listFiles(dir: string, prefix = ""): string[] {
  if (!dir || !existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...listFiles(join(dir, entry.name), name));
    else out.push(name);
  }
  return out;
}

function serviceWorkerSource(base: string, precache: string[], version: string): string {
  return `/* Generated at build time — do not edit. */
const CACHE = "psi-space-${version}";
const PRECACHE = ${JSON.stringify(precache, null, 2)};
const SHELL = ${JSON.stringify(base + "index.html")};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Routing is hash-based, so every navigation resolves to the same shell.
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match(SHELL).then((cached) => cached || fetch(request)),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
    }),
  );
});
`;
}
