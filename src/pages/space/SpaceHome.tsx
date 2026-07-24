import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SpaceSetup, SpaceUnlock } from "@/components/space/LockScreen";
import { Sparkline } from "@/components/space/Sparkline";
import { useSpace } from "@/lib/space/SpaceContext";
import { countNoun, formatDate, formatDuration } from "@/lib/space/actions";
import { bandFor, getInstrument } from "@/lib/space/screeners";
import { bestPractice, dailySeries, latestByInstrument, withinDays } from "@/lib/space/stats";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const TOOLS = [
  {
    to: "/spatiul-tau/verifica",
    title: "Unde sunt acum",
    text: "Trei întrebări care îți spun ce se întâmplă cu sistemul tău nervos și ce exercițiu i se potrivește.",
    time: "1 min",
  },
  {
    to: "/spatiul-tau/respiratie",
    title: "Respirație ghidată",
    text: "Cinci ritmuri diferite, cu ghidaj vizual, sonor și tactil. Funcționează și cu ochii închiși.",
    time: "1–10 min",
  },
  {
    to: "/spatiul-tau/ancorare",
    title: "Ancorare 5-4-3-2-1",
    text: "Când mintea pleacă în altă parte, simțurile o aduc înapoi în camera în care ești.",
    time: "3 min",
  },
  {
    to: "/spatiul-tau/chestionare",
    title: "Chestionare de screening",
    text: "GAD-7, PHQ-9, PC-PTSD-5 și WHO-5 — completate și calculate pe dispozitivul tău.",
    time: "1–3 min",
  },
];

export function SpaceHome() {
  useDocumentTitle("Spațiul tău · între ședințe");
  const { status, data } = useSpace();

  return (
    <div className="mx-auto max-w-[var(--shell-max)] px-6 md:px-10 py-12 md:py-16">
      <p className="eyebrow">Spațiul tău</p>
      <h1 className="display mt-4 text-[clamp(2.1rem,1.6rem+2.4vw,3.4rem)]">
        Terapia se întâmplă o oră pe săptămână. <em>Restul</em> se întâmplă aici.
      </h1>
      <p className="mt-6 text-[17px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
        Instrumente de reglare, autoevaluare și notare, gândite pentru
        intervalul dintre ședințe. Totul rulează pe dispozitivul tău: nu există
        cont, nu există server, nu există statistici pe care să le văd eu. Nici
        măcar nu aș putea.
      </p>

      {status === "unlocked" && data && <Dashboard data={data} />}

      {/* ---------- Tools ---------- */}
      <h2 className="mt-14 text-[1.5rem]">Ce poți face acum</h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <li key={tool.to}>
            <Link to={tool.to} className="card card--hover flex h-full flex-col p-7">
              <span className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-clay)]">
                {tool.time}
              </span>
              <h3 className="mt-2 text-[1.25rem]">{tool.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed">{tool.text}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* ---------- Vault state ---------- */}
      {status === "locked" && (
        <div className="mt-14">
          <h2 className="mb-6 text-[1.5rem]">Jurnalul tău te așteaptă</h2>
          <SpaceUnlock />
        </div>
      )}

      {status === "absent" && (
        <div className="mt-14">
          <h2 className="text-[1.5rem]">Vrei să păstrezi ce notezi?</h2>
          <p className="mt-3 mb-8 text-[16px] leading-relaxed" style={{ maxWidth: "var(--measure)" }}>
            Exercițiile de mai sus funcționează fără nimic. Dacă vrei însă să
            urmărești ce se schimbă în timp — și să ajungi la ședință cu ceva
            concret în mână — ai nevoie de un loc în care să se salveze.
          </p>
          <SpaceSetup />
        </div>
      )}

      {/* ---------- Privacy explainer ---------- */}
      <section className="mt-16 rounded-[2rem] bg-[color:var(--color-surface)] p-8 md:p-12">
        <h2 className="text-[1.5rem]">De ce nu se trimite nimic nicăieri</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3 text-[15px] leading-relaxed">
          <div>
            <h3 className="text-[1.05rem]">Fără server</h3>
            <p className="mt-2">
              Aplicația nu are un backend către care să trimită date. Nu este o
              promisiune de politică — este o proprietate a felului în care e
              construită.
            </p>
          </div>
          <div>
            <h3 className="text-[1.05rem]">Criptat cu codul tău</h3>
            <p className="mt-2">
              Dacă alegi un cod, notările sunt criptate cu AES-256, cu o cheie
              derivată din el prin 310.000 de iterații. Codul nu se salvează.
            </p>
          </div>
          <div>
            <h3 className="text-[1.05rem]">Tu decizi ce ajunge la mine</h3>
            <p className="mt-2">
              Singurul mod în care văd ceva de aici este să îmi arăți tu, în
              ședință sau printr-un rezumat tipărit. Nimic nu pleacă automat.
            </p>
          </div>
        </div>
        <p className="mt-8 text-[14px] leading-relaxed text-[color:var(--color-muted)]" style={{ maxWidth: "var(--measure)" }}>
          Un singur lucru pe care nu îl pot rezolva din cod: dacă altcineva îți
          folosește dispozitivul deblocat. Pentru asta există codul de acces,
          blocarea automată și butonul de ieșire rapidă din colțul paginii —
          care închide pagina imediat, dar nu poate șterge istoricul
          browserului tău.
        </p>
      </section>

      {/* ---------- Boundary ---------- */}
      <section className="mt-10 rounded-2xl border border-[color:var(--color-clay-tint)] bg-[color:var(--color-clay-tint)]/40 p-7">
        <h2 className="text-[1.2rem] text-[color:var(--color-clay-deep)]">
          Ce nu este spațiul acesta
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed">
          Nu înlocuiește terapia și nu este monitorizat de nimeni. Dacă treci
          printr-o criză, sună la <strong>112</strong> sau la linia antisuicid{" "}
          <a href="tel:0800801200" className="text-link">0800 801 200</a>.
          Pentru o programare,{" "}
          <Link to="/contact" className="text-link">scrie-mi direct</Link>.
        </p>
      </section>
    </div>
  );
}

function Dashboard({ data }: { data: import("@/lib/space/types").SpaceData }) {
  const moodSeries = useMemo(() => dailySeries(data.checkins, "mood", 30), [data.checkins]);
  const recentPractices = useMemo(() => withinDays(data.practices, 7), [data.practices]);
  const best = useMemo(() => bestPractice(data.practices), [data.practices]);
  const latestScreenings = useMemo(() => latestByInstrument(data.screenings), [data.screenings]);
  const lastCheckin = data.checkins[0];

  const empty =
    data.checkins.length === 0 && data.practices.length === 0 && data.screenings.length === 0;

  if (empty) {
    return (
      <div className="card mt-10 p-7">
        <h2 className="text-[1.25rem]">Spațiul e gata, dar încă gol</h2>
        <p className="mt-2 text-[15px] leading-relaxed">
          Începe cu ce ai nevoie chiar acum. Prima notare în jurnal durează
          un minut și de la a treia încep să se vadă tipare.
        </p>
        <Link to="/spatiul-tau/jurnal" className="btn-primary mt-5">
          Prima notare
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      <div className="card p-6 md:col-span-2">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[1.15rem]">Dispoziția, ultimele {countNoun(30, "zi", "zile")}</h2>
          <Link to="/spatiul-tau/jurnal" className="text-[13px] text-link">
            Jurnal
          </Link>
        </div>
        <div className="mt-4">
          <Sparkline points={moodSeries} min={1} max={5} label="Dispoziție" height={72} />
        </div>
        {lastCheckin && (
          <p className="mt-3 text-[13.5px] text-[color:var(--color-muted)]">
            Ultima notare: {formatDate(lastCheckin.at)}
          </p>
        )}
      </div>

      <div className="card p-6">
        <h2 className="text-[1.15rem]">Săptămâna asta</h2>
        <p className="mt-3 font-[family-name:var(--font-display)] text-[2.4rem] leading-none text-[color:var(--color-ink)]">
          {recentPractices.length}
        </p>
        <p className="text-[14px] text-[color:var(--color-muted)]">
          {recentPractices.length === 1 ? "exercițiu de reglare" : "exerciții de reglare"}
        </p>
        {best && (
          <p className="mt-4 text-[14px] leading-relaxed">
            Cel mai bine îți prinde <strong>{best.detail}</strong> — în medie
            −{best.averageRelief.toFixed(1)} puncte de tensiune.
          </p>
        )}
        {recentPractices.length > 0 && (
          <p className="mt-3 text-[13px] text-[color:var(--color-muted)]">
            {formatDuration(recentPractices.reduce((sum, p) => sum + p.seconds, 0))} în total
          </p>
        )}
      </div>

      {latestScreenings.size > 0 && (
        <div className="card p-6 md:col-span-3">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-[1.15rem]">Ultimele chestionare</h2>
            <Link to="/spatiul-tau/chestionare" className="text-[13px] text-link">
              Toate
            </Link>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[...latestScreenings.values()].map((entry) => {
              const instrument = getInstrument(entry.instrument);
              if (!instrument) return null;
              const band = bandFor(instrument, entry.score);
              return (
                <li key={entry.id} className="rounded-xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
                    {instrument.short}
                  </p>
                  <p className="mt-1.5 font-[family-name:var(--font-display)] text-[1.6rem] leading-none text-[color:var(--color-ink)]">
                    {entry.score}
                    <span className="text-[13px] text-[color:var(--color-muted)]"> / {instrument.max}</span>
                  </p>
                  <p className={`band band--${band.tone} mt-2`}>{band.label}</p>
                  <p className="mt-2 text-[12.5px] text-[color:var(--color-muted)]">
                    {formatDate(entry.at)}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
