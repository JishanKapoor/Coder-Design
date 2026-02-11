import type { Metadata } from "next";
import SpecialCharRemoverTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Special Character Remover – Strip Symbols & Punctuation from Text Online | CoderDesign",
  description:
    "Remove special characters, symbols, and punctuation from any text instantly. Free online text cleaner — keep only letters, numbers, and spaces. Customizable filters. No sign-up, 100% private. By CoderDesign Toronto.",
  keywords:
    "special character remover, remove symbols from text, strip punctuation, text cleaner online, remove special characters, clean text tool free, remove non-alphanumeric characters, text sanitizer, strip symbols online, CoderDesign tools",
  openGraph: {
    title:
      "Free Special Character Remover – Strip Symbols & Punctuation from Text Online",
    description:
      "Remove special characters, symbols, and punctuation from any text instantly. Free online text cleaner — keep only letters, numbers, and spaces. Customizable filters. No sign-up required.",
    url: "https://coderdesign.com/tools/special-character-remover",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Special Character Remover – Strip Symbols & Punctuation | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Special Character Remover – Strip Symbols & Punctuation | CoderDesign",
    description:
      "Remove special characters, symbols, and punctuation from any text instantly. Customizable filters. Free, private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/special-character-remover",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Special Character Remover",
  description:
    "Free online tool to remove special characters, symbols, and punctuation from any text instantly. Customizable filters let you keep letters, numbers, spaces, and specific characters. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/special-character-remover",
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
    ratingCount: "44",
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
      name: "What counts as a special character?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A special character is any character that is not a standard letter (a-z, A-Z) or digit (0-9). This includes punctuation marks like commas, periods, exclamation points, and question marks, as well as symbols such as @, #, $, %, ^, &, *, and brackets. Spaces and newlines are technically special characters too, but the tool lets you choose to keep them.",
      },
    },
    {
      "@type": "Question",
      name: "How do I remove special characters from text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply paste your text into the input area, select which character types you want to keep (letters, numbers, spaces, etc.), and click 'Remove Special Characters.' The tool will instantly strip all unwanted characters and display the clean text in the output area, ready to copy or download.",
      },
    },
    {
      "@type": "Question",
      name: "Can I choose which characters to keep or remove?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool provides granular control through checkboxes for keeping letters, numbers, spaces, newlines, periods, commas, and hyphens. You can also enter any custom characters you want to preserve in the 'Custom characters to keep' field. This makes it easy to tailor the cleaning to your exact needs.",
      },
    },
    {
      "@type": "Question",
      name: "Does it remove accented characters like é or ñ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By default, accented characters like é, ñ, ü, and other non-ASCII letters are treated as special characters and will be removed. The 'Keep letters' option preserves only standard ASCII letters (a-z, A-Z). If you need to keep specific accented characters, you can add them to the custom characters field.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Special Character Remover is completely free with no limitations. There are no hidden charges, premium tiers, or sign-up requirements. You can clean unlimited text as many times as you need. CoderDesign provides this tool as a free resource for developers, writers, data analysts, and anyone who needs to sanitize text.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text data safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All processing happens entirely in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party. You can verify this by disconnecting from the internet and using the tool offline after the page loads.",
      },
    },
    {
      "@type": "Question",
      name: "Can I keep numbers while removing symbols?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Simply check the 'Keep numbers' checkbox and the tool will preserve all digits (0-9) while removing symbols, punctuation, and other special characters. You can combine this with other options — for example, keeping letters, numbers, and spaces while stripping everything else.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work with Unicode text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the tool processes Unicode text correctly. It can handle text in any language or script. However, by default only ASCII letters (a-z, A-Z) are considered 'letters' for the keep filter. Non-ASCII characters like Chinese, Arabic, or Cyrillic text will be removed unless you add them to the custom characters field.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Remove Special Characters from Text",
  description:
    "A step-by-step guide to removing special characters, symbols, and punctuation from any text using CoderDesign's free online Special Character Remover tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Special Character Remover",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Upload Your Text",
      text: "Enter your text in the input area by typing directly, pasting from your clipboard, or uploading a .txt file using the Upload button.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Choose What to Keep",
      text: "Select which character types to preserve using the checkboxes: letters, numbers, spaces, newlines, periods, commas, and hyphens. You can also enter custom characters to keep.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Click Remove Special Characters",
      text: "Press the 'Remove Special Characters' button to process your text. All characters not matching your selected filters will be instantly removed.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download Clean Text",
      text: "Use the Copy button to copy the cleaned text to your clipboard, or click Download to save it as a .txt file. The before/after character count shows exactly how many characters were removed.",
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
      name: "Special Character Remover",
      item: "https://coderdesign.com/tools/special-character-remover",
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
      <SpecialCharRemoverTool />
    </>
  );
}
