"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import TrustBadges from "@/components/TrustBadges";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Scroll-reveal animation observer
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .heading-underline");
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowErrorMessage("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          business: formData.get("business"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          consent: formData.get("consent") === "on",
          website: formData.get("website"), // honeypot
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
        form.reset();
      } else {
        setShowErrorMessage(data.error || "Something went wrong.");
      }
    } catch {
      setShowErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = originalOverflow;
    }
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
                { id: "services", label: "Services", href: "/services" },
                { id: "pricing", label: "Pricing", href: "/pricing" },
                { id: "portfolio", label: "Portfolio", href: "/portfolio" },
                { id: "reviews", label: "Reviews", href: "/reviews" },
                { id: "contact", label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm font-medium transition-colors text-gray-600 hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-primary text-sm"
              >
                Get a Quote
              </Link>
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
                { id: "services", label: "Services", href: "/services" },
                { id: "pricing", label: "Pricing", href: "/pricing" },
                { id: "portfolio", label: "Portfolio", href: "/portfolio" },
                { id: "reviews", label: "Reviews", href: "/reviews" },
                { id: "contact", label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-left py-4 px-4 text-lg font-medium transition-colors border-b border-gray-200 min-h-[48px] text-primary hover:text-accent hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="mt-6 px-4">
                <Link
                  href="/contact"
                  className="btn-primary w-full text-base py-4 text-center block"
                >
                  Get a Quote
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-b from-lightGrey to-white overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 reveal-left">
              <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-semibold">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Rated 4.9/5 by London businesses
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl heading leading-tight">
                Websites That Bring You More Local Clients.
              </h1>
              <p className="text-xl text-gray-600">
                Built for London trades and growing businesses. Fast, mobile-first websites that convert visitors into paying customers.
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
              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
                  ].map((src, i) => (
                    <div key={i} className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <Image src={src} alt="Client" fill className="object-cover" sizes="40px" />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-primary">50+ businesses</span> trust us with their web presence
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative reveal-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                  alt="Professional website design on laptop and mobile devices"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden md:block animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">3x</div>
                    <div className="text-xs text-gray-500">More enquiries</div>
                  </div>
                </div>
              </div>
              {/* Floating speed card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 hidden md:block animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">&lt;2s</div>
                    <div className="text-xs text-gray-500">Load time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Problem Section */}
      <section id="problem" className="bg-white">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-12 reveal heading-underline">
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
              <div key={index} className={`card text-center hover-lift reveal stagger-${index + 1}`}>
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-2xl font-semibold text-primary reveal">We fix all of that.</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-lightGrey">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-4 reveal heading-underline">
            What We Do
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto reveal stagger-1">
            Everything your business needs to stand out online and attract more local customers.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Website Design",
                description: "Fast, mobile-first websites that convert visitors into customers",
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
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
                image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
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
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
                features: [
                  "Google Business Profile setup",
                  "Maps optimization",
                  "Review management",
                  "Local visibility boost",
                ],
              },
            ].map((service, index) => (
              <div key={index} className={`card overflow-hidden group hover-lift reveal stagger-${index + 1}`}>
                <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
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

      {/* Before & After / Portfolio Section */}
      <section id="portfolio" className="bg-lightGrey">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-4">
            From Outdated to High-Converting
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            See the real transformations we&apos;ve delivered for London businesses.
          </p>

          {/* Portfolio gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              {
                title: "JT Electrical",
                category: "Electrician",
                image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=450&fit=crop",
                result: "+180% more calls",
              },
              {
                title: "Sparkle Clean",
                category: "Cleaning Services",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=450&fit=crop",
                result: "+50% bookings",
              },
              {
                title: "Roberts Builders",
                category: "Construction",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=450&fit=crop",
                result: "2 major contracts",
              },
            ].map((project, index) => (
              <div key={index} className="card overflow-hidden group cursor-pointer">
                <div className="relative h-56 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} website redesign`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-semibold text-lg">{project.result}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.category}</p>
                <div className="mt-3 inline-flex items-center text-accent text-sm font-semibold">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {project.result}
                </div>
              </div>
            ))}
          </div>

          {/* Before & After comparison — improved */}
          <h3 className="text-2xl sm:text-3xl heading text-center mb-8">What Changes Look Like</h3>
          <div className="grid md:grid-cols-2 gap-0 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            {/* Old Site */}
            <div className="bg-gray-50 p-8 border-r border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <span className="text-lg font-bold text-gray-700">Before</span>
              </div>
              {/* Wireframe mockup */}
              <div className="bg-white border-2 border-red-200 rounded-lg p-5 mb-6 shadow-inner">
                <div className="space-y-3">
                  <div className="flex gap-2 items-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-300" />
                    <div className="w-2 h-2 rounded-full bg-red-300" />
                    <div className="w-2 h-2 rounded-full bg-red-300" />
                    <div className="h-2 bg-red-200 rounded flex-1 ml-2" />
                  </div>
                  <div className="h-2.5 bg-red-200 rounded w-full" />
                  <div className="h-2.5 bg-red-200 rounded w-2/3" />
                  <div className="h-2 bg-red-100 rounded w-1/3 mt-1" />
                  <div className="flex gap-2 mt-3">
                    <div className="h-20 bg-red-100 rounded flex-1" />
                    <div className="h-20 bg-red-100 rounded flex-1" />
                    <div className="h-20 bg-red-100 rounded flex-1" />
                  </div>
                  <div className="h-2 bg-red-200 rounded w-1/2 mt-2" />
                  <div className="h-2 bg-red-200 rounded w-3/4" />
                  <div className="h-6 bg-red-200 rounded w-1/3 mt-3" />
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { text: "Cluttered, confusing layout", icon: "M6 18L18 6M6 6l12 12" },
                  { text: "Tiny text on mobile screens", icon: "M6 18L18 6M6 6l12 12" },
                  { text: "No clear call-to-action", icon: "M6 18L18 6M6 6l12 12" },
                  { text: "5+ seconds to load", icon: "M6 18L18 6M6 6l12 12" },
                  { text: "Not found on Google", icon: "M6 18L18 6M6 6l12 12" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-500">
                    <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* New Site */}
            <div className="bg-white p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-lg font-bold text-primary">After</span>
              </div>
              {/* Wireframe mockup */}
              <div className="bg-gradient-to-b from-blue-50 to-white border-2 border-green-200 rounded-lg p-5 mb-6 shadow-inner">
                <div className="space-y-3">
                  <div className="flex gap-2 items-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-300" />
                    <div className="w-2 h-2 rounded-full bg-green-300" />
                    <div className="w-2 h-2 rounded-full bg-green-300" />
                    <div className="h-2 bg-accent/20 rounded flex-1 ml-2" />
                  </div>
                  <div className="h-4 bg-accent rounded w-2/3" />
                  <div className="h-2 bg-gray-200 rounded w-5/6 mt-1" />
                  <div className="h-28 bg-gradient-to-br from-accent/15 to-primary/10 rounded-lg mt-2 flex items-center justify-center">
                    <svg className="w-8 h-8 text-accent/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <div className="h-8 bg-accent rounded-lg flex-1" />
                    <div className="h-8 bg-gray-200 rounded-lg flex-1" />
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Clean, conversion-focused design",
                  "Perfect on every device",
                  "Strong, visible CTAs",
                  "Loads under 2 seconds",
                  "SEO-optimised for local search",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary inline-flex items-center">
              View All Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="bg-white">
        <div className="section-container">
          <h2 className="text-3xl sm:text-4xl heading text-center mb-4">
            What Our Clients Say
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what London business owners have to say about working with us.
          </p>
          <TestimonialCarousel />
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
              <p className="font-semibold">&#x2713; Message sent successfully!</p>
              <p className="text-sm">We&apos;ll get back to you within 24 hours.</p>
            </div>
          )}

          {showErrorMessage && (
            <div className="max-w-2xl mx-auto mb-6 bg-red-50 border-2 border-red-500 text-red-800 px-6 py-4 rounded-xl">
              <p className="font-semibold">&#x2717; {showErrorMessage}</p>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-6">
            {/* Honeypot field — hidden from real users, bots fill it in */}
            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

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

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
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
                  <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="text-gray-300 hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
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
