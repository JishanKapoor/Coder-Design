import type { Metadata } from "next";
import RightAlignTextTool from "./content";

export const metadata: Metadata = {
  title: "Right-Align Text — Free Online Tool | CoderDesign",
  description: "Align each line of text to the right side within a fixed width. Perfect for code formatting, reports, and monospaced layouts.",
  keywords: ["right align text", "right justify text", "pad left", "text alignment", "code formatting", "free text tool"],
  openGraph: { title: "Right-Align Text — Free Online Tool", description: "Align each line of text to the right side within a fixed width.", url: "https://www.coderdesign.com/tools/right-align-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Right-Align Text — Free Online Tool | CoderDesign", description: "Align each line of text to the right side within a fixed width." },
  alternates: { canonical: "https://www.coderdesign.com/tools/right-align-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Right-Align Text", url: "https://www.coderdesign.com/tools/right-align-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Align each line of text to the right side within a fixed width." }) }} />
      <RightAlignTextTool />
    </>
  );
}
