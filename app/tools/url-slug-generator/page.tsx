import type { Metadata } from "next";
import UrlSlugGeneratorTool from "./content";

export const metadata: Metadata = {
  title:
    "Free URL Slug Generator – Create SEO-Friendly Slugs Online | CoderDesign",
  description:
    "Convert any title or text into a clean, SEO-friendly URL slug. Free online slug generator — handles special characters, accents, and spaces. No sign-up, 100% private. By CoderDesign Toronto.",
  keywords:
    "url slug generator, seo slug creator, slug from title, slugify text, permalink generator, clean url maker, url friendly text, seo url tool, slug converter, CoderDesign",
  openGraph: {
    title: "Free URL Slug Generator – Create SEO-Friendly Slugs Online",
    description:
      "Convert any title or text into a clean, SEO-friendly URL slug. Free online slug generator — handles special characters, accents, and spaces. No sign-up required.",
    url: "https://coderdesign.com/tools/url-slug-generator",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free URL Slug Generator – Create SEO-Friendly Slugs | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free URL Slug Generator – Create SEO-Friendly Slugs Online | CoderDesign",
    description:
      "Convert any title or text into a clean, SEO-friendly URL slug. Free, private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/url-slug-generator",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free URL Slug Generator",
  description:
    "Free online tool to convert any title or text into a clean, SEO-friendly URL slug. Handles special characters, accents, Unicode, and spaces. Real-time generation, bulk mode, customizable options. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/url-slug-generator",
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
};

/* ─── Structured Data: FAQPage ─── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a URL slug?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A URL slug is the human-readable, URL-friendly portion of a web address that identifies a specific page. For example, in 'https://example.com/blog/my-first-post', the slug is 'my-first-post'. Slugs typically use lowercase letters, numbers, and hyphens instead of spaces and special characters, making URLs clean, descriptive, and easy to share.",
      },
    },
    {
      "@type": "Question",
      name: "How does the slug generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The slug generator converts your input text by normalizing Unicode characters (removing accents and diacritical marks), converting to lowercase, optionally removing common stop words, replacing spaces and special characters with your chosen separator (hyphen, underscore, or dot), collapsing multiple separators, and trimming separators from the start and end. The result is a clean, URL-safe string.",
      },
    },
    {
      "@type": "Question",
      name: "Does it handle special characters and accents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool uses Unicode NFD decomposition to strip combining diacritical marks, converting accented characters like é→e, ü→u, ñ→n, ç→c, ö→o, and å→a. It also removes or replaces other special characters such as ampersands, quotes, colons, semicolons, and punctuation, producing a clean ASCII slug compatible with all web servers and CMS platforms.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize the separator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can choose between three separator options: hyphen (-), underscore (_), or dot (.). Hyphens are the most common and recommended for SEO, as Google treats hyphens as word separators. Underscores are sometimes used in file-based URLs, and dots are common in certain CMS configurations. The default is hyphen.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good URL slug for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good SEO slug is short (3–5 words), descriptive of the page content, uses hyphens as separators, contains target keywords, avoids stop words (the, a, an, is, etc.), uses only lowercase letters and numbers, and avoids special characters. For example, 'best-react-tips-2024' is better than 'the-10-best-tips-for-learning-react-in-2024'. Our tool helps you create optimized slugs with options to remove stop words and set a maximum length.",
      },
    },
    {
      "@type": "Question",
      name: "Is the tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the URL Slug Generator is completely free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can generate unlimited slugs as many times as you need. CoderDesign provides this tool as a free resource for developers, bloggers, SEO professionals, and content creators.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this by disconnecting from the internet and using the tool offline after the page loads.",
      },
    },
    {
      "@type": "Question",
      name: "Can I generate slugs in bulk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Switch to Bulk Mode to convert multiple titles at once. Enter one title per line in the input textarea, click 'Generate All', and the tool will produce a corresponding slug for each line. You can then copy all slugs or download them as a text file. This is ideal for migrating content, setting up a new blog, or preparing URL structures for an entire website.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Generate a URL Slug",
  description:
    "A step-by-step guide to generating clean, SEO-friendly URL slugs from any title or text using CoderDesign's free online URL Slug Generator tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign URL Slug Generator",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Type or Paste Your Title",
      text: "Enter your page title, blog post heading, product name, or any text in the input field. The tool accepts any language and handles accents, symbols, and Unicode characters.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "See the Slug Instantly",
      text: "Watch the slug update in real time as you type. The tool converts your text to a clean, URL-friendly slug with live preview — no button click needed for single mode.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Customize Options",
      text: "Adjust the separator (hyphen, underscore, or dot), toggle lowercase conversion, enable stop word removal for shorter slugs, set a maximum length, and choose whether to strip accents.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy Your Slug",
      text: "Click the 'Copy Slug' button to copy the generated slug to your clipboard. You can then paste it directly into your CMS, blog editor, or code. In bulk mode, copy all slugs or download them as a text file.",
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
      name: "URL Slug Generator",
      item: "https://coderdesign.com/tools/url-slug-generator",
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
      <UrlSlugGeneratorTool />
    </>
  );
}
