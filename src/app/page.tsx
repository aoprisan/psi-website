import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Your Journey to Mental Wellness Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Professional psychological support in a safe, confidential, and compassionate environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--neutral-50)] transition-colors duration-200 text-center"
              >
                Book a Consultation
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Welcome to Your Safe Space
            </h2>
            <p className="text-lg text-[var(--neutral-700)] leading-relaxed mb-4">
              Taking the first step towards mental wellness requires courage. I'm here to provide
              you with professional, compassionate support as you navigate life's challenges and
              work towards personal growth.
            </p>
            <p className="text-lg text-[var(--neutral-700)] leading-relaxed">
              Whether you're dealing with anxiety, depression, relationship issues, or simply
              seeking personal development, I offer a confidential and non-judgmental space for
              your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-[var(--neutral-50)]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How I Can Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-[var(--primary)]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Individual Therapy</h3>
              <p className="text-[var(--neutral-700)] leading-relaxed">
                One-on-one sessions tailored to your unique needs, providing personalized support
                for anxiety, depression, trauma, and personal growth.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-[var(--secondary)]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Relationship Counseling</h3>
              <p className="text-[var(--neutral-700)] leading-relaxed">
                Support for couples and individuals working through relationship challenges,
                communication issues, and building stronger connections.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-[var(--accent)]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Stress & Anxiety Management</h3>
              <p className="text-[var(--neutral-700)] leading-relaxed">
                Evidence-based techniques to help you manage stress, reduce anxiety, and develop
                healthy coping strategies for daily challenges.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors duration-200"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose This Practice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[var(--primary)]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Confidential</h3>
              <p className="text-[var(--neutral-700)]">
                Your privacy and trust are paramount in our therapeutic relationship
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[var(--secondary)]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Evidence-Based</h3>
              <p className="text-[var(--neutral-700)]">
                Using proven therapeutic approaches backed by research
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[var(--accent)]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Compassionate</h3>
              <p className="text-[var(--neutral-700)]">
                A warm, non-judgmental approach to support your journey
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[var(--primary)]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible</h3>
              <p className="text-[var(--neutral-700)]">
                Convenient scheduling to fit your lifestyle and needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--primary)] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Take the First Step?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Reach out today to schedule your initial consultation. Together, we'll work towards
              your mental wellness and personal growth goals.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--neutral-50)] transition-colors duration-200"
            >
              Contact Me Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
