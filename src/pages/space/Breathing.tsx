import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BreathPacer } from "@/components/space/BreathPacer";
import { DistressRating } from "@/components/space/inputs";
import { useSpace } from "@/lib/space/SpaceContext";
import { addPractice, formatDuration } from "@/lib/space/actions";
import { breathPatterns, getBreathPattern } from "@/lib/space/regulation";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const DURATIONS = [
  { seconds: 60, label: "1 min" },
  { seconds: 180, label: "3 min" },
  { seconds: 300, label: "5 min" },
  { seconds: 600, label: "10 min" },
  { seconds: 0, label: "Fără limită" },
];

type Stage = "setup" | "practising" | "after";

export function Breathing() {
  useDocumentTitle("Respirație ghidată · Spațiul tău");
  const [params, setParams] = useSearchParams();
  const { status, data, update } = useSpace();

  const requested = params.get("pattern");
  const [patternId, setPatternId] = useState(
    () => (requested && getBreathPattern(requested) ? requested : breathPatterns[0].id),
  );
  const pattern = useMemo(
    () => getBreathPattern(patternId) ?? breathPatterns[0],
    [patternId],
  );

  const [duration, setDuration] = useState(pattern.suggestedSeconds);
  const [stage, setStage] = useState<Stage>("setup");
  const [before, setBefore] = useState<number | null>(null);
  const [after, setAfter] = useState<number | null>(null);
  const [practised, setPractised] = useState(0);
  const [saved, setSaved] = useState(false);

  // A deep link from the triage screen should preselect the right pattern.
  useEffect(() => {
    if (requested && getBreathPattern(requested) && requested !== patternId) {
      setPatternId(requested);
    }
  }, [requested, patternId]);

  useEffect(() => {
    setDuration(pattern.suggestedSeconds);
  }, [pattern.suggestedSeconds]);

  const canSave = status === "unlocked" && !!data;

  function choosePattern(id: string) {
    setPatternId(id);
    setStage("setup");
    setBefore(null);
    setAfter(null);
    setSaved(false);
    const next = new URLSearchParams(params);
    next.set("pattern", id);
    setParams(next, { replace: true });
  }

  async function save() {
    if (!canSave) return;
    await update((current) =>
      addPractice(current, {
        kind: "breath",
        detail: pattern.name,
        seconds: practised,
        distressBefore: before,
        distressAfter: after,
      }),
    );
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-12 md:py-16">
      <p className="eyebrow">Reglare</p>
      <h1 className="mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.7rem)]">Respirație ghidată</h1>
      <p className="mt-4 text-[16.5px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
        Respirația este singura funcție a sistemului nervos autonom pe care o
        poți conduce voluntar. De aceea funcționează: nu îți convinge mintea
        să se calmeze, ci îi dă corpului un semnal pe care mintea îl urmează.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* ---------- Pattern picker ---------- */}
        <div>
          <h2 className="text-[1.15rem]">Alege un ritm</h2>
          <ul className="mt-4 space-y-2.5">
            {breathPatterns.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => choosePattern(option.id)}
                  aria-pressed={option.id === pattern.id}
                  className={`pattern-option ${option.id === pattern.id ? "is-selected" : ""}`}
                >
                  <span className="pattern-option__name">{option.name}</span>
                  <span className="pattern-option__purpose">{option.purpose}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl bg-[color:var(--color-surface)] p-4 text-[14px] leading-relaxed text-[color:var(--color-body)]">
            {pattern.rationale}
          </p>
        </div>

        {/* ---------- Practice ---------- */}
        <div className="card p-6 md:p-9">
          {stage === "setup" && (
            <>
              <h2 className="text-[1.3rem]">{pattern.name}</h2>
              <div className="mt-6">
                <p className="text-[14px] font-semibold text-[color:var(--color-ink)]">
                  Cât vrei să dureze?
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {DURATIONS.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setDuration(option.seconds)}
                      aria-pressed={duration === option.seconds}
                      className={`chip ${duration === option.seconds ? "is-selected" : ""}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 border-t border-[color:var(--color-line-soft)] pt-6">
                <DistressRating
                  label="Cât de tensionat(ă) te simți acum?"
                  value={before}
                  onChange={setBefore}
                />
                <p className="mt-2 text-[13px] text-[color:var(--color-muted)]">
                  Opțional — dar dacă notezi acum și la final, în timp vei
                  vedea negru pe alb ce exercițiu chiar te ajută.
                </p>
              </div>

              <button
                type="button"
                className="btn-primary mt-7 w-full"
                onClick={() => setStage("practising")}
              >
                Mergi la exercițiu
              </button>
            </>
          )}

          {stage === "practising" && (
            <>
              <BreathPacer
                pattern={pattern}
                targetSeconds={duration}
                sound={data?.prefs.sound ?? true}
                haptics={data?.prefs.haptics ?? true}
                onFinish={(seconds) => {
                  setPractised(seconds);
                  setStage("after");
                }}
              />
              <button
                type="button"
                className="mt-8 block w-full text-center text-[13.5px] text-[color:var(--color-muted)] underline underline-offset-4"
                onClick={() => setStage("setup")}
              >
                Înapoi la setări
              </button>
            </>
          )}

          {stage === "after" && (
            <div className="text-center">
              <h2 className="text-[1.4rem]">Ai respirat {formatDuration(practised)}</h2>
              <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed">
                Nu contează dacă simți o schimbare mare. Sistemul nervos învață
                din repetiție, nu dintr-o singură reușită.
              </p>

              <div className="mt-8 text-left">
                <DistressRating
                  label="Cât de tensionat(ă) te simți acum?"
                  value={after}
                  onChange={setAfter}
                />
              </div>

              {before !== null && after !== null && (
                <p className="mt-5 text-[15px] text-[color:var(--color-ink)]">
                  {after < before
                    ? `Tensiunea a scăzut cu ${before - after} ${before - after === 1 ? "punct" : "puncte"}.`
                    : after === before
                      ? "Tensiunea a rămas la fel. Se întâmplă — merită încercat și alt ritm."
                      : "Tensiunea a crescut. Uneori atenția pe respirație activează, mai ales după traumă; ancorarea în mediu poate fi mai potrivită acum."}
                </p>
              )}

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {canSave && !saved && (
                  <button type="button" className="btn-primary" onClick={() => void save()}>
                    Salvează în jurnal
                  </button>
                )}
                {saved && (
                  <p className="text-[14px] text-[color:var(--color-muted)]" role="status">
                    Salvat pe dispozitivul tău.
                  </p>
                )}
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setStage("setup");
                    setAfter(null);
                    setSaved(false);
                  }}
                >
                  Încă o dată
                </button>
              </div>

              {!canSave && (
                <p className="mt-5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                  Poți salva practicile și le poți urmări în timp dacă îți
                  creezi un spațiu personal pe acest dispozitiv.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
