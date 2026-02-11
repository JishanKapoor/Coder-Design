import type { Metadata } from "next";
import WordDuplicatorTool from "./content";

export const metadata: Metadata = {
  title: "Word Duplicator — Free Online Tool | CoderDesign",
  description: "Repeat each word in your text a specified number of times. Useful for emphasis and text effects. Free, private, instant.",
  keywords: ["word duplicator", "repeat words", "duplicate words", "word repeater", "text effects", "free text tool", "online word tool"],
  openGraph: { title: "Word Duplicator — Free Online Tool", description: "Repeat each word in your text a specified number of times.", url: "https://www.coderdesign.com/tools/word-duplicator", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Word Duplicator — Free Online Tool | CoderDesign", description: "Repeat each word in your text a specified number of times." },
  alternates: { canonical: "https://www.coderdesign.com/tools/word-duplicator" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Word Duplicator", url: "https://www.coderdesign.com/tools/word-duplicator", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Repeat each word in your text a specified number of times." }) }} />
      <WordDuplicatorTool />
    </>
  );
}
