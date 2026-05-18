import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function NotFound() {
  useDocumentTitle("Not found");

  return (
    <section className="pt-28 md:pt-40 pb-28">
      <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow eyebrow-accent">404</p>
        </Reveal>
        <Reveal delay={1}>
          <h1
            className="display mt-10"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              lineHeight: 0.98,
            }}
          >
            We can&apos;t find that page,
            <br />
            <em>but you&apos;re here.</em>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p
            className="mt-10 max-w-[34rem] text-[color:var(--color-ink-mid)]"
            style={{ fontSize: "1.1rem", lineHeight: 1.65 }}
          >
            The page you&apos;re looking for doesn&apos;t exist, or it
            may have moved. Try the homepage, or reach out directly.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-12 flex flex-wrap gap-8 items-center">
            <Button to="/" variant="primary">
              Back home
            </Button>
            <Button to="/contact">Contact</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
