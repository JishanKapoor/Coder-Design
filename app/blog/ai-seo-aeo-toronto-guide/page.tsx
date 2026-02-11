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
      "name": "How long does it take to see results from SEO and AEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technical fixes and structured data changes can show results within days to weeks. Content-based improvements typically take 2-4 months to impact rankings meaningfully. Local SEO improvements can show results within a few weeks. Building topical authority is a 6-12 month process that compounds over time."
      }
    },
    {
      "@type": "Question",
      "name": "Should I create separate content for AI search vs traditional search?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The same content can serve both \u2014 the key is how you structure it. Write comprehensive, well-structured content that answers questions clearly, is technically optimized, and includes structured data. Creating separate content would be duplicative and counterproductive."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to worry about AI tools stealing my traffic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For complex, high-intent queries that drive business \u2014 like hiring an agency or choosing a CRM \u2014 users still want to explore options and engage directly with businesses. Optimize for being cited as the source, and ensure your content offers enough depth that users want to visit your site for the full picture."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use AI to write my SEO content?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI writing tools can accelerate content creation and are excellent for first drafts, outlines, and research. But publishing AI-generated content without significant human editing and original insight is a losing strategy. Google's Helpful Content guidelines explicitly value first-hand experience and expertise."
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
