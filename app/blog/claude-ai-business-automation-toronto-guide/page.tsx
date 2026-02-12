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
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Claude 4.6 and what is new?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude 4.6 is Anthropic's latest flagship AI model released in early 2026. Key upgrades include a dramatically improved extended thinking mode for multi-step reasoning, native tool use that lets Claude call external APIs and databases on its own, computer use for navigating desktop applications autonomously, a 200K token context window, significantly reduced hallucination rates, and faster response times compared to Claude Opus 4. It is available through the Anthropic API, AWS Bedrock, and Google Vertex AI."
      }
    },
    {
      "@type": "Question",
      "name": "How much does Claude 4.6 cost for business use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude 4.6 is available through multiple pricing tiers. Claude Pro costs $20 USD per month per user for direct access. API pricing is approximately $3 per million input tokens and $15 per million output tokens for the full Claude 4.6 model. Claude Sonnet 4 offers a lower-cost alternative at $1/$5 per million tokens. Most Toronto small businesses spend $100 to $500 per month on Claude API usage for moderate automation workloads."
      }
    },
    {
      "@type": "Question",
      "name": "Can Claude 4.6 handle confidential business data securely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Anthropic's API does not use your data for model training. Claude 4.6 maintains SOC 2 Type II compliance. For Canadian businesses with data residency requirements, deploy Claude through AWS Bedrock in the ca-central-1 Montreal region to keep all data within Canadian infrastructure. Enterprise plans include additional admin controls, audit logging, and SSO integration."
      }
    },
    {
      "@type": "Question",
      "name": "What can Claude 4.6 do that previous versions could not?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude 4.6 introduces three major capabilities: extended thinking mode that lets the model reason through complex problems step by step before responding, native tool use that enables Claude to call APIs, query databases, and interact with external services autonomously, and computer use that allows Claude to navigate desktop applications by reading screens and clicking interfaces. These features make Claude 4.6 suitable for fully autonomous business workflows rather than just text generation."
      }
    },
    {
      "@type": "Question",
      "name": "Should Toronto businesses upgrade to Claude 4.6 from Claude Opus 4?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, for most use cases. Claude 4.6 offers better reasoning, lower hallucination rates, and faster response times at the same price point as Claude Opus 4. The extended thinking and tool use capabilities unlock automation workflows that were not possible with previous versions. Businesses already using Claude Opus 4 via the API can switch by updating the model parameter in their API calls."
      }
    }
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Content />
    </>
  );
}
