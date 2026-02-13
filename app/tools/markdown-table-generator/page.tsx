import type { Metadata } from "next";
import MarkdownTableGeneratorTool from "./content";

export const metadata: Metadata = {
  title:
    "Free Markdown Table Generator – Create & Format Tables Online | CoderDesign",
  description:
    "Create beautiful Markdown tables instantly. Free online Markdown table generator — add rows, columns, align text, import CSV, and copy ready-to-use Markdown. No sign-up, 100% private. By CoderDesign Toronto.",
  keywords:
    "markdown table generator, create markdown table, markdown table creator, CSV to markdown table, markdown table formatter, free table generator, github markdown table, markdown column alignment, CoderDesign",
  openGraph: {
    title:
      "Free Markdown Table Generator – Create & Format Tables Online",
    description:
      "Create beautiful Markdown tables instantly. Free online Markdown table generator — add rows, columns, align text, import CSV, and copy ready-to-use Markdown. No sign-up, 100% private.",
    url: "https://coderdesign.com/tools/markdown-table-generator",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Markdown Table Generator – Create & Format Tables Online | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Markdown Table Generator – Create & Format Tables Online | CoderDesign",
    description:
      "Create beautiful Markdown tables instantly. Free online Markdown table generator — add rows, columns, align text, import CSV, and copy ready-to-use Markdown. 100% private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/markdown-table-generator",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Markdown Table Generator",
  description:
    "Free online tool to create and format Markdown tables with a visual grid editor. Add rows, columns, set alignment, import CSV, and copy ready-to-use Markdown. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/markdown-table-generator",
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
      name: "What is a Markdown table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Markdown table is a lightweight way to display tabular data using plain text. It uses pipes (|) to separate columns and hyphens (-) to create a header row separator. Markdown tables are widely supported on GitHub, GitLab, Bitbucket, Reddit, Stack Overflow, static-site generators like Jekyll and Hugo, and most Markdown editors. They render as clean HTML tables without requiring any HTML code.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a Markdown table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use CoderDesign's free Markdown Table Generator: set your desired number of rows and columns, type your data into the interactive grid editor, choose column alignment (left, center, or right), and click Generate Markdown. The tool outputs perfectly formatted Markdown table syntax that you can copy and paste directly into any Markdown file, README, or documentation.",
      },
    },
    {
      "@type": "Question",
      name: "Can I import CSV data to create a table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Click the Import CSV button, paste your comma-separated data into the textarea, and click Import. The tool automatically detects rows and columns, sets the first row as headers, and populates the grid. This is perfect for converting spreadsheet exports, database query results, or any CSV file into a clean Markdown table.",
      },
    },
    {
      "@type": "Question",
      name: "What alignment options are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can set each column independently to left-aligned (:---), center-aligned (:---:), or right-aligned (---:). Click the alignment buttons below each column header to toggle between options. The alignment is reflected in the generated Markdown using standard GitHub Flavored Markdown (GFM) alignment syntax.",
      },
    },
    {
      "@type": "Question",
      name: "Does this work for GitHub Flavored Markdown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The generated table syntax is fully compatible with GitHub Flavored Markdown (GFM), which is the standard used in GitHub README files, issues, pull requests, and wikis. It also works on GitLab, Bitbucket, Notion, Obsidian, and any platform that supports GFM tables.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Markdown Table Generator is completely free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can generate unlimited tables as many times as you need. CoderDesign provides this tool as a free resource for developers, technical writers, and anyone who works with Markdown.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data stored anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your table data is never stored in any database, logged, or shared with any third party. You can verify this by disconnecting from the internet after the page loads and the tool will continue to work perfectly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add or remove rows and columns dynamically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool provides buttons to add or remove rows and columns at any time. You can start with a small table and expand it, or remove rows and columns you no longer need. The grid editor updates instantly and your existing data is preserved when adding new rows or columns.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Generate a Markdown Table Online",
  description:
    "A step-by-step guide to creating and formatting Markdown tables using CoderDesign's free online Markdown Table Generator tool.",
  totalTime: "PT2M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign Markdown Table Generator",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Set Rows & Columns",
      text: "Choose your table size by setting the number of rows and columns. You can always add or remove more later.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Fill in Your Data",
      text: "Type directly into the interactive grid editor. Enter column headers in the top row and data in the body cells. You can also import CSV data.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Set Alignment",
      text: "Click the left, center, or right alignment buttons below each column header to control text alignment in the generated Markdown.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy the Markdown",
      text: "Click Generate Markdown to produce the formatted table. Copy it to your clipboard with one click, or download it as a .md file.",
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
      name: "Markdown Table Generator",
      item: "https://coderdesign.com/tools/markdown-table-generator",
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
      <MarkdownTableGeneratorTool />
    </>
  );
}
