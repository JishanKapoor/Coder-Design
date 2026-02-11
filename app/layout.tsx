import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://coderdesign.com"),
  title: "Software Development Company Toronto | CoderDesign",
  description:
    "Toronto software development company. Custom web apps, mobile apps, AI automation, and SEO. 100+ projects for startups and enterprises. (437) 239-2448.",
  keywords:
    "software development company Toronto, top software company in Toronto, best IT company in Toronto, AI company in Toronto, web development agency Toronto, custom software development Toronto, mobile app development Toronto, mobile apps Toronto agency, app developers Toronto, AI automation Toronto, voice bot Toronto, AI voice bot Toronto, OpenAI integration Toronto, SEO company Toronto, best software agency Toronto, React Next.js developers Toronto, full stack developers Toronto, Toronto web design, SaaS development Toronto, startup software development, ecommerce development Toronto, GTA app development, AI chatbot development Toronto, workflow automation Toronto",
  openGraph: {
    title: "Software Development Company Toronto | CoderDesign",
    description:
      "Toronto software development company. Custom web apps, mobile apps, AI automation, and SEO. Trusted by startups and enterprises across the GTA.",
    url: "https://coderdesign.com/",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Software Development Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Company Toronto | CoderDesign",
    description:
      "Toronto software development company. Custom web apps, mobile apps, AI automation, and SEO. 7 Grosvenor Street, Toronto.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.png",
  },
};

/* ── Global structured data injected on every page ── */
const globalOrganization = {
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
    "height": 630,
    "caption": "CoderDesign Logo"
  },
  "image": "https://coderdesign.com/og-image.png",
  "description": "CoderDesign is a Toronto-based software development company specializing in custom web applications, mobile app development, AI automation, and SEO services. Founded in Toronto, Ontario, Canada, CoderDesign serves startups and enterprises across the Greater Toronto Area and Canada.",
  "foundingDate": "2020",
  "foundingLocation": {
    "@type": "Place",
    "name": "Toronto, Ontario, Canada"
  },
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
  "sameAs": [
    "https://www.linkedin.com/in/coder-design-905aa5390/",
    "https://www.instagram.com/coderdesigngroup/",
    "https://medium.com/@coderdesign"
  ],
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
  "knowsAbout": [
    "Software Development",
    "Custom Web Application Development",
    "Mobile App Development",
    "React Development",
    "Next.js Development",
    "Node.js Development",
    "Python Development",
    "Django Development",
    "React Native Development",
    "Flutter Development",
    "iOS App Development",
    "Android App Development",
    "AI Automation",
    "Machine Learning",
    "Chatbot Development",
    "AI Voice Bot Development",
    "Voice Bot Toronto",
    "Workflow Automation",
    "n8n Automation",
    "OpenAI Integration",
    "Search Engine Optimization",
    "Technical SEO",
    "Local SEO",
    "Answer Engine Optimization",
    "SaaS Development",
    "E-commerce Development",
    "Enterprise Software Development"
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 10
  },
  "slogan": "Toronto Software Development Company",
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

const globalWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://coderdesign.com/#website",
  "name": "CoderDesign",
  "alternateName": "Coder Design",
  "url": "https://coderdesign.com",
  "description": "Toronto software development company offering custom web applications, mobile apps, AI automation, and SEO services for startups and enterprises.",
  "publisher": { "@id": "https://coderdesign.com/#organization" },
  "inLanguage": "en-CA"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <script async defer src="https://www.googletagmanager.com/gtag/js?id=G-LZ3LECFNNK" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LZ3LECFNNK');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalWebSite) }}
        />
        {children}
      </body>
    </html>
  );
}
