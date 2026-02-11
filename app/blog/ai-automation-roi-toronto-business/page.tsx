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
    url: `https://coderdesign.com/blog/${meta.slug}/`,
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
    canonical: `https://coderdesign.com/blog/${meta.slug}/`,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": meta.title,
  "description": meta.short_description,
  "author": [{ "@type": "Person", "name": "CoderDesign Team", "jobTitle": "Software Development Team", "url": "https://coderdesign.com/about/", "worksFor": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" } }],
  "publisher": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization", "url": "https://coderdesign.com/", "logo": { "@type": "ImageObject", "url": "https://coderdesign.com/og-image.png" } },
  "datePublished": meta.createdAt,
  "dateModified": meta.createdAt,
  "image": meta.image ? `https://coderdesign.com${meta.image}` : "https://coderdesign.com/og-image.png",
  "url": `https://coderdesign.com/blog/${meta.slug}/`,
  "mainEntityOfPage": `https://coderdesign.com/blog/${meta.slug}/`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long until I see ROI from AI automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For focused, single-workflow automations like lead capture and routing, most businesses see measurable time savings within the first few weeks. Revenue impact from faster lead response typically becomes visible within the first month. Larger multi-workflow projects usually reach clearly positive ROI within a few months of launch."
      }
    },
    {
      "@type": "Question",
      "name": "What if my business is too small to justify the investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The threshold is lower than most people think. If you or anyone on your team spends more than 5-10 hours per week on repetitive, automatable tasks, the math usually works. Solo operators and businesses with 2-5 employees often see the fastest payback because every hour saved goes directly to the owner's time."
      }
    },
    {
      "@type": "Question",
      "name": "Should I start with a pilot or go all-in on AI automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Always start with a pilot — one well-defined workflow that you can measure. This gives you real data on time savings and impact, builds internal confidence, and gives you a working relationship with the agency or tools before committing to a larger scope."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between ROI from time savings and ROI from revenue growth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Time savings are the most predictable and measurable — you can track hours before and after with high confidence. Revenue growth from automation is real but harder to attribute precisely because other factors also influence revenue. The best approach is to plan conservatively based on time savings alone, and treat revenue gains as an upside bonus."
      }
    },
    {
      "@type": "Question",
      "name": "How do I track ROI after implementing AI automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set up a simple dashboard that tracks key metrics weekly: lead response time, number of leads processed, conversion rate, hours spent on admin tasks, and invoices sent on time. Compare these against your pre-automation baselines. Most automation platforms also provide execution logs and analytics."
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
