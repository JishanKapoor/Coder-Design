import type { Metadata } from "next";
import AIWorkflowDetail from "./content";

export const metadata: Metadata = {
  title: "SEO Company Toronto | AI Powered SEO | CoderDesign",
  description:
    "Toronto SEO company. AI powered search optimization, local SEO, technical audits, content strategy, and link building. Get a free SEO audit: (437) 239-2448.",
  keywords:
    "SEO company Toronto, SEO services Toronto, local SEO Toronto, AI SEO Toronto, technical SEO audit Toronto, content strategy Toronto, link building Toronto, answer engine optimization, Toronto SEO agency, best SEO company Toronto, Google rankings Toronto",
  openGraph: {
    title: "SEO Company Toronto | AI Powered SEO Services | CoderDesign",
    description: "Toronto SEO company. AI powered SEO, local SEO, technical audits, content strategy, and link building. Call (437) 239-2448.",
    url: "https://coderdesign.com/seo-management/",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign SEO Services Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Company Toronto | CoderDesign",
    description: "AI powered SEO services for Toronto businesses. Local SEO, technical audits, and AEO. Call (437) 239-2448.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/seo-management/",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://coderdesign.com/seo-management/#service",
  "name": "SEO Services Toronto",
  "serviceType": "Search Engine Optimization",
  "description": "AI-powered SEO company in Toronto. CoderDesign delivers technical SEO audits, local SEO, content strategy, link building, and Answer Engine Optimization (AEO) for businesses across the Greater Toronto Area and Canada.",
  "url": "https://coderdesign.com/seo-management",
  "provider": { "@id": "https://coderdesign.com/#organization" },
  "areaServed": [
    { "@type": "City", "name": "Toronto" },
    { "@type": "AdministrativeArea", "name": "Greater Toronto Area" },
    { "@type": "Country", "name": "Canada" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "SEO Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical SEO Audit and Optimization" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO for Toronto Businesses" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI-Powered Content Strategy" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Link Building and Digital PR" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Answer Engine Optimization (AEO)" } }
    ]
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How long does it take to see results from SEO?", "acceptedAnswer": { "@type": "Answer", "text": "Most clients see initial ranking improvements within 2 to 3 months. Significant results like first page rankings for competitive keywords typically show up around the 4 to 6 month mark." }},
    { "@type": "Question", "name": "What is the difference between on page and off page SEO?", "acceptedAnswer": { "@type": "Answer", "text": "On page SEO covers everything on your website: content, meta tags, page speed, and mobile friendliness. Off page SEO builds authority through backlinks, brand mentions, and local citations. You need both to rank well." }},
    { "@type": "Question", "name": "Do you guarantee first page Google rankings?", "acceptedAnswer": { "@type": "Answer", "text": "No honest SEO company can guarantee specific rankings because Google updates its algorithm hundreds of times a year. What we guarantee is a proven process with a track record of 300% average traffic increases." }},
    { "@type": "Question", "name": "How do you track and report on SEO progress?", "acceptedAnswer": { "@type": "Answer", "text": "You get detailed monthly reports covering organic traffic, keyword rankings, domain authority, conversion rates, and ROI using Google Search Console, Google Analytics, and professional SEO tools." }},
    { "@type": "Question", "name": "Should I invest in SEO or paid advertising?", "acceptedAnswer": { "@type": "Answer", "text": "Both have their place. Paid ads give immediate traffic but stop when you stop paying. SEO takes longer but generates compounding returns with higher ROI. We recommend starting both and gradually shifting budget to SEO." }}
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
