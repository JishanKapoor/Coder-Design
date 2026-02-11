import type { Metadata } from "next";
import LeftPadTextTool from "./content";

export const metadata: Metadata = {
  title: "Left-Pad Text — Free Online Tool | CoderDesign",
  description: "Add padding characters to the start of each line to reach a target width. Free online left-pad tool — fast, private, no login needed.",
  keywords: ["left pad text", "pad start", "add leading characters", "text padding", "fixed width text", "free text tool"],
  openGraph: { title: "Left-Pad Text — Free Online Tool", description: "Add padding characters to the start of each line to reach a target width.", url: "https://www.coderdesign.com/tools/left-pad-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Left-Pad Text — Free Online Tool | CoderDesign", description: "Add padding characters to the start of each line to reach a target width." },
  alternates: { canonical: "https://www.coderdesign.com/tools/left-pad-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Left-Pad Text", url: "https://www.coderdesign.com/tools/left-pad-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Add padding characters to the start of each line to reach a target width." }) }} />
      <LeftPadTextTool />
    </>
  );
}
