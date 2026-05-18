import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

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
    plugins: [react(), tailwindcss()],
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
