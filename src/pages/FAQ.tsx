import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { withPh } from "@/components/ui/Ph";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { faq, site } from "@/lib/site";

export function FAQ() {
  useDocumentTitle(`Întrebări frecvente · ${site.name}`);

  return (
    <>
      <PageHero
        eyebrow="Întrebări frecvente"
        title={
          <>
            Răspunsuri <em>calme</em> la întrebări firești
          </>
        }
        lead="Dacă nu găsești aici răspunsul de care ai nevoie, scrie-mi — îți răspund cu drag."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 4) * 50}>
              <details className="faq">
                <summary>
                  <span className="q">{item.q}</span>
                  <span className="mark" aria-hidden>+</span>
                </summary>
                <div className="a">
                  <p>{withPh(item.a)}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
