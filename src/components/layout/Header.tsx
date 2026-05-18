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
      className={`sticky top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-[color:var(--color-paper)]/82 backdrop-blur-md border-b border-[color:var(--color-rule-soft)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[var(--shell-max)] items-center justify-between px-6 md:px-10 py-5 md:py-6">
        <Link
          to="/"
          className="flex flex-col leading-none"
          onClick={() => setOpen(false)}
        >
          <span
            className="font-display"
            style={{ fontSize: "1.35rem", letterSpacing: "-0.01em", fontWeight: 500 }}
          >
            {site.practitionerName}
          </span>
          <span
            className="eyebrow mt-1"
            style={{ fontSize: "9.5px", letterSpacing: "0.22em" }}
          >
            {site.credentialsShort}
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-9"
          aria-label="Primary"
        >
          {nav
            .filter((n) => n.to !== "/")
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[13px] tracking-wide transition-colors ${
                    isActive
                      ? "text-[color:var(--color-accent)]"
                      : "text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)]"
                  }`
                }
              >
                <span className="under-link">{item.label}</span>
              </NavLink>
            ))}
          <Link
            to="/contact"
            className="btn-primary"
            style={{ padding: "0.7rem 1.1rem", fontSize: "13px" }}
          >
            <span>Consultation</span>
            <svg
              width="12"
              height="9"
              viewBox="0 0 14 10"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 5h12m0 0L9 1m4 4L9 9"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </nav>

        <button
          className="md:hidden inline-flex items-center gap-2 text-[color:var(--color-ink)]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="eyebrow">{open ? "Close" : "Menu"}</span>
          <span
            aria-hidden
            className="inline-block w-7 h-[1px] bg-current"
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
          className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[color:var(--color-paper)] z-30"
          aria-label="Primary mobile"
        >
          <ul className="flex flex-col px-6 pt-8 pb-12 gap-1">
            {nav.map((item, i) => (
              <li
                key={item.to}
                className="border-b border-[color:var(--color-rule-soft)]"
              >
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-baseline justify-between py-5 ${
                      isActive
                        ? "text-[color:var(--color-accent)]"
                        : "text-[color:var(--color-ink)]"
                    }`
                  }
                >
                  <span
                    className="font-display"
                    style={{ fontSize: "2rem", fontWeight: 400 }}
                  >
                    {item.label}
                  </span>
                  <span className="eyebrow" style={{ fontSize: "10px" }}>
                    0{i + 1}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="px-6 mt-6">
            <Link to="/contact" className="btn-primary">
              <span>Book consultation</span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                <path
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
