import type { Metadata } from "next";
import NormalizeFakeTextTool from "./content";

export const metadata: Metadata = {
  title: "Normalize Fake Unicode Text — Free Online Tool | CoderDesign",
  description: "Clean and normalize text by removing hidden Unicode characters, homoglyphs, and zero-width characters. Free, private, instant.",
  keywords: ["normalize text", "remove homoglyphs", "clean unicode", "remove zero-width characters", "unicode normalization", "text sanitizer", "unfake text", "free text tool"],
  openGraph: { title: "Normalize Fake Unicode Text — Free Online Tool", description: "Clean and normalize text by removing hidden Unicode characters, homoglyphs, and zero-width characters.", url: "https://www.coderdesign.com/tools/normalize-fake-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Normalize Fake Unicode Text — Free Online Tool | CoderDesign", description: "Clean and normalize text by removing hidden Unicode characters and homoglyphs." },
  alternates: { canonical: "https://www.coderdesign.com/tools/normalize-fake-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Normalize Fake Unicode Text", url: "https://www.coderdesign.com/tools/normalize-fake-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Clean and normalize text by removing hidden Unicode characters, homoglyphs, and zero-width characters." }) }} />
      <NormalizeFakeTextTool />
    </>
  );
}
