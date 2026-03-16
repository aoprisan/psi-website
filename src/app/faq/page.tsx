'use client';

import { useState, useCallback } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import FAQItem from '@/components/ui/FAQItem';
import Button from '@/components/ui/Button';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: 'Getting Started',
    question: 'How do I schedule my first appointment?',
    answer:
      'You can schedule your first appointment by calling our office, sending an email, or using the contact form on our website. We\'ll typically respond within 24-48 hours to arrange a convenient time for your initial consultation.',
  },
  {
    category: 'Getting Started',
    question: 'What should I expect in the first session?',
    answer:
      'The first session is an opportunity for us to get to know each other. We\'ll discuss what brings you to therapy, your goals, and any concerns you have. I\'ll explain my therapeutic approach and answer any questions. This session helps us determine if we\'re a good fit and create an initial treatment plan.',
  },
  {
    category: 'Getting Started',
    question: 'How long are therapy sessions?',
    answer:
      'Standard therapy sessions are 50 minutes. Your initial consultation may be slightly longer (60-90 minutes) to allow time for a comprehensive assessment and questions.',
  },
  {
    category: 'Logistics',
    question: 'Do you offer online/teletherapy sessions?',
    answer:
      'Yes, I offer secure online therapy sessions via HIPAA-compliant video conferencing platforms. This option provides flexibility and convenience while maintaining the same quality of care as in-person sessions.',
  },
  {
    category: 'Logistics',
    question: 'What is your cancellation policy?',
    answer:
      'I require 24-hour notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a fee. I understand that emergencies happen, so please contact me as soon as possible if you need to cancel.',
  },
  {
    category: 'Logistics',
    question: 'How often should I attend therapy?',
    answer:
      'Most clients start with weekly sessions. As progress is made, we may reduce frequency to bi-weekly or monthly maintenance sessions. The frequency depends on your specific needs, goals, and the severity of your concerns.',
  },
  {
    category: 'Insurance & Fees',
    question: 'Do you accept insurance?',
    answer:
      'I accept most major insurance plans. Please contact me with your insurance information, and I can verify your coverage. For out-of-network plans, I can provide superbills for you to submit for reimbursement.',
  },
  {
    category: 'Insurance & Fees',
    question: 'What if I don\'t have insurance?',
    answer:
      'I offer self-pay options and have limited sliding scale spots available for those experiencing financial hardship. Please discuss your situation during the initial consultation, and we can work together to find a solution.',
  },
  {
    category: 'Insurance & Fees',
    question: 'What forms of payment do you accept?',
    answer:
      'I accept cash, checks, and all major credit cards. Payment is due at the time of service unless other arrangements have been made in advance.',
  },
  {
    category: 'About Therapy',
    question: 'Is therapy confidential?',
    answer:
      'Yes, therapy is completely confidential with few exceptions required by law (such as if there\'s imminent danger to yourself or others, or suspected child/elder abuse). Your privacy is protected by HIPAA laws, and I take confidentiality very seriously.',
  },
  {
    category: 'About Therapy',
    question: 'How long does therapy take?',
    answer:
      'The length of therapy varies greatly depending on individual needs and goals. Some people benefit from short-term therapy (8-12 sessions) for specific issues, while others prefer longer-term therapy for deeper work. We\'ll regularly review your progress and adjust the treatment plan as needed.',
  },
  {
    category: 'About Therapy',
    question: 'What therapeutic approaches do you use?',
    answer:
      'I use an integrative approach, drawing from evidence-based practices including Cognitive Behavioral Therapy (CBT), Mindfulness-Based Therapy, and Person-Centered Therapy. Treatment is tailored to your specific needs and goals.',
  },
  {
    category: 'About Therapy',
    question: 'Will I need to take medication?',
    answer:
      'As a psychologist, I cannot prescribe medication. However, if medication might be beneficial, I can provide a referral to a psychiatrist. Many people benefit from therapy alone, while others find a combination of therapy and medication most helpful.',
  },
  {
    category: 'About Therapy',
    question: 'What if I don\'t feel like therapy is helping?',
    answer:
      'It\'s important to discuss this in session. Sometimes therapy feels difficult before it feels better, as we work through challenging issues. However, if you\'re not experiencing progress, we can adjust our approach or I can provide referrals to other professionals who might be a better fit.',
  },
];

const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

// Pre-compute FAQ items grouped by category with stable indices
const faqsByCategory = categories.map((category) => ({
  category,
  items: faqs
    .map((faq, index) => ({ ...faq, index }))
    .filter((faq) => faq.category === category),
}));

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about therapy and my practice"
      />

      {/* FAQ Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {faqsByCategory.map(({ category, items }) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-[var(--primary)]">{category}</h2>
                <div className="space-y-4">
                  {items.map((faq) => (
                    <FAQItem
                      key={faq.index}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIndex === faq.index}
                      onToggle={() => toggleFAQ(faq.index)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-padding bg-[var(--neutral-50)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-[var(--neutral-700)] mb-6">
              If you don&apos;t see your question answered here, please don&apos;t hesitate to reach out.
              I&apos;m happy to answer any questions you may have about therapy or my practice.
            </p>
            <Button href="/contact" size="large">Contact Me</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
