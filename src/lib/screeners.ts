/**
 * Clinically validated, public-domain screening instruments, scored
 * entirely on the visitor's device. Nothing is transmitted or stored —
 * privacy by design, in line with the confidentiality promise of the
 * practice.
 *
 * Instruments:
 *  - GAD-7  (Spitzer, Kroenke, Williams & Löwe) — anxiety
 *  - PHQ-9  (Kroenke, Spitzer & Williams) — depression
 *  - PC-PTSD-5 (Prins et al., U.S. National Center for PTSD) — trauma
 *
 * These are screening tools, not diagnostic instruments. Every results
 * screen must carry the disclaimer and, where relevant, crisis guidance.
 */

export type ScreenerBand = {
  /** inclusive range of total scores for this band */
  min: number;
  max: number;
  label: string;
  /** short, warm interpretation shown to the visitor */
  text: string;
  /** 0..3 — drives the visual emphasis of the result */
  level: 0 | 1 | 2 | 3;
};

export type Screener = {
  slug: string;
  /** short code shown as eyebrow, e.g. "GAD-7" */
  code: string;
  title: string;
  intro: string;
  /** the question stem shown above the items */
  stem: string;
  items: readonly string[];
  options: readonly { label: string; value: number }[];
  bands: readonly ScreenerBand[];
  maxScore: number;
  /** minutes, shown on the card */
  duration: string;
  attribution: string;
  /**
   * Index of an item that, when answered above 0, must surface crisis
   * guidance regardless of the total score (PHQ-9 item 9).
   */
  criticalItem?: number;
};

const FREQUENCY_OPTIONS = [
  { label: "Deloc", value: 0 },
  { label: "Câteva zile", value: 1 },
  { label: "Mai mult de jumătate din zile", value: 2 },
  { label: "Aproape în fiecare zi", value: 3 },
] as const;

const YES_NO_OPTIONS = [
  { label: "Nu", value: 0 },
  { label: "Da", value: 1 },
] as const;

export const screeners: readonly Screener[] = [
  {
    slug: "anxietate",
    code: "GAD-7",
    title: "Chestionar de anxietate",
    intro:
      "Șapte întrebări despre îngrijorare, neliniște și tensiune. Este unul dintre cele mai folosite instrumente de screening pentru anxietate din lume.",
    stem: "În ultimele 2 săptămâni, cât de des te-au deranjat următoarele probleme?",
    items: [
      "M-am simțit nervos(oasă), anxios(oasă) sau foarte încordat(ă)",
      "Nu am reușit să opresc sau să controlez îngrijorările",
      "M-am îngrijorat prea mult, din diverse motive",
      "Mi-a fost greu să mă relaxez",
      "Am fost atât de neliniștit(ă), încât mi-a fost greu să stau locului",
      "M-am enervat sau m-am iritat ușor",
      "Am simțit teamă, ca și cum ceva îngrozitor s-ar putea întâmpla",
    ],
    options: FREQUENCY_OPTIONS,
    maxScore: 21,
    duration: "2 minute",
    attribution:
      "GAD-7 — Spitzer RL, Kroenke K, Williams JBW, Löwe B. Instrument liber de utilizat, dezvoltat cu sprijinul Pfizer Inc.",
    bands: [
      {
        min: 0,
        max: 4,
        level: 0,
        label: "Anxietate minimă",
        text: "Răspunsurile tale nu indică un nivel îngrijorător de anxietate în ultimele două săptămâni. Dacă totuși simți că ceva te apasă, merită să asculți acel semnal — scorul nu spune toată povestea.",
      },
      {
        min: 5,
        max: 9,
        level: 1,
        label: "Anxietate ușoară",
        text: "Se pare că anxietatea îți dă târcoale mai des decât ți-ai dori. La acest nivel, exercițiile de reglare (respirație, mișcare, somn) pot ajuta mult — iar dacă simptomele persistă, o discuție cu un psiholog te poate ajuta să înțelegi ce se întâmplă.",
      },
      {
        min: 10,
        max: 14,
        level: 2,
        label: "Anxietate moderată",
        text: "Scorul tău sugerează un nivel de anxietate care, cel mai probabil, îți afectează viața de zi cu zi. O evaluare făcută de un psiholog clinician este recomandată — anxietatea la acest nivel răspunde de regulă foarte bine la psihoterapie.",
      },
      {
        min: 15,
        max: 21,
        level: 3,
        label: "Anxietate severă",
        text: "Scorul tău indică un nivel ridicat de anxietate. Nu ești singur(ă) în asta și există ajutor eficient. Îți recomand să discuți cât mai curând cu un psiholog sau un medic — primul pas poate fi un simplu mesaj.",
      },
    ],
  },
  {
    slug: "dispozitie",
    code: "PHQ-9",
    title: "Chestionar de dispoziție",
    intro:
      "Nouă întrebări despre energie, somn, interes și stare de spirit. Instrument standard de screening pentru depresie, folosit în întreaga lume.",
    stem: "În ultimele 2 săptămâni, cât de des te-au deranjat următoarele probleme?",
    items: [
      "Interes sau plăcere scăzute în a face lucruri",
      "Stări de tristețe, deprimare sau lipsă de speranță",
      "Probleme cu somnul: ai adormit greu, te-ai trezit des sau ai dormit prea mult",
      "Oboseală sau energie scăzută",
      "Poftă de mâncare scăzută sau, dimpotrivă, mâncat în exces",
      "Păreri proaste despre tine — că ești un eșec sau că ți-ai dezamăgit familia",
      "Dificultăți de concentrare, de exemplu la citit sau la televizor",
      "Mișcări ori vorbire vizibil încetinite sau, dimpotrivă, neliniște și agitație",
      "Gânduri că ar fi mai bine să nu mai fii sau că ți-ai putea face rău",
    ],
    options: FREQUENCY_OPTIONS,
    maxScore: 27,
    duration: "3 minute",
    criticalItem: 8,
    attribution:
      "PHQ-9 — Kroenke K, Spitzer RL, Williams JBW. Instrument liber de utilizat, dezvoltat cu sprijinul Pfizer Inc.",
    bands: [
      {
        min: 0,
        max: 4,
        level: 0,
        label: "Simptome minime",
        text: "Răspunsurile tale nu indică semne semnificative de depresie în ultimele două săptămâni. Continuă să ai grijă de tine — somnul, mișcarea și relațiile sunt cea mai bună prevenție.",
      },
      {
        min: 5,
        max: 9,
        level: 1,
        label: "Simptome ușoare",
        text: "Ceva pare să îți consume energia mai mult decât de obicei. Nu este neapărat depresie, dar merită atenție: dacă starea persistă de mai multe săptămâni, o discuție cu un psiholog te poate ajuta să previi o adâncire a ei.",
      },
      {
        min: 10,
        max: 14,
        level: 2,
        label: "Simptome moderate",
        text: "Scorul tău sugerează simptome care, cel mai probabil, îți afectează funcționarea de zi cu zi. O evaluare clinică este recomandată — depresia este una dintre dificultățile care răspund cel mai bine la psihoterapie.",
      },
      {
        min: 15,
        max: 19,
        level: 3,
        label: "Simptome moderat-severe",
        text: "Scorul tău indică simptome semnificative. Meriți sprijin, iar el există și funcționează. Te încurajez să iei legătura cât mai curând cu un psiholog sau un medic psihiatru.",
      },
      {
        min: 20,
        max: 27,
        level: 3,
        label: "Simptome severe",
        text: "Scorul tău indică un nivel ridicat de suferință. Te rog să nu rămâi singur(ă) cu asta: contactează cât mai curând un psiholog sau un medic psihiatru. Dacă ai gânduri de a-ți face rău, sună acum la 112 sau la linia antisuicid 0800 801 200.",
      },
    ],
  },
  {
    slug: "trauma",
    code: "PC-PTSD-5",
    title: "Chestionar de traumă",
    intro:
      "Cinci întrebări scurte despre felul în care un eveniment copleșitor din trecut se poate face simțit în prezent. Dezvoltat de Centrul Național pentru PTSD (SUA).",
    stem:
      "Uneori trecem prin evenimente neobișnuit de înspăimântătoare, îngrozitoare sau copleșitoare — de exemplu un accident grav, violență, abuz, un dezastru sau moartea neașteptată a cuiva drag. Gândindu-te la un astfel de eveniment, în ultima lună...",
    items: [
      "Ai avut coșmaruri legate de eveniment sau te-ai gândit la el fără să vrei?",
      "Ai făcut eforturi să nu te gândești la eveniment sau ai evitat situații care ți-l amintesc?",
      "Ai fost în permanență în gardă, hipervigilent(ă) sau ai tresărit ușor?",
      "Te-ai simțit amorțit(ă) sau detașat(ă) de oameni, de activități sau de ce te înconjoară?",
      "Te-ai simțit vinovat(ă) ori ai dat vina pe tine sau pe alții pentru eveniment sau pentru ce a urmat?",
    ],
    options: YES_NO_OPTIONS,
    maxScore: 5,
    duration: "1 minut",
    attribution:
      "PC-PTSD-5 — Prins A. et al., U.S. National Center for PTSD. Instrument în domeniul public.",
    bands: [
      {
        min: 0,
        max: 2,
        level: 0,
        label: "Sub pragul de screening",
        text: "Răspunsurile tale nu ating pragul care indică un posibil stres posttraumatic. Dacă totuși un eveniment din trecut continuă să te apese, acest lucru contează — indiferent de scor, poți vorbi despre el în terapie.",
      },
      {
        min: 3,
        max: 5,
        level: 2,
        label: "Peste pragul de screening",
        text: "Răspunsurile tale sugerează că urmele unui eveniment copleșitor sunt încă active. Acesta nu este un diagnostic — dar este un semnal serios că o evaluare făcută de un specialist în terapia traumei te-ar putea ajuta. Trauma se poate vindeca, în ritmul tău.",
      },
    ],
  },
] as const;

export function bandFor(screener: Screener, score: number): ScreenerBand {
  return (
    screener.bands.find((b) => score >= b.min && score <= b.max) ??
    screener.bands[screener.bands.length - 1]
  );
}

/**
 * sessionStorage bridge: a screener result can pre-fill the contact-form
 * message. Kept in sessionStorage (cleared when the tab closes) so the
 * result never persists beyond the visit.
 */
const PREFILL_KEY = "contact-prefill";

export function setContactPrefill(message: string) {
  try {
    sessionStorage.setItem(PREFILL_KEY, message);
  } catch {
    // Storage unavailable (private mode) — the visitor just types the message.
  }
}

export function takeContactPrefill(): string {
  try {
    const value = sessionStorage.getItem(PREFILL_KEY) ?? "";
    sessionStorage.removeItem(PREFILL_KEY);
    return value;
  } catch {
    return "";
  }
}
