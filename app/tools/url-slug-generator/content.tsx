"use client";
import { useState, useCallback, useMemo } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Trash2,
  Check,
  Download,
  Zap,
  Shield,
  Globe,
  Code2,
  FileText,
  Clock,
  Link2,
  ArrowRight,
  Type,
  Settings,
  Hash,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

/* ─── Stop words list ─── */
const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "of",
  "in", "to", "for", "on", "with", "at", "by", "from", "it", "its", "this",
  "that", "as", "not", "no", "be",
]);

/* ─── Core slugify function ─── */
function slugify(
  text: string,
  options: {
    separator: string;
    lowercase: boolean;
    removeStopWords: boolean;
    stripAccents: boolean;
    maxLength: number;
  }
): string {
  let str = text;

  /* 1. Strip accents via NFD decomposition */
  if (options.stripAccents) {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  /* 2. Optionally convert to lowercase */
  if (options.lowercase) {
    str = str.toLowerCase();
  }

  /* 3. Optionally remove stop words */
  if (options.removeStopWords) {
    const words = str.split(/\s+/);
    str = words.filter((w) => !STOP_WORDS.has(w.toLowerCase())).join(" ");
  }

  /* 4. Replace non-alphanumeric characters with the separator */
  const sep = options.separator;
  const escaped = sep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  str = str.replace(/[^a-zA-Z0-9]+/g, sep);

  /* 5. Collapse multiple consecutive separators */
  str = str.replace(new RegExp(`${escaped}{2,}`, "g"), sep);

  /* 6. Trim separator from start and end */
  str = str.replace(new RegExp(`^${escaped}|${escaped}$`, "g"), "");

  /* 7. Optionally truncate to maxLength at a word/separator boundary */
  if (options.maxLength > 0 && str.length > options.maxLength) {
    str = str.substring(0, options.maxLength);
    const lastSep = str.lastIndexOf(sep);
    if (lastSep > 0) {
      str = str.substring(0, lastSep);
    }
    /* Trim trailing separator just in case */
    str = str.replace(new RegExp(`${escaped}$`), "");
  }

  return str;
}

export default function UrlSlugGeneratorTool() {
  /* ─── State ─── */
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [maxLength, setMaxLength] = useState(0);
  const [stripAccents, setStripAccents] = useState(true);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkInput, setBulkInput] = useState("");
  const [bulkOutput, setBulkOutput] = useState("");
  const [bulkCopied, setBulkCopied] = useState(false);

  /* ─── Computed slug (real-time) ─── */
  const output = useMemo(() => {
    if (!input.trim()) return "";
    return slugify(input, {
      separator,
      lowercase,
      removeStopWords,
      stripAccents,
      maxLength,
    });
  }, [input, separator, lowercase, removeStopWords, stripAccents, maxLength]);

  /* ─── Bulk generate ─── */
  const handleBulkGenerate = useCallback(() => {
    if (!bulkInput.trim()) {
      setBulkOutput("");
      return;
    }
    const lines = bulkInput.split("\n");
    const slugs = lines.map((line) =>
      line.trim()
        ? slugify(line.trim(), {
            separator,
            lowercase,
            removeStopWords,
            stripAccents,
            maxLength,
          })
        : ""
    );
    setBulkOutput(slugs.join("\n"));
  }, [bulkInput, separator, lowercase, removeStopWords, stripAccents, maxLength]);

  /* ─── Handlers ─── */
  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBulkCopy = async () => {
    if (!bulkOutput) return;
    await navigator.clipboard.writeText(bulkOutput).catch(() => {});
    setBulkCopied(true);
    setTimeout(() => setBulkCopied(false), 2000);
  };

  const handleBulkDownload = () => {
    if (!bulkOutput) return;
    const blob = new Blob([bulkOutput], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "slugs.txt";
    a.click();
  };

  const handleClear = () => {
    if (bulkMode) {
      setBulkInput("");
      setBulkOutput("");
    } else {
      setInput("");
    }
  };

  /* ─── Data ─── */

  const features = [
    {
      icon: Link2,
      title: "SEO-Optimized Slugs",
      description:
        "Generate clean, search-engine-friendly URL slugs from any title or text. Our tool follows Google's URL structure best practices to help your pages rank higher and get more clicks in search results.",
    },
    {
      icon: Zap,
      title: "Real-Time Generation",
      description:
        "Watch your slug update instantly as you type — no button click needed. The live preview uses optimized JavaScript to compute the slug in real time, giving you immediate feedback on every keystroke.",
    },
    {
      icon: Globe,
      title: "Accent & Unicode Support",
      description:
        "Handles international characters like é, ü, ñ, ç, ö, å, and more using Unicode NFD decomposition. Accents are intelligently stripped so your slugs remain clean ASCII that works everywhere.",
    },
    {
      icon: Shield,
      title: "100% Private",
      description:
        "All processing happens locally in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party. Complete privacy guaranteed.",
    },
    {
      icon: Settings,
      title: "Customizable Options",
      description:
        "Choose your separator (hyphen, underscore, or dot), toggle lowercase conversion, enable stop word removal for shorter slugs, set a maximum character length, and control accent stripping.",
    },
    {
      icon: Code2,
      title: "Bulk Mode",
      description:
        "Convert multiple titles at once using Bulk Mode. Enter one title per line, generate all slugs simultaneously, then copy everything to your clipboard or download as a text file. Perfect for migrations.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Type or Paste Your Title",
      description:
        "Enter your page title, blog post heading, product name, or any text in the input field. The tool accepts any language and handles accents, symbols, and Unicode characters automatically.",
    },
    {
      step: 2,
      title: "See the Slug Instantly",
      description:
        "Watch the slug update in real time as you type. The live preview shows you exactly what your URL will look like — no button click needed. Adjust your title and see the slug change immediately.",
    },
    {
      step: 3,
      title: "Customize Options",
      description:
        "Fine-tune your slug with options: choose a separator (hyphen, underscore, or dot), toggle stop word removal for shorter URLs, set a maximum character length, and control accent handling.",
    },
    {
      step: 4,
      title: "Copy Your Slug",
      description:
        "Click the 'Copy Slug' button to copy the generated slug to your clipboard. Paste it directly into your CMS, blog editor, code, or spreadsheet. In bulk mode, copy all slugs or download them.",
    },
  ];

  const useCases = [
    {
      icon: Globe,
      title: "Blog Post URLs",
      before: "10 Best Tips for Learning React in 2024",
      after: "10-best-tips-learning-react-2024",
      note: "with stop words removed",
    },
    {
      icon: Code2,
      title: "Product Page Slugs",
      before: "Women's Running Shoes — Size 8.5",
      after: "womens-running-shoes-size-8-5",
      note: "special chars handled",
    },
    {
      icon: FileText,
      title: "Documentation Pages",
      before: "Getting Started: Installation & Setup Guide",
      after: "getting-started-installation-setup-guide",
      note: "colons & ampersands cleaned",
    },
    {
      icon: Type,
      title: "Category URLs",
      before: "Café & Résumé Services",
      after: "cafe-resume-services",
      note: "accents stripped automatically",
    },
    {
      icon: Hash,
      title: "Bulk Slug Generation",
      before: "Multiple titles (one per line)",
      after: "Multiple slugs generated at once",
      note: "ideal for site migrations",
    },
  ];

  const faqs = [
    {
      question: "What is a URL slug?",
      answer:
        "A URL slug is the human-readable, URL-friendly portion of a web address that identifies a specific page. For example, in 'https://example.com/blog/my-first-post', the slug is 'my-first-post'. Slugs typically use lowercase letters, numbers, and hyphens instead of spaces and special characters. A well-crafted slug makes your URL descriptive, easy to share, and better for SEO because search engines use URL words as ranking signals.",
    },
    {
      question: "What makes a good URL slug for SEO?",
      answer:
        "A good SEO slug follows several best practices: keep it short (3–5 words ideally), include your target keyword, use hyphens as word separators (Google recommends this over underscores), remove unnecessary stop words like 'the', 'a', 'and', 'is', use only lowercase letters and numbers, and make it descriptive of the page content. For example, 'best-react-tips-2024' is far better than 'the-10-best-tips-for-learning-react-in-the-year-2024' because it's concise while still conveying the topic clearly.",
    },
    {
      question: "Does it handle special characters and accents?",
      answer:
        "Yes. The tool uses Unicode NFD (Canonical Decomposition) to strip combining diacritical marks, converting accented characters like é→e, ü→u, ñ→n, ç→c, ö→o, å→a, and ã→a. It also handles special characters such as ampersands (&), en-dashes (–), em-dashes (—), quotes, colons, semicolons, and all other non-alphanumeric characters by replacing them with your chosen separator. The result is a clean ASCII slug that works on every web server, CMS, and browser.",
    },
    {
      question: "Can I customize the separator?",
      answer:
        "Yes. You can choose between three separator options: hyphen (-), underscore (_), or dot (.). Hyphens are the most common and recommended for SEO — Google explicitly treats hyphens as word separators, while underscores are joined. Underscores are sometimes preferred for file paths or API routes. Dots are occasionally used in versioned URLs or specific CMS configurations. The default is hyphen for maximum SEO benefit.",
    },
    {
      question: "What is the recommended max length for a slug?",
      answer:
        "While there's no strict limit, SEO best practices suggest keeping slugs between 3–5 words (roughly 50–60 characters). Google displays about 60–70 characters in search result URLs before truncating. Shorter slugs are easier to read, share, and remember. Our tool's 'Max length' option lets you set a character limit, and it intelligently truncates at word boundaries so you never end up with broken words in your slug.",
    },
    {
      question: "Can I generate slugs in bulk?",
      answer:
        "Yes. Switch to Bulk Mode to convert multiple titles at once. Enter one title per line in the input textarea, click 'Generate All', and the tool produces a corresponding slug for each line. You can then copy all slugs to your clipboard or download them as a .txt file. This is perfect for content migrations, setting up a new blog with many posts, or preparing URL structures for an entire website or e-commerce catalog.",
    },
    {
      question: "How does Unicode normalization work?",
      answer:
        "Unicode normalization (NFD — Canonical Decomposition) breaks composite characters into their base letter plus separate combining marks. For example, 'é' (U+00E9) is decomposed into 'e' (U+0065) + combining acute accent (U+0301). The tool then strips all characters in the Combining Diacritical Marks Unicode block (U+0300–U+036F), leaving only the base ASCII letter. This approach handles virtually every accented Latin character across French, Spanish, German, Portuguese, Swedish, and dozens of other languages.",
    },
    {
      question: "Is this compatible with WordPress, Shopify, and other CMS platforms?",
      answer:
        "Yes. The slugs generated by this tool are compatible with all major CMS platforms including WordPress, Shopify, Wix, Squarespace, Ghost, Contentful, Strapi, and any custom CMS. They use only lowercase ASCII letters, numbers, and standard separators — the universal format for URL slugs. Simply copy the generated slug and paste it into your CMS's URL or permalink field. The slug format also works with static site generators like Next.js, Gatsby, Hugo, and Jekyll.",
    },
  ];

  /* ─── Render ─── */

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-emerald-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
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
            <span className="text-white">URL Slug Generator</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Link2 className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-4xl">
              Free URL Slug Generator – Create SEO-Friendly Slugs
            </h1>
          </div>

          <p className="max-w-2xl text-white/90 leading-relaxed">
            Convert any title, heading, or text into a clean, SEO-optimized URL
            slug. Perfect for blog posts, e-commerce products, documentation
            pages, and any CMS. Handles accents, special characters, and
            Unicode&nbsp;automatically.
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
              Unicode Support
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              No Sign-Up
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Tool Section ── */}
      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12 space-y-8">
          {/* Mode Toggle */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 w-fit">
            <button
              onClick={() => setBulkMode(false)}
              className={`inline-flex h-9 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors ${
                !bulkMode
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Single
            </button>
            <button
              onClick={() => setBulkMode(true)}
              className={`inline-flex h-9 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors ${
                bulkMode
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Bulk
            </button>
          </div>

          {/* Single Mode */}
          {!bulkMode && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">
                  Title or Text
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. 10 Best Tips for Learning React in 2024"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
                />
              </div>

              {/* Live Slug Preview */}
              {output ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      Generated Slug
                    </span>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy Slug
                        </>
                      )}
                    </button>
                  </div>
                  <div className="rounded-lg bg-white border border-emerald-100 px-4 py-3">
                    <code className="block text-lg font-mono text-slate-900 break-all leading-relaxed">
                      {output}
                    </code>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                    <span>{output.length} characters</span>
                    <span>
                      {output.split(separator).filter(Boolean).length} words
                    </span>
                  </div>
                </div>
              ) : (
                input.trim() === "" && (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                    <p className="text-sm text-slate-400">
                      Start typing above to see your slug in real time
                    </p>
                  </div>
                )
              )}
            </div>
          )}

          {/* Bulk Mode */}
          {bulkMode && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">
                  Titles (one per line)
                </label>
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder={`10 Best Tips for Learning React in 2024\nWomen's Running Shoes — Size 8.5\nGetting Started: Installation & Setup Guide\nCafé & Résumé Services`}
                  rows={8}
                  className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
                />
              </div>

              <button
                onClick={handleBulkGenerate}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700"
              >
                <Zap className="h-4 w-4 flex-shrink-0" />
                <span>Generate All</span>
              </button>

              {bulkOutput && (
                <div className="space-y-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      Generated Slugs
                    </label>
                    <textarea
                      value={bulkOutput}
                      readOnly
                      rows={8}
                      className="w-full rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3 font-mono text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      onClick={handleBulkCopy}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                    >
                      {bulkCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy All
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleBulkDownload}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download .txt
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Options Box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Options
            </h3>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-6 sm:gap-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Separator
                </label>
                <select
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="-">Hyphen (-)</option>
                  <option value="_">Underscore (_)</option>
                  <option value=".">Dot (.)</option>
                </select>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                Lowercase
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={removeStopWords}
                  onChange={(e) => setRemoveStopWords(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                Remove stop words
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={stripAccents}
                  onChange={(e) => setStripAccents(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                Strip accents
              </label>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Max length (0 = no limit)
                </label>
                <input
                  type="number"
                  min={0}
                  max={200}
                  value={maxLength}
                  onChange={(e) =>
                    setMaxLength(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="w-20 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>

          {/* Clear Button */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={handleClear}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. How-To Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Generate a URL Slug
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to create clean, SEO-friendly URL slugs
              from any title or text. It takes just seconds — no technical
              knowledge required.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {howToSteps.map((item) => (
              <div
                key={item.step}
                className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
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
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Why Use Our Free URL Slug Generator?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and feature-rich slug generator built by
              professional developers at CoderDesign Toronto. Here is what makes
              it different.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <Icon className="h-6 w-6 text-emerald-600" />
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

      {/* ── 5. Use Cases Section (with before/after) ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Use Cases &amp; Examples
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">
              See how the URL Slug Generator converts real-world titles into
              clean, SEO-friendly slugs across different content types.
            </p>
          </div>

          <div className="space-y-8">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="flex items-start gap-4 p-6">
                    <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                      <Icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-3 text-base font-semibold text-slate-900">
                        {useCase.title}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 inline-flex h-5 w-12 flex-shrink-0 items-center justify-center rounded bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Before
                          </span>
                          <span className="text-sm text-slate-600">
                            {useCase.before}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 inline-flex h-5 w-12 flex-shrink-0 items-center justify-center rounded bg-emerald-100 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                            After
                          </span>
                          <code className="text-sm font-mono text-emerald-700">
                            {useCase.after}
                          </code>
                        </div>
                        <p className="text-xs text-slate-400 italic">
                          {useCase.note}
                        </p>
                      </div>
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
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Everything you need to know about URL slugs, SEO best practices,
              and how to generate perfect slugs. Can&apos;t find what
              you&apos;re looking for?{" "}
              <Link
                href="/contact"
                className="text-emerald-600 hover:text-emerald-700 underline"
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
      <RelatedTools currentSlug="url-slug-generator" />

      {/* ── 8. CTA ── */}
      <ToolCta theme="emerald" />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
