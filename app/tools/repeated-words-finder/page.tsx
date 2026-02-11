import type { Metadata } from "next";
import RepeatedWordsFinderTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Repeated Words Finder – Find Duplicate & Overused Words Online | CoderDesign",
  description:
    "Find and count repeated words in any text instantly. Free online word frequency analyzer — identify overused words, improve writing quality, and optimize SEO content. No sign-up, 100% private. By CoderDesign Toronto.",
  keywords:
    "repeated words finder, word frequency counter, find duplicate words, overused word checker, word count by frequency, text word analyzer, writing improvement tool, word repetition checker free, SEO word density, CoderDesign tools",
  openGraph: {
    title:
      "Free Repeated Words Finder – Find Duplicate & Overused Words Online",
    description:
      "Find and count repeated words in any text instantly. Free online word frequency analyzer — identify overused words, improve writing quality, and optimize SEO content. No sign-up required.",
    url: "https://coderdesign.com/tools/repeated-words-finder",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Repeated Words Finder – Find Duplicate & Overused Words | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Repeated Words Finder – Find Duplicate & Overused Words | CoderDesign",
    description:
      "Find and count repeated words in any text instantly. Free word frequency analyzer, 100% private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/repeated-words-finder",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Repeated Words Finder",
  description:
    "Free online tool to find and count repeated words in any text instantly. Word frequency analyzer that identifies overused words, improves writing quality, and optimizes SEO content. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/repeated-words-finder",
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
    ratingCount: "41",
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
      name: "What does the repeated words finder do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Repeated Words Finder analyzes any text you paste or upload, counts how many times each word appears, calculates each word's percentage of total words, and displays the results in a ranked frequency table. It helps you identify overused words, spot repetitive language, and improve your writing quality by diversifying your vocabulary.",
      },
    },
    {
      "@type": "Question",
      name: "How is word frequency calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool splits your text into individual words using whitespace and punctuation boundaries, counts how many times each unique word appears, then calculates the percentage by dividing each word's count by the total number of words and multiplying by 100. Results are sorted by frequency (highest first) or alphabetically, depending on your preference.",
      },
    },
    {
      "@type": "Question",
      name: "Can I ignore common words like 'the' and 'and'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool includes an 'Ignore common words' option that is enabled by default. This filters out stop words — extremely frequent English words like 'the', 'a', 'an', 'and', 'or', 'is', 'are', 'to', 'of', 'in', 'for', 'it', 'this', 'that', pronouns, and other function words. This lets you focus on the meaningful content words that actually matter for your writing or SEO analysis.",
      },
    },
    {
      "@type": "Question",
      name: "Is the word matching case-sensitive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By default, the tool is case-insensitive — 'The', 'the', and 'THE' are all counted as the same word. You can enable the 'Case-sensitive' option if you need to distinguish between different capitalizations, which is useful for analyzing proper nouns, acronyms, or programming-related text where case matters.",
      },
    },
    {
      "@type": "Question",
      name: "How can this help improve my writing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By revealing which words you use most frequently, the tool helps you identify repetitive language patterns. If a word appears disproportionately often, you can replace some instances with synonyms or restructure sentences to create more varied, engaging prose. Writers, editors, students, and content creators all use word frequency analysis to polish their work and avoid monotonous repetition.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Repeated Words Finder is completely free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can analyze unlimited text as many times as you need. CoderDesign provides this tool as a free resource for writers, editors, students, SEO professionals, and anyone who wants to analyze word frequency in their text.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this yourself by disconnecting from the internet and using the tool offline after the page has loaded. We do not use analytics or tracking on your text content.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for SEO keyword density analysis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool is excellent for SEO keyword density analysis. Paste your article or page content, enable 'Ignore common words' to filter out stop words, and you will see exactly how often each keyword appears and what percentage of the total word count it represents. This helps you ensure your target keywords are used at an appropriate density without over-stuffing, which search engines penalize.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Find Repeated Words in Text",
  description:
    "A step-by-step guide to finding and counting repeated words in any text using CoderDesign's free online Repeated Words Finder tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Repeated Words Finder",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Upload Your Text",
      text: "Enter your text in the input area by pasting from any source — articles, essays, blog posts, or SEO content. You can also upload a .txt file directly.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Configure Analysis Options",
      text: "Choose whether to ignore common stop words, enable case-sensitive matching, set a minimum word length, and select how many top results to display.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Click Analyze",
      text: "Press the 'Find Repeated Words' button to instantly analyze your text. The tool counts every word's frequency and calculates percentages in milliseconds.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Review & Export Results",
      text: "Review the word frequency table showing rank, word, count, and percentage. Copy the results to your clipboard or download them as a CSV file for further analysis.",
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
      name: "Repeated Words Finder",
      item: "https://coderdesign.com/tools/repeated-words-finder",
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
      <RepeatedWordsFinderTool />
    </>
  );
}
