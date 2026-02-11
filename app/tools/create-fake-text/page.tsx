import type { Metadata } from "next";
import CreateFakeTextTool from "./content";

export const metadata: Metadata = {
  title: "Create Fake Text with Unicode — Free Online Tool | CoderDesign",
  description: "Generate deceptive text using invisible Unicode characters and homoglyphs that looks normal but contains hidden characters. Free, private, instant.",
  keywords: ["fake text", "unicode homoglyphs", "invisible characters", "zero-width characters", "homoglyph generator", "deceptive text", "unicode text generator", "free text tool"],
  openGraph: { title: "Create Fake Text with Unicode — Free Online Tool", description: "Generate deceptive text using invisible Unicode characters and homoglyphs.", url: "https://www.coderdesign.com/tools/create-fake-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Create Fake Text with Unicode — Free Online Tool | CoderDesign", description: "Generate deceptive text using invisible Unicode characters and homoglyphs." },
  alternates: { canonical: "https://www.coderdesign.com/tools/create-fake-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Create Fake Text with Unicode", url: "https://www.coderdesign.com/tools/create-fake-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Generate deceptive text using invisible Unicode characters and homoglyphs." }) }} />
      <CreateFakeTextTool />
    </>
  );
}
