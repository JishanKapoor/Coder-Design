import type { Metadata } from "next";
import RepeatTextTool from "./content";

export const metadata: Metadata = {
  title: "Repeat Text — Free Online Tool | CoderDesign",
  description: "Repeat any text multiple times with optional separators. Free online text repeater — fast, private, no login needed.",
  keywords: ["repeat text", "text repeater", "duplicate text", "repeat string", "multiply text", "free text tool"],
  openGraph: { title: "Repeat Text — Free Online Tool", description: "Repeat any text multiple times with optional separators. Free, fast, private.", url: "https://www.coderdesign.com/tools/repeat-text", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Repeat Text — Free Online Tool | CoderDesign", description: "Repeat any text multiple times.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/repeat-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Repeat Text", url: "https://www.coderdesign.com/tools/repeat-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Repeat any text multiple times with optional separators.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <RepeatTextTool />
    </>
  );
}
