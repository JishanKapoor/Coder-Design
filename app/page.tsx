import fs from 'fs';
import path from 'path';
import HomeContent from "./homepage-content";

interface BlogMeta {
  slug: string;
  title: string;
  category: string;
  image?: string | null;
  short_description: string;
  createdAt: string;
}

function loadLatestPosts(): BlogMeta[] {
  const blogDir = path.join(process.cwd(), 'app', 'blog');
  if (!fs.existsSync(blogDir)) return [];
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const posts: BlogMeta[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const metaPath = path.join(blogDir, e.name, 'meta.json');
    if (fs.existsSync(metaPath)) {
      try {
        const meta: BlogMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        posts.push(meta);
      } catch { /* skip invalid */ }
    }
  }
  return posts.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 6);
}

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://coderdesign.com/#business",
  "name": "CoderDesign",
  "alternateName": ["Coder Design", "CoderDesign Toronto"],
  "description": "CoderDesign is a Toronto-based software development studio specializing in custom full stack web applications, mobile app development, AI-powered automation, and SEO services for startups and small-to-medium businesses.",
  "url": "https://coderdesign.com",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://coderdesign.com/#logo",
    "url": "https://coderdesign.com/og-image.png",
    "width": 1200,
    "height": 630
  },
  "image": "https://coderdesign.com/og-image.png",
  "foundingDate": "2023",
  "foundingLocation": {
    "@type": "Place",
    "name": "Toronto, Ontario, Canada"
  },
  "brand": {
    "@type": "Brand",
    "name": "CoderDesign",
    "url": "https://coderdesign.com",
    "logo": "https://coderdesign.com/og-image.png",
    "slogan": "Software Development & AI Services in Toronto"
  },
  "slogan": "Software Development & AI Services in Toronto",
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
    "AI Automation", "Artificial Intelligence", "Intelligent Automation", "Chatbot Development", "OpenAI",
    "AI Voice Bot", "Voice Bot Development", "OpenAI Integration",
    "Search Engine Optimization", "Technical SEO", "Answer Engine Optimization",
    "SaaS Development", "E-commerce Development"
  ],
  "knowsLanguage": ["English"],
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 4 },
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
};

export default function Page() {
  const latestPosts = loadLatestPosts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
      />
      <HomeContent latestPosts={latestPosts} />
    </>
  );
}
