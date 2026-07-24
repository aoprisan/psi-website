import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Dial } from "@/components/space/inputs";
import { Sparkline } from "@/components/space/Sparkline";
import { RequireVault } from "@/components/space/SpaceShell";
import { useSpace } from "@/lib/space/SpaceContext";
import {
  CHECKIN_TAGS,
  ENERGY_LABELS,
  LEVEL_LABELS,
  MOOD_LABELS,
  SLEEP_LABELS,
  addCheckIn,
  countDigits,
  countNoun,
  formatDateTime,
  formatDuration,
  removeEntry,
} from "@/lib/space/actions";
import { byNewest, dailySeries, insights, trend } from "@/lib/space/stats";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export function Journal() {
  useDocumentTitle("Jurnal · Spațiul tău");
  return (
    <RequireVault title="Jurnalul tău">
      <JournalInner />
    </RequireVault>
  );
}

const WINDOW_DAYS = 30;

function JournalInner() {
  const { data, update } = useSpace();
  const [mood, setMood] = useState(2);
  const [anxiety, setAnxiety] = useState(2);
  const [energy, setEnergy] = useState(2);
  const [sleep, setSleep] = useState(2);
  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const checkins = data?.checkins ?? [];
  const practices = data?.practices ?? [];

  const moodSeries = useMemo(() => dailySeries(checkins, "mood", WINDOW_DAYS), [checkins]);
  const anxietySeries = useMemo(() => dailySeries(checkins, "anxiety", WINDOW_DAYS), [checkins]);
  const sleepSeries = useMemo(() => dailySeries(checkins, "sleep", WINDOW_DAYS), [checkins]);
  const moodTrend = useMemo(() => trend(moodSeries), [moodSeries]);
  const observed = useMemo(() => insights(checkins, practices), [checkins, practices]);

  const timeline = useMemo(
    () =>
      byNewest([
        ...checkins.map((entry) => ({ type: "checkin" as const, at: entry.at, entry })),
        ...practices.map((entry) => ({ type: "practice" as const, at: entry.at, entry })),
      ]).slice(0, 40),
    [checkins, practices],
  );

  async function save() {
    await update((current) => addCheckIn(current, { mood: mood + 1, anxiety, energy, sleep, tags, note }));
    setJustSaved(true);
    setNote("");
    setTags([]);
    window.setTimeout(() => setJustSaved(false), 4000);
  }

  return (
    <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-12 md:py-16">
      <p className="eyebrow">Jurnal</p>
      <h1 className="mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.7rem)]">Cum a fost azi?</h1>
      <p className="mt-4 text-[16.5px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
        Un minut pe zi. Nu ca să te evaluezi, ci pentru că memoria este un
        martor prost: peste trei săptămâni vei ști ce s-a schimbat doar dacă
        ai notat pe parcurs.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* ---------- Check-in ---------- */}
        <div className="card p-6 md:p-8">
          <h2 className="text-[1.25rem]">Notare de azi</h2>
          <div className="mt-6 space-y-6">
            <Dial label="Dispoziție" value={mood} onChange={setMood} labels={MOOD_LABELS.slice(1)} />
            <Dial label="Anxietate" value={anxiety} onChange={setAnxiety} labels={LEVEL_LABELS} />
            <Dial label="Energie" value={energy} onChange={setEnergy} labels={ENERGY_LABELS} />
            <Dial label="Somn (noaptea trecută)" value={sleep} onChange={setSleep} labels={SLEEP_LABELS} />
          </div>

          <div className="mt-7">
            <p className="text-[14px] font-semibold text-[color:var(--color-ink)]">
              Ce a marcat ziua?
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {CHECKIN_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={tags.includes(tag)}
                  onClick={() =>
                    setTags((current) =>
                      current.includes(tag)
                        ? current.filter((t) => t !== tag)
                        : [...current, tag],
                    )
                  }
                  className={`chip ${tags.includes(tag) ? "is-selected" : ""}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="field mt-6">
            <label htmlFor="note">Câteva rânduri (opțional)</label>
            <textarea
              id="note"
              rows={4}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Ce vreau să nu uit din ziua asta…"
            />
          </div>

          <button type="button" className="btn-primary mt-6 w-full" onClick={() => void save()}>
            Salvează notarea
          </button>
          {justSaved && (
            <p className="mt-3 text-center text-[14px] text-[color:var(--color-muted)]" role="status">
              Salvat. Rămâne pe dispozitivul tău.
            </p>
          )}
        </div>

        {/* ---------- Trends ---------- */}
        <div className="space-y-6">
          <div className="card p-6 md:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[1.25rem]">Ultimele {countNoun(WINDOW_DAYS, "zi", "zile")}</h2>
              <span className="text-[13px] text-[color:var(--color-muted)]">
                {countDigits(moodTrend.samples, "notare", "notări")}
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <TrendBlock label="Dispoziție" series={moodSeries} min={1} max={5} />
              <TrendBlock label="Anxietate" series={anxietySeries} min={0} max={4} invert />
              <TrendBlock label="Somn" series={sleepSeries} min={0} max={4} />
            </div>

            {moodTrend.direction !== "unknown" && (
              <p className="mt-6 rounded-xl bg-[color:var(--color-surface)] p-4 text-[14.5px] leading-relaxed">
                {moodTrend.direction === "up" &&
                  "Dispoziția din ultimele notări este, în medie, mai bună decât la începutul perioadei."}
                {moodTrend.direction === "down" &&
                  "Dispoziția din ultimele notări este, în medie, mai scăzută decât la începutul perioadei. Merită adus în discuție."}
                {moodTrend.direction === "flat" &&
                  "Dispoziția a rămas, în medie, la același nivel în perioada urmărită."}
              </p>
            )}
          </div>

          {observed.length > 0 && (
            <div className="card p-6 md:p-8">
              <h2 className="text-[1.25rem]">Ce se vede în date</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--color-muted)]">
                Observații statistice, nu concluzii. Corelația nu înseamnă
                cauză — sunt bune de adus în ședință, nu de tratat ca adevăr.
              </p>
              <ul className="mt-5 space-y-3">
                {observed.map((item) => (
                  <li key={item.id} className="flex gap-3 text-[15px] leading-relaxed">
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        item.strength === "clear"
                          ? "bg-[color:var(--color-clay)]"
                          : "bg-[color:var(--color-sage)]"
                      }`}
                      aria-hidden
                    />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 text-[14.5px] leading-relaxed">
            <p>
              Când vine ședința, poți transforma notările de aici într-o
              pagină de pregătire — ce s-a schimbat, ce te-a apăsat, ce vrei
              să discuți.
            </p>
            <Link to="/spatiul-tau/pregatire" className="text-link mt-3 inline-block">
              Pregătește ședința
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- History ---------- */}
      {timeline.length > 0 && (
        <div className="mt-14">
          <h2 className="text-[1.4rem]">Istoric</h2>
          <ul className="mt-6 space-y-2.5">
            {timeline.map((item) => (
              <li key={item.entry.id} className="card flex flex-wrap items-baseline gap-x-4 gap-y-1 p-4">
                <span className="w-28 shrink-0 text-[13px] text-[color:var(--color-muted)]">
                  {formatDateTime(item.at)}
                </span>
                {item.type === "checkin" ? (
                  <>
                    <span className="text-[14.5px]">
                      Dispoziție: <strong>{MOOD_LABELS[item.entry.mood] ?? "–"}</strong> · anxietate:{" "}
                      {LEVEL_LABELS[item.entry.anxiety] ?? "–"} · somn:{" "}
                      {SLEEP_LABELS[item.entry.sleep] ?? "–"}
                    </span>
                    {item.entry.tags.length > 0 && (
                      <span className="text-[13px] text-[color:var(--color-muted)]">
                        {item.entry.tags.join(" · ")}
                      </span>
                    )}
                    {item.entry.note && (
                      <p className="w-full text-[14.5px] leading-relaxed text-[color:var(--color-body)]">
                        {item.entry.note}
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-[14.5px]">
                    {item.entry.detail} · {formatDuration(item.entry.seconds)}
                    {item.entry.distressBefore !== null && item.entry.distressAfter !== null && (
                      <>
                        {" "}
                        · tensiune {item.entry.distressBefore} → {item.entry.distressAfter}
                      </>
                    )}
                  </span>
                )}
                <button
                  type="button"
                  className="ml-auto text-[13px] text-[color:var(--color-muted)] underline underline-offset-4"
                  onClick={() => void update((current) => removeEntry(current, item.entry.id))}
                >
                  Șterge
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function TrendBlock({
  label,
  series,
  min,
  max,
  invert = false,
}: {
  label: string;
  series: ReturnType<typeof dailySeries>;
  min: number;
  max: number;
  invert?: boolean;
}) {
  return (
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
        {label}
      </p>
      <div className="mt-2">
        <Sparkline points={series} min={min} max={max} label={label} invert={invert} />
      </div>
    </div>
  );
}
