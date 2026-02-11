import type { Metadata } from "next";
import AlternatingCaseTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Alternating Case Converter – aLtErNaTiNg CaSe Generator Online | CoderDesign",
  description:
    "Free online alternating case converter & spongebob mocking text generator. Toggle case instantly — no sign-up, 100% private, works on any device. By CoderDesign Toronto.",
  keywords:
    "alternating case converter, alternating case generator, spongebob text generator, mocking text generator, toggle case converter, alternating caps, mixed case converter, free text tool online, alternating case text, sarcastic text generator, CoderDesign tools",
  openGraph: {
    title:
      "Free Alternating Case Converter – aLtErNaTiNg CaSe Generator Online",
    description:
      "Convert text to aLtErNaTiNg CaSe instantly. Free spongebob mocking text & toggle case generator. No sign-up, 100% private, works on any device.",
    url: "https://coderdesign.com/tools/alternating-case-converter",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Alternating Case Converter – aLtErNaTiNg CaSe Generator Online by CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Alternating Case Converter – aLtErNaTiNg CaSe Generator | CoderDesign",
    description:
      "Convert text to aLtErNaTiNg CaSe instantly. Free spongebob mocking text generator — no login, 100% private.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/alternating-case-converter",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Alternating Case Converter",
  description:
    "Free online alternating case converter and spongebob mocking text generator. Toggle between uppercase and lowercase letters instantly. No sign-up required, 100% private.",
  url: "https://coderdesign.com/tools/alternating-case-converter",
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
    ratingCount: "48",
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
      name: "What is alternating case text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alternating case text is a style of writing where each letter alternates between lowercase and uppercase, producing output like \"hElLo WoRlD\". It is commonly used for humor, the SpongeBob mocking meme, sarcastic text on social media, and creative typography in designs and gaming chat.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert text to alternating case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste or type your text into the input box, choose whether to start with an uppercase or lowercase letter, then click \"Convert to aLtErNaTiNg CaSe\". Your converted text appears instantly in the output box, ready to copy or download as a .txt file.",
      },
    },
    {
      "@type": "Question",
      name: "What is the SpongeBob mocking text meme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SpongeBob mocking meme uses alternating case text alongside an image of SpongeBob SquarePants to convey sarcasm. The uneven capitalization — like \"i DoN't nEeD tO sTuDy\" — visually signals a mocking tone. This tool generates that exact text style instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Is this alternating case converter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this tool is 100% free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can convert unlimited text as many times as you need without any restrictions.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text private and secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All text processing happens entirely in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party. When you close the page, all data is gone.",
      },
    },
    {
      "@type": "Question",
      name: "Can I start the alternation with uppercase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. By default the first letter is lowercase, but you can toggle the \"Start with uppercase\" option to begin with an uppercase letter instead. This gives you output like \"HeLlO wOrLd\" rather than \"hElLo WoRlD\".",
      },
    },
    {
      "@type": "Question",
      name: "Does alternating case work with numbers and symbols?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Numbers, symbols, and punctuation are preserved exactly as they are. Only alphabetical characters (A-Z, a-z) are affected by the alternating case conversion. The alternation counter only advances on letters, so the pattern stays consistent.",
      },
    },
    {
      "@type": "Question",
      name: "What are common uses for alternating case text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common uses include creating SpongeBob mocking meme text, making sarcastic social media posts, creative typography for designs and thumbnails, Discord and gaming chat messages, and attention-grabbing headlines. It is also used for testing text rendering in software.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert Text to Alternating Case",
  description:
    "A step-by-step guide to converting any text to alternating case using CoderDesign's free online alternating case converter tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Alternating Case Converter",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Type Your Text",
      text: "Enter your text in the input box. You can paste any text — sentences, paragraphs, or even entire documents.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Choose Starting Case",
      text: "Decide whether the first letter should be lowercase (default) or uppercase by toggling the \"Start with uppercase\" option.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Click Convert",
      text: "Press the \"Convert to aLtErNaTiNg CaSe\" button. Your text is converted instantly in your browser.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download",
      text: "Click \"Copy\" to copy the result to your clipboard or \"Download\" to save it as a .txt file.",
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
      name: "Alternating Case Converter",
      item: "https://coderdesign.com/tools/alternating-case-converter",
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
      <AlternatingCaseTool />
    </>
  );
}
