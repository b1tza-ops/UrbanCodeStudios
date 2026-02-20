import { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us - Free Website Audit | UrbanCode Studio",
  description:
    "Get a free website audit for your London trade or local business. We reply within 24 hours. No obligation, no hard sell — just honest advice.",
  keywords: [
    "contact web designer london",
    "free website audit",
    "web design consultation london",
    "get a quote website design",
    "london trade website enquiry",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us - Free Website Audit | UrbanCode Studio",
    description:
      "Get a free website audit for your London business. We reply within 24 hours.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact UrbanCode Studio",
    description:
      "Free website audit for London trades. We reply within 24 hours.",
  },
};

const contactSchemaData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact UrbanCode Studio",
  description:
    "Get a free website audit for your London trade or local business.",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "UrbanCode Studio",
    email: "hello@urbancodestudio.com",
    areaServed: {
      "@type": "City",
      name: "London",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactSchemaData} />
      <ContactContent />
    </>
  );
}
