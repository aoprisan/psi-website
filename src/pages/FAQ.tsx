import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const faqs: { q: string; a: string }[] = [
  {
    q: "How long is a session and how often do we meet?",
    a: "TODO: Sessions are 50 minutes, usually weekly. For trauma work, consistency tends to matter more than frequency — every other week works for some, but we'll find the rhythm that holds you.",
  },
  {
    q: "What are your fees?",
    a: "TODO: The standard fee is $[amount] per 50-minute session. A small number of sliding-scale spots are reserved for clients for whom the standard fee is a barrier — please ask.",
  },
  {
    q: "Do you accept insurance?",
    a: "TODO: I am [in-network with X / an out-of-network provider]. I can provide a superbill for reimbursement through your out-of-network benefits.",
  },
  {
    q: "Are sessions in-person or online?",
    a: "TODO: I offer both. In-person sessions are at the office in [neighborhood]; telehealth is available within [state].",
  },
  {
    q: "What is confidentiality like?",
    a: "TODO: What we discuss is confidential, with the legal exceptions that bind all psychologists — risk of serious harm to self or others, abuse of a minor or vulnerable adult, court order. I'll walk through these in detail in the first session.",
  },
  {
    q: "What does trauma therapy actually feel like?",
    a: "TODO: Paced. We don't dive into the hardest material on day one. We build internal resources first, then process — and we move at a speed your nervous system can tolerate. There are no surprises.",
  },
  {
    q: "Will I have to talk about everything in detail?",
    a: "TODO: No. Approaches like EMDR and somatic work do not require detailed verbal retelling. You stay in charge of how much you share and how close we get to the material.",
  },
  {
    q: "What is your cancellation policy?",
    a: "TODO: I ask for [24/48] hours notice for cancellations. Late cancellations and no-shows are charged at the full session rate, except in true emergencies.",
  },
];

export function FAQ() {
  useDocumentTitle(`FAQ — ${site.practitionerName}`);

  return (
    <>
      <section className="pt-16 md:pt-28 pb-8">
        <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow eyebrow-accent">F / Frequently asked</p>
          </Reveal>
          <Reveal delay={1}>
            <h1
              className="display mt-10"
              style={{
                fontSize: "clamp(2.6rem, 6vw, 5.4rem)",
                lineHeight: 0.98,
                maxWidth: "18ch",
              }}
            >
              The questions people{" "}
              <em>tend to ask before</em> they call.
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p
              className="mt-10 max-w-[40rem] text-[color:var(--color-ink-mid)]"
              style={{ fontSize: "1.1rem", lineHeight: 1.65 }}
            >
              If your question isn&apos;t covered here, the
              consultation call is a good place to ask it.
            </p>
          </Reveal>
        </div>
      </section>

      <Section index="F / The answers" spacing="default">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3 md:sticky md:top-32 md:self-start">
            <Reveal>
              <p
                className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-ink-soft)]"
              >
                {faqs.length} questions
              </p>
              <p className="mt-4 text-[color:var(--color-ink-mid)] max-w-[14rem]" style={{ fontSize: "0.95rem" }}>
                Click any question to reveal the answer.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-9">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <details className="faq">
                  <summary>
                    <span className="flex items-baseline gap-5 md:gap-7">
                      <span
                        className="font-mono text-[color:var(--color-ink-faint)] hidden md:inline"
                        style={{ fontSize: "11px", letterSpacing: "0.18em", paddingTop: "0.3rem" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="q">{item.q}</span>
                    </span>
                    <span className="mark" />
                  </summary>
                  <p className="a">{item.a}</p>
                </details>
              </Reveal>
            ))}

            <Reveal delay={1}>
              <div className="mt-16">
                <Button to="/contact" variant="primary">
                  Ask a question directly
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
