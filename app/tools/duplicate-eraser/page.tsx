import type { Metadata } from "next";
import DuplicateEraserTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Duplicate Line Remover – Remove Duplicate Lines from Text Online | CoderDesign",
  description:
    "Remove duplicate lines from any text instantly. Free online duplicate line remover and deduplication tool — keep only unique entries while preserving order. No sign-up, 100% private. By CoderDesign Toronto.",
  keywords:
    "duplicate line remover, remove duplicate lines, deduplicate text, remove duplicates online, unique lines filter, free text deduplication tool, delete repeated lines, remove duplicate rows, duplicate text remover, CoderDesign tools",
  openGraph: {
    title: "Free Duplicate Line Remover – Remove Duplicate Lines Online",
    description:
      "Remove duplicate lines from any text instantly. Free deduplication tool — keep unique entries, preserve order. No sign-up required.",
    url: "https://coderdesign.com/tools/duplicate-eraser",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Duplicate Line Remover - Online Tool by CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Duplicate Line Remover – Remove Duplicate Lines Online | CoderDesign",
    description:
      "Remove duplicate lines from any text instantly. Free deduplication tool with case-sensitive and case-insensitive matching. No login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/duplicate-eraser",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Duplicate Line Remover",
  description:
    "Free online tool to remove duplicate lines from any text instantly. Keep only unique entries while preserving original order. Case-sensitive and case-insensitive matching, trim whitespace, and remove blank lines.",
  url: "https://coderdesign.com/tools/duplicate-eraser",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CAD",
  },
  creator: {
    "@type": "Organization",
    name: "CoderDesign",
    url: "https://coderdesign.com",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "55",
    bestRating: "5",
  },
};

/* ─── Structured Data: FAQPage ─── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the duplicate line remover do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The duplicate line remover scans your text line by line and keeps only the first occurrence of each unique line. All subsequent duplicates are removed, leaving you with a clean list of unique entries while preserving the original order of first appearances.",
      },
    },
    {
      "@type": "Question",
      name: "How do I remove duplicate lines from my text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Paste your text into the input box (one item per line), choose your options such as case sensitivity and whitespace trimming, then click "Remove Duplicates". The deduplicated text appears instantly in the output box, ready to copy or download.',
      },
    },
    {
      "@type": "Question",
      name: "Does this tool preserve the original order?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool preserves the order of first appearances. When a duplicate line is found, only the first occurrence is kept in its original position while all later duplicates are removed.",
      },
    },
    {
      "@type": "Question",
      name: "Is the comparison case-sensitive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By default, yes — 'Apple' and 'apple' are treated as different lines. You can toggle case sensitivity off to treat lines that differ only in letter casing as duplicates.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this duplicate line remover is 100% free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can process unlimited lines of text as many times as you need.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private and secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All text processing happens entirely in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party.",
      },
    },
    {
      "@type": "Question",
      name: "Can I also remove empty or blank lines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Yes. Enable the "Remove empty lines" option and the tool will strip all blank lines from the output in addition to removing duplicates. This is useful for cleaning up text with extra line breaks.',
      },
    },
    {
      "@type": "Question",
      name: "How many lines can this tool handle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no hard limit. Processing happens locally in your browser, so you can handle thousands of lines. Documents with 10,000+ lines process in under a second on most modern devices.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Remove Duplicate Lines from Text",
  description:
    "A step-by-step guide to removing duplicate lines from any text using CoderDesign's free online duplicate line remover tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Duplicate Line Remover",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Upload Your Text",
      text: 'Enter your text in the input box, one item per line. You can also click "Upload .txt file" to load text from a file on your device.',
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Choose Your Options",
      text: "Select whether the comparison should be case-sensitive, whether to trim whitespace from lines, and whether to remove empty or blank lines from the result.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: 'Click "Remove Duplicates"',
      text: "Press the button to process your text. Duplicate lines are removed instantly, keeping only unique entries in their original order.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download the Result",
      text: 'Your deduplicated text appears in the Output box. Click "Copy" to copy to clipboard or "Download" to save as a .txt file.',
      position: 4,
    },
  ],
};

/* ─── Structured Data: BreadcrumbList ─── */
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://coderdesign.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Free Tools",
      item: "https://coderdesign.com/tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Duplicate Line Remover",
      item: "https://coderdesign.com/tools/duplicate-eraser",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DuplicateEraserTool />
    </>
  );
}
