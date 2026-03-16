interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-[var(--primary)] text-white py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="text-xl mt-4 text-white/90 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
