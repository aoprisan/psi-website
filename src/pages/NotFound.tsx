import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site } from "@/lib/site";

export function NotFound() {
  useDocumentTitle(`Pagina nu a fost găsită · ${site.name}`);

  return (
    <Section spacing="loose">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Eroare 404</p>
        <h1 className="display mt-4 text-[clamp(2.2rem,1.8rem+2vw,3.4rem)]">
          Pagina pe care o cauți nu există
        </h1>
        <p className="mt-5 text-[16.5px] leading-relaxed">
          Este posibil ca adresa să fi fost scrisă greșit sau ca pagina să fi
          fost mutată. Te invit înapoi pe pagina principală.
        </p>
        <div className="mt-8">
          <Button to="/">Înapoi la pagina principală</Button>
        </div>
      </div>
    </Section>
  );
}
