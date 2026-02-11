import type { Metadata } from "next";
import TextSymbolsTool from "./content";

export const metadata: Metadata = {
  title: "Text Symbols & Special Characters — Free Online Tool | CoderDesign",
  description: "Browse and copy hundreds of special characters, symbols, emojis, and Unicode characters organized by category. Click to copy instantly.",
  keywords: ["text symbols", "special characters", "unicode symbols", "copy paste symbols", "arrows symbols", "math symbols", "currency symbols", "emoji copy paste", "symbol picker", "free symbol tool"],
  openGraph: { title: "Text Symbols & Special Characters — Free Online Tool", description: "Browse and copy hundreds of special characters, symbols, and Unicode characters.", url: "https://www.coderdesign.com/tools/text-symbols", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Text Symbols & Special Characters — Free Online Tool | CoderDesign", description: "Browse and copy hundreds of special characters and symbols.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/text-symbols" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Text Symbols & Special Characters", url: "https://www.coderdesign.com/tools/text-symbols", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Browse and copy hundreds of special characters, symbols, and Unicode characters.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <TextSymbolsTool />
    </>
  );
}
