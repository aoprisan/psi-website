import { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Services | Psychology Practice',
  description: 'Professional psychological services including individual therapy, relationship counseling, and specialized treatment approaches.',
};

export default function Services() {
  const services: Array<{ title: string; icon: React.ReactNode; description: string; features: string[]; color: 'primary' | 'secondary' | 'accent' }> = [
    {
      title: 'Individual Therapy',
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      description: 'One-on-one therapy sessions tailored to your unique needs and goals. We work together in a safe, confidential environment to address your specific challenges.',
      features: ['Personalized treatment plans', 'Evidence-based therapeutic approaches', 'Flexible scheduling options', 'Confidential and safe environment'],
      color: 'primary',
    },
    {
      title: 'Anxiety & Depression Treatment',
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Specialized support for managing anxiety disorders and depression using proven therapeutic techniques including CBT and mindfulness-based approaches.',
      features: ['Cognitive Behavioral Therapy (CBT)', 'Mindfulness and relaxation techniques', 'Coping strategies for daily life', 'Long-term symptom management'],
      color: 'secondary',
    },
    {
      title: 'Relationship Counseling',
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      description: 'Support for couples and individuals navigating relationship challenges, improving communication, and building stronger, healthier connections.',
      features: ['Communication skill development', 'Conflict resolution strategies', 'Individual and couples sessions', 'Pre-marital counseling available'],
      color: 'accent',
    },
    {
      title: 'Stress Management',
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      description: "Learn practical techniques to manage daily stress, prevent burnout, and maintain a healthy work-life balance in today's demanding world.",
      features: ['Stress reduction techniques', 'Work-life balance strategies', 'Burnout prevention', 'Self-care planning'],
      color: 'primary',
    },
    {
      title: 'Trauma & PTSD Therapy',
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: 'Compassionate, evidence-based treatment for trauma survivors using specialized therapeutic approaches designed to promote healing and recovery.',
      features: ['Trauma-informed care', 'EMDR therapy available', 'Safe processing of traumatic memories', 'Building resilience and coping skills'],
      color: 'secondary',
    },
    {
      title: 'Life Transitions & Personal Growth',
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: 'Support during major life changes, career transitions, or when seeking personal development and self-improvement.',
      features: ['Career and life transition support', 'Goal setting and achievement', 'Identity exploration', 'Building confidence and self-esteem'],
      color: 'accent',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Comprehensive psychological services tailored to support your mental health and well-being"
      />

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-[var(--neutral-50)]">
        <div className="container mx-auto px-6">
          <SectionHeading>How Therapy Works</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: 1, title: 'Initial Contact', desc: 'Reach out via phone, email, or the contact form to schedule your first appointment' },
              { step: 2, title: 'First Session', desc: "We meet to discuss your concerns, goals, and determine if we're a good fit" },
              { step: 3, title: 'Treatment Plan', desc: 'Together we create a personalized treatment plan tailored to your needs' },
              { step: 4, title: 'Ongoing Support', desc: 'Regular sessions to work towards your goals with continuous support and adjustment' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-[var(--primary)] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-[var(--neutral-700)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance & Fees */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeading className="mb-8">Fees & Insurance</SectionHeading>
            <div className="bg-[var(--neutral-50)] p-8 rounded-2xl">
              <div className="space-y-4 text-[var(--neutral-700)] leading-relaxed">
                <p>
                  <strong className="text-[var(--neutral-800)]">Session Fees:</strong> Individual
                  therapy sessions are [X] minutes and cost $[amount]. Initial consultations may vary
                  in length.
                </p>
                <p>
                  <strong className="text-[var(--neutral-800)]">Insurance:</strong> I accept most
                  major insurance plans. Please contact me to verify your specific coverage. I can
                  provide superbills for out-of-network reimbursement.
                </p>
                <p>
                  <strong className="text-[var(--neutral-800)]">Payment Options:</strong> I accept
                  cash, check, and major credit cards. Payment is due at the time of service.
                </p>
                <p>
                  <strong className="text-[var(--neutral-800)]">Sliding Scale:</strong> Limited
                  sliding scale spots available for those experiencing financial hardship. Please
                  inquire during your initial consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--primary)] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Take the first step towards better mental health. Contact me today to schedule your
              initial consultation.
            </p>
            <Button href="/contact" variant="secondary" size="large">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
