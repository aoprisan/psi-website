/**
 * Crisis guidance block, reused wherever self-help content could meet
 * someone in acute distress (screener results, resources pages).
 */
export function CrisisNote({ strong = false }: { strong?: boolean }) {
  return (
    <div
      role="note"
      className={`rounded-2xl p-6 text-[14.5px] leading-relaxed ${
        strong
          ? "border-2 border-[color:var(--color-clay)] bg-[color:var(--color-clay-tint)]/70"
          : "border border-[color:var(--color-clay-tint)] bg-[color:var(--color-clay-tint)]/40"
      }`}
    >
      <p className="font-semibold text-[color:var(--color-clay-deep)]">
        {strong ? "Important: dacă îți este greu chiar acum" : "În caz de urgență"}
      </p>
      <p className="mt-2">
        Dacă ai gânduri de a-ți face rău sau treci printr-o criză, te rog nu
        rămâne singur(ă): sună acum la <strong>112</strong> sau la linia de
        prevenire a suicidului{" "}
        <a href="tel:0800801200" className="text-link whitespace-nowrap">
          0800 801 200
        </a>{" "}
        (gratuit, vineri–duminică, 19:00–7:00), ori mergi la cea mai apropiată
        cameră de gardă. Ajutorul există și lucrurile pot deveni mai ușoare.
      </p>
    </div>
  );
}
