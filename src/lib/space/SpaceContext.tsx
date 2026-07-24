import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Vault,
  encryptionSupported,
  storageAvailable,
  vaultMode,
  type VaultMode,
} from "./vault";
import { normalizeSpaceData, type SpaceData } from "./types";

export type SpaceStatus =
  /** Checking what is on the device. */
  | "loading"
  /** No vault yet — show the onboarding. */
  | "absent"
  /** Encrypted vault present, key not in memory. */
  | "locked"
  /** Ready to read and write. */
  | "unlocked"
  /** localStorage is blocked (private mode, hardened settings). */
  | "unavailable";

type SpaceContextValue = {
  status: SpaceStatus;
  mode: VaultMode | null;
  data: SpaceData | null;
  canEncrypt: boolean;
  create: (passcode: string | null) => Promise<void>;
  unlock: (passcode?: string) => Promise<void>;
  lock: () => void;
  /** Applies a pure update and persists it. */
  update: (mutator: (current: SpaceData) => SpaceData) => Promise<void>;
  rekey: (passcode: string | null) => Promise<void>;
  destroy: () => void;
};

const SpaceContext = createContext<SpaceContextValue | null>(null);

const ACTIVITY_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

export function SpaceProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SpaceStatus>("loading");
  const [mode, setMode] = useState<VaultMode | null>(null);
  const [data, setData] = useState<SpaceData | null>(null);
  const vaultRef = useRef<Vault | null>(null);
  /** Mirrors `data` so writes never depend on when React flushes state. */
  const dataRef = useRef<SpaceData | null>(null);
  const lastActivity = useRef<number>(Date.now());
  const canEncrypt = useMemo(() => encryptionSupported(), []);

  const applyData = useCallback((next: SpaceData | null) => {
    dataRef.current = next;
    setData(next);
  }, []);

  /* Decide the initial state from what is on disk. Open vaults unlock
   * themselves — there is no key to ask for. */
  useEffect(() => {
    let cancelled = false;
    async function boot() {
      if (!storageAvailable()) {
        if (!cancelled) setStatus("unavailable");
        return;
      }
      const stored = vaultMode();
      if (stored === null) {
        if (!cancelled) {
          setMode(null);
          setStatus("absent");
        }
        return;
      }
      if (stored === "open") {
        try {
          const { vault, data: loaded } = await Vault.unlock();
          if (cancelled) return;
          vaultRef.current = vault;
          setMode("open");
          applyData(loaded);
          setStatus("unlocked");
        } catch {
          if (!cancelled) setStatus("absent");
        }
        return;
      }
      if (!cancelled) {
        setMode("passcode");
        setStatus("locked");
      }
    }
    void boot();
    return () => {
      cancelled = true;
    };
  }, [applyData]);

  const lock = useCallback(() => {
    vaultRef.current = null;
    applyData(null);
    setStatus((current) => (current === "unlocked" && mode === "passcode" ? "locked" : current));
  }, [mode, applyData]);

  /* Auto-lock. Only meaningful for passcode vaults: relocking an open vault
   * would be theatre, since anyone can reopen it with one tap. */
  useEffect(() => {
    if (status !== "unlocked" || mode !== "passcode") return;
    const minutes = data?.prefs.autoLockMinutes ?? 10;
    if (!minutes) return;

    const touch = () => {
      lastActivity.current = Date.now();
    };
    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, touch, { passive: true });
    }

    const timer = window.setInterval(() => {
      if (Date.now() - lastActivity.current >= minutes * 60_000) lock();
    }, 15_000);

    // Returning to a backgrounded tab is the highest-risk moment — check
    // immediately rather than waiting for the next interval tick.
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        if (Date.now() - lastActivity.current >= minutes * 60_000) lock();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      for (const event of ACTIVITY_EVENTS) window.removeEventListener(event, touch);
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [status, mode, data?.prefs.autoLockMinutes, lock]);

  const create = useCallback(async (passcode: string | null) => {
    const { vault, data: fresh } = await Vault.create(passcode);
    vaultRef.current = vault;
    lastActivity.current = Date.now();
    setMode(vault.mode);
    applyData(fresh);
    setStatus("unlocked");
  }, [applyData]);

  const unlock = useCallback(async (passcode?: string) => {
    const { vault, data: loaded } = await Vault.unlock(passcode);
    vaultRef.current = vault;
    lastActivity.current = Date.now();
    setMode(vault.mode);
    applyData(loaded);
    setStatus("unlocked");
  }, [applyData]);

  const update = useCallback(
    async (mutator: (current: SpaceData) => SpaceData) => {
      const vault = vaultRef.current;
      const current = dataRef.current;
      if (!vault || !current) return;
      // Derived from the ref, not from React state: two edits in the same
      // tick must both land, and StrictMode must not double-apply either.
      const next = normalizeSpaceData(mutator(current));
      applyData(next);
      await vault.write(next);
    },
    [applyData],
  );

  const rekey = useCallback(async (passcode: string | null) => {
    const current = dataRef.current;
    if (!current) return;
    const vault = await Vault.rekey(current, passcode);
    vaultRef.current = vault;
    setMode(vault.mode);
  }, []);

  const destroy = useCallback(() => {
    Vault.destroy();
    vaultRef.current = null;
    applyData(null);
    setMode(null);
    setStatus("absent");
  }, [applyData]);

  const value = useMemo<SpaceContextValue>(
    () => ({ status, mode, data, canEncrypt, create, unlock, lock, update, rekey, destroy }),
    [status, mode, data, canEncrypt, create, unlock, lock, update, rekey, destroy],
  );

  return <SpaceContext.Provider value={value}>{children}</SpaceContext.Provider>;
}

export function useSpace(): SpaceContextValue {
  const value = useContext(SpaceContext);
  if (!value) throw new Error("useSpace trebuie folosit în interiorul <SpaceProvider>.");
  return value;
}

/** Convenience for views that only render once the vault is open. */
export function useSpaceData(): SpaceData {
  const { data } = useSpace();
  if (!data) throw new Error("Datele nu sunt disponibile — spațiul este blocat.");
  return data;
}
