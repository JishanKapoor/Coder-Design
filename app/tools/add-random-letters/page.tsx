import type { Metadata } from "next";
import AddRandomLettersTool from "./content";

export const metadata: Metadata = {
  title: "Add Random Letters to Text — Free Online Tool | CoderDesign",
  description: "Insert random letters into words in your text. Useful for testing typo-tolerance and text corruption. Free, private, instant.",
  keywords: ["add random letters", "insert random letters", "text corruption", "typo generator", "random letter insertion", "test typo tolerance", "free text tool"],
  openGraph: { title: "Add Random Letters to Text — Free Online Tool", description: "Insert random letters into words in your text.", url: "https://www.coderdesign.com/tools/add-random-letters", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Add Random Letters to Text — Free Online Tool | CoderDesign", description: "Insert random letters into words in your text." },
  alternates: { canonical: "https://www.coderdesign.com/tools/add-random-letters" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Add Random Letters to Text", url: "https://www.coderdesign.com/tools/add-random-letters", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Insert random letters into words in your text." }) }} />
      <AddRandomLettersTool />
    </>
  );
}
