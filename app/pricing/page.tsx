import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Website Pricing for Trades & Local Businesses | From £299",
  description:
    "Transparent web design pricing from £299. Starter, Professional & Business packages for London trades. No hidden fees, no monthly subscriptions — pay once, own forever.",
  keywords: [
    "website pricing london",
    "cheap web design trades",
    "affordable website design london",
    "trade website cost",
    "small business website price",
    "web design packages london",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Website Pricing from £299 | UrbanCode Studio",
    description:
      "Transparent pricing. No hidden fees, no subscriptions. Starter from £299, Professional from £499.",
    url: "/pricing",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Website Pricing from £299 | UrbanCode Studio",
    description:
      "No hidden fees, no subscriptions. Web design packages for London trades.",
  },
};

const plans = [
  {
    name: "Starter",
    price: "£299",
    description: "Perfect for tradespeople who need a simple online presence",
    popular: false,
    features: [
      "1-page website",
      "Mobile-optimised design",
      "Contact form",
      "WhatsApp button",
      "Basic on-page SEO",
      "SSL security certificate",
      "1 round of revisions",
      "5 business day delivery",
    ],
    notIncluded: [
      "Multi-page site",
      "Google Analytics",
      "Google Business setup",
      "Ongoing support",
    ],
  },
  {
    name: "Professional",
    price: "£499",
    description: "Our most popular package — everything you need to grow",
    popular: true,
    features: [
      "Up to 5 pages",
      "Mobile-first responsive design",
      "Contact form with spam protection",
      "WhatsApp & click-to-call",
      "Full on-page SEO setup",
      "Google Analytics integration",
      "Speed optimisation",
      "SSL security certificate",
      "2 rounds of revisions",
      "7 business day delivery",
    ],
    notIncluded: ["Booking integration", "Advanced SEO structure"],
  },
  {
    name: "Business",
    price: "£799",
    description: "For growing businesses that want the full package",
    popular: false,
    features: [
      "Up to 10 pages",
      "Premium custom design",
      "Advanced contact forms",
      "WhatsApp, call & email CTAs",
      "Advanced SEO structure",
      "Google Analytics & Search Console",
      "Google Business Profile setup",
      "Speed & performance optimisation",
      "Lead tracking dashboard",
      "Booking/calendar integration",
      "SSL security certificate",
      "3 rounds of revisions",
      "10 business day delivery",
    ],
    notIncluded: [],
  },
];

const addOns = [
  { name: "Extra page", price: "£50/page" },
  { name: "Logo design", price: "£99" },
  { name: "Monthly maintenance", price: "£29/mo" },
  { name: "Blog setup", price: "£149" },
  { name: "E-commerce (basic)", price: "from £399" },
  { name: "Priority support", price: "£19/mo" },
];

const faqs = [
  {
    q: "Are there any hidden fees?",
    a: "No. The price you see is the price you pay. There are no setup fees, no monthly subscriptions (unless you opt for add-ons), and no surprises.",
  },
  {
    q: "Do I own the website?",
    a: "Yes, 100%. Once built and paid for, the website is yours. We'll hand over all files and access credentials.",
  },
  {
    q: "What's not included?",
    a: "Hosting and domain registration are separate (typically £5-15/month total). We'll help you set these up and recommend the best options.",
  },
  {
    q: "Can I upgrade later?",
    a: "Absolutely. You can start with a Starter package and upgrade anytime. We'll credit your original payment towards the upgrade.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Minor text/image changes are free for the first 30 days. After that, our monthly maintenance add-on covers unlimited small changes.",
  },
];

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Website Design Services",
  brand: {
    "@type": "Brand",
    name: "UrbanCode Studio",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Starter Package",
      price: "299",
      priceCurrency: "GBP",
      description: "1-page mobile-optimised website for tradespeople",
      url: "https://urbancodestudios.com/pricing",
    },
    {
      "@type": "Offer",
      name: "Professional Package",
      price: "499",
      priceCurrency: "GBP",
      description: "Up to 5-page website with SEO and Google Analytics",
      url: "https://urbancodestudios.com/pricing",
    },
    {
      "@type": "Offer",
      name: "Business Package",
      price: "799",
      priceCurrency: "GBP",
      description: "Up to 10-page website with local SEO and Google Business",
      url: "https://urbancodestudios.com/pricing",
    },
  ],
};

export default function PricingPage() {
  return (
    <PageLayout>
      <JsonLd data={pricingSchema} />
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-b from-lightGrey to-white">
          <div className="section-container text-center">
            <h1 className="text-4xl sm:text-5xl heading mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No hidden fees. No monthly subscriptions. Pay once, own forever.
              Choose the package that fits your business.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="bg-white">
          <div className="section-container -mt-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`card relative flex flex-col ${
                    plan.popular
                      ? "border-2 border-accent ring-4 ring-accent/10 scale-105"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-primary mb-1">
                      {plan.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                      {plan.description}
                    </p>
                    <div className="text-5xl font-bold text-primary">
                      {plan.price}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      one-time payment
                    </p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, i) => (
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
                    {plan.notIncluded.map((feature, i) => (
                      <li
                        key={`not-${i}`}
                        className="flex items-start opacity-40"
                      >
                        <svg
                          className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`w-full text-center block ${
                      plan.popular ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="bg-lightGrey">
          <div className="section-container">
            <h2 className="text-3xl heading text-center mb-4">Add-Ons</h2>
            <p className="text-center text-gray-600 mb-12">
              Bolt on extras to any package.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {addOns.map((addon, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm"
                >
                  <span className="font-medium text-primary">{addon.name}</span>
                  <span className="text-accent font-bold">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="section-container">
            <h2 className="text-3xl heading text-center mb-12">
              Pricing FAQs
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary to-accent text-white">
          <div className="section-container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Not Sure Which Package?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a free 15-minute call and we&apos;ll recommend the best
              option for your business.
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block"
            >
              Book Free Consultation
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
