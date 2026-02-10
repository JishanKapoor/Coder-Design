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
      "name": "How many AI agencies should I evaluate before deciding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three to five is the sweet spot. Fewer than three and you lack comparison. More than five and the evaluation process becomes a project in itself. Start with a broad list, screen based on measurable results, phased approach, and ownership terms, then do in-depth discovery calls with your top three."
      }
    },
    {
      "@type": "Question",
      "name": "Should I choose the cheapest or most expensive AI agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Neither — choose the one that best fits your specific needs and demonstrates the clearest understanding of your business. The cheapest option often cuts corners on discovery, support, and documentation. The most expensive option may be overkill for your current stage. Evaluate based on results, process, and technical depth."
      }
    },
    {
      "@type": "Question",
      "name": "Can I start with one AI agency and switch later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if you have insisted on ownership of all code, accounts, and documentation. This is exactly why ownership matters — it gives you the freedom to bring operations in-house, switch agencies, or evolve your approach without being locked in to a single vendor."
      }
    },
    {
      "@type": "Question",
      "name": "What if I have a technical team — do I still need an AI agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on your team's AI-specific experience. General software developers are not automatically equipped to build reliable AI automations — it requires understanding of prompt engineering, workflow orchestration, and LLM-specific challenges. If your team has this experience, you may only need an agency for initial architecture and strategy."
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
