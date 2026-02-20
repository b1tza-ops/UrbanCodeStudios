import { Metadata } from "next";
import ReviewsContent from "@/components/ReviewsContent";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | UrbanCode Studio",
  description:
    "Read what London trades and business owners say about UrbanCode Studio. 4.9/5 average rating from 50+ happy clients. Real results, real businesses.",
  keywords: [
    "urbancode studio reviews",
    "web design reviews london",
    "trade website testimonials",
    "london web designer reviews",
    "small business website reviews",
  ],
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Client Reviews & Testimonials | UrbanCode Studio",
    description:
      "4.9/5 average rating from 50+ London businesses. See real results from trades who chose UrbanCode Studio.",
    url: "/reviews",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews | UrbanCode Studio",
    description:
      "4.9/5 average rating. Read what London trades say about our web design services.",
  },
};

const reviewSchemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "UrbanCode Studio",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "James Thompson" },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "UrbanCode Studio completely transformed our online presence. Within the first week of launching, we received more phone calls than we had in the previous month.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sarah Mitchell" },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "They understood exactly what a cleaning business needs — clear pricing, trust signals, and easy booking. Now my site actually works for me.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "David Roberts" },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Best value website we've ever had. The portfolio section alone has won us two large contracts.",
    },
  ],
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={reviewSchemaData} />
      <ReviewsContent />
    </>
  );
}
