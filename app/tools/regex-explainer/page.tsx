import type { Metadata } from "next";
import RegexExplainerTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Regex Explainer – Understand Regular Expressions Instantly | CoderDesign",
  description:
    "Paste any regex and get a plain-English explanation of every part. Free online regular expression explainer — decode complex patterns, learn regex syntax, debug expressions instantly. No sign-up, 100% private.",
  keywords:
    "regex explainer, regex to english, explain regular expression, regex decoder, regex breakdown, understand regex, regex cheat sheet, regex parser explained, regex tutorial tool, CoderDesign",
  openGraph: {
    title:
      "Free Regex Explainer – Understand Regular Expressions Instantly",
    description:
      "Paste any regex and get a plain-English explanation of every part. Free online regular expression explainer — decode complex patterns, learn regex syntax, debug expressions instantly. No sign-up required.",
    url: "https://coderdesign.com/tools/regex-explainer",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Regex Explainer – Understand Regular Expressions Instantly | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Regex Explainer – Understand Regular Expressions Instantly | CoderDesign",
    description:
      "Paste any regex and get a plain-English explanation of every part. Free regex decoder, 100% private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/regex-explainer",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Regex Explainer",
  description:
    "Free online tool to explain any regular expression in plain English. Paste a regex pattern and instantly see a color-coded breakdown of every token — anchors, quantifiers, character classes, groups, lookaheads, and more. Test against sample text to see matches highlighted. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/regex-explainer",
  applicationCategory: "DeveloperApplication",
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
};

/* ─── Structured Data: FAQPage ─── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the regex explainer do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Regex Explainer takes any regular expression you paste in and breaks it down token by token, giving you a plain-English description of every part — anchors, quantifiers, character classes, groups, lookaheads, back-references, and literal characters. It also lets you test the regex against sample text to see all matches highlighted in real time.",
      },
    },
    {
      "@type": "Question",
      name: "Can it explain any regular expression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports the vast majority of regular expression syntax used in JavaScript / ECMAScript, including character classes, quantifiers, capturing and non-capturing groups, lookaheads, lookbehinds, alternation, back-references, Unicode escapes, and all common shorthand classes like \\d, \\w, and \\s. Extremely exotic or engine-specific features from PCRE, .NET, or other flavors may not be tokenized perfectly, but the core syntax covers 99% of patterns you will encounter.",
      },
    },
    {
      "@type": "Question",
      name: "What regex flavors are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The explainer is built around JavaScript (ECMAScript) regular expression syntax, which is the most widely used flavor on the web. JavaScript regex supports features like lookaheads (?=), lookbehinds (?<=), named groups, Unicode mode, and the dotall flag. Since most regex syntax is shared across flavors, explanations are accurate for Python, Java, PHP, Ruby, and other engines in the vast majority of cases.",
      },
    },
    {
      "@type": "Question",
      name: "Does it support lookaheads and lookbehinds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool fully recognizes and explains positive lookaheads (?=...), negative lookaheads (?!...), positive lookbehinds (?<=...), and negative lookbehinds (?<!...). Each lookaround is displayed with a clear description of what it asserts — for example, 'Positive lookahead: followed by ...' — so you can understand zero-width assertions at a glance.",
      },
    },
    {
      "@type": "Question",
      name: "Can I test my regex against sample text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Below the explanation output there is a 'Test Against Sample Text' section where you can paste any string. The tool constructs a real RegExp object from your pattern and flags, finds all matches, highlights them in the text with colored markers, and shows a match count badge. This lets you verify that your regex matches exactly what you expect.",
      },
    },
    {
      "@type": "Question",
      name: "Is the tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Regex Explainer is completely free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can explain and test unlimited regular expressions as many times as you need. CoderDesign provides this tool as a free resource for developers, students, and anyone who works with regular expressions.",
      },
    },
    {
      "@type": "Question",
      name: "Is my regex stored?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All parsing and explanation happens entirely in your browser using client-side JavaScript. Your regex is never sent to any server, stored in any database, or shared with any third party. You can verify this by disconnecting from the internet after the page loads — the tool continues to work offline. We do not log or track any input.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the explanation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The explanations are generated by a deterministic token parser that follows ECMAScript regex grammar rules. Each token is mapped to a precise, unambiguous English description. The parser handles escaped characters, quantifiers, character classes (including ranges and negation), all group types, alternation, anchors, and shorthand classes. For standard JavaScript regex syntax the accuracy is extremely high. Edge cases involving deeply nested groups or engine-specific extensions may produce simplified descriptions.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Explain a Regular Expression",
  description:
    "A step-by-step guide to understanding any regular expression using CoderDesign's free online Regex Explainer tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Regex Explainer",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste Your Regular Expression",
      text: "Enter the regex pattern you want to understand in the input field. You can paste any valid regular expression — from simple patterns like \\d+ to complex ones with lookaheads, groups, and alternation.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Set Flags",
      text: "Choose the regex flags you want to apply: g (global), i (case-insensitive), m (multiline), s (dotall), or u (Unicode). Each flag modifies how the regex engine interprets the pattern.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Read the Explanation",
      text: "Press 'Explain Regex' to see a color-coded breakdown of every token in your regular expression. Each token is displayed with its regex syntax in monospace and a plain-English explanation of what it matches.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Test with Sample Text",
      text: "Paste sample text in the test area to see all matches highlighted in real time. The tool shows the total match count and visually marks each match so you can verify the regex works as expected.",
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
      name: "Regex Explainer",
      item: "https://coderdesign.com/tools/regex-explainer",
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
      <RegexExplainerTool />
    </>
  );
}
