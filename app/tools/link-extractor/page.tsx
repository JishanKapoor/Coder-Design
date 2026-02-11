import type { Metadata } from "next";
import LinkExtractorTool from "./content";

export const metadata: Metadata = {
  title: "Link Extractor — Free Online Tool | CoderDesign",
  description: "Extract all URLs and links from any text. Find http, https, ftp, and email links in your content. Free, private, instant.",
  keywords: ["link extractor", "URL extractor", "extract URLs", "find links", "email extractor", "href finder", "free text tool"],
  openGraph: { title: "Link Extractor — Free Online Tool", description: "Extract all URLs and links from any text.", url: "https://www.coderdesign.com/tools/link-extractor", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Link Extractor — Free Online Tool | CoderDesign", description: "Extract all URLs and links from any text." },
  alternates: { canonical: "https://www.coderdesign.com/tools/link-extractor" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Link Extractor", url: "https://www.coderdesign.com/tools/link-extractor", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Extract all URLs and links from any text." }) }} />
      <LinkExtractorTool />
    </>
  );
}
