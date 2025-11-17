'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission - replace with actual API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Me</h1>
          <p className="text-xl mt-4 text-white/90">
            Take the first step - I'm here to help
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-[var(--neutral-700)] leading-relaxed mb-8">
                Taking the first step towards therapy can feel overwhelming. I'm here to make the
                process as comfortable as possible. Feel free to reach out with any questions or
                to schedule your initial consultation.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[var(--primary)]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:contact@psychologypractice.com"
                      className="text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors"
                    >
                      contact@psychologypractice.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[var(--secondary)]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                    <p className="text-sm text-[var(--neutral-600)] mt-1">
                      Mon-Fri: 9am - 6pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[var(--accent)]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Office Location</h3>
                    <p className="text-[var(--neutral-700)]">
                      123 Main Street, Suite 100<br />
                      Your City, State 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="mt-8 p-6 bg-[var(--neutral-50)] rounded-xl border-l-4 border-[var(--accent)]">
                <h4 className="font-semibold text-[var(--neutral-800)] mb-2">
                  Crisis Support
                </h4>
                <p className="text-sm text-[var(--neutral-700)]">
                  If you are experiencing a mental health emergency, please call 911 or the National
                  Suicide Prevention Lifeline at 988 for immediate assistance.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--neutral-50)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--neutral-800)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--neutral-800)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--neutral-800)] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--neutral-800)] mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="initial-consultation">Initial Consultation</option>
                    <option value="individual-therapy">Individual Therapy</option>
                    <option value="relationship-counseling">Relationship Counseling</option>
                    <option value="insurance-question">Insurance Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--neutral-800)] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                    placeholder="Tell me a bit about what brings you here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                    Thank you for your message! I'll get back to you within 24-48 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                    There was an error sending your message. Please try again or contact me directly.
                  </div>
                )}

                <p className="text-sm text-[var(--neutral-600)]">
                  * Required fields. Your information will be kept strictly confidential.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-padding bg-[var(--neutral-50)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-lg text-[var(--neutral-700)] mb-6">
              Check out our frequently asked questions for answers about therapy, insurance,
              scheduling, and more.
            </p>
            <a
              href="/faq"
              className="inline-block bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors duration-200"
            >
              View FAQ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
