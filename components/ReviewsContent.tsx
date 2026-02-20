"use client";

import PageLayout from "@/components/PageLayout";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Image from "next/image";
import Link from "next/link";

const allReviews = [
  {
    name: "James Thompson",
    business: "JT Electrical Services",
    location: "East London",
    quote:
      "UrbanCode Studio completely transformed our online presence. Within the first week of launching, we received more phone calls than we had in the previous month. The site is fast, looks incredible on mobile, and our customers always comment on how professional it is.",
    result: "3x more enquiries in the first month",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    business: "Sparkle Clean London",
    location: "South London",
    quote:
      "I was hesitant about investing in a new website, but UrbanCode made it so easy. They understood exactly what a cleaning business needs — clear pricing, trust signals, and easy booking. Now my site actually works for me instead of just sitting there.",
    result: "50% increase in online bookings",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "David Roberts",
    business: "Roberts & Sons Building",
    location: "Hackney",
    quote:
      "Best value website we've ever had. Previous agencies charged us thousands and delivered something cookie-cutter. UrbanCode gave us a site that genuinely represents our quality of work. The portfolio section alone has won us two large contracts.",
    result: "2 major contracts won through the website",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Priya Patel",
    business: "Patel Plumbing & Heating",
    location: "Islington",
    quote:
      "We went from being invisible on Google to appearing in the top 5 search results for plumbers in our area. The Google Business optimization they did was a game-changer. Now we get at least 10 new calls a week directly from the website.",
    result: "Top 5 Google ranking in 3 months",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Mark Sullivan",
    business: "Sullivan Landscaping",
    location: "Richmond",
    quote:
      "The before-and-after portfolio gallery that UrbanCode built for us is exactly what we needed. Potential clients can see the quality of our work immediately. Since launch, our quote requests have gone through the roof.",
    result: "4x more quote requests",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Angela Okafor",
    business: "London Lock & Key",
    location: "Camden",
    quote:
      "As an emergency locksmith, I need my website to work fast and convert immediately. UrbanCode delivered exactly that — a blazing fast site with prominent call buttons. My web leads have tripled since launch.",
    result: "200% increase in web leads",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Tom Hargreaves",
    business: "Hargreaves Roofing",
    location: "Lewisham",
    quote:
      "We used to rely entirely on word-of-mouth. Now our website brings in consistent leads every week. The investment paid for itself within the first two weeks of going live.",
    result: "ROI in under 2 weeks",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Lisa Chen",
    business: "Chen Interiors",
    location: "Kensington",
    quote:
      "The design is stunning — exactly the premium look we wanted for our interior design business. Clients regularly tell us our website convinced them to get in touch. Worth every penny.",
    result: "Premium clients attracted online",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
];

export default function ReviewsContent() {
  return (
    <PageLayout>
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-b from-lightGrey to-white">
          <div className="section-container text-center">
            <h1 className="text-4xl sm:text-5xl heading mb-6">Client Reviews</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what London
              business owners say about working with us.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-7 h-7 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold text-primary">
                4.9/5 average rating
              </span>
            </div>
          </div>
        </section>

        {/* Featured Carousel */}
        <section className="bg-white">
          <div className="section-container">
            <h2 className="text-2xl heading text-center mb-8">
              Featured Reviews
            </h2>
            <TestimonialCarousel />
          </div>
        </section>

        {/* All Reviews Grid */}
        <section className="bg-lightGrey">
          <div className="section-container">
            <h2 className="text-3xl heading text-center mb-12">
              All Reviews
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {allReviews.map((review, index) => (
                <div key={index} className="card">
                  <div className="flex items-center mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-accent/20">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-primary text-lg">
                        {review.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.business}, {review.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-semibold">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    {review.result}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary to-accent text-white">
          <div className="section-container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Join Our Happy Clients
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Your business could be our next success story.
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
