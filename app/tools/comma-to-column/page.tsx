import type { Metadata } from "next";
import Tool from "./content";

export const metadata: Metadata = {
  title:
    "Free Comma to Column Converter – Convert CSV Lists to Rows Online | CoderDesign",
  description:
    "Convert comma-separated lists to column format instantly. Free online CSV to rows converter — split delimited text into one item per line. Supports custom separators. No sign-up, 100% private. By CoderDesign Toronto.",
  keywords:
    "comma to column converter, csv to rows, comma separated list to column, split comma list, delimiter to line break, free text converter online, convert csv to lines, comma delimited to rows, list separator tool, CoderDesign tools",
  openGraph: {
    title:
      "Free Comma to Column Converter – Convert CSV Lists to Rows Online",
    description:
      "Convert comma-separated lists to column format instantly. Free online CSV to rows converter — split delimited text into one item per line. Supports custom separators. No sign-up required.",
    url: "https://coderdesign.com/tools/comma-to-column",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Comma to Column Converter - Online Tool by CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Comma to Column Converter – Convert CSV Lists to Rows | CoderDesign",
    description:
      "Convert comma-separated lists to column format instantly. Free online CSV to rows converter with custom separators. No login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/comma-to-column",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Comma to Column Converter",
  description:
    "Convert comma-separated lists to column format instantly. Free online CSV to rows converter — split delimited text into one item per line. Supports custom separators.",
  url: "https://coderdesign.com/tools/comma-to-column",
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
      name: "What does a comma to column converter do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'A comma to column converter takes a comma-separated list of values and splits each item onto its own line. Instead of a single line like "Toronto, Vancouver, Montreal", you get a clean column with one city per row. It is the fastest way to reformat CSV data, email lists, or any delimited text into a vertical list.',
      },
    },
    {
      "@type": "Question",
      name: "How do I convert a comma-separated list to individual lines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Paste your comma-separated text into the input box, make sure the separator is set to a comma (the default), then click "Convert to Column". Each item will appear on its own line in the output box. You can copy the result to your clipboard or download it as a .txt file.',
      },
    },
    {
      "@type": "Question",
      name: "Can I use separators other than commas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can change the separator to any character you like — semicolons, pipes (|), tabs, colons, dashes, or any custom string. Simply type your desired separator into the Separator field before clicking Convert. This makes the tool work with virtually any delimited text format.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this comma to column converter is 100% free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can process unlimited text as many times as you need without creating an account.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private and secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All text processing happens entirely in your browser using JavaScript. Your data is never sent to any server, stored in any database, or shared with any third party. When you close the page, all data is gone.",
      },
    },
    {
      "@type": "Question",
      name: "Does it trim whitespace from each item?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Yes, by default the tool trims leading and trailing whitespace from each item after splitting. This means "apple, banana, cherry" will produce clean lines without extra spaces. You can disable this behaviour by unchecking the "Trim whitespace" option if you need to preserve spaces.',
      },
    },
    {
      "@type": "Question",
      name: "Can I convert the output back to comma-separated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! CoderDesign offers a companion Column to Comma tool that does the reverse — it takes a list of items (one per line) and joins them back into a single comma-separated string. Together, the two tools give you full control over list formatting.",
      },
    },
    {
      "@type": "Question",
      name: "What file formats can I process?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can upload plain .txt files directly using the file upload button. The tool also accepts pasted text from any source — spreadsheets, code editors, emails, or web pages. After processing, you can download the output as a .txt file.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert Comma-Separated Text to Column Format",
  description:
    "A step-by-step guide to converting comma-separated lists into a column format using CoderDesign's free online comma to column converter tool.",
  totalTime: "PT1M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Comma to Column Converter",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Upload Your List",
      text: 'Enter your comma-separated text into the input box, or click "Upload .txt file" to load text from a file on your device.',
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Choose Your Separator",
      text: "Select or type the delimiter that separates your items. The default is a comma, but you can use semicolons, pipes, tabs, or any custom character.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Click Convert",
      text: 'Press the "Convert to Column" button to split your list into individual lines. The result appears instantly in the output box.',
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download",
      text: 'Click "Copy" to copy the column list to your clipboard, or click "Download" to save the result as a .txt file.',
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
      name: "Comma to Column Converter",
      item: "https://coderdesign.com/tools/comma-to-column",
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
      <Tool />
    </>
  );
}
