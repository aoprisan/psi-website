import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CrisisNote } from "@/components/ui/CrisisNote";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site } from "@/lib/site";
import {
  bandFor,
  screeners,
  setContactPrefill,
  type Screener,
} from "@/lib/screeners";

const LEVEL_COLORS = ["var(--color-sage)", "#c9a15a", "var(--color-clay)", "#b3543f"] as const;

/** ---------- list of available screeners ---------- */
function ScreenerList() {
  useDocumentTitle(`Chestionare de autoevaluare · ${site.name}`);
  return (
    <>
      <PageHero
        eyebrow="Resurse · Autoevaluare"
        title={
          <>
            Cum te simți, <em>de fapt</em>?
          </>
        }
        lead="Trei chestionare scurte, validate științific și folosite de specialiști din întreaga lume. Se completează direct aici, iar răspunsurile rămân doar pe dispozitivul tău — nu sunt trimise sau salvate nicăieri."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {screeners.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <Link
                to={`/resurse/chestionare/${s.slug}`}
                className="card card--hover block h-full p-7"
              >
                <p className="eyebrow">{s.code}</p>
                <h2 className="mt-3 text-[1.3rem]">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed">{s.intro}</p>
                <p className="mt-4 text-[13.5px] font-semibold text-[color:var(--color-muted)]">
                  {s.items.length} întrebări · aprox. {s.duration}
                </p>
                <span className="text-link mt-4 inline-block text-[14.5px]">
                  Începe chestionarul
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 max-w-[var(--measure)]">
          <div className="rounded-2xl border border-[color:var(--color-line-soft)] bg-[color:var(--color-surface)] p-6 text-[14.5px] leading-relaxed">
            <p className="font-semibold text-[color:var(--color-ink)]">
              Ce sunt — și ce nu sunt — aceste chestionare
            </p>
            <p className="mt-2">
              Sunt instrumente de <em>screening</em>: oferă o primă orientare,
              nu un diagnostic. Un scor ridicat nu înseamnă automat o tulburare,
              iar un scor mic nu invalidează ceea ce simți. Diagnosticul se
              stabilește doar printr-o evaluare clinică realizată de un
              specialist.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

/** ---------- gauge shown on the results screen ---------- */
function ScoreGauge({ screener, score }: { screener: Screener; score: number }) {
  const band = bandFor(screener, score);
  const pct = Math.round((score / screener.maxScore) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-[family-name:var(--font-display)] text-[2.6rem] text-[color:var(--color-ink)]">
          {score}
          <span className="text-[1.2rem] text-[color:var(--color-muted)]">
            {" "}/ {screener.maxScore}
          </span>
        </p>
        <p
          className="text-[14px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: LEVEL_COLORS[band.level] }}
        >
          {band.label}
        </p>
      </div>
      <div
        className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[color:var(--color-surface-deep)]"
        role="img"
        aria-label={`Scor ${score} din ${screener.maxScore}: ${band.label}`}
      >
        <div
          className="h-full rounded-full transition-[width] duration-700"
          style={{ width: `${Math.max(pct, 4)}%`, background: LEVEL_COLORS[band.level] }}
        />
      </div>
    </div>
  );
}

/** ---------- questionnaire runner ---------- */
function ScreenerRunner({ screener }: { screener: Screener }) {
  useDocumentTitle(`${screener.title} (${screener.code}) · ${site.name}`);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    screener.items.map(() => null),
  );
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Reset when navigating between screeners.
  useEffect(() => {
    setAnswers(screener.items.map(() => null));
    setStep(0);
    setShowResult(false);
  }, [screener]);

  const score = useMemo(
    () => answers.reduce<number>((sum, a) => sum + (a ?? 0), 0),
    [answers],
  );
  const done = answers.every((a) => a !== null);
  const band = bandFor(screener, score);
  const criticalFlag =
    screener.criticalItem !== undefined &&
    (answers[screener.criticalItem] ?? 0) > 0;

  function answer(value: number) {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
    if (step < screener.items.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function bookWithResult() {
    setContactPrefill(
      `Bună ziua,\n\nAm completat pe site chestionarul ${screener.code} (${screener.title.toLowerCase()}) și rezultatul a fost: ${score} din ${screener.maxScore} (${band.label.toLowerCase()}). Aș dori o programare pentru o primă discuție.\n\nMulțumesc.`,
    );
    navigate("/contact");
  }

  if (showResult) {
    return (
      <>
        <PageHero
          eyebrow={`Resurse · ${screener.code}`}
          title="Rezultatul tău"
          lead="Amintește-ți: acesta este un instrument de orientare, nu un diagnostic. Indiferent de scor, felul în care te simți contează."
        />
        <Section spacing="tight">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="card p-8 md:p-10">
                <ScoreGauge screener={screener} score={score} />
                <p className="mt-6 text-[16px] leading-relaxed">{band.text}</p>

                {(criticalFlag || band.level === 3) && (
                  <div className="mt-6">
                    <CrisisNote strong />
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button onClick={bookWithResult}>
                    Programează o discuție
                  </Button>
                  <Button
                    variant="secondary"
                    arrow={false}
                    onClick={() => {
                      setAnswers(screener.items.map(() => null));
                      setStep(0);
                      setShowResult(false);
                    }}
                  >
                    Reia chestionarul
                  </Button>
                </div>

                <p className="mt-8 border-t border-[color:var(--color-line-soft)] pt-5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                  Rezultatul nu a fost salvat sau trimis nicăieri — există doar
                  pe ecranul tău. {screener.attribution}
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-8">
              <p className="text-center text-[14.5px]">
                <Link to="/resurse/chestionare" className="text-link">
                  ← Înapoi la toate chestionarele
                </Link>
              </p>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }

  const progress = Math.round((answers.filter((a) => a !== null).length / screener.items.length) * 100);

  return (
    <>
      <PageHero
        eyebrow={`Resurse · ${screener.code}`}
        title={screener.title}
        lead={screener.stem}
      />
      <Section spacing="tight">
        <div className="mx-auto max-w-2xl">
          {/* progress */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between text-[13.5px] font-semibold text-[color:var(--color-muted)]">
              <span>
                Întrebarea {step + 1} din {screener.items.length}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-surface-deep)]">
              <div
                className="h-full rounded-full bg-[color:var(--color-pine)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="card p-8 md:p-10" aria-live="polite">
            <h2 className="text-[clamp(1.3rem,1.1rem+1vw,1.7rem)] leading-snug">
              {screener.items[step]}
            </h2>
            <div className="mt-7 grid gap-3">
              {screener.options.map((opt) => {
                const selected = answers[step] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => answer(opt.value)}
                    className={`rounded-xl border-2 px-5 py-3.5 text-left text-[15.5px] font-medium transition-colors ${
                      selected
                        ? "border-[color:var(--color-pine)] bg-[color:var(--color-surface)] text-[color:var(--color-ink)]"
                        : "border-[color:var(--color-line-soft)] bg-[color:var(--color-cream)] text-[color:var(--color-body)] hover:border-[color:var(--color-sage)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex items-center justify-between text-[14px]">
              {step > 0 ? (
                <button className="text-link" onClick={() => setStep(step - 1)}>
                  ← Întrebarea anterioară
                </button>
              ) : (
                <Link to="/resurse/chestionare" className="text-link">
                  ← Renunță
                </Link>
              )}
              {done && !showResult && (
                <button className="text-link" onClick={() => setShowResult(true)}>
                  Vezi rezultatul →
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-[13px] text-[color:var(--color-muted)]">
            Răspunsurile rămân pe dispozitivul tău și dispar când închizi pagina.
          </p>
        </div>
      </Section>
    </>
  );
}

export function Screeners() {
  const { slug } = useParams();
  const screener = screeners.find((s) => s.slug === slug);
  if (slug && !screener) {
    return <ScreenerList />;
  }
  return screener ? <ScreenerRunner screener={screener} /> : <ScreenerList />;
}
