import { Link } from "react-router-dom";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 pt-20 border-t border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10">
        {/* Top row — large mark + crisis note. */}
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] mb-20">
          <div>
            <p className="eyebrow">{site.established} · {site.city}</p>
            <h2
              className="font-display mt-4"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                fontWeight: 300,
                color: "var(--color-ink)",
              }}
            >
              {site.practitionerName}
            </h2>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.2rem",
                color: "var(--color-ink-mid)",
              }}
            >
              {site.credentials}
            </p>
          </div>

          <aside className="md:pt-4">
            <p className="eyebrow eyebrow-accent">If you need help now</p>
            <p
              className="mt-3 text-[color:var(--color-ink-mid)] leading-relaxed"
              style={{ fontSize: "0.95rem" }}
            >
              This site is not for emergencies. If you are in crisis, please
              call or text{" "}
              <a
                href="tel:988"
                className="inline-link"
                style={{ whiteSpace: "nowrap" }}
              >
                988
              </a>{" "}
              in the United States, or your local emergency number.
            </p>
          </aside>
        </div>

        {/* Middle row — three columns of metadata. */}
        <div className="grid gap-12 md:grid-cols-3 pt-12 border-t border-[color:var(--color-rule-soft)]">
          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-1.5 text-[15px]">
              <li>
                <a href={`mailto:${site.email}`} className="under-link">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\D/g, "")}`}
                  className="under-link"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Office</p>
            <address
              className="mt-4 text-[15px] not-italic text-[color:var(--color-ink-mid)] leading-relaxed"
            >
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>
          </div>

          <div>
            <p className="eyebrow">Site</p>
            <ul className="mt-4 space-y-1.5 text-[15px]">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="under-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row — colophon. */}
        <div className="mt-16 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-ink-soft)]"
          >
            © {year} {site.practitionerName} — All rights reserved
          </p>
          <p
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-ink-faint)]"
          >
            A private practice
          </p>
        </div>
      </div>
    </footer>
  );
}
