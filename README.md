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
