import type { Metadata } from "next";
import ItalicTextGeneratorTool from "./content";

export const metadata: Metadata = {
  title: "Italic Text Generator — Free Online Tool | CoderDesign",
  description: "Convert text to italic Unicode characters that work on social media, bios, and anywhere plain text is used. Free, private, instant.",
  keywords: ["italic text generator", "italic unicode text", "italic text for social media", "italic text copy paste", "unicode italic", "instagram italic text", "twitter italic text", "free text tool"],
  openGraph: { title: "Italic Text Generator — Free Online Tool", description: "Convert text to italic Unicode characters for social media and bios.", url: "https://www.coderdesign.com/tools/italic-text-generator", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Italic Text Generator — Free Online Tool | CoderDesign", description: "Convert text to italic Unicode characters for social media and bios." },
  alternates: { canonical: "https://www.coderdesign.com/tools/italic-text-generator" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Italic Text Generator", url: "https://www.coderdesign.com/tools/italic-text-generator", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Convert text to italic Unicode characters for social media and bios." }) }} />
      <ItalicTextGeneratorTool />
    </>
  );
}
