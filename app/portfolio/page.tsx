import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Work - Website Design Case Studies & Results",
  description:
    "See real website transformations for London electricians, plumbers, builders and more. Before & after showcases with measurable results — up to 180% more calls.",
  keywords: [
    "web design portfolio london",
    "trade website examples",
    "london business website case studies",
    "website before and after",
    "plumber website design examples",
    "electrician website portfolio",
  ],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Our Work - Website Transformations | UrbanCode Studio",
    description:
      "Real results for London trades. See before & after website transformations with measurable outcomes.",
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | UrbanCode Studio",
    description:
      "Real website transformations for London trades with measurable results.",
  },
};

const projects = [
  {
    title: "JT Electrical Services",
    category: "Electrician",
    location: "East London",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
    result: "+180% more calls",
    description:
      "A complete website overhaul for a family-run electrical business. The new site features click-to-call, emergency service booking, and service area pages targeting East London postcodes.",
    metrics: [
      { label: "More calls", value: "+180%" },
      { label: "Load time", value: "1.4s" },
      { label: "Mobile score", value: "98/100" },
    ],
  },
  {
    title: "Sparkle Clean London",
    category: "Cleaning Services",
    location: "South London",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop",
    result: "+50% bookings",
    description:
      "Sparkle Clean needed a site that showcased their services with transparent pricing and made it easy to book online. We delivered a clean, modern site with integrated booking.",
    metrics: [
      { label: "More bookings", value: "+50%" },
      { label: "Load time", value: "1.2s" },
      { label: "Mobile score", value: "96/100" },
    ],
  },
  {
    title: "Roberts & Sons Building",
    category: "Construction",
    location: "Hackney",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    result: "2 major contracts",
    description:
      "A construction firm that needed a portfolio-focused site to showcase large commercial projects. The image gallery and case study format helped win two contracts worth over £50k.",
    metrics: [
      { label: "Contracts won", value: "2" },
      { label: "Load time", value: "1.6s" },
      { label: "Mobile score", value: "95/100" },
    ],
  },
  {
    title: "Patel Plumbing & Heating",
    category: "Plumbing",
    location: "Islington",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop",
    result: "Top 5 on Google",
    description:
      "From invisible on Google to top 5 results for local plumbing searches. We combined a fast, SEO-structured website with Google Business Profile optimisation.",
    metrics: [
      { label: "Google rank", value: "Top 5" },
      { label: "Weekly calls", value: "10+" },
      { label: "Mobile score", value: "97/100" },
    ],
  },
  {
    title: "Sullivan Landscaping",
    category: "Landscaping",
    location: "Richmond",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    result: "4x more quotes",
    description:
      "A landscaping business that relied on word-of-mouth. Their new site with a before/after gallery and local SEO now generates the majority of their new leads.",
    metrics: [
      { label: "More quotes", value: "4x" },
      { label: "Load time", value: "1.3s" },
      { label: "Mobile score", value: "99/100" },
    ],
  },
  {
    title: "London Lock & Key",
    category: "Locksmith",
    location: "Camden",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
    result: "+200% web leads",
    description:
      "An emergency locksmith needed a site that worked fast and converted immediately. We built a one-page speed machine with prominent emergency call buttons and area coverage maps.",
    metrics: [
      { label: "Web leads", value: "+200%" },
      { label: "Load time", value: "0.9s" },
      { label: "Mobile score", value: "100/100" },
    ],
  },
];

export default function PortfolioPage() {
  return (
    <PageLayout>
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-b from-lightGrey to-white">
          <div className="section-container text-center">
            <h1 className="text-4xl sm:text-5xl heading mb-6">Our Work</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results for real London businesses. Every project is built to
              convert visitors into customers.
            </p>
          </div>
        </section>

        {/* Project Grid */}
        <section className="bg-white">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="card overflow-hidden group"
                >
                  <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} website project`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {project.result}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-xs text-gray-500">
                      {project.location}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-3">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl font-bold text-accent">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
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
              Want Results Like These?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Your business could be our next success story.
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
