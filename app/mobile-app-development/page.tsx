import type { Metadata } from "next";
import MobileAppDevelopment from "./content";

export const metadata: Metadata = {
  title: "Mobile App Development Toronto | CoderDesign",
  description:
    "Mobile app developers in Toronto. iOS, Android, React Native, and Flutter apps for startups and enterprises. Free project estimate: (437) 239-2448.",
  keywords:
    "mobile app development Toronto, app development company Toronto, iOS developer Toronto, Android app development Toronto, React Native Toronto, Flutter developers Toronto, app developers Toronto, mobile app agency GTA, startup app development Toronto",
  openGraph: {
    title: "Mobile App Development Company Toronto | CoderDesign",
    description: "iOS and Android app development in Toronto using React Native, Flutter, Swift, and Kotlin. Call (437) 239-2448.",
    url: "https://coderdesign.com/mobile-app-development",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Mobile App Development Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development Company Toronto | CoderDesign",
    description: "iOS and Android app development with React Native, Flutter, Swift, and Kotlin. Call (437) 239-2448.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/mobile-app-development",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://coderdesign.com/mobile-app-development/#service",
  "name": "Mobile App Development Toronto",
  "serviceType": "Mobile App Development",
  "description": "iOS and Android mobile app development company in Toronto. CoderDesign builds cross-platform apps using React Native and Flutter, and native apps using Swift and Kotlin for startups and enterprises across the Greater Toronto Area.",
  "url": "https://coderdesign.com/mobile-app-development",
  "provider": { "@id": "https://coderdesign.com/#organization" },
  "areaServed": [
    { "@type": "City", "name": "Toronto" },
    { "@type": "AdministrativeArea", "name": "Greater Toronto Area" },
    { "@type": "Country", "name": "Canada" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Mobile Development Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "React Native Cross-Platform Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flutter App Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "iOS App Development with Swift" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Android App Development with Kotlin" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "App Store and Google Play Submission" } }
    ]
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Should I build a native app or a cross platform app?", "acceptedAnswer": { "@type": "Answer", "text": "Native apps (Swift/Kotlin) offer best performance. Cross platform frameworks like React Native and Flutter ship to both platforms faster at lower cost. For most businesses, React Native covers 95% of use cases at 40% less development time." }},
    { "@type": "Question", "name": "How long does it take to build a mobile app?", "acceptedAnswer": { "@type": "Answer", "text": "A simple app takes 2 to 3 months. Apps with advanced features like real time messaging or AI take 4 to 6 months including design, development, testing, and store submission." }},
    { "@type": "Question", "name": "Do you handle App Store and Google Play submission?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we manage the full submission process for both stores including screenshots, store descriptions, review guidelines compliance, analytics setup, and handling any rejections." }},
    { "@type": "Question", "name": "Can you update or fix my existing mobile app?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We offer maintenance packages covering bug fixes, OS updates, new features, performance optimization, and security patches to bring any app up to current standards." }},
    { "@type": "Question", "name": "How do I get started with mobile app development?", "acceptedAnswer": { "@type": "Answer", "text": "It starts with a free consultation where we discuss your app idea, target audience, and business goals. From there we create a detailed project roadmap covering design, development, testing, and launch. Contact us to schedule your free consultation." }}
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
      <MobileAppDevelopment />
    </>
  );
}
