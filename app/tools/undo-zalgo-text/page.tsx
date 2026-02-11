import type { Metadata } from "next";
import UndoZalgoTextTool from "./content";

export const metadata: Metadata = {
  title: "Undo Zalgo Text — Free Online Tool | CoderDesign",
  description: "Remove Zalgo effect and combining diacritical marks from corrupted Unicode text. Clean up glitchy text instantly. Free, private.",
  keywords: ["undo zalgo text", "remove zalgo", "clean zalgo text", "remove combining characters", "fix corrupted text", "strip diacritical marks", "dezalgo", "free text tool"],
  openGraph: { title: "Undo Zalgo Text — Free Online Tool", description: "Remove Zalgo effect and combining diacritical marks from corrupted text.", url: "https://www.coderdesign.com/tools/undo-zalgo-text", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Undo Zalgo Text — Free Online Tool | CoderDesign", description: "Remove Zalgo effect and combining diacritical marks from corrupted text.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/undo-zalgo-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Undo Zalgo Text", url: "https://www.coderdesign.com/tools/undo-zalgo-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Remove Zalgo effect and combining diacritical marks from corrupted text.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <UndoZalgoTextTool />
    </>
  );
}
