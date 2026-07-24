import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { withPh } from "@/components/ui/Ph";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site } from "@/lib/site";

const sections = [
  {
    title: "1. Cine suntem",
    body: "[Denumirea completă a cabinetului — ex. Cabinet Individual de Psihologie Liliana Oprișan], cu sediul în [adresa completă], e-mail [adresa de e-mail], este operatorul datelor cu caracter personal colectate prin acest site.",
  },
  {
    title: "2. Ce date colectăm",
    body: "Prin formularul de contact colectăm: nume, adresă de e-mail, număr de telefon (opțional) și conținutul mesajului. Site-ul [folosește / nu folosește] cookie-uri de analiză — [de completat în funcție de configurarea finală].",
  },
  {
    title: "3. De ce colectăm aceste date",
    body: "Datele sunt folosite exclusiv pentru a răspunde solicitărilor tale și pentru programarea ședințelor. Nu folosim datele în scop de marketing și nu le transmitem terților, cu excepția situațiilor prevăzute de lege.",
  },
  {
    title: "4. Temeiul legal",
    body: "Prelucrarea se întemeiază pe consimțământul tău (art. 6 alin. 1 lit. a GDPR) și, după începerea colaborării, pe executarea contractului de servicii psihologice (art. 6 alin. 1 lit. b GDPR). Datele privind sănătatea sunt prelucrate în condițiile art. 9 alin. 2 GDPR.",
  },
  {
    title: "5. Cât timp păstrăm datele",
    body: "Mesajele de contact sunt păstrate [perioada — de completat]. Dosarele clienților sunt păstrate conform obligațiilor legale și profesionale aplicabile psihologilor — [detalii de completat].",
  },
  {
    title: "6. Drepturile tale",
    body: "Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție, precum și dreptul de a-ți retrage oricând consimțământul. Pentru exercitarea acestor drepturi, scrie la [adresa de e-mail]. Ai, de asemenea, dreptul de a depune o plângere la ANSPDCP (www.dataprotection.ro).",
  },
  {
    title: "7. Securitatea datelor",
    body: "[Măsurile de securitate aplicate — ex. comunicare criptată, arhivare securizată a dosarelor, acces restricționat — de completat.]",
  },
  {
    title: "8. „Spațiul tău” — jurnalul și chestionarele de pe site",
    body: "Secțiunea „Spațiul tău” (jurnal, chestionare de screening, exerciții de reglare) funcționează integral în browserul tău. Notările, răspunsurile la chestionare și rezultatele lor sunt salvate exclusiv în memoria locală a dispozitivului tău și nu sunt transmise către niciun server — nici al meu, nici al unui terț. Nu există cont, nu există sincronizare și nu am acces tehnic la aceste date. Dacă alegi un cod de acces, conținutul este criptat local cu AES-256-GCM, cu o cheie derivată din codul tău prin PBKDF2-SHA256 (310.000 de iterații); codul nu este stocat nicăieri și nu poate fi recuperat. Ștergerea datelor din browser sau folosirea butonului „Șterge tot” din setările secțiunii elimină definitiv aceste informații. Întrucât datele nu părăsesc dispozitivul tău, nu acționez ca operator în raport cu ele.",
  },
];

export function Privacy() {
  useDocumentTitle(`Politica de confidențialitate · ${site.name}`);

  return (
    <>
      <PageHero
        eyebrow="Informații legale"
        title="Politica de confidențialitate"
        lead="Confidențialitatea este esența profesiei mele. Această pagină explică, pe scurt și în limbaj clar, cum sunt protejate datele tale personale."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          <Reveal>
            <p className="text-[14.5px] italic text-[color:var(--color-muted)]">
              {withPh("Ultima actualizare: [data]. Acest text este un model orientativ și trebuie revizuit de un specialist înainte de publicare.")}
            </p>
          </Reveal>
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 3) * 50}>
              <h2 className="text-[1.35rem]">{s.title}</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed">{withPh(s.body)}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
