import type { Metadata } from "next";
import ReverseSentencesTool from "./content";

export const metadata: Metadata = {
  title: "Reverse Sentences — Free Online Tool | CoderDesign",
  description: "Reverse the order of sentences in your text. Sentences split by period, exclamation, or question mark. Free, private, instant.",
  keywords: ["reverse sentences", "flip sentences", "sentence order reverser", "reverse sentence order", "text tool", "free online tool"],
  openGraph: { title: "Reverse Sentences — Free Online Tool", description: "Reverse the order of sentences in your text instantly.", url: "https://www.coderdesign.com/tools/reverse-sentences", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Reverse Sentences — Free Online Tool | CoderDesign", description: "Reverse the order of sentences in your text instantly." },
  alternates: { canonical: "https://www.coderdesign.com/tools/reverse-sentences" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Reverse Sentences", url: "https://www.coderdesign.com/tools/reverse-sentences", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Reverse the order of sentences in your text instantly." }) }} />
      <ReverseSentencesTool />
    </>
  );
}
