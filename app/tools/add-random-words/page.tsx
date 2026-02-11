import type { Metadata } from "next";
import AddRandomWordsTool from "./content";

export const metadata: Metadata = {
  title: "Add Random Words to Text — Free Online Tool | CoderDesign",
  description: "Insert random words at random positions in your text. Great for testing, obfuscation, and text augmentation. Free, private, instant.",
  keywords: ["add random words", "insert random words", "text augmentation", "random word generator", "text obfuscation", "test data generator", "free text tool"],
  openGraph: { title: "Add Random Words to Text — Free Online Tool", description: "Insert random words at random positions in your text.", url: "https://www.coderdesign.com/tools/add-random-words", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Add Random Words to Text — Free Online Tool | CoderDesign", description: "Insert random words at random positions in your text." },
  alternates: { canonical: "https://www.coderdesign.com/tools/add-random-words" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Add Random Words to Text", url: "https://www.coderdesign.com/tools/add-random-words", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Insert random words at random positions in your text." }) }} />
      <AddRandomWordsTool />
    </>
  );
}
