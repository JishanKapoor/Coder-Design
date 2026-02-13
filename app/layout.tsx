import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://coderdesign.com"),
  title: "Software Development & AI Services Toronto | CoderDesign",
  description:
    "Top AI agency and software development company in Toronto. Custom full stack website development, mobile apps, AI chatbots, call bots, intelligent automation, and AI-powered SEO services. 30+ projects delivered for startups and SMBs. (437) 239-2448.",
  keywords:
    "software development Toronto, software development company Toronto, AI services Toronto, top AI agency Toronto, AI agency in Toronto, artificial intelligence company Toronto, web development Toronto, website development Toronto, full stack development Toronto, backend developers Toronto, custom software development Toronto, mobile app development Toronto, app developers Toronto, AI automation agency, AI chatbot Toronto, AI chatbot for websites, AI call bot Toronto, automate customer support with AI, reduce support tickets with AI chatbot, AI to automate lead qualification, generative AI agency, AI development agency, AI consulting services Toronto, AI SEO agency, AI SEO agency for small business, generative engine optimization services, GEO services, LLM optimization services, LLMO Toronto, SEO Toronto, SEO company Toronto, AI automation for law firms, AI automation for real estate, AI automation for e-commerce, how to rank in AI search results, React Next.js developers Toronto, full stack developers Toronto, custom mobile app development Toronto, App Store developers Toronto, Google Play Store app development",
  openGraph: {
    title: "Software Development & AI Services Toronto | CoderDesign",
    description:
      "Top software development and AI agency in Toronto. Custom full stack web apps, mobile apps, AI automation, and SEO for startups and small-to-medium businesses.",
    url: "https://coderdesign.com/",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Software Development Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development & AI Services Toronto | CoderDesign",
    description:
      "Top software development and artificial intelligence agency in Toronto. Custom full stack web apps, mobile apps, AI automation, and SEO. 7 Grosvenor Street, Toronto.",
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
  "description": "CoderDesign is a Toronto-based software development studio specializing in custom full stack web applications, mobile app development, AI automation, and SEO services. Founded in 2023 in Toronto, Ontario, Canada, CoderDesign serves startups and small-to-medium businesses across the Greater Toronto Area.",
  "foundingDate": "2023",
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
    "Artificial Intelligence",
    "Intelligent Automation",
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
    "minValue": 2,
    "maxValue": 4
  },
  "slogan": "Software Development & AI Services in Toronto",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalWebSite) }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        {/* GTM loaded after page content — deferred to not block LCP/FCP */}
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LZ3LECFNNK" />
      </body>
    </html>
  );
}
