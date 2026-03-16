interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

export default function ServiceCard({ title, description, icon, features, color }: ServiceCardProps) {
  return (
    <div className="bg-white border-2 border-[var(--neutral-200)] rounded-2xl p-8 hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg">
      <div
        className={`w-16 h-16 bg-[var(--${color})]/10 rounded-xl flex items-center justify-center mb-6 text-[var(--${color})]`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-[var(--neutral-700)] leading-relaxed mb-6">{description}</p>
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-[var(--primary)] mt-0.5 mr-2 flex-shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[var(--neutral-700)]">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
