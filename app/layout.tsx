import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UrbanCode Studio | Web Design for London Trades & Local Businesses",
  description: "Professional websites built for London trades and growing businesses. Fast, mobile-first design that brings you more local clients. Get your free audit today.",
  keywords: ["web design london", "website design for trades", "local business websites", "plumber websites", "electrician websites", "builder websites"],
  authors: [{ name: "UrbanCode Studio" }],
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
    description: "Websites that bring you more local clients. Built for London trades and growing businesses.",
    type: "website",
    locale: "en_GB",
    siteName: "UrbanCode Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "UrbanCode Studio | Web Design for London Trades",
    description: "Websites that bring you more local clients. Built for London trades and growing businesses.",
  },
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
      <body>{children}</body>
    </html>
  );
}
