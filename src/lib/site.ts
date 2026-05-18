export const site = {
  practitionerName: "Dr. [First Last]",
  credentials: "Ph.D., Licensed Clinical Psychologist",
  credentialsShort: "Clinical Psychologist",
  tagline: "Trauma-informed psychotherapy",
  established: "Est. 20XX",
  city: "City, ST",
  email: "hello@example.com",
  phone: "(555) 123-4567",
  address: {
    street: "123 Example Avenue, Suite 4",
    city: "City",
    state: "ST",
    zip: "00000",
  },
  url: "https://example.com",
  description:
    "A trauma-informed psychotherapy practice for adults. EMDR, CPT, and somatic approaches, at the pace of a steady nervous system.",
} as const;

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/approach", label: "Approach" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;
