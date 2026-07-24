import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CrisisNote } from "@/components/ui/CrisisNote";
import { CtaBand } from "@/components/ui/CtaBand";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site } from "@/lib/site";

const tools = [
  {
    to: "/resurse/chestionare",
    eyebrow: "Autoevaluare",
    title: "Chestionare validate științific",
    text: "GAD-7, PHQ-9 și PC-PTSD-5 — instrumentele standard pentru anxietate, depresie și stres posttraumatic, cu rezultat imediat și explicat pe înțeles.",
    meta: "1–3 minute fiecare",
  },
  {
    to: "/resurse/respiratie",
    eyebrow: "Reglare",
    title: "Respirație ghidată",
    text: "Trei tehnici de respirație cu ghidaj vizual — coerentă, în patru timpi și 4-7-8 — pentru momentele în care corpul are nevoie de calm.",
    meta: "3–5 minute",
  },
  {
    to: "/resurse/ancorare",
    eyebrow: "Ancorare",
    title: "Exercițiul 5-4-3-2-1",
    text: "O tehnică de grounding folosită în terapia traumei: cele cinci simțuri te readuc în prezent, pas cu pas.",
    meta: "3–4 minute",
  },
  {
    to: "/resurse/jurnal",
    eyebrow: "Jurnal",
    title: "Jurnal de stare privat",
    text: "Notează-ți starea zilnic și urmărește-i evoluția pe 30 de zile. Totul rămâne pe dispozitivul tău — poți exporta sau șterge oricând.",
    meta: "30 de secunde pe zi",
  },
] as const;

export function ResourcesHub() {
  useDocumentTitle(`Resurse interactive · ${site.name}`);
  return (
    <>
      <PageHero
        eyebrow="Resurse"
        title={
          <>
            Instrumente pentru <em>între ședințe</em> — sau pentru început
          </>
        }
        lead="O colecție de instrumente interactive, gratuite și complet confidențiale: chestionare validate, exerciții de reglare și un jurnal privat. Funcționează direct în browser — nimic din ce faci aici nu părăsește dispozitivul tău."
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {tools.map((tool, i) => (
            <Reveal key={tool.to} delay={(i % 2) * 90}>
              <Link to={tool.to} className="card card--hover block h-full p-7 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="eyebrow">{tool.eyebrow}</p>
                  <span className="whitespace-nowrap text-[12.5px] font-semibold text-[color:var(--color-muted)]">
                    {tool.meta}
                  </span>
                </div>
                <h2 className="mt-3 text-[1.35rem]">{tool.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed">{tool.text}</p>
                <span className="text-link mt-5 inline-block text-[14.5px]">Deschide</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-[color:var(--color-line-soft)] bg-[color:var(--color-surface)] p-6 text-[14.5px] leading-relaxed h-full">
              <p className="font-semibold text-[color:var(--color-ink)]">
                De ce sunt aceste resurse aici
              </p>
              <p className="mt-2">
                În terapia traumei, stabilizarea vine înaintea procesării:
                un sistem nervos care se simte în siguranță poate începe să se
                vindece. Aceste instrumente sunt un sprijin între ședințe și un
                mod blând de a începe — nu înlocuiesc psihoterapia, dar o pot
                însoți.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <CrisisNote />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
