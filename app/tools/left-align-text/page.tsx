import type { Metadata } from "next";
import LeftAlignTextTool from "./content";

export const metadata: Metadata = {
  title: "Left-Align Text — Free Online Tool | CoderDesign",
  description: "Remove leading whitespace to align all text evenly to the left side. Option to preserve relative indentation. Free, fast, and private.",
  keywords: ["left align text", "remove indentation", "strip leading spaces", "text alignment", "dedent text", "free text tool"],
  openGraph: { title: "Left-Align Text — Free Online Tool", description: "Remove leading whitespace to align all text evenly to the left side.", url: "https://www.coderdesign.com/tools/left-align-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Left-Align Text — Free Online Tool | CoderDesign", description: "Remove leading whitespace to align all text evenly to the left side." },
  alternates: { canonical: "https://www.coderdesign.com/tools/left-align-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Left-Align Text", url: "https://www.coderdesign.com/tools/left-align-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Remove leading whitespace to align all text evenly to the left side." }) }} />
      <LeftAlignTextTool />
    </>
  );
}
