/**
 * Nervous-system regulation exercises.
 *
 * The organising idea is the window of tolerance: too much activation
 * (hyperarousal) and too little (hypoarousal) need opposite interventions,
 * so the triage below routes to a different practice for each state rather
 * than offering one generic "breathe deeply".
 */

export type BreathPhaseKind = "inhale" | "hold" | "exhale" | "rest";

export type BreathPhase = {
  kind: BreathPhaseKind;
  seconds: number;
  label: string;
};

export type BreathPattern = {
  id: string;
  name: string;
  purpose: string;
  /** Why it works, in one honest sentence. */
  rationale: string;
  /** Which end of the window this pattern serves. */
  serves: "down" | "up" | "balance";
  phases: BreathPhase[];
  /** Suggested duration in seconds. */
  suggestedSeconds: number;
};

export const breathPatterns: BreathPattern[] = [
  {
    id: "expir-prelungit",
    name: "Expir prelungit",
    purpose: "Când ești în alertă, agitat(ă) sau la limita panicii",
    rationale:
      "Expirul mai lung decât inspirul activează ramura parasimpatică a nervului vag — pulsul încetinește fără să fie nevoie să te calmezi „prin voință”.",
    serves: "down",
    phases: [
      { kind: "inhale", seconds: 4, label: "Inspiră pe nas" },
      { kind: "exhale", seconds: 6, label: "Expiră lung, pe gură" },
    ],
    suggestedSeconds: 180,
  },
  {
    id: "coerenta",
    name: "Coerență cardiacă",
    purpose: "Pentru echilibru general, oricând în timpul zilei",
    rationale:
      "Un ritm de aproximativ 5,5 secunde pe fiecare fază aduce respirația la frecvența la care variabilitatea ritmului cardiac este cea mai stabilă.",
    serves: "balance",
    phases: [
      { kind: "inhale", seconds: 5.5, label: "Inspiră" },
      { kind: "exhale", seconds: 5.5, label: "Expiră" },
    ],
    suggestedSeconds: 300,
  },
  {
    id: "patrat",
    name: "Respirație în pătrat",
    purpose: "Când mintea aleargă și ai nevoie de o structură clară",
    rationale:
      "Cele patru faze egale dau atenției un obiect simplu de urmărit; e folosită inclusiv în antrenamentul de rezistență la stres.",
    serves: "balance",
    phases: [
      { kind: "inhale", seconds: 4, label: "Inspiră" },
      { kind: "hold", seconds: 4, label: "Ține" },
      { kind: "exhale", seconds: 4, label: "Expiră" },
      { kind: "rest", seconds: 4, label: "Pauză" },
    ],
    suggestedSeconds: 240,
  },
  {
    id: "sigh",
    name: "Suspin fiziologic",
    purpose: "Când ai nevoie de o scădere rapidă a tensiunii, în sub un minut",
    rationale:
      "Două inspiruri scurte urmate de un expir lung redeschid alveolele colabate și elimină rapid dioxidul de carbon — cel mai rapid mod natural de a scădea activarea.",
    serves: "down",
    phases: [
      { kind: "inhale", seconds: 2, label: "Inspiră pe nas" },
      { kind: "inhale", seconds: 1, label: "Încă un pic de aer" },
      { kind: "exhale", seconds: 6, label: "Expiră complet, pe gură" },
      { kind: "rest", seconds: 1, label: "Pauză" },
    ],
    suggestedSeconds: 90,
  },
  {
    id: "activare",
    name: "Respirație de activare",
    purpose: "Când ești amorțit(ă), gol(oală) pe dinăuntru sau „deconectat(ă)”",
    rationale:
      "Inspirul mai lung decât expirul crește ușor activarea simpatică — util când sistemul nervos a intrat în închidere, nu în alarmă.",
    serves: "up",
    phases: [
      { kind: "inhale", seconds: 6, label: "Inspiră amplu" },
      { kind: "exhale", seconds: 3, label: "Expiră scurt" },
    ],
    suggestedSeconds: 120,
  },
];

export function getBreathPattern(id: string): BreathPattern | undefined {
  return breathPatterns.find((p) => p.id === id);
}

export function patternCycleSeconds(pattern: BreathPattern): number {
  return pattern.phases.reduce((sum, phase) => sum + phase.seconds, 0);
}

/* ---------- Grounding: 5-4-3-2-1 ---------- */

export type GroundingStep = {
  count: number;
  sense: string;
  instruction: string;
  placeholder: string;
};

export const groundingSteps: GroundingStep[] = [
  {
    count: 5,
    sense: "lucruri pe care le vezi",
    instruction:
      "Privește în jur, fără grabă. Numește cinci lucruri pe care le vezi chiar acum — obiecte obișnuite, nimic special.",
    placeholder: "ex. lampa, marginea mesei, o carte…",
  },
  {
    count: 4,
    sense: "lucruri pe care le simți",
    instruction:
      "Patru senzații de atingere: hainele pe piele, greutatea corpului pe scaun, temperatura aerului, podeaua sub tălpi.",
    placeholder: "ex. tălpile pe podea, mâneca pe braț…",
  },
  {
    count: 3,
    sense: "sunete pe care le auzi",
    instruction:
      "Trei sunete, oricât de mici. Ascultă și cele îndepărtate, nu doar pe cele evidente.",
    placeholder: "ex. traficul, frigiderul, respirația mea…",
  },
  {
    count: 2,
    sense: "mirosuri pe care le simți",
    instruction:
      "Două mirosuri. Dacă nu simți niciunul, e în regulă — numește două mirosuri care îți plac.",
    placeholder: "ex. cafea, aer curat…",
  },
  {
    count: 1,
    sense: "lucru pe care îl guști sau îl apreciezi",
    instruction:
      "Un gust din gură — sau, dacă nu e niciunul, un singur lucru pentru care ești recunoscător(oare) astăzi.",
    placeholder: "ex. ceai, un mesaj primit azi…",
  },
];

/* ---------- Window of tolerance triage ---------- */

export type ArousalState = "hyper" | "window" | "hypo";

export type TriageQuestion = {
  id: string;
  question: string;
  options: { label: string; state: ArousalState }[];
};

export const triageQuestions: TriageQuestion[] = [
  {
    id: "corp",
    question: "Cum e corpul tău acum?",
    options: [
      { label: "Accelerat — inimă rapidă, tensiune, nu pot sta locului", state: "hyper" },
      { label: "Prezent — îl simt, e mai mult sau mai puțin în regulă", state: "window" },
      { label: "Greu sau amorțit — parcă nu e al meu, e departe", state: "hypo" },
    ],
  },
  {
    id: "minte",
    question: "Cum e mintea ta?",
    options: [
      { label: "Aleargă — gânduri multe, scenarii, nu se oprește", state: "hyper" },
      { label: "Limpede — pot să urmăresc un gând până la capăt", state: "window" },
      { label: "Ceață — goală, încetinită, greu de pornit", state: "hypo" },
    ],
  },
  {
    id: "impuls",
    question: "Ce ai vrea să faci în clipa asta?",
    options: [
      { label: "Să fug, să lupt, să fac ceva imediat", state: "hyper" },
      { label: "Nimic urgent — pot să rămân aici", state: "window" },
      { label: "Să dispar, să mă închid, să dorm", state: "hypo" },
    ],
  },
];

export type TriageOutcome = {
  state: ArousalState;
  title: string;
  reading: string;
  advice: string;
  /** Recommended practice route inside the private space. */
  action: { label: string; to: string };
};

export const triageOutcomes: Record<ArousalState, TriageOutcome> = {
  hyper: {
    state: "hyper",
    title: "Pare că ești deasupra ferestrei de toleranță",
    reading:
      "Sistemul tău nervos este în activare: pregătit de luptă sau de fugă. Nu este o defecțiune — este un sistem de alarmă care face exact ce a învățat să facă, doar că într-un moment în care nu e nevoie.",
    advice:
      "Ce ajută acum este să scadă activarea: expir mai lung decât inspirul, apoi ancorare în ce e concret în jur. Nu încerca să te „gândești la altceva” — corpul are nevoie de semnalul, nu mintea de argumentul.",
    action: { label: "Începe cu expirul prelungit", to: "/spatiul-tau/respiratie?pattern=expir-prelungit" },
  },
  window: {
    state: "window",
    title: "Ești în fereastra ta de toleranță",
    reading:
      "Aici poți simți fără să fii copleșit(ă) și poți gândi fără să te blochezi. Este starea în care lucrul terapeutic — și viața de zi cu zi — chiar se poate întâmpla.",
    advice:
      "Momentele astea sunt bune pentru consolidare: o respirație de echilibru te ajută să recunoști starea în corp, ca s-o poți regăsi mai ușor altă dată. Este și un moment potrivit pentru o notare în jurnal.",
    action: { label: "Respirație de echilibru", to: "/spatiul-tau/respiratie?pattern=coerenta" },
  },
  hypo: {
    state: "hypo",
    title: "Pare că ești sub fereastra de toleranță",
    reading:
      "Sistemul nervos a intrat în închidere: amorțire, ceață, distanță față de propriul corp. Este tot o formă de protecție — apare atunci când lupta și fuga nu au fost variante.",
    advice:
      "Aici respirația lentă poate adânci închiderea. Ce ajută este o creștere blândă a activării: inspir mai lung, mișcare mică, orientare cu privirea prin cameră, contact cu ceva rece sau texturat.",
    action: { label: "Respirație de activare", to: "/spatiul-tau/respiratie?pattern=activare" },
  },
};

/** Picks the dominant state; ties resolve toward the state needing action. */
export function resolveTriage(answers: ArousalState[]): ArousalState {
  const tally: Record<ArousalState, number> = { hyper: 0, window: 0, hypo: 0 };
  for (const answer of answers) tally[answer] += 1;
  const max = Math.max(tally.hyper, tally.window, tally.hypo);
  // Order matters: an activated or shut-down state outranks "in the window"
  // when the count is equal, because missing those is the costlier error.
  if (tally.hyper === max) return "hyper";
  if (tally.hypo === max) return "hypo";
  return "window";
}
