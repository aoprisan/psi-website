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
| `/spatiul-tau` | **Spațiul tău** — instrumente private între ședințe (vezi mai jos) |
| `/intrebari-frecvente` | Întrebări frecvente |
| `/contact` | Formular de contact, date cabinet |
| `/confidentialitate` | Politica de confidențialitate (GDPR) |

## Spațiul tău — instrumente private între ședințe

Secțiunea `/spatiul-tau` transformă site-ul dintr-o broșură într-un
instrument folosit efectiv între ședințe. Rulează integral în browser:
**nu există backend, nu există cont, nu pleacă niciun octet spre vreun
server.** Nu e o promisiune de politică de confidențialitate — e o
proprietate a arhitecturii.

| Rută | Ce face |
| --- | --- |
| `/spatiul-tau` | Hub + tablou de bord (tendințe, ultimele chestionare) |
| `/spatiul-tau/verifica` | Triaj „fereastra de toleranță”: hiper- / hipo-activare → exercițiul potrivit |
| `/spatiul-tau/respiratie` | Pacer de respirație cu 5 ritmuri, ghidaj vizual + sonor + haptic |
| `/spatiul-tau/ancorare` | Ancorare senzorială 5-4-3-2-1 |
| `/spatiul-tau/chestionare` | GAD-7, PHQ-9, PC-PTSD-5, WHO-5 — scorate local |
| `/spatiul-tau/jurnal` | Notare zilnică, tendințe, corelații |
| `/spatiul-tau/pregatire` | Rezumat tipăribil pentru ședință |
| `/spatiul-tau/setari` | Cod de acces, blocare automată, export, ștergere |

### Cum sunt protejate datele

`src/lib/space/vault.ts` implementează două moduri, ambele locale:

- **`passcode`** — payload-ul e criptat AES-256-GCM, cu cheia derivată din
  codul utilizatorului prin PBKDF2-SHA256, 310.000 de iterații. În
  `localStorage` rămân doar `salt`, `iv` și `ct`. Nu există recuperare:
  autentificarea GCM *este* verificarea codului.
- **`open`** — JSON simplu. Interfața spune explicit că nu protejează nimic,
  ca să nu creeze o falsă senzație de siguranță.

Blocare automată după inactivitate, blocare la revenirea în tab și un buton
de **ieșire rapidă** (sau `Esc` de trei ori) care blochează seiful și
înlocuiește intrarea din istoric cu o pagină neutră.

### Decizii clinice codificate

- Exercițiile de reglare **nu** cer un cod sau un cont — cineva în mijlocul
  unui atac de panică nu trebuie să completeze un formular de configurare.
  Doar salvarea are nevoie de seif.
- PHQ-9 itemul 9 (ideație suicidară) declanșează interstițialul de siguranță
  **în momentul răspunsului**, nu la finalul chestionarului
  (`src/components/space/SafetyNotice.tsx`).
- Triajul separă hiperactivarea de hipoactivare pentru că respirația lentă
  calmează un sistem activat, dar poate adânci o închidere — o recomandare
  generică ar fi contraproductivă.
- Scorurile SUD (0–10) înainte/după fiecare exercițiu alimentează
  `practiceEffects()`, care arată ce funcționează *pentru persoana aceea*.
- Corelațiile din jurnal sunt prezentate explicit ca observații, nu cauze.

Instrumentele sunt libere de licență: GAD-7 și PHQ-9 (Pfizer, reproducere
liberă), PC-PTSD-5 (US National Center for PTSD, domeniu public), WHO-5
(OMS, uz non-comercial cu atribuire).

## Offline

Build-ul web generează un service worker (`vite.config.ts` →
`offlinePlugin`) care preîncarcă tot bundle-ul, inclusiv fonturile. Site-ul
— și mai ales exercițiile de respirație — funcționează cu rețeaua oprită.
`public/manifest.webmanifest` îl face instalabil, cu scurtături directe
către respirație, triaj și jurnal.

Service worker-ul e sărit în build-ul mobil (Capacitor livrează deja
asset-urile nativ) și în dev.

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
- [ ] Verificat cu un psiholog textele din „Spațiul tău” (praguri, formulări)
- [ ] Confirmat numerele liniilor de criză din `SafetyNotice.tsx`

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
