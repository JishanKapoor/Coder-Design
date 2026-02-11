import type { Metadata } from "next";
import SeoContentAnalyzerTool from "./content";

export const metadata: Metadata = {
  title: "SEO Content Analyzer — Free Online Tool | CoderDesign",
  description: "Analyze your content for SEO with keyword density, readability scores, word count, and heading structure analysis. Get actionable recommendations.",
  keywords: ["seo content analyzer", "keyword density checker", "readability score", "flesch reading ease", "content analysis tool", "seo writing tool", "word count tool", "content optimizer"],
  openGraph: { title: "SEO Content Analyzer — Free Online Tool", description: "Analyze content for SEO with keyword density, readability, and recommendations.", url: "https://www.coderdesign.com/tools/seo-content-analyzer", siteName: "CoderDesign", type: "website", locale: "en_CA", images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Free Online Tools" }] },
  twitter: { card: "summary_large_image", title: "SEO Content Analyzer — Free Online Tool | CoderDesign", description: "Analyze content for SEO with keyword density, readability, and recommendations.", images: ["https://coderdesign.com/og-image.png"] },
  alternates: { canonical: "https://www.coderdesign.com/tools/seo-content-analyzer" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "SEO Content Analyzer", url: "https://www.coderdesign.com/tools/seo-content-analyzer", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Analyze content for SEO with keyword density, readability, and recommendations.", "provider": { "@type": "Organization", "name": "CoderDesign", "@id": "https://coderdesign.com/#organization" }, "inLanguage": "en-CA" }) }} />
      <SeoContentAnalyzerTool />
    </>
  );
}
