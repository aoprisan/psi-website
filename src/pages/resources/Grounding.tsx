import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site } from "@/lib/site";

const steps = [
  {
    count: 5,
    sense: "lucruri pe care le vezi",
    hint: "Privește în jur, fără grabă. Poate fi orice: o umbră pe perete, culoarea unei căni, felul în care cade lumina.",
    icon: "👁",
  },
  {
    count: 4,
    sense: "lucruri pe care le simți prin atingere",
    hint: "Textura hainelor, tălpile pe podea, aerul pe piele, spătarul scaunului care te susține.",
    icon: "✋",
  },
  {
    count: 3,
    sense: "sunete pe care le auzi",
    hint: "Apropiate sau îndepărtate: propria respirație, un zgomot de afară, liniștea dintre sunete.",
    icon: "👂",
  },
  {
    count: 2,
    sense: "mirosuri pe care le simți",
    hint: "Poate cafeaua, aerul din cameră, parfumul de pe încheietură. Dacă nu găsești, amintește-ți două mirosuri care îți plac.",
    icon: "🌿",
  },
  {
    count: 1,
    sense: "gust pe care îl simți",
    hint: "Gustul din gură chiar acum — sau ia o gură de apă ori de ceai și observ-o pe îndelete.",
    icon: "☕",
  },
] as const;

export function Grounding() {
  useDocumentTitle(`Exercițiu de ancorare 5-4-3-2-1 · ${site.name}`);
  const [stage, setStage] = useState<"intro" | number | "done">("intro");
  const [ticked, setTicked] = useState(0);

  const stepIndex = typeof stage === "number" ? stage : 0;
  const step = steps[stepIndex];

  function tick() {
    if (typeof stage !== "number") return;
    const next = ticked + 1;
    if (next < step.count) {
      setTicked(next);
    } else if (stepIndex < steps.length - 1) {
      setStage(stepIndex + 1);
      setTicked(0);
    } else {
      setStage("done");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Resurse · Ancorare"
        title={
          <>
            Exercițiul <em>5-4-3-2-1</em>
          </>
        }
        lead="Când mintea este trasă în trecut sau în îngrijorare, simțurile te pot readuce aici și acum. Un exercițiu simplu de ancorare, folosit în terapia traumei — durează 3–4 minute."
      />

      <Section spacing="tight">
        <div className="mx-auto max-w-2xl">
          {stage === "intro" && (
            <Reveal>
              <div className="card p-8 md:p-10 text-center">
                <p className="mx-auto max-w-md text-[16px] leading-relaxed">
                  Găsește o poziție confortabilă. Dacă poți, lasă umerii să
                  coboare și expiră lung o dată. Vei trece prin cele cinci
                  simțuri, pe rând — atinge ecranul pentru fiecare lucru pe care
                  îl observi.
                </p>
                <div className="mt-8">
                  <Button onClick={() => { setStage(0); setTicked(0); }} arrow={false}>
                    Începe exercițiul
                  </Button>
                </div>
              </div>
            </Reveal>
          )}

          {typeof stage === "number" && (
            <div className="card p-8 md:p-10 text-center" aria-live="polite">
              <p className="text-[13.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Pasul {stepIndex + 1} din {steps.length}
              </p>
              <p aria-hidden className="mt-4 text-[2rem]">{step.icon}</p>
              <h2 className="mt-2 text-[clamp(1.4rem,1.2rem+1vw,1.9rem)]">
                Observă {step.count === 1 ? "un" : step.count}{" "}
                {step.sense}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[color:var(--color-body)]">
                {step.hint}
              </p>

              {/* dots — one tap per noticed thing */}
              <div className="mt-8 flex justify-center gap-3">
                {Array.from({ length: step.count }, (_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className={`h-4 w-4 rounded-full border-2 transition-colors duration-300 ${
                      i < ticked
                        ? "border-[color:var(--color-pine)] bg-[color:var(--color-pine)]"
                        : "border-[color:var(--color-line)]"
                    }`}
                  />
                ))}
              </div>

              <button onClick={tick} className="btn-primary mt-8">
                <span>
                  {ticked + 1 < step.count || stepIndex < steps.length - 1
                    ? "Am observat unul"
                    : "Am observat — încheie"}
                </span>
              </button>

              <p className="mt-6 text-[13px] text-[color:var(--color-muted)]">
                Nu e nevoie să numești lucrurile cu voce tare — doar observă-le,
                pe rând, în ritmul tău.
              </p>
            </div>
          )}

          {stage === "done" && (
            <Reveal>
              <div className="card p-8 md:p-10 text-center">
                <span
                  aria-hidden
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-surface-deep)] text-[color:var(--color-pine)] text-2xl"
                >
                  ✓
                </span>
                <h2 className="mt-5 text-[1.6rem]">Ai ajuns la final</h2>
                <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed">
                  Observă cum te simți acum, fără să judeci. Poate puțin mai
                  prezent(ă), poate la fel — ambele sunt în regulă. Exercițiul
                  devine mai puternic cu fiecare repetare.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button to="/resurse/respiratie" variant="secondary" arrow={false}>
                    Continuă cu respirația
                  </Button>
                  <Button
                    variant="secondary"
                    arrow={false}
                    onClick={() => { setStage("intro"); setTicked(0); }}
                  >
                    Reia exercițiul
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </Section>
    </>
  );
}
