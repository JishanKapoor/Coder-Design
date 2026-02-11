import type { Metadata } from "next";
import TinyTextGeneratorTool from "./content";

export const metadata: Metadata = {
  title: "Tiny Text Generator — Free Online Tool | CoderDesign",
  description: "Convert text to tiny superscript Unicode characters. Create small text for social media, bios, and notes. Free, private, instant.",
  keywords: ["tiny text generator", "small text generator", "superscript text", "subscript text", "mini text", "small caps", "unicode superscript", "social media text", "free text tool"],
  openGraph: { title: "Tiny Text Generator — Free Online Tool", description: "Convert text to tiny superscript Unicode characters for social media and bios.", url: "https://www.coderdesign.com/tools/tiny-text-generator", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Tiny Text Generator — Free Online Tool | CoderDesign", description: "Convert text to tiny superscript Unicode characters.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/tiny-text-generator" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Tiny Text Generator", url: "https://www.coderdesign.com/tools/tiny-text-generator", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Convert text to tiny superscript Unicode characters for social media and bios.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <TinyTextGeneratorTool />
    </>
  );
}
