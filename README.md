# Liliana Oprișan — site de prezentare

Site profesional pentru un cabinet de psihologie clinică și psihoterapie
specializat în terapia traumei. Construit cu Vite + React + Tailwind CSS,
cu build-uri mobile prin Capacitor.

## Pagini

| Rută | Pagină |
| --- | --- |
| `/` | Acasă — hero, arii de lucru, servicii, proces, FAQ |
| `/despre` | Despre mine — bio, valori, formare & acreditări |
| `/servicii` | Servicii & tarife |
| `/cum-lucrez` | Abordare, metode, prima ședință, etică |
| `/resurse` | Resurse interactive — hub |
| `/resurse/chestionare` | Chestionare de autoevaluare (GAD-7, PHQ-9, PC-PTSD-5), scorate local |
| `/resurse/respiratie` | Respirație ghidată (coerentă, 4 timpi, 4-7-8) |
| `/resurse/ancorare` | Exercițiul de grounding 5-4-3-2-1 |
| `/resurse/jurnal` | Jurnal de stare privat (doar localStorage, export & ștergere) |
| `/intrebari-frecvente` | Întrebări frecvente |
| `/contact` | Formular de contact, date cabinet |
| `/confidentialitate` | Politica de confidențialitate (GDPR) |

## Conținut și placeholders

Tot textul care așteaptă informații reale este scris `[între paranteze
drepte]` și apare evidențiat vizual pe site. Datele centrale (nume, oraș,
telefon, e-mail, tarife, formări) se completează în **`src/lib/site.ts`** —
restul paginilor se actualizează automat.

De făcut înainte de lansare:

- [ ] Completat datele din `src/lib/site.ts` (contact, tarife, atestat CPR)
- [ ] Înlocuit placeholder-ele de portret cu fotografii reale
- [ ] Completat bio-ul și formările pe pagina „Despre mine”
- [ ] Conectat formularul de contact la un serviciu de e-mail (ex. Formspree)
- [ ] Adăugat harta pe pagina de contact
- [ ] Revizuit politica de confidențialitate cu un specialist
- [ ] Setat domeniul real în `src/lib/site.ts` și `vite.config.ts` (base)

## Resurse interactive (confidențialitate prin design)

Secțiunea `/resurse` oferă instrumente care rulează integral în browser,
fără backend — nimic nu este transmis sau colectat:

- **Chestionare validate** — GAD-7, PHQ-9 și PC-PTSD-5 (instrumente în
  domeniul public), scorate pe dispozitiv, cu interpretare, disclaimer
  („screening, nu diagnostic”) și ghidaj de criză când e cazul. Rezultatul
  poate pre-completa formularul de contact (via `sessionStorage`, șters
  imediat după citire).
- **Respirație ghidată** — pacer vizual pentru respirația coerentă, în
  patru timpi și 4-7-8; respectă `prefers-reduced-motion`.
- **Ancorare 5-4-3-2-1** — exercițiu de grounding pas cu pas, doar în
  memorie.
- **Jurnal de stare** — salvat exclusiv în `localStorage`, cu grafic pe
  30 de zile, export ca fișier text și ștergere completă.

Toate funcționează offline în aplicația mobilă (Capacitor).

## Dezvoltare

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build web (bază /psi-website/ pentru GitHub Pages)
npm run typecheck
```

Fonturile (Fraunces, Figtree) sunt self-hosted prin Fontsource — nu se fac
cereri către Google Fonts (GDPR) și funcționează offline în aplicația mobilă.

## Mobile (Capacitor)

```bash
npm run cap:sync
npm run build:android
npm run build:ios
```
