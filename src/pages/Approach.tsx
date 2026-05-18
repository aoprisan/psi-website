import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const focus = [
  "PTSD & complex trauma",
  "Childhood & developmental trauma",
  "Grief & loss",
  "Anxiety & panic",
  "Attachment patterns",
  "Identity after rupture",
];

const modalities = [
  {
    n: "01",
    short: "EMDR",
    long: "Eye Movement Desensitization & Reprocessing",
    body: "An evidence-based approach for trauma that helps the brain re-process distressing memories so they lose their charge. Sets of bilateral stimulation — eye movements, taps — pair with a target memory while we track what comes up. Recommended as first-line treatment for PTSD by the WHO and the U.S. Department of Veterans Affairs.",
  },
  {
    n: "02",
    short: "CPT",
    long: "Cognitive Processing Therapy",
    body: "A structured, time-limited protocol (about twelve sessions) that works with the beliefs trauma installs — about ourselves, about others, and about what is safe. Especially useful when symptoms cluster around stuck thoughts: I should have known, it was my fault, no one is safe.",
  },
  {
    n: "03",
    short: "Somatic",
    long: "Somatic Experiencing & body-based work",
    body: "Trauma lives in the body as much as in memory. Somatic work tracks sensation, breath, and physiology to help the body finish what it didn't get to finish. Often interleaved with EMDR and CPT — three lenses on the same picture.",
  },
];

export function Approach() {
  useDocumentTitle(`Approach — ${site.practitionerName}`);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="pt-16 md:pt-28 pb-12">
        <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow eyebrow-accent">α / Approach</p>
          </Reveal>
          <Reveal delay={1}>
            <h1
              className="display mt-10"
              style={{
                fontSize: "clamp(2.6rem, 6.5vw, 5.8rem)",
                lineHeight: 0.98,
                maxWidth: "20ch",
              }}
            >
              Trauma-informed therapy,{" "}
              <em>at the pace of your nervous system</em>.
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p
              className="mt-10 max-w-[42rem] text-[color:var(--color-ink-mid)]"
              style={{ fontSize: "1.15rem", lineHeight: 1.65 }}
            >
              What follows is a sketch — who I work with, what we
              tend to work on, and the lenses I draw from. It is
              not the whole picture. The whole picture happens in
              the room.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── β / Who I work with ─── */}
      <Section index="β / Who I work with">
        <div className="grid gap-14 md:gap-20 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-5">
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.9rem, 3.8vw, 3rem)",
                lineHeight: 1.05,
                fontWeight: 400,
              }}
            >
              Adults navigating the after-weather of
              {" "}
              <em>something difficult</em>.
            </h2>
          </Reveal>

          <div className="md:col-span-7 grid gap-10">
            {[
              {
                n: "i.",
                title: "After a single event",
                body: "A specific moment that has not let go — an accident, an assault, a medical crisis, the death of someone you needed.",
              },
              {
                n: "ii.",
                title: "After a longer history",
                body: "Relational or developmental trauma, where harm came from those who were supposed to protect, or from environments that asked too much, too early.",
              },
              {
                n: "iii.",
                title: "First-time or returning",
                body: "Whether this is your first time in therapy or you're returning after time away — both are welcome, and they need different things.",
              },
            ].map((c, i) => (
              <Reveal key={c.n} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article className="grid grid-cols-[3rem_1fr] gap-6 pb-10 border-b border-[color:var(--color-rule-soft)]">
                  <span
                    className="font-mono text-[color:var(--color-ink-faint)]"
                    style={{ fontSize: "12px", letterSpacing: "0.1em", paddingTop: "0.5rem" }}
                  >
                    {c.n}
                  </span>
                  <div>
                    <h3
                      className="font-display"
                      style={{ fontSize: "1.5rem", fontWeight: 400 }}
                    >
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[color:var(--color-ink-mid)]" style={{ lineHeight: 1.65 }}>
                      {c.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── γ / Focus areas — index list ─── */}
      <Section index="γ / What we work on" spacing="tight">
        <div className="grid gap-10 md:grid-cols-12 items-start">
          <Reveal as="div" className="md:col-span-4">
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
                lineHeight: 1.1,
                fontWeight: 400,
              }}
            >
              An incomplete list.
            </h2>
            <p className="mt-4 text-[color:var(--color-ink-mid)] max-w-[20rem]">
              Trauma rarely arrives clean. People show up with several of
              these woven together.
            </p>
          </Reveal>

          <ul className="md:col-span-8">
            {focus.map((item, i) => (
              <Reveal key={item} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li">
                <div className="flex items-baseline justify-between gap-6 py-4 border-b border-[color:var(--color-rule-soft)] last:border-b-0">
                  <span
                    className="font-display text-[color:var(--color-ink)]"
                    style={{ fontSize: "1.45rem" }}
                  >
                    {item}
                  </span>
                  <span
                    className="font-mono text-[color:var(--color-ink-faint)]"
                    style={{ fontSize: "11px", letterSpacing: "0.18em" }}
                  >
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ─── δ / Modalities — long form ─── */}
      <section className="py-24 md:py-36 bg-[color:var(--color-paper-deep)] border-y border-[color:var(--color-rule-soft)]">
        <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow eyebrow-accent">δ / Modalities I draw from</p>
          </Reveal>

          <ol className="mt-16 space-y-20">
            {modalities.map((m, i) => (
              <Reveal key={m.n} delay={((i % 3) + 1) as 1 | 2 | 3} as="li">
                <article className="grid gap-8 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <p
                      className="font-mono text-[color:var(--color-accent)]"
                      style={{ fontSize: "13px", letterSpacing: "0.22em" }}
                    >
                      {m.n}
                    </p>
                    <h3
                      className="font-display mt-3"
                      style={{
                        fontSize: "clamp(2.4rem, 4.4vw, 4rem)",
                        fontWeight: 300,
                        lineHeight: 0.95,
                      }}
                    >
                      {m.short}
                    </h3>
                  </div>
                  <div className="md:col-span-9">
                    <p
                      className="font-display italic text-[color:var(--color-ink-soft)]"
                      style={{ fontSize: "1.15rem" }}
                    >
                      {m.long}
                    </p>
                    <p
                      className="mt-5 text-[color:var(--color-ink-mid)] max-w-[44rem]"
                      style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
                    >
                      {m.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── ε / First session ─── */}
      <Section index="ε / What a first session looks like" spacing="loose">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <Reveal as="div" className="md:col-span-8">
            <h2
              className="display"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4.4rem)",
                lineHeight: 1,
              }}
            >
              Mostly, the first session is{" "}
              <em>orientation</em>.
            </h2>
            <p
              className="mt-8 max-w-[40rem] text-[color:var(--color-ink-mid)]"
              style={{ fontSize: "1.1rem", lineHeight: 1.7 }}
            >
              We get a feel for what brings you in, what you&apos;ve
              already tried, what you&apos;d like to be different. I&apos;ll
              walk through how I work, what confidentiality looks like,
              and the practicalities — fees, frequency, scheduling. You
              don&apos;t need to prepare anything in particular.
            </p>
          </Reveal>
          <Reveal as="div" delay={1} className="md:col-span-4 md:text-right">
            <Button to="/contact" variant="primary">
              Book a consultation
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
