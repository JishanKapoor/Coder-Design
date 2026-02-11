import type { Metadata } from "next";
import Terms from "./content";


export const metadata: Metadata = {
  title: "Terms & Conditions — CoderDesign | Toronto Software Company",
  description:
    "CoderDesign's terms and conditions. Review our service agreements, usage policies, and legal information.",
  keywords:
    "terms and conditions, terms of service, legal, agreements, CoderDesign terms",
  openGraph: {
    title: "Terms & Conditions — CoderDesign",
    description: "Review CoderDesign's service agreements, usage policies, and legal information.",
    url: "https://coderdesign.com/terms/",
    siteName: "CoderDesign",
    type: "website",
    locale: "en_CA",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Terms & Conditions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions — CoderDesign",
    description: "Review CoderDesign's service agreements, usage policies, and legal information.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/terms/",
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
            name: "Terms & Conditions",
            url: "https://coderdesign.com/terms/",
            description: "CoderDesign's terms and conditions covering service agreements and usage policies.",
            publisher: { "@id": "https://coderdesign.com/#organization" },
            inLanguage: "en-CA",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://coderdesign.com/" },
                { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: "https://coderdesign.com/terms/" },
              ],
            },
          }),
        }}
      />
      <Terms />
    </>
  );
}
