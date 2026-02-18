"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  business: string;
  quote: string;
  result: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "James Thompson",
    business: "JT Electrical Services, East London",
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
    quote:
      "I was hesitant about investing in a new website, but UrbanCode made it so easy. They understood exactly what a cleaning business needs — clear pricing, trust signals, and easy booking. Now my site actually works for me instead of just sitting there.",
    result: "50% increase in online bookings",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "David Roberts",
    business: "Roberts & Sons Building, Hackney",
    quote:
      "Best value website we've ever had. Previous agencies charged us thousands and delivered something cookie-cutter. UrbanCode gave us a site that genuinely represents our quality of work. The portfolio section alone has won us two large contracts.",
    result: "2 major contracts won through the website",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Priya Patel",
    business: "Patel Plumbing & Heating, Islington",
    quote:
      "We went from being invisible on Google to appearing in the top 5 search results for plumbers in our area. The Google Business optimization they did was a game-changer. Now we get at least 10 new calls a week directly from the website.",
    result: "Top 5 Google ranking in 3 months",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Mark Sullivan",
    business: "Sullivan Landscaping, Richmond",
    quote:
      "The before-and-after portfolio gallery that UrbanCode built for us is exactly what we needed. Potential clients can see the quality of our work immediately. Since launch, our quote requests have gone through the roof.",
    result: "4x more quote requests",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const handleInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Testimonial Card */}
      <div className="card p-8 md:p-12 relative overflow-hidden">
        {/* Decorative quote marks */}
        <div className="absolute top-4 left-6 text-8xl text-accent/10 font-serif leading-none select-none">
          &ldquo;
        </div>

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex mb-6 justify-center">
            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
              <svg
                key={i}
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed mb-8 italic">
            &ldquo;{testimonials[currentIndex].quote}&rdquo;
          </p>

          {/* Result badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-semibold">
              <svg
                className="w-4 h-4 mr-2"
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
              {testimonials[currentIndex].result}
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center justify-center">
            <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-accent/20">
              <Image
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div>
              <div className="font-semibold text-primary text-lg">
                {testimonials[currentIndex].name}
              </div>
              <div className="text-sm text-gray-500">
                {testimonials[currentIndex].business}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center mt-8 gap-4">
        <button
          onClick={() => {
            handleInteraction();
            goToPrev();
          }}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all text-gray-600 hover:text-accent"
          aria-label="Previous testimonial"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                handleInteraction();
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-accent w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            handleInteraction();
            goToNext();
          }}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all text-gray-600 hover:text-accent"
          aria-label="Next testimonial"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
