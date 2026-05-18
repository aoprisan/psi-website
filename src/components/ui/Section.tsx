import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  /** index label, e.g. "01 / Approach" */
  index?: string;
  bleed?: boolean;
  spacing?: "default" | "tight" | "loose";
};

export function Section({
  children,
  className = "",
  as: Tag = "section",
  index,
  bleed = false,
  spacing = "default",
}: Props) {
  const padding =
    spacing === "tight"
      ? "py-12 md:py-16"
      : spacing === "loose"
        ? "py-24 md:py-36"
        : "py-16 md:py-24";

  const inner = bleed ? "" : "mx-auto w-full max-w-[var(--shell-max)] px-6 md:px-10";

  return (
    <Tag className={`${padding} ${className}`.trim()}>
      <div className={inner}>
        {index && (
          <div className="section-index mb-10 md:mb-14">
            <span>{index}</span>
          </div>
        )}
        {children}
      </div>
    </Tag>
  );
}
