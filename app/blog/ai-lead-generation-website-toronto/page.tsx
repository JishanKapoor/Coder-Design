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
      "name": "How can AI help generate leads from my existing website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI can generate more leads from your existing website traffic in several ways: AI chatbots engage visitors in real-time conversation instead of waiting for them to fill out a form, behavioural triggers detect high-intent visitors and surface relevant offers at the right moment, AI-powered lead scoring identifies your most promising visitors, and personalized content adapts to each visitor's interests and behaviour. These tools typically increase lead capture rates by 20-50% from the same traffic."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best AI chatbot for lead generation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best AI chatbot depends on your business type and volume. Tidio is excellent for small businesses — its Lyro AI agent can be trained on your website content in minutes and handles lead qualification naturally. Intercom is better for SaaS and tech companies with higher support volumes. Drift is purpose-built for B2B lead generation with advanced routing. For custom conversational experiences, Voiceflow lets you build complex multi-step qualification flows with a visual builder."
      }
    },
    {
      "@type": "Question",
      "name": "Can AI lead generation work for small businesses in Toronto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. AI lead generation tools are particularly effective for small businesses because they level the playing field — you can provide instant, personalized responses to every website visitor without hiring additional staff. A Toronto plumber, dentist, or consultant with 500-2000 monthly website visitors can meaningfully increase their lead volume with tools like Tidio (AI chatbot), Calendly (instant booking), and automated email follow-up via Zapier or Make."
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
