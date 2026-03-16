import Link from 'next/link';
import { PRACTICE_NAME, CONTACT_INFO } from '@/lib/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--neutral-800)] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">{PRACTICE_NAME}</h3>
            <p className="text-[var(--neutral-300)] leading-relaxed">
              Professional psychological services dedicated to supporting your mental health
              and personal growth in a safe, confidential environment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-[var(--neutral-300)] hover:text-[var(--primary-light)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[var(--neutral-300)] hover:text-[var(--primary-light)] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[var(--neutral-300)] hover:text-[var(--primary-light)] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[var(--neutral-300)] hover:text-[var(--primary-light)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-[var(--neutral-300)]">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[var(--primary-light)] transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${CONTACT_INFO.phoneTel}`} className="hover:text-[var(--primary-light)] transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{CONTACT_INFO.address.street}, {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[var(--neutral-700)]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[var(--neutral-400)] text-sm">
              &copy; {currentYear} {PRACTICE_NAME}. All rights reserved.
            </p>
            <p className="text-[var(--neutral-400)] text-sm mt-2 md:mt-0">
              Professional & Confidential Services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
