import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Contact() {
  useDocumentTitle(`Contact — ${site.practitionerName}`);

  return (
    <>
      <section className="pt-16 md:pt-28 pb-12">
        <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow eyebrow-accent">C / Contact</p>
          </Reveal>
          <Reveal delay={1}>
            <h1
              className="display mt-10"
              style={{
                fontSize: "clamp(2.6rem, 6.5vw, 5.8rem)",
                lineHeight: 0.98,
                maxWidth: "16ch",
              }}
            >
              The first step is{" "}
              <em>a short conversation</em>.
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p
              className="mt-10 max-w-[40rem] text-[color:var(--color-ink-mid)]"
              style={{ fontSize: "1.15rem", lineHeight: 1.65 }}
            >
              A free 15-minute consultation call is a low-pressure
              way to ask questions, share a little about what brings
              you in, and see if it feels like a fit. There&apos;s no
              commitment to continue beyond it.
            </p>
          </Reveal>
        </div>
      </section>

      <Section index="C / Get in touch" spacing="default">
        <div className="grid gap-16 md:gap-20 md:grid-cols-12">
          {/* Left: contact details */}
          <Reveal as="div" className="md:col-span-5">
            <dl className="space-y-10">
              <div>
                <dt className="eyebrow">By email</dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-display text-[color:var(--color-ink)] under-link"
                    style={{ fontSize: "1.7rem" }}
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">By phone</dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${site.phone.replace(/\D/g, "")}`}
                    className="font-display text-[color:var(--color-ink)] under-link"
                    style={{ fontSize: "1.7rem" }}
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Office</dt>
                <dd
                  className="mt-3 text-[color:var(--color-ink)] not-italic font-display"
                  style={{ fontSize: "1.25rem", lineHeight: 1.45 }}
                >
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Hours</dt>
                <dd
                  className="mt-3 text-[color:var(--color-ink-mid)]"
                  style={{ fontSize: "0.95rem" }}
                >
                  Monday – Thursday, by appointment.
                  <br />
                  In-person and telehealth.
                </dd>
              </div>
            </dl>

            <p
              className="mt-14 text-[color:var(--color-ink-soft)] max-w-[28rem]"
              style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              Please do not include sensitive clinical information in
              your first message. Email is not a secure channel — we
              will move to a phone or video call quickly.
            </p>
          </Reveal>

          {/* Right: editorial form */}
          <Reveal as="div" className="md:col-span-7" delay={1}>
            <form
              className="border border-[color:var(--color-rule)] bg-[color:var(--color-paper-deep)] p-8 md:p-12"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex items-baseline justify-between gap-4 mb-10">
                <p className="eyebrow eyebrow-accent">Send a note</p>
                <p
                  className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-ink-faint)]"
                >
                  Skeleton — not yet wired
                </p>
              </div>

              <div className="space-y-2">
                <div className="field">
                  <label htmlFor="c-name">Your name</label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    placeholder="First Last"
                    disabled
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    disabled
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-msg">A brief message</label>
                  <textarea
                    id="c-msg"
                    name="message"
                    rows={5}
                    placeholder="A sentence or two about what you're looking for."
                    disabled
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between gap-6 flex-wrap">
                <button
                  type="submit"
                  disabled
                  aria-disabled="true"
                  className="btn-primary"
                  style={{
                    background: "var(--color-ink-faint)",
                    cursor: "not-allowed",
                  }}
                >
                  <span>Send message</span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                    <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
                  </svg>
                </button>
                <p
                  className="text-[color:var(--color-ink-soft)]"
                  style={{ fontSize: "0.85rem", maxWidth: "20rem" }}
                >
                  For now, please email or call directly. The form is
                  placeholder until it&apos;s wired to a secure endpoint.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
