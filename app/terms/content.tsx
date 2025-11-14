'use client';
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { FileText, Scale, CreditCard, Shield, Users, AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50 to-white pb-16 pt-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <Scale className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="mb-4 text-slate-900">Terms & Conditions</h1>
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
              By accessing or using the CoderDesign website and services ("Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Services.
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
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <span>Services Description</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-2 pt-2">
                  <p>CoderDesign provides development services including:</p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Full-stack, AI, and cloud engineering</li>
                    <li>Backend development and API integration</li>
                    <li>AI and machine learning development</li>
                    <li>Mobile application development</li>
                    <li>AI-powered SEO, GEO targeting, and AEO services</li>
                    <li>Custom software development</li>
                    <li>QA and testing services</li>
                    <li>Platform and infrastructure services</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <span>Service Engagement & Client Responsibilities</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="mb-2 text-slate-900">Consultation and Proposals</h4>
                    <p>Initial consultations are provided to understand your requirements. Following consultation, we provide a detailed proposal outlining scope, timeline, and costs. Services commence upon mutual agreement and execution of a service agreement.</p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-slate-900">Client Responsibilities</h4>
                    <p className="mb-2">Clients agree to:</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Provide accurate and complete information required for project execution</li>
                      <li>Respond to inquiries and requests in a timely manner</li>
                      <li>Provide necessary access to systems, accounts, and resources</li>
                      <li>Review and approve deliverables within specified timeframes</li>
                      <li>Make timely payments according to agreed terms</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                  <span>Payment Terms & Refund Policy</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="mb-2 text-slate-900">Fees and Billing</h4>
                    <p className="mb-2">Service fees are specified in the service agreement or proposal. Unless otherwise agreed:</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Payment terms are net 30 days from invoice date</li>
                      <li>Late payments may incur interest charges of 1.5% per month</li>
                      <li>Projects may be suspended if payments are not received on time</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-slate-900">Refund Policy</h4>
                    <p>Refunds are handled on a case-by-case basis. Work completed prior to cancellation is billable. Deposits and retainer fees are generally non-refundable unless otherwise specified in the service agreement.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  <span>Intellectual Property Rights</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="mb-2 text-slate-900">Client-Owned IP</h4>
                    <p>Upon full payment, clients receive ownership of custom code and deliverables created specifically for their project, subject to any third-party licenses.</p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-slate-900">CoderDesign-Owned IP</h4>
                    <p className="mb-2">We retain ownership of:</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Pre-existing code, frameworks, and tools</li>
                      <li>General methodologies and processes</li>
                      <li>Reusable components and libraries</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-slate-900">Third-Party Materials</h4>
                    <p>Some projects may incorporate third-party software, libraries, or APIs subject to their own license terms. Clients are responsible for compliance with such licenses.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-indigo-600" />
                  <span>Limitation of Liability</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="pt-2">
                  <p className="text-sm">TO THE MAXIMUM EXTENT PERMITTED BY LAW, CODERDESIGN'S LIABILITY SHALL NOT EXCEED THE FEES PAID FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM. WE SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">Warranties & Disclaimers</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="mb-2 text-slate-900">Service Warranty</h4>
                    <p>We warrant that services will be performed in a professional and workmanlike manner. Bug fixes and corrections during the warranty period (typically 30-90 days post-delivery) are provided at no additional cost.</p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-slate-900">Disclaimer</h4>
                    <p className="text-sm">EXCEPT AS EXPRESSLY PROVIDED, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">Confidentiality & Indemnification</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="mb-2 text-slate-900">Confidentiality</h4>
                    <p>Both parties agree to maintain confidentiality of proprietary information shared during the engagement. This obligation survives termination of the service agreement.</p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-slate-900">Indemnification</h4>
                    <p className="mb-2">Clients agree to indemnify and hold harmless CoderDesign from claims arising from:</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Client's use of deliverables in violation of applicable laws</li>
                      <li>Client-provided content or materials</li>
                      <li>Breach of these Terms by the client</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">Termination & Force Majeure</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="mb-2 text-slate-900">Termination</h4>
                    <p className="mb-2">Either party may terminate services with written notice. Upon termination:</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Client pays for work completed through the termination date</li>
                      <li>We will deliver work-in-progress in its current state</li>
                      <li>All outstanding invoices become immediately due</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-slate-900">Force Majeure</h4>
                    <p>Neither party shall be liable for delays or failures in performance resulting from circumstances beyond their reasonable control, including natural disasters, war, terrorism, labor disputes, or government actions.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="rounded-xl border border-slate-200 bg-white px-6">
              <AccordionTrigger className="text-left">Governing Law & Dispute Resolution</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <div className="pt-2">
                  <p>These Terms are governed by the laws of the State of New York. Any disputes shall first be attempted to be resolved through good faith negotiation. If unresolved, disputes shall be settled through binding arbitration in New York, NY.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Contact Box */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white">
            <h3 className="mb-4 text-2xl">Questions About These Terms?</h3>
            <p className="mb-6 text-indigo-100">
              For questions about these Terms, please contact us:
            </p>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="mb-1 text-sm text-indigo-200">Address</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=17+State+Street+New+York+NY+10004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-indigo-200"
                >
                  17 State Street<br />New York, NY 10004
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm text-indigo-200">Phone</p>
                <a href="tel:+14372392448" className="text-white hover:text-indigo-200">(437) 239-2448</a>
              </div>
              <div>
                <p className="mb-1 text-sm text-indigo-200">Email</p>
                <a href="mailto:hello@coderdesign.com" className="text-white hover:text-indigo-200">hello@coderdesign.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
}

