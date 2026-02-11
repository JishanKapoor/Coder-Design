import type { Metadata } from "next";
import SeoContentAnalyzerTool from "./content";

export const metadata: Metadata = {
  title: "SEO Content Analyzer — Free Online Tool | CoderDesign",
  description: "Analyze your content for SEO with keyword density, readability scores, word count, and heading structure analysis. Get actionable recommendations.",
  keywords: ["seo content analyzer", "keyword density checker", "readability score", "flesch reading ease", "content analysis tool", "seo writing tool", "word count tool", "content optimizer"],
  openGraph: { title: "SEO Content Analyzer — Free Online Tool", description: "Analyze content for SEO with keyword density, readability, and recommendations.", url: "https://www.coderdesign.com/tools/seo-content-analyzer", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "SEO Content Analyzer — Free Online Tool | CoderDesign", description: "Analyze content for SEO with keyword density, readability, and recommendations." },
  alternates: { canonical: "https://www.coderdesign.com/tools/seo-content-analyzer" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "SEO Content Analyzer", url: "https://www.coderdesign.com/tools/seo-content-analyzer", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Analyze content for SEO with keyword density, readability, and recommendations." }) }} />
      <SeoContentAnalyzerTool />
    </>
  );
}
