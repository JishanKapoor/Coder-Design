import type { Metadata } from "next";
import SentenceRemoverTool from "./content";

export const metadata: Metadata = {
  title: "Sentence Remover — Free Online Tool | CoderDesign",
  description: "Remove sentences containing specific keywords or patterns from your text. Free, private, instant.",
  keywords: ["sentence remover", "delete sentences", "remove sentences", "sentence filter", "keyword filter", "text tool", "free online tool"],
  openGraph: { title: "Sentence Remover — Free Online Tool", description: "Remove sentences containing specific keywords from your text.", url: "https://www.coderdesign.com/tools/sentence-remover", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Sentence Remover — Free Online Tool | CoderDesign", description: "Remove sentences containing specific keywords from your text." },
  alternates: { canonical: "https://www.coderdesign.com/tools/sentence-remover" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Sentence Remover", url: "https://www.coderdesign.com/tools/sentence-remover", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Remove sentences containing specific keywords from your text." }) }} />
      <SentenceRemoverTool />
    </>
  );
}
