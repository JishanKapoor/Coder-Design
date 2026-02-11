import type { Metadata } from "next";
import DetectFakeTextTool from "./content";

export const metadata: Metadata = {
  title: "Detect Fake Unicode Text — Free Online Tool | CoderDesign",
  description: "Detect hidden Unicode characters, homoglyphs, and zero-width characters in suspicious text. Free, private, instant analysis.",
  keywords: ["detect fake text", "unicode detector", "homoglyph detector", "zero-width character finder", "hidden character detector", "unicode analysis", "text security tool"],
  openGraph: { title: "Detect Fake Unicode Text — Free Online Tool", description: "Detect hidden Unicode characters, homoglyphs, and zero-width characters in suspicious text.", url: "https://www.coderdesign.com/tools/detect-fake-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Detect Fake Unicode Text — Free Online Tool | CoderDesign", description: "Detect hidden Unicode characters, homoglyphs, and zero-width characters." },
  alternates: { canonical: "https://www.coderdesign.com/tools/detect-fake-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Detect Fake Unicode Text", url: "https://www.coderdesign.com/tools/detect-fake-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Detect hidden Unicode characters, homoglyphs, and zero-width characters in suspicious text." }) }} />
      <DetectFakeTextTool />
    </>
  );
}
