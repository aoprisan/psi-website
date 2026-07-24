import { useMemo, useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site } from "@/lib/site";
import {
  MOODS,
  addEntry,
  clearEntries,
  downloadExport,
  loadEntries,
  removeEntry,
  type JournalEntry,
} from "@/lib/journal";

/** Average mood per day over the last 30 days, as a small SVG line. */
function TrendChart({ entries }: { entries: JournalEntry[] }) {
  const points = useMemo(() => {
    const byDay = new Map<string, number[]>();
    for (const e of entries) {
      const day = e.date.slice(0, 10);
      byDay.set(day, [...(byDay.get(day) ?? []), e.mood]);
    }
    const days: { day: string; avg: number }[] = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const moods = byDay.get(key);
      if (moods) {
        days.push({ day: key, avg: moods.reduce((a, b) => a + b, 0) / moods.length });
      } else {
        days.push({ day: key, avg: NaN });
      }
    }
    return days;
  }, [entries]);

  const known = points.filter((p) => !Number.isNaN(p.avg));
  if (known.length < 2) {
    return (
      <p className="text-[14px] leading-relaxed text-[color:var(--color-muted)]">
        După câteva zile de notițe, aici va apărea evoluția stării tale din
        ultimele 30 de zile.
      </p>
    );
  }

  const W = 560;
  const H = 120;
  const x = (i: number) => (i / (points.length - 1)) * (W - 16) + 8;
  const y = (mood: number) => H - 12 - ((mood - 1) / 4) * (H - 24);
  const path = points
    .map((p, i) => (Number.isNaN(p.avg) ? null : `${x(i)},${y(p.avg)}`))
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="Grafic cu evoluția stării din ultimele 30 de zile"
    >
      {[1, 3, 5].map((m) => (
        <line
          key={m}
          x1="8"
          x2={W - 8}
          y1={y(m)}
          y2={y(m)}
          stroke="var(--color-line-soft)"
          strokeWidth="1"
        />
      ))}
      <polyline
        points={path}
        fill="none"
        stroke="var(--color-clay)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) =>
        Number.isNaN(p.avg) ? null : (
          <circle key={p.day} cx={x(i)} cy={y(p.avg)} r="3.5" fill="var(--color-pine)" />
        ),
      )}
    </svg>
  );
}

export function Journal() {
  useDocumentTitle(`Jurnal de stare · ${site.name}`);
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadEntries());
  const [mood, setMood] = useState<number | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mood === null) return;
    const form = e.currentTarget;
    const note = String(new FormData(form).get("note") ?? "");
    setEntries(addEntry(mood, note));
    setMood(null);
    form.reset();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <PageHero
        eyebrow="Resurse · Jurnal"
        title={
          <>
            Un jurnal <em>doar al tău</em>
          </>
        }
        lead="Notează-ți starea în câteva secunde și vezi cum evoluează în timp. Totul rămâne pe dispozitivul tău — nimic nu este trimis pe internet, iar tu poți exporta sau șterge oricând tot ce ai scris."
      />

      <Section spacing="tight">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* entry form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="card p-7 md:p-9">
              <h2 className="text-[1.4rem]">Cum îți este astăzi?</h2>
              <div className="mt-6 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Starea de azi">
                {MOODS.map((m) => {
                  const active = mood === m.value;
                  return (
                    <button
                      key={m.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setMood(m.value)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-1 py-3 transition-colors ${
                        active
                          ? "border-[color:var(--color-pine)] bg-[color:var(--color-surface)]"
                          : "border-[color:var(--color-line-soft)] hover:border-[color:var(--color-sage)]"
                      }`}
                    >
                      <span aria-hidden className="text-[1.4rem] leading-none">{m.emoji}</span>
                      <span className="text-center text-[11px] font-semibold leading-tight text-[color:var(--color-body)]">
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="field mt-6">
                <label htmlFor="note">Ce a contat azi? (opțional)</label>
                <textarea
                  id="note"
                  name="note"
                  rows={4}
                  placeholder="Un gând, o situație, ceva ce vrei să ții minte sau să aduci în terapie…"
                />
              </div>

              <div className="mt-6 flex items-center gap-4">
                <Button type="submit" arrow={false} disabled={mood === null} className={mood === null ? "opacity-50" : ""}>
                  Salvează în jurnal
                </Button>
                {saved && (
                  <span role="status" className="text-[14px] font-semibold text-[color:var(--color-sage)]">
                    ✓ Salvat pe dispozitiv
                  </span>
                )}
              </div>

              <p className="mt-6 border-t border-[color:var(--color-line-soft)] pt-4 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                Confidențialitate prin design: notițele se salvează doar în
                acest browser, pe acest dispozitiv. Dacă folosești un dispozitiv
                comun, poți șterge totul oricând, cu un singur buton.
              </p>
            </form>
          </Reveal>

          {/* trend + history */}
          <Reveal delay={100} className="space-y-6">
            <div className="card p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-[1.25rem]">Ultimele 30 de zile</h2>
                <span className="text-[13px] text-[color:var(--color-muted)]">
                  {entries.length} {entries.length === 1 ? "notiță" : "notițe"}
                </span>
              </div>
              <div className="mt-5">
                <TrendChart entries={entries} />
              </div>
            </div>

            {entries.length > 0 && (
              <div className="card p-7">
                <h2 className="text-[1.25rem]">Notițele tale</h2>
                <ul className="mt-4 max-h-[26rem] space-y-4 overflow-y-auto pr-1">
                  {entries.map((e) => {
                    const m = MOODS.find((x) => x.value === e.mood);
                    return (
                      <li key={e.id} className="rounded-xl border border-[color:var(--color-line-soft)] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[13px] font-semibold text-[color:var(--color-muted)]">
                            {new Date(e.date).toLocaleString("ro-RO", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}{" "}
                            · <span aria-hidden>{m?.emoji}</span> {m?.label}
                          </p>
                          <button
                            onClick={() => setEntries(removeEntry(e.id))}
                            className="text-[12.5px] font-semibold text-[color:var(--color-muted)] hover:text-[#9c4632]"
                            aria-label={`Șterge notița din ${new Date(e.date).toLocaleDateString("ro-RO")}`}
                          >
                            Șterge
                          </button>
                        </div>
                        {e.note && (
                          <p className="mt-2 whitespace-pre-wrap text-[14.5px] leading-relaxed">{e.note}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[color:var(--color-line-soft)] pt-5">
                  <button className="text-link text-[14px]" onClick={() => downloadExport(entries)}>
                    Exportă tot (fișier text)
                  </button>
                  {confirmClear ? (
                    <span className="text-[14px]">
                      Sigur ștergi tot jurnalul?{" "}
                      <button
                        className="font-semibold text-[#9c4632] underline underline-offset-2"
                        onClick={() => {
                          clearEntries();
                          setEntries([]);
                          setConfirmClear(false);
                        }}
                      >
                        Da, șterge
                      </button>{" "}
                      ·{" "}
                      <button className="text-link" onClick={() => setConfirmClear(false)}>
                        Renunță
                      </button>
                    </span>
                  ) : (
                    <button
                      className="text-[14px] font-semibold text-[color:var(--color-muted)] hover:text-[#9c4632]"
                      onClick={() => setConfirmClear(true)}
                    >
                      Șterge tot jurnalul
                    </button>
                  )}
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
