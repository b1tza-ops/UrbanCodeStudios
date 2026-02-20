import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for web design services provided by UrbanCode Studio. Read our service agreement, payment terms, and policies.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl heading mb-6">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: February 2026</p>

            <div className="space-y-8 text-gray-700">
              {/* Agreement to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Agreement to Terms</h2>
                <p className="mb-4">
                  These Terms of Service ("Terms") govern your use of the UrbanCode Studio website and services. 
                  By accessing our website or engaging our services, you agree to be bound by these Terms.
                </p>
                <p>
                  If you do not agree with any part of these Terms, you must not use our website or services.
                </p>
              </section>

              {/* Services Description */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Services Description</h2>
                <p className="mb-4">
                  UrbanCode Studio provides professional web design and development services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Website design and development</li>
                  <li>Mobile-responsive website creation</li>
                  <li>Basic SEO setup and optimization</li>
                  <li>Google Business Profile optimization</li>
                  <li>Website maintenance and support (where agreed)</li>
                </ul>
                <p>
                  Specific services and deliverables will be outlined in individual project proposals or contracts.
                </p>
              </section>

              {/* Project Process */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Project Process</h2>
                <h3 className="text-xl font-semibold text-primary mb-3">1. Discovery & Consultation</h3>
                <p className="mb-4">
                  We begin with a free consultation to understand your business needs, goals, and requirements.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">2. Proposal & Agreement</h3>
                <p className="mb-4">
                  We provide a detailed proposal outlining the scope of work, timeline, and cost. 
                  Work begins once you accept the proposal and initial payment is received.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">3. Design & Development</h3>
                <p className="mb-4">
                  We create your website according to the agreed specifications. You will have opportunities 
                  for feedback and revisions as outlined in your project agreement.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">4. Review & Launch</h3>
                <p className="mb-4">
                  Once approved, we launch your website and provide any necessary training or documentation.
                </p>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Payment Terms</h2>
                <h3 className="text-xl font-semibold text-primary mb-3">Pricing</h3>
                <p className="mb-4">
                  Our pricing is transparent and outlined in individual project proposals. Unless otherwise stated:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>All prices are quoted in British Pounds (GBP)</li>
                  <li>Prices include VAT where applicable</li>
                  <li>Custom projects may have different payment structures</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-3">Payment Schedule</h3>
                <p className="mb-4">
                  Standard payment terms:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>50% deposit</strong> required before work begins</li>
                  <li><strong>50% final payment</strong> due upon project completion and before launch</li>
                  <li>Payment plans may be available for larger projects (subject to approval)</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-3">Late Payments</h3>
                <p>
                  Invoices are due within 7 days of issue unless otherwise agreed. Late payments may incur a fee 
                  and may result in suspension of services until payment is received.
                </p>
              </section>

              {/* Intellectual Property Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Intellectual Property Rights</h2>
                <h3 className="text-xl font-semibold text-primary mb-3">Client Content</h3>
                <p className="mb-4">
                  You retain all rights to content (text, images, logos) you provide to us. By providing content, 
                  you grant us a license to use it for the purpose of completing your project.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">Website Ownership</h3>
                <p className="mb-4">
                  Upon full payment:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>You own the completed website and its content</li>
                  <li>We retain rights to use the project in our portfolio</li>
                  <li>We retain rights to any proprietary code, templates, or frameworks we developed</li>
                  <li>Third-party components (plugins, fonts, images) remain subject to their respective licenses</li>
                </ul>
              </section>

              {/* Revisions and Changes */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Revisions and Changes</h2>
                <p className="mb-4">
                  Each package includes a specified number of revision rounds:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Basic package: 1 round of revisions</li>
                  <li>Standard package: 2 rounds of revisions</li>
                  <li>Pro package: 3 rounds of revisions</li>
                </ul>
                <p>
                  Additional revisions or changes beyond the agreed scope may incur additional charges. 
                  Major scope changes will require a new proposal and additional payment.
                </p>
              </section>

              {/* Client Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Client Responsibilities</h2>
                <p className="mb-4">
                  To ensure timely project completion, you agree to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Provide all necessary content, materials, and information in a timely manner</li>
                  <li>Respond to requests for feedback within agreed timeframes</li>
                  <li>Provide access to necessary accounts, domains, and hosting</li>
                  <li>Make payments according to the agreed schedule</li>
                  <li>Ensure all content provided does not infringe on third-party rights</li>
                </ul>
                <p>
                  Delays caused by lack of client input may result in project timeline extensions.
                </p>
              </section>

              {/* Refund Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Refund Policy</h2>
                <p className="mb-4">
                  Due to the custom nature of our services:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Deposits are non-refundable once work has commenced</li>
                  <li>If you cancel after work has begun, you will be charged for work completed to date</li>
                  <li>If we cannot deliver the agreed services, you will receive a refund for undelivered work</li>
                  <li>Refund requests must be made in writing</li>
                </ul>
              </section>

              {/* Warranties and Disclaimers */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Warranties and Disclaimers</h2>
                <h3 className="text-xl font-semibold text-primary mb-3">Our Warranties</h3>
                <p className="mb-4">
                  We warrant that:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Services will be performed with reasonable skill and care</li>
                  <li>Websites will be tested and functional at time of delivery</li>
                  <li>We will correct any defects reported within 30 days of launch (free of charge)</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-3">Disclaimers</h3>
                <p className="mb-4">
                  We do not guarantee:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Specific search engine rankings or traffic levels</li>
                  <li>Specific business results or revenue</li>
                  <li>Compatibility with all future browser versions or devices</li>
                  <li>Uninterrupted or error-free operation (though we will work to resolve issues)</li>
                </ul>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Limitation of Liability</h2>
                <p className="mb-4">
                  To the maximum extent permitted by law:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Our total liability shall not exceed the total amount paid by you for the specific service</li>
                  <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  <li>We are not liable for losses resulting from your content or third-party services</li>
                  <li>We are not liable for losses due to factors beyond our reasonable control</li>
                </ul>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Termination</h2>
                <p className="mb-4">
                  Either party may terminate a project:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>By mutual written agreement</li>
                  <li>If the other party breaches these Terms and fails to remedy within 14 days</li>
                  <li>If the other party becomes insolvent or enters bankruptcy</li>
                </ul>
                <p>
                  Upon termination, you must pay for all work completed to date.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Changes to These Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                  upon posting to our website. Your continued use of our services after changes constitutes 
                  acceptance of the modified Terms.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Governing Law</h2>
                <p>
                  These Terms are governed by and construed in accordance with the laws of England and Wales. 
                  Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-lightGrey p-6 rounded-xl">
                  <p className="font-semibold text-primary mb-2">UrbanCode Studio</p>
                  <p className="mb-1">London, United Kingdom</p>
                  <p className="mb-1">Email: hello@urbancodestudio.com</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
