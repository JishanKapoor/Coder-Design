import HomeContent from "./homepage-content";

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@type": ["SoftwareHouse", "ProfessionalService", "LocalBusiness"],
  "@id": "https://coderdesign.com/#business",
  "name": "CoderDesign",
  "alternateName": ["Coder Design", "CoderDesign Toronto"],
  "description": "CoderDesign is a Toronto-based software development company specializing in custom web applications, mobile app development, AI automation, and SEO services. Founded in Toronto, Ontario, Canada, CoderDesign has delivered over 100 projects for startups and enterprises across the Greater Toronto Area.",
  "url": "https://coderdesign.com",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://coderdesign.com/#logo",
    "url": "https://coderdesign.com/og-image.png",
    "width": 1200,
    "height": 630
  },
  "image": "https://coderdesign.com/og-image.png",
  "foundingDate": "2020",
  "foundingLocation": {
    "@type": "Place",
    "name": "Toronto, Ontario, Canada"
  },
  "brand": {
    "@type": "Brand",
    "name": "CoderDesign",
    "url": "https://coderdesign.com",
    "logo": "https://coderdesign.com/og-image.png",
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
  "priceRange": "$$$",
  "openingHours": "Mo-Fr 09:00-18:00",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "knowsAbout": [
    "Software Development", "Custom Web Application Development", "Mobile App Development",
    "React", "Next.js", "Node.js", "Python", "Django", "TypeScript",
    "React Native", "Flutter", "Swift", "Kotlin",
    "AI Automation", "Machine Learning", "Chatbot Development", "OpenAI",
    "AI Voice Bot", "Voice Bot Development", "OpenAI Integration",
    "Search Engine Optimization", "Technical SEO", "Answer Engine Optimization",
    "SaaS Development", "E-commerce Development"
  ],
  "knowsLanguage": ["English"],
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 10 },
  "parentOrganization": { "@id": "https://coderdesign.com/#organization" },
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
          "url": "https://coderdesign.com/full-stack-engineering",
          "description": "Full stack web development using React, Next.js, Node.js, Python, and Django. Custom SaaS platforms, e-commerce sites, and enterprise web applications for Toronto businesses."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Development",
          "url": "https://coderdesign.com/mobile-app-development",
          "description": "iOS and Android mobile app development using React Native, Flutter, Swift, and Kotlin. From concept to App Store launch for startups and enterprises."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Automation, Voice Bots, and Chatbot Development",
          "url": "https://coderdesign.com/ai-workflow",
          "description": "AI powered workflow automation, AI voice bots, and chatbot development using n8n, Make, OpenAI integration, and custom LLMs. Data pipelines, predictive analytics, and intelligent agents for Toronto businesses."
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
