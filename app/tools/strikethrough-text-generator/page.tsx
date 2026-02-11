import type { Metadata } from "next";
import StrikethroughTextGeneratorTool from "./content";

export const metadata: Metadata = {
  title: "Strikethrough Text Generator — Free Online Tool | CoderDesign",
  description: "Cross out text using Unicode combining characters. Create strikethrough text for social media and messaging. Free, private, instant.",
  keywords: ["strikethrough text generator", "strikethrough unicode text", "cross out text", "strikethrough text copy paste", "unicode strikethrough", "crossed out text", "free text tool"],
  openGraph: { title: "Strikethrough Text Generator — Free Online Tool", description: "Cross out text using Unicode combining strikethrough characters.", url: "https://www.coderdesign.com/tools/strikethrough-text-generator", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Strikethrough Text Generator — Free Online Tool | CoderDesign", description: "Cross out text using Unicode combining strikethrough characters.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/strikethrough-text-generator" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Strikethrough Text Generator", url: "https://www.coderdesign.com/tools/strikethrough-text-generator", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Cross out text using Unicode combining strikethrough characters.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <StrikethroughTextGeneratorTool />
    </>
  );
}
