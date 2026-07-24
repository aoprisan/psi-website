import { Link } from "react-router-dom";
import { nav, site } from "@/lib/site";
import { withPh } from "@/components/ui/Ph";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-[color:var(--color-pine)] text-[color:var(--color-surface-deep)]">
      <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-16 md:py-20">
        {/* Top — identity + crisis note. */}
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] pb-14">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3vw,2.4rem)] text-[color:var(--color-cream)]">
              {site.name}
            </p>
            <p className="mt-2 text-[15px]">{site.title}</p>
            <p className="mt-1 text-[15px] italic opacity-80">{site.specialization}</p>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed opacity-70">
              {withPh(site.cprAttestation)}
            </p>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-clay-tint)]">
              Dacă ai nevoie de ajutor acum
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed">
              Acest site nu este destinat urgențelor. Dacă tu sau cineva drag
              treceți printr-o criză, sunați la <strong>112</strong> sau la
              linia de prevenire a suicidului{" "}
              <a href="tel:0800801200" className="underline underline-offset-2 whitespace-nowrap">
                0800 801 200
              </a>{" "}
              (gratuit, apelabil în fiecare vineri, sâmbătă și duminică, 19:00–7:00).
            </p>
          </aside>
        </div>

        {/* Middle — contact, navigation, legal. */}
        <div className="grid gap-10 md:grid-cols-3 border-t border-white/10 pt-12 pb-14 text-[15px]">
          <div>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-clay-tint)]">
              Contact
            </p>
            <ul className="space-y-2">
              <li>{withPh(site.email)}</li>
              <li>{withPh(site.phone)}</li>
              <li className="leading-relaxed">{withPh(site.address)}</li>
              <li className="opacity-70">{withPh(site.schedule)}</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-clay-tint)]">
              Navigare
            </p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-[color:var(--color-cream)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-clay-tint)]">
              Informații legale
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/confidentialitate" className="hover:text-[color:var(--color-cream)] transition-colors">
                  Politica de confidențialitate (GDPR)
                </Link>
              </li>
              <li>
                <a
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[color:var(--color-cream)] transition-colors"
                >
                  ANPC — Soluționarea alternativă a litigiilor
                </a>
              </li>
              <li>
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[color:var(--color-cream)] transition-colors"
                >
                  Soluționarea online a litigiilor (SOL)
                </a>
              </li>
              <li className="leading-relaxed opacity-70">
                {withPh("[Cabinet Individual de Psihologie Liliana Oprișan — CUI, date de înregistrare]")}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom. */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-8 text-[13px] opacity-60 md:flex-row md:justify-between">
          <p>© {year} {site.name}. Toate drepturile rezervate.</p>
          <p>Membru al Colegiului Psihologilor din România</p>
        </div>
      </div>
    </footer>
  );
}
