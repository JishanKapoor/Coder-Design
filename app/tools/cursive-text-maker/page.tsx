import type { Metadata } from "next";
import CursiveTextMakerTool from "./content";

export const metadata: Metadata = {
  title: "Cursive Text Maker — Free Online Tool | CoderDesign",
  description: "Convert text to elegant cursive Unicode script characters. Create fancy handwriting-style text. Free, private, instant.",
  keywords: ["cursive text maker", "cursive text generator", "script text", "fancy text", "unicode cursive", "handwriting text", "calligraphy text", "instagram cursive", "free text tool"],
  openGraph: { title: "Cursive Text Maker — Free Online Tool", description: "Convert text to elegant cursive Unicode script characters.", url: "https://www.coderdesign.com/tools/cursive-text-maker", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Cursive Text Maker — Free Online Tool | CoderDesign", description: "Convert text to elegant cursive Unicode script characters." },
  alternates: { canonical: "https://www.coderdesign.com/tools/cursive-text-maker" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Cursive Text Maker", url: "https://www.coderdesign.com/tools/cursive-text-maker", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Convert text to elegant cursive Unicode script characters." }) }} />
      <CursiveTextMakerTool />
    </>
  );
}
