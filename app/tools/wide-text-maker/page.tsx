import type { Metadata } from "next";
import WideTextMakerTool from "./content";

export const metadata: Metadata = {
  title: "Wide Text Maker — Free Online Tool | CoderDesign",
  description: "Convert text to fullwidth Unicode characters with extra spacing. Create aesthetic wide text for social media, bios, and vaporwave aesthetics.",
  keywords: ["wide text generator", "fullwidth text", "aesthetic text", "vaporwave text", "wide unicode text", "social media text", "wide text maker", "fullwidth converter"],
  openGraph: { title: "Wide Text Maker — Free Online Tool", description: "Convert text to fullwidth Unicode characters for aesthetic wide text.", url: "https://www.coderdesign.com/tools/wide-text-maker", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Wide Text Maker — Free Online Tool | CoderDesign", description: "Convert text to fullwidth Unicode characters for aesthetic wide text.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/wide-text-maker" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Wide Text Maker", url: "https://www.coderdesign.com/tools/wide-text-maker", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Convert text to fullwidth Unicode characters for aesthetic wide text.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <WideTextMakerTool />
    </>
  );
}
