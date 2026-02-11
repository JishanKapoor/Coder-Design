import type { Metadata } from "next";
import MetaTagsCheckerTool from "./content";

export const metadata: Metadata = {
  title: "Meta Tags Checker & Preview — Free Online Tool | CoderDesign",
  description: "Check and preview how your meta tags appear in Google, Twitter, and Facebook. Validate title, description, and Open Graph tags.",
  keywords: ["meta tags checker", "meta tag preview", "google serp preview", "open graph checker", "twitter card preview", "seo meta tags", "title tag checker", "meta description checker"],
  openGraph: { title: "Meta Tags Checker & Preview — Free Online Tool", description: "Preview how your meta tags appear in Google, Twitter, and Facebook.", url: "https://www.coderdesign.com/tools/meta-tags-checker", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Meta Tags Checker & Preview — Free Online Tool | CoderDesign", description: "Preview how your meta tags appear in Google, Twitter, and Facebook.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/meta-tags-checker" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Meta Tags Checker & Preview", url: "https://www.coderdesign.com/tools/meta-tags-checker", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Preview how your meta tags appear in Google, Twitter, and Facebook.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <MetaTagsCheckerTool />
    </>
  );
}
