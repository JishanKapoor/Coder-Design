import type { Metadata } from "next";
import AIWorkflowDetail from "./content";

export const metadata: Metadata = {
  title: "AI Automation and Chatbots Toronto | CoderDesign",
  description:
    "AI automation company in Toronto. Custom chatbots, n8n workflows, OpenAI integration, and predictive analytics for businesses across the GTA. (437) 239-2448.",
  keywords:
    "AI automation Toronto, chatbot development Toronto, n8n workflow automation, AI chatbot Toronto, workflow automation Toronto, OpenAI integration Toronto, business automation Toronto, AI development company Toronto, machine learning Toronto",
  openGraph: {
    title: "AI Automation and Chatbot Development Toronto | CoderDesign",
    description: "Custom AI chatbots, n8n workflow automation, and OpenAI integration for Toronto businesses. Call (437) 239-2448.",
    url: "https://coderdesign.com/ai-workflow",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign AI Automation Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation and Chatbot Development Toronto | CoderDesign",
    description: "Custom AI solutions, workflow automation, and chatbots for Toronto businesses. Call (437) 239-2448.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/ai-workflow",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://coderdesign.com/ai-workflow/#service",
  "name": "AI Automation and Chatbot Development Toronto",
  "serviceType": "AI Automation",
  "description": "AI automation company in Toronto. CoderDesign builds custom chatbots, n8n workflow automation, OpenAI and LLM integrations, and predictive analytics solutions for businesses across the Greater Toronto Area and Canada.",
  "url": "https://coderdesign.com/ai-workflow",
  "provider": { "@id": "https://coderdesign.com/#organization" },
  "areaServed": [
    { "@type": "City", "name": "Toronto" },
    { "@type": "AdministrativeArea", "name": "Greater Toronto Area" },
    { "@type": "Country", "name": "Canada" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Automation Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom AI Chatbot Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "n8n and Make Workflow Automation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "OpenAI and LLM Integration" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Predictive Analytics and Machine Learning" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Process Automation" } }
    ]
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is the difference between n8n, Make, and Zapier?", "acceptedAnswer": { "@type": "Answer", "text": "n8n is open source and self hosted with unlimited workflows. Make offers complex visual workflows in the cloud. Zapier is easiest to learn but gets expensive. We recommend n8n for full control and Make for managed hosting." }},
    { "@type": "Question", "name": "How long does it take to build a workflow automation?", "acceptedAnswer": { "@type": "Answer", "text": "Simple automations take 1 to 3 days. Multi step workflows with AI integration take 1 to 2 weeks. Enterprise level projects with dozens of workflows take 4 to 8 weeks including testing." }},
    { "@type": "Question", "name": "Can you integrate ChatGPT or other AI models into workflows?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We integrate OpenAI GPT 4, Anthropic Claude, and custom models into n8n and Make workflows for chatbots, content generation, email classification, lead scoring, and document processing." }},
    { "@type": "Question", "name": "Do I need technical skills to manage the automations?", "acceptedAnswer": { "@type": "Answer", "text": "Not at all. We build workflows with visual interfaces and provide documentation. You can monitor and adjust workflows through simple dashboards without code. Training and ongoing support included." }},
    { "@type": "Question", "name": "Is self hosted n8n secure enough for business data?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. With self hosted n8n your data never leaves your infrastructure. We set up encryption, authentication, access controls, and backups. More secure than cloud alternatives for sensitive data." }}
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AIWorkflowDetail />
    </>
  );
}