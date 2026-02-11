import type { Metadata } from "next";
import Privacy from "./content";

export const metadata: Metadata = {
  title: "Privacy Policy — CoderDesign | Toronto Software Company",
  description:
    "CoderDesign's privacy policy. Learn how we collect, use, and protect your personal information. PIPEDA and GDPR compliant.",
  keywords:
    "privacy policy, data protection, GDPR, PIPEDA, privacy, CoderDesign privacy",
  openGraph: {
    title: "Privacy Policy — CoderDesign",
    description: "Learn how CoderDesign collects, uses, and protects your personal information.",
    url: "https://coderdesign.com/privacy/",
    siteName: "CoderDesign",
    type: "website",
    locale: "en_CA",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — CoderDesign",
    description: "Learn how CoderDesign collects, uses, and protects your personal information.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/privacy/",
  },
};







export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            url: "https://coderdesign.com/privacy/",
            description: "CoderDesign's privacy policy detailing how personal information is collected, used, and protected.",
            publisher: { "@id": "https://coderdesign.com/#organization" },
            inLanguage: "en-CA",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://coderdesign.com/" },
                { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://coderdesign.com/privacy/" },
              ],
            },
          }),
        }}
      />
      <Privacy />
    </>
  );
}
