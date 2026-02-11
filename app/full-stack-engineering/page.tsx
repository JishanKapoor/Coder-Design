import type { Metadata } from "next";
import FullStackEngineering from "./content";

export const metadata: Metadata = {
  title: "Custom Web Development Toronto | CoderDesign",
  description:
    "Custom web development company in Toronto. React, Next.js, Node.js, and Python experts building scalable apps for startups and enterprises. (437) 239-2448.",
  keywords:
    "web development company Toronto, custom software development Toronto, React developers Toronto, Node.js development Toronto, Python Django Toronto, Next.js agency Toronto, web application development Toronto, full stack developers Toronto, SaaS development Toronto, enterprise software Toronto",
  openGraph: {
    title: "Custom Web Development Toronto | CoderDesign",
    description: "Expert React, Next.js, Node.js, Python, and Django developers in Toronto building scalable web applications. Call (437) 239-2448.",
    url: "https://coderdesign.com/full-stack-engineering/",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Web Development Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Web Development Toronto | CoderDesign",
    description: "Expert React, Next.js, Node.js, Python, and Django developers in Toronto. Call (437) 239-2448.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/full-stack-engineering/",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://coderdesign.com/full-stack-engineering/#service",
  "name": "Custom Web Application Development Toronto",
  "serviceType": "Web Development",
  "description": "Full-stack web development company in Toronto specializing in React, Next.js, Node.js, Python, and Django. CoderDesign builds custom SaaS platforms, enterprise web applications, and e-commerce solutions for startups and businesses across the Greater Toronto Area.",
  "url": "https://coderdesign.com/full-stack-engineering",
  "provider": { "@id": "https://coderdesign.com/#organization" },
  "areaServed": [
    { "@type": "City", "name": "Toronto" },
    { "@type": "AdministrativeArea", "name": "Greater Toronto Area" },
    { "@type": "Country", "name": "Canada" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "React and Next.js Frontend Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Node.js and Python Backend Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom SaaS Platform Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Web Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enterprise Application Modernization" } }
    ]
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What technologies do you use for web development?", "acceptedAnswer": { "@type": "Answer", "text": "Our Toronto team works with React, Next.js, Node.js, Python, Django, PostgreSQL, MongoDB, Redis, AWS, and Google Cloud. We pick the right stack based on your project goals, expected traffic, and long term scalability needs." }},
    { "@type": "Question", "name": "How long does a web development project take?", "acceptedAnswer": { "@type": "Answer", "text": "A straightforward web application usually takes 4 to 8 weeks from kickoff to launch. More complex enterprise platforms with custom integrations can take 3 to 6 months. We give you a detailed timeline during the free consultation." }},
    { "@type": "Question", "name": "Do you offer ongoing maintenance after launch?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every project comes with a post launch support period, and we offer monthly maintenance packages that cover bug fixes, security patches, performance monitoring, and feature updates." }},
    { "@type": "Question", "name": "Can you modernize or scale my existing application?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We do full code and infrastructure audits, then tackle bottlenecks through database optimization, API refactoring, cloud migration, caching, and frontend modernization to React or Next.js." }},
    { "@type": "Question", "name": "What does your development process look like?", "acceptedAnswer": { "@type": "Answer", "text": "We follow agile methodology with two week sprints. You get regular demos, direct Slack access to your development team, and weekly status calls. Full transparency from day one." }}
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
      <FullStackEngineering />
    </>
  );
}
