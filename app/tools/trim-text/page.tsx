import type { Metadata } from "next";
import TrimTextTool from "./content";

export const metadata: Metadata = {
  title: "Trim Text — Free Online Tool | CoderDesign",
  description: "Trim characters from the left, right, or both sides of each line. Remove unwanted spaces, characters, or custom strings. Free and private.",
  keywords: ["trim text", "strip whitespace", "remove spaces", "trim lines", "trim characters", "free text tool"],
  openGraph: { title: "Trim Text — Free Online Tool", description: "Trim characters from the left, right, or both sides of each line.", url: "https://www.coderdesign.com/tools/trim-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Trim Text — Free Online Tool | CoderDesign", description: "Trim characters from the left, right, or both sides of each line." },
  alternates: { canonical: "https://www.coderdesign.com/tools/trim-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Trim Text", url: "https://www.coderdesign.com/tools/trim-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Trim characters from the left, right, or both sides of each line." }) }} />
      <TrimTextTool />
    </>
  );
}
