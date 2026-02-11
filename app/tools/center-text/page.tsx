import type { Metadata } from "next";
import CenterTextTool from "./content";

export const metadata: Metadata = {
  title: "Center Text — Free Online Tool | CoderDesign",
  description: "Center each line of text within a custom width using padding characters. Free online center-text tool — fast, private, no login needed.",
  keywords: ["center text", "center align text", "text centering", "center padding", "fixed width center", "free text tool"],
  openGraph: { title: "Center Text — Free Online Tool", description: "Center each line of text within a custom width using padding characters.", url: "https://www.coderdesign.com/tools/center-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Center Text — Free Online Tool | CoderDesign", description: "Center each line of text within a custom width using padding characters." },
  alternates: { canonical: "https://www.coderdesign.com/tools/center-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Center Text", url: "https://www.coderdesign.com/tools/center-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Center each line of text within a custom width using padding characters." }) }} />
      <CenterTextTool />
    </>
  );
}
