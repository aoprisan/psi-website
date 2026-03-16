import { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'About | Psychology Practice',
  description: 'Learn about my background, qualifications, and therapeutic approach to mental health care.',
};

export default function About() {
  return (
    <div>
      <PageHeader
        title="About Me"
        subtitle="Dedicated to supporting your mental health journey"
      />

      {/* Main Bio Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Placeholder */}
            <div className="order-2 lg:order-1">
              <div className="bg-[var(--neutral-200)] rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-[var(--neutral-400)]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-sm text-[var(--neutral-500)] mt-4 text-center italic">
                Professional photo placeholder - Replace with actual image
              </p>
            </div>

            {/* Bio Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Hello, I&apos;m [Your Name]
              </h2>
              <div className="space-y-4 text-lg text-[var(--neutral-700)] leading-relaxed">
                <p>
                  I&apos;m a licensed psychologist with over [X] years of experience helping individuals
                  navigate life&apos;s challenges and achieve their mental wellness goals. My approach
                  combines evidence-based therapeutic techniques with genuine compassion and understanding.
                </p>
                <p>
                  I believe that everyone deserves a safe, non-judgmental space to explore their
                  thoughts and feelings. Through our work together, I aim to empower you with the
                  tools and insights needed to overcome obstacles and live a more fulfilling life.
                </p>
                <p>
                  My passion for psychology began [personal story about your journey into psychology].
                  This experience shaped my understanding of the profound impact that mental health
                  support can have on people&apos;s lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="section-padding bg-[var(--neutral-50)]">
        <div className="container mx-auto px-6">
          <SectionHeading>Qualifications & Credentials</SectionHeading>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* Education */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[var(--primary)]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Education</h3>
                    <ul className="space-y-2 text-[var(--neutral-700)]">
                      <li>Ph.D. in Clinical Psychology - [University Name]</li>
                      <li>M.A. in Counseling Psychology - [University Name]</li>
                      <li>B.A. in Psychology - [University Name]</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Licenses */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Licenses & Certifications</h3>
                    <ul className="space-y-2 text-[var(--neutral-700)]">
                      <li>Licensed Clinical Psychologist - [State] License #[Number]</li>
                      <li>Board Certified in Clinical Psychology</li>
                      <li>Certified in [Specialized Treatment Approach]</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Memberships */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Professional Memberships</h3>
                    <ul className="space-y-2 text-[var(--neutral-700)]">
                      <li>American Psychological Association (APA)</li>
                      <li>[State] Psychological Association</li>
                      <li>Association for Behavioral and Cognitive Therapies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapeutic Approach */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading className="mb-8">My Therapeutic Approach</SectionHeading>
            <div className="space-y-6 text-lg text-[var(--neutral-700)] leading-relaxed">
              <p>
                I utilize an integrative approach to therapy, drawing from evidence-based practices
                including Cognitive Behavioral Therapy (CBT), Mindfulness-Based Therapy, and
                Person-Centered Therapy. Each client&apos;s treatment is tailored to their unique needs,
                goals, and circumstances.
              </p>
              <p>
                My therapeutic philosophy centers on creating a collaborative relationship where you
                feel heard, validated, and supported. I believe in your inherent capacity for growth
                and healing, and my role is to provide guidance, tools, and a safe space for that
                transformation to occur.
              </p>
              <div className="bg-[var(--primary)]/5 p-6 rounded-xl border-l-4 border-[var(--primary)]">
                <p className="font-semibold text-[var(--neutral-800)] mb-2">Core Principles:</p>
                <ul className="space-y-2">
                  <li><strong>Compassion:</strong> A warm, non-judgmental therapeutic environment</li>
                  <li><strong>Collaboration:</strong> Working together as partners in your healing journey</li>
                  <li><strong>Evidence-Based:</strong> Using scientifically proven therapeutic methods</li>
                  <li><strong>Personalized:</strong> Tailoring treatment to your individual needs and goals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--neutral-50)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s Work Together</h2>
            <p className="text-lg text-[var(--neutral-700)] mb-8">
              If you&apos;re looking for compassionate, professional support on your mental health journey,
              I&apos;m here to help. Reach out today to schedule your initial consultation.
            </p>
            <Button href="/contact" size="large">Get in Touch</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
