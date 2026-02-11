import type { Metadata } from "next";
import JoinTextTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Text Joiner Online – Merge & Combine Lines with Any Separator | CoderDesign",
  description:
    "Join and merge text lines with any separator — comma, space, newline, pipe, or custom delimiter. Free online text combiner for lists, CSV creation, code arrays, and more. No sign-up, 100% private.",
  keywords:
    "join text online, merge lines, combine text lines, join with comma, merge text with separator, text joiner free, combine lines into one, list to CSV, join lines with delimiter, text merger online, CoderDesign",
  openGraph: {
    title:
      "Free Text Joiner Online – Merge & Combine Lines with Any Separator",
    description:
      "Join and merge text lines with any separator — comma, space, newline, pipe, or custom delimiter. Free online text combiner for lists, CSV creation, code arrays, and more. No sign-up required.",
    url: "https://coderdesign.com/tools/join-text",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Text Joiner Online – Merge & Combine Lines | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Text Joiner Online – Merge & Combine Lines with Any Separator | CoderDesign",
    description:
      "Join and merge text lines with any separator — comma, space, newline, pipe, or custom delimiter. Free online text combiner, 100% private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/join-text",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Text Joiner Online",
  description:
    "Free online tool to join and merge text lines with any separator — comma, space, newline, pipe, or custom delimiter. Create CSV data, code arrays, SQL IN clauses, and more. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/join-text",
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
    ratingCount: "45",
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
      name: "What does the text joiner do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Text Joiner takes multiple lines of text and merges them into a single string using any separator you choose — comma, semicolon, pipe, space, tab, newline, or any custom multi-character delimiter. It is the reverse of splitting text: you start with one item per line and end with all items on a single line separated by your chosen character or string.",
      },
    },
    {
      "@type": "Question",
      name: "What separators can I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use any separator. The tool provides seven quick presets — comma (', '), semicolon ('; '), pipe (' | '), space (' '), tab, newline, and a custom input field. The custom field accepts any string including multi-character separators like ' :: ', ' → ', ' -- ', or even HTML tags. There is no limit on separator length.",
      },
    },
    {
      "@type": "Question",
      name: "Can I join lines into a comma-separated list?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Select the 'Comma' preset (which uses ', ' — comma followed by a space) and click Join Lines. Each line from your input becomes one item in a clean comma-separated list. This is perfect for creating CSV rows, JavaScript arrays, or comma-delimited values for spreadsheets and databases.",
      },
    },
    {
      "@type": "Question",
      name: "How do I handle blank lines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 'Remove empty lines' checkbox is enabled by default, which automatically strips blank lines before joining. If you need to preserve blank entries (for example, to keep placeholder positions in a data set), simply uncheck the option and empty lines will be included as empty strings between separators.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a prefix and suffix to each line before joining?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool includes dedicated Prefix and Suffix input fields. For example, set prefix to '<li>' and suffix to '</li>' to wrap each line in HTML list-item tags before joining. You can also use the Wrap field to enclose each line in quotes, brackets, or any pair of characters — perfect for generating code arrays or SQL values.",
      },
    },
    {
      "@type": "Question",
      name: "Is the tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Text Joiner is completely free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can join unlimited text as many times as you need. CoderDesign provides this tool as a free resource for developers, writers, data analysts, and anyone who needs to merge lines of text.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this by disconnecting from the internet after the page loads and the tool will continue to work perfectly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use custom multi-character separators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Click the 'Custom' pill and type any string into the custom separator field. Multi-character separators like ' :: ', ' | ', ' → ', or even longer strings like '<!--->' are fully supported. The tool uses your exact string between every pair of joined lines with no modification.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Join Text Lines Online",
  description:
    "A step-by-step guide to joining and merging multiple lines of text into one string using CoderDesign's free online Text Joiner tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Text Joiner",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Upload Your Lines",
      text: "Enter your text in the input area — one item per line. You can paste from any source or upload a .txt file directly.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Choose a Separator",
      text: "Pick a preset separator pill (comma, semicolon, pipe, space, tab, newline) or click Custom and type any multi-character delimiter.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Configure Options",
      text: "Optionally enable Trim lines or Remove empty lines. Add a prefix, suffix, or wrap character to transform each line before joining.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download the Joined Text",
      text: "Click Join Lines to merge your text. Copy the result to your clipboard with one click, or download it as a .txt file.",
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
      name: "Text Joiner",
      item: "https://coderdesign.com/tools/join-text",
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
      <JoinTextTool />
    </>
  );
}
