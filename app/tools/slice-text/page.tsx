import type { Metadata } from "next";
import SliceTextTool from "./content";

export const metadata: Metadata = {
  title: "Slice Text — Free Online Tool | CoderDesign",
  description: "Slice text by character position or regex pattern. Extract specific portions of your text instantly. Free, fast, and private.",
  keywords: ["slice text", "extract text", "substring", "text position", "regex extract", "text slicer", "free text tool"],
  openGraph: { title: "Slice Text — Free Online Tool", description: "Slice text by character position or regex pattern. Extract specific portions of your text.", url: "https://www.coderdesign.com/tools/slice-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Slice Text — Free Online Tool | CoderDesign", description: "Slice text by character position or regex pattern." },
  alternates: { canonical: "https://www.coderdesign.com/tools/slice-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Slice Text", url: "https://www.coderdesign.com/tools/slice-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Slice text by character position or regex pattern. Extract specific portions of your text." }) }} />
      <SliceTextTool />
    </>
  );
}
