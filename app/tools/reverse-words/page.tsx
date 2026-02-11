import type { Metadata } from "next";
import ReverseWordsTool from "./content";

export const metadata: Metadata = {
  title: "Reverse Words — Free Online Tool | CoderDesign",
  description: "Reverse the order of words in each line with options for case, hyphens, and apostrophes. Free, private, instant.",
  keywords: ["reverse words", "flip words", "word order reverser", "reverse word order", "text reverser", "free text tool", "online word tool"],
  openGraph: { title: "Reverse Words — Free Online Tool", description: "Reverse the order of words in each line instantly.", url: "https://www.coderdesign.com/tools/reverse-words", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Reverse Words — Free Online Tool | CoderDesign", description: "Reverse the order of words in each line instantly.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/reverse-words" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Reverse Words", url: "https://www.coderdesign.com/tools/reverse-words", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Reverse the order of words in each line instantly.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <ReverseWordsTool />
    </>
  );
}
