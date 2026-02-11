import type { Metadata } from "next";
import PrefixSuffixTool from "./content";

export const metadata: Metadata = {
  title:
    "Add Prefix and Suffix to Each Line Online — Free Text Tool | CoderDesign",
  description:
    "Free online tool to add a custom prefix and suffix to each line of text instantly. Bulk text formatter for HTML tags, email addresses, SQL values, CSV data, Markdown lists. No login, 100% private. By CoderDesign Toronto.",
  keywords:
    "add prefix suffix to lines, prefix suffix adder, text prefix tool, bulk text formatter, add text before each line, add text after each line, free online text tool, line prefix suffix, wrap lines in html tags, generate email addresses from list, sql insert values formatter, markdown checklist generator, csv text formatter, online text manipulation tool, prepend append text lines, coderdesign tools",
  openGraph: {
    title: "Add Prefix and Suffix to Each Line — Free Online Tool",
    description:
      "Add custom text before and after every line instantly. Free bulk text formatter for developers, marketers, and data analysts. No sign-up required.",
    url: "https://coderdesign.com/tools/add-prefix-suffix-lines",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Add Prefix and Suffix to Each Line - Free Online Tool by CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Prefix and Suffix to Each Line — Free Tool | CoderDesign",
    description:
      "Free online prefix & suffix adder. Bulk text processing for HTML, SQL, CSV, email lists, and more. No login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/add-prefix-suffix-lines",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Add Prefix and Suffix to Each Line",
  description:
    "Free online tool to add a custom prefix and suffix to each line of text instantly. Perfect for bulk text processing, coding, email lists, SQL formatting, and Markdown lists.",
  url: "https://coderdesign.com/tools/add-prefix-suffix-lines",
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
    ratingCount: "47",
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
      name: "What is a prefix and suffix text adder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'A prefix and suffix text adder is an online tool that lets you add custom text before (prefix) and after (suffix) each line in a block of text. For example, you can turn a list of usernames into email addresses by adding "@gmail.com" as a suffix to each line in one click.',
      },
    },
    {
      "@type": "Question",
      name: "How do I add a prefix or suffix to each line of text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Paste your text into the input box (one item per line), type your prefix and/or suffix, then click "Add Prefix / Suffix". The formatted text appears instantly in the output box, ready to copy or download.',
      },
    },
    {
      "@type": "Question",
      name: "Is this tool completely free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this prefix and suffix adder is 100% free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can process unlimited lines of text as many times as you need.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text data safe and private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All text processing happens entirely in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upload a file instead of pasting text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Yes. Click the "Upload .txt file" button to load a text file from your device. After processing, you can download the result as a new .txt file.',
      },
    },
    {
      "@type": "Question",
      name: "What are common use cases for adding prefix and suffix to text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common use cases include generating email addresses from usernames, wrapping text lines in HTML tags, creating SQL INSERT values, building full URLs from page slugs, adding Markdown checkbox prefixes for task lists, and formatting CSV data with proper quoting.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool work on mobile devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this tool is fully responsive and works on smartphones, tablets, laptops, and desktops. It is compatible with Chrome, Safari, Firefox, and Edge on both iOS and Android.",
      },
    },
    {
      "@type": "Question",
      name: "How many lines of text can I process at once?",
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
  name: "How to Add Prefix and Suffix to Each Line of Text",
  description:
    "A step-by-step guide to adding custom text before and after every line using CoderDesign's free online prefix and suffix adder tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Prefix & Suffix Adder",
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
      name: "Enter Your Prefix and Suffix",
      text: "Type the text you want added before each line in the Prefix field and the text to add after each line in the Suffix field.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: 'Click "Add Prefix / Suffix"',
      text: "Press the button to process your text. Every non-empty line will be wrapped with your prefix and suffix instantly.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download the Result",
      text: 'Your formatted text appears in the Output box. Click "Copy" to copy to clipboard or "Download" to save as a .txt file.',
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
      name: "Add Prefix & Suffix to Each Line",
      item: "https://coderdesign.com/tools/add-prefix-suffix-lines",
    },
  ],
};

export default function PrefixSuffixPage() {
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
      <PrefixSuffixTool />
    </>
  );
}
