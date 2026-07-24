import { useId } from "react";
import { countDigits, countNoun } from "@/lib/space/actions";
import type { SeriesPoint } from "@/lib/space/stats";

/**
 * A small trend line. Days without an entry break the path rather than
 * being interpolated — a journal with holes should look like one.
 */
export function Sparkline({
  points,
  min,
  max,
  label,
  /** Some scales read better upside down (high anxiety = bad = up). */
  invert = false,
  height = 64,
}: {
  points: SeriesPoint[];
  min: number;
  max: number;
  label: string;
  invert?: boolean;
  height?: number;
}) {
  const gradientId = useId();
  const width = 300;
  const pad = 4;
  const filled = points.filter((p) => p.value !== null);

  if (filled.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-dashed border-[color:var(--color-line)] text-[13px] text-[color:var(--color-muted)]"
        style={{ height }}
      >
        Încă nu sunt notări pentru {label.toLowerCase()}
      </div>
    );
  }

  const span = Math.max(1, points.length - 1);
  const range = Math.max(0.001, max - min);
  const x = (index: number) => pad + (index / span) * (width - pad * 2);
  const y = (value: number) => {
    const normalised = (value - min) / range;
    const t = invert ? normalised : 1 - normalised;
    return pad + t * (height - pad * 2);
  };

  // Build one path per unbroken run of logged days.
  const segments: string[] = [];
  let current: string[] = [];
  points.forEach((point, index) => {
    if (point.value === null) {
      if (current.length) segments.push(current.join(" "));
      current = [];
      return;
    }
    current.push(`${current.length ? "L" : "M"}${x(index).toFixed(1)},${y(point.value).toFixed(1)}`);
  });
  if (current.length) segments.push(current.join(" "));

  let lastIndex = -1;
  for (let i = points.length - 1; i >= 0; i--) {
    if (points[i].value !== null) {
      lastIndex = i;
      break;
    }
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      style={{ height }}
      role="img"
      aria-label={`${label}: ${countDigits(filled.length, "notare", "notări")} în ultimele ${countNoun(points.length, "zi", "zile")}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-sage)" />
          <stop offset="100%" stopColor="var(--color-clay)" />
        </linearGradient>
      </defs>
      {segments.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {/* Single readings would otherwise be invisible: draw the dots too. */}
      {points.map((point, index) =>
        point.value === null ? null : (
          <circle
            key={point.day}
            cx={x(index)}
            cy={y(point.value)}
            r={index === lastIndex ? 3.5 : 1.6}
            fill={index === lastIndex ? "var(--color-clay-deep)" : "var(--color-sage)"}
            vectorEffect="non-scaling-stroke"
          />
        ),
      )}
      <title>{label}</title>
    </svg>
  );
}
