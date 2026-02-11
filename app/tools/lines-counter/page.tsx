import type { Metadata } from "next";
import LinesCounterTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Online Line Counter – Count Lines, Words & Characters in Text | CoderDesign",
  description:
    "Count lines, words, characters, sentences, and paragraphs in any text instantly. Free online line counter and word counter tool — real-time stats as you type. No sign-up, 100% private. By CoderDesign Toronto.",
  keywords:
    "line counter, word counter, character counter, count lines in text, online text counter, word count tool free, character count online, paragraph counter, sentence counter, text statistics tool, CoderDesign tools",
  openGraph: {
    title: "Free Online Line Counter – Count Lines, Words & Characters in Text",
    description:
      "Count lines, words, characters, sentences, and paragraphs in any text instantly. Free line counter and word counter — real-time stats as you type. No sign-up required.",
    url: "https://coderdesign.com/tools/lines-counter",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Online Line Counter - Count Lines, Words & Characters | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Online Line Counter – Count Lines, Words & Characters | CoderDesign",
    description:
      "Count lines, words, characters, sentences, and paragraphs in any text instantly. Real-time stats as you type. No login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/lines-counter",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Online Line Counter",
  description:
    "Free online tool to count lines, words, characters, sentences, and paragraphs in any text instantly. Real-time statistics update as you type — no button needed. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/lines-counter",
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
    ratingCount: "62",
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
      name: "What does the line counter tool do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The line counter tool analyzes any text you enter and gives you a comprehensive breakdown of statistics including the total number of lines, non-empty lines, words, characters (with and without spaces), sentences, paragraphs, average word length, longest line length, and estimated reading time. All statistics update in real time as you type.",
      },
    },
    {
      "@type": "Question",
      name: "Does it count words and characters too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. In addition to counting lines, the tool provides a full word count, total character count, and a character count excluding spaces. It also calculates sentences, paragraphs, average word length, and estimated reading time — all updating live as you type or paste text.",
      },
    },
    {
      "@type": "Question",
      name: "How are paragraphs counted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paragraphs are counted by splitting your text on double line breaks (blank lines). Each block of text separated by one or more blank lines is counted as one paragraph. If your text has no blank lines, the entire text is treated as a single paragraph.",
      },
    },
    {
      "@type": "Question",
      name: "Does it count in real time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All statistics update instantly on every keystroke — there is no button to press. As soon as you start typing, pasting, or editing text, the line count, word count, character count, and all other metrics refresh immediately in the stats panel above the text area.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the line counter is completely free with no limitations. There are no hidden charges, premium tiers, or sign-up requirements. You can count unlimited text as many times as you need. CoderDesign provides this tool as a free resource for writers, developers, and students.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All counting and analysis happens entirely in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party. You can verify this by using the tool offline after the page loads.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upload a file to count?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can upload a .txt file using the Upload button and the tool will load the file contents into the text area. All statistics will immediately appear for the uploaded text. The file is read locally in your browser and is never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as a 'word' in the counter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A word is defined as any sequence of non-whitespace characters separated by spaces, tabs, or line breaks. For example, 'hello-world' counts as one word, while 'hello world' counts as two. Numbers and special characters surrounded by whitespace are also counted as individual words.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Count Lines, Words, and Characters in Text",
  description:
    "A step-by-step guide to counting lines, words, characters, sentences, and paragraphs in any text using CoderDesign's free online line counter tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Line Counter",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Type Your Text",
      text: "Enter your text in the text area by typing directly or pasting from your clipboard. You can also upload a .txt file using the Upload button.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "View Real-Time Statistics",
      text: "Statistics appear instantly above the text area and update on every keystroke. You will see line count, word count, character count, sentence count, paragraph count, reading time, and more.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Upload a File (Optional)",
      text: "For large text files, click the Upload button to load a .txt file directly. The file is read locally in your browser and all statistics appear immediately.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy Your Text or Stats",
      text: "Use the Copy Stats button to copy all statistics as formatted text to your clipboard, or use the Copy Text button to copy the text content itself.",
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
      name: "Line Counter",
      item: "https://coderdesign.com/tools/lines-counter",
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
      <LinesCounterTool />
    </>
  );
}
