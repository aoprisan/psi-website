import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { withPh } from "@/components/ui/Ph";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { fees, services, site } from "@/lib/site";

export function Services() {
  useDocumentTitle(`Servicii & tarife · ${site.name}`);

  return (
    <>
      <PageHero
        eyebrow="Servicii & tarife"
        title={
          <>
            Sprijin <em>profesionist</em>, adaptat nevoilor tale
          </>
        }
        lead="Toate ședințele durează 50 de minute și se desfășoară într-un cadru confidențial — în cabinet sau online. Prima întâlnire este una de cunoaștere, fără nicio obligație de a continua."
      />

      {/* ---------- Service details ---------- */}
      <Section>
        <div className="space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 2) * 60}>
              <article
                id={s.slug}
                className="card grid gap-6 p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] scroll-mt-28"
              >
                <div>
                  <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)]">{s.title}</h2>
                  <p className="mt-4 text-[16px] leading-relaxed">{s.short}</p>
                </div>
                <ul className="space-y-3 self-center text-[15.5px] leading-relaxed">
                  {s.details.map((d, j) => (
                    <li key={j} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--color-clay)]"
                      />
                      <span>{withPh(d)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Fees ---------- */}
      <Section tone="surface" className="rounded-[2.5rem] mx-2 md:mx-4">
        <SectionHeading
          eyebrow="Tarife"
          title="Investiția în procesul tău"
          lead="Tarifele sunt transparente, fără costuri ascunse. Plata se poate face [numerar / card / transfer bancar — de completat]."
        />
        <Reveal>
          <div className="card overflow-hidden max-w-3xl">
            <table className="w-full text-left text-[15.5px]">
              <caption className="sr-only">Lista tarifelor</caption>
              <thead>
                <tr className="border-b border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
                  <th scope="col" className="px-6 py-4 font-semibold text-[color:var(--color-ink)]">
                    Serviciu
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-[color:var(--color-ink)] text-right">
                    Tarif
                  </th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.service} className="border-b border-[color:var(--color-line-soft)] last:border-0">
                    <td className="px-6 py-4">{f.service}</td>
                    <td className="px-6 py-4 text-right font-semibold text-[color:var(--color-ink)] whitespace-nowrap">
                      {withPh(f.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={100} className="mt-8 max-w-3xl space-y-3 text-[14.5px] leading-relaxed text-[color:var(--color-body)]">
          <p>
            <strong className="text-[color:var(--color-ink)]">Politica de anulare:</strong>{" "}
            {withPh(
              "ședințele pot fi reprogramate sau anulate gratuit cu cel puțin 24 de ore înainte. [Politica pentru anulările târzii — de completat.]",
            )}
          </p>
          <p>
            <strong className="text-[color:var(--color-ink)]">Decontare:</strong>{" "}
            {withPh(
              "[Informații despre decontare prin asigurări private / abonamente medicale (ex. Regina Maria, Medicover) sau eliberarea de chitanță/factură — de completat.]",
            )}
          </p>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
