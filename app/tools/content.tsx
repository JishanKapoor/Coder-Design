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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
            <Wrench className="h-4 w-4" />
            {tools.length} Free Tools
          </div>
          <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
            Free Developer Tools by CoderDesign Toronto
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/90">
            Text manipulation, code formatting, Unicode generators, SEO analysis, and more.
            No sign-up. No tracking. 100% free and private.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools — e.g. JSON, bold, reverse, SEO..."
                className="h-12 w-full rounded-xl border-0 bg-white/95 pl-12 pr-10 text-sm text-slate-900 shadow-lg backdrop-blur-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs + Grid */}
      <section className="pb-12 pt-10 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

          {/* Controls card (adds spacing + fixes cramped layout) */}
          <div className="-mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 lg:-mt-14 lg:p-6">

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white shadow-md"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat}
                <span className={`ml-0.5 rounded-full px-1.5 py-0.5 text-xs ${
                  activeCategory === cat ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  {counts[cat] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Results count */}
          {(search || activeCategory !== "All") && (
            <p className="mt-4 text-sm text-slate-600">
              Showing {filtered.length} of {tools.length} tools
              {search && <> matching &quot;{search}&quot;</>}
              {activeCategory !== "All" && <> in {activeCategory}</>}
            </p>
          )}

          </div>

          {/* Tools Grid */}
          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((tool) => {
                const Icon = tool.icon;
                const colorClass = categoryColors[tool.category] || "bg-violet-50 text-violet-700";
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-violet-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${colorClass}`}>
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="mb-1.5 text-[15px] font-semibold text-slate-900 leading-snug">{tool.title}</h3>
                    <p className="mb-3 text-xs leading-relaxed text-slate-500">{tool.description}</p>
                    <div className="mt-auto flex items-center gap-1 text-xs font-medium text-violet-600 transition-colors group-hover:text-violet-700">
                      Use Tool
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Search className="mx-auto mb-4 h-10 w-10 text-slate-300" />
              <p className="text-lg font-medium text-slate-500">No tools found</p>
              <p className="mt-1 text-sm text-slate-400">Try a different search term or category.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-4 text-sm font-medium text-violet-600 hover:text-violet-700">
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
