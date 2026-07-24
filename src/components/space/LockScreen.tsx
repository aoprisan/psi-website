import { useState, type FormEvent } from "react";
import { WrongPasscodeError } from "@/lib/space/vault";
import { useSpace } from "@/lib/space/SpaceContext";

const MIN_PASSCODE = 4;

/** First-run setup: choose between an encrypted vault and an open one. */
export function SpaceSetup() {
  const { create, canEncrypt } = useSpace();
  const [choice, setChoice] = useState<"passcode" | "open" | null>(null);
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (choice === "passcode") {
      if (code.length < MIN_PASSCODE) {
        setError(`Codul trebuie să aibă cel puțin ${MIN_PASSCODE} caractere.`);
        return;
      }
      if (code !== confirm) {
        setError("Cele două coduri nu se potrivesc.");
        return;
      }
    }
    setBusy(true);
    try {
      await create(choice === "passcode" ? code : null);
    } catch {
      setError("Nu am putut crea spațiul pe acest dispozitiv.");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="card p-7 md:p-10">
        <h2 className="text-[1.7rem]">Cum vrei să îți păstrezi datele?</h2>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Orice notezi aici rămâne pe acest dispozitiv. Nu există un server
          către care să se trimită ceva — nici eu, nici altcineva nu poate
          citi ce scrii. Alege cât de protejat vrei să fie față de cineva
          care ți-ar folosi telefonul sau calculatorul.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className={`vault-option ${choice === "passcode" ? "is-selected" : ""}`}>
            <input
              type="radio"
              name="vault-mode"
              checked={choice === "passcode"}
              onChange={() => setChoice("passcode")}
              disabled={!canEncrypt}
              className="sr-only"
            />
            <span>
              <span className="vault-option__title">
                Cu un cod de acces <span className="vault-option__tag">recomandat</span>
              </span>
              <span className="vault-option__text">
                Datele sunt criptate cu AES-256, iar cheia se calculează din
                codul tău. Fără cod, ce e salvat aici este un șir de caractere
                fără sens — inclusiv pentru cineva care îți ia dispozitivul.
                <strong className="block mt-1 text-[color:var(--color-clay-deep)]">
                  Codul nu se poate recupera. Dacă îl uiți, datele se pierd.
                </strong>
              </span>
            </span>
          </label>

          <label className={`vault-option ${choice === "open" ? "is-selected" : ""}`}>
            <input
              type="radio"
              name="vault-mode"
              checked={choice === "open"}
              onChange={() => setChoice("open")}
              className="sr-only"
            />
            <span>
              <span className="vault-option__title">Fără cod</span>
              <span className="vault-option__text">
                Mai simplu de folosit. Datele rămân tot pe dispozitiv și tot
                nu pleacă nicăieri, dar oricine deschide această pagină pe
                dispozitivul tău le poate citi. Fără iluzii: acesta nu este
                un mod protejat.
              </span>
            </span>
          </label>

          {!canEncrypt && (
            <p className="text-[13.5px] text-[color:var(--color-clay-deep)]">
              Browserul acesta nu oferă funcțiile de criptare necesare, așa că
              opțiunea cu cod nu este disponibilă aici.
            </p>
          )}

          {choice === "passcode" && (
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="field">
                <label htmlFor="new-code">Cod de acces</label>
                <input
                  id="new-code"
                  type="password"
                  autoComplete="new-password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="confirm-code">Confirmă codul</label>
                <input
                  id="confirm-code"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>
          )}

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn-primary mt-2" disabled={!choice || busy}>
            {busy ? "Se pregătește…" : "Deschide spațiul"}
          </button>
        </form>
      </div>
    </div>
  );
}

/** Returning visitor with an encrypted vault. */
export function SpaceUnlock() {
  const { unlock, destroy } = useSpace();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmingWipe, setConfirmingWipe] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await unlock(code);
    } catch (cause) {
      setError(
        cause instanceof WrongPasscodeError
          ? "Codul nu este corect. Mai încearcă."
          : "Nu am putut deschide spațiul pe acest dispozitiv.",
      );
      setBusy(false);
      setCode("");
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-7 md:p-9 text-center">
        <span
          aria-hidden
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-surface-deep)] text-[color:var(--color-pine)]"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="10" width="16" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </span>
        <h2 className="mt-5 text-[1.5rem]">Spațiul tău este blocat</h2>
        <p className="mt-2 text-[15px] leading-relaxed">
          Introdu codul pentru a-l deschide. Nimic nu se verifică pe un
          server — codul descuie datele chiar aici, pe dispozitiv.
        </p>
        <form onSubmit={submit} className="mt-6">
          <div className="field text-left">
            <label htmlFor="code" className="sr-only">Cod de acces</label>
            <input
              id="code"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={error ? "error" : ""}
              aria-invalid={!!error}
            />
            {error && <p className="error-msg">{error}</p>}
          </div>
          <button type="submit" className="btn-primary mt-5 w-full" disabled={busy || !code}>
            {busy ? "Se descuie…" : "Deschide"}
          </button>
        </form>

        <div className="mt-7 border-t border-[color:var(--color-line-soft)] pt-5 text-[13.5px] leading-relaxed text-[color:var(--color-muted)]">
          {confirmingWipe ? (
            <>
              <p className="text-[color:var(--color-clay-deep)]">
                Asta șterge definitiv tot ce e salvat aici. Nu se poate anula.
              </p>
              <div className="mt-3 flex justify-center gap-3">
                <button type="button" className="text-link" onClick={destroy}>
                  Da, șterge tot
                </button>
                <button type="button" className="text-link" onClick={() => setConfirmingWipe(false)}>
                  Renunț
                </button>
              </div>
            </>
          ) : (
            <p>
              Ai uitat codul? Nu există recuperare — asta e prețul pentru
              faptul că nimeni altcineva nu poate citi datele.{" "}
              <button type="button" className="text-link" onClick={() => setConfirmingWipe(true)}>
                Începe de la zero
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
