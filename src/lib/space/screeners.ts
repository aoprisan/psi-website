/**
 * Validated screening instruments, scored on the device.
 *
 * All four are free to use without licence: GAD-7 and PHQ-9 (Pfizer /
 * Spitzer et al., released for reproduction without permission), PC-PTSD-5
 * (US National Center for PTSD, public domain) and WHO-5 (WHO, free for
 * non-commercial use with attribution).
 *
 * These are screening tools, not diagnoses. Every result view says so, and
 * anything touching self-harm routes to `riskItem` handling below.
 */

export type ScaleOption = { value: number; label: string };

export type Instrument = {
  id: string;
  /** Short label used in lists and charts. */
  short: string;
  title: string;
  subtitle: string;
  /** Roughly how long it takes, in minutes. */
  minutes: number;
  /** Shown above the items — the reference period and framing. */
  prompt: string;
  /** Optional gate question; a "no" ends the screener early. */
  gate?: { question: string; note: string; declineMessage: string };
  scale: ScaleOption[];
  items: string[];
  max: number;
  /** Index of an item that triggers the safety flow when answered above 0. */
  riskItem?: number;
  /** Converts the raw sum into the reported score (WHO-5 multiplies by 4). */
  transform?: (raw: number) => number;
  bands: Band[];
  /** Sentences shown under the result, written to be read alone at 2am. */
  footer: string;
  source: string;
};

export type Band = {
  id: string;
  min: number;
  max: number;
  label: string;
  /** "calm" | "watch" | "act" drives the colour treatment. */
  tone: "calm" | "watch" | "act";
  meaning: string;
};

const FREQUENCY_SCALE: ScaleOption[] = [
  { value: 0, label: "Deloc" },
  { value: 1, label: "Câteva zile" },
  { value: 2, label: "Mai mult de jumătate din zile" },
  { value: 3, label: "Aproape în fiecare zi" },
];

const YES_NO_SCALE: ScaleOption[] = [
  { value: 0, label: "Nu" },
  { value: 1, label: "Da" },
];

const WELLBEING_SCALE: ScaleOption[] = [
  { value: 0, label: "În niciun moment" },
  { value: 1, label: "Uneori" },
  { value: 2, label: "Mai puțin de jumătate din timp" },
  { value: 3, label: "Mai mult de jumătate din timp" },
  { value: 4, label: "Aproape tot timpul" },
  { value: 5, label: "Tot timpul" },
];

export const instruments: Instrument[] = [
  {
    id: "gad7",
    short: "Anxietate (GAD-7)",
    title: "GAD-7 — nivelul anxietății",
    subtitle: "Șapte întrebări despre îngrijorare, tensiune și neliniște.",
    minutes: 2,
    prompt: "În ultimele 2 săptămâni, cât de des te-au deranjat următoarele?",
    scale: FREQUENCY_SCALE,
    items: [
      "Te-ai simțit nervos(oasă), anxios(oasă) sau în tensiune",
      "Nu ai putut opri sau controla îngrijorarea",
      "Te-ai îngrijorat prea mult din cauza a tot felul de lucruri",
      "Ți-a fost greu să te relaxezi",
      "Ai fost atât de neliniștit(ă) încât îți era greu să stai locului",
      "Te-ai enervat sau iritat ușor",
      "Ți-a fost teamă că s-ar putea întâmpla ceva îngrozitor",
    ],
    max: 21,
    bands: [
      {
        id: "minim",
        min: 0,
        max: 4,
        label: "Anxietate minimă",
        tone: "calm",
        meaning:
          "Răspunsurile tale nu indică un nivel de anxietate care să iasă din obișnuit în ultimele două săptămâni.",
      },
      {
        id: "usoara",
        min: 5,
        max: 9,
        label: "Anxietate ușoară",
        tone: "calm",
        meaning:
          "Există o anxietate prezentă, dar la un nivel pe care mulți oameni îl gestionează. Merită observată dacă persistă sau crește.",
      },
      {
        id: "moderata",
        min: 10,
        max: 14,
        label: "Anxietate moderată",
        tone: "watch",
        meaning:
          "De la acest prag în sus, ghidurile clinice recomandă o evaluare mai atentă. Este un motiv bun să vorbești cu un specialist.",
      },
      {
        id: "severa",
        min: 15,
        max: 21,
        label: "Anxietate severă",
        tone: "act",
        meaning:
          "Nivelul raportat este ridicat și, de regulă, afectează semnificativ viața de zi cu zi. Sprijinul unui specialist este recomandat.",
      },
    ],
    footer:
      "GAD-7 este un instrument de screening larg folosit, nu un diagnostic. Un scor mare nu înseamnă că ceva este „în neregulă” cu tine — înseamnă că duci o greutate care merită sprijin.",
    source: "Spitzer RL, Kroenke K, Williams JBW, Löwe B (2006)",
  },
  {
    id: "phq9",
    short: "Dispoziție (PHQ-9)",
    title: "PHQ-9 — starea de dispoziție",
    subtitle: "Nouă întrebări despre energie, somn, interes și stare afectivă.",
    minutes: 3,
    prompt: "În ultimele 2 săptămâni, cât de des te-au deranjat următoarele?",
    scale: FREQUENCY_SCALE,
    items: [
      "Interes sau plăcere reduse pentru lucrurile pe care le faci",
      "Stare de tristețe, descurajare sau lipsă de speranță",
      "Dificultăți de adormire, somn întrerupt sau somn prea mult",
      "Oboseală sau lipsă de energie",
      "Poftă de mâncare scăzută sau, dimpotrivă, mâncat excesiv",
      "Sentimentul că ești un eșec sau că i-ai dezamăgit pe cei apropiați",
      "Dificultăți de concentrare (la citit, la televizor, la muncă)",
      "Mișcări și vorbire vizibil încetinite — sau, dimpotrivă, agitație",
      "Gânduri că ar fi mai bine să nu mai fii sau că ți-ai face rău",
    ],
    max: 27,
    riskItem: 8,
    bands: [
      {
        id: "minim",
        min: 0,
        max: 4,
        label: "Simptome minime",
        tone: "calm",
        meaning:
          "Răspunsurile nu indică simptome depresive semnificative în ultimele două săptămâni.",
      },
      {
        id: "usoara",
        min: 5,
        max: 9,
        label: "Simptome ușoare",
        tone: "calm",
        meaning:
          "Sunt prezente câteva simptome. Adesea este util să le urmărești în timp și să vezi dacă se accentuează.",
      },
      {
        id: "moderata",
        min: 10,
        max: 14,
        label: "Simptome moderate",
        tone: "watch",
        meaning:
          "Peste acest prag, o discuție cu un psiholog sau un medic este recomandată de ghidurile clinice.",
      },
      {
        id: "moderat-severa",
        min: 15,
        max: 19,
        label: "Simptome moderat-severe",
        tone: "act",
        meaning:
          "Nivelul raportat afectează, de obicei, funcționarea zilnică. Sprijinul specializat este important.",
      },
      {
        id: "severa",
        min: 20,
        max: 27,
        label: "Simptome severe",
        tone: "act",
        meaning:
          "Este un nivel ridicat de suferință. Te rog să nu duci asta singur(ă) — caută sprijin de specialitate cât mai curând.",
      },
    ],
    footer:
      "PHQ-9 este un instrument de screening, nu un diagnostic. Doar o evaluare făcută de un specialist poate stabili ce se întâmplă și ce ajută.",
    source: "Kroenke K, Spitzer RL, Williams JBW (2001)",
  },
  {
    id: "pcptsd5",
    short: "Traumă (PC-PTSD-5)",
    title: "PC-PTSD-5 — urmele unui eveniment traumatic",
    subtitle: "Cinci întrebări scurte, cu răspuns da / nu.",
    minutes: 2,
    prompt:
      "În ultima lună, ai trăit vreuna dintre următoarele, în legătură cu acel eveniment?",
    gate: {
      question:
        "Ai trecut vreodată printr-un eveniment atât de înspăimântător, oribil sau tulburător încât, în ultima lună, ai simțit că te urmărește?",
      note:
        "De exemplu: un accident, o agresiune, o pierdere bruscă, o boală gravă, violență în familie, un dezastru — sau ceva ce nu are încă un nume.",
      declineMessage:
        "Atunci acest chestionar nu ți se potrivește acum, și e un lucru bun. Dacă totuși ceva te apasă, chestionarele despre anxietate și dispoziție pot fi mai potrivite.",
    },
    scale: YES_NO_SCALE,
    items: [
      "Ai avut coșmaruri legate de eveniment sau te-ai gândit la el fără să vrei",
      "Ai încercat din răsputeri să nu te gândești la el sau ai evitat situațiile care ți-l amintesc",
      "Ai fost mereu în alertă, ușor de speriat sau greu de liniștit",
      "Te-ai simțit amorțit(ă) sau detașat(ă) de oameni, de activități sau de ce se întâmpla în jur",
      "Te-ai simțit vinovat(ă) sau nu ai putut opri învinovățirea ta sau a altora pentru ce s-a întâmplat",
    ],
    max: 5,
    bands: [
      {
        id: "negativ",
        min: 0,
        max: 2,
        label: "Screening negativ",
        tone: "calm",
        meaning:
          "Răspunsurile tale nu ating pragul obișnuit de screening pentru stres posttraumatic. Asta nu anulează ce simți — înseamnă doar că acest instrument scurt nu ridică un semnal.",
      },
      {
        id: "pozitiv",
        min: 3,
        max: 5,
        label: "Screening pozitiv",
        tone: "watch",
        meaning:
          "Trei sau mai multe răspunsuri „da” sunt pragul la care se recomandă o evaluare mai amănunțită pentru stres posttraumatic. Nu este un diagnostic — este o invitație clară să vorbești cu cineva specializat în traumă.",
      },
    ],
    footer:
      "Trauma nu este un semn de slăbiciune și nu se măsoară în gravitatea evenimentului. Este felul în care sistemul nervos a rămas în alertă — și este ceva ce se poate lucra.",
    source: "Prins A et al., National Center for PTSD (2016)",
  },
  {
    id: "who5",
    short: "Bunăstare (WHO-5)",
    title: "WHO-5 — indicele de bunăstare",
    subtitle: "Cinci afirmații despre cum ți-a fost, nu despre ce nu merge.",
    minutes: 1,
    prompt:
      "Alege, pentru fiecare afirmație, varianta cea mai apropiată de cum te-ai simțit în ultimele 2 săptămâni.",
    scale: WELLBEING_SCALE,
    items: [
      "M-am simțit vesel(ă) și cu bună dispoziție",
      "M-am simțit calm(ă) și relaxat(ă)",
      "M-am simțit activ(ă) și plin(ă) de energie",
      "M-am trezit simțindu-mă odihnit(ă) și proaspăt(ă)",
      "Viața mea de zi cu zi a fost plină de lucruri care mă interesează",
    ],
    max: 100,
    transform: (raw) => raw * 4,
    bands: [
      {
        id: "scazut",
        min: 0,
        max: 28,
        label: "Bunăstare scăzută",
        tone: "act",
        meaning:
          "Un scor sub 29 este pragul la care se recomandă o evaluare pentru depresie. Merită să nu îl lași nediscutat.",
      },
      {
        id: "redus",
        min: 29,
        max: 50,
        label: "Bunăstare redusă",
        tone: "watch",
        meaning:
          "Sub 51 este pragul la care ghidurile sugerează o discuție cu un specialist. Ceva îți consumă resursele.",
      },
      {
        id: "buna",
        min: 51,
        max: 100,
        label: "Bunăstare bună",
        tone: "calm",
        meaning:
          "Scorul indică o bunăstare în limite bune pentru ultimele două săptămâni.",
      },
    ],
    footer:
      "WHO-5 măsoară bunăstarea, nu boala. Un scor mic nu spune ce se întâmplă — spune doar că merită întrebat de ce.",
    source: "WHO Collaborating Centre for Mental Health, Frederiksborg (1998)",
  },
];

export function getInstrument(id: string): Instrument | undefined {
  return instruments.find((i) => i.id === id);
}

export function scoreInstrument(instrument: Instrument, answers: number[]): number {
  const raw = answers.reduce((sum, value) => sum + (Number.isFinite(value) ? value : 0), 0);
  return instrument.transform ? instrument.transform(raw) : raw;
}

export function bandFor(instrument: Instrument, score: number): Band {
  return (
    instrument.bands.find((b) => score >= b.min && score <= b.max) ??
    instrument.bands[instrument.bands.length - 1]
  );
}

/** True when an answer requires the crisis interstitial (PHQ-9 item 9). */
export function isFlagged(instrument: Instrument, answers: number[]): boolean {
  if (instrument.riskItem === undefined) return false;
  return (answers[instrument.riskItem] ?? 0) > 0;
}
