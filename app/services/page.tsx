import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Web Design Services for London Trades & Local Businesses",
  description:
    "Professional website design, local SEO setup, and Google Business optimisation for London tradespeople. Mobile-first sites from £299 that bring you more customers.",
  keywords: [
    "web design services london",
    "trade website design",
    "local SEO london",
    "google business optimisation",
    "mobile website design trades",
    "plumber website design",
    "electrician website design",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Web Design Services for London Trades | UrbanCode Studio",
    description:
      "Website design, local SEO & Google Business optimisation. Mobile-first sites from £299.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Services | UrbanCode Studio",
    description:
      "Website design, local SEO & Google Business optimisation for London trades.",
  },
};

const services = [
  {
    title: "Website Design & Development",
    description:
      "We build fast, mobile-first websites tailored to your trade. Every site is designed to convert visitors into real enquiries — not just look pretty.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=500&fit=crop",
    features: [
      "Custom design — no templates",
      "Mobile-optimised from the ground up",
      "Lightning-fast load times (<2 seconds)",
      "Clear calls-to-action on every page",
      "WhatsApp & click-to-call buttons",
      "Contact forms with spam protection",
      "SSL security certificate included",
      "Fully responsive on all devices",
    ],
  },
  {
    title: "Local SEO Setup",
    description:
      "Get found by customers searching in your area on Google. We structure your site so search engines understand what you do and where you do it.",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop",
    features: [
      "On-page SEO structure & meta tags",
      "Local keyword research & targeting",
      "Search-friendly URL structure",
      "Schema markup for local businesses",
      "Image optimisation for speed & SEO",
      "XML sitemap & robots.txt setup",
      "Google Search Console integration",
      "Competitor keyword analysis",
    ],
  },
  {
    title: "Google Business Profile Optimisation",
    description:
      "Show up on Google Maps when customers search nearby. We set up and optimise your profile so you stand out in local pack results.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
    features: [
      "Google Business Profile setup",
      "Category & service optimisation",
      "Photo uploads & gallery setup",
      "Review generation strategy",
      "Q&A section optimisation",
      "Posts & updates scheduling",
      "Maps pin & radius targeting",
      "Monthly performance reporting",
    ],
  },
];

const process_steps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We learn about your business, your customers, and what you need from your website. This is free and takes about 15 minutes.",
  },
  {
    step: "02",
    title: "Design & Build",
    description:
      "We design and build your site, sharing progress along the way. You get to review and request changes before anything goes live.",
  },
  {
    step: "03",
    title: "Review & Launch",
    description:
      "Once you're happy, we launch your site, set up analytics, and make sure everything is working perfectly.",
  },
  {
    step: "04",
    title: "Support & Growth",
    description:
      "We don't disappear after launch. We provide ongoing support and can help you grow with additional services as you need them.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "ProfessionalService",
    name: "UrbanCode Studio",
    url: "https://urbancodestudios.com",
  },
  areaServed: {
    "@type": "City",
    name: "London",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Design & Development",
          description:
            "Custom, mobile-first website design for trades and local businesses.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Local SEO Setup",
          description:
            "On-page SEO, local keyword targeting, and schema markup for local businesses.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Google Business Optimisation",
          description:
            "Google Business Profile setup, optimisation, and review strategy.",
        },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <PageLayout>
      <JsonLd data={serviceSchema} />
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-b from-lightGrey to-white">
          <div className="section-container text-center">
            <h1 className="text-4xl sm:text-5xl heading mb-6">
              Everything Your Business Needs Online
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From design to SEO to Google Maps — we handle the full package so
              you can focus on running your business.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Get Your Free Audit
            </Link>
          </div>
        </section>

        {/* Services Detail */}
        {services.map((service, index) => (
          <section
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-lightGrey"}
          >
            <div className="section-container">
              <div
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  </div>
                </div>
                <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
                  <h2 className="text-3xl sm:text-4xl heading mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {service.description}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Process */}
        <section className="bg-white">
          <div className="section-container">
            <h2 className="text-3xl sm:text-4xl heading text-center mb-4">
              How It Works
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              A simple, transparent process from first call to launch.
            </p>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {process_steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary to-accent text-white">
          <div className="section-container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a free audit and we&apos;ll show you exactly how we can help
              your business grow online.
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block"
            >
              Book Free Audit
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
