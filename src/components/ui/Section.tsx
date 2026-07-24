import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  /** "surface" = sage tint, "dark" = pine, default = page ground */
  tone?: "ground" | "surface" | "dark";
  spacing?: "default" | "tight" | "loose";
};

export function Section({
  children,
  className = "",
  as: Tag = "section",
  tone = "ground",
  spacing = "default",
}: Props) {
  const padding =
    spacing === "tight"
      ? "py-12 md:py-16"
      : spacing === "loose"
        ? "py-24 md:py-32"
        : "py-16 md:py-24";

  const bg =
    tone === "surface"
      ? "bg-[color:var(--color-surface)]"
      : tone === "dark"
        ? "bg-[color:var(--color-pine)]"
        : "";

  return (
    <Tag className={`${padding} ${bg} ${className}`.trim()}>
      <div className="mx-auto w-full max-w-[var(--shell-max)] px-6 md:px-10">
        {children}
      </div>
    </Tag>
  );
}

/** Consistent eyebrow + heading + optional lead for section tops. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  light = false,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center mx-auto" : ""}`} style={{ maxWidth: center ? "44rem" : undefined }}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={`mt-3 text-[clamp(1.9rem,1.4rem+2vw,2.9rem)] ${light ? "text-[color:var(--color-cream)]" : ""}`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 text-[17px] leading-relaxed ${light ? "text-[color:var(--color-surface-deep)]" : "text-[color:var(--color-body)]"} ${center ? "mx-auto" : ""}`}
          style={{ maxWidth: "var(--measure)" }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
