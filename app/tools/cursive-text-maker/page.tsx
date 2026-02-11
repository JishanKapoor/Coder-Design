import type { Metadata } from "next";
import CursiveTextMakerTool from "./content";

export const metadata: Metadata = {
  title: "Cursive Text Maker — Free Online Tool | CoderDesign",
  description: "Convert text to elegant cursive Unicode script characters. Create fancy handwriting-style text. Free, private, instant.",
  keywords: ["cursive text maker", "cursive text generator", "script text", "fancy text", "unicode cursive", "handwriting text", "calligraphy text", "instagram cursive", "free text tool"],
  openGraph: { title: "Cursive Text Maker — Free Online Tool", description: "Convert text to elegant cursive Unicode script characters.", url: "https://www.coderdesign.com/tools/cursive-text-maker", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Cursive Text Maker — Free Online Tool | CoderDesign", description: "Convert text to elegant cursive Unicode script characters.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/cursive-text-maker" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Cursive Text Maker", url: "https://www.coderdesign.com/tools/cursive-text-maker", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Convert text to elegant cursive Unicode script characters.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <CursiveTextMakerTool />
    </>
  );
}
