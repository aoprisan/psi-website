import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Psychology Practice',
  description: 'Privacy policy and confidentiality information for our psychology practice.',
};

export default function Privacy() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
          <p className="text-xl mt-4 text-white/90">
            Your privacy and confidentiality are my top priorities
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-lg text-[var(--neutral-700)] leading-relaxed mb-8">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">Introduction</h2>
              <p className="text-[var(--neutral-700)] leading-relaxed mb-4">
                This Privacy Policy describes how I collect, use, and protect your personal
                information as part of providing psychological services. Your privacy is of utmost
                importance, and I am committed to maintaining the confidentiality of your
                information in accordance with applicable laws and professional ethics.
              </p>
            </div>

            {/* HIPAA Compliance */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">
                HIPAA Compliance
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed mb-4">
                I comply with the Health Insurance Portability and Accountability Act (HIPAA) and
                all applicable state and federal privacy laws. Your Protected Health Information
                (PHI) is kept strictly confidential and is only shared as permitted by law or with
                your written authorization.
              </p>
              <p className="text-[var(--neutral-700)] leading-relaxed">
                Upon beginning therapy, you will receive a Notice of Privacy Practices that
                provides detailed information about how your health information may be used and
                disclosed.
              </p>
            </div>

            {/* Information Collected */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">
                Information I Collect
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed mb-4">
                In order to provide effective psychological services, I collect and maintain:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--neutral-700)] mb-4">
                <li>
                  <strong>Personal Information:</strong> Name, contact information, date of birth,
                  emergency contacts
                </li>
                <li>
                  <strong>Health Information:</strong> Mental health history, current symptoms,
                  treatment goals, and progress notes
                </li>
                <li>
                  <strong>Insurance Information:</strong> Insurance provider details and billing
                  information (if applicable)
                </li>
                <li>
                  <strong>Session Information:</strong> Appointment dates, attendance records, and
                  session notes
                </li>
              </ul>
            </div>

            {/* How Information is Used */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">
                How I Use Your Information
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed mb-4">
                Your information is used solely for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--neutral-700)] mb-4">
                <li>Providing psychological treatment and services</li>
                <li>Maintaining accurate clinical records</li>
                <li>Processing payments and insurance claims</li>
                <li>Complying with legal and ethical obligations</li>
                <li>
                  Coordinating care with other healthcare providers (only with your written consent)
                </li>
              </ul>
            </div>

            {/* Confidentiality */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">
                Confidentiality and Exceptions
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed mb-4">
                Everything discussed in therapy is confidential. However, there are specific
                situations where I am legally or ethically required to break confidentiality:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--neutral-700)] mb-4">
                <li>
                  <strong>Imminent Danger:</strong> If you present a serious danger of harm to
                  yourself or others
                </li>
                <li>
                  <strong>Child or Elder Abuse:</strong> If I have reasonable suspicion of child,
                  elder, or dependent adult abuse or neglect
                </li>
                <li>
                  <strong>Court Orders:</strong> If legally compelled by a valid court order or
                  subpoena
                </li>
                <li>
                  <strong>Insurance Purposes:</strong> Limited information necessary for insurance
                  billing and claims processing
                </li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">
                Data Security
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed mb-4">
                I take extensive measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--neutral-700)] mb-4">
                <li>All electronic records are encrypted and stored on secure, HIPAA-compliant servers</li>
                <li>Physical records are kept in locked filing cabinets in a secure office</li>
                <li>
                  Teletherapy sessions use HIPAA-compliant video conferencing platforms with
                  end-to-end encryption
                </li>
                <li>
                  Access to your information is limited to authorized personnel only (as required
                  for treatment, billing, or legal compliance)
                </li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">Your Rights</h2>
              <p className="text-[var(--neutral-700)] leading-relaxed mb-4">
                You have the following rights regarding your personal health information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--neutral-700)] mb-4">
                <li>Right to request access to your records</li>
                <li>Right to request amendments to your records</li>
                <li>Right to receive an accounting of disclosures</li>
                <li>Right to request restrictions on certain uses and disclosures</li>
                <li>
                  Right to request confidential communications (e.g., at a specific address or
                  phone number)
                </li>
                <li>Right to file a complaint if you believe your privacy rights have been violated</li>
              </ul>
            </div>

            {/* Record Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">
                Record Retention
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed">
                In accordance with state laws and professional standards, clinical records are
                maintained for a minimum of 7 years after the last date of service (or longer if
                required by law). After this period, records are securely destroyed.
              </p>
            </div>

            {/* Website Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">
                Website Privacy
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed mb-4">
                This website does not use cookies or tracking technologies. Contact form
                submissions are transmitted securely and used only to respond to your inquiry.
              </p>
              <p className="text-[var(--neutral-700)] leading-relaxed">
                Please note that email and contact forms are not completely secure methods of
                communication. For sensitive information, please wait until we establish a secure
                therapeutic relationship.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">
                Changes to This Policy
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed">
                I reserve the right to modify this privacy policy. Any changes will be posted on
                this page with an updated revision date. Significant changes will be communicated
                to active clients.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--neutral-800)]">
                Questions or Concerns
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or how your information is
                handled, please don't hesitate to contact me:
              </p>
              <div className="bg-[var(--neutral-50)] p-6 rounded-xl">
                <p className="text-[var(--neutral-700)]">
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:contact@psychologypractice.com"
                    className="text-[var(--primary)] hover:text-[var(--primary-dark)]"
                  >
                    contact@psychologypractice.com
                  </a>
                  <br />
                  <strong>Phone:</strong>{' '}
                  <a
                    href="tel:+1234567890"
                    className="text-[var(--primary)] hover:text-[var(--primary-dark)]"
                  >
                    +1 (234) 567-890
                  </a>
                </p>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-[var(--primary)]/5 p-6 rounded-xl border-l-4 border-[var(--primary)]">
              <p className="text-[var(--neutral-800)] font-semibold mb-2">
                Important Legal Notice
              </p>
              <p className="text-sm text-[var(--neutral-700)]">
                This privacy policy is provided for informational purposes. Your rights and my
                obligations regarding confidentiality and privacy are more fully described in the
                informed consent documents and Notice of Privacy Practices that you will receive
                when beginning therapy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
