import { Link } from "react-router-dom";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { withPh } from "@/components/ui/Ph";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { difficulties, faq, processSteps, services, site } from "@/lib/site";

export function Home() {
  useDocumentTitle(`${site.name} · Psiholog clinician & psihoterapeut`);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <Section as="div" spacing="loose" className="!pt-12 md:!pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="eyebrow">
              {site.title} · {withPh(site.city)} & online
            </p>
            <h1 className="display mt-5 text-[clamp(2.6rem,1.8rem+3.6vw,4.6rem)]">
              Un spațiu sigur, în care <em>vindecarea</em> se întâmplă în
              ritmul tău.
            </h1>
            <p className="mt-7 text-[18px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
              Sunt {site.name}, psiholog clinician și psihoterapeut specializat
              în terapia traumei. Însoțesc adulți care trec prin anxietate,
              depresie sau urmările unor experiențe copleșitoare — în cabinet,
              la {withPh(site.city)}, și online.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/contact">Programează o ședință</Button>
              <Button to="/cum-lucrez" variant="secondary" arrow={false}>
                Cum lucrez
              </Button>
            </div>
          </Reveal>

          <Reveal delay={150} className="justify-self-center w-full max-w-sm lg:max-w-none">
            <div className="portrait-arch aspect-[4/5] w-full">
              <span className="label">Fotografie portret</span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Trust strip ---------- */}
      <Section as="div" spacing="tight" tone="surface">
        <ul className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Atestat CPR", "Psiholog cu drept de liberă practică, Colegiul Psihologilor din România"],
            [`${site.experienceYears}+ ani de experiență`, "în evaluare clinică și psihoterapie"],
            ["Cabinet & online", "ședințe față în față sau prin apel video securizat"],
            ["Confidențialitate deplină", "secret profesional și protecția datelor (GDPR)"],
          ].map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 80}>
              <p className="font-[family-name:var(--font-display)] text-[1.15rem] font-medium text-[color:var(--color-ink)]">
                {withPh(title)}
              </p>
              <p className="mt-1 text-[14px] text-[color:var(--color-muted)]">{text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---------- Difficulties ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Cu ce te pot ajuta"
          title={<>Poate te regăsești în una dintre aceste situații</>}
          lead="Fiecare poveste este diferită. Acestea sunt însă dificultățile cu care oamenii ajung cel mai des în cabinetul meu."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {difficulties.map((d, i) => (
            <Reveal as="li" key={d.title} delay={(i % 4) * 70}>
              <div className="card card--hover h-full p-6">
                <h3 className="text-[1.05rem] leading-snug">{d.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[color:var(--color-body)]">
                  {d.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---------- Services preview ---------- */}
      <Section tone="surface" className="rounded-[2.5rem] mx-2 md:mx-4">
        <SectionHeading
          eyebrow="Servicii"
          title="Cum putem lucra împreună"
          lead="Psihoterapie individuală pentru adulți, cu specializare în terapia traumei — în cabinet sau online."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {services.slice(0, 3).map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <Link to="/servicii" className="card card--hover block h-full p-7">
                <h3 className="text-[1.25rem]">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{s.short}</p>
                <span className="text-link mt-5 inline-block text-[14.5px]">
                  Detalii și tarife
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Button to="/servicii" variant="secondary">
            Vezi toate serviciile
          </Button>
        </Reveal>
      </Section>

      {/* ---------- About preview ---------- */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="justify-self-center w-full max-w-xs lg:max-w-sm">
            <div className="portrait-arch aspect-[4/5] w-full">
              <span className="label">Fotografie</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Despre mine</p>
            <h2 className="mt-3 text-[clamp(1.9rem,1.4rem+2vw,2.9rem)]">
              „Cred că fiecare om poartă în sine resursele vindecării.
              Terapia doar le face loc.”
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
              {withPh(
                "Sunt psiholog clinician și psihoterapeut, cu formare în [modalitatea terapeutică] și specializare în lucrul cu trauma. [Scurtă descriere personală — 2-3 fraze despre parcurs, valori și felul în care lucrează — de completat.]",
              )}
            </p>
            <div className="mt-8">
              <Button to="/despre" variant="secondary">
                Citește povestea mea
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Private space ---------- */}
      <Section tone="dark" className="rounded-[2.5rem] mx-2 md:mx-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="eyebrow" style={{ color: "var(--color-clay-tint)" }}>
              Între ședințe
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,1.4rem+2vw,2.9rem)] text-[color:var(--color-cream)]">
              Terapia se întâmplă o oră pe săptămână. <em className="italic text-[color:var(--color-clay-tint)]">Restul</em>{" "}
              se întâmplă acasă.
            </h2>
            <p
              className="mt-6 text-[16.5px] leading-relaxed text-[color:var(--color-surface-deep)]"
              style={{ maxWidth: "var(--measure)" }}
            >
              „Spațiul tău” este o secțiune cu instrumente pe care le poți
              folosi oricând ai nevoie: respirație ghidată pentru momentele de
              panică, ancorare pentru când mintea pleacă, chestionare de
              screening validate clinic și un jurnal care îți arată ce se
              schimbă în timp.
            </p>
            <p
              className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-surface-deep)] opacity-80"
              style={{ maxWidth: "var(--measure)" }}
            >
              Totul rulează pe dispozitivul tău, criptat cu un cod pe care
              doar tu îl știi. Fără cont, fără server, fără statistici — nici
              măcar eu nu pot vedea ce notezi acolo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/spatiul-tau" variant="primary-light">
                Intră în spațiul tău
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                ["Respirație ghidată", "Cinci ritmuri, cu ghidaj vizual și sonor"],
                ["Ancorare 5-4-3-2-1", "Când prezentul se face nevăzut"],
                ["Chestionare", "GAD-7, PHQ-9, PC-PTSD-5, WHO-5"],
                ["Jurnal & tipare", "Ce te ajută, negru pe alb"],
              ].map(([title, text]) => (
                <li
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="font-[family-name:var(--font-display)] text-[1.05rem] text-[color:var(--color-cream)]">
                    {title}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--color-surface-deep)] opacity-80">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Process ---------- */}
      <Section tone="surface" className="rounded-[2.5rem] mx-2 md:mx-4">
        <SectionHeading
          eyebrow="Cum începem"
          title="Trei pași simpli până la prima ședință"
          center
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100}>
              <div className="card h-full p-7 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-pine)] font-[family-name:var(--font-display)] text-[1.1rem] text-[color:var(--color-cream)]">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[1.15rem]">{step.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed">{withPh(step.text)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------- FAQ teaser ---------- */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Întrebări frecvente"
              title="E firesc să ai întrebări înainte de a începe"
              lead="Am adunat răspunsuri la cele mai des întâlnite întrebări despre psihoterapie, confidențialitate și modul de lucru."
            />
            <Button to="/intrebari-frecvente" variant="secondary">
              Vezi toate întrebările
            </Button>
          </Reveal>
          <Reveal delay={120}>
            {faq.slice(0, 3).map((item) => (
              <details key={item.q} className="faq">
                <summary>
                  <span className="q">{item.q}</span>
                  <span className="mark" aria-hidden>+</span>
                </summary>
                <div className="a">
                  <p>{withPh(item.a)}</p>
                </div>
              </details>
            ))}
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
