import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UrbanCode Studio | Web Design for London Trades & Local Businesses",
  description: "Professional websites built for London trades and growing businesses. Fast, mobile-first design that brings you more local clients. Get your free audit today.",
  keywords: ["web design london", "website design for trades", "local business websites", "plumber websites", "electrician websites", "builder websites"],
  authors: [{ name: "UrbanCode Studio" }],
  openGraph: {
    title: "UrbanCode Studio | Web Design for London Trades",
    description: "Websites that bring you more local clients. Built for London trades and growing businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
