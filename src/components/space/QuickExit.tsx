import { useCallback, useEffect, useRef } from "react";
import { useSpace } from "@/lib/space/SpaceContext";

/**
 * Rapid exit.
 *
 * A standard safety affordance on sites used by people whose device may be
 * watched. It locks the vault and leaves for a neutral page.
 *
 * `location.replace` matters: `assign` would leave this URL one back-press
 * away. It only drops the *current* entry, though — earlier routes stay in
 * history, and nothing here can clear the browser's own history or address
 * bar. It buys the seconds it takes to hand a phone over, not deniability,
 * and the surrounding copy should not claim more.
 */

const NEUTRAL_DESTINATION = "https://www.google.com/search?q=vremea";
const ESCAPE_COUNT = 3;
const ESCAPE_WINDOW_MS = 1200;

export function useQuickExit() {
  const { lock } = useSpace();

  return useCallback(() => {
    lock();

    // In the packaged app there is nowhere to navigate *away* to — the web
    // view is the app. Closing it is the equivalent gesture, where the OS
    // allows it (Android does, iOS does not).
    if ("Capacitor" in window) {
      void import("@capacitor/app")
        .then(({ App }) => App.exitApp())
        .catch(() => window.location.replace(NEUTRAL_DESTINATION));
      return;
    }

    window.location.replace(NEUTRAL_DESTINATION);
  }, [lock]);
}

export function QuickExit({ className = "" }: { className?: string }) {
  const exit = useQuickExit();
  const presses = useRef<number[]>([]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const now = Date.now();
      presses.current = [...presses.current, now].filter((t) => now - t < ESCAPE_WINDOW_MS);
      if (presses.current.length >= ESCAPE_COUNT) {
        presses.current = [];
        exit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exit]);

  return (
    <button
      type="button"
      onClick={exit}
      className={`quick-exit ${className}`.trim()}
      title="Închide imediat și deschide o pagină neutră (sau apasă Esc de trei ori)"
    >
      <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M16 15l4-3-4-3M20 12H10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Ieșire rapidă
    </button>
  );
}
