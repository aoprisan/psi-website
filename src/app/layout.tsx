import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Psychology Practice | Professional Therapy & Counseling",
  description: "Professional psychological services offering individual therapy, counseling, and support for mental health and personal growth in a safe, confidential environment.",
  keywords: ["psychology", "therapy", "counseling", "mental health", "psychologist", "psychotherapy"],
  openGraph: {
    title: "Psychology Practice | Professional Therapy & Counseling",
    description: "Professional psychological services offering individual therapy, counseling, and support for mental health and personal growth.",
    type: "website",
    locale: "en_US",
    siteName: "Psychology Practice",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.psychologypractice.com",
    name: "Psychology Practice",
    description: "Professional psychological services offering individual therapy, counseling, and support for mental health and personal growth.",
    url: "https://www.psychologypractice.com",
    telephone: "+1234567890",
    email: "contact@psychologypractice.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main Street, Suite 100",
      addressLocality: "Your City",
      addressRegion: "State",
      postalCode: "12345",
    },
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
