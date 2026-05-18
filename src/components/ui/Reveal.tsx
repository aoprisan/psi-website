import { createElement, type ReactNode } from "react";

type Tag = "div" | "section" | "article" | "p" | "h1" | "h2" | "h3" | "span" | "li";

export function Reveal({
  children,
  delay,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: 1 | 2 | 3 | 4;
  as?: Tag;
  className?: string;
}) {
  const delayClass = delay ? ` reveal-delay-${delay}` : "";
  return createElement(
    as,
    { className: `reveal${delayClass} ${className}`.trim() },
    children,
  );
}
