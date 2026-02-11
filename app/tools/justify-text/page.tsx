import type { Metadata } from "next";
import JustifyTextTool from "./content";

export const metadata: Metadata = {
  title: "Justify Text — Free Online Tool | CoderDesign",
  description: "Justify and align text to a fixed line width. Words are spaced evenly to fill each line. Free online justify tool — fast, private, no login needed.",
  keywords: ["justify text", "full justify", "text alignment", "even spacing", "fixed width text", "paragraph formatter", "free text tool"],
  openGraph: { title: "Justify Text — Free Online Tool", description: "Justify and align text to a fixed line width. Words are spaced evenly to fill each line.", url: "https://www.coderdesign.com/tools/justify-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Justify Text — Free Online Tool | CoderDesign", description: "Justify and align text to a fixed line width with even word spacing." },
  alternates: { canonical: "https://www.coderdesign.com/tools/justify-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Justify Text", url: "https://www.coderdesign.com/tools/justify-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Justify and align text to a fixed line width. Words are spaced evenly to fill each line." }) }} />
      <JustifyTextTool />
    </>
  );
}
