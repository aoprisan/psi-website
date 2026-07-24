import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CueEngine, requestWakeLock } from "@/lib/space/cues";
import { patternCycleSeconds, type BreathPattern } from "@/lib/space/regulation";
import { countDigits } from "@/lib/space/actions";

/**
 * The pacer.
 *
 * Timing comes from `performance.now()` inside a rAF loop rather than from
 * `setInterval`, because interval drift over a five-minute practice is
 * enough to pull the guide out of step with the breath. React re-renders
 * once per phase; the 60fps work writes straight to the DOM through refs.
 */

const RADIUS = 118;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** How large the circle is at rest, as a fraction of full size. */
const MIN_SCALE = 0.52;
const MAX_SCALE = 1;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Eases the circle so the turn at each end of the breath is not a corner. */
function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export type BreathPacerProps = {
  pattern: BreathPattern;
  /** Target length in seconds; 0 runs until stopped. */
  targetSeconds: number;
  sound: boolean;
  haptics: boolean;
  onFinish: (secondsPractised: number) => void;
};

export function BreathPacer({
  pattern,
  targetSeconds,
  sound,
  haptics,
  onFinish,
}: BreathPacerProps) {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [reduced] = useState(prefersReducedMotion);

  const circleRef = useRef<SVGCircleElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>(0);
  /** Wall-clock anchor for the current run segment. */
  const startedAt = useRef<number>(0);
  /** Seconds banked from previous segments (i.e. before a pause). */
  const banked = useRef<number>(0);
  const lastPhase = useRef<number>(-1);
  const lastWholeSecond = useRef<number>(-1);
  const cueRef = useRef<CueEngine | null>(null);
  const releaseWakeLock = useRef<(() => void) | null>(null);
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  const cycleSeconds = useMemo(() => patternCycleSeconds(pattern), [pattern]);

  /** Phase boundaries as cumulative offsets, computed once per pattern. */
  const offsets = useMemo(() => {
    let sum = 0;
    return pattern.phases.map((phase) => {
      const start = sum;
      sum += phase.seconds;
      return { start, end: sum, phase };
    });
  }, [pattern]);

  const stop = useCallback(
    (report: boolean) => {
      cancelAnimationFrame(frameRef.current);
      const total = banked.current + (startedAt.current ? (performance.now() - startedAt.current) / 1000 : 0);
      banked.current = 0;
      startedAt.current = 0;
      lastPhase.current = -1;
      setRunning(false);
      setElapsed(0);
      setCycles(0);
      setPhaseIndex(0);
      releaseWakeLock.current?.();
      releaseWakeLock.current = null;
      if (report) {
        // Reported however short it was: ending after twenty seconds is
        // still a decision, and a screen with no way forward is worse than
        // a brief entry in the log.
        cueRef.current?.play("done");
        finishRef.current(Math.round(total));
      }
    },
    [],
  );

  const tick = useCallback(() => {
    const now = performance.now();
    const total = banked.current + (now - startedAt.current) / 1000;

    if (targetSeconds > 0 && total >= targetSeconds) {
      stop(true);
      return;
    }

    const position = total % cycleSeconds;
    const index = offsets.findIndex((o) => position >= o.start && position < o.end);
    const slot = offsets[index === -1 ? offsets.length - 1 : index];
    const progress = Math.min(1, (position - slot.start) / slot.phase.seconds);

    if (index !== lastPhase.current) {
      lastPhase.current = index;
      setPhaseIndex(index === -1 ? 0 : index);
      cueRef.current?.play(slot.phase.kind);
      if (index === 0) setCycles(Math.floor(total / cycleSeconds));
    }

    // Scale target per phase kind: grow on the in-breath, hold at the top,
    // shrink on the out-breath, stay small through the pause.
    let scale = MIN_SCALE;
    const span = MAX_SCALE - MIN_SCALE;
    switch (slot.phase.kind) {
      case "inhale":
        scale = MIN_SCALE + span * easeInOutSine(progress);
        break;
      case "hold":
        scale = MAX_SCALE;
        break;
      case "exhale":
        scale = MIN_SCALE + span * easeInOutSine(1 - progress);
        break;
      default:
        scale = MIN_SCALE;
    }

    // The "physiological sigh" stacks two inhales; the second must start
    // where the first ended instead of snapping back to the small circle.
    if (slot.phase.kind === "inhale" && index > 0 && offsets[index - 1].phase.kind === "inhale") {
      const previousShare = offsets[index - 1].phase.seconds;
      const combined = previousShare + slot.phase.seconds;
      const overall = (previousShare + position - slot.start) / combined;
      scale = MIN_SCALE + span * easeInOutSine(overall);
    }

    if (circleRef.current && !reduced) {
      circleRef.current.style.transform = `scale(${scale.toFixed(4)})`;
    }
    if (progressRef.current) {
      progressRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
    }

    const remaining = Math.ceil(slot.phase.seconds - (position - slot.start));
    if (countRef.current && remaining !== lastWholeSecond.current) {
      lastWholeSecond.current = remaining;
      countRef.current.textContent = String(Math.max(1, remaining));
    }

    const whole = Math.floor(total);
    setElapsed((current) => (current === whole ? current : whole));

    frameRef.current = requestAnimationFrame(tick);
  }, [cycleSeconds, offsets, reduced, stop, targetSeconds]);

  const start = useCallback(async () => {
    if (!cueRef.current) cueRef.current = new CueEngine(sound, haptics);
    cueRef.current.sound = sound;
    cueRef.current.haptics = haptics;
    await cueRef.current.prime();
    releaseWakeLock.current = await requestWakeLock();
    startedAt.current = performance.now();
    lastPhase.current = -1;
    setRunning(true);
    frameRef.current = requestAnimationFrame(tick);
  }, [haptics, sound, tick]);

  const pause = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    banked.current += (performance.now() - startedAt.current) / 1000;
    startedAt.current = 0;
    setRunning(false);
    releaseWakeLock.current?.();
    releaseWakeLock.current = null;
  }, []);

  const resume = useCallback(async () => {
    releaseWakeLock.current = await requestWakeLock();
    startedAt.current = performance.now();
    lastPhase.current = -1;
    setRunning(true);
    frameRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frameRef.current);
      releaseWakeLock.current?.();
      cueRef.current?.dispose();
    };
  }, []);

  /* Switching pattern mid-practice would desynchronise the phase offsets. */
  useEffect(() => {
    cancelAnimationFrame(frameRef.current);
    banked.current = 0;
    startedAt.current = 0;
    lastPhase.current = -1;
    setRunning(false);
    setElapsed(0);
    setCycles(0);
    setPhaseIndex(0);
  }, [pattern.id]);

  const phase = pattern.phases[phaseIndex] ?? pattern.phases[0];
  const started = running || elapsed > 0;
  const remainingTarget = targetSeconds > 0 ? Math.max(0, targetSeconds - elapsed) : null;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          viewBox="0 0 280 280"
          className="h-[min(72vw,20rem)] w-[min(72vw,20rem)]"
          role="img"
          aria-label={`Ghid de respirație: ${pattern.name}`}
        >
          <circle
            cx="140"
            cy="140"
            r={RADIUS}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="2"
          />
          {/* Expanding disc — the breath itself. */}
          <circle
            ref={circleRef}
            cx="140"
            cy="140"
            r={RADIUS - 8}
            className="breath-disc"
            style={{ transform: `scale(${MIN_SCALE})` }}
          />
          {/* Phase progress ring. */}
          <circle
            ref={progressRef}
            cx="140"
            cy="140"
            r={RADIUS}
            fill="none"
            stroke="var(--color-clay)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            transform="rotate(-90 140 140)"
          />
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className="font-[family-name:var(--font-display)] text-[clamp(1.3rem,1rem+1.6vw,1.9rem)] text-[color:var(--color-ink)]"
            aria-live={started ? "polite" : "off"}
          >
            {started ? phase.label : "Gata când ești"}
          </span>
          <span
            ref={countRef}
            className="mt-1 font-[family-name:var(--font-display)] text-[2.6rem] leading-none text-[color:var(--color-clay-deep)]"
            aria-hidden
          >
            {started ? Math.ceil(phase.seconds) : "·"}
          </span>
        </div>
      </div>

      <p className="mt-6 text-[14px] text-[color:var(--color-muted)] tabular-nums">
        {started ? (
          <>
            {formatClock(elapsed)}
            {remainingTarget !== null && <> · mai sunt {formatClock(remainingTarget)}</>}
            {cycles > 0 && <> · {countDigits(cycles, "respirație", "respirații")}</>}
          </>
        ) : (
          <>
            Un ciclu durează {cycleSeconds.toFixed(cycleSeconds % 1 ? 1 : 0)} secunde
            {targetSeconds > 0 && <> · practica propusă: {formatClock(targetSeconds)}</>}
          </>
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {!running && !started && (
          <button type="button" className="btn-primary" onClick={() => void start()}>
            Începe
          </button>
        )}
        {running && (
          <button type="button" className="btn-secondary" onClick={pause}>
            Pauză
          </button>
        )}
        {!running && started && (
          <button type="button" className="btn-primary" onClick={() => void resume()}>
            Continuă
          </button>
        )}
        {started && (
          <button type="button" className="btn-secondary" onClick={() => stop(true)}>
            Am terminat
          </button>
        )}
      </div>

      {reduced && started && (
        <p className="mt-4 max-w-sm text-center text-[13px] text-[color:var(--color-muted)]">
          Animația este oprită pentru că dispozitivul tău cere mișcare redusă.
          Urmărește textul și numărătoarea.
        </p>
      )}
    </div>
  );
}

function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
