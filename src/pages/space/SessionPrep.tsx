import { useMemo, useState } from "react";
import { RequireVault } from "@/components/space/SpaceShell";
import { useSpace } from "@/lib/space/SpaceContext";
import {
  LEVEL_LABELS,
  MOOD_LABELS,
  SLEEP_LABELS,
  countDigits,
  countNoun,
  formatDate,
  formatDuration,
  setSessionNotes,
} from "@/lib/space/actions";
import { bandFor, getInstrument } from "@/lib/space/screeners";
import {
  dailySeries,
  latestByInstrument,
  mean,
  practiceEffects,
  trend,
  withinDays,
} from "@/lib/space/stats";
import { site } from "@/lib/site";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export function SessionPrep() {
  useDocumentTitle("Pregătire ședință · Spațiul tău");
  return (
    <RequireVault title="Pregătirea ședinței">
      <SessionPrepInner />
    </RequireVault>
  );
}

const RANGES = [
  { days: 14, label: "2 săptămâni" },
  { days: 30, label: "o lună" },
  { days: 90, label: "3 luni" },
];

function SessionPrepInner() {
  const { data, update } = useSpace();
  const [days, setDays] = useState(30);
  const [notes, setNotes] = useState(data?.sessionNotes ?? "");
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => buildSummary(data?.checkins ?? [], data?.practices ?? [], data?.screenings ?? [], days), [data, days]);

  async function persistNotes(value: string) {
    setNotes(value);
    await update((current) => setSessionNotes(current, value));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(asPlainText(summary, notes, days));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-12 md:py-16">
      <div className="no-print">
        <p className="eyebrow">Înainte de ședință</p>
        <h1 className="mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.7rem)]">
          Ce vrei să aduci în ședință
        </h1>
        <p className="mt-4 text-[16.5px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
          Primele minute ale unei ședințe se pierd des în „nu știu de unde să
          încep”. Pagina asta adună ce ai notat și o transformă într-un rezumat
          pe care îl poți citi, tipări sau trimite — <strong>tu decizi</strong>{" "}
          dacă și cui ajunge. Nimic nu pleacă automat.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-[14px] font-semibold text-[color:var(--color-ink)]">
            Perioada:
          </span>
          {RANGES.map((range) => (
            <button
              key={range.days}
              type="button"
              aria-pressed={days === range.days}
              onClick={() => setDays(range.days)}
              className={`chip ${days === range.days ? "is-selected" : ""}`}
            >
              {range.label}
            </button>
          ))}
        </div>

        <div className="field mt-8" style={{ maxWidth: "var(--measure)" }}>
          <label htmlFor="session-notes">Ce vreau să discut</label>
          <textarea
            id="session-notes"
            rows={5}
            value={notes}
            onChange={(event) => void persistNotes(event.target.value)}
            placeholder="Trei lucruri care mi-au stat în minte… o situație care s-a repetat… o întrebare pe care nu am apucat s-o pun…"
          />
          <p className="mt-2 text-[13px] text-[color:var(--color-muted)]">
            Se salvează pe măsură ce scrii, doar pe dispozitivul tău.
          </p>
        </div>
      </div>

      {/* ---------- The printable sheet ---------- */}
      <article className="prep-sheet card mt-10 p-7 md:p-10">
        <header className="border-b border-[color:var(--color-line)] pb-6">
          <h2 className="text-[1.6rem]">Rezumat pentru ședință</h2>
          <p className="mt-2 text-[14px] text-[color:var(--color-muted)]">
            Perioada: ultimele {countNoun(days, "zi", "zile")} · generat pe{" "}
            {formatDate(new Date().toISOString())}
          </p>
        </header>

        {notes.trim() && (
          <section className="pt-6">
            <h3 className="prep-sheet__heading">Ce vreau să discut</h3>
            <p className="mt-2 whitespace-pre-wrap text-[15.5px] leading-relaxed">{notes}</p>
          </section>
        )}

        <section className="pt-6">
          <h3 className="prep-sheet__heading">Cum a fost, pe scurt</h3>
          {summary.checkinCount === 0 ? (
            <p className="mt-2 text-[15px] text-[color:var(--color-muted)]">
              Nicio notare în perioada asta.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5 text-[15.5px] leading-relaxed">
              <li>
                {countDigits(summary.checkinCount, "notare", "notări")} în{" "}
                {countNoun(days, "zi", "zile")}.
              </li>
              <li>
                Dispoziție medie: <strong>{summary.moodLabel}</strong>
                {summary.moodDirection && <> · {summary.moodDirection}</>}
              </li>
              <li>
                Anxietate medie: <strong>{summary.anxietyLabel}</strong> · somn mediu:{" "}
                <strong>{summary.sleepLabel}</strong>
              </li>
              {summary.hardestDay && (
                <li>
                  Cea mai grea zi: {formatDate(summary.hardestDay.at)}
                  {summary.hardestDay.note ? ` — „${summary.hardestDay.note}”` : ""}
                </li>
              )}
              {summary.topTags.length > 0 && (
                <li>
                  Cel mai des marcat: {summary.topTags.map((t) => `${t.tag} (${t.count})`).join(", ")}
                </li>
              )}
            </ul>
          )}
        </section>

        {summary.screenings.length > 0 && (
          <section className="pt-6">
            <h3 className="prep-sheet__heading">Chestionare completate</h3>
            <ul className="mt-2 space-y-1.5 text-[15.5px] leading-relaxed">
              {summary.screenings.map((entry) => (
                <li key={entry.id}>
                  {entry.title}: <strong>{entry.score}</strong> / {entry.max} — {entry.band}
                  <span className="text-[color:var(--color-muted)]"> ({formatDate(entry.at)})</span>
                  {entry.change !== null && (
                    <span className="text-[color:var(--color-muted)]">
                      {" "}
                      · față de data trecută: {entry.change > 0 ? "+" : ""}
                      {entry.change}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {summary.practices.length > 0 && (
          <section className="pt-6">
            <h3 className="prep-sheet__heading">Exerciții de reglare</h3>
            <ul className="mt-2 space-y-1.5 text-[15.5px] leading-relaxed">
              {summary.practices.map((effect) => (
                <li key={effect.detail}>
                  {effect.detail}: {countDigits(effect.sessions, "practică", "practici")} ·{" "}
                  {formatDuration(effect.totalSeconds)} în total
                  {effect.sessions > 0 && effect.averageRelief !== 0 && (
                    <>
                      {" "}
                      · tensiune {effect.averageRelief > 0 ? "scăzută" : "crescută"} cu{" "}
                      {Math.abs(effect.averageRelief).toFixed(1)} puncte în medie
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-8 border-t border-[color:var(--color-line)] pt-5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
          Rezumat generat automat din notările personale, pe dispozitivul
          autorului. Chestionarele incluse sunt instrumente de screening și nu
          constituie un diagnostic. Cabinet: {site.name}.
        </footer>
      </article>

      <div className="no-print mt-8 flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={() => window.print()}>
          Tipărește sau salvează ca PDF
        </button>
        <button type="button" className="btn-secondary" onClick={() => void copy()}>
          {copied ? "Copiat" : "Copiază textul"}
        </button>
      </div>
      <p className="no-print mt-4 text-[13px] leading-relaxed text-[color:var(--color-muted)]" style={{ maxWidth: "var(--measure)" }}>
        Dacă alegi să trimiți rezumatul prin e-mail, ține minte că e-mailul nu
        este un canal criptat. Cel mai sigur rămâne să îl aduci tipărit sau
        să îl citești în ședință de pe telefon.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------- summary -- */

type Summary = ReturnType<typeof buildSummary>;

function buildSummary(
  checkins: import("@/lib/space/types").CheckIn[],
  practices: import("@/lib/space/types").PracticeLog[],
  screenings: import("@/lib/space/types").ScreeningResult[],
  days: number,
) {
  const window = withinDays(checkins, days);
  const moodMean = mean(window.map((c) => c.mood));
  const anxietyMean = mean(window.map((c) => c.anxiety));
  const sleepMean = mean(window.map((c) => c.sleep));
  const moodTrend = trend(dailySeries(checkins, "mood", days));

  const tagCounts = new Map<string, number>();
  for (const entry of window) {
    for (const tag of new Set(entry.tags)) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const topTags = [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const hardestDay = [...window].sort((a, b) => a.mood - b.mood)[0] ?? null;

  const latest = latestByInstrument(withinDays(screenings, days));
  const screeningRows = [...latest.values()]
    .map((entry) => {
      const instrument = getInstrument(entry.instrument);
      if (!instrument) return null;
      const previous = screenings
        .filter((s) => s.instrument === entry.instrument && new Date(s.at) < new Date(entry.at))
        .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())[0];
      return {
        id: entry.id,
        at: entry.at,
        title: instrument.short,
        score: entry.score,
        max: instrument.max,
        band: bandFor(instrument, entry.score).label,
        change: previous ? entry.score - previous.score : null,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  return {
    checkinCount: window.length,
    moodLabel: moodMean === null ? "–" : `${MOOD_LABELS[Math.round(moodMean)] ?? "–"} (${moodMean.toFixed(1)}/5)`,
    anxietyLabel:
      anxietyMean === null ? "–" : `${LEVEL_LABELS[Math.round(anxietyMean)] ?? "–"} (${anxietyMean.toFixed(1)}/4)`,
    sleepLabel:
      sleepMean === null ? "–" : `${SLEEP_LABELS[Math.round(sleepMean)] ?? "–"} (${sleepMean.toFixed(1)}/4)`,
    moodDirection:
      moodTrend.direction === "up"
        ? "în creștere față de începutul perioadei"
        : moodTrend.direction === "down"
          ? "în scădere față de începutul perioadei"
          : moodTrend.direction === "flat"
            ? "stabilă"
            : null,
    topTags,
    hardestDay,
    screenings: screeningRows,
    practices: practiceEffects(withinDays(practices, days)).slice(0, 5),
  };
}

/** Plain-text version for the clipboard — e-mail and notes apps eat HTML. */
function asPlainText(summary: Summary, notes: string, days: number): string {
  const lines: string[] = [];
  lines.push(`REZUMAT PENTRU ȘEDINȚĂ — ultimele ${countNoun(days, "zi", "zile")}`);
  lines.push(`Generat pe ${formatDate(new Date().toISOString())}`);
  lines.push("");
  if (notes.trim()) {
    lines.push("CE VREAU SĂ DISCUT");
    lines.push(notes.trim());
    lines.push("");
  }
  lines.push("CUM A FOST");
  if (summary.checkinCount === 0) {
    lines.push("- nicio notare în perioada asta");
  } else {
    lines.push(`- ${countDigits(summary.checkinCount, "notare", "notări")}`);
    lines.push(`- dispoziție medie: ${summary.moodLabel}${summary.moodDirection ? `, ${summary.moodDirection}` : ""}`);
    lines.push(`- anxietate medie: ${summary.anxietyLabel}`);
    lines.push(`- somn mediu: ${summary.sleepLabel}`);
    if (summary.topTags.length) {
      lines.push(`- cel mai des marcat: ${summary.topTags.map((t) => `${t.tag} (${t.count})`).join(", ")}`);
    }
    if (summary.hardestDay) {
      lines.push(
        `- cea mai grea zi: ${formatDate(summary.hardestDay.at)}${summary.hardestDay.note ? ` — ${summary.hardestDay.note}` : ""}`,
      );
    }
  }
  if (summary.screenings.length) {
    lines.push("");
    lines.push("CHESTIONARE");
    for (const entry of summary.screenings) {
      lines.push(
        `- ${entry.title}: ${entry.score}/${entry.max} — ${entry.band} (${formatDate(entry.at)})${
          entry.change !== null ? `, față de data trecută: ${entry.change > 0 ? "+" : ""}${entry.change}` : ""
        }`,
      );
    }
  }
  if (summary.practices.length) {
    lines.push("");
    lines.push("EXERCIȚII DE REGLARE");
    for (const effect of summary.practices) {
      lines.push(
        `- ${effect.detail}: ${countDigits(effect.sessions, "practică", "practici")}, ${formatDuration(effect.totalSeconds)} în total, tensiune ${
          effect.averageRelief >= 0 ? "-" : "+"
        }${Math.abs(effect.averageRelief).toFixed(1)} în medie`,
      );
    }
  }
  lines.push("");
  lines.push("Chestionarele sunt instrumente de screening, nu un diagnostic.");
  return lines.join("\n");
}
