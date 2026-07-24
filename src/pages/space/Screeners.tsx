import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChoiceScale } from "@/components/space/inputs";
import { SafetyNotice } from "@/components/space/SafetyNotice";
import { useSpace } from "@/lib/space/SpaceContext";
import { addScreening, formatDate } from "@/lib/space/actions";
import {
  bandFor,
  getInstrument,
  instruments,
  isFlagged,
  scoreInstrument,
  type Instrument,
} from "@/lib/space/screeners";
import { historyFor, latestByInstrument } from "@/lib/space/stats";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

/* ---------------------------------------------------------------- list -- */

export function ScreenerList() {
  useDocumentTitle("Chestionare · Spațiul tău");
  const { status, data } = useSpace();
  const latest = useMemo(
    () => latestByInstrument(data?.screenings ?? []),
    [data?.screenings],
  );

  return (
    <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-12 md:py-16">
      <p className="eyebrow">Autoevaluare</p>
      <h1 className="mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.7rem)]">
        Chestionare de screening
      </h1>
      <p className="mt-4 text-[16.5px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
        Patru instrumente folosite în practica clinică din toată lumea. Se
        completează aici, se calculează aici și rămân aici — nu ajung la mine
        decât dacă alegi tu să mi le arăți.
      </p>
      <p className="mt-4 rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-4 text-[14.5px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
        <strong>Un chestionar nu pune un diagnostic.</strong> Măsoară cât de
        des ai avut anumite trăiri, atât. Ce înseamnă ele pentru tine se poate
        afla doar într-o discuție cu un specialist.
      </p>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {instruments.map((instrument) => {
          const previous = latest.get(instrument.id);
          const band = previous ? bandFor(instrument, previous.score) : null;
          return (
            <li key={instrument.id}>
              <Link
                to={`/spatiul-tau/chestionare/${instrument.id}`}
                className="card card--hover flex h-full flex-col p-7"
              >
                <h2 className="text-[1.2rem]">{instrument.title}</h2>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed">
                  {instrument.subtitle}
                </p>
                <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
                  {instrument.items.length} întrebări · ~{instrument.minutes} min
                </p>
                {previous && band && (
                  <p className="mt-3 text-[14px] text-[color:var(--color-body)]">
                    Ultima dată ({formatDate(previous.at)}):{" "}
                    <span className={`band band--${band.tone}`}>{band.label}</span>
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {status !== "unlocked" && (
        <p className="mt-8 text-[14px] leading-relaxed text-[color:var(--color-muted)]" style={{ maxWidth: "var(--measure)" }}>
          Poți completa orice chestionar fără să creezi un spațiu personal.
          Salvarea rezultatelor — și urmărirea lor în timp — are nevoie de un
          spațiu pe acest dispozitiv.
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- runner -- */

type Phase = "intro" | "gate" | "declined" | "items" | "safety" | "result";

export function ScreenerRunner() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const instrument = getInstrument(id);
  useDocumentTitle(`${instrument?.short ?? "Chestionar"} · Spațiul tău`);

  if (!instrument) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-[1.6rem]">Chestionarul nu există</h1>
        <button type="button" className="btn-secondary mt-6" onClick={() => navigate("/spatiul-tau/chestionare")}>
          Înapoi la listă
        </button>
      </div>
    );
  }

  return <Runner instrument={instrument} key={instrument.id} />;
}

function Runner({ instrument }: { instrument: Instrument }) {
  const { status, data, update } = useSpace();
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => Array(instrument.items.length).fill(-1));
  const [saved, setSaved] = useState(false);
  /** Set once the safety notice has been shown, so it appears only once. */
  const [safetyShown, setSafetyShown] = useState(false);

  const canSave = status === "unlocked" && !!data;
  const history = useMemo(
    () => historyFor(data?.screenings ?? [], instrument.id),
    [data?.screenings, instrument.id],
  );

  const score = scoreInstrument(instrument, answers.map((a) => (a < 0 ? 0 : a)));
  const band = bandFor(instrument, score);
  const flagged = isFlagged(instrument, answers);
  const answered = answers.filter((a) => a >= 0).length;

  function answer(value: number) {
    const next = answers.map((current, i) => (i === index ? value : current));
    setAnswers(next);

    // Risk item handled the instant it is answered, before anything else.
    if (instrument.riskItem === index && value > 0 && !safetyShown) {
      setSafetyShown(true);
      setPhase("safety");
      return;
    }
    advance();
  }

  function advance() {
    if (index < instrument.items.length - 1) {
      setIndex((current) => current + 1);
    } else {
      setPhase("result");
    }
  }

  async function save() {
    if (!canSave) return;
    await update((current) =>
      addScreening(current, {
        instrument: instrument.id,
        answers,
        score,
        bandId: band.id,
        flagged,
      }),
    );
    setSaved(true);
  }

  function restart() {
    setAnswers(Array(instrument.items.length).fill(-1));
    setIndex(0);
    setSaved(false);
    setSafetyShown(false);
    setPhase(instrument.gate ? "gate" : "items");
  }

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-12 md:py-16">
      <Link to="/spatiul-tau/chestionare" className="text-[13.5px] text-[color:var(--color-muted)] underline underline-offset-4">
        ← Toate chestionarele
      </Link>

      {phase === "intro" && (
        <div className="mt-6">
          <h1 className="text-[clamp(1.8rem,1.4rem+1.6vw,2.5rem)]">{instrument.title}</h1>
          <p className="mt-4 text-[16.5px] leading-relaxed">{instrument.subtitle}</p>
          <div className="card mt-8 p-6 md:p-8">
            <ul className="space-y-3 text-[15px] leading-relaxed">
              <li>
                <strong>{instrument.items.length} întrebări</strong>, aproximativ{" "}
                {instrument.minutes} minute.
              </li>
              <li>Se calculează pe dispozitivul tău. Nu se trimite nimic nicăieri.</li>
              <li>
                Nu există răspunsuri bune sau greșite. Alege ce e mai aproape de
                adevăr, chiar dacă nu e exact.
              </li>
              <li className="text-[color:var(--color-muted)]">
                Sursă: {instrument.source}
              </li>
            </ul>
            <button
              type="button"
              className="btn-primary mt-7 w-full sm:w-auto"
              onClick={() => setPhase(instrument.gate ? "gate" : "items")}
            >
              Începe
            </button>
          </div>
        </div>
      )}

      {phase === "gate" && instrument.gate && (
        <div className="card mt-8 p-6 md:p-9">
          <h2 className="text-[1.35rem] leading-snug">{instrument.gate.question}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            {instrument.gate.note}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => setPhase("items")}>
              Da
            </button>
            <button type="button" className="btn-secondary" onClick={() => setPhase("declined")}>
              Nu
            </button>
          </div>
        </div>
      )}

      {phase === "declined" && instrument.gate && (
        <div className="card mt-8 p-6 md:p-9">
          <h2 className="text-[1.35rem]">Mulțumesc că ai răspuns</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed">{instrument.gate.declineMessage}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/spatiul-tau/chestionare" className="btn-primary">
              Vezi celelalte chestionare
            </Link>
            <button type="button" className="btn-secondary" onClick={() => setPhase("gate")}>
              Înapoi
            </button>
          </div>
        </div>
      )}

      {phase === "safety" && (
        <div className="mt-8">
          <SafetyNotice
            onContinue={() => {
              setPhase("items");
              advance();
            }}
            onStop={() => setPhase("result")}
          />
        </div>
      )}

      {phase === "items" && (
        <div className="mt-8">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
              Întrebarea {index + 1} din {instrument.items.length}
            </p>
            <p className="text-[13px] text-[color:var(--color-muted)]">{answered} completate</p>
          </div>
          <div
            className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[color:var(--color-surface-deep)]"
            role="progressbar"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={instrument.items.length}
          >
            <div
              className="h-full rounded-full bg-[color:var(--color-sage)] transition-[width] duration-300"
              style={{ width: `${((index + 1) / instrument.items.length) * 100}%` }}
            />
          </div>

          <div className="card mt-6 p-6 md:p-9">
            <p className="text-[13.5px] leading-relaxed text-[color:var(--color-muted)]">
              {instrument.prompt}
            </p>
            <ChoiceScale
              name={`${instrument.id}-${index}`}
              legend={
                <span className="mt-3 block font-[family-name:var(--font-display)] text-[clamp(1.25rem,1.1rem+0.8vw,1.6rem)] leading-snug text-[color:var(--color-ink)]">
                  {instrument.items[index]}
                </span>
              }
              options={instrument.scale}
              value={answers[index] >= 0 ? answers[index] : null}
              onChange={answer}
            />

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {index > 0 && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIndex((current) => current - 1)}
                >
                  Înapoi
                </button>
              )}
              {answers[index] >= 0 && index === instrument.items.length - 1 && (
                <button type="button" className="btn-primary" onClick={() => setPhase("result")}>
                  Vezi rezultatul
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {phase === "result" && (
        <div className="mt-8">
          {flagged && (
            <div className="mb-8">
              <SafetyNotice />
            </div>
          )}

          <div className={`card p-7 md:p-9 outcome outcome--${band.tone}`}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
              Rezultat · {instrument.short}
            </p>
            <div className="mt-4 flex flex-wrap items-baseline gap-4">
              <span className="font-[family-name:var(--font-display)] text-[3.2rem] leading-none text-[color:var(--color-ink)]">
                {score}
              </span>
              <span className="text-[15px] text-[color:var(--color-muted)]">
                din {instrument.max}
              </span>
              <span className={`band band--${band.tone}`}>{band.label}</span>
            </div>

            {/* Where the score sits on the full range. */}
            <div className="mt-6">
              <div className="flex h-2.5 w-full overflow-hidden rounded-full">
                {instrument.bands.map((entry) => (
                  <span
                    key={entry.id}
                    className={`band-bar band-bar--${entry.tone} ${entry.id === band.id ? "is-current" : ""}`}
                    style={{ flexGrow: entry.max - entry.min + 1 }}
                    title={entry.label}
                  />
                ))}
              </div>
              <div className="mt-1.5 flex justify-between text-[12px] text-[color:var(--color-muted)]">
                <span>0</span>
                <span>{instrument.max}</span>
              </div>
            </div>

            <p className="mt-6 text-[16px] leading-relaxed">{band.meaning}</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-[color:var(--color-body)]">
              {instrument.footer}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {canSave && !saved && (
                <button type="button" className="btn-primary" onClick={() => void save()}>
                  Salvează rezultatul
                </button>
              )}
              {saved && (
                <p className="self-center text-[14px] text-[color:var(--color-muted)]" role="status">
                  Salvat pe dispozitivul tău.
                </p>
              )}
              <Link to="/contact" className="btn-secondary">
                Discută cu un specialist
              </Link>
              <button type="button" className="btn-secondary" onClick={restart}>
                Reia chestionarul
              </button>
            </div>

            {!canSave && (
              <p className="mt-5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                Rezultatul dispare când închizi pagina. Creează-ți un spațiu
                personal dacă vrei să îl păstrezi și să vezi cum evoluează.
              </p>
            )}
          </div>

          {history.length > 0 && (
            <div className="card mt-6 p-7">
              <h2 className="text-[1.15rem]">Evoluția ta</h2>
              <ul className="mt-4 space-y-2">
                {[...history].reverse().map((entry) => {
                  const entryBand = bandFor(instrument, entry.score);
                  return (
                    <li key={entry.id} className="flex items-center gap-4 text-[14.5px]">
                      <span className="w-32 shrink-0 text-[color:var(--color-muted)]">
                        {formatDate(entry.at)}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`inline-block h-2 rounded-full band-bar--${entryBand.tone}`}
                          style={{ width: `${Math.max(3, (entry.score / instrument.max) * 100)}%` }}
                        />
                      </span>
                      <span className="w-10 shrink-0 text-right tabular-nums">{entry.score}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
