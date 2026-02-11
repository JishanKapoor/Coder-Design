import type { Metadata } from "next";
import Base64EncoderDecoderTool from "./content";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder — Free Online Tool | CoderDesign",
  description: "Encode text to Base64 or decode Base64 strings online. Support for UTF-8 text, URL-safe Base64, and MIME line wrapping.",
  keywords: ["base64 encoder", "base64 decoder", "base64 online", "encode base64", "decode base64", "base64 converter", "utf-8 base64", "url-safe base64"],
  openGraph: { title: "Base64 Encoder / Decoder — Free Online Tool", description: "Encode text to Base64 or decode Base64 strings online.", url: "https://www.coderdesign.com/tools/base64-encoder-decoder", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "Base64 Encoder / Decoder — Free Online Tool | CoderDesign", description: "Encode text to Base64 or decode Base64 strings online.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/base64-encoder-decoder" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Base64 Encoder / Decoder", url: "https://www.coderdesign.com/tools/base64-encoder-decoder", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Encode text to Base64 or decode Base64 strings online.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <Base64EncoderDecoderTool />
    </>
  );
}
