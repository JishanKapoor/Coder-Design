import type { Metadata } from "next";
import About from "./content";

export const metadata: Metadata = {
  title: "About CoderDesign | Software Developers Toronto",
  description:
    "Meet the CoderDesign team. Toronto software development studio founded in 2023. Custom web apps, mobile apps, AI automation, and SEO for startups and SMBs. (437) 239-2448.",
  keywords:
    "about CoderDesign, software development company Toronto, Toronto software developers, CoderDesign team, web development agency Toronto, AI automation company Toronto, custom software Toronto, app developers GTA",
  openGraph: {
    title: "About CoderDesign | Software Developers Toronto",
    description: "Meet the CoderDesign team. Toronto software development studio founded in 2023. Custom web apps, mobile apps, AI automation, and SEO.",
    url: "https://coderdesign.com/about/",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Team Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About CoderDesign | Software Developers Toronto",
    description: "Meet the CoderDesign team. Toronto software development studio. 30+ projects delivered for startups and SMBs.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/about/",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://coderdesign.com/#organization",
  "name": "CoderDesign",
  "alternateName": ["Coder Design", "CoderDesign Toronto"],
  "url": "https://coderdesign.com",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://coderdesign.com/#logo",
    "url": "https://coderdesign.com/og-image.png",
    "width": 1200,
    "height": 630
  },
  "image": "https://coderdesign.com/og-image.png",
  "description": "CoderDesign is a Toronto-based software development studio founded in 2023, specializing in custom web applications, mobile app development, AI automation, and SEO services. 30+ projects delivered for startups and small-to-medium businesses across the Greater Toronto Area.",
  "foundingDate": "2023",
  "foundingLocation": {
    "@type": "Place",
    "name": "Toronto, Ontario, Canada",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "addressCountry": "CA"
    }
  },
  "brand": {
    "@type": "Brand",
    "name": "CoderDesign",
    "url": "https://coderdesign.com",
    "slogan": "Toronto Software Development Company"
  },
  "slogan": "Toronto Software Development Company",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7 Grosvenor Street",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M4Y 0E2",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.6655",
    "longitude": "-79.3848"
  },
  "telephone": "+14372392448",
  "email": "hello@coderdesign.com",
  "openingHours": "Mo-Fr 09:00-18:00",
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 4 },
  "knowsAbout": [
    "Software Development", "Custom Web Application Development", "Mobile App Development",
    "React", "Next.js", "Node.js", "Python", "Django", "TypeScript",
    "React Native", "Flutter", "Swift", "Kotlin",
    "AI Automation", "Artificial Intelligence", "Intelligent Automation", "Chatbot Development", "OpenAI Integration",
    "Search Engine Optimization", "Technical SEO", "Answer Engine Optimization",
    "SaaS Development", "E-commerce Development", "Enterprise Software"
  ],
  "knowsLanguage": ["English"],
  "areaServed": [
    { "@type": "City", "name": "Toronto" },
    { "@type": "AdministrativeArea", "name": "Greater Toronto Area" },
    { "@type": "AdministrativeArea", "name": "Ontario" },
    { "@type": "Country", "name": "Canada" }
  ],
  "sameAs": [
    "https://www.linkedin.com/in/coder-design-905aa5390/",
    "https://www.instagram.com/coderdesigngroup/",
    "https://medium.com/@coderdesign"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Sales",
    "telephone": "+14372392448",
    "email": "hello@coderdesign.com",
    "areaServed": "CA",
    "availableLanguage": ["English"]
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software Development Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Application Development", "url": "https://coderdesign.com/full-stack-engineering" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development", "url": "https://coderdesign.com/mobile-app-development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Automation and Chatbot Development", "url": "https://coderdesign.com/ai-workflow" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services Toronto", "url": "https://coderdesign.com/seo-management" } }
    ]
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <About />
    </>
  );
}
