import type { Metadata } from "next";
import UrlEncoderDecoderTool from "./content";

export const metadata: Metadata = {
  title: "URL Encoder / Decoder — Free Online Tool | CoderDesign",
  description: "Encode or decode URLs and query strings online. Convert special characters to percent-encoding and back with component and full URL modes.",
  keywords: ["url encoder", "url decoder", "percent encoding", "urlencode", "urldecode", "encodeURIComponent", "query string encoder", "url encode online"],
  openGraph: { title: "URL Encoder / Decoder — Free Online Tool", description: "Encode or decode URLs and query strings online.", url: "https://www.coderdesign.com/tools/url-encoder-decoder", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "URL Encoder / Decoder — Free Online Tool | CoderDesign", description: "Encode or decode URLs and query strings online.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/url-encoder-decoder" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "URL Encoder / Decoder", url: "https://www.coderdesign.com/tools/url-encoder-decoder", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Encode or decode URLs and query strings online.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <UrlEncoderDecoderTool />
    </>
  );
}
