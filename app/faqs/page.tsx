import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Accordion from "@/components/Accordion";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQs - Web Design Questions Answered",
  description:
    "Frequently asked questions about web design services, pricing, timelines, and support. Get answers about working with UrbanCode Studio — London's trade website specialist.",
  keywords: [
    "web design FAQ",
    "website design questions",
    "how long to build a website",
    "website pricing questions",
    "web design process",
  ],
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title: "FAQs | UrbanCode Studio",
    description:
      "Answers to common questions about web design services, pricing, and timelines.",
    url: "/faqs",
    type: "website",
  },
};

export default function FAQsPage() {
  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer: "Most of our websites are completed within 2-4 weeks, depending on the package and complexity. Basic packages typically take 1-2 weeks, Standard packages 2-3 weeks, and Pro packages 3-4 weeks. Timeline can be affected by how quickly you provide content and feedback. We'll give you a specific timeline when we discuss your project."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! We understand that budget is important for small businesses. Our standard payment structure is 50% upfront and 50% on completion. For larger projects (Pro package and above), we can discuss custom payment plans to spread the cost. Contact us to discuss options that work for your budget."
    },
    {
      question: "Will my website be mobile-friendly?",
      answer: "Absolutely! All our websites are built mobile-first, meaning they look great and work perfectly on phones, tablets, and desktops. With over 80% of people browsing on mobile devices, we ensure your site provides an excellent experience on all screen sizes. Every website is thoroughly tested across different devices before launch."
    },
    {
      question: "Do you provide hosting?",
      answer: "We can recommend reliable hosting providers and help you set up hosting, but we don't provide hosting directly. This gives you full control and ownership of your website. We work with popular UK-based hosting companies and can guide you through the setup process. Hosting typically costs £5-15 per month depending on your needs."
    },
    {
      question: "Can I update the website myself?",
      answer: "Yes! We build websites on modern platforms that allow you to easily update content like text, images, and blog posts without technical knowledge. We provide training and documentation to help you make updates confidently. For more complex changes, we offer ongoing support packages if needed."
    },
    {
      question: "What happens after my website is built?",
      answer: "Once your website is live, you own it completely. We provide 30 days of free support to fix any bugs or issues. After that, you can manage it yourself, or we can discuss ongoing maintenance and support packages. We're always here if you need help with updates, improvements, or questions about your site."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes, we offer various support packages for clients who want ongoing help with their website. This can include regular updates, content changes, security monitoring, performance optimization, and technical support. Support packages start from £50/month. We'll recommend what's right for your needs during your consultation."
    },
    {
      question: "Will my website show up on Google?",
      answer: "All our websites include basic SEO setup to help you get found on Google. This includes proper page structure, meta tags, fast loading speeds, and mobile optimization. However, ranking highly on Google takes time and depends on many factors including your content, competition, and ongoing SEO efforts. We can advise on local SEO strategies to help you rank for searches in your area."
    },
    {
      question: "What if I need changes after the website is complete?",
      answer: "Minor tweaks and bug fixes within 30 days of launch are included. For new features or significant changes after launch, we charge an hourly rate or can provide a quote for the specific work. Many clients find it helpful to schedule regular maintenance sessions to keep their site fresh and up-to-date."
    },
    {
      question: "Do I need to provide content and images?",
      answer: "Yes, you'll need to provide your own content (text), logo, and images. You know your business best! We'll guide you on what content we need and can help structure it effectively. If you need help with copywriting or professional photography, we can recommend trusted partners. Stock images can be used as placeholders or for general design elements."
    },
    {
      question: "What makes you different from other web designers?",
      answer: "We specialize in working with London trades and local businesses. We understand your needs and create websites that actually bring in customers, not just look pretty. Our pricing is transparent with no hidden fees, no monthly subscriptions, and you own your website outright. Plus, we're local to London and understand the local market."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Absolutely! Many of our clients come to us with outdated websites that aren't converting visitors into customers. We can redesign your existing site or build a completely new one from scratch. During your free audit, we'll review your current site and recommend the best approach for your situation and budget."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <PageLayout>
      <JsonLd data={faqSchema} />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-lightGrey to-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl heading mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-600 mb-8">
                Got questions? We've got answers. Find everything you need to know about our services, 
                pricing, and process.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <Accordion items={faqs} />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-lightGrey">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl heading mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Can't find the answer you're looking for? Get in touch and we'll be happy to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  Contact Us
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Book Free Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
