/** Data model for the private space. Lives only in the visitor's browser. */

export type CheckIn = {
  id: string;
  /** ISO timestamp. */
  at: string;
  /** 1 (foarte greu) … 5 (bine) */
  mood: number;
  /** 0 (deloc) … 4 (copleșitor) */
  anxiety: number;
  /** 0 (epuizat) … 4 (plin de energie) */
  energy: number;
  /** 0 (foarte prost) … 4 (odihnitor) */
  sleep: number;
  tags: string[];
  note: string;
};

export type ScreeningResult = {
  id: string;
  at: string;
  instrument: string;
  answers: number[];
  score: number;
  bandId: string;
  /** Set when an item requires an immediate safety response. */
  flagged: boolean;
};

export type PracticeKind = "breath" | "grounding" | "orientation";

export type PracticeLog = {
  id: string;
  at: string;
  kind: PracticeKind;
  /** Which pattern / variant was used. */
  detail: string;
  seconds: number;
  /** Subjective distress 0–10, before and after. Null when skipped. */
  distressBefore: number | null;
  distressAfter: number | null;
};

export type SpacePrefs = {
  sound: boolean;
  haptics: boolean;
  /** Minutes of inactivity before the vault relocks. 0 disables. */
  autoLockMinutes: number;
};

export type SpaceData = {
  version: 1;
  createdAt: string;
  checkins: CheckIn[];
  screenings: ScreeningResult[];
  practices: PracticeLog[];
  /** Free notes the visitor wants to bring into the next session. */
  sessionNotes: string;
  prefs: SpacePrefs;
};

export const DEFAULT_PREFS: SpacePrefs = {
  sound: true,
  haptics: true,
  autoLockMinutes: 10,
};

export function emptySpaceData(now = new Date()): SpaceData {
  return {
    version: 1,
    createdAt: now.toISOString(),
    checkins: [],
    screenings: [],
    practices: [],
    sessionNotes: "",
    prefs: { ...DEFAULT_PREFS },
  };
}

/**
 * Normalises anything read back out of storage. Data written by an older
 * build (or hand-edited) must never be able to crash the app.
 */
export function normalizeSpaceData(value: unknown): SpaceData {
  const base = emptySpaceData();
  if (!value || typeof value !== "object") return base;
  const raw = value as Partial<SpaceData>;
  return {
    version: 1,
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : base.createdAt,
    checkins: Array.isArray(raw.checkins) ? raw.checkins : [],
    screenings: Array.isArray(raw.screenings) ? raw.screenings : [],
    practices: Array.isArray(raw.practices) ? raw.practices : [],
    sessionNotes: typeof raw.sessionNotes === "string" ? raw.sessionNotes : "",
    prefs: { ...DEFAULT_PREFS, ...(raw.prefs ?? {}) },
  };
}
