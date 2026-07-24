import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Standard interior-page opener: eyebrow, big title, optional lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div className="bg-[color:var(--color-surface)]">
      <div className="mx-auto w-full max-w-[var(--shell-max)] px-6 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-4 text-[clamp(2.4rem,1.8rem+3vw,4rem)] max-w-3xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 text-[17.5px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
