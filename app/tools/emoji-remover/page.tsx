import type { Metadata } from "next";
import EmojiRemoverTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Emoji Remover – Strip Emojis & Emoticons from Text Online | CoderDesign",
  description:
    "Remove all emojis, emoticons, and special Unicode symbols from any text instantly. Free online emoji stripper — clean text for professional use, data processing, or coding. No sign-up, 100% private. By CoderDesign Toronto.",
  keywords:
    "emoji remover, remove emojis from text, strip emojis online, emoji stripper tool, delete emoticons from text, clean emoji text, remove unicode symbols, text without emojis, free emoji remover tool, CoderDesign tools",
  openGraph: {
    title:
      "Free Emoji Remover – Strip Emojis & Emoticons from Text Online",
    description:
      "Remove all emojis, emoticons, and special Unicode symbols from any text instantly. Free online emoji stripper — clean text for professional use, data processing, or coding. No sign-up required.",
    url: "https://coderdesign.com/tools/emoji-remover",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Emoji Remover – Strip Emojis & Emoticons from Text | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Emoji Remover – Strip Emojis & Emoticons from Text | CoderDesign",
    description:
      "Remove all emojis, emoticons, and special Unicode symbols from any text instantly. Free, private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/emoji-remover",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Emoji Remover",
  description:
    "Free online tool to remove all emojis, emoticons, and special Unicode symbols from any text instantly. Clean text for professional use, data processing, or coding. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/emoji-remover",
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
    ratingCount: "39",
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
      name: "What types of emojis does this tool remove?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool removes all standard Unicode emojis including smiley faces, hand gestures, animals, food and drink, flags, weather symbols, hearts, stars, transport, buildings, clocks, sports, music, and every other emoji category defined in the Unicode Standard. It also catches skin-tone modifiers, gender variants, zero-width joiner sequences (family emojis, profession emojis), and regional indicator flags.",
      },
    },
    {
      "@type": "Question",
      name: "How do I remove emojis from text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply paste your text into the input area, optionally check the box to also remove text emoticons like :) and ;-P, then click 'Remove Emojis.' The tool will instantly strip all emoji characters and display the clean text in the output area, ready to copy or download as a .txt file.",
      },
    },
    {
      "@type": "Question",
      name: "Does it remove emoticons like :) and :-P too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By default, the tool only removes Unicode emojis (the colorful graphical characters). However, you can enable the 'Also remove text emoticons' option to strip common text-based emoticons like :) :-) :( ;) :P :D XD :-/ :O and more. This is optional because some users want to keep text emoticons while only removing Unicode emojis.",
      },
    },
    {
      "@type": "Question",
      name: "Will it remove non-emoji Unicode symbols?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The tool specifically targets emoji Unicode ranges and leaves standard text characters, accented letters, CJK characters, mathematical symbols, and other non-emoji Unicode intact. It is designed to be precise — removing only emojis without damaging the rest of your text content.",
      },
    },
    {
      "@type": "Question",
      name: "Is this emoji remover free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Emoji Remover is completely free with no limitations whatsoever. There are no hidden charges, no premium tiers, and no sign-up required. You can clean unlimited text as many times as you need. CoderDesign provides this tool as a free resource for developers, writers, data analysts, marketers, and anyone who needs to strip emojis from text.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text private and secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this yourself by disconnecting from the internet and using the tool offline after the page has loaded.",
      },
    },
    {
      "@type": "Question",
      name: "Why would I need to remove emojis from text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common reasons include cleaning social media data for NLP and sentiment analysis, preparing text for databases that don't support emoji encoding, creating professional email or document content, sanitizing user input in web applications, cleaning text for print materials, and ensuring compatibility with legacy systems that cannot render emojis.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work with text from social media?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool works perfectly with text copied from Twitter/X, Instagram, Facebook, WhatsApp, Discord, Telegram, TikTok, and any other social media platform. Simply copy the text containing emojis, paste it into the input area, and click Remove Emojis to get clean text instantly.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Remove Emojis from Text",
  description:
    "A step-by-step guide to removing emojis, emoticons, and Unicode symbols from any text using CoderDesign's free online Emoji Remover tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Emoji Remover",
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
      name: "Choose Options",
      text: "Optionally enable the 'Also remove text emoticons' checkbox to strip text-based emoticons like :) and ;-P in addition to Unicode emojis.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Click Remove Emojis",
      text: "Press the 'Remove Emojis' button to process your text. All emoji characters will be instantly stripped from the text.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download Clean Text",
      text: "Use the Copy button to copy the cleaned text to your clipboard, or click Download to save it as a .txt file. A stats badge shows exactly how many emojis were removed.",
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
      name: "Emoji Remover",
      item: "https://coderdesign.com/tools/emoji-remover",
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
      <EmojiRemoverTool />
    </>
  );
}
