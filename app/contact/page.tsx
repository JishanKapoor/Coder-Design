import type { Metadata } from "next";
import Contact from "./content";

export const metadata: Metadata = {
  title: "Contact CoderDesign Toronto | Free Consultation",
  description:
    "Contact CoderDesign for a free consultation. Toronto software developers at 7 Grosvenor Street. Call (437) 239-2448 or email hello@coderdesign.com.",
  keywords:
    "contact CoderDesign, software development company Toronto contact, hire web developers Toronto, free software consultation Toronto, 7 Grosvenor Street Toronto, get quote software development, Toronto app developers contact",
  openGraph: {
    title: "Contact CoderDesign Toronto | Free Consultation",
    description: "Get in touch with CoderDesign at 7 Grosvenor Street, Toronto. Web development, mobile apps, AI automation, and SEO. (437) 239-2448.",
    url: "https://coderdesign.com/contact",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "Contact CoderDesign Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact CoderDesign Toronto | Free Consultation",
    description: "Get a free consultation. Call (437) 239-2448 or email hello@coderdesign.com.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/contact",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CoderDesign",
  "description": "Toronto software development company. Custom web apps, mobile apps, AI automation, and SEO.",
  "url": "https://coderdesign.com/contact",
  "telephone": "+14372392448",
  "email": "hello@coderdesign.com",
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
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Contact />
    </>
  );
}
