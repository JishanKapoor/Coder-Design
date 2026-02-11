import type { Metadata } from "next";
import EmojiCounterTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Emoji Counter – Count & Analyze Emojis in Text Online | CoderDesign",
  description:
    "Count all emojis in your text instantly. Free online emoji counter — see total emoji count, unique emojis, frequency breakdown, and most-used emojis. No sign-up, 100% private. By CoderDesign Toronto.",
  keywords:
    "emoji counter, count emojis in text, emoji frequency, emoji analyzer, emoji statistics, how many emojis, emoji breakdown, count emoji online free, emoji usage tracker, CoderDesign",
  openGraph: {
    title: "Free Emoji Counter – Count & Analyze Emojis in Text Online",
    description:
      "Count all emojis in your text instantly. Free online emoji counter — see total emoji count, unique emojis, frequency breakdown, and most-used emojis. No sign-up required.",
    url: "https://coderdesign.com/tools/emoji-counter",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Emoji Counter – Count & Analyze Emojis in Text | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Emoji Counter – Count & Analyze Emojis in Text | CoderDesign",
    description:
      "Count all emojis in your text instantly. Free, private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/emoji-counter",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Emoji Counter",
  description:
    "Free online tool to count and analyze all emojis in any text instantly. See total emoji count, unique emojis, frequency breakdown, most-used emojis, and emoji density. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/emoji-counter",
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
    ratingCount: "33",
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
      name: "What does the emoji counter do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The emoji counter scans your text and provides a complete analysis: total emoji count, unique emoji count, emoji density (emojis per 100 characters), the top 5 most-used emojis, and a full frequency breakdown table showing every emoji with its count and percentage of total usage. Results update in real-time as you type.",
      },
    },
    {
      "@type": "Question",
      name: "Does it count all types of emojis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool detects and counts all standard Unicode emojis including smiley faces, hand gestures, animals, food, flags, weather symbols, hearts, stars, transport, buildings, clocks, sports, music, and every other emoji category. It also counts skin-tone variants, gender variants, zero-width joiner sequences, regional indicator flags, and variation selectors.",
      },
    },
    {
      "@type": "Question",
      name: "Can it show emoji frequency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. The tool provides a full frequency breakdown table sorted by count (most-used first). Each row shows the emoji, its count, and its percentage of total emoji usage. This makes it easy to identify which emojis dominate your text and spot patterns in emoji usage across social media posts, chat logs, or any content.",
      },
    },
    {
      "@type": "Question",
      name: "Does it count multi-codepoint emojis like 👨\u200D👩\u200D👧\u200D👦?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool correctly handles multi-codepoint emojis including zero-width joiner (ZWJ) sequences like family emojis (👨\u200D👩\u200D👧\u200D👦), profession emojis (👩\u200D💻), and skin-tone modified emojis. Each ZWJ sequence is counted as a single emoji, not as multiple separate characters, giving you an accurate count.",
      },
    },
    {
      "@type": "Question",
      name: "Is the tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Emoji Counter is completely free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can analyze unlimited text as many times as you need. CoderDesign provides this tool as a free resource for marketers, researchers, data analysts, content creators, and anyone who needs emoji analytics.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this by disconnecting from the internet and using the tool offline after the page loads.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for social media analysis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Emoji Counter is perfect for analyzing emoji usage in social media posts, tweets, Instagram captions, Facebook posts, WhatsApp messages, Discord chats, and more. The frequency breakdown helps you understand which emojis resonate most with your audience, track emoji trends, and optimize content strategy.",
      },
    },
    {
      "@type": "Question",
      name: "Does it count text emoticons like :) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By default, the tool counts only Unicode emojis (the colorful graphical characters). However, you can enable the 'Include text emoticons' option to also count common text-based emoticons like :) :-) :( ;) :P :D XD :-/ :O and more. Text emoticons are counted separately from Unicode emojis so you get clear, distinct statistics for each type.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Count Emojis in Text",
  description:
    "A step-by-step guide to counting and analyzing emojis in any text using CoderDesign's free online Emoji Counter tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Emoji Counter",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Upload Your Text",
      text: "Enter your text in the input area by pasting from social media, chat apps, or any source. You can also upload a .txt file directly.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "See Instant Stats",
      text: "View real-time statistics including total emoji count, unique emoji count, and emoji density (emojis per 100 characters). Stats update as you type.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "View Frequency Breakdown",
      text: "Browse the sorted frequency table to see every emoji found in your text, how many times each appears, and what percentage of total emoji usage each represents.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download Results",
      text: "Use the Copy Stats button to copy a formatted summary to your clipboard, or click Download CSV to export the full frequency data for further analysis.",
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
      name: "Emoji Counter",
      item: "https://coderdesign.com/tools/emoji-counter",
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
      <EmojiCounterTool />
    </>
  );
}
