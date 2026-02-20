import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://urbancodestudios.com"),
  title: {
    default: "UrbanCode Studio | Web Design for London Trades & Local Businesses",
    template: "%s | UrbanCode Studio",
  },
  description: "Professional websites built for London trades and growing businesses. Fast, mobile-first design that brings you more local clients. Get your free audit today.",
  keywords: [
    "web design london",
    "website design for trades",
    "local business websites",
    "plumber websites",
    "electrician websites",
    "builder websites",
    "affordable web design london",
    "trade website design",
    "small business website london",
    "mobile friendly website design",
  ],
  authors: [{ name: "UrbanCode Studio", url: "https://urbancodestudios.com" }],
  creator: "UrbanCode Studio",
  publisher: "UrbanCode Studio",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "UrbanCode Studio | Web Design for London Trades",
    description: "Professional websites from £299. Fast, mobile-first design that brings London trades and local businesses more customers.",
    url: "/",
    type: "website",
    locale: "en_GB",
    siteName: "UrbanCode Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "UrbanCode Studio | Web Design for London Trades",
    description: "Professional websites from £299. Fast, mobile-first design for London trades and local businesses.",
  },
  category: "technology",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "UrbanCode Studio",
  description: "Professional web design agency for London trades and local businesses. Fast, mobile-first websites from £299.",
  url: "https://urbancodestudios.com",
  email: "hello@urbancodestudio.com",
  areaServed: {
    "@type": "City",
    name: "London",
    containedInPlace: {
      "@type": "Country",
      name: "United Kingdom",
    },
  },
  priceRange: "££",
  serviceType: ["Web Design", "Local SEO", "Google Business Optimisation"],
  knowsAbout: ["Web Development", "SEO", "Small Business Marketing", "Website Design"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
    bestRating: "5",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1F2A44" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9T7KK5QX0Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9T7KK5QX0Z');
          `}
        </Script>
        <JsonLd data={localBusinessSchema} />
        {children}
      </body>
    </html>
  );
}
