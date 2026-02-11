import type { Metadata } from "next";
import IndentTextTool from "./content";

export const metadata: Metadata = {
  title: "Indent Text — Free Online Tool | CoderDesign",
  description: "Add custom indentation to each line of text or code. Choose spaces, tabs, or custom symbols. Free online indent tool — fast, private, no login needed.",
  keywords: ["indent text", "add indentation", "indent code", "add spaces", "add tabs", "code formatting", "free text tool"],
  openGraph: { title: "Indent Text — Free Online Tool", description: "Add custom indentation to each line of text or code.", url: "https://www.coderdesign.com/tools/indent-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Indent Text — Free Online Tool | CoderDesign", description: "Add custom indentation to each line of text or code." },
  alternates: { canonical: "https://www.coderdesign.com/tools/indent-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Indent Text", url: "https://www.coderdesign.com/tools/indent-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Add custom indentation to each line of text or code." }) }} />
      <IndentTextTool />
    </>
  );
}
