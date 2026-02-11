import type { Metadata } from "next";
import WrapTextTool from "./content";

export const metadata: Metadata = {
  title: "Wrap Text — Free Online Tool | CoderDesign",
  description: "Wrap text to a maximum line width by word or character boundary. Free online text-wrap tool — fast, private, no login needed.",
  keywords: ["wrap text", "word wrap", "line wrap", "text wrap online", "character wrap", "line break inserter", "free text tool"],
  openGraph: { title: "Wrap Text — Free Online Tool", description: "Wrap text to a maximum line width by word or character boundary.", url: "https://www.coderdesign.com/tools/wrap-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Wrap Text — Free Online Tool | CoderDesign", description: "Wrap text to a maximum line width by word or character boundary." },
  alternates: { canonical: "https://www.coderdesign.com/tools/wrap-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Wrap Text", url: "https://www.coderdesign.com/tools/wrap-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Wrap text to a maximum line width by word or character boundary." }) }} />
      <WrapTextTool />
    </>
  );
}
