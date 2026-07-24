import type { ReactNode } from "react";

/**
 * Marks placeholder text awaiting real content. Renders with a subtle
 * highlight so unfinished copy is easy to spot during review.
 */
export function Ph({ children }: { children: ReactNode }) {
  return <span className="ph">{children}</span>;
}

/**
 * Renders a string, wrapping every [bracketed] fragment in the
 * placeholder highlight. Lets content files stay plain strings.
 */
export function withPh(text: string) {
  const parts = text.split(/(\[[^\]]*\])/g);
  return parts.map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span key={i} className="ph">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
