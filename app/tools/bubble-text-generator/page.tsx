import type { Metadata } from "next";
import BubbleTextGeneratorTool from "./content";

export const metadata: Metadata = {
  title: "Bubble Text Generator — Free Online Tool | CoderDesign",
  description: "Convert text to circled Unicode bubble letters. Create eye-catching text for social media and bios. Free, private, instant.",
  keywords: ["bubble text generator", "bubble letters", "circled text", "circle text generator", "unicode bubble text", "bubble font", "instagram bubble text", "free text tool"],
  openGraph: { title: "Bubble Text Generator — Free Online Tool", description: "Convert text to circled Unicode bubble letters for social media.", url: "https://www.coderdesign.com/tools/bubble-text-generator", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Bubble Text Generator — Free Online Tool | CoderDesign", description: "Convert text to circled Unicode bubble letters for social media.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/bubble-text-generator" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Bubble Text Generator", url: "https://www.coderdesign.com/tools/bubble-text-generator", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Convert text to circled Unicode bubble letters for social media.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <BubbleTextGeneratorTool />
    </>
  );
}
