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
      "name": "How do I start with workflow automation for my business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start by listing your top 5 most repetitive tasks and scoring each on frequency, time per occurrence, and error-proneness. The highest-scoring task is your best first automation candidate. Then work with an agency or start with Zapier or Make and build one workflow at a time."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to change my existing tools to use AI automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Almost never. Platforms like Zapier and Make connect the tools you already use — Google Workspace, QuickBooks, Mailchimp, HubSpot, Salesforce, Calendly, Slack, and thousands more. The automation layer sits between your existing systems rather than replacing them."
      }
    },
    {
      "@type": "Question",
      "name": "Is my business too small for AI workflow automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you or anyone on your team spends more than a few hours per week on repetitive tasks, automation is worth exploring. Solo operators often benefit the most because they are the bottleneck for everything — automating lead response and scheduling can free up the equivalent of an entire workday per week."
      }
    },
    {
      "@type": "Question",
      "name": "Will AI automation feel robotic to my customers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only if you set it up lazily. AI-generated emails and chat responses are fully customizable — you control the tone, formality, and personality. A well-configured AI response is indistinguishable from one written by your best team member. It just arrives in seconds instead of hours."
      }
    },
    {
      "@type": "Question",
      "name": "What if something goes wrong with the automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every mature automation platform has error handling and notification systems built in. If a step fails, you get alerted immediately, and the workflow retries or queues the task. You also design fallback paths — if the AI is not confident, the lead routes to a human for manual review instead of guessing."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to see results from workflow automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A single workflow like lead capture to CRM to personalized follow-up can be built and tested in a few days. You will notice the impact — faster response times, cleaner data, fewer things slipping through the cracks — within the first couple of weeks."
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
