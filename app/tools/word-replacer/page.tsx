import type { Metadata } from "next";
import WordReplacerTool from "./content";

export const metadata: Metadata = {
  title: "Word Replacer — Free Online Tool | CoderDesign",
  description: "Find and replace specific words in any text. Support for multiple replacements at once. Free, private, instant.",
  keywords: ["word replacer", "find and replace", "text replacer", "replace words", "multiple replacements", "free text tool", "online replace tool"],
  openGraph: { title: "Word Replacer — Free Online Tool", description: "Find and replace specific words in any text with multiple replacements.", url: "https://www.coderdesign.com/tools/word-replacer", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Word Replacer — Free Online Tool | CoderDesign", description: "Find and replace specific words in any text with multiple replacements.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/word-replacer" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Word Replacer", url: "https://www.coderdesign.com/tools/word-replacer", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Find and replace specific words in any text with multiple replacements.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <WordReplacerTool />
    </>
  );
}
