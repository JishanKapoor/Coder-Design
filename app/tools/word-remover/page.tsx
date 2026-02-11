import type { Metadata } from "next";
import WordRemoverTool from "./content";

export const metadata: Metadata = {
  title: "Word Remover — Free Online Tool | CoderDesign",
  description: "Remove specific words from your text. Enter words to remove and clean your text instantly. Free, private, no login required.",
  keywords: ["word remover", "remove words", "delete words", "text cleaner", "word filter", "free text tool", "online word remover"],
  openGraph: { title: "Word Remover — Free Online Tool", description: "Remove specific words from your text instantly.", url: "https://www.coderdesign.com/tools/word-remover", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Word Remover — Free Online Tool | CoderDesign", description: "Remove specific words from your text instantly.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/word-remover" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Word Remover", url: "https://www.coderdesign.com/tools/word-remover", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Remove specific words from your text instantly.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <WordRemoverTool />
    </>
  );
}
