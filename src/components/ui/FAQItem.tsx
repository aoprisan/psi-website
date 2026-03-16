'use client';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="bg-white border-2 border-[var(--neutral-200)] rounded-xl overflow-hidden hover:border-[var(--primary)]/30 transition-colors">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-6 flex items-center justify-between hover:bg-[var(--neutral-50)] transition-colors"
      >
        <span className="text-lg font-semibold text-[var(--neutral-800)] pr-4">
          {question}
        </span>
        <svg
          className={`w-6 h-6 text-[var(--primary)] flex-shrink-0 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-[var(--neutral-700)] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
