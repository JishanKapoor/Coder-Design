import type { Metadata } from "next";
import BoldTextGeneratorTool from "./content";

export const metadata: Metadata = {
  title: "Bold Text Generator — Free Online Tool | CoderDesign",
  description: "Convert your text to bold Unicode characters that work on social media, bios, and anywhere plain text is used. Free, private, instant.",
  keywords: ["bold text generator", "bold unicode text", "bold text for social media", "bold text copy paste", "unicode bold", "instagram bold text", "twitter bold text", "free text tool"],
  openGraph: { title: "Bold Text Generator — Free Online Tool", description: "Convert text to bold Unicode characters for social media and bios.", url: "https://www.coderdesign.com/tools/bold-text-generator", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Bold Text Generator — Free Online Tool | CoderDesign", description: "Convert text to bold Unicode characters for social media and bios.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/bold-text-generator" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Bold Text Generator", url: "https://www.coderdesign.com/tools/bold-text-generator", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Convert text to bold Unicode characters for social media and bios.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <BoldTextGeneratorTool />
    </>
  );
}
