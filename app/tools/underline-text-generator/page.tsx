import type { Metadata } from "next";
import UnderlineTextGeneratorTool from "./content";

export const metadata: Metadata = {
  title: "Underline Text Generator — Free Online Tool | CoderDesign",
  description: "Add underline to any text using Unicode combining characters. Works on social media and plain text fields. Free, private, instant.",
  keywords: ["underline text generator", "underline unicode text", "underline text for social media", "underline text copy paste", "unicode underline", "combining underline", "free text tool"],
  openGraph: { title: "Underline Text Generator — Free Online Tool", description: "Add underline to text using Unicode combining characters for social media.", url: "https://www.coderdesign.com/tools/underline-text-generator", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Underline Text Generator — Free Online Tool | CoderDesign", description: "Add underline to text using Unicode combining characters for social media.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/underline-text-generator" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Underline Text Generator", url: "https://www.coderdesign.com/tools/underline-text-generator", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Add underline to text using Unicode combining characters for social media.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <UnderlineTextGeneratorTool />
    </>
  );
}
