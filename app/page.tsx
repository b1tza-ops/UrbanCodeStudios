"use client";

import { useState, useEffect, FormEvent } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
    (e.target as HTMLFormElement).reset();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-primary">UrbanCode Studio</span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {[
                { id: "services", label: "Services" },
                { id: "pricing", label: "Pricing" },
                { id: "portfolio", label: "Portfolio" },
                { id: "reviews", label: "Reviews" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-accent border-b-2 border-accent"
                      : "text-gray-600 hover:text-accent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="btn-primary text-sm"
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile menu button - Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-primary hover:text-accent transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Panel */}
          <div 
            className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-accent transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex flex-col px-4">
              {[
                { id: "services", label: "Services" },
                { id: "pricing", label: "Pricing" },
                { id: "portfolio", label: "Portfolio" },
                { id: "reviews", label: "Reviews" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-4 px-4 text-lg font-medium transition-colors border-b border-gray-200 min-h-[48px] ${
                    activeSection === item.id
                      ? "text-accent bg-blue-50"
                      : "text-primary hover:text-accent hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="mt-6 px-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="btn-primary w-full text-base py-4"
                >
                  Get a Quote
                </button>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-b from-lightGrey to-white overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl heading leading-tight">
                Websites That Bring You More Local Clients.
              </h1>
              <p className="text-xl text-gray-600">
                Built for London trades and growing businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="btn-primary"
                >
                  Get Your Free Audit
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="btn-secondary"
                >
                  View Packages
                </button>
              </div>
            </div>

            {/* Device Mockup */}
            <div className="relative">
              <div className="card p-8 bg-gradient-to-br from-primary to-accent">
                <div className="bg-white rounded-lg p-6 space-y-4">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-16 h-16 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-accent rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="bg-white">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-12">
            Why Most Local Business Websites Don't Convert
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Slow to Load",
                description: "Customers leave before your site even loads",
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Not Mobile-Friendly",
                description: "Looks broken on phones where 80% browse",
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                ),
                title: "No Clear Call-to-Action",
                description: "Visitors don't know what to do next",
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Poor Google Visibility",
                description: "Nobody can find you in search results",
              },
            ].map((item, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-2xl font-semibold text-primary">We fix all of that.</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-lightGrey">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-12">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Website Design",
                description: "Fast, mobile-first websites that convert visitors into customers",
                features: [
                  "Mobile-optimised design",
                  "Fast loading speeds",
                  "Modern, clean layouts",
                  "Easy to navigate",
                ],
              },
              {
                title: "Local SEO Setup",
                description: "Get found by customers searching in your area",
                features: [
                  "On-page SEO structure",
                  "Local keyword targeting",
                  "Meta tags optimization",
                  "Search-friendly URLs",
                ],
              },
              {
                title: "Google Business Optimisation",
                description: "Show up on Google Maps when customers search nearby",
                features: [
                  "Google Business Profile setup",
                  "Maps optimization",
                  "Review management",
                  "Local visibility boost",
                ],
              },
            ].map((service, index) => (
              <div key={index} className="card">
                <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <h4 className="font-semibold text-primary mb-2">What you get:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12">No hidden fees. No monthly subscriptions. Pay once, own forever.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Basic",
                price: "£299",
                popular: false,
                features: [
                  "1-page website",
                  "Mobile optimised",
                  "Contact form",
                  "WhatsApp button",
                ],
              },
              {
                name: "Standard",
                price: "£499",
                popular: true,
                features: [
                  "Up to 5 pages",
                  "Basic SEO setup",
                  "Google Analytics",
                  "Speed optimisation",
                ],
              },
              {
                name: "Pro",
                price: "£799",
                popular: false,
                features: [
                  "Up to 10 pages",
                  "Lead tracking",
                  "Booking integration",
                  "Advanced SEO structure",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`card relative ${
                  plan.popular ? "border-2 border-accent ring-4 ring-accent/10" : ""
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
                  <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary">{plan.price}</div>
                  <p className="text-gray-500 text-sm mt-1">one-time payment</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full ${plan.popular ? "btn-primary" : "btn-secondary"}`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section id="portfolio" className="bg-lightGrey">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-12">
            From Outdated to High-Converting
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Old Site */}
            <div className="card bg-gray-100">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
                <div className="text-xs text-gray-400 mb-2">Old Site ❌</div>
                <div className="space-y-2">
                  <div className="h-2 bg-red-300 rounded w-full"></div>
                  <div className="h-2 bg-red-300 rounded w-2/3"></div>
                  <div className="flex gap-1">
                    <div className="h-16 bg-red-200 rounded flex-1"></div>
                    <div className="h-16 bg-red-200 rounded flex-1"></div>
                    <div className="h-16 bg-red-200 rounded flex-1"></div>
                  </div>
                  <div className="h-1 bg-red-300 rounded w-1/2"></div>
                  <div className="h-1 bg-red-300 rounded w-3/4"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">Typical Problems:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✗ Cluttered layout</li>
                <li>✗ Tiny text on mobile</li>
                <li>✗ No clear next steps</li>
                <li>✗ Slow loading times</li>
              </ul>
            </div>

            {/* New Site */}
            <div className="card bg-white">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                <div className="text-xs text-gray-400 mb-2">New Site ✓</div>
                <div className="space-y-3">
                  <div className="h-3 bg-accent rounded w-1/2"></div>
                  <div className="h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-accent rounded flex-1"></div>
                    <div className="h-6 bg-gray-200 rounded flex-1"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Our Solution:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Clean, modern design
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mobile-first approach
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Clear CTAs
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lightning fast
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="bg-white">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "James T.",
                business: "Electrician, East London",
                quote: "More calls in the first week.",
                avatar: "JT",
              },
              {
                name: "Sarah M.",
                business: "Cleaning Services",
                quote: "Clean, fast, and professional.",
                avatar: "SM",
              },
              {
                name: "David R.",
                business: "Building Contractor",
                quote: "Best value website we've had.",
                avatar: "DR",
              },
            ].map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-lg mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.business}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Get More Enquiries?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free audit and we'll show you exactly what to improve.
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Book Free Audit
          </button>
          <p className="mt-4 text-sm opacity-75">Typical response time: same day.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-4">
            Get Your Free Audit
          </h2>
          <p className="text-center text-gray-600 mb-12">Fill out the form and we'll get back to you within 24 hours</p>
          
          {showSuccessMessage && (
            <div className="max-w-2xl mx-auto mb-6 bg-green-50 border-2 border-green-500 text-green-800 px-6 py-4 rounded-xl">
              <p className="font-semibold">✓ Message sent successfully!</p>
              <p className="text-sm">We'll get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                  placeholder="e.g. Plumber, Electrician"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                  placeholder="07XXX XXXXXX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                required
                className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                I agree to be contacted by UrbanCode Studio regarding my enquiry *
              </label>
            </div>

            <button type="submit" className="btn-primary w-full text-lg py-4">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">UrbanCode Studio</h3>
              <p className="text-gray-300 text-sm">
                Web design for London trades and growing businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection("services")} className="text-gray-300 hover:text-white transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("pricing")} className="text-gray-300 hover:text-white transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Location</h4>
              <p className="text-gray-300 text-sm">
                London, UK
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} UrbanCode Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
