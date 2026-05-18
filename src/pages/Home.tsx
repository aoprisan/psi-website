import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Home() {
  useDocumentTitle(`${site.practitionerName} — ${site.tagline}`);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="pt-16 md:pt-28 pb-16 md:pb-28 overflow-hidden">
        <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
          <div className="grid gap-14 md:gap-20 md:grid-cols-12 items-end">
            <div className="md:col-span-8">
              <Reveal>
                <p className="eyebrow eyebrow-accent">
                  01 / A psychotherapy practice
                </p>
              </Reveal>

              <Reveal delay={1}>
                <h1
                  className="display mt-8"
                  style={{
                    fontSize: "clamp(2.8rem, 7vw, 6.2rem)",
                  }}
                >
                  There is a way{" "}
                  <em>through</em> that doesn&apos;t require you to
                  hurry.
                </h1>
              </Reveal>

              <Reveal delay={2}>
                <p
                  className="mt-10 md:mt-14 max-w-[36rem]"
                  style={{
                    fontSize: "1.15rem",
                    color: "var(--color-ink-mid)",
                    lineHeight: 1.6,
                  }}
                >
                  {/* TODO: practitioner&apos;s own sub-headline */}
                  A private practice for adults working with the
                  aftermath of trauma — using evidence-based and
                  body-aware approaches, paced to your nervous
                  system rather than a calendar.
                </p>
              </Reveal>

              <Reveal delay={3}>
                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <Button to="/contact" variant="primary">
                    Book a consultation
                  </Button>
                  <Button to="/approach">The approach</Button>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-4">
              <Reveal delay={2}>
                <div className="portrait aspect-[4/5]" />
              </Reveal>
              <Reveal delay={3}>
                <div className="mt-6 grid grid-cols-2 gap-6 text-[13px]">
                  <div>
                    <p className="eyebrow">Practice</p>
                    <p className="mt-2 text-[color:var(--color-ink)]">
                      {site.established}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow">Based in</p>
                    <p className="mt-2 text-[color:var(--color-ink)]">
                      {site.city}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Hairline marquee under hero */}
          <Reveal delay={4}>
            <div className="mt-20 md:mt-28 pt-6 border-t border-[color:var(--color-rule)] flex flex-wrap items-center justify-between gap-y-2 gap-x-8">
              <p className="eyebrow">
                EMDR · CPT · Somatic Experiencing
              </p>
              <p className="eyebrow text-[color:var(--color-ink-faint)]">
                Currently accepting clients · 50-min sessions
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 02 / What I work with ─── */}
      <Section index="02 / Areas of focus" spacing="loose">
        <div className="grid gap-14 md:gap-20 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-5">
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                lineHeight: 1.05,
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Most of the people I see arrive
              {" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-accent)",
                }}
              >
                tired of carrying it
              </em>
              .
            </h2>
            <p
              className="mt-8 text-[color:var(--color-ink-mid)] max-w-[28rem]"
              style={{ fontSize: "1.05rem", lineHeight: 1.65 }}
            >
              The work is about meeting that weight — not racing
              past it. We build the conditions for the body to
              feel safe first, and the rest follows.
            </p>
          </Reveal>

          <div className="md:col-span-7 md:pt-2">
            {[
              {
                n: "i.",
                title: "Trauma & PTSD",
                body: "Single-incident and complex trauma, including childhood and relational injury, and the symptoms that linger long after.",
              },
              {
                n: "ii.",
                title: "Anxiety & overwhelm",
                body: "Persistent worry, panic, and the body responses — racing heart, tight chest, sleep that won't settle — that come with them.",
              },
              {
                n: "iii.",
                title: "Grief & life after",
                body: "Loss, transitions, and the long work of building a recognisable self again after a hard chapter.",
              },
            ].map((c, i) => (
              <Reveal key={c.n} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article className="grid grid-cols-[3rem_1fr] gap-6 py-8 border-t border-[color:var(--color-rule-soft)] last:border-b">
                  <span
                    className="font-mono text-[color:var(--color-ink-faint)]"
                    style={{ fontSize: "12px", letterSpacing: "0.1em", paddingTop: "0.45rem" }}
                  >
                    {c.n}
                  </span>
                  <div>
                    <h3
                      className="font-display"
                      style={{ fontSize: "1.6rem", fontWeight: 400 }}
                    >
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[color:var(--color-ink-mid)]">
                      {c.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Pull-quote pause ─── */}
      <section className="py-28 md:py-44 bg-[color:var(--color-paper-deep)] border-y border-[color:var(--color-rule-soft)] relative">
        <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow eyebrow-accent">In the room</p>
          </Reveal>
          <Reveal delay={1}>
            <blockquote
              className="display mt-10 md:mt-14 max-w-[60rem]"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 4.2rem)",
                lineHeight: 1.04,
              }}
            >
              <span aria-hidden style={{ color: "var(--color-accent)" }}>
                “
              </span>
              We don&apos;t begin with the hardest material on day
              one. We begin by making sure your body knows it is{" "}
              <em>somewhere safe enough to begin</em>.
              <span aria-hidden style={{ color: "var(--color-accent)" }}>
                ”
              </span>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ─── 03 / Modalities ─── */}
      <Section index="03 / Modalities" spacing="loose">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-4">
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.9rem, 3.6vw, 3rem)",
                lineHeight: 1.05,
                fontWeight: 400,
              }}
            >
              Three lenses, one steady direction.
            </h2>
            <p
              className="mt-6 text-[color:var(--color-ink-mid)] max-w-[24rem]"
              style={{ fontSize: "1.02rem", lineHeight: 1.65 }}
            >
              I draw from established trauma modalities, choosing what fits
              the person in front of me rather than insisting on a single
              method.
            </p>
            <div className="mt-10">
              <Button to="/approach">Read the long form</Button>
            </div>
          </Reveal>

          <ol className="md:col-span-8 md:pl-6 space-y-12">
            {[
              {
                n: "01",
                short: "EMDR",
                long: "Eye Movement Desensitization & Reprocessing",
                body: "Helps the brain re-process distressing memories so they lose their charge. Evidence-based for PTSD; first-line recommended by the WHO and the U.S. Veterans Affairs.",
              },
              {
                n: "02",
                short: "CPT",
                long: "Cognitive Processing Therapy",
                body: "A structured, time-limited approach for PTSD that works with the beliefs trauma installs — about ourselves, about others, and about what is safe.",
              },
              {
                n: "03",
                short: "Somatic",
                long: "Somatic Experiencing & body-based work",
                body: "Trauma lives in the body as much as in memory. Somatic work tracks sensation and physiology to help the body finish what it didn't get to finish.",
              },
            ].map((m, i) => (
              <Reveal key={m.n} delay={((i % 3) + 1) as 1 | 2 | 3} as="li">
                <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline">
                  <span
                    className="font-mono text-[color:var(--color-accent)]"
                    style={{ fontSize: "13px", letterSpacing: "0.18em" }}
                  >
                    {m.n}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3
                        className="font-display"
                        style={{ fontSize: "2rem", fontWeight: 400 }}
                      >
                        {m.short}
                      </h3>
                      <p
                        className="font-display italic text-[color:var(--color-ink-soft)]"
                        style={{ fontSize: "1.1rem", fontWeight: 400 }}
                      >
                        {m.long}
                      </p>
                    </div>
                    <p
                      className="mt-3 text-[color:var(--color-ink-mid)] max-w-[40rem]"
                      style={{ lineHeight: 1.65 }}
                    >
                      {m.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ─── Closing CTA ─── */}
      <Section index="04 / A first conversation" spacing="loose">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <Reveal as="div" className="md:col-span-8">
            <h2
              className="display"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.6rem)",
                lineHeight: 1,
              }}
            >
              If you&apos;ve read this far,
              <br />
              perhaps a <em>conversation</em>.
            </h2>
            <p
              className="mt-8 text-[color:var(--color-ink-mid)] max-w-[34rem]"
              style={{ fontSize: "1.1rem", lineHeight: 1.6 }}
            >
              A free 15-minute call is a low-pressure way to ask
              questions and see how it feels to talk. There&apos;s no
              commitment to continue.
            </p>
          </Reveal>

          <Reveal as="div" className="md:col-span-4 md:text-right">
            <Button to="/contact" variant="primary">
              Book a consultation
            </Button>
            <p
              className="mt-5 eyebrow"
              style={{ color: "var(--color-ink-faint)" }}
            >
              Or write to{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-[color:var(--color-ink)]"
              >
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
