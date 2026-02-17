import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "UrbanCode Studio | Web Design for London Trades & Local Businesses",
  description: "Professional websites built for London trades and growing businesses. Fast, mobile-first design that brings you more local clients. Get your free audit today.",
  keywords: ["web design london", "website design for trades", "local business websites", "plumber websites", "electrician websites", "builder websites"],
  authors: [{ name: "UrbanCode Studio" }],
  openGraph: {
    title: "UrbanCode Studio | Web Design for London Trades",
    description: "Websites that bring you more local clients. Built for London trades and growing businesses.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "UrbanCode Studio | Web Design for London Trades",
    description: "Websites that bring you more local clients. Built for London trades and growing businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "UrbanCode Studio",
  "description": "Professional web design services for London trades and local businesses",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressCountry": "GB"
  },
  "priceRange": "£299-£799",
  "areaServed": {
    "@type": "City",
    "name": "London"
  },
  "serviceType": ["Web Design", "Local SEO", "Google Business Optimization"],
  "offers": [
    {
      "@type": "Offer",
      "name": "Basic Website Package",
      "price": "299",
      "priceCurrency": "GBP"
    },
    {
      "@type": "Offer",
      "name": "Standard Website Package",
      "price": "499",
      "priceCurrency": "GBP"
    },
    {
      "@type": "Offer",
      "name": "Pro Website Package",
      "price": "799",
      "priceCurrency": "GBP"
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
