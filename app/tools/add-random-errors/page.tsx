import type { Metadata } from "next";
import AddRandomErrorsTool from "./content";

export const metadata: Metadata = {
  title: "Add Random Errors to Text — Free Online Tool | CoderDesign",
  description: "Introduce realistic typos and errors into your text. Perfect for testing spell-checkers and text processing. Free, private, instant.",
  keywords: ["add random errors", "typo generator", "text corruption", "spell checker testing", "random typos", "error injection", "free text tool"],
  openGraph: { title: "Add Random Errors to Text — Free Online Tool", description: "Introduce realistic typos and errors into your text.", url: "https://www.coderdesign.com/tools/add-random-errors", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Add Random Errors to Text — Free Online Tool | CoderDesign", description: "Introduce realistic typos and errors into your text." },
  alternates: { canonical: "https://www.coderdesign.com/tools/add-random-errors" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Add Random Errors to Text", url: "https://www.coderdesign.com/tools/add-random-errors", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Introduce realistic typos and errors into your text." }) }} />
      <AddRandomErrorsTool />
    </>
  );
}
