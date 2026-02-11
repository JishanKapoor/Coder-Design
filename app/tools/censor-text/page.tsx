import type { Metadata } from "next";
import CensorTextTool from "./content";

export const metadata: Metadata = {
  title: "Censor Text — Free Online Tool | CoderDesign",
  description: "Replace specific words with censored characters like asterisks or custom symbols. Redact sensitive text instantly. Free, private, instant.",
  keywords: ["censor text", "redact text", "text censoring", "word censor", "asterisk replacer", "content moderation", "free text tool"],
  openGraph: { title: "Censor Text — Free Online Tool", description: "Replace specific words with censored characters like asterisks or custom symbols.", url: "https://www.coderdesign.com/tools/censor-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Censor Text — Free Online Tool | CoderDesign", description: "Replace specific words with censored characters like asterisks or custom symbols." },
  alternates: { canonical: "https://www.coderdesign.com/tools/censor-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Censor Text", url: "https://www.coderdesign.com/tools/censor-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Replace specific words with censored characters like asterisks or custom symbols." }) }} />
      <CensorTextTool />
    </>
  );
}
