import type { Metadata } from "next";
import TruncateTextTool from "./content";

export const metadata: Metadata = {
  title: "Truncate Text — Free Online Tool | CoderDesign",
  description: "Remove words or characters from the end of your text. Set max length by character or word count. Free, fast, and private.",
  keywords: ["truncate text", "shorten text", "cut text", "limit text length", "character limit", "word limit", "free text tool"],
  openGraph: { title: "Truncate Text — Free Online Tool", description: "Remove words or characters from the end of your text. Set max length by character or word count.", url: "https://www.coderdesign.com/tools/truncate-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Truncate Text — Free Online Tool | CoderDesign", description: "Remove words or characters from the end of your text." },
  alternates: { canonical: "https://www.coderdesign.com/tools/truncate-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Truncate Text", url: "https://www.coderdesign.com/tools/truncate-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Remove words or characters from the end of your text. Set max length by character or word count." }) }} />
      <TruncateTextTool />
    </>
  );
}
