import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "bg-[color:var(--color-ground)]/90 backdrop-blur-md border-b border-[color:var(--color-line-soft)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[var(--shell-max)] items-center justify-between px-6 md:px-10 py-4 md:py-5">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {/* Mark — a leaf inside a soft circle. */}
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-surface-deep)] text-[color:var(--color-pine)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21C6 16.5 5 10.5 7.5 6.5 10 2.5 15 2 18 4c0 0 .5 6-2 11s-4 6-4 6z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M12 21c0-6 2-11 5-15" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-[family-name:var(--font-display)] text-[1.2rem] font-medium text-[color:var(--color-ink)]">
              {site.name}
            </span>
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
              {site.titleShort}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Meniu principal">
          {nav
            .filter((n) => n.to !== "/")
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[14.5px] font-medium transition-colors ${
                    isActive
                      ? "text-[color:var(--color-clay-deep)]"
                      : "text-[color:var(--color-ink)] hover:text-[color:var(--color-clay-deep)]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          <Link
            to="/contact"
            className="btn-primary"
            style={{ padding: "0.6rem 1.2rem", fontSize: "14px" }}
          >
            Programează o ședință
          </Link>
        </nav>

        <button
          className="lg:hidden inline-flex items-center gap-2 text-[color:var(--color-ink)]"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em]">
            {open ? "Închide" : "Meniu"}
          </span>
          <span
            aria-hidden
            className="inline-block w-6 h-[1.5px] bg-current"
            style={{
              boxShadow: open
                ? "0 0 0 transparent"
                : "0 -5px 0 currentColor, 0 5px 0 currentColor",
              transform: open ? "rotate(45deg)" : "none",
              transition: "box-shadow 200ms, transform 200ms",
            }}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-[color:var(--color-ground)] z-30 overflow-y-auto"
          aria-label="Meniu principal mobil"
        >
          <ul className="flex flex-col px-6 pt-6 pb-8">
            {nav.map((item) => (
              <li key={item.to} className="border-b border-[color:var(--color-line-soft)]">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `block py-4 font-[family-name:var(--font-display)] text-[1.6rem] ${
                      isActive
                        ? "text-[color:var(--color-clay-deep)]"
                        : "text-[color:var(--color-ink)]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="px-6">
            <Link to="/contact" className="btn-primary w-full">
              Programează o ședință
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
