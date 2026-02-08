'use client';
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Shield, Lock, Eye, FileText, Mail, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white pb-16 pt-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
              <Shield className="h-8 w-8 text-violet-600" />
            </div>
            <h1 className="mb-4 text-slate-900">Privacy Policy</h1>
            <p className="text-lg text-slate-600">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <p className="text-slate-700">
              CoderDesign ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
          >
            <AccordionItem value="item-1" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-violet-600" />
                  <span>What Information We Collect</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="mb-2 text-slate-900">Personal Information</h4>
                    <p className="mb-2">We may collect personal information that you voluntarily provide when you:</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Fill out contact forms or request information</li>
                      <li>Subscribe to our newsletter or marketing communications</li>
                      <li>Schedule consultations or meetings</li>
                      <li>Apply for job positions</li>
                      <li>Engage with our services</li>
                    </ul>
                    <p className="mt-2">This may include: name, email address, phone number, company name, job title, and any other information you choose to provide.</p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-slate-900">Automatically Collected Information</h4>
                    <p className="mb-2">When you visit our website, we automatically collect:</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>IP address and browser type</li>
                      <li>Operating system and device information</li>
                      <li>Pages visited and time spent on pages</li>
                      <li>Referring website addresses</li>
                      <li>Clickstream data</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-violet-600" />
                  <span>How We Use Your Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-2 pt-2">
                  <p>We use the information we collect to:</p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Provide, operate, and maintain our services</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you technical notices, updates, and security alerts</li>
                    <li>Communicate about products, services, and promotional offers</li>
                    <li>Analyze usage trends and improve our website and services</li>
                    <li>Detect, prevent, and address technical issues and fraudulent activity</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-violet-600" />
                  <span>Information Sharing and Disclosure</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-3 pt-2">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                  <ul className="space-y-2">
                    <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., email delivery, analytics, hosting)</li>
                    <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                    <li><strong>With Your Consent:</strong> When you have given us explicit permission</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">Data Security & Retention</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-3 pt-2">
                  <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
                  <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">Your Rights and Choices</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-2 pt-2">
                  <p>Depending on your location, you may have the following rights:</p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li><strong>Access:</strong> Request access to your personal information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Objection:</strong> Object to our processing of your personal information</li>
                    <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">Cookies & Tracking Technologies</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="pt-2">
                  <p>We use cookies and similar tracking technologies to collect and track information about your browsing activities. You can control cookie settings through your browser preferences. Please note that disabling cookies may affect the functionality of our website.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">International Data Transfers</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="pt-2">
                  <p>Your information may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your information in accordance with this privacy policy.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">Children's Privacy</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="pt-2">
                  <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">Changes to This Privacy Policy</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="pt-2">
                  <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Contact Box */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white">
            <h3 className="mb-4 text-2xl">Have Questions About Your Privacy?</h3>
            <p className="mb-6 text-violet-100">
              If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:
            </p>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="mb-1 text-sm text-violet-200">Address</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=7+Grosvenor+Street+Toronto+ON+M4Y+0E2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-violet-200"
                >
                  7 Grosvenor Street<br />Toronto, ON M4Y 0E2
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm text-violet-200">Phone</p>
                <a href="tel:+14372392448" className="text-white hover:text-violet-200">(437) 239-2448</a>
              </div>
              <div>
                <p className="mb-1 text-sm text-violet-200">Email</p>
                <a href="mailto:hello@coderdesign.com" className="text-white hover:text-violet-200">hello@coderdesign.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
}

