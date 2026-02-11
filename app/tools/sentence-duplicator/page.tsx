import type { Metadata } from "next";
import SentenceDuplicatorTool from "./content";

export const metadata: Metadata = {
  title: "Sentence Duplicator — Free Online Tool | CoderDesign",
  description: "Duplicate each sentence in your text a specified number of times. Free, private, instant.",
  keywords: ["sentence duplicator", "repeat sentences", "duplicate sentences", "sentence repeater", "text tool", "free online tool"],
  openGraph: { title: "Sentence Duplicator — Free Online Tool", description: "Duplicate each sentence in your text a specified number of times.", url: "https://www.coderdesign.com/tools/sentence-duplicator", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Sentence Duplicator — Free Online Tool | CoderDesign", description: "Duplicate each sentence in your text a specified number of times." },
  alternates: { canonical: "https://www.coderdesign.com/tools/sentence-duplicator" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Sentence Duplicator", url: "https://www.coderdesign.com/tools/sentence-duplicator", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Duplicate each sentence in your text a specified number of times." }) }} />
      <SentenceDuplicatorTool />
    </>
  );
}
