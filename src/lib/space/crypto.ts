/**
 * Minimal WebCrypto helpers for the private space.
 *
 * Everything here runs on the client. There is no server, no key escrow and
 * no recovery path: a forgotten passcode means the data is gone, by design.
 * That is the point — see `vault.ts` for the threat model.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/** OWASP-recommended floor for PBKDF2-HMAC-SHA256 (2023+). */
export const PBKDF2_ITERATIONS = 310_000;

/** True when the browser exposes SubtleCrypto (needs a secure context). */
export function hasSubtleCrypto(): boolean {
  return (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.subtle !== "undefined" &&
    typeof globalThis.crypto.subtle.deriveKey === "function"
  );
}

export function randomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

export function randomId(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return Array.from(randomBytes(16), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function toBase64(bytes: Uint8Array): string {
  let binary = "";
  // Chunked to stay clear of the argument-count limit on large payloads.
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

export function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Stretches a passcode into an AES-GCM key. Intentionally slow. */
export async function deriveKey(
  passcode: string,
  salt: Uint8Array,
  iterations = PBKDF2_ITERATIONS,
): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passcode.normalize("NFKC")),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export type Sealed = { iv: string; ct: string };

export async function seal(key: CryptoKey, value: unknown): Promise<Sealed> {
  const iv = randomBytes(12);
  const plaintext = encoder.encode(JSON.stringify(value));
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    plaintext as BufferSource,
  );
  return { iv: toBase64(iv), ct: toBase64(new Uint8Array(ct)) };
}

/**
 * Throws if the key is wrong — AES-GCM authenticates, so a failed decrypt
 * is exactly how a wrong passcode is detected. No separate verifier needed.
 */
export async function unseal<T>(key: CryptoKey, sealed: Sealed): Promise<T> {
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(sealed.iv) as BufferSource },
    key,
    fromBase64(sealed.ct) as BufferSource,
  );
  return JSON.parse(decoder.decode(plaintext)) as T;
}
