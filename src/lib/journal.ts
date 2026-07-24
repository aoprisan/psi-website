/**
 * Private mood journal, stored exclusively in the browser's localStorage.
 * Nothing ever leaves the device — the site has no backend and makes no
 * network requests with this data. The visitor can export or erase
 * everything at any time (privacy by design).
 */

export type JournalEntry = {
  id: string;
  /** ISO date-time of creation */
  date: string;
  /** 1 (foarte greu) .. 5 (foarte bine) */
  mood: number;
  note: string;
};

const KEY = "jurnal-stare-v1";

export const MOODS = [
  { value: 1, label: "Foarte greu", emoji: "🌧" },
  { value: 2, label: "Greu", emoji: "🌫" },
  { value: 3, label: "Așa și așa", emoji: "⛅" },
  { value: 4, label: "Bine", emoji: "🌤" },
  { value: 5, label: "Foarte bine", emoji: "☀️" },
] as const;

export function loadEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is JournalEntry =>
        e &&
        typeof e.id === "string" &&
        typeof e.date === "string" &&
        typeof e.mood === "number" &&
        typeof e.note === "string",
    );
  } catch {
    return [];
  }
}

function persist(entries: JournalEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries));
}

export function addEntry(mood: number, note: string): JournalEntry[] {
  const entry: JournalEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
    mood,
    note: note.trim(),
  };
  const entries = [entry, ...loadEntries()];
  persist(entries);
  return entries;
}

export function removeEntry(id: string): JournalEntry[] {
  const entries = loadEntries().filter((e) => e.id !== id);
  persist(entries);
  return entries;
}

export function clearEntries() {
  localStorage.removeItem(KEY);
}

/** Plain-text export the visitor can save or bring to a session. */
export function exportText(entries: JournalEntry[]): string {
  const lines = entries
    .slice()
    .reverse()
    .map((e) => {
      const mood = MOODS.find((m) => m.value === e.mood);
      const date = new Date(e.date).toLocaleString("ro-RO", {
        dateStyle: "full",
        timeStyle: "short",
      });
      return `${date}\nStare: ${mood?.label ?? e.mood} (${e.mood}/5)\n${e.note || "(fără notițe)"}\n`;
    });
  return `Jurnal de stare — export personal\n\n${lines.join("\n")}`;
}

export function downloadExport(entries: JournalEntry[]) {
  const blob = new Blob([exportText(entries)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "jurnal-de-stare.txt";
  a.click();
  URL.revokeObjectURL(url);
}
