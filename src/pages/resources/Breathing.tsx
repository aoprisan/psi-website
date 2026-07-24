import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site } from "@/lib/site";

type PhaseKind = "inhale" | "hold" | "exhale";

type Technique = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  phases: readonly { kind: PhaseKind; label: string; seconds: number }[];
};

const techniques: readonly Technique[] = [
  {
    slug: "coerenta",
    name: "Respirație coerentă",
    tagline: "5 sec inspir · 5 sec expir",
    description:
      "Un ritm lent și egal, de aproximativ șase respirații pe minut, care echilibrează sistemul nervos. Potrivită oricând, inclusiv ca practică zilnică.",
    phases: [
      { kind: "inhale", label: "Inspiră", seconds: 5 },
      { kind: "exhale", label: "Expiră", seconds: 5 },
    ],
  },
  {
    slug: "patrat",
    name: "Respirația în patru timpi",
    tagline: "4 · 4 · 4 · 4",
    description:
      "„Box breathing”: inspiri, ții, expiri și iar ții — câte patru secunde. Folosită pentru concentrare și calm în momente de tensiune.",
    phases: [
      { kind: "inhale", label: "Inspiră", seconds: 4 },
      { kind: "hold", label: "Ține", seconds: 4 },
      { kind: "exhale", label: "Expiră", seconds: 4 },
      { kind: "hold", label: "Ține", seconds: 4 },
    ],
  },
  {
    slug: "4-7-8",
    name: "Respirația 4-7-8",
    tagline: "4 inspir · 7 pauză · 8 expir",
    description:
      "Expirul lung activează frâna naturală a corpului. Utilă seara, înainte de somn, sau când anxietatea crește. Dacă amețești, revino la un ritm obișnuit.",
    phases: [
      { kind: "inhale", label: "Inspiră", seconds: 4 },
      { kind: "hold", label: "Ține", seconds: 7 },
      { kind: "exhale", label: "Expiră", seconds: 8 },
    ],
  },
] as const;

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function Breathing() {
  useDocumentTitle(`Exerciții de respirație · ${site.name}`);
  const [technique, setTechnique] = useState<Technique>(techniques[0]);
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remaining, setRemaining] = useState(techniques[0].phases[0].seconds);
  const [elapsed, setElapsed] = useState(0);
  const [cycles, setCycles] = useState(0);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const phase = technique.phases[phaseIndex];

  // A steady 1-second heartbeat drives the countdown and elapsed time.
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setElapsed((e) => e + 1);
      setRemaining((r) => r - 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  // When a phase runs out, advance to the next one.
  useEffect(() => {
    if (!running || remaining > 0) return;
    const next = (phaseIndex + 1) % technique.phases.length;
    if (next === 0) setCycles((c) => c + 1);
    setPhaseIndex(next);
    setRemaining(technique.phases[next].seconds);
  }, [remaining, running, phaseIndex, technique]);

  function start(t: Technique) {
    setTechnique(t);
    setPhaseIndex(0);
    setRemaining(t.phases[0].seconds);
    setElapsed(0);
    setCycles(0);
    setRunning(true);
  }

  function stop() {
    setRunning(false);
    setPhaseIndex(0);
    setRemaining(technique.phases[0].seconds);
  }

  // Circle scale target; the CSS transition (duration set inline to the
  // phase length) does the easing, prefers-reduced-motion disables it.
  // During a hold, the circle keeps the scale of the last inhale/exhale.
  let scale = 0.72;
  if (running) {
    for (let back = 0; back < technique.phases.length; back++) {
      const idx = (phaseIndex - back + technique.phases.length) % technique.phases.length;
      const kind = technique.phases[idx].kind;
      if (kind === "inhale") { scale = 1; break; }
      if (kind === "exhale") { scale = 0.55; break; }
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Resurse · Respirație"
        title={
          <>
            Câteva minute de <em>respirație ghidată</em>
          </>
        }
        lead="Respirația lentă este cel mai direct mod de a-i transmite corpului că este în siguranță. Alege un exercițiu și lasă cercul să îți dea ritmul — 3–5 minute sunt de ajuns."
      />

      <Section spacing="tight">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* technique picker */}
          <Reveal className="space-y-4">
            {techniques.map((t) => {
              const active = t.slug === technique.slug;
              return (
                <button
                  key={t.slug}
                  onClick={() => (running ? undefined : setTechnique(t))}
                  disabled={running && !active}
                  className={`card block w-full p-6 text-left transition-opacity ${
                    active ? "!border-[color:var(--color-pine)]" : "card--hover"
                  } ${running && !active ? "opacity-40" : ""}`}
                  aria-pressed={active}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[1.15rem]">{t.name}</h2>
                    <span className="whitespace-nowrap text-[13px] font-semibold text-[color:var(--color-clay-deep)]">
                      {t.tagline}
                    </span>
                  </div>
                  <p className="mt-2 text-[14.5px] leading-relaxed">{t.description}</p>
                </button>
              );
            })}
            <p className="text-[13px] leading-relaxed text-[color:var(--color-muted)]">
              Notă: dacă simți amețeală sau disconfort, oprește-te și respiră
              normal. Exercițiile nu înlocuiesc un tratament, dar sunt un sprijin
              bun între ședințe.
            </p>
          </Reveal>

          {/* pacer */}
          <Reveal delay={100}>
            <div className="card flex flex-col items-center p-8 md:p-12">
              <div className="breath-stage">
                <div
                  className={`breath-circle ${running ? "" : "breath-circle--idle"}`}
                  style={{
                    transform: `scale(${scale})`,
                    transitionDuration: `${phase.seconds}s`,
                  }}
                  aria-hidden
                />
                <div className="breath-readout">
                  {running ? (
                    <>
                      <p
                        ref={liveRef}
                        className="font-[family-name:var(--font-display)] text-[1.7rem] text-[color:var(--color-ink)]"
                        aria-live="assertive"
                      >
                        {phase.label}
                      </p>
                      <p className="mt-1 text-[2.2rem] font-light tabular-nums text-[color:var(--color-clay-deep)]">
                        {Math.max(remaining, 1)}
                      </p>
                    </>
                  ) : (
                    <p className="max-w-[12rem] text-center text-[15px] text-[color:var(--color-muted)]">
                      Apasă „Începe” și urmează ritmul cercului
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex w-full items-center justify-between text-[14px] text-[color:var(--color-muted)]">
                <span className="tabular-nums">Timp: {formatTime(elapsed)}</span>
                <span>{technique.name}</span>
                <span className="tabular-nums">Cicluri: {cycles}</span>
              </div>

              <div className="mt-6">
                {running ? (
                  <Button variant="secondary" arrow={false} onClick={stop}>
                    Oprește exercițiul
                  </Button>
                ) : (
                  <Button onClick={() => start(technique)} arrow={false}>
                    Începe
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
