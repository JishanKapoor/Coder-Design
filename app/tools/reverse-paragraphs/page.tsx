import type { Metadata } from "next";
import ReverseParagraphsTool from "./content";

export const metadata: Metadata = {
  title: "Reverse Paragraphs — Free Online Tool | CoderDesign",
  description: "Reverse the order of entire paragraphs in your text. Paragraphs separated by blank lines. Free, private, instant.",
  keywords: ["reverse paragraphs", "flip paragraphs", "paragraph order reverser", "reverse paragraph order", "text tool", "free online tool"],
  openGraph: { title: "Reverse Paragraphs — Free Online Tool", description: "Reverse the order of paragraphs in your text instantly.", url: "https://www.coderdesign.com/tools/reverse-paragraphs", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Reverse Paragraphs — Free Online Tool | CoderDesign", description: "Reverse the order of paragraphs in your text instantly." },
  alternates: { canonical: "https://www.coderdesign.com/tools/reverse-paragraphs" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Reverse Paragraphs", url: "https://www.coderdesign.com/tools/reverse-paragraphs", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Reverse the order of paragraphs in your text instantly." }) }} />
      <ReverseParagraphsTool />
    </>
  );
}
