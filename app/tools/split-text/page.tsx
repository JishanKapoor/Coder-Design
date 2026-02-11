import type { Metadata } from "next";
import SplitTextTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Text Splitter Online – Split Text by Delimiter, Character, or Line | CoderDesign",
  description:
    "Split text by any delimiter, character count, number of parts, or sentence. Free online text splitter — chunk text, break CSV rows, divide paragraphs instantly. No sign-up, 100% private.",
  keywords:
    "split text online, text splitter free, divide text by delimiter, split string by character, chunk text, break text into parts, split CSV, split by comma, split by newline, split by custom delimiter, text divider, CoderDesign",
  openGraph: {
    title:
      "Free Text Splitter Online – Split Text by Delimiter, Character, or Line",
    description:
      "Split text by any delimiter, character count, number of parts, or sentence. Free online text splitter — chunk text, break CSV rows, divide paragraphs instantly. No sign-up required.",
    url: "https://coderdesign.com/tools/split-text",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Text Splitter Online – Split by Delimiter, Character, or Line | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Text Splitter Online – Split Text by Delimiter, Character, or Line | CoderDesign",
    description:
      "Split text by any delimiter, character count, number of parts, or sentence. Free online text splitter, 100% private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/split-text",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Text Splitter Online",
  description:
    "Free online tool to split text by any delimiter, character count, number of lines, word count, or regular expression. Chunk text, break CSV rows, divide paragraphs instantly. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/split-text",
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
    ratingValue: "4.8",
    ratingCount: "38",
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
      name: "What does the text splitter do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Text Splitter breaks any block of text into smaller parts based on the method you choose. You can split by a delimiter (comma, semicolon, pipe, tab, or any custom string), by a fixed character count, by a fixed number of lines, by word count, or by a regular expression pattern. The resulting chunks are displayed in an output box separated by your chosen output separator, ready to copy or download.",
      },
    },
    {
      "@type": "Question",
      name: "What delimiters can I split by?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can split by any delimiter you choose. Common presets include comma (,), semicolon (;), pipe (|), tab, and newline. You can also type any custom string — for example '::' or ' - ' or even a multi-character sequence. The tool uses your exact delimiter string to split the input text.",
      },
    },
    {
      "@type": "Question",
      name: "Can I split text into a specific number of parts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use the 'By Number of Lines' or 'By Word Count' modes to control how many items end up in each chunk. For example, if you have 100 lines and set the line count to 20, you will get 5 chunks of 20 lines each. Similarly, setting a word count of 50 will produce chunks of roughly 50 words each.",
      },
    },
    {
      "@type": "Question",
      name: "How do I split text by character count?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select the 'By Character Count' mode and enter the number of characters per chunk. The tool slices the text every N characters, producing uniform-length segments. This is useful for SMS-length limits, database field constraints, or any scenario where you need fixed-width text blocks.",
      },
    },
    {
      "@type": "Question",
      name: "Is the tool free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Text Splitter is completely free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can split unlimited text as many times as you need. CoderDesign provides this tool as a free resource for developers, writers, data analysts, and anyone who needs to break text into parts.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this by disconnecting from the internet and using the tool offline after the page has loaded.",
      },
    },
    {
      "@type": "Question",
      name: "Can I split CSV or TSV data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. To split CSV data, select the 'By Delimiter' mode and use a comma (,) as the delimiter. For TSV (tab-separated values), choose the tab preset. Each cell value will become its own line in the output. You can also enable 'Trim results' to remove leading and trailing whitespace from each value.",
      },
    },
    {
      "@type": "Question",
      name: "Does it preserve empty lines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By default, empty parts are kept in the output so you can see exactly where consecutive delimiters produced blank entries. If you prefer to remove them, enable the 'Remove empty parts' checkbox and the tool will filter out any blank chunks before displaying results.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Split Text Online",
  description:
    "A step-by-step guide to splitting text by delimiter, character count, line count, word count, or regex using CoderDesign's free online Text Splitter tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Text Splitter",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Upload Your Text",
      text: "Enter your text in the input area by pasting from any source — CSV data, log files, articles, or code. You can also upload a .txt file directly.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Choose a Split Mode",
      text: "Select one of five split modes: by delimiter, by character count, by number of lines, by word count, or by regular expression pattern.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Configure & Click Split",
      text: "Set the delimiter string, chunk size, line count, word count, or regex pattern depending on your chosen mode. Optionally enable 'Trim results' or 'Remove empty parts'. Then click the Split Text button.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download Results",
      text: "Review the split output showing the number of resulting chunks. Copy the results to your clipboard or download them as a .txt file for further use.",
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
      name: "Text Splitter",
      item: "https://coderdesign.com/tools/split-text",
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
      <SplitTextTool />
    </>
  );
}
