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
      "name": "How much does it cost to build a custom web application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A custom web application typically costs between $25,000 and $250,000+ depending on complexity. A simple MVP with core features runs $25,000–$60,000, a mid-complexity app with integrations costs $60,000–$150,000, and enterprise-grade platforms start at $150,000 and up."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect custom software development pricing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main cost drivers are: project complexity and number of features, technology stack (AI/ML adds cost), number of integrations (payment gateways, APIs), design requirements (custom UI/UX vs templates), security and compliance needs (HIPAA, SOC 2), and ongoing maintenance requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Is it cheaper to hire developers in Toronto or offshore?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Offshore developers charge $25–$60/hour vs $120–$200/hour for Toronto-based teams. However, Toronto teams typically deliver 30–50% faster due to fewer communication delays, timezone alignment, and higher code quality — often making the total project cost comparable while reducing risk significantly."
      }
    },
    {
      "@type": "Question",
      "name": "How long does custom software development take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Timelines vary by scope: MVPs take 6–12 weeks, mid-complexity applications take 3–6 months, and enterprise platforms take 6–18 months. Agile development with 2-week sprints helps deliver working software incrementally rather than waiting for a big-bang release."
      }
    },
    {
      "@type": "Question",
      "name": "How can I reduce custom software development costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start with an MVP (minimum viable product) to validate your idea before building the full platform. Use proven frameworks like Next.js and Django instead of building from scratch. Prioritize features ruthlessly — build what users need first. Choose a fixed-scope engagement to control budget, and invest in automated testing to reduce long-term maintenance costs."
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
