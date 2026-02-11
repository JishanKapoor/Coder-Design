import type { Metadata } from "next";
import UnindentTextTool from "./content";

export const metadata: Metadata = {
  title: "Unindent Text — Free Online Tool | CoderDesign",
  description: "Remove indentation from text or code. Strip leading spaces or tabs from each line. Free online unindent tool — fast, private, no login needed.",
  keywords: ["unindent text", "remove indentation", "strip spaces", "remove tabs", "dedent", "code formatting", "free text tool"],
  openGraph: { title: "Unindent Text — Free Online Tool", description: "Remove indentation from text or code. Strip leading spaces or tabs from each line.", url: "https://www.coderdesign.com/tools/unindent-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Unindent Text — Free Online Tool | CoderDesign", description: "Remove indentation from text or code. Strip leading spaces or tabs." },
  alternates: { canonical: "https://www.coderdesign.com/tools/unindent-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Unindent Text", url: "https://www.coderdesign.com/tools/unindent-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Remove indentation from text or code. Strip leading spaces or tabs from each line." }) }} />
      <UnindentTextTool />
    </>
  );
}
