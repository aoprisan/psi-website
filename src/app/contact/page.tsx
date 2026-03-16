'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import { CONTACT_INFO } from '@/lib/config';
import { validateForm, type FormErrors } from '@/lib/validation';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader title="Contact Me" subtitle="Take the first step - I'm here to help" />

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-[var(--neutral-700)] leading-relaxed mb-8">
                Taking the first step towards therapy can feel overwhelming. I&apos;m here to make the
                process as comfortable as possible. Feel free to reach out with any questions or
                to schedule your initial consultation.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[var(--primary)]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a href={`tel:${CONTACT_INFO.phoneTel}`} className="text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors">
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="text-sm text-[var(--neutral-600)] mt-1">{CONTACT_INFO.hours}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">Office Location</h3>
                    <p className="text-[var(--neutral-700)]">
                      {CONTACT_INFO.address.street}<br />
                      {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="mt-8 p-6 bg-[var(--neutral-50)] rounded-xl border-l-4 border-[var(--accent)]">
                <h4 className="font-semibold text-[var(--neutral-800)] mb-2">Crisis Support</h4>
                <p className="text-sm text-[var(--neutral-700)]">
                  If you are experiencing a mental health emergency, please call 911 or the National
                  Suicide Prevention Lifeline at 988 for immediate assistance.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--neutral-50)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--neutral-800)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-[var(--neutral-300)]'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--neutral-800)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-[var(--neutral-300)]'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">{errors.email}</p>}
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
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-[var(--neutral-300)]'
                    }`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && <p id="phone-error" className="text-red-600 text-sm mt-1" role="alert">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--neutral-800)] mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.subject ? 'border-red-500' : 'border-[var(--neutral-300)]'
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="initial-consultation">Initial Consultation</option>
                    <option value="individual-therapy">Individual Therapy</option>
                    <option value="relationship-counseling">Relationship Counseling</option>
                    <option value="insurance-question">Insurance Question</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p id="subject-error" className="text-red-600 text-sm mt-1" role="alert">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--neutral-800)] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none ${
                      errors.message ? 'border-red-500' : 'border-[var(--neutral-300)]'
                    }`}
                    placeholder="Tell me a bit about what brings you here..."
                  />
                  {errors.message && <p id="message-error" className="text-red-600 text-sm mt-1" role="alert">{errors.message}</p>}
                </div>

                <Button type="submit" disabled={isSubmitting} size="large" className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                <div aria-live="polite">
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg" role="status">
                      Thank you for your message! I&apos;ll get back to you within 24-48 hours.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg" role="alert">
                      There was an error sending your message. Please try again or contact me directly.
                    </div>
                  )}
                </div>

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
            <Button href="/faq">View FAQ</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
