"use client";
import { useState, useMemo } from "react";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import Link from "next/link";
import {
  ArrowRight, Type, Wrench, List, Eraser, Hash, Sparkles, SmilePlus,
  Search, Scissors, Link2, RotateCw, ArrowLeftRight, AlignLeft,
  AlignRight, AlignCenter, AlignJustify, Indent, WrapText,
  Copy as CopyIcon, Replace, Shuffle, Palette, Bold, Italic,
  Underline, Strikethrough, Circle, Pen, Maximize2, EyeOff,
  ExternalLink, Braces, FileCode2, Regex, Globe, Lock, BarChart3,
  Tags, Zap, X,
  FileText,
} from "lucide-react";

const categories = ["All", "Text", "Formatting", "Style", "Developer", "SEO"] as const;

const categoryColors: Record<string, string> = {
  Text: "bg-violet-50 text-violet-700",
  Formatting: "bg-blue-50 text-blue-700",
  Style: "bg-pink-50 text-pink-700",
  Developer: "bg-emerald-50 text-emerald-700",
  SEO: "bg-amber-50 text-amber-700",
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
  { title: "Slice Text", description: "Extract a portion of text by start and end positions.", href: "/tools/slice-text", category: "Text", icon: Scissors },
  { title: "Reverse Words", description: "Reverse the order of words in each line of text.", href: "/tools/reverse-words", category: "Text", icon: ArrowLeftRight },
  { title: "Reverse Sentences", description: "Reverse the order of sentences in your text.", href: "/tools/reverse-sentences", category: "Text", icon: ArrowLeftRight },
  { title: "Reverse Paragraphs", description: "Reverse the order of paragraphs in your text.", href: "/tools/reverse-paragraphs", category: "Text", icon: ArrowLeftRight },
  { title: "Word Duplicator", description: "Repeat each word in your text a specified number of times.", href: "/tools/word-duplicator", category: "Text", icon: CopyIcon },
  { title: "Word Remover", description: "Remove specific words from your text instantly.", href: "/tools/word-remover", category: "Text", icon: Eraser },
  { title: "Sentence Duplicator", description: "Duplicate each sentence in your text multiple times.", href: "/tools/sentence-duplicator", category: "Text", icon: CopyIcon },
  { title: "Sentence Remover", description: "Remove sentences containing specific keywords.", href: "/tools/sentence-remover", category: "Text", icon: Eraser },
  { title: "Word Replacer", description: "Find and replace specific words with multiple pairs at once.", href: "/tools/word-replacer", category: "Text", icon: Replace },
  { title: "Add Random Words", description: "Insert random words at positions in your text.", href: "/tools/add-random-words", category: "Text", icon: Shuffle },
  { title: "Add Random Letters", description: "Insert random letters into words for testing.", href: "/tools/add-random-letters", category: "Text", icon: Shuffle },
  { title: "Add Random Errors", description: "Introduce realistic typos and errors into text.", href: "/tools/add-random-errors", category: "Text", icon: Shuffle },
  { title: "Censor Text", description: "Replace specific words with asterisks or custom characters.", href: "/tools/censor-text", category: "Text", icon: EyeOff },
  // ── Formatting ──
  { title: "Right-Align Text", description: "Align text to the right with configurable line width.", href: "/tools/right-align-text", category: "Formatting", icon: AlignRight },
  { title: "Right-Pad Text", description: "Pad text on the right to reach a target width.", href: "/tools/right-pad-text", category: "Formatting", icon: AlignRight },
  { title: "Left-Align Text", description: "Left-align and clean leading whitespace from text.", href: "/tools/left-align-text", category: "Formatting", icon: AlignLeft },
  { title: "Left-Pad Text", description: "Pad text on the left with spaces or custom characters.", href: "/tools/left-pad-text", category: "Formatting", icon: AlignLeft },
  { title: "Center Text", description: "Center-align text with configurable total width.", href: "/tools/center-text", category: "Formatting", icon: AlignCenter },
  { title: "Indent Text", description: "Add indentation to every line of your text.", href: "/tools/indent-text", category: "Formatting", icon: Indent },
  { title: "Unindent Text", description: "Remove indentation from every line of your text.", href: "/tools/unindent-text", category: "Formatting", icon: Indent },
  { title: "Justify Text", description: "Justify text to fill a specified line width.", href: "/tools/justify-text", category: "Formatting", icon: AlignJustify },
  { title: "Wrap Text", description: "Wrap long lines of text at a specified column width.", href: "/tools/wrap-text", category: "Formatting", icon: WrapText },
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
  { title: "Create Fake Unicode Text", description: "Generate deceptive text with Unicode homoglyphs.", href: "/tools/create-fake-text", category: "Style", icon: Palette },
  { title: "Detect Fake Unicode Text", description: "Detect hidden Unicode characters and homoglyphs.", href: "/tools/detect-fake-text", category: "Style", icon: Search },
  { title: "Normalize Fake Text", description: "Clean text by removing homoglyphs and invisible characters.", href: "/tools/normalize-fake-text", category: "Style", icon: Sparkles },
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
  // ── SEO ──
  { title: "SEO Content Analyzer", description: "Analyze keyword density, readability score, and get SEO recommendations.", href: "/tools/seo-content-analyzer", category: "SEO", icon: BarChart3 },
  { title: "Meta Tags Checker & Preview", description: "Preview how your meta tags appear on Google, Facebook, and Twitter.", href: "/tools/meta-tags-checker", category: "SEO", icon: Tags },
  { title: "URL Slug Generator", description: "Turn any title into a clean, SEO-friendly URL slug.", href: "/tools/url-slug-generator", category: "SEO", icon: Link2 },
  { title: "OG Preview", description: "Preview how your link will look on social media (Open Graph/Twitter cards).", href: "/tools/og-preview", category: "SEO", icon: Tags },
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm text-violet-700">
              <Wrench className="h-4 w-4" />
              <span>{tools.length} Free Online Tools</span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Free Developer &amp; Text{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Tools
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
              Text manipulation, code formatting, Unicode generators, SEO analysis, and more.
              No sign-up. No tracking. 100&nbsp;%&nbsp;free and private.
            </p>

            {/* Search */}
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tools — e.g. JSON, bold, reverse, SEO…"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 text-base text-slate-900 shadow-lg shadow-slate-900/5 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-100"
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
                const colorClass = categoryColors[tool.category] || "bg-violet-50 text-violet-700";
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-violet-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${colorClass}`}>
                        {tool.category}
                      </span>
                    </div>

                    <h3 className="mb-2 text-base font-semibold leading-snug text-slate-900">
                      {tool.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-slate-600">
                      {tool.description}
                    </p>

                    <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 transition-colors group-hover:text-violet-700">
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

      <FooterSection />
    </div>
  );
}
