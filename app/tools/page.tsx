import type { Metadata } from "next";
import ToolsIndex from "./content";

export const metadata: Metadata = {
  title:
    "Free Online Developer & Text Tools — No Login Required | CoderDesign Toronto",
  description:
    "Free online text manipulation tools, developer utilities, and productivity tools by CoderDesign Toronto. Add prefix and suffix to lines, format text for HTML, SQL, CSV, and more. No sign-up, 100% private, works on any device.",
  keywords:
    "free online tools, text tools, developer tools, prefix suffix adder, text formatter, CoderDesign tools, online utilities free, bulk text processing, html tag wrapper, sql formatter, csv text tool, markdown list generator, free developer utilities toronto",
  openGraph: {
    title: "Free Online Developer & Text Tools | CoderDesign Toronto",
    description:
      "Free online text tools and developer utilities. Add prefix/suffix, format text, and more. No login required. Built by CoderDesign Toronto.",
    url: "https://coderdesign.com/tools",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CoderDesign Free Online Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Developer & Text Tools | CoderDesign",
    description:
      "Free text manipulation and developer tools. No login, no tracking. Built by CoderDesign Toronto.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools",
  },
};

const toolsCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free Online Developer & Text Tools",
  description:
    "A collection of free online tools for developers, marketers, and content creators. Built by CoderDesign Toronto.",
  url: "https://coderdesign.com/tools",
  creator: {
    "@type": "Organization",
    name: "CoderDesign",
    url: "https://coderdesign.com",
  },
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolsCollectionJsonLd),
        }}
      />
      <ToolsIndex />
    </>
  );
}
