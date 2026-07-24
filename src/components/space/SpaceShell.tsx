import { NavLink, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { useSpace } from "@/lib/space/SpaceContext";
import { QuickExit } from "@/components/space/QuickExit";
import { SpaceSetup, SpaceUnlock } from "@/components/space/LockScreen";

const spaceNav = [
  { to: "/spatiul-tau", label: "Acasă", end: true },
  { to: "/spatiul-tau/verifica", label: "Unde sunt acum" },
  { to: "/spatiul-tau/respiratie", label: "Respirație" },
  { to: "/spatiul-tau/ancorare", label: "Ancorare" },
  { to: "/spatiul-tau/chestionare", label: "Chestionare" },
  { to: "/spatiul-tau/jurnal", label: "Jurnal" },
  { to: "/spatiul-tau/pregatire", label: "Pregătire ședință" },
];

/**
 * Frame for the private space.
 *
 * Deliberately does *not* gate the whole area behind the vault. Someone
 * opening this at 3am mid-panic needs the breathing pacer immediately, not
 * a passcode-setup form. Only the pages that read stored data ask for a
 * vault, through `RequireVault` below.
 */
export function SpaceShell() {
  const { status, mode, lock } = useSpace();

  return (
    <div className="space-area">
      <div className="border-b border-[color:var(--color-line-soft)] bg-[color:var(--color-surface)]">
        <div className="mx-auto flex max-w-[var(--shell-max)] flex-wrap items-center gap-x-5 gap-y-3 px-6 md:px-10 py-3">
          <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-pine)]">
            <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
            Doar pe dispozitivul tău
          </span>
          <span className="text-[13px] text-[color:var(--color-muted)]">
            {status === "unlocked" && mode === "passcode" && "Spațiu criptat, deschis"}
            {status === "unlocked" && mode === "open" && "Spațiu local, fără cod"}
            {status === "locked" && "Spațiu criptat, blocat"}
            {status === "absent" && "Niciun spațiu creat pe acest dispozitiv"}
            {status === "unavailable" && "Stocarea locală este dezactivată"}
          </span>
          <div className="ml-auto flex items-center gap-4">
            {status === "unlocked" && mode === "passcode" && (
              <button type="button" onClick={lock} className="text-[13px] font-semibold text-[color:var(--color-pine)] underline underline-offset-4">
                Blochează
              </button>
            )}
            <NavLink
              to="/spatiul-tau/setari"
              className="text-[13px] font-semibold text-[color:var(--color-pine)] underline underline-offset-4"
            >
              Setări
            </NavLink>
            <QuickExit />
          </div>
        </div>
      </div>

      <nav aria-label="Secțiunile spațiului personal" className="border-b border-[color:var(--color-line-soft)]">
        <ul className="mx-auto flex max-w-[var(--shell-max)] gap-1 overflow-x-auto px-4 md:px-8 py-2">
          {spaceNav.map((item) => (
            <li key={item.to} className="shrink-0">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `space-tab ${isActive ? "is-active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

/**
 * Wraps views that cannot work without stored data, showing the setup or
 * unlock flow in place instead of redirecting.
 */
export function RequireVault({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { status } = useSpace();

  if (status === "loading") {
    return (
      <p className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-20 text-[color:var(--color-muted)]">
        Se verifică dispozitivul…
      </p>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="mx-auto max-w-2xl px-6 md:px-10 py-16">
        <div className="card p-8">
          <h2 className="text-[1.4rem]">Stocarea locală este dezactivată</h2>
          <p className="mt-3 text-[15.5px] leading-relaxed">
            Browserul tău nu permite salvarea datelor pe acest dispozitiv —
            se întâmplă des în modul incognito sau cu setări stricte de
            confidențialitate. Exercițiile de respirație și de ancorare
            funcționează în continuare; doar jurnalul și chestionarele au
            nevoie de stocare.
          </p>
        </div>
      </div>
    );
  }

  if (status === "absent") {
    return (
      <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-14">
        <h1 className="text-[clamp(1.8rem,1.4rem+1.6vw,2.4rem)]">{title}</h1>
        <p className="mt-3 mb-10 text-[16px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
          Pentru asta am nevoie de un loc în care să salvez ce notezi. Se
          creează acum, aici, pe dispozitivul tău.
        </p>
        <SpaceSetup />
      </div>
    );
  }

  if (status === "locked") {
    return (
      <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-14">
        <SpaceUnlock />
      </div>
    );
  }

  return <>{children}</>;
}
