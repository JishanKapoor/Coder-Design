"use client";
import { useState, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Trash2,
  Check,
  Zap,
  Shield,
  Globe,
  Code2,
  FileText,
  Clock,
  Eye,
  ArrowRight,
  Type,
  Image,
  Share2,
  ExternalLink,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

/* ─── Types ─── */
type Platform = "facebook" | "twitter" | "linkedin";
type TwitterCardType = "summary" | "summary_large_image";

export default function OgPreviewTool() {
  /* ─── State ─── */
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  const [ogSiteName, setOgSiteName] = useState("");
  const [twitterCardType, setTwitterCardType] =
    useState<TwitterCardType>("summary_large_image");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [activePreview, setActivePreview] = useState<Platform>("facebook");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCodeGen, setShowCodeGen] = useState(false);

  /* ─── Derived values ─── */
  const effectiveTwitterTitle = twitterTitle || ogTitle;
  const effectiveTwitterDescription = twitterDescription || ogDescription;

  /* ─── Extract domain from URL ─── */
  const extractDomain = useCallback((url: string): string => {
    if (!url) return "example.com";
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      return u.hostname;
    } catch {
      return url;
    }
  }, []);

  /* ─── Generate Meta Tags ─── */
  const generateMetaTags = useCallback((): string => {
    const lines: string[] = [];
    lines.push("<!-- Open Graph Meta Tags -->");
    if (ogTitle)
      lines.push(`<meta property="og:title" content="${ogTitle}" />`);
    if (ogDescription)
      lines.push(
        `<meta property="og:description" content="${ogDescription}" />`
      );
    if (ogImage)
      lines.push(`<meta property="og:image" content="${ogImage}" />`);
    if (ogUrl) lines.push(`<meta property="og:url" content="${ogUrl}" />`);
    if (ogSiteName)
      lines.push(
        `<meta property="og:site_name" content="${ogSiteName}" />`
      );
    lines.push('<meta property="og:type" content="website" />');
    lines.push("");
    lines.push("<!-- Twitter Card Meta Tags -->");
    lines.push(
      `<meta name="twitter:card" content="${twitterCardType}" />`
    );
    if (effectiveTwitterTitle)
      lines.push(
        `<meta name="twitter:title" content="${effectiveTwitterTitle}" />`
      );
    if (effectiveTwitterDescription)
      lines.push(
        `<meta name="twitter:description" content="${effectiveTwitterDescription}" />`
      );
    if (ogImage)
      lines.push(`<meta name="twitter:image" content="${ogImage}" />`);
    return lines.join("\n");
  }, [
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogSiteName,
    twitterCardType,
    effectiveTwitterTitle,
    effectiveTwitterDescription,
  ]);

  /* ─── Copy code to clipboard ─── */
  const handleCopyCode = async () => {
    const code = generateMetaTags();
    await navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ─── Clear all fields ─── */
  const handleClear = () => {
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setOgUrl("");
    setOgSiteName("");
    setTwitterCardType("summary_large_image");
    setTwitterTitle("");
    setTwitterDescription("");
    setShowCodeGen(false);
    setCopied(false);
  };

  /* ─── Truncate helper ─── */
  const truncate = (text: string, maxLen: number): string => {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen).trimEnd() + "…";
  };

  /* ─── Data arrays ─── */

  const features = [
    {
      icon: Eye,
      title: "Live Social Previews",
      description:
        "See exactly how your link will appear when shared on Facebook, Twitter/X, and LinkedIn. Live preview cards update in real-time as you type — no need to click a button or wait for results.",
    },
    {
      icon: Code2,
      title: "Meta Tag Generator",
      description:
        "Generate copy-paste HTML meta tag code for both Open Graph and Twitter Card tags. One click copies the complete code to your clipboard, ready to drop into your site's <head> section.",
    },
    {
      icon: Shield,
      title: "100% Private",
      description:
        "All processing happens locally in your browser using JavaScript. Your titles, descriptions, image URLs, and other data are never sent to any server, stored, or shared with any third party.",
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description:
        "The preview cards update instantly as you type — no delays, no loading spinners, and no submit button needed. See every character change reflected immediately in the live preview cards.",
    },
    {
      icon: Globe,
      title: "All Major Platforms",
      description:
        "Preview your content across all three major social platforms: Facebook (Open Graph), Twitter/X (Twitter Cards), and LinkedIn (Open Graph). Each platform renders shared links differently.",
    },
    {
      icon: Image,
      title: "Image Preview",
      description:
        "See exactly how your og:image will be cropped and displayed on each platform. Facebook uses a 1.91:1 ratio, Twitter large cards use a 2:1 ratio, and LinkedIn has its own sizing — check them all.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Enter Your OG Information",
      description:
        "Fill in the form with your og:title, og:description, og:image URL, og:url, and og:site_name. These core Open Graph tags control how your link appears when shared on social media platforms.",
    },
    {
      step: 2,
      title: "Switch Between Platforms",
      description:
        "Use the Facebook, Twitter/X, and LinkedIn tabs to see how your content renders on each platform. Each has different styling, image aspect ratios, and text truncation rules.",
    },
    {
      step: 3,
      title: "Fine-Tune Your Content",
      description:
        "Adjust your title length (keep under 60 characters), description (under 155 characters), and image URL. Watch the live preview update in real-time to perfect your social media presence.",
    },
    {
      step: 4,
      title: "Copy Meta Tags",
      description:
        "Click 'Generate Meta Tags' to produce the HTML code for both Open Graph and Twitter Card meta tags. Click 'Copy Code' and paste them into the <head> section of your web page.",
    },
  ];

  const useCases = [
    {
      icon: Share2,
      title: "Optimize Social Shares",
      description:
        "Preview exactly how your blog post, article, or landing page will look before you share it on social media. Catch truncated titles, missing images, and poorly formatted descriptions before your audience sees them.",
    },
    {
      icon: Globe,
      title: "SEO & Marketing",
      description:
        "Ensure consistent branding across Facebook, Twitter/X, and LinkedIn. Marketing teams use OG previews to verify that campaigns display correctly on every platform, maintaining professional brand presence.",
    },
    {
      icon: Code2,
      title: "Web Development",
      description:
        "Test and debug Open Graph meta tags during development without deploying. Enter your tags, see the preview, generate the HTML code, and paste it into your site — all before pushing to production.",
    },
    {
      icon: FileText,
      title: "Content Marketing",
      description:
        "Perfect your blog post and article previews. Content marketers use this tool to craft compelling titles and descriptions that maximize click-through rates when content is shared on social platforms.",
    },
    {
      icon: Type,
      title: "Brand Consistency",
      description:
        "Verify that your brand name, logo image, and messaging display correctly across all platforms. Inconsistent previews confuse audiences — use this tool to ensure every share looks professional and on-brand.",
    },
  ];

  const faqs = [
    {
      question: "What are Open Graph meta tags?",
      answer:
        "Open Graph (OG) meta tags are HTML elements placed in the <head> section of a web page that control how content appears when shared on social media platforms like Facebook, Twitter/X, and LinkedIn. The core tags are og:title (the headline shown in the share card), og:description (a short summary), og:image (the preview image), og:url (the canonical URL), og:site_name (your website name), and og:type (usually \"website\" or \"article\"). Without proper OG tags, platforms guess what to display, often resulting in missing images, wrong titles, or generic descriptions that hurt click-through rates.",
    },
    {
      question: "What is the ideal og:image size?",
      answer:
        "The ideal og:image size is 1200×630 pixels for Facebook and LinkedIn (1.91:1 aspect ratio), and 1200×600 pixels for Twitter summary_large_image cards (2:1 aspect ratio). Use a minimum of 600×315 pixels for Facebook — anything smaller may not be displayed. For Twitter summary cards (small square thumbnail), use 144×144 pixels minimum, ideally 400×400 pixels. Images should be JPEG or PNG format, under 5 MB in file size, and always referenced with an absolute URL starting with https://. If your image dimensions don't match the platform's expected ratio, it will be cropped automatically from the center.",
    },
    {
      question: "What are the recommended character limits for OG tags?",
      answer:
        "For og:title, keep it under 60 characters to avoid truncation on most platforms. Facebook shows approximately 60–90 characters, but Twitter and LinkedIn cut off sooner. For og:description, aim for 155 characters or fewer — Facebook displays up to about 200 characters, but Twitter shows less. The og:site_name should be your brand name, typically 20–30 characters. These are recommendations, not hard limits — the text won't break, but it will be truncated with an ellipsis if too long, which looks less professional.",
    },
    {
      question: "What are the different Twitter Card types?",
      answer:
        "Twitter supports two main card types for standard websites. 'summary' displays a small square thumbnail image (144×144 minimum) on the left with the title, description, and domain on the right — good for articles and general content. 'summary_large_image' displays a large image (1200×600 recommended) spanning the full width of the card with text below — ideal for visual content, blog posts, and marketing pages. There are also 'player' cards for video/audio and 'app' cards for mobile applications, but those require additional approval from Twitter.",
    },
    {
      question: "Where should I place meta tags in my HTML?",
      answer:
        "Open Graph and Twitter Card meta tags must be placed inside the <head> section of your HTML document, before the closing </head> tag. They should appear alongside your other meta tags like charset, viewport, and description. The order within <head> doesn't matter, but it's good practice to group all OG tags together followed by Twitter Card tags for readability. In modern frameworks like Next.js, React, or WordPress, you typically set these through the framework's metadata API rather than raw HTML — but the generated output still ends up in <head>.",
    },
    {
      question: "How do I debug cached social media previews?",
      answer:
        "Social platforms cache OG data aggressively. To force a refresh: for Facebook, use the Facebook Sharing Debugger (developers.facebook.com/tools/debug/) — paste your URL and click 'Scrape Again'. For Twitter, use the Twitter Card Validator (cards-dev.twitter.com/validator). For LinkedIn, use the LinkedIn Post Inspector (linkedin.com/post-inspector/). After updating your meta tags, you must use these platform-specific tools to clear the cache. Simply re-sharing the link won't fetch new data — the old cached preview will persist until you manually purge it.",
    },
    {
      question: "What are common OG tag mistakes?",
      answer:
        "The most common mistakes are: (1) using relative image URLs instead of absolute URLs starting with https://, (2) missing og:image entirely so platforms show no preview image, (3) titles that are too long and get truncated mid-word, (4) not setting og:type (defaults vary by platform), (5) using images that are too small (under 200×200 pixels) or wrong aspect ratio, (6) forgetting Twitter Card tags (twitter:card is required for Twitter to render cards), (7) duplicate or conflicting OG tags, and (8) not testing on all platforms since each renders differently.",
    },
    {
      question: "Does LinkedIn use its own meta tags or Open Graph?",
      answer:
        "LinkedIn primarily reads standard Open Graph meta tags (og:title, og:description, og:image, og:url) to render link previews. LinkedIn does not have its own proprietary meta tag system like Twitter Cards. However, LinkedIn has specific requirements: images should be at least 1200×627 pixels for the best display, og:image must use an absolute HTTPS URL, and the page must be publicly accessible (LinkedIn's crawler can't access password-protected pages). LinkedIn caches previews for about 7 days, and you can force a refresh using the LinkedIn Post Inspector tool.",
    },
  ];

  /* ─── Platform tabs ─── */
  const platforms: { key: Platform; label: string }[] = [
    { key: "facebook", label: "Facebook" },
    { key: "twitter", label: "Twitter / X" },
    { key: "linkedin", label: "LinkedIn" },
  ];

  /* ─── Preview Components ─── */

  const FacebookPreview = () => {
    const domain = extractDomain(ogUrl);
    return (
      <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
        {/* Image */}
        <div className="relative aspect-[1.91/1] w-full bg-gray-200">
          {ogImage ? (
            <img
              src={ogImage}
              alt="OG Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <Image className="h-12 w-12" />
            </div>
          )}
        </div>
        {/* Text content */}
        <div className="border-t border-gray-200 bg-[#f2f3f5] px-3 py-2.5">
          <p className="text-[11px] font-normal uppercase tracking-wide text-[#606770]">
            {ogSiteName || domain}
          </p>
          <p className="mt-0.5 text-[14px] font-semibold leading-[18px] text-[#1d2129] line-clamp-1">
            {ogTitle || "Page Title"}
          </p>
          <p className="mt-0.5 text-[13px] leading-[16px] text-[#606770] line-clamp-2">
            {ogDescription || "Page description will appear here."}
          </p>
        </div>
      </div>
    );
  };

  const TwitterPreview = () => {
    const domain = extractDomain(ogUrl);

    if (twitterCardType === "summary") {
      /* ── Summary card: small image left, text right ── */
      return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="flex">
            {/* Small image */}
            <div className="relative h-[125px] w-[125px] flex-shrink-0 bg-gray-200">
              {ogImage ? (
                <img
                  src={ogImage}
                  alt="Twitter Card Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  <Image className="h-8 w-8" />
                </div>
              )}
            </div>
            {/* Text */}
            <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2.5">
              <p className="text-[13px] text-[#536471]">{domain}</p>
              <p className="mt-0.5 text-[15px] font-bold leading-[20px] text-[#0f1419] line-clamp-1">
                {effectiveTwitterTitle || "Page Title"}
              </p>
              <p className="mt-0.5 text-[13px] leading-[16px] text-[#536471] line-clamp-2">
                {effectiveTwitterDescription ||
                  "Page description will appear here."}
              </p>
            </div>
          </div>
        </div>
      );
    }

    /* ── summary_large_image card ── */
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Large image */}
        <div className="relative aspect-[2/1] w-full bg-gray-200">
          {ogImage ? (
            <img
              src={ogImage}
              alt="Twitter Card Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <Image className="h-12 w-12" />
            </div>
          )}
        </div>
        {/* Text */}
        <div className="px-3 py-2.5">
          <p className="text-[13px] text-[#536471]">{domain}</p>
          <p className="mt-0.5 text-[15px] font-bold leading-[20px] text-[#0f1419] line-clamp-1">
            {effectiveTwitterTitle || "Page Title"}
          </p>
          <p className="mt-0.5 text-[13px] leading-[16px] text-[#536471] line-clamp-2">
            {effectiveTwitterDescription ||
              "Page description will appear here."}
          </p>
        </div>
      </div>
    );
  };

  const LinkedInPreview = () => {
    const domain = extractDomain(ogUrl);
    return (
      <div className="overflow-hidden rounded-sm border border-[#e0dfdc] bg-white shadow-sm">
        {/* Image */}
        <div className="relative aspect-[1.91/1] w-full bg-gray-200">
          {ogImage ? (
            <img
              src={ogImage}
              alt="LinkedIn Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <Image className="h-12 w-12" />
            </div>
          )}
        </div>
        {/* Text content */}
        <div className="border-t border-[#e0dfdc] bg-[#f3f2ef] px-3 py-2.5">
          <p className="text-[14px] font-semibold leading-[20px] text-[#000000e6] line-clamp-1">
            {ogTitle || "Page Title"}
          </p>
          <p className="mt-0.5 text-[12px] leading-[16px] text-[#00000099] line-clamp-1">
            {domain}
          </p>
        </div>
      </div>
    );
  };

  /* ─── Render ─── */

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-600 to-pink-700 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-1.5 text-sm text-white/70"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">
              Free Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">OG Preview</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Eye className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-4xl">
              Free OG Preview Tool – Preview Social Media Meta Tags
            </h1>
          </div>

          <p className="max-w-2xl text-white/90 leading-relaxed">
            See exactly how your website will look when shared on Facebook,
            Twitter/X, and LinkedIn. Enter your Open Graph meta tags and get
            instant live previews — optimize your social media presence for
            maximum click-through rates and SEO impact. Free, private, no login
            required.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              100% Private
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              Real-Time
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              All Platforms
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              No Sign-Up
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Tool Section ── */}
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* ── Left: Input Form ── */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Enter Open Graph Information
              </h2>

              {/* og:title */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  og:title{" "}
                  <span className="text-xs font-normal text-slate-400">
                    (recommended: under 60 characters)
                  </span>
                </label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="My Awesome Page Title"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-colors"
                />
                {ogTitle.length > 0 && (
                  <p
                    className={`mt-1 text-xs ${ogTitle.length > 60 ? "text-amber-600" : "text-slate-400"}`}
                  >
                    {ogTitle.length}/60 characters
                  </p>
                )}
              </div>

              {/* og:description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  og:description{" "}
                  <span className="text-xs font-normal text-slate-400">
                    (recommended: under 155 characters)
                  </span>
                </label>
                <textarea
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="A brief description of your page content..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-colors"
                />
                {ogDescription.length > 0 && (
                  <p
                    className={`mt-1 text-xs ${ogDescription.length > 155 ? "text-amber-600" : "text-slate-400"}`}
                  >
                    {ogDescription.length}/155 characters
                  </p>
                )}
              </div>

              {/* og:image */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  og:image{" "}
                  <span className="text-xs font-normal text-slate-400">
                    (absolute URL, 1200×630 recommended)
                  </span>
                </label>
                <input
                  type="url"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="https://example.com/images/og-image.png"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-colors"
                />
              </div>

              {/* og:url */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  og:url
                </label>
                <input
                  type="url"
                  value={ogUrl}
                  onChange={(e) => setOgUrl(e.target.value)}
                  placeholder="https://example.com/my-page"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-colors"
                />
              </div>

              {/* og:site_name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  og:site_name
                </label>
                <input
                  type="text"
                  value={ogSiteName}
                  onChange={(e) => setOgSiteName(e.target.value)}
                  placeholder="My Website"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-colors"
                />
              </div>

              {/* Twitter Card Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Twitter Card Type
                </label>
                <div className="flex items-center gap-6">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="twitterCardType"
                      value="summary_large_image"
                      checked={twitterCardType === "summary_large_image"}
                      onChange={() =>
                        setTwitterCardType("summary_large_image")
                      }
                      className="h-4 w-4 border-slate-300 text-rose-600 focus:ring-rose-500"
                    />
                    summary_large_image
                  </label>
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="twitterCardType"
                      value="summary"
                      checked={twitterCardType === "summary"}
                      onChange={() => setTwitterCardType("summary")}
                      className="h-4 w-4 border-slate-300 text-rose-600 focus:ring-rose-500"
                    />
                    summary
                  </label>
                </div>
              </div>

              {/* Twitter-specific overrides */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Twitter-Specific Overrides{" "}
                  <span className="font-normal normal-case">
                    (optional — falls back to OG values)
                  </span>
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      twitter:title
                    </label>
                    <input
                      type="text"
                      value={twitterTitle}
                      onChange={(e) => setTwitterTitle(e.target.value)}
                      placeholder={ogTitle || "Same as og:title"}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      twitter:description
                    </label>
                    <input
                      type="text"
                      value={twitterDescription}
                      onChange={(e) => setTwitterDescription(e.target.value)}
                      placeholder={ogDescription || "Same as og:description"}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleClear}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Trash2 className="h-4 w-4 flex-shrink-0" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* ── Right: Platform Preview ── */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Live Preview
              </h2>

              {/* Platform tabs */}
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                {platforms.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setActivePreview(p.key)}
                    className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      activePreview === p.key
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Preview card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="mb-3 text-xs font-medium text-slate-500">
                  {activePreview === "facebook" &&
                    "Facebook Share Preview"}
                  {activePreview === "twitter" &&
                    "Twitter / X Card Preview"}
                  {activePreview === "linkedin" &&
                    "LinkedIn Share Preview"}
                </p>
                <div className="mx-auto max-w-[500px]">
                  {activePreview === "facebook" && <FacebookPreview />}
                  {activePreview === "twitter" && <TwitterPreview />}
                  {activePreview === "linkedin" && <LinkedInPreview />}
                </div>
              </div>

              {/* Character count tips */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Quick Tips
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                    <span>
                      <strong>Title:</strong> Keep under 60 characters to avoid
                      truncation on most platforms.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                    <span>
                      <strong>Description:</strong> Aim for 155 characters or
                      fewer for consistent display.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                    <span>
                      <strong>Image:</strong> Use 1200×630px (Facebook/LinkedIn)
                      or 1200×600px (Twitter large card).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                    <span>
                      <strong>URL:</strong> Always use absolute URLs with https://
                      for images.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── Code Generation Section ── */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => setShowCodeGen(!showCodeGen)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition-colors hover:bg-rose-700"
            >
              <Code2 className="h-4 w-4 flex-shrink-0" />
              <span>
                {showCodeGen ? "Hide Meta Tags" : "Generate Meta Tags"}
              </span>
            </button>

            {showCodeGen && (
              <div className="space-y-3">
                <div className="relative">
                  <textarea
                    readOnly
                    value={generateMetaTags()}
                    rows={14}
                    className="w-full rounded-xl border border-slate-300 bg-slate-900 px-4 py-3 font-mono text-sm text-green-400 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:border-rose-300 hover:text-rose-700"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. How-To Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Preview Open Graph Tags
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these four simple steps to preview your social media meta
              tags and generate copy-paste HTML code. No technical expertise
              required — just fill in the fields and see the results.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {howToSteps.map((item) => (
              <div
                key={item.step}
                className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-600 text-lg font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Features Section ── */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Why Use Our Free OG Preview Tool?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and feature-rich Open Graph previewer built by
              professional developers at CoderDesign Toronto. Here is what makes
              it stand out.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-rose-200 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100">
                    <Icon className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Use Cases Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Common Use Cases
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">
              See how developers, marketers, and content creators use the OG
              Preview Tool to perfect their social media presence.
            </p>
          </div>

          <div className="space-y-4">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="flex items-start gap-4 p-6">
                    <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rose-100">
                      <Icon className="h-5 w-5 text-rose-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-base font-semibold text-slate-900">
                        {useCase.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ Section ── */}
      <section
        className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20"
        id="faq"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Everything you need to know about Open Graph tags, Twitter Cards,
              and social media meta tag previews. Can&apos;t find what
              you&apos;re looking for?{" "}
              <Link
                href="/contact"
                className="text-rose-600 hover:text-rose-700 underline"
              >
                Contact us
              </Link>
              .
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. Related Tools ── */}
      <RelatedTools currentSlug="og-preview" />

      {/* ── 8. CTA ── */}
      <ToolCta />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
