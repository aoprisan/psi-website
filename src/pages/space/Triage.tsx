import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import {
  resolveTriage,
  triageOutcomes,
  triageQuestions,
  type ArousalState,
} from "@/lib/space/regulation";

/**
 * Window-of-tolerance triage.
 *
 * The clinically important bit is that hyperarousal and hypoarousal need
 * opposite interventions. Slow breathing calms an activated system and can
 * deepen a shut-down one, so guessing wrong is not neutral — hence three
 * questions before a recommendation rather than one generic exercise.
 */
export function Triage() {
  useDocumentTitle("Unde sunt acum · Spațiul tău");
  const [answers, setAnswers] = useState<(ArousalState | null)[]>(
    triageQuestions.map(() => null),
  );

  const complete = answers.every((answer): answer is ArousalState => answer !== null);
  const outcome = complete ? triageOutcomes[resolveTriage(answers as ArousalState[])] : null;

  return (
    <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-12 md:py-16">
      <p className="eyebrow">Orientare</p>
      <h1 className="mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.7rem)]">Unde ești acum?</h1>
      <p className="mt-4 text-[16.5px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
        Trei întrebări scurte. Nu ca să te încadreze undeva, ci pentru că
        starea în care ești acum decide ce exercițiu ajută — și ce exercițiu,
        oricât de bine intenționat, poate să înrăutățească lucrurile.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          {triageQuestions.map((question, index) => (
            <fieldset key={question.id} className="card p-6">
              <legend className="px-1 font-[family-name:var(--font-display)] text-[1.15rem] text-[color:var(--color-ink)]">
                {index + 1}. {question.question}
              </legend>
              <div className="mt-4 space-y-2">
                {question.options.map((option) => (
                  <label key={option.label} className="choice">
                    <input
                      type="radio"
                      name={question.id}
                      className="peer sr-only"
                      checked={answers[index] === option.state}
                      onChange={() =>
                        setAnswers((current) =>
                          current.map((value, i) => (i === index ? option.state : value)),
                        )
                      }
                    />
                    <span className="choice__body">{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {outcome ? (
            <div className={`card p-7 md:p-8 outcome outcome--${outcome.state}`}>
              <h2 className="text-[1.4rem]">{outcome.title}</h2>
              <p className="mt-4 text-[15.5px] leading-relaxed">{outcome.reading}</p>
              <p className="mt-4 text-[15.5px] leading-relaxed">{outcome.advice}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={outcome.action.to} className="btn-primary">
                  {outcome.action.label}
                </Link>
                <Link to="/spatiul-tau/ancorare" className="btn-secondary">
                  Ancorare 5-4-3-2-1
                </Link>
              </div>
              <button
                type="button"
                className="mt-6 text-[13.5px] text-[color:var(--color-muted)] underline underline-offset-4"
                onClick={() => setAnswers(triageQuestions.map(() => null))}
              >
                Ia-o de la capăt
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[color:var(--color-line)] p-8 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
              <p>
                Răspunde la cele trei întrebări și îți spun ce se întâmplă
                probabil cu sistemul tău nervos și ce exercițiu i se
                potrivește.
              </p>
              <p className="mt-4">
                Nu există răspuns greșit. Dacă eziți între două variante,
                alege-o pe cea care descrie ultimele câteva minute.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
