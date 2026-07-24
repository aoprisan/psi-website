/**
 * Central site configuration. Text in square brackets — e.g. "[oraș]" —
 * is a placeholder awaiting real information; replace it here and it
 * updates everywhere on the site.
 *
 * NOTE: the name is written with Romanian diacritics ("Oprișan").
 * If the preferred public spelling is "Oprisan", change it here.
 */
export const site = {
  name: "Liliana Oprișan",
  title: "Psiholog clinician · Psihoterapeut",
  titleShort: "Psiholog & psihoterapeut",
  specialization: "Specializată în terapia traumei",
  tagline: "Psihoterapie pentru adulți, în cabinet și online",
  city: "[Oraș]",
  email: "[adresa@email.ro]",
  phone: "[+40 7xx xxx xxx]",
  address: "[Strada, nr., clădire, oraș]",
  schedule: "[Luni – Vineri, 09:00 – 19:00]",
  experienceYears: "[X]",
  cprAttestation: "Atestat de liberă practică nr. [_____], Colegiul Psihologilor din România",
  cprCode: "[Cod personal CPR]",
  url: "https://example.com",
  description:
    "Liliana Oprișan — psiholog clinician și psihoterapeut specializat în terapia traumei. Psihoterapie individuală pentru adulți, în cabinet la [Oraș] și online.",
} as const;

export const nav = [
  { to: "/", label: "Acasă" },
  { to: "/despre", label: "Despre mine" },
  { to: "/servicii", label: "Servicii & tarife" },
  { to: "/cum-lucrez", label: "Cum lucrez" },
  { to: "/intrebari-frecvente", label: "Întrebări frecvente" },
  { to: "/contact", label: "Contact" },
] as const;

/** Difficulties the practice works with — shown on the homepage. */
export const difficulties = [
  {
    title: "Traumă & stres posttraumatic",
    text: "Evenimente copleșitoare recente sau din trecut, care continuă să se facă simțite în prezent.",
  },
  {
    title: "Traumă complexă & traumă de dezvoltare",
    text: "Urmele relațiilor timpurii dificile: neglijare, abuz, atașament nesigur.",
  },
  {
    title: "Anxietate & atacuri de panică",
    text: "Îngrijorare constantă, tensiune, frică ce apare aparent fără motiv.",
  },
  {
    title: "Depresie",
    text: "Tristețe persistentă, lipsă de energie și de sens, retragere din viața de zi cu zi.",
  },
  {
    title: "Doliu & pierdere",
    text: "Despărțiri, pierderea unei persoane dragi, schimbări majore de viață.",
  },
  {
    title: "Stres & epuizare (burnout)",
    text: "Suprasolicitare profesională sau personală, oboseală care nu trece.",
  },
  {
    title: "Stimă de sine & critică interioară",
    text: "Sentimentul de „nu sunt suficient”, rușine, perfecționism.",
  },
  {
    title: "Dificultăți relaționale",
    text: "Tipare care se repetă în relații, limite greu de pus, singurătate.",
  },
] as const;

export const services = [
  {
    slug: "psihoterapie-individuala",
    title: "Psihoterapie individuală pentru adulți",
    short:
      "Un proces terapeutic personalizat, într-un cadru sigur și confidențial, în ritmul tău.",
    details: [
      "Ședințe de 50 de minute, de regulă săptămânale, în cabinet sau online.",
      "Lucrăm împreună asupra dificultăților emoționale, a tiparelor de gândire și de relaționare, cu obiective stabilite de comun acord.",
      "[Detalii suplimentare despre procesul terapeutic — de completat.]",
    ],
  },
  {
    slug: "terapia-traumei",
    title: "Terapia traumei",
    short:
      "Abordare specializată pentru trauma de șoc și trauma complexă, în ritmul unui sistem nervos care se simte în siguranță.",
    details: [
      "Trauma nu este doar o amintire — este felul în care corpul și mintea au rămas în alertă. Lucrul terapeutic respectă ritmul tău și se sprijină pe stabilizare înainte de procesare.",
      "Metode utilizate: [de completat — ex. EMDR, abordări somatice, terapie orientată pe traumă].",
      "[Detalii despre formarea în terapia traumei — de completat.]",
    ],
  },
  {
    slug: "consiliere-psihologica",
    title: "Consiliere psihologică",
    short:
      "Sprijin punctual în perioade dificile: decizii importante, tranziții de viață, situații de criză.",
    details: [
      "Un proces de scurtă durată, centrat pe o dificultate concretă din prezent.",
      "Potrivit atunci când ai nevoie de claritate și de susținere, fără un proces terapeutic de lungă durată.",
    ],
  },
  {
    slug: "evaluare-clinica",
    title: "Evaluare psihologică clinică",
    short:
      "Evaluare realizată de psiholog clinician atestat, cu instrumente validate științific.",
    details: [
      "Include interviu clinic și, după caz, aplicarea unor instrumente psihometrice standardizate.",
      "[Tipuri de evaluări oferite și contexte (ex. aviz, raport de evaluare) — de completat.]",
    ],
  },
  {
    slug: "psihoterapie-online",
    title: "Psihoterapie online",
    short:
      "Aceleași ședințe, prin apel video securizat — de oriunde te afli, inclusiv din diaspora.",
    details: [
      "Tot ce ai nevoie: o conexiune stabilă la internet și un spațiu în care să poți vorbi liber.",
      "Eficiența psihoterapiei online este susținută de cercetări, iar confidențialitatea rămâne aceeași ca în cabinet.",
    ],
  },
] as const;

export const fees = [
  { service: "Ședință de psihoterapie individuală (50 min)", price: "[___] lei" },
  { service: "Ședință de psihoterapie online (50 min)", price: "[___] lei" },
  { service: "Consiliere psihologică (50 min)", price: "[___] lei" },
  { service: "Evaluare psihologică clinică", price: "[___] lei" },
] as const;

export const faq = [
  {
    q: "Cum îmi dau seama dacă am nevoie de psihoterapie?",
    a: "Nu ai nevoie de un diagnostic ca să începi terapia. Dacă simți că anumite stări, amintiri sau tipare îți afectează viața de zi cu zi — somnul, relațiile, munca, liniștea interioară — este suficient. Prima ședință este tocmai spațiul în care explorăm împreună ce ți se întâmplă și dacă terapia te poate ajuta.",
  },
  {
    q: "Ce se întâmplă la prima ședință?",
    a: "Prima întâlnire este o ședință de cunoaștere: vorbim despre ce te aduce la terapie, despre istoricul tău și despre ce ți-ai dori să se schimbe. Îți răspund la întrebări și stabilim împreună cadrul: frecvența, obiectivele și modul de lucru. Nu trebuie să te pregătești în niciun fel.",
  },
  {
    q: "Cât durează o ședință și cât costă?",
    a: "O ședință durează 50 de minute. Tariful este de [___] lei pentru ședințele individuale — găsești toate tarifele pe pagina Servicii & tarife. Plata se poate face [numerar / card / transfer bancar — de completat].",
  },
  {
    q: "Cât durează procesul terapeutic?",
    a: "Depinde de natura dificultăților și de obiectivele tale. Unele procese de consiliere durează câteva ședințe; lucrul cu trauma complexă cere, de regulă, mai mult timp. Evaluăm periodic împreună progresul, iar decizia de a continua îți aparține întotdeauna.",
  },
  {
    q: "Este psihoterapia online la fel de eficientă?",
    a: "Pentru majoritatea situațiilor, da — eficiența terapiei online este susținută de studii. Este important să ai un spațiu privat, în care să poți vorbi liber, și o conexiune stabilă. Pentru anumite situații pot recomanda întâlniri în cabinet.",
  },
  {
    q: "Este confidențial ceea ce discutăm?",
    a: "Da. Tot ce discutăm este protejat de secretul profesional, conform Codului deontologic al Colegiului Psihologilor din România și legislației în vigoare. Excepțiile sunt rare și strict prevăzute de lege (risc iminent pentru viața ta sau a altcuiva) — și le discutăm transparent de la început.",
  },
  {
    q: "Care este diferența dintre psiholog, psihoterapeut și psihiatru?",
    a: "Psihologul clinician realizează evaluare și consiliere psihologică. Psihoterapeutul are o formare suplimentară de lungă durată într-o metodă de psihoterapie. Psihiatrul este medic și poate prescrie medicație. Acestea se completează: atunci când este util, colaborez cu medici psihiatri.",
  },
  {
    q: "Cum mă programez și cum pot anula o ședință?",
    a: "Mă poți contacta prin formularul de pe site, prin e-mail sau telefonic — de regulă răspund în [24–48 de ore]. Dacă nu poți ajunge la o ședință, te rog să anunți cu cel puțin 24 de ore înainte; ședințele anulate în mai puțin de 24 de ore [se achită integral / politica de anulare — de completat].",
  },
] as const;

/** Training & credentials timeline for the About page — placeholders to fill in. */
export const training = [
  {
    period: "[Anii]",
    title: "[Facultatea de Psihologie — Universitatea ___]",
    detail: "Licență în psihologie",
  },
  {
    period: "[Anii]",
    title: "[Master în psihologie clinică — Universitatea ___]",
    detail: "[Denumirea programului de master]",
  },
  {
    period: "[Anii]",
    title: "[Formare de lungă durată în psihoterapie — școala / modalitatea]",
    detail: "[ex. psihoterapie integrativă, cognitiv-comportamentală etc.]",
  },
  {
    period: "[Anii]",
    title: "[Formări în terapia traumei]",
    detail: "[ex. EMDR, Somatic Experiencing, psihotraumatologie — de completat]",
  },
] as const;

export const processSteps = [
  {
    title: "Scrie-mi sau sună-mă",
    text: "Trimite un mesaj prin formularul de contact, prin e-mail sau telefonic. Îmi poți spune pe scurt ce te aduce — sau doar că vrei o programare.",
  },
  {
    title: "Stabilim prima întâlnire",
    text: "Îți răspund de regulă în [24–48 de ore] și găsim împreună un interval potrivit, în cabinet sau online.",
  },
  {
    title: "Începem, în ritmul tău",
    text: "Prima ședință este despre cunoaștere și siguranță. De acolo, construim un proces terapeutic pe măsura nevoilor tale.",
  },
] as const;
