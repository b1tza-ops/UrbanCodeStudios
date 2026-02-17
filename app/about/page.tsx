import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | UrbanCode Studio",
  description: "Learn about UrbanCode Studio - a London-based web design agency helping trades and local businesses grow online with affordable, high-quality websites.",
};

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-lightGrey to-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl heading mb-6">About UrbanCode Studio</h1>
              <p className="text-xl text-gray-600">
                We're on a mission to help London trades and local businesses grow online with 
                websites that actually bring in customers.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl heading text-center mb-8">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  UrbanCode Studio was founded with a simple observation: too many great local businesses 
                  in London were losing customers to competitors simply because their websites were outdated, 
                  slow, or non-existent.
                </p>
                <p>
                  We saw electricians, plumbers, builders, and other skilled tradespeople doing excellent work 
                  but struggling to get found online. Meanwhile, generic web agencies were charging thousands 
                  of pounds for websites that looked nice but didn't actually bring in business.
                </p>
                <p>
                  We decided there had to be a better way. We created UrbanCode Studio to provide affordable, 
                  high-quality websites specifically designed for London's trades and local businesses - 
                  websites that look professional, load fast, work perfectly on mobile, and most importantly, 
                  help you get more customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="bg-lightGrey">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl heading mb-6">Our Mission</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                To empower London's trades and local businesses with affordable, high-quality websites 
                that drive real results - helping hardworking professionals compete online and grow their business.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white">
          <div className="section-container">
            <h2 className="text-3xl sm:text-4xl heading text-center mb-12">Why Choose UrbanCode Studio</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "We Understand Your Business",
                  description: "We specialize in working with trades and local businesses. We know what your customers are looking for and how to convert website visitors into real enquiries."
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Transparent, Fair Pricing",
                  description: "No hidden fees, no monthly lock-ins, no surprises. You pay once and own your website forever. Our pricing is designed to be affordable for small businesses."
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Fast Turnaround",
                  description: "We know time is money. Most projects are completed within 2-4 weeks. No endless delays or waiting months for your website to go live."
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Local London Focus",
                  description: "We're based in London and understand the local market. We know how to help you rank for local searches and attract customers in your area."
                }
              ].map((item, index) => (
                <div key={index} className="card">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="bg-lightGrey">
          <div className="section-container">
            <h2 className="text-3xl sm:text-4xl heading text-center mb-12">How We Work</h2>
            <div className="max-w-5xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Discover",
                    description: "We start with a free consultation to understand your business, goals, and what you need from your website. We'll discuss your target customers, competitors, and what success looks like for you."
                  },
                  {
                    step: "02",
                    title: "Design",
                    description: "We create a modern, professional design that reflects your brand and appeals to your target customers. You'll see mockups and have the opportunity to provide feedback before we move to development."
                  },
                  {
                    step: "03",
                    title: "Develop",
                    description: "We build your website using modern, fast technology. Every page is optimized for mobile devices and search engines. We test thoroughly to ensure everything works perfectly across all devices."
                  },
                  {
                    step: "04",
                    title: "Deliver",
                    description: "Once you're happy with everything, we launch your website and provide training so you can manage updates yourself. We're here for 30 days of free support to ensure a smooth start."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-primary mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-white">
          <div className="section-container">
            <h2 className="text-3xl sm:text-4xl heading text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Transparent Pricing",
                  description: "No hidden fees or surprises. You know exactly what you're paying for."
                },
                {
                  title: "Fast Delivery",
                  description: "We respect your time and deliver projects quickly without compromising quality."
                },
                {
                  title: "Local Focus",
                  description: "We're passionate about helping London businesses thrive online."
                },
                {
                  title: "Results-Driven",
                  description: "We build websites that actually bring in customers, not just look pretty."
                }
              ].map((value, index) => (
                <div key={index} className="card text-center">
                  <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-accent text-white">
          <div className="section-container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss how we can help your business grow online. 
              Book a free consultation and website audit today.
            </p>
            <Link 
              href="/#contact"
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Get Your Free Audit
            </Link>
            <p className="mt-4 text-sm opacity-75">No obligation. No pressure. Just honest advice.</p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
