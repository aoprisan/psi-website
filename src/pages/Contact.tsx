import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { withPh } from "@/components/ui/Ph";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { site } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "message" | "gdpr", string>>;

export function Contact() {
  useDocumentTitle(`Contact & programări · ${site.name}`);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Te rog să îți scrii numele.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "Te rog să scrii o adresă de e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Adresa de e-mail nu pare validă.";
    if (!String(data.get("message") ?? "").trim())
      next.message = "Scrie, te rog, câteva cuvinte despre ce te aduce.";
    if (!data.get("gdpr"))
      next.gdpr = "Pentru a trimite mesajul, este necesar acordul de prelucrare a datelor.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // Form submission endpoint not configured yet — placeholder success state.
      setSent(true);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact & programări"
        title={
          <>
            Primul pas poate fi <em>un simplu mesaj</em>
          </>
        }
        lead={withPh(
          "Scrie-mi prin formular, prin e-mail sau sună-mă. Îți răspund personal, de regulă în [24–48 de ore], în deplină confidențialitate.",
        )}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ---------- Form ---------- */}
          <Reveal>
            {sent ? (
              <div className="card p-10 text-center" role="status">
                <span
                  aria-hidden
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-surface-deep)] text-[color:var(--color-pine)] text-2xl"
                >
                  ✓
                </span>
                <h2 className="mt-5 text-[1.6rem]">Mulțumesc pentru mesaj!</h2>
                <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed">
                  {withPh("Îți voi răspunde în cel mai scurt timp, de regulă în [24–48 de ore]. Verifică, te rog, și folderul Spam.")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="card p-7 md:p-9">
                <h2 className="text-[1.5rem]">Trimite un mesaj</h2>
                <p className="mt-2 text-[14.5px] text-[color:var(--color-muted)]">
                  Câmpurile marcate cu * sunt obligatorii.
                </p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div className="field">
                    <label htmlFor="name">Nume și prenume *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={errors.name ? "error" : ""}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-err" : undefined}
                    />
                    {errors.name && (
                      <p className="error-msg" id="name-err">{errors.name}</p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="email">E-mail *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={errors.email ? "error" : ""}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-err" : undefined}
                    />
                    {errors.email && (
                      <p className="error-msg" id="email-err">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="field mt-5">
                  <label htmlFor="phone">Telefon (opțional)</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className="field mt-5">
                  <label htmlFor="message">Mesajul tău *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Poți scrie pe scurt ce te aduce sau doar că dorești o programare."
                    className={errors.message ? "error" : ""}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-err" : undefined}
                  />
                  {errors.message && (
                    <p className="error-msg" id="message-err">{errors.message}</p>
                  )}
                </div>
                <div className="mt-6">
                  <label className="flex items-start gap-3 text-[14px] leading-relaxed">
                    <input
                      type="checkbox"
                      name="gdpr"
                      className="mt-1 h-4 w-4 accent-[color:var(--color-pine)]"
                      aria-invalid={!!errors.gdpr}
                      aria-describedby={errors.gdpr ? "gdpr-err" : undefined}
                    />
                    <span>
                      Sunt de acord cu prelucrarea datelor mele personale în
                      scopul de a fi contactat(ă), conform{" "}
                      <Link to="/confidentialitate" className="text-link">
                        politicii de confidențialitate
                      </Link>
                      . *
                    </span>
                  </label>
                  {errors.gdpr && (
                    <p className="error-msg" id="gdpr-err">{errors.gdpr}</p>
                  )}
                </div>
                <button type="submit" className="btn-primary mt-7 w-full sm:w-auto">
                  Trimite mesajul
                </button>
                <p className="mt-4 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                  Notă: formularul nu este încă conectat la un serviciu de
                  e-mail — {withPh("[configurare Formspree / backend — de completat]")}.
                </p>
              </form>
            )}
          </Reveal>

          {/* ---------- Details ---------- */}
          <Reveal delay={120} className="space-y-6">
            <div className="card p-7">
              <h2 className="text-[1.3rem]">Date de contact</h2>
              <ul className="mt-4 space-y-3 text-[15.5px]">
                <li>
                  <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
                    E-mail
                  </span>
                  {withPh(site.email)}
                </li>
                <li>
                  <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
                    Telefon
                  </span>
                  {withPh(site.phone)}
                </li>
                <li>
                  <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
                    Program
                  </span>
                  {withPh(site.schedule)}
                </li>
              </ul>
            </div>

            <div className="card p-7">
              <h2 className="text-[1.3rem]">Cabinetul</h2>
              <address className="mt-3 not-italic text-[15.5px] leading-relaxed">
                {withPh(site.address)}
              </address>
              <div className="mt-5 flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
                <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
                  Hartă — de adăugat
                </span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--color-muted)]">
                {withPh("[Indicații de acces: parcare, transport public, interfon etc. — de completat.]")}
              </p>
            </div>

            <div className="rounded-2xl border border-[color:var(--color-clay-tint)] bg-[color:var(--color-clay-tint)]/40 p-6 text-[14.5px] leading-relaxed">
              <p className="font-semibold text-[color:var(--color-clay-deep)]">
                În caz de urgență
              </p>
              <p className="mt-2">
                Acest formular nu este monitorizat permanent. Dacă treci
                printr-o criză, sună la <strong>112</strong> sau la linia
                antisuicid <strong>0800 801 200</strong>.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
