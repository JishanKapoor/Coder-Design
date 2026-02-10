import type { Metadata } from "next";
import Content from "./content";
import meta from "./meta.json";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `${meta.title} | CoderDesign Blog`,
  description: meta.short_description,
  openGraph: {
    title: meta.title,
    description: meta.short_description,
    url: `https://coderdesign.com/blog/${meta.slug}`,
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "article",
    images: [{ url: meta.image ? `https://coderdesign.com${meta.image}` : "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.short_description,
    images: [meta.image ? `https://coderdesign.com${meta.image}` : "https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: `https://coderdesign.com/blog/${meta.slug}`,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": meta.title,
  "description": meta.short_description,
  "author": { "@type": "Organization", "name": "CoderDesign", "url": "https://coderdesign.com" },
  "publisher": { "@type": "Organization", "name": "CoderDesign", "url": "https://coderdesign.com", "logo": { "@type": "ImageObject", "url": "https://coderdesign.com/og-image.png" } },
  "datePublished": meta.createdAt,
  "dateModified": meta.createdAt,
  "image": meta.image ? `https://coderdesign.com${meta.image}` : "https://coderdesign.com/og-image.png",
  "url": `https://coderdesign.com/blog/${meta.slug}`,
  "mainEntityOfPage": `https://coderdesign.com/blog/${meta.slug}`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much of an increase in leads can I realistically expect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on your starting point. Businesses with very basic lead capture (just a contact form and phone number) typically see 30-60% more leads from the same traffic after implementing an AI chatbot and behavioural triggers. Businesses that already have some automation in place see smaller but still meaningful improvements, typically 15-25%. The key variable is your current traffic volume."
      }
    },
    {
      "@type": "Question",
      "name": "Will an AI chatbot annoy my website visitors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A poorly implemented chatbot will, yes. But a well-implemented one — one that waits before engaging, offers genuine help, is easy to dismiss, and is honest about being AI — consistently improves the visitor experience. The key is giving visitors at least 15-30 seconds before engaging, making the close button obvious, and having a clear escalation path to a human."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum traffic level where AI lead generation makes sense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you get at least 300-500 unique visitors per month, AI lead capture tools can make a noticeable difference. Below that level, focus first on driving more traffic through SEO, content, and local marketing before investing in conversion optimization. For AI phone agents, the threshold is lower — even a handful of missed calls per week translates to lost revenue for appointment-based businesses."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a developer to set this up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most of the tools mentioned (Tidio, Calendly, OptinMonster, HubSpot) can be set up without a developer. Installing a chatbot widget, configuring an email sequence, or setting up a Zapier workflow requires no coding. More advanced implementations — custom chatbot flows in Voiceflow, complex lead scoring models, or integration with custom-built systems — may benefit from developer support or agency help."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Content />
    </>
  );
}
