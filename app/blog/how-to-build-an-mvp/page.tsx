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
      "name": "What is an MVP in software development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An MVP (minimum viable product) is the simplest version of a product that delivers core value to users. It includes only the essential features needed to solve the primary problem, allowing you to launch quickly, gather real user feedback, and iterate based on data rather than assumptions."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build an MVP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most MVPs take 6 to 12 weeks to build, depending on complexity. A simple MVP with 3-5 core features can be ready in 6-8 weeks. More complex MVPs with user authentication, payment processing, and third-party integrations typically take 10-12 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "What features should an MVP include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An MVP should include only the features that solve the core problem for your target users. Use the MoSCoW method to prioritize: Must-have features that are essential, Should-have features that add significant value, Could-have features that are nice additions, and Won't-have features that are deferred to future versions."
      }
    },
    {
      "@type": "Question",
      "name": "What tech stack should I use for an MVP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For web MVPs, Next.js with React on the frontend and Node.js or Django on the backend is the most efficient choice. For mobile MVPs, React Native or Flutter lets you build for iOS and Android from a single codebase. Use PostgreSQL for your database and deploy on Vercel or AWS for scalability."
      }
    },
    {
      "@type": "Question",
      "name": "What are the biggest mistakes startups make when building an MVP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most common mistakes are: building too many features (feature creep), skipping user research, choosing overly complex technology, not defining success metrics before launch, building in isolation without user feedback, and waiting too long to launch. The goal of an MVP is to learn, not to build a perfect product."
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
