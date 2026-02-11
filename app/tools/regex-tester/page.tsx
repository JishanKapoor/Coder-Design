import type { Metadata } from "next";
import RegexTesterTool from "./content";

export const metadata: Metadata = {
  title: "Regex Tester — Free Online Tool | CoderDesign",
  description: "Test and debug regular expressions in real-time. See matches highlighted with capture groups, flags, and a quick reference cheat sheet.",
  keywords: ["regex tester", "regular expression tester", "regex debugger", "regex online", "regex matcher", "regex validator", "test regex", "regex cheat sheet"],
  openGraph: { title: "Regex Tester — Free Online Tool", description: "Test and debug regular expressions in real-time.", url: "https://www.coderdesign.com/tools/regex-tester", siteName: "CoderDesign", type: "website" },
  twitter: { card: "summary_large_image", title: "Regex Tester — Free Online Tool | CoderDesign", description: "Test and debug regular expressions in real-time." },
  alternates: { canonical: "https://www.coderdesign.com/tools/regex-tester" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Regex Tester", url: "https://www.coderdesign.com/tools/regex-tester", applicationCategory: "UtilityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Test and debug regular expressions in real-time." }) }} />
      <RegexTesterTool />
    </>
  );
}
