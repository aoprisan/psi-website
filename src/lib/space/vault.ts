/**
 * The vault — local, offline storage for the private space.
 *
 * Threat model, stated plainly so the UI can be honest about it:
 *
 *   - Nothing here ever touches a network. There is no endpoint to send to.
 *   - "passcode" mode encrypts the payload with AES-256-GCM under a key
 *     stretched from the passcode (PBKDF2-SHA256, 310k iterations). Someone
 *     with the unlocked device, a stolen phone backup or read access to
 *     localStorage sees only ciphertext.
 *   - "open" mode stores plain JSON. It protects nothing beyond staying on
 *     the device — the UI must say so rather than imply security.
 *   - There is no recovery. A forgotten passcode is unrecoverable data, and
 *     that trade-off is deliberate for a mental-health journal.
 */

import {
  PBKDF2_ITERATIONS,
  deriveKey,
  fromBase64,
  hasSubtleCrypto,
  randomBytes,
  seal,
  toBase64,
  unseal,
  type Sealed,
} from "./crypto";
import { emptySpaceData, normalizeSpaceData, type SpaceData } from "./types";

const STORAGE_KEY = "lo.space.v1";

export type VaultMode = "open" | "passcode";

type Envelope =
  | { v: 1; mode: "open"; data: unknown }
  | {
      v: 1;
      mode: "passcode";
      kdf: "PBKDF2-SHA256";
      iters: number;
      salt: string;
      iv: string;
      ct: string;
    };

export class WrongPasscodeError extends Error {
  constructor() {
    super("Cod incorect");
    this.name = "WrongPasscodeError";
  }
}

export class StorageUnavailableError extends Error {
  constructor() {
    super("Stocarea locală nu este disponibilă");
    this.name = "StorageUnavailableError";
  }
}

/** Private browsing / disabled storage must degrade, not throw at import. */
function storage(): Storage {
  try {
    const probe = "__lo_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    throw new StorageUnavailableError();
  }
}

export function storageAvailable(): boolean {
  try {
    storage();
    return true;
  } catch {
    return false;
  }
}

function readEnvelope(): Envelope | null {
  let raw: string | null;
  try {
    raw = storage().getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Envelope;
    if (parsed && parsed.v === 1 && (parsed.mode === "open" || parsed.mode === "passcode")) {
      return parsed;
    }
  } catch {
    /* Corrupt payload — treated as "no vault" rather than blocking the page. */
  }
  return null;
}

function writeEnvelope(envelope: Envelope): void {
  storage().setItem(STORAGE_KEY, JSON.stringify(envelope));
}

/** Whether any data has been saved on this device yet. */
export function vaultExists(): boolean {
  return readEnvelope() !== null;
}

/** The mode of the stored vault, or null when nothing is stored. */
export function vaultMode(): VaultMode | null {
  return readEnvelope()?.mode ?? null;
}

export function encryptionSupported(): boolean {
  return hasSubtleCrypto();
}

/**
 * An unlocked vault. Holds the derived key in memory only — dropping the
 * instance (or calling `lock()` on the context) forgets it.
 */
export class Vault {
  readonly mode: VaultMode;
  #key: CryptoKey | null;
  #salt: Uint8Array | null;
  #iters: number;

  private constructor(mode: VaultMode, key: CryptoKey | null, salt: Uint8Array | null, iters: number) {
    this.mode = mode;
    this.#key = key;
    this.#salt = salt;
    this.#iters = iters;
  }

  /** Creates a brand-new vault. `passcode === null` means open mode. */
  static async create(passcode: string | null): Promise<{ vault: Vault; data: SpaceData }> {
    const data = emptySpaceData();
    if (passcode === null || !hasSubtleCrypto()) {
      const vault = new Vault("open", null, null, 0);
      await vault.write(data);
      return { vault, data };
    }
    const salt = randomBytes(16);
    const key = await deriveKey(passcode, salt, PBKDF2_ITERATIONS);
    const vault = new Vault("passcode", key, salt, PBKDF2_ITERATIONS);
    await vault.write(data);
    return { vault, data };
  }

  /**
   * Opens the stored vault. Pass the passcode for encrypted vaults; throws
   * `WrongPasscodeError` when the key does not authenticate.
   */
  static async unlock(passcode?: string): Promise<{ vault: Vault; data: SpaceData }> {
    const envelope = readEnvelope();
    if (!envelope) throw new Error("Nu există date salvate pe acest dispozitiv.");

    if (envelope.mode === "open") {
      return {
        vault: new Vault("open", null, null, 0),
        data: normalizeSpaceData(envelope.data),
      };
    }

    if (!hasSubtleCrypto()) throw new Error("Criptarea nu este disponibilă în acest browser.");
    const salt = fromBase64(envelope.salt);
    const key = await deriveKey(passcode ?? "", salt, envelope.iters);
    let data: unknown;
    try {
      data = await unseal<unknown>(key, { iv: envelope.iv, ct: envelope.ct });
    } catch {
      throw new WrongPasscodeError();
    }
    return {
      vault: new Vault("passcode", key, salt, envelope.iters),
      data: normalizeSpaceData(data),
    };
  }

  async write(data: SpaceData): Promise<void> {
    if (this.mode === "open" || !this.#key || !this.#salt) {
      writeEnvelope({ v: 1, mode: "open", data });
      return;
    }
    const sealed: Sealed = await seal(this.#key, data);
    writeEnvelope({
      v: 1,
      mode: "passcode",
      kdf: "PBKDF2-SHA256",
      iters: this.#iters,
      salt: toBase64(this.#salt),
      iv: sealed.iv,
      ct: sealed.ct,
    });
  }

  /**
   * Re-keys the vault in place. `next === null` downgrades to open mode,
   * which the UI must present as removing protection.
   */
  static async rekey(data: SpaceData, next: string | null): Promise<Vault> {
    if (next === null || !hasSubtleCrypto()) {
      const vault = new Vault("open", null, null, 0);
      await vault.write(data);
      return vault;
    }
    const salt = randomBytes(16);
    const key = await deriveKey(next, salt, PBKDF2_ITERATIONS);
    const vault = new Vault("passcode", key, salt, PBKDF2_ITERATIONS);
    await vault.write(data);
    return vault;
  }

  /** Removes every trace from this device. Irreversible, and meant to be. */
  static destroy(): void {
    try {
      storage().removeItem(STORAGE_KEY);
    } catch {
      /* Nothing to remove if storage is unavailable. */
    }
  }
}
