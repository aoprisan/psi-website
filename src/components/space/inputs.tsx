import { useId } from "react";

/**
 * Accessible choice controls used by the screeners and the check-in.
 *
 * Native radios are kept in the DOM rather than reimplemented with ARIA:
 * arrow-key navigation, screen-reader grouping and form semantics all come
 * for free, and the visuals are done entirely with `peer` styling.
 */

export function ChoiceScale({
  name,
  legend,
  options,
  value,
  onChange,
  /** Lay the options out in a row when they are short. */
  compact = false,
}: {
  name: string;
  legend: React.ReactNode;
  options: { value: number; label: string }[];
  value: number | null;
  onChange: (value: number) => void;
  compact?: boolean;
}) {
  return (
    <fieldset className="choice-scale">
      <legend className="choice-scale__legend">{legend}</legend>
      <div className={compact ? "choice-scale__row" : "choice-scale__stack"}>
        {options.map((option) => (
          <label key={option.value} className="choice">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="choice__body">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Subjective Units of Distress, 0–10. Kept as a slider because a therapy
 * client is asked for this number out loud in session, and matching the
 * clinical convention makes the two comparable.
 */
export function DistressRating({
  value,
  onChange,
  label,
}: {
  value: number | null;
  onChange: (value: number) => void;
  label: string;
}) {
  const id = useId();
  const shown = value ?? 5;
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-semibold text-[color:var(--color-ink)]">
        {label}
      </label>
      <div className="mt-3 flex items-center gap-4">
        <input
          id={id}
          type="range"
          min={0}
          max={10}
          step={1}
          value={shown}
          onChange={(event) => onChange(Number(event.target.value))}
          className="sud-slider flex-1"
          aria-valuetext={`${shown} din 10`}
        />
        <span className="w-12 shrink-0 text-center font-[family-name:var(--font-display)] text-[1.6rem] text-[color:var(--color-clay-deep)] tabular-nums">
          {value === null ? "–" : shown}
        </span>
      </div>
      <div className="mt-1 flex justify-between text-[12px] text-[color:var(--color-muted)]">
        <span>0 · deloc</span>
        <span>10 · copleșitor</span>
      </div>
    </div>
  );
}

/** A compact 0–4 / 1–5 picker for the daily check-in. */
export function Dial({
  label,
  value,
  onChange,
  labels,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  /** One caption per step, low to high. */
  labels: string[];
}) {
  const name = useId();
  return (
    <div>
      <p className="text-[14px] font-semibold text-[color:var(--color-ink)]">{label}</p>
      <div className="mt-2 flex gap-1.5" role="radiogroup" aria-label={label}>
        {labels.map((caption, index) => (
          <label key={caption} className="dial-option flex-1" title={caption}>
            <input
              type="radio"
              name={name}
              checked={value === index}
              onChange={() => onChange(index)}
              className="peer sr-only"
            />
            <span className="dial-option__body">
              <span className="dial-option__dot" aria-hidden />
              <span className="dial-option__caption">{caption}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
