"use client";

import { useState, FormEvent } from "react";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export default function ContactContent() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          website: formData.get("website"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 8000);
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

  return (
    <PageLayout>
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-b from-lightGrey to-white">
          <div className="section-container text-center">
            <h1 className="text-4xl sm:text-5xl heading mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to grow your business online? Fill out the form below and
              we&apos;ll get back to you within 24 hours with a free audit.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white">
          <div className="section-container -mt-8">
            <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Get Your Free Audit
                  </h2>

                  {showSuccessMessage && (
                    <div className="mb-6 bg-green-50 border-2 border-green-500 text-green-800 px-6 py-4 rounded-xl">
                      <p className="font-semibold">
                        &#x2713; Message sent successfully!
                      </p>
                      <p className="text-sm">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  {showErrorMessage && (
                    <div className="mb-6 bg-red-50 border-2 border-red-500 text-red-800 px-6 py-4 rounded-xl">
                      <p className="font-semibold">
                        &#x2717; {showErrorMessage}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Honeypot */}
                    <div
                      className="absolute opacity-0 pointer-events-none"
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px" }}
                    >
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
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
                        <label
                          htmlFor="business"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
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
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
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
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
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
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        What are you interested in?
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all bg-white"
                      >
                        <option value="">Select a service...</option>
                        <option value="website-design">Website Design</option>
                        <option value="local-seo">Local SEO</option>
                        <option value="google-business">
                          Google Business Optimisation
                        </option>
                        <option value="full-package">Full Package</option>
                        <option value="other">Something else</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Tell us about your project
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none"
                        placeholder="What does your business do? Do you have an existing website? What are your goals?"
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
                      <label
                        htmlFor="consent"
                        className="ml-2 text-sm text-gray-600"
                      >
                        I agree to be contacted by UrbanCode Studio regarding my
                        enquiry. View our{" "}
                        <Link
                          href="/privacy"
                          className="text-accent underline"
                        >
                          Privacy Policy
                        </Link>
                        . *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Response Time */}
                <div className="card bg-accent/5 border border-accent/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Fast Response</h3>
                      <p className="text-sm text-gray-600">
                        We typically reply within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* What to expect */}
                <div className="card">
                  <h3 className="text-lg font-bold text-primary mb-4">
                    What Happens Next?
                  </h3>
                  <ol className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "We review your enquiry",
                        desc: "We'll look at your current online presence and prepare recommendations.",
                      },
                      {
                        step: "2",
                        title: "Free audit call",
                        desc: "A 15-minute call where we share what we found and how we can help.",
                      },
                      {
                        step: "3",
                        title: "Custom proposal",
                        desc: "If you'd like to proceed, we send a clear proposal with timeline and pricing.",
                      },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <div className="font-semibold text-primary">
                            {item.title}
                          </div>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Contact Info */}
                <div className="card">
                  <h3 className="text-lg font-bold text-primary mb-4">
                    Other Ways to Reach Us
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">hello@urbancodestudio.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">London, UK</span>
                    </div>
                  </div>
                </div>

                {/* Trust */}
                <div className="card bg-green-50 border border-green-200">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold text-green-800 mb-1">
                        100% No Obligation
                      </h3>
                      <p className="text-sm text-green-700">
                        The audit is completely free. No pressure, no hard sell.
                        Just honest advice about your online presence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
