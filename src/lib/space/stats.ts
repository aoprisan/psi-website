/**
 * Trend maths for the private space.
 *
 * The interesting question is not "what was my mood today" but "does
 * anything I do actually help". `practiceEffect` answers that from the
 * before/after distress ratings, and `correlate` looks for the honest, weak
 * signals in a journal that is usually short and full of gaps.
 */

import type { CheckIn, PracticeLog, ScreeningResult } from "./types";

export const DAY_MS = 86_400_000;

export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function dayKey(iso: string): string {
  return startOfDay(new Date(iso)).toISOString().slice(0, 10);
}

export function withinDays<T extends { at: string }>(items: T[], days: number): T[] {
  const cutoff = Date.now() - days * DAY_MS;
  return items.filter((item) => new Date(item.at).getTime() >= cutoff);
}

export function byNewest<T extends { at: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}

export type SeriesPoint = { day: string; value: number | null };

/**
 * A dense day-by-day series with `null` for days without an entry, so the
 * chart shows gaps as gaps instead of quietly drawing a straight line
 * through a week nobody logged.
 */
export function dailySeries(
  checkins: CheckIn[],
  field: "mood" | "anxiety" | "energy" | "sleep",
  days: number,
): SeriesPoint[] {
  const buckets = new Map<string, number[]>();
  for (const entry of withinDays(checkins, days)) {
    const key = dayKey(entry.at);
    const list = buckets.get(key) ?? [];
    list.push(entry[field]);
    buckets.set(key, list);
  }

  const today = startOfDay(new Date());
  const points: SeriesPoint[] = [];
  for (let offset = days - 1; offset >= 0; offset--) {
    const date = new Date(today.getTime() - offset * DAY_MS);
    const key = date.toISOString().slice(0, 10);
    const values = buckets.get(key);
    points.push({
      day: key,
      value: values && values.length ? values.reduce((a, b) => a + b, 0) / values.length : null,
    });
  }
  return points;
}

export function mean(values: number[]): number | null {
  if (!values.length) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/**
 * Compares the most recent half of a window against the older half. Needs
 * at least two readings on each side before it will claim a direction.
 */
export type TrendVerdict = {
  direction: "up" | "down" | "flat" | "unknown";
  delta: number | null;
  recent: number | null;
  earlier: number | null;
  samples: number;
};

export function trend(points: SeriesPoint[]): TrendVerdict {
  // Split the *logged* days in half rather than the calendar, so a sparse
  // journal still compares a like number of readings on each side.
  const filled = points.filter((p): p is { day: string; value: number } => p.value !== null);
  const earlierValues = filled.slice(0, Math.floor(filled.length / 2)).map((p) => p.value);
  const recentValues = filled.slice(Math.ceil(filled.length / 2)).map((p) => p.value);

  if (recentValues.length < 2 || earlierValues.length < 2) {
    return {
      direction: "unknown",
      delta: null,
      recent: mean(recentValues),
      earlier: mean(earlierValues),
      samples: filled.length,
    };
  }
  const recentMean = mean(recentValues)!;
  const earlierMean = mean(earlierValues)!;
  const delta = recentMean - earlierMean;
  // A quarter-point on a 0–4 scale is the smallest change worth naming;
  // below that the noise of self-report swamps the signal.
  const direction = Math.abs(delta) < 0.25 ? "flat" : delta > 0 ? "up" : "down";
  return { direction, delta, recent: recentMean, earlier: earlierMean, samples: filled.length };
}

/* ---------- Does this practice actually help? ---------- */

export type PracticeEffect = {
  detail: string;
  kind: string;
  sessions: number;
  /** Mean drop in distress (0–10). Positive means it helped. */
  averageRelief: number;
  /** How often it produced any relief at all. */
  helpedShare: number;
  totalSeconds: number;
};

export function practiceEffects(practices: PracticeLog[]): PracticeEffect[] {
  const groups = new Map<string, PracticeLog[]>();
  for (const log of practices) {
    const key = `${log.kind}::${log.detail}`;
    const list = groups.get(key) ?? [];
    list.push(log);
    groups.set(key, list);
  }

  const effects: PracticeEffect[] = [];
  for (const [key, logs] of groups) {
    const [kind, detail] = key.split("::");
    const rated = logs.filter(
      (log) => log.distressBefore !== null && log.distressAfter !== null,
    );
    const deltas = rated.map((log) => log.distressBefore! - log.distressAfter!);
    effects.push({
      kind,
      detail,
      sessions: logs.length,
      averageRelief: mean(deltas) ?? 0,
      helpedShare: deltas.length ? deltas.filter((d) => d > 0).length / deltas.length : 0,
      totalSeconds: logs.reduce((sum, log) => sum + log.seconds, 0),
    });
  }
  return effects.sort((a, b) => b.averageRelief - a.averageRelief || b.sessions - a.sessions);
}

/** The practice with the best evidence *for this person*, if there is one. */
export function bestPractice(practices: PracticeLog[]): PracticeEffect | null {
  const ranked = practiceEffects(practices).filter(
    (effect) => effect.sessions >= 3 && effect.averageRelief > 0.5,
  );
  return ranked[0] ?? null;
}

/* ---------- Weak-signal correlations ---------- */

export type Insight = {
  id: string;
  text: string;
  /** How much to trust it, given how little data a journal usually holds. */
  strength: "clear" | "possible";
};

/** Pearson correlation over paired same-day observations. */
function correlate(pairs: [number, number][]): number | null {
  if (pairs.length < 6) return null;
  const xs = pairs.map((p) => p[0]);
  const ys = pairs.map((p) => p[1]);
  const mx = mean(xs)!;
  const my = mean(ys)!;
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < pairs.length; i++) {
    const a = xs[i] - mx;
    const b = ys[i] - my;
    num += a * b;
    dx += a * a;
    dy += b * b;
  }
  if (dx === 0 || dy === 0) return null;
  return num / Math.sqrt(dx * dy);
}

const TAG_MIN_OCCURRENCES = 4;

/**
 * Observations, deliberately hedged. Everything here is correlational and
 * the copy says so — a journal cannot establish cause, and pretending
 * otherwise in a mental-health tool is worse than saying nothing.
 */
export function insights(checkins: CheckIn[], practices: PracticeLog[]): Insight[] {
  const found: Insight[] = [];
  const recent = withinDays(checkins, 90);

  const sleepMood = correlate(recent.map((c) => [c.sleep, c.mood] as [number, number]));
  if (sleepMood !== null && Math.abs(sleepMood) >= 0.35) {
    found.push({
      id: "sleep-mood",
      strength: Math.abs(sleepMood) >= 0.6 ? "clear" : "possible",
      text:
        sleepMood > 0
          ? "Zilele de după un somn bun tind să vină și cu o dispoziție mai bună. Somnul pare să conteze mult pentru tine."
          : "Relația dintre somn și dispoziție arată invers față de obișnuit în notările tale — merită privită împreună în ședință.",
    });
  }

  const anxietyEnergy = correlate(recent.map((c) => [c.anxiety, c.energy] as [number, number]));
  if (anxietyEnergy !== null && anxietyEnergy <= -0.35) {
    found.push({
      id: "anxiety-energy",
      strength: anxietyEnergy <= -0.6 ? "clear" : "possible",
      text: "Când anxietatea crește, energia ta scade vizibil. Anxietatea pare să consume din resursele zilei.",
    });
  }

  // Tags: compare mean mood on days carrying a tag against days without it.
  const tagCounts = new Map<string, { withTag: number[]; count: number }>();
  for (const entry of recent) {
    for (const tag of new Set(entry.tags)) {
      const bucket = tagCounts.get(tag) ?? { withTag: [], count: 0 };
      bucket.withTag.push(entry.mood);
      bucket.count += 1;
      tagCounts.set(tag, bucket);
    }
  }
  const overall = mean(recent.map((c) => c.mood));
  if (overall !== null) {
    for (const [tag, bucket] of tagCounts) {
      if (bucket.count < TAG_MIN_OCCURRENCES) continue;
      const tagMean = mean(bucket.withTag)!;
      const delta = tagMean - overall;
      if (Math.abs(delta) < 0.5) continue;
      found.push({
        id: `tag-${tag}`,
        strength: Math.abs(delta) >= 1 ? "clear" : "possible",
        text:
          delta > 0
            ? `Zilele marcate „${tag}” apar, în medie, cu o dispoziție mai bună decât restul.`
            : `Zilele marcate „${tag}” apar, în medie, cu o dispoziție mai scăzută decât restul.`,
      });
    }
  }

  const best = bestPractice(practices);
  if (best) {
    found.push({
      id: "best-practice",
      strength: best.sessions >= 6 ? "clear" : "possible",
      text: `„${best.detail}” ți-a scăzut tensiunea cu ${best.averageRelief.toFixed(1)} puncte în medie, din ${best.sessions} încercări. Pare să fie exercițiul care funcționează cel mai bine pentru tine.`,
    });
  }

  return found.slice(0, 5);
}

/* ---------- Screening history ---------- */

export function latestByInstrument(screenings: ScreeningResult[]): Map<string, ScreeningResult> {
  const latest = new Map<string, ScreeningResult>();
  for (const result of byNewest(screenings)) {
    if (!latest.has(result.instrument)) latest.set(result.instrument, result);
  }
  return latest;
}

export function historyFor(screenings: ScreeningResult[], instrument: string): ScreeningResult[] {
  return screenings
    .filter((s) => s.instrument === instrument)
    .sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());
}
