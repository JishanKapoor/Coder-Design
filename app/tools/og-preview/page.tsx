import type { Metadata } from "next";
import OgPreviewTool from "./content";

export const metadata: Metadata = {
  title:
    "Free OG Preview Tool – Preview Open Graph & Social Media Meta Tags | CoderDesign",
  description:
    "Preview how your website looks when shared on Facebook, Twitter/X, and LinkedIn. Free Open Graph meta tag previewer — test og:title, og:description, og:image, and Twitter cards instantly. No sign-up.",
  keywords:
    "og preview, open graph preview, social media preview, twitter card preview, facebook share preview, meta tag preview, og image tester, social share preview, linkedin preview, CoderDesign",
  openGraph: {
    title:
      "Free OG Preview Tool – Preview Open Graph & Social Media Meta Tags",
    description:
      "Preview how your website looks when shared on Facebook, Twitter/X, and LinkedIn. Free Open Graph meta tag previewer — test og:title, og:description, og:image, and Twitter cards instantly. No sign-up.",
    url: "https://coderdesign.com/tools/og-preview",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://coderdesign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free OG Preview Tool – Preview Open Graph & Social Media Meta Tags | CoderDesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free OG Preview Tool – Preview Open Graph & Social Media Meta Tags | CoderDesign",
    description:
      "Preview how your website looks when shared on Facebook, Twitter/X, and LinkedIn. Free OG meta tag previewer, 100% private, no login required.",
  },
  alternates: {
    canonical: "https://coderdesign.com/tools/og-preview",
  },
};

/* ─── Structured Data: WebApplication ─── */
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free OG Preview Tool",
  description:
    "Free online Open Graph and social media meta tag previewer. See exactly how your website looks when shared on Facebook, Twitter/X, and LinkedIn. Test og:title, og:description, og:image, and Twitter cards instantly. 100% private, no sign-up required.",
  url: "https://coderdesign.com/tools/og-preview",
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
      name: "What are Open Graph meta tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open Graph (OG) meta tags are HTML elements placed in the <head> section of a web page that control how content appears when shared on social media platforms like Facebook, Twitter/X, and LinkedIn. Key tags include og:title (the headline), og:description (a short summary), og:image (the preview image), og:url (the canonical URL), and og:site_name (the website name). Without OG tags, platforms guess what to display, often resulting in missing images or incorrect titles.",
      },
    },
    {
      "@type": "Question",
      name: "How does this OG preview tool work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter your Open Graph meta tag values — title, description, image URL, site URL, and site name — into the form fields. The tool instantly renders live preview cards showing exactly how your content will appear when shared on Facebook, Twitter/X, and LinkedIn. You can also generate copy-paste HTML meta tag code to add to your website's <head> section. All processing happens in your browser — no data is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Does it show previews for all platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool provides accurate preview cards for three major social platforms: Facebook (which uses the standard Open Graph protocol), Twitter/X (which supports both Twitter Cards and OG tags as a fallback), and LinkedIn (which also reads Open Graph tags). Each preview is styled to closely match the actual appearance on each platform, including image aspect ratios, text truncation, and typography.",
      },
    },
    {
      "@type": "Question",
      name: "Can I enter a URL to fetch OG tags automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool uses manual input rather than URL fetching. Because CoderDesign is a static site, it cannot make server-side requests to arbitrary URLs. Manual input gives you full control: you can test tags before deploying your page, preview changes without publishing, and experiment with different titles, descriptions, and images instantly. For fetching existing tags from a live URL, you can use browser developer tools or server-based OG debuggers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the ideal og:image size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ideal og:image size is 1200×630 pixels for Facebook and LinkedIn, and 1200×600 pixels for Twitter summary_large_image cards. Use a minimum of 600×315 pixels for Facebook. Images should be in JPEG or PNG format and under 5 MB. Always use an absolute URL (starting with https://) for the og:image tag. If your image is too small, platforms may not display it, and if the aspect ratio is wrong, it will be cropped automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the OG Preview Tool is completely free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can preview and generate meta tags as many times as you need. CoderDesign provides this tool as a free resource for web developers, marketers, SEO professionals, and anyone who wants to optimize their social media presence.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. The titles, descriptions, image URLs, and other information you enter are never stored, logged, or shared with any third party. Your data stays completely local to your browser session and is lost when you close the tab.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Twitter Card?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Twitter Card is a set of meta tags (twitter:card, twitter:title, twitter:description, twitter:image) that control how a link appears when shared on Twitter/X. There are two main types: 'summary' shows a small square image on the left with text on the right, and 'summary_large_image' shows a large image on top with text below. If Twitter Card tags are not present, Twitter falls back to reading Open Graph tags instead.",
      },
    },
  ],
};

/* ─── Structured Data: HowTo ─── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Preview Open Graph Tags",
  description:
    "A step-by-step guide to previewing how your website looks when shared on social media using CoderDesign's free OG Preview Tool.",
  totalTime: "PT2M",
  tool: {
    "@type": "HowToTool",
    name: "CoderDesign OG Preview Tool",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Enter Your OG Information",
      text: "Fill in the form fields with your og:title, og:description, og:image URL, og:url, and og:site_name. These are the core Open Graph meta tags that control how your link appears on social media.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Switch Between Platforms",
      text: "Use the platform tabs to preview how your content looks on Facebook, Twitter/X, and LinkedIn. Each platform renders shared links slightly differently, so check all three.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Fine-Tune Your Content",
      text: "Adjust your title length (keep under 60 characters), description (under 155 characters), and image URL. Watch the live preview update in real-time as you make changes.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy Meta Tags",
      text: "Click 'Generate Meta Tags' to produce the HTML code, then click 'Copy Code' to copy the meta tags to your clipboard. Paste them into the <head> section of your web page.",
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
      name: "OG Preview",
      item: "https://coderdesign.com/tools/og-preview",
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
      <OgPreviewTool />
    </>
  );
}
