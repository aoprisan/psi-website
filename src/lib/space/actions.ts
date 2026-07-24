/** Pure mutators over `SpaceData`. Keeping them here keeps views dumb. */

import { randomId } from "./crypto";
import type { CheckIn, PracticeKind, PracticeLog, ScreeningResult, SpaceData } from "./types";

/** Newest first, and capped so a long-running journal cannot grow unbounded. */
const MAX_PRACTICES = 500;
const MAX_CHECKINS = 1000;
const MAX_SCREENINGS = 300;

export function addPractice(
  data: SpaceData,
  entry: {
    kind: PracticeKind;
    detail: string;
    seconds: number;
    distressBefore: number | null;
    distressAfter: number | null;
  },
): SpaceData {
  const log: PracticeLog = { id: randomId(), at: new Date().toISOString(), ...entry };
  return { ...data, practices: [log, ...data.practices].slice(0, MAX_PRACTICES) };
}

export function addCheckIn(data: SpaceData, entry: Omit<CheckIn, "id" | "at">): SpaceData {
  const checkin: CheckIn = { id: randomId(), at: new Date().toISOString(), ...entry };
  return { ...data, checkins: [checkin, ...data.checkins].slice(0, MAX_CHECKINS) };
}

export function addScreening(
  data: SpaceData,
  entry: Omit<ScreeningResult, "id" | "at">,
): SpaceData {
  const result: ScreeningResult = { id: randomId(), at: new Date().toISOString(), ...entry };
  return { ...data, screenings: [result, ...data.screenings].slice(0, MAX_SCREENINGS) };
}

export function removeEntry(data: SpaceData, id: string): SpaceData {
  return {
    ...data,
    checkins: data.checkins.filter((entry) => entry.id !== id),
    screenings: data.screenings.filter((entry) => entry.id !== id),
    practices: data.practices.filter((entry) => entry.id !== id),
  };
}

export function setSessionNotes(data: SpaceData, notes: string): SpaceData {
  return { ...data, sessionNotes: notes };
}

export function setPrefs(data: SpaceData, prefs: Partial<SpaceData["prefs"]>): SpaceData {
  return { ...data, prefs: { ...data.prefs, ...prefs } };
}

/* ---------- Formatting shared by views and the export ---------- */

const dateFormatter = new Intl.DateTimeFormat("ro-RO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("ro-RO", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

/**
 * Romanian numeral agreement. Numbers whose last two digits are 00 or
 * 20–99 take "de" before the noun ("30 de zile"), the rest do not
 * ("14 zile"), and one takes the singular ("o zi").
 */
export function countNoun(n: number, one: string, many: string, feminine = true): string {
  if (n === 1) return `${feminine ? "o" : "un"} ${one}`;
  const lastTwo = Math.abs(n) % 100;
  const de = lastTwo === 0 || lastTwo >= 20 ? " de" : "";
  return `${n}${de} ${many}`;
}

/** Same agreement, but always keeps the digit: "1 notare", "30 de notări". */
export function countDigits(n: number, one: string, many: string): string {
  if (n === 1) return `1 ${one}`;
  const lastTwo = Math.abs(n) % 100;
  const de = lastTwo === 0 || lastTwo >= 20 ? " de" : "";
  return `${n}${de} ${many}`;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} sec`;
  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
}

export const MOOD_LABELS = ["", "foarte greu", "greu", "așa și așa", "bine", "foarte bine"];
export const LEVEL_LABELS = ["deloc", "puțin", "moderat", "mult", "copleșitor"];
export const ENERGY_LABELS = ["epuizat", "scăzut", "mediu", "bun", "plin de energie"];
export const SLEEP_LABELS = ["foarte prost", "prost", "acceptabil", "bun", "odihnitor"];

export const CHECKIN_TAGS = [
  "muncă",
  "familie",
  "relație",
  "singurătate",
  "somn prost",
  "sport",
  "natură",
  "prieteni",
  "sănătate",
  "bani",
  "amintiri",
  "terapie",
] as const;
