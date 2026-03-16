export type ServiceColor = 'primary' | 'secondary' | 'accent';

const colorClasses: Record<ServiceColor, { bg: string; text: string }> = {
  primary: { bg: 'bg-[var(--primary)]/10', text: 'text-[var(--primary)]' },
  secondary: { bg: 'bg-[var(--secondary)]/10', text: 'text-[var(--secondary)]' },
  accent: { bg: 'bg-[var(--accent)]/10', text: 'text-[var(--accent)]' },
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: ServiceColor;
}

export default function ServiceCard({ title, description, icon, features, color }: ServiceCardProps) {
  const { bg, text } = colorClasses[color];

  return (
    <div className="bg-white border-2 border-[var(--neutral-200)] rounded-2xl p-8 hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg">
      <div className={`w-16 h-16 ${bg} rounded-xl flex items-center justify-center mb-6 ${text}`}>
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
