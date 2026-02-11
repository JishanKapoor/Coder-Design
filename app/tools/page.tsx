import type { Metadata } from "next";
import ToolsIndex from "./content";

export const metadata: Metadata = {
  title:
    "Free Online Tools by Coder Design — String Processing, Code Formatting & More",
  description:
    "Coder Design offers free online utilities for string processing, code formatting, Unicode text generators, SEO analysis, and more. No sign-up. No tracking. 100% free and private. Works on any device.",
  keywords:
    "free online tools, free text tools, free developer tools, string processing, code formatter, JSON formatter, regex tester, Base64 encoder, URL encoder, Unicode text generator, bold text generator, zalgo text, markdown table generator, SEO analyzer, Coder Design tools, CoderDesign free utilities, online tools no sign-up, private developer tools, text manipulation free",
  openGraph: {
    title:
      "Free Online Utilities — String Processing, Code Formatting & More | Coder Design",
    description:
      "Coder Design offers free online tools: string processing, code formatting, Unicode generators, SEO analysis, and more. No sign-up. No tracking. 100% free and private.",
    url: "https://coderdesign.com/tools/",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Coder Design Free Online Developer & Text Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Online Utilities — String Processing, Code Formatting & More | Coder Design",
    description:
      "Coder Design offers free tools: string processing, code formatting, Unicode generators, and more. No sign-up, no tracking, 100% private.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as const,
    "max-video-preview": -1,
  },
};

const toolsCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free Online Utilities by Coder Design",
  description:
    "A curated collection of free online tools for developers, marketers, and content creators. String processing, code formatting, Unicode generators, SEO analysis, and more. Built by Coder Design.",
  url: "https://coderdesign.com/tools/",
  creator: {
    "@type": "Organization",
    name: "Coder Design",
    url: "https://coderdesign.com",
    sameAs: [
      "https://github.com/JishanKapoor/Coder-Design"
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://coderdesign.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://coderdesign.com/tools/" },
    ],
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
