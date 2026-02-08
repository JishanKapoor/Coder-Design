import HomeContent from "./homepage-content";

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "CoderDesign",
  "alternateName": "Coder Design",
  "description": "CoderDesign is a Toronto based software development company offering custom web development, mobile app development, AI automation, and SEO services for startups and enterprises across the GTA.",
  "url": "https://coderdesign.com",
  "logo": "https://coderdesign.com/og-image.png",
  "image": "https://coderdesign.com/og-image.png",
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
  "areaServed": [
    { "@type": "City", "name": "Toronto" },
    { "@type": "City", "name": "Mississauga" },
    { "@type": "City", "name": "Brampton" },
    { "@type": "City", "name": "Markham" },
    { "@type": "City", "name": "Vaughan" },
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
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Web Application Development",
          "description": "Full stack web development using React, Next.js, Node.js, Python, and Django. Custom SaaS platforms, e-commerce sites, and enterprise web applications."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Development",
          "description": "iOS and Android mobile app development using React Native, Flutter, Swift, and Kotlin. From concept to App Store launch."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Automation and Chatbot Development",
          "description": "AI powered workflow automation using n8n, Make, OpenAI, and custom LLMs. Chatbots, data pipelines, and predictive analytics."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SEO Services Toronto",
          "description": "AI powered SEO, technical SEO audits, content strategy, link building, local SEO, and answer engine optimization for Toronto businesses."
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "47"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
      />
      <HomeContent />
    </>
  );
}
