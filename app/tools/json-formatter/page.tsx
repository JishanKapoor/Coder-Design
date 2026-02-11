import type { Metadata } from "next";
import JsonFormatterTool from "./content";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Free Online Tool | CoderDesign",
  description: "Format, validate, and beautify JSON data online. Minify or pretty-print JSON with customizable indentation and syntax highlighting.",
  keywords: ["json formatter", "json validator", "json beautifier", "json minifier", "json pretty print", "json online tool", "format json", "validate json"],
  openGraph: { title: "JSON Formatter & Validator — Free Online Tool", description: "Format, validate, and beautify JSON data online.", url: "https://www.coderdesign.com/tools/json-formatter", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "JSON Formatter & Validator — Free Online Tool | CoderDesign", description: "Format, validate, and beautify JSON data online.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/json-formatter" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "JSON Formatter & Validator", url: "https://www.coderdesign.com/tools/json-formatter", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Format, validate, and beautify JSON data online.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <JsonFormatterTool />
    </>
  );
}
