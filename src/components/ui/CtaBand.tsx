import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Closing call-to-action used at the bottom of most pages. */
export function CtaBand() {
  return (
    <Section tone="dark" spacing="default" className="rounded-t-[2.5rem]">
      <Reveal className="text-center mx-auto max-w-2xl">
        <p className="eyebrow" style={{ color: "var(--color-clay-tint)" }}>
          Primul pas
        </p>
        <h2 className="mt-4 text-[clamp(1.9rem,1.4rem+2.4vw,3rem)] text-[color:var(--color-cream)]">
          Nu trebuie să treci singur(ă) prin asta.
        </h2>
        <p className="mt-5 text-[17px] leading-relaxed text-[color:var(--color-surface-deep)]">
          Scrie-mi câteva rânduri despre ce te aduce — sau doar cere o
          programare. Îți răspund personal, în deplină confidențialitate.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/contact" variant="primary-light">
            Programează o ședință
          </Button>
          <Button
            to="/intrebari-frecvente"
            variant="secondary"
            className="!border-[color:var(--color-surface-deep)] !text-[color:var(--color-cream)] hover:!bg-white/10"
            arrow={false}
          >
            Ai întrebări?
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
