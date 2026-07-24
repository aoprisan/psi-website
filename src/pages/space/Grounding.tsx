import { useRef, useState } from "react";
import { DistressRating } from "@/components/space/inputs";
import { useSpace } from "@/lib/space/SpaceContext";
import { addPractice } from "@/lib/space/actions";
import { groundingSteps } from "@/lib/space/regulation";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

/**
 * 5-4-3-2-1 grounding.
 *
 * What the visitor types is never persisted — only that the exercise
 * happened, for how long, and the before/after rating. The content of a
 * grounding round is the most incidental data in the whole space; there is
 * no reason to keep it, so it is dropped when the page unmounts.
 */
export function Grounding() {
  useDocumentTitle("Ancorare 5-4-3-2-1 · Spațiul tău");
  const { status, data, update } = useSpace();
  const [stage, setStage] = useState<"intro" | "steps" | "done">("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [entries, setEntries] = useState<string[][]>(
    groundingSteps.map((step) => Array(step.count).fill("")),
  );
  const [before, setBefore] = useState<number | null>(null);
  const [after, setAfter] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const startedAt = useRef<number>(0);
  const [seconds, setSeconds] = useState(0);

  const step = groundingSteps[stepIndex];
  const filled = entries[stepIndex]?.filter((value) => value.trim().length > 0).length ?? 0;
  const canSave = status === "unlocked" && !!data;

  function begin() {
    startedAt.current = Date.now();
    setStage("steps");
  }

  function next() {
    if (stepIndex < groundingSteps.length - 1) {
      setStepIndex((index) => index + 1);
      return;
    }
    setSeconds(Math.round((Date.now() - startedAt.current) / 1000));
    setStage("done");
  }

  async function save() {
    if (!canSave) return;
    await update((current) =>
      addPractice(current, {
        kind: "grounding",
        detail: "Ancorare 5-4-3-2-1",
        seconds,
        distressBefore: before,
        distressAfter: after,
      }),
    );
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-12 md:py-16">
      <p className="eyebrow">Reglare</p>
      <h1 className="mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.7rem)]">Ancorare 5-4-3-2-1</h1>

      {stage === "intro" && (
        <>
          <p className="mt-4 text-[16.5px] leading-relaxed">
            Când mintea pleacă în trecut sau într-un scenariu, simțurile rămân
            singurele care funcționează doar în prezent. Exercițiul le
            folosește ca pe o ancoră: numeri lucruri concrete din jurul tău,
            iar atenția se întoarce în camera în care ești.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            Ce scrii aici nu se salvează nicăieri — nici măcar pe dispozitiv.
            Rândurile dispar când închizi pagina.
          </p>

          <div className="card mt-8 p-6 md:p-8">
            <DistressRating
              label="Înainte de a începe: cât de departe de „aici” te simți?"
              value={before}
              onChange={setBefore}
            />
            <button type="button" className="btn-primary mt-7 w-full sm:w-auto" onClick={begin}>
              Începe
            </button>
          </div>
        </>
      )}

      {stage === "steps" && (
        <div className="card mt-8 p-6 md:p-9">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
              Pasul {stepIndex + 1} din {groundingSteps.length}
            </p>
            <p className="text-[13px] text-[color:var(--color-muted)]">
              {filled} / {step.count}
            </p>
          </div>

          <div
            className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[color:var(--color-surface-deep)]"
            role="progressbar"
            aria-valuenow={stepIndex + 1}
            aria-valuemin={1}
            aria-valuemax={groundingSteps.length}
          >
            <div
              className="h-full rounded-full bg-[color:var(--color-sage)] transition-[width] duration-500"
              style={{ width: `${((stepIndex + 1) / groundingSteps.length) * 100}%` }}
            />
          </div>

          <h2 className="mt-6 text-[1.6rem]">
            {step.count} {step.sense}
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed">{step.instruction}</p>

          <div className="mt-6 space-y-2.5">
            {Array.from({ length: step.count }, (_, i) => (
              <div className="field" key={i}>
                <label htmlFor={`ground-${stepIndex}-${i}`} className="sr-only">
                  {step.sense} — {i + 1}
                </label>
                <input
                  id={`ground-${stepIndex}-${i}`}
                  type="text"
                  autoComplete="off"
                  placeholder={i === 0 ? step.placeholder : ""}
                  value={entries[stepIndex][i]}
                  onChange={(event) =>
                    setEntries((current) =>
                      current.map((row, rowIndex) =>
                        rowIndex === stepIndex
                          ? row.map((value, valueIndex) =>
                              valueIndex === i ? event.target.value : value,
                            )
                          : row,
                      ),
                    )
                  }
                />
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={next}>
              {stepIndex < groundingSteps.length - 1 ? "Mai departe" : "Am terminat"}
            </button>
            {stepIndex > 0 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStepIndex((index) => index - 1)}
              >
                Înapoi
              </button>
            )}
          </div>
          <p className="mt-4 text-[13px] text-[color:var(--color-muted)]">
            Nu e nevoie să completezi toate rândurile. Poți merge mai departe
            oricând.
          </p>
        </div>
      )}

      {stage === "done" && (
        <div className="card mt-8 p-6 md:p-9">
          <h2 className="text-[1.5rem]">Ești aici</h2>
          <p className="mt-3 text-[15.5px] leading-relaxed">
            Ai numit lucruri care există în camera asta, în minutul ăsta.
            Dacă atenția pleacă din nou, exercițiul se poate relua oricând —
            nu se „consumă”.
          </p>

          <div className="mt-7">
            <DistressRating
              label="Cât de departe de „aici” te simți acum?"
              value={after}
              onChange={setAfter}
            />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
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
                setStage("intro");
                setStepIndex(0);
                setEntries(groundingSteps.map((s) => Array(s.count).fill("")));
                setAfter(null);
                setSaved(false);
              }}
            >
              Încă o dată
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
