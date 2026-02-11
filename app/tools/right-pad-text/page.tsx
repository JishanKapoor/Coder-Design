import type { Metadata } from "next";
import RightPadTextTool from "./content";

export const metadata: Metadata = {
  title: "Right-Pad Text — Free Online Tool | CoderDesign",
  description: "Add padding characters to the end of each line to reach a target width. Free online right-pad tool — fast, private, no login needed.",
  keywords: ["right pad text", "pad end", "add trailing characters", "text padding", "fixed width text", "free text tool"],
  openGraph: { title: "Right-Pad Text — Free Online Tool", description: "Add padding characters to the end of each line to reach a target width.", url: "https://www.coderdesign.com/tools/right-pad-text", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Right-Pad Text — Free Online Tool | CoderDesign", description: "Add padding characters to the end of each line to reach a target width." },
  alternates: { canonical: "https://www.coderdesign.com/tools/right-pad-text" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Right-Pad Text", url: "https://www.coderdesign.com/tools/right-pad-text", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Add padding characters to the end of each line to reach a target width." }) }} />
      <RightPadTextTool />
    </>
  );
}
