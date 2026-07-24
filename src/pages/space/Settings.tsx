import { useState, type FormEvent } from "react";
import { RequireVault } from "@/components/space/SpaceShell";
import { useSpace } from "@/lib/space/SpaceContext";
import { countDigits, setPrefs } from "@/lib/space/actions";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export function SpaceSettings() {
  useDocumentTitle("Setări · Spațiul tău");
  return (
    <RequireVault title="Setările spațiului">
      <SettingsInner />
    </RequireVault>
  );
}

const LOCK_OPTIONS = [
  { minutes: 2, label: "2 minute" },
  { minutes: 5, label: "5 minute" },
  { minutes: 10, label: "10 minute" },
  { minutes: 30, label: "30 de minute" },
  { minutes: 0, label: "Niciodată" },
];

function SettingsInner() {
  const { data, mode, canEncrypt, update, rekey, destroy } = useSpace();
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [wipeStage, setWipeStage] = useState<0 | 1 | 2>(0);

  if (!data) return null;

  async function applyPasscode(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (code.length < 4) {
      setError("Codul trebuie să aibă cel puțin 4 caractere.");
      return;
    }
    if (code !== confirm) {
      setError("Cele două coduri nu se potrivesc.");
      return;
    }
    await rekey(code);
    setCode("");
    setConfirm("");
    setMessage("Codul a fost setat. Datele sunt criptate de acum.");
  }

  async function removePasscode() {
    await rekey(null);
    setMessage("Codul a fost eliminat. Datele nu mai sunt criptate.");
  }

  function exportData() {
    const payload = JSON.stringify(data, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `spatiul-meu-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-12 md:py-16">
      <p className="eyebrow">Setări</p>
      <h1 className="mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.7rem)]">Spațiul tău</h1>

      {/* ---------- Protection ---------- */}
      <section className="card mt-10 p-6 md:p-8">
        <h2 className="text-[1.25rem]">Protecția datelor</h2>
        <p className="mt-2 text-[15px] leading-relaxed">
          {mode === "passcode"
            ? "Datele tale sunt criptate cu AES-256. Cheia se calculează din codul tău și nu este salvată nicăieri."
            : "Datele sunt salvate necriptat pe acest dispozitiv. Oricine deschide pagina aici le poate citi."}
        </p>

        {mode === "passcode" ? (
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => void removePasscode()}>
              Elimină codul
            </button>
          </div>
        ) : canEncrypt ? (
          <form onSubmit={applyPasscode} className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="field">
                <label htmlFor="set-code">Cod nou</label>
                <input
                  id="set-code"
                  type="password"
                  autoComplete="new-password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="set-confirm">Confirmă</label>
                <input
                  id="set-confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--color-clay-deep)]">
              Codul nu poate fi recuperat. Dacă îl uiți, datele salvate aici se
              pierd definitiv.
            </p>
            <button type="submit" className="btn-primary mt-4">
              Criptează datele
            </button>
          </form>
        ) : (
          <p className="mt-4 text-[14px] text-[color:var(--color-muted)]">
            Browserul acesta nu oferă funcțiile de criptare necesare.
          </p>
        )}

        {mode === "passcode" && (
          <div className="mt-8 border-t border-[color:var(--color-line-soft)] pt-6">
            <p className="text-[14px] font-semibold text-[color:var(--color-ink)]">
              Blochează automat după
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LOCK_OPTIONS.map((option) => (
                <button
                  key={option.minutes}
                  type="button"
                  aria-pressed={data.prefs.autoLockMinutes === option.minutes}
                  onClick={() => void update((current) => setPrefs(current, { autoLockMinutes: option.minutes }))}
                  className={`chip ${data.prefs.autoLockMinutes === option.minutes ? "is-selected" : ""}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <p className="error-msg mt-3">{error}</p>}
        {message && (
          <p className="mt-3 text-[14px] text-[color:var(--color-muted)]" role="status">
            {message}
          </p>
        )}
      </section>

      {/* ---------- Practice cues ---------- */}
      <section className="card mt-6 p-6 md:p-8">
        <h2 className="text-[1.25rem]">Exercițiile de respirație</h2>
        <div className="mt-5 space-y-4">
          <Toggle
            label="Sunet de ghidaj"
            description="Un ton scurt la fiecare schimbare de fază, ca să poți închide ochii."
            checked={data.prefs.sound}
            onChange={(value) => void update((current) => setPrefs(current, { sound: value }))}
          />
          <Toggle
            label="Vibrație"
            description="O vibrație scurtă la fiecare fază. Funcționează pe telefoanele care o permit."
            checked={data.prefs.haptics}
            onChange={(value) => void update((current) => setPrefs(current, { haptics: value }))}
          />
        </div>
      </section>

      {/* ---------- Data ---------- */}
      <section className="card mt-6 p-6 md:p-8">
        <h2 className="text-[1.25rem]">Datele tale</h2>
        <ul className="mt-3 space-y-1 text-[15px] text-[color:var(--color-body)]">
          <li>{countDigits(data.checkins.length, "notare", "notări")} în jurnal</li>
          <li>
            {countDigits(data.screenings.length, "chestionar completat", "chestionare completate")}
          </li>
          <li>
            {countDigits(data.practices.length, "exercițiu de reglare", "exerciții de reglare")}
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn-secondary" onClick={exportData}>
            Descarcă o copie
          </button>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
          Copia se descarcă necriptată, ca să o poți citi cu orice program.
          Tratează fișierul ca pe un jurnal pe hârtie: oricine îl deschide îl
          poate citi.
        </p>

        <div className="mt-8 border-t border-[color:var(--color-line-soft)] pt-6">
          <p className="text-[14px] font-semibold text-[color:var(--color-ink)]">
            Șterge totul de pe acest dispozitiv
          </p>
          {wipeStage === 0 && (
            <button type="button" className="btn-secondary mt-3" onClick={() => setWipeStage(1)}>
              Șterge tot
            </button>
          )}
          {wipeStage === 1 && (
            <div className="mt-3">
              <p className="text-[14.5px] leading-relaxed text-[color:var(--color-clay-deep)]">
                Se șterg definitiv {countDigits(data.checkins.length, "notare", "notări")},{" "}
                {countDigits(data.screenings.length, "chestionar", "chestionare")} și{" "}
                {countDigits(data.practices.length, "exercițiu", "exerciții")}. Nu există copie
                de rezervă și nu se poate anula.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="btn-secondary" onClick={() => setWipeStage(2)}>
                  Am înțeles, continuă
                </button>
                <button type="button" className="text-link" onClick={() => setWipeStage(0)}>
                  Renunț
                </button>
              </div>
            </div>
          )}
          {wipeStage === 2 && (
            <div className="mt-3">
              <p className="text-[14.5px] font-semibold text-[color:var(--color-clay-deep)]">
                Confirmi ștergerea definitivă?
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="btn-primary" onClick={destroy}>
                  Da, șterge tot
                </button>
                <button type="button" className="text-link" onClick={() => setWipeStage(0)}>
                  Renunț
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--color-pine)]"
      />
      <span>
        <span className="block text-[15px] font-semibold text-[color:var(--color-ink)]">
          {label}
        </span>
        <span className="block text-[14px] leading-relaxed text-[color:var(--color-muted)]">
          {description}
        </span>
      </span>
    </label>
  );
}
