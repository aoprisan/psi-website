import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { withPh } from "@/components/ui/Ph";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site } from "@/lib/site";

const principles = [
  {
    title: "Informat de traumă",
    text: "Trauma nu este un semn de slăbiciune, ci răspunsul firesc al minții și al corpului la ceva copleșitor. Tot ce facem în terapie pornește de la această înțelegere: întâi siguranță și stabilizare, apoi procesare, apoi reconectare cu viața.",
  },
  {
    title: "Relația terapeutică vindecă",
    text: "Cercetările arată constant că relația dintre client și terapeut este unul dintre cei mai importanți factori ai schimbării. De aceea investesc în încredere, transparență și colaborare reală.",
  },
  {
    title: "Corpul face parte din proces",
    text: "Trauma se înscrie și în corp — în tensiune, vigilență, amorțire. Lucrăm și cu senzațiile corporale, nu doar cu gândurile și amintirile, pentru ca schimbarea să fie profundă și durabilă.",
  },
  {
    title: "Bazat pe dovezi, adaptat ție",
    text: "Folosesc metode validate științific, dar nu aplic rețete. Planul terapeutic se construiește în jurul istoriei, al resurselor și al obiectivelor tale.",
  },
];

const methods = [
  "[Formarea de bază — ex. psihoterapie integrativă / cognitiv-comportamentală — de completat]",
  "[Metode de lucru cu trauma — ex. EMDR, Somatic Experiencing, IoPT — de completat]",
  "[Alte tehnici: mindfulness, tehnici de reglare emoțională etc. — de completat]",
];

const firstSession = [
  {
    title: "Ne cunoaștem",
    text: "Vorbim despre ce te aduce la terapie și despre ce ți-ai dori să se schimbe. Poți spune atât cât te simți confortabil — nimic mai mult.",
  },
  {
    title: "Îți răspund la întrebări",
    text: "Despre metodă, durată, confidențialitate, tarife — orice ai nevoie să știi ca să te simți în siguranță.",
  },
  {
    title: "Stabilim cadrul împreună",
    text: "Frecvența ședințelor, obiectivele și modul de lucru. Dacă simți că nu ne potrivim, te pot orienta către un alt specialist.",
  },
];

export function Approach() {
  useDocumentTitle(`Cum lucrez · ${site.name}`);

  return (
    <>
      <PageHero
        eyebrow="Cum lucrez"
        title={
          <>
            O terapie în ritmul unui <em>sistem nervos</em> care se simte în
            siguranță
          </>
        }
        lead="Abordarea mea este caldă și riguroasă în același timp: metode validate științific, aplicate cu respect pentru ritmul și povestea fiecărui om."
      />

      {/* ---------- Principles ---------- */}
      <Section>
        <SectionHeading eyebrow="Principii" title="Ce cred despre vindecare" />
        <ul className="grid gap-5 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 90}>
              <div className="card h-full p-7">
                <h3 className="text-[1.2rem]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---------- Methods ---------- */}
      <Section tone="surface" className="rounded-[2.5rem] mx-2 md:mx-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Metode"
              title="Formare și instrumente de lucru"
              lead="Metodele pe care le folosesc sunt alese în funcție de nevoile tale, nu invers."
            />
            <ul className="space-y-4">
              {methods.map((m, i) => (
                <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed">
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--color-clay)]"
                  />
                  <span>{withPh(m)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="card self-center p-8 md:p-10">
            <h3 className="text-[1.3rem]">Etică și confidențialitate</h3>
            <ul className="mt-5 space-y-4 text-[15px] leading-relaxed">
              <li>
                <strong className="text-[color:var(--color-ink)]">Secret profesional.</strong>{" "}
                Tot ce discutăm rămâne între noi, conform legii și Codului
                deontologic al Colegiului Psihologilor din România.
              </li>
              <li>
                <strong className="text-[color:var(--color-ink)]">Supervizare.</strong>{" "}
                {withPh(
                  "Particip constant la supervizare profesională și formare continuă. [Detalii — de completat.]",
                )}
              </li>
              <li>
                <strong className="text-[color:var(--color-ink)]">Protecția datelor.</strong>{" "}
                Datele tale personale sunt prelucrate conform GDPR — vezi{" "}
                politica de confidențialitate.
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ---------- First session ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Prima ședință"
          title="La ce să te aștepți la prima întâlnire"
          lead="Multora, primul pas li se pare cel mai greu. Prima ședință este gândită să fie cât mai blândă cu putință."
          center
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {firstSession.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100}>
              <div className="card h-full p-7 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-pine)] font-[family-name:var(--font-display)] text-[1.1rem] text-[color:var(--color-cream)]">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[1.15rem]">{step.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
