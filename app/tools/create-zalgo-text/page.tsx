import type { Metadata } from "next";
import ZalgoTextGeneratorTool from "./content";

export const metadata: Metadata = {
  title: "Zalgo Text Generator — Free Online Tool | CoderDesign",
  description: "Create creepy Zalgo text with combining Unicode characters. Add glitchy diacritical marks above and below text. Free, private, instant.",
  keywords: ["zalgo text generator", "zalgo text", "glitch text", "creepy text generator", "unicode zalgo", "cursed text", "corrupted text", "free text tool"],
  openGraph: { title: "Zalgo Text Generator — Free Online Tool", description: "Create creepy Zalgo text with combining Unicode diacritical marks.", url: "https://www.coderdesign.com/tools/create-zalgo-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Zalgo Text Generator — Free Online Tool | CoderDesign", description: "Create creepy Zalgo text with combining Unicode diacritical marks." },
  alternates: { canonical: "https://www.coderdesign.com/tools/create-zalgo-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Zalgo Text Generator", url: "https://www.coderdesign.com/tools/create-zalgo-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Create creepy Zalgo text with combining Unicode diacritical marks." }) }} />
      <ZalgoTextGeneratorTool />
    </>
  );
}
