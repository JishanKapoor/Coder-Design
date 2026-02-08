import type { Metadata } from "next";
import About from "./content";

export const metadata: Metadata = {
  title: "About CoderDesign | Software Developers Toronto",
  description:
    "Meet the CoderDesign team. Toronto software developers with 100+ projects delivered and 50+ clients across web, mobile, AI, and SEO. (437) 239-2448.",
  keywords:
    "about CoderDesign, software development company Toronto, Toronto software developers, CoderDesign team, web development agency Toronto, AI automation company Toronto, custom software Toronto, app developers GTA",
  openGraph: {
    title: "About CoderDesign | Software Developers Toronto",
    description: "Meet the CoderDesign team. Toronto software developers with 100+ projects delivered and 50+ clients across web, mobile, AI, and SEO.",
    url: "https://coderdesign.com/about",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Team Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About CoderDesign | Software Developers Toronto",
    description: "Meet the CoderDesign team. 100+ projects delivered for startups and enterprises across the GTA.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/about",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CoderDesign",
  "url": "https://coderdesign.com",
  "logo": "https://coderdesign.com/og-image.png",
  "description": "Toronto based software development company specializing in custom web applications, mobile apps, AI automation, and SEO services.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7 Grosvenor Street",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M4Y 0E2",
    "addressCountry": "CA"
  },
  "telephone": "+14372392448",
  "email": "hello@coderdesign.com",
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 10 },
  "foundingLocation": { "@type": "Place", "name": "Toronto, Ontario, Canada" },
  "sameAs": [
    "https://www.linkedin.com/in/coder-design-905aa5390/",
    "https://www.instagram.com/coderdesigngroup/",
    "https://medium.com/@coderdesign"
  ]
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
