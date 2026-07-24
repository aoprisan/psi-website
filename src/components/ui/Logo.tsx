/**
 * Brand mark — a sprout growing inside an open arch, rooted on a ground
 * line. The arch echoes the site's arched-portrait motif and reads as a
 * safe, open doorway; the sprout and ground line stand for growth and
 * grounding. Static assets with the same geometry live in /public
 * (logo.svg, logo-full.svg, icon.svg).
 *
 * The arch, stem and ground line draw with `currentColor`, so tone follows
 * the surrounding text color; leaves default to the clay accent.
 */
export function LogoMark({
  size = 40,
  leaf = "var(--color-clay)",
  className = "",
}: {
  size?: number;
  leaf?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M15 55V28A17 17 0 0 1 49 28V55"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M32 51.5C31.5 45 31.7 36 32 26"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M25.5 55H38.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M32 44.5C25 44 20.5 39.8 19.8 33C26.8 33.7 31.3 38 32 44.5Z" fill={leaf} />
      <path d="M32 37C39 36.5 43.5 32.3 44.2 25.5C37.2 26.2 32.7 30.5 32 37Z" fill={leaf} />
    </svg>
  );
}
