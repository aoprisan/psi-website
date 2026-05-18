import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const credentials = [
  { year: "20XX", text: "Ph.D., Clinical Psychology, [University]" },
  { year: "20XX", text: "Licensed Clinical Psychologist, [State] #00000" },
  { year: "20XX", text: "EMDR Basic Training, [Institute]" },
  { year: "20XX", text: "Somatic Experiencing — beginning intermediate, [Institute]" },
  { year: "20XX", text: "Cognitive Processing Therapy — VA training" },
];

export function About() {
  useDocumentTitle(`About — ${site.practitionerName}`);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="pt-16 md:pt-28 pb-12">
        <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow eyebrow-accent">A / About</p>
          </Reveal>
          <div className="grid gap-12 md:gap-20 md:grid-cols-12 mt-12 md:mt-16">
            <Reveal as="div" className="md:col-span-5">
              <div className="portrait aspect-[4/5]" />
              <p
                className="mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-ink-soft)]"
              >
                Photograph · {site.city}
              </p>
            </Reveal>

            <div className="md:col-span-7 md:pt-4">
              <Reveal delay={1}>
                <h1
                  className="display"
                  style={{
                    fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                    lineHeight: 1,
                  }}
                >
                  Hello — I&apos;m{" "}
                  <em>{site.practitionerName}</em>.
                </h1>
              </Reveal>

              <Reveal delay={2}>
                <p
                  className="mt-10 max-w-[34rem] text-[color:var(--color-ink-mid)]"
                  style={{ fontSize: "1.15rem", lineHeight: 1.65 }}
                >
                  {/* TODO: first-person bio that opens with the client's experience */}
                  People often come to me when something they&apos;ve been
                  carrying has started to feel too heavy to keep carrying
                  alone — after an event, or after years of small things
                  that added up. My work is to help that weight become
                  something you can put down, piece by piece.
                </p>
              </Reveal>

              <Reveal delay={3}>
                <p
                  className="mt-6 max-w-[34rem] text-[color:var(--color-ink-mid)]"
                  style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
                >
                  I trained as a clinical psychologist with a focus on
                  trauma and complex stress, and I&apos;ve continued
                  studying body-aware approaches since — because
                  language alone often isn&apos;t enough.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── B / Approach principles ─── */}
      <Section index="B / How I work">
        <div className="grid gap-12 md:gap-20 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-5">
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.9rem, 3.6vw, 3rem)",
                lineHeight: 1.05,
                fontWeight: 400,
              }}
            >
              Three quiet commitments
              <br />
              I make to the work.
            </h2>
          </Reveal>

          <ol className="md:col-span-7 space-y-12">
            {[
              {
                n: "i.",
                title: "Pacing comes first.",
                body: "Trauma work is paced work. We don't dive into the hardest material on day one. We build internal resources, then process — at the speed your nervous system can actually tolerate.",
              },
              {
                n: "ii.",
                title: "The body is in the room.",
                body: "What you feel — your breath, your heart, the heaviness or restlessness — is information. We listen to it. Sometimes it leads, and we follow.",
              },
              {
                n: "iii.",
                title: "You are in charge of what we touch.",
                body: "You do not have to disclose everything to make progress. With EMDR and somatic work especially, we can move material without a play-by-play.",
              },
            ].map((p, i) => (
              <Reveal key={p.n} delay={((i % 3) + 1) as 1 | 2 | 3} as="li">
                <div className="grid grid-cols-[3rem_1fr] gap-6 pb-12 border-b border-[color:var(--color-rule-soft)] last:border-b-0 last:pb-0">
                  <span
                    className="font-mono text-[color:var(--color-accent)]"
                    style={{ fontSize: "12px", letterSpacing: "0.12em", paddingTop: "0.6rem" }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <h3
                      className="font-display"
                      style={{ fontSize: "1.6rem", fontWeight: 400 }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="mt-3 text-[color:var(--color-ink-mid)]"
                      style={{ lineHeight: 1.65 }}
                    >
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ─── C / Credentials ─── */}
      <section className="py-20 md:py-28 bg-[color:var(--color-paper-deep)] border-y border-[color:var(--color-rule-soft)]">
        <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal as="div" className="md:col-span-4">
              <p className="eyebrow">C / Training</p>
              <h2
                className="font-display mt-6"
                style={{
                  fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}
              >
                A continuing education.
              </h2>
              <p className="mt-5 text-[color:var(--color-ink-mid)] max-w-[22rem]">
                {/* TODO: brief framing of training philosophy */}
                The map keeps being redrawn. I keep training because the
                people I see deserve a practitioner who is still
                learning.
              </p>
            </Reveal>

            <Reveal as="div" className="md:col-span-8" delay={1}>
              <ul className="divide-y divide-[color:var(--color-rule-soft)]">
                {credentials.map((c) => (
                  <li
                    key={c.text}
                    className="grid grid-cols-[5rem_1fr] gap-6 py-5"
                  >
                    <span
                      className="font-mono text-[color:var(--color-ink-faint)]"
                      style={{ fontSize: "12px", letterSpacing: "0.1em", paddingTop: "0.25rem" }}
                    >
                      {c.year}
                    </span>
                    <span
                      className="font-display text-[color:var(--color-ink)]"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {c.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── D / Personal note + CTA ─── */}
      <Section index="D / Outside the room" spacing="loose">
        <div className="grid gap-10 md:grid-cols-12 items-end">
          <Reveal as="div" className="md:col-span-8">
            <h2
              className="display"
              style={{
                fontSize: "clamp(2.2rem, 4.6vw, 4rem)",
                lineHeight: 1,
              }}
            >
              The work of healing is also the work of{" "}
              <em>coming back to ordinary life</em>.
            </h2>
            <p
              className="mt-8 max-w-[36rem] text-[color:var(--color-ink-mid)]"
              style={{ fontSize: "1.1rem", lineHeight: 1.65 }}
            >
              {/* TODO: a brief personal note */}
              Outside of work I spend my time with [family, language,
              place, interest]. I am not impressed by suffering and I am
              not afraid of it.
            </p>
          </Reveal>

          <Reveal as="div" delay={1} className="md:col-span-4 md:text-right">
            <Button to="/contact" variant="primary">
              Get in touch
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
