import { Link } from "react-router-dom";

/**
 * Shown the moment a risk item is answered above zero — not at the end of
 * the questionnaire. Someone who has just said they think about not being
 * here should not have to answer four more questions before anyone
 * acknowledges it.
 *
 * The numbers are the Romanian ones and are deliberately tap-to-call.
 */
export function SafetyNotice({
  onContinue,
  onStop,
}: {
  onContinue?: () => void;
  onStop?: () => void;
}) {
  return (
    <div className="safety card p-7 md:p-9" role="alert">
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-clay-deep)]">
        Oprește-te o clipă
      </p>
      <h2 className="mt-3 text-[1.5rem]">
        Ai spus că îți trec prin minte gânduri de a nu mai fi sau de a-ți face rău.
      </h2>
      <p className="mt-4 text-[15.5px] leading-relaxed">
        Nu trec peste asta ca peste o bifă. Gândurile astea sunt mai frecvente
        decât se vorbește despre ele și, aproape întotdeauna, sunt semnul unei
        dureri care a devenit prea mare de dus singur — nu al unei hotărâri.
        Se poate lucra cu ele, și oamenii ies din locul ăsta.
      </p>
      <p className="mt-4 text-[15.5px] leading-relaxed">
        <strong>Dacă simți că ai putea trece la fapte astăzi, te rog sună acum:</strong>
      </p>

      <ul className="mt-5 space-y-3">
        <li className="safety__line">
          <a href="tel:112" className="safety__number">112</a>
          <span>Urgențe — disponibil non-stop, oriunde în România.</span>
        </li>
        <li className="safety__line">
          <a href="tel:0800801200" className="safety__number">0800 801 200</a>
          <span>
            Telefonul antisuicid — gratuit, vineri–duminică, 19:00–07:00.
          </span>
        </li>
        <li className="safety__line">
          <a href="tel:116123" className="safety__number">116 123</a>
          <span>Linia de sprijin emoțional — gratuit, non-stop.</span>
        </li>
      </ul>

      <p className="mt-6 text-[15px] leading-relaxed">
        Dacă nu ești în pericol imediat, dar gândurile revin: spune-i cuiva
        astăzi. O persoană apropiată, medicul de familie, un psiholog.{" "}
        <Link to="/contact" className="text-link">
          Îmi poți scrie și mie
        </Link>
        , iar dacă nu sunt eu persoana potrivită, te ajut să găsești pe cineva
        care este.
      </p>

      {(onContinue || onStop) && (
        <div className="mt-8 flex flex-wrap gap-3 border-t border-[color:var(--color-line-soft)] pt-6">
          {onContinue && (
            <button type="button" className="btn-primary" onClick={onContinue}>
              Am citit, continuă chestionarul
            </button>
          )}
          {onStop && (
            <button type="button" className="btn-secondary" onClick={onStop}>
              Oprește chestionarul
            </button>
          )}
        </div>
      )}
    </div>
  );
}
