import type { Metadata } from "next";
import ReverseTextTool from "./content";

export const metadata: Metadata = {
  title: "Reverse Text — Free Online Tool | CoderDesign",
  description: "Reverse text, words, or lines instantly. Free online text reverser — reverse characters, flip word order, or reverse each line. Fast, private, no login.",
  keywords: ["reverse text", "text reverser", "flip text", "reverse words", "reverse string", "mirror text", "free text tool"],
  openGraph: { title: "Reverse Text — Free Online Tool", description: "Reverse text, words, or lines instantly. Free, fast, private.", url: "https://www.coderdesign.com/tools/reverse-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Reverse Text — Free Online Tool | CoderDesign", description: "Reverse text, words, or lines instantly." },
  alternates: { canonical: "https://www.coderdesign.com/tools/reverse-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Reverse Text", url: "https://www.coderdesign.com/tools/reverse-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Reverse text, words, or lines instantly." }) }} />
      <ReverseTextTool />
    </>
  );
}
