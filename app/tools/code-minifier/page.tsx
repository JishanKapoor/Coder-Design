import type { Metadata } from "next";
import CodeMinifierTool from "./content";

export const metadata: Metadata = {
  title: "Code Minifier — Free Online Tool | CoderDesign",
  description: "Minify HTML, CSS, and JavaScript code online. Remove whitespace, comments, and unnecessary characters to reduce file size.",
  keywords: ["code minifier", "html minifier", "css minifier", "javascript minifier", "minify code", "compress code", "reduce file size", "online minifier"],
  openGraph: { title: "Code Minifier — Free Online Tool", description: "Minify HTML, CSS, and JavaScript code online.", url: "https://www.coderdesign.com/tools/code-minifier", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Code Minifier — Free Online Tool | CoderDesign", description: "Minify HTML, CSS, and JavaScript code online.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/code-minifier" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Code Minifier", url: "https://www.coderdesign.com/tools/code-minifier", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Minify HTML, CSS, and JavaScript code online.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <CodeMinifierTool />
    </>
  );
}
