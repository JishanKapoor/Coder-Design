"use client";
import { useState, useMemo } from "react";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import Link from "next/link";
import {
  ArrowRight, Type, Wrench, List, Eraser, Hash, Sparkles, SmilePlus,
  Search, Scissors, Link2, RotateCw, ArrowLeftRight,
  Replace, Palette, Bold, Italic,
  Underline, Strikethrough, Circle, Pen, Maximize2, EyeOff,
  ExternalLink, Braces, FileCode2, Regex, Globe, Lock,
  Zap, X,
  FileText, Eye, Link as LinkIcon,
} from "lucide-react";

const categories = ["All", "Text", "Style", "Developer"] as const;

const categoryConfig: Record<string, { badge: string; icon: string; link: string; hover: string }> = {
  Text:      { badge: "bg-blue-50 text-blue-700",    icon: "bg-blue-600",    link: "text-blue-600 group-hover:text-blue-700",    hover: "hover:border-blue-300" },
  Style:     { badge: "bg-purple-50 text-purple-700",  icon: "bg-purple-600",  link: "text-purple-600 group-hover:text-purple-700",  hover: "hover:border-purple-300" },
  Developer: { badge: "bg-emerald-50 text-emerald-700", icon: "bg-emerald-600", link: "text-emerald-600 group-hover:text-emerald-700", hover: "hover:border-emerald-300" },
};

const tools = [
  // ── Text ──
  { title: "Add Prefix & Suffix to Each Line", description: "Add custom prefixes and suffixes to each line of text instantly.", href: "/tools/add-prefix-suffix-lines", category: "Text", icon: Type },
  { title: "Alternating Case Converter", description: "Convert text to aLtErNaTiNg CaSe instantly. Toggle uppercase or lowercase start.", href: "/tools/alternating-case-converter", category: "Text", icon: Type },
  { title: "Comma to Column", description: "Convert comma-separated lists into a clean single-column format.", href: "/tools/comma-to-column", category: "Text", icon: List },
  { title: "Duplicate Line Remover", description: "Remove duplicate lines from text. Keep only unique entries.", href: "/tools/duplicate-eraser", category: "Text", icon: Eraser },
  { title: "Lines Counter", description: "Count lines, words, characters, and paragraphs in real time.", href: "/tools/lines-counter", category: "Text", icon: Hash },
  { title: "Special Character Remover", description: "Strip special characters, symbols, and punctuation from text.", href: "/tools/special-character-remover", category: "Text", icon: Sparkles },
  { title: "Emoji Remover", description: "Remove all emojis and emoticons from text in one click.", href: "/tools/emoji-remover", category: "Text", icon: SmilePlus },
  { title: "Emoji Counter", description: "Count emojis, characters, and words in any text instantly.", href: "/tools/emoji-counter", category: "Text", icon: Hash },
  { title: "Repeated Words Finder", description: "Find and count repeated words to improve your writing.", href: "/tools/repeated-words-finder", category: "Text", icon: Search },
  { title: "Split Text", description: "Split text by characters, words, sentences, or custom delimiter.", href: "/tools/split-text", category: "Text", icon: Scissors },
  { title: "Join Text Lines", description: "Merge multiple lines into one using any separator.", href: "/tools/join-text", category: "Text", icon: Link2 },
  { title: "Repeat Text", description: "Repeat any text multiple times with optional separators.", href: "/tools/repeat-text", category: "Text", icon: RotateCw },
  { title: "Reverse Text", description: "Reverse text by characters, words, or lines.", href: "/tools/reverse-text", category: "Text", icon: ArrowLeftRight },
  { title: "Truncate Text", description: "Shorten text to a specific character or word limit.", href: "/tools/truncate-text", category: "Text", icon: Scissors },
  { title: "Trim Text", description: "Remove leading and trailing whitespace from every line.", href: "/tools/trim-text", category: "Text", icon: Scissors },
  { title: "Reverse Words", description: "Reverse the order of words in each line of text.", href: "/tools/reverse-words", category: "Text", icon: ArrowLeftRight },
  { title: "Word Remover", description: "Remove specific words from your text instantly.", href: "/tools/word-remover", category: "Text", icon: Eraser },
  { title: "Word Replacer", description: "Find and replace specific words with multiple pairs at once.", href: "/tools/word-replacer", category: "Text", icon: Replace },
  { title: "Censor Text", description: "Replace specific words with asterisks or custom characters.", href: "/tools/censor-text", category: "Text", icon: EyeOff },
  // ── Style ──
  { title: "Bold Text Generator", description: "Convert text to 𝐛𝐨𝐥𝐝 Unicode for social media and bios.", href: "/tools/bold-text-generator", category: "Style", icon: Bold },
  { title: "Italic Text Generator", description: "Convert text to 𝑖𝑡𝑎𝑙𝑖𝑐 Unicode for social media and bios.", href: "/tools/italic-text-generator", category: "Style", icon: Italic },
  { title: "Underline Text Generator", description: "Add u̲n̲d̲e̲r̲l̲i̲n̲e̲ using Unicode combining characters.", href: "/tools/underline-text-generator", category: "Style", icon: Underline },
  { title: "Strikethrough Text Generator", description: "Cross out text with s̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ Unicode.", href: "/tools/strikethrough-text-generator", category: "Style", icon: Strikethrough },
  { title: "Bubble Text Generator", description: "Convert text to Ⓑⓤⓑⓑⓛⓔ circled Unicode letters.", href: "/tools/bubble-text-generator", category: "Style", icon: Circle },
  { title: "Cursive Text Maker", description: "Convert text to 𝒸𝓊𝓇𝓈𝒾𝓋ℯ Unicode script characters.", href: "/tools/cursive-text-maker", category: "Style", icon: Pen },
  { title: "Wide Text Maker", description: "Convert text to ｗｉｄｅ fullwidth Unicode characters.", href: "/tools/wide-text-maker", category: "Style", icon: Maximize2 },
  { title: "Tiny Text Generator", description: "Convert text to ᵗⁱⁿʸ superscript Unicode characters.", href: "/tools/tiny-text-generator", category: "Style", icon: Type },
  { title: "Zalgo Text Generator", description: "Create c̷̛̗r̸̡̈ë̵̩e̸̹̎p̸̧̈y̶̜̕ Zalgo text with combining marks.", href: "/tools/create-zalgo-text", category: "Style", icon: Zap },
  { title: "Undo Zalgo Effect", description: "Remove Zalgo combining marks and clean corrupted text.", href: "/tools/undo-zalgo-text", category: "Style", icon: Sparkles },
  { title: "Text Symbols & Characters", description: "Browse and copy hundreds of special Unicode symbols.", href: "/tools/text-symbols", category: "Style", icon: Palette },
  // ── Developer ──
  { title: "Link Extractor", description: "Extract all URLs and email addresses from any text.", href: "/tools/link-extractor", category: "Developer", icon: ExternalLink },
  { title: "JSON Formatter & Validator", description: "Format, validate, and beautify JSON with syntax highlighting.", href: "/tools/json-formatter", category: "Developer", icon: Braces },
  { title: "Code Minifier", description: "Minify HTML, CSS, and JavaScript — remove whitespace and comments.", href: "/tools/code-minifier", category: "Developer", icon: FileCode2 },
  { title: "Regex Tester", description: "Test and debug regular expressions with live highlighted matches.", href: "/tools/regex-tester", category: "Developer", icon: Regex },
  { title: "Regex Explainer", description: "Explain what a regex does — get a readable breakdown of each part.", href: "/tools/regex-explainer", category: "Developer", icon: Regex },
  { title: "URL Encoder / Decoder", description: "Encode or decode URLs and query string parameters.", href: "/tools/url-encoder-decoder", category: "Developer", icon: Globe },
  { title: "Base64 Encoder / Decoder", description: "Encode text to Base64 or decode Base64 strings with UTF-8 support.", href: "/tools/base64-encoder-decoder", category: "Developer", icon: Lock },
  { title: "Markdown Table Generator", description: "Build clean Markdown tables from rows and columns in seconds.", href: "/tools/markdown-table-generator", category: "Developer", icon: FileText },
  { title: "URL Slug Generator", description: "Convert any title into a clean, SEO-friendly URL slug.", href: "/tools/url-slug-generator", category: "Developer", icon: LinkIcon },
  { title: "OG Preview", description: "Preview how your site looks when shared on social media.", href: "/tools/og-preview", category: "Developer", icon: Eye },
];

export default function ToolsIndex() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    let list = tools;
    if (activeCategory !== "All") list = list.filter((t) => t.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeCategory]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: tools.length };
    tools.forEach((t) => { c[t.category] = (c[t.category] || 0) + 1; });
    return c;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero — matches homepage / about hero pattern */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white pb-20 pt-32 lg:pb-28 lg:pt-40">
        {/* Background grid (same as homepage hero) */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm text-violet-700">
              <Wrench className="h-4 w-4" />
              <span>{tools.length} Free Online Tools</span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Free Online Utilities
            </h1>

            {/* Sub-heading */}
            <p className="mx-auto mb-4 max-w-2xl text-base font-medium text-slate-700 sm:text-lg">
              Coder&nbsp;Design offers free services and tools for everyone.
            </p>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
              String processing, code formatting, Unicode generators, SEO analysis, and more.
              No sign-up. No tracking. 100&nbsp;%&nbsp;free and private.
            </p>

            {/* Search */}
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tools — e.g. JSON, bold, reverse, SEO…"
                  className="h-14 w-full rounded-full border-2 border-violet-200 bg-white pl-6 pr-12 text-base text-slate-900 shadow-lg placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-0 transition-all"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category bar + grid */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Category pills */}
          <div className="mb-8 flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white shadow-md"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-violet-200 hover:bg-violet-50"
                }`}
              >
                {cat}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    activeCategory === cat
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {counts[cat] || 0}
                </span>
              </button>
            ))}

            {/* Results count */}
            {(search || activeCategory !== "All") && (
              <span className="ml-auto text-sm text-slate-500">
                {filtered.length} of {tools.length} tools
              </span>
            )}
          </div>

          {/* Tools Grid */}
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((tool) => {
                const Icon = tool.icon;
                const cfg = categoryConfig[tool.category] || categoryConfig.Text;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 ${cfg.hover} hover:shadow-xl hover:-translate-y-1`}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${cfg.icon} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${cfg.badge}`}>
                        {tool.category}
                      </span>
                    </div>

                    <h3 className="mb-2 text-base font-semibold leading-snug text-slate-900">
                      {tool.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-slate-600">
                      {tool.description}
                    </p>

                    <div className={`mt-auto inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${cfg.link}`}>
                      Use Tool
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white py-20 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-slate-300" />
              <p className="text-xl font-semibold text-slate-900">No tools found</p>
              <p className="mt-2 text-sm text-slate-500">Try a different search term or category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 lg:text-3xl">
            Why Use Coder&nbsp;Design&rsquo;s Free Online Tools?
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              <strong className="text-slate-900">Coder&nbsp;Design</strong> offers a growing collection of <strong className="text-slate-900">free online utilities</strong> built for developers, content creators, marketers, and everyday users. Every tool runs entirely in your browser — your data never leaves your device.
            </p>
            <p>
              Our <strong className="text-slate-900">text tools</strong> let you add prefixes and suffixes to lines, split and join text, remove duplicates, reverse words, censor content, and much more. Need to style text for social media? Use our <strong className="text-slate-900">Unicode generators</strong> for bold, italic, cursive, bubble, strikethrough, underline, tiny text, and Zalgo effects — all copy-paste ready.
            </p>
            <p>
              For developers, we offer a <strong className="text-slate-900">JSON formatter &amp; validator</strong>, <strong className="text-slate-900">regex tester</strong> with live highlighting, <strong className="text-slate-900">regex explainer</strong>, <strong className="text-slate-900">code minifier</strong> for HTML/CSS/JS, <strong className="text-slate-900">URL encoder/decoder</strong>, <strong className="text-slate-900">Base64 encoder/decoder</strong>, and a <strong className="text-slate-900">Markdown table generator</strong>.
            </p>
            <p>
              No sign-up required. No cookies. No analytics tracking. <strong className="text-slate-900">100&nbsp;% free and private</strong> — every tool works offline once loaded and is optimised for mobile, tablet, and desktop.
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
