import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for UrbanCode Studio. Learn how we collect, use, and protect your personal information in compliance with UK GDPR.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl heading mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: February 2026</p>

            <div className="space-y-8 text-gray-700">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Introduction</h2>
                <p className="mb-4">
                  UrbanCode Studio ("we", "us", or "our") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website or use our services.
                </p>
                <p>
                  We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. 
                  By using our website, you consent to the data practices described in this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h2>
                <h3 className="text-xl font-semibold text-primary mb-3">Personal Information</h3>
                <p className="mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Fill out our contact form or request a quote</li>
                  <li>Subscribe to our newsletter or marketing communications</li>
                  <li>Contact us via email or phone</li>
                  <li>Engage our services</li>
                </ul>
                <p className="mb-4">
                  This information may include:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Business name and type</li>
                  <li>Any other information you choose to provide</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-3 mt-6">Automatically Collected Information</h3>
                <p className="mb-4">
                  When you visit our website, we automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring URLs</li>
                  <li>Pages viewed and time spent on pages</li>
                  <li>Date and time of visits</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Your Information</h2>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Process transactions and send related information</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues or fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              {/* Data Protection Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Your Data Protection Rights (UK GDPR)</h2>
                <p className="mb-4">
                  Under UK GDPR, you have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Right to Access:</strong> You can request copies of your personal data</li>
                  <li><strong>Right to Rectification:</strong> You can request correction of inaccurate data</li>
                  <li><strong>Right to Erasure:</strong> You can request deletion of your personal data</li>
                  <li><strong>Right to Restrict Processing:</strong> You can request limitation of processing your data</li>
                  <li><strong>Right to Data Portability:</strong> You can request transfer of your data to another organization</li>
                  <li><strong>Right to Object:</strong> You can object to processing of your personal data</li>
                  <li><strong>Rights Related to Automated Decision-Making:</strong> You have rights regarding automated decision-making and profiling</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us using the details provided at the end of this policy.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Cookies Policy</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                  Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </p>
                <h3 className="text-xl font-semibold text-primary mb-3">Types of Cookies We Use:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
                </ul>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                  However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Third-Party Services</h2>
                <p className="mb-4">
                  We may use third-party service providers to help us operate our business and website or administer activities on our behalf. 
                  These third parties may include:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Email Service Providers:</strong> For sending communications</li>
                  <li><strong>Hosting Providers:</strong> For website hosting and infrastructure</li>
                </ul>
                <p>
                  These service providers have access to your personal data only to perform specific tasks on our behalf 
                  and are obligated not to disclose or use it for any other purpose.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal data 
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                  over the internet or electronic storage is 100% secure.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Data Retention</h2>
                <p>
                  We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, 
                  including for legal, accounting, or reporting requirements. When we no longer need your data, we will securely 
                  delete or anonymize it.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy 
                  Policy periodically for any changes.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us:
                </p>
                <div className="bg-lightGrey p-6 rounded-xl">
                  <p className="font-semibold text-primary mb-2">UrbanCode Studio</p>
                  <p className="mb-1">London, United Kingdom</p>
                  <p className="mb-1">Email: privacy@urbancodestudio.com</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
