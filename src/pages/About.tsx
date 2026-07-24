import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { withPh } from "@/components/ui/Ph";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site, training } from "@/lib/site";

const values = [
  {
    title: "Siguranță, înainte de toate",
    text: "Vindecarea începe abia atunci când sistemul nervos se simte în siguranță. Construim mai întâi stabilitate, apoi mergem mai departe.",
  },
  {
    title: "Ritmul tău, nu al meu",
    text: "Nu forțez procesul și nu grăbesc etapele. Tu decizi cât, când și cât de adânc mergem.",
  },
  {
    title: "Respect și lipsă de judecată",
    text: "Orice ai trăit și orice ai făcut pentru a supraviețui are sens. În cabinet nu există „reacții greșite”.",
  },
  {
    title: "Profesionalism și etică",
    text: "Lucrez conform Codului deontologic al Colegiului Psihologilor din România, cu supervizare și formare continuă.",
  },
];

export function About() {
  useDocumentTitle(`Despre mine · ${site.name}`);

  return (
    <>
      <PageHero
        eyebrow="Despre mine"
        title={
          <>
            {site.name}, <em>psiholog clinician</em> și psihoterapeut
          </>
        }
        lead={withPh(
          "Însoțesc adulți în procesul de vindecare a traumei și a rănilor emoționale, cu blândețe, rigoare profesională și încredere în capacitatea fiecărui om de a se reface.",
        )}
      />

      {/* ---------- Bio ---------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal className="w-full max-w-xs lg:max-w-sm justify-self-center lg:justify-self-start lg:sticky lg:top-28 self-start">
            <div className="portrait-arch aspect-[4/5] w-full">
              <span className="label">Fotografie portret</span>
            </div>
            <div className="card mt-6 p-5 text-[14px] leading-relaxed">
              <p className="font-semibold text-[color:var(--color-ink)]">Pe scurt</p>
              <ul className="mt-2 space-y-1.5">
                <li>{withPh("Psiholog clinician — treapta [practicant / specialist / principal]")}</li>
                <li>{withPh("Psihoterapeut — [modalitatea de formare]")}</li>
                <li>{withPh(`${site.experienceYears}+ ani de experiență clinică`)}</li>
                <li>{withPh(`Cabinet în ${site.city} & ședințe online`)}</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100} className="space-y-6 text-[16.5px] leading-relaxed" >
            <h2 className="text-[clamp(1.7rem,1.3rem+1.6vw,2.4rem)]">Povestea mea profesională</h2>
            <p>
              {withPh(
                "[Paragraf introductiv — de ce a ales psihologia, ce o motivează în lucrul cu oamenii. 3-4 fraze, ton cald și personal — de completat.]",
              )}
            </p>
            <p>
              {withPh(
                "[Paragraf despre specializarea în traumă — cum a ajuns la acest domeniu, ce a învățat despre vindecarea traumei, ce experiență clinică are. — de completat.]",
              )}
            </p>
            <p>
              {withPh(
                "[Paragraf despre viața de zi cu zi în cabinet — cu cine lucrează cel mai des, cum arată colaborarea, un detaliu personal care o umanizează. — de completat.]",
              )}
            </p>
            <blockquote className="border-l-2 border-[color:var(--color-clay)] pl-5 font-[family-name:var(--font-display)] text-[1.35rem] italic text-[color:var(--color-ink)]">
              {withPh("„[Un citat sau un crez personal despre terapie — de completat.]”")}
            </blockquote>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Values ---------- */}
      <Section tone="surface" className="rounded-[2.5rem] mx-2 md:mx-4">
        <SectionHeading
          eyebrow="Valorile mele"
          title="Principiile după care lucrez"
        />
        <ul className="grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={(i % 2) * 90}>
              <div className="card h-full p-7">
                <h3 className="text-[1.2rem]">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---------- Training ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Formare & acreditări"
          title="Pregătire profesională"
          lead={withPh(
            "Atestat de liberă practică eliberat de Colegiul Psihologilor din România — [numărul atestatului și treapta de specializare, de completat].",
          )}
        />
        <ol className="max-w-3xl">
          {training.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 60}>
              <div className="grid gap-2 border-b border-[color:var(--color-line)] py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
                <p className="text-[14px] font-semibold text-[color:var(--color-muted)]">
                  {withPh(t.period)}
                </p>
                <div>
                  <h3 className="text-[1.15rem]">{withPh(t.title)}</h3>
                  <p className="mt-1 text-[15px] text-[color:var(--color-body)]">
                    {withPh(t.detail)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-8 max-w-3xl">
          <p className="text-[14.5px] italic text-[color:var(--color-muted)]">
            {withPh(
              "[Alte cursuri, conferințe, afilieri profesionale (ex. asociații de psihoterapie, EMDR România etc.) — de completat.]",
            )}
          </p>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
