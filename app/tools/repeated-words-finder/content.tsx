"use client";
import { useState, useRef, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Upload,
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
  Search,
  ArrowRight,
  BarChart3,
  Type,
  Filter,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

/* ─── Common stop words to ignore ─── */
const COMMON_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "be",
  "been", "being", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "shall", "may", "might", "can", "must", "to", "of", "in",
  "for", "on", "with", "at", "by", "from", "it", "its", "this", "that",
  "these", "those", "he", "she", "they", "we", "you", "i", "me", "my", "your",
  "his", "her", "their", "our", "not", "no", "so", "if", "up", "out",
]);

interface WordResult {
  word: string;
  count: number;
  percentage: number;
}

export default function RepeatedWordsFinderTool() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<WordResult[]>([]);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [ignoreCommonWords, setIgnoreCommonWords] = useState(true);
  const [minWordLength, setMinWordLength] = useState("1");
  const [sortBy, setSortBy] = useState<"count" | "alpha">("count");
  const [showTopN, setShowTopN] = useState("20");
  const [totalWords, setTotalWords] = useState(0);
  const [uniqueWords, setUniqueWords] = useState(0);

  /* ─── Core Logic ─── */
  const analyze = useCallback(() => {
    if (!input.trim()) {
      setResults([]);
      setTotalWords(0);
      setUniqueWords(0);
      return;
    }

    const minLen = Math.max(
      1,
      Number.isFinite(Number(minWordLength))
        ? Math.floor(Number(minWordLength))
        : parseInt(minWordLength || "1", 10) || 1
    );
    const topN = Math.min(
      500,
      Math.max(
        5,
        Number.isFinite(Number(showTopN))
          ? Math.floor(Number(showTopN))
          : parseInt(showTopN || "20", 10) || 20
      )
    );

    /* Split text into words by whitespace / punctuation boundaries */
    const rawWords = input.match(/[a-zA-Z'\u2019]+/g) || [];

    /* Normalize: optionally lowercase */
    const normalized = rawWords.map((w) => {
      const cleaned = w.replace(/^['\u2019]+|['\u2019]+$/g, "");
      return caseSensitive ? cleaned : cleaned.toLowerCase();
    }).filter((w) => w.length > 0);

    /* Filter: optionally skip common words and short words */
    const filtered = normalized.filter((w) => {
      if (w.length < minLen) return false;
      if (ignoreCommonWords && COMMON_WORDS.has(w.toLowerCase())) return false;
      return true;
    });

    /* Count occurrences */
    const freq = new Map<string, number>();
    for (const w of filtered) {
      freq.set(w, (freq.get(w) || 0) + 1);
    }

    const total = filtered.length;
    setTotalWords(total);
    setUniqueWords(freq.size);

    /* Build result array with percentage */
    let resultArr: WordResult[] = Array.from(freq.entries()).map(
      ([word, count]) => ({
        word,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      })
    );

    /* Sort */
    if (sortBy === "count") {
      resultArr.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
    } else {
      resultArr.sort((a, b) => a.word.localeCompare(b.word));
    }

    /* Return top N */
    setResults(resultArr.slice(0, topN));
  }, [input, caseSensitive, ignoreCommonWords, minWordLength, sortBy, showTopN]);

  /* ─── Handlers ─── */
  const handleCopy = async () => {
    if (results.length === 0) return;
    const text = results
      .map((r, i) => `${i + 1}. ${r.word} — ${r.count} (${r.percentage.toFixed(1)}%)`)
      .join("\n");
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (results.length === 0) return;
    const header = "Rank,Word,Count,Percentage\n";
    const rows = results
      .map((r, i) => `${i + 1},"${r.word}",${r.count},${r.percentage.toFixed(2)}%`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "word-frequency.csv";
    a.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        setInput(text);
        setResults([]);
        setTotalWords(0);
        setUniqueWords(0);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClear = () => {
    setInput("");
    setResults([]);
    setTotalWords(0);
    setUniqueWords(0);
  };

  /* ─── Data ─── */

  const features = [
    {
      icon: Zap,
      title: "Instant Analysis",
      description:
        "Analyze thousands of words in milliseconds. The tool uses optimized JavaScript Map-based counting to process your text instantly — paste, click, and see word frequencies with zero waiting.",
    },
    {
      icon: Shield,
      title: "100% Private",
      description:
        "All processing happens locally in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party. Complete privacy guaranteed.",
    },
    {
      icon: BarChart3,
      title: "Detailed Statistics",
      description:
        "See word count, percentage of total, and frequency ranking for every word. The results table shows exactly how your vocabulary is distributed, with visual percentage bars for quick scanning.",
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description:
        "Ignore common stop words like 'the', 'and', 'is' to focus on meaningful content words. Set minimum word length, toggle case sensitivity, and control how many results to display.",
    },
    {
      icon: Globe,
      title: "Works on Any Device",
      description:
        "Use this tool on desktop, tablet, or mobile. Fully responsive design that works in Chrome, Firefox, Safari, Edge, and all modern browsers. No installation or plugins needed.",
    },
    {
      icon: Clock,
      title: "No Sign-Up Required",
      description:
        "Start analyzing word frequency immediately. No login, no account creation, no email address required. Free forever with unlimited usage — just paste your text and get instant results.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Paste or Upload Your Text",
      description:
        "Enter your text in the input area by pasting from any source — articles, essays, blog posts, SEO content, or academic papers. You can also upload a .txt file directly.",
    },
    {
      step: 2,
      title: "Configure Analysis Options",
      description:
        "Choose whether to ignore common stop words, enable case-sensitive matching, set a minimum word length filter, and select how many top results to display.",
    },
    {
      step: 3,
      title: "Click Analyze",
      description:
        "Press the \"Find Repeated Words\" button to instantly see a ranked word frequency table. The tool counts every word and calculates percentages in milliseconds.",
    },
    {
      step: 4,
      title: "Review & Export Results",
      description:
        "Review the frequency table with rank, word, count, and percentage columns. Copy the results to your clipboard or download them as a CSV file for further analysis in Excel or Google Sheets.",
    },
  ];

  const useCases = [
    {
      icon: Type,
      title: "Improve Writing Quality",
      description:
        "Identify overused words to diversify your vocabulary. If you notice a word appearing 15 times in a 500-word essay, you can replace some instances with synonyms for more polished, engaging prose that holds your reader's attention.",
    },
    {
      icon: BarChart3,
      title: "SEO Keyword Density",
      description:
        "Check keyword usage frequency for SEO optimization. Paste your article content, ignore stop words, and instantly see whether your target keywords are at an appropriate density (typically 1–3%) without over-stuffing that search engines penalize.",
    },
    {
      icon: FileText,
      title: "Academic Paper Review",
      description:
        "Find repetitive language in essays, theses, and research papers. Academic writing benefits from varied vocabulary — this tool reveals patterns you might not notice during manual proofreading, helping you produce more sophisticated work.",
    },
    {
      icon: Code2,
      title: "Content Editing",
      description:
        "Professional editing and proofreading workflow. Editors use word frequency analysis to identify verbal tics in a writer's manuscript — words or phrases used so often they become distracting to readers.",
    },
    {
      icon: Globe,
      title: "Social Media Optimization",
      description:
        "Analyze post word patterns across social media content. Understand which terms you use most in your captions, tweets, and posts, then adjust your language for better audience engagement and variety.",
    },
  ];

  const faqs = [
    {
      question: "What does the repeated words finder do?",
      answer:
        "The Repeated Words Finder analyzes any text you paste or upload, counts how many times each word appears, calculates each word's percentage of total words, and displays the results in a ranked frequency table. It helps you identify overused words, spot repetitive language, and improve your writing quality by diversifying your vocabulary. You can configure options like case sensitivity, stop word filtering, minimum word length, and sort order.",
    },
    {
      question: "How is word frequency calculated?",
      answer:
        "The tool splits your text into individual words using whitespace and punctuation boundaries, counts how many times each unique word appears using a Map data structure, then calculates the percentage by dividing each word's count by the total number of (filtered) words and multiplying by 100. For example, if the word 'design' appears 8 times in a 400-word text (after filtering), its percentage would be 2.0%. Results are sorted by frequency (highest first) or alphabetically, depending on your preference.",
    },
    {
      question: "Can I ignore common words like 'the' and 'and'?",
      answer:
        "Yes. The tool includes an 'Ignore common words' option that is enabled by default. This filters out stop words — extremely frequent English function words like 'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'to', 'of', 'in', 'for', 'it', 'this', 'that', as well as pronouns like 'he', 'she', 'they', 'we', 'you', 'I', and auxiliary verbs. Filtering these lets you focus on the meaningful content words that actually matter for your writing quality or SEO keyword density analysis.",
    },
    {
      question: "Is the word matching case-sensitive?",
      answer:
        "By default, the tool is case-insensitive — 'The', 'the', and 'THE' are all counted as the same word. You can enable the 'Case-sensitive' option if you need to distinguish between different capitalizations. Case-sensitive mode is useful for analyzing proper nouns separately from common words, identifying acronyms like 'API' or 'HTML', or working with programming-related text where case carries semantic meaning.",
    },
    {
      question: "How can this help improve my writing?",
      answer:
        "By revealing which words you use most frequently, the tool exposes repetitive language patterns that are hard to spot during normal reading. If the word 'very' appears 12 times in a short article, you know to replace some instances with stronger alternatives. Writers, editors, students, bloggers, and content creators all use word frequency analysis to polish their work, avoid monotonous repetition, and produce more varied, engaging prose that holds readers' attention.",
    },
    {
      question: "Is this tool free?",
      answer:
        "Yes, the Repeated Words Finder is completely free with no limitations whatsoever. There are no hidden charges, no premium tiers, and no sign-up required. You can analyze unlimited text as many times as you need. CoderDesign provides this tool as a free resource for writers, editors, students, SEO professionals, marketers, and anyone who wants to analyze word frequency in their text.",
    },
    {
      question: "Is my text private?",
      answer:
        "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this yourself by disconnecting from the internet and using the tool offline after the page has loaded. We do not use analytics or tracking on your text content.",
    },
    {
      question: "Can I use this for SEO keyword density analysis?",
      answer:
        "Yes. The tool is excellent for SEO keyword density analysis. Paste your article or web page content, enable 'Ignore common words' to filter out stop words, and you will see exactly how often each keyword appears and what percentage of the total word count it represents. Most SEO experts recommend keeping primary keyword density between 1% and 3%. This tool shows you the exact percentage so you can optimize your content without over-stuffing keywords, which search engines like Google penalize.",
    },
  ];

  /* ─── Render ─── */

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-blue-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
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
            <span className="text-white">Repeated Words Finder</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Search className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-4xl">
              Free Repeated Words Finder – Find Duplicate &amp; Overused Words
            </h1>
          </div>

          <p className="max-w-2xl text-white/90 leading-relaxed">
            Instantly find and count repeated words in any text. Analyze word
            frequency, identify overused language, improve writing quality, and
            optimize SEO keyword density. Free, private, no login required.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              100% Private
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              Instant
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              Any Device
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
          {/* Input Textarea */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-900">
                Input Text
              </label>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Upload className="h-3.5 w-3.5" />
                Upload .txt file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your text here to analyze word frequency and find repeated words..."
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>

          {/* Options Box */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Analysis Options
            </h3>
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:flex sm:flex-wrap sm:items-end sm:gap-5">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="h-4 w-4 flex-shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Case-sensitive</span>
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={ignoreCommonWords}
                  onChange={(e) => setIgnoreCommonWords(e.target.checked)}
                  className="h-4 w-4 flex-shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Ignore common words</span>
              </label>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Min word length
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={minWordLength}
                  onChange={(e) => setMinWordLength(e.target.value)}
                  className="w-full xs:w-16 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Show top N
                </label>
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={showTopN}
                  onChange={(e) => setShowTopN(e.target.value)}
                  className="w-full xs:w-16 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "count" | "alpha")
                  }
                  className="w-full xs:w-auto rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="count">Frequency</option>
                  <option value="alpha">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={analyze}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-auto whitespace-nowrap"
            >
              <Search className="h-4 w-4 flex-shrink-0" />
              <span className="hidden xs:inline">Find Repeated Words</span>
              <span className="xs:hidden">Analyze</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" />
              <span>Clear</span>
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              {/* Total Stats Bar */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-100 px-3 py-1.5 text-blue-700">
                  <BarChart3 className="h-3.5 w-3.5" />
                  <strong>{uniqueWords}</strong> unique words out of{" "}
                  <strong>{totalWords}</strong> total
                </span>
                <span className="text-slate-400">
                  Showing top {Math.min(
                    results.length,
                    Math.min(500, Math.max(5, parseInt(showTopN || "20", 10) || 20))
                  )} results
                </span>
              </div>

              {/* Results Table */}
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-[3rem_1fr_4.5rem_6rem] gap-2 bg-slate-100 px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <span>#</span>
                  <span>Word</span>
                  <span className="text-center">Count</span>
                  <span className="text-right">% of Total</span>
                </div>
                <div className="max-h-[28rem] overflow-y-auto divide-y divide-slate-100">
                  {results.map((r, i) => {
                    const maxPct =
                      results.length > 0 ? results[0].percentage : 1;
                    const barWidth =
                      maxPct > 0
                        ? Math.max(4, (r.percentage / maxPct) * 100)
                        : 0;
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-[3rem_1fr_4.5rem_6rem] gap-2 items-center px-5 py-2.5 text-sm hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-xs font-medium text-slate-400">
                          {i + 1}
                        </span>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-slate-900 truncate">
                            {r.word}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            r.count > 5
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {r.count}
                        </span>
                        <div className="flex items-center gap-2 justify-end">
                          <div className="hidden sm:block h-2 w-16 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                r.count > 5 ? "bg-red-400" : "bg-blue-400"
                              }`}
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-500 tabular-nums w-12 text-right">
                            {r.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Copy & Download Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Results
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadCSV}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download CSV
                </button>
              </div>
            </div>
          )}

          {results.length === 0 && input.trim() && totalWords === 0 && (
            <p className="text-sm text-slate-500">
              Click &quot;Find Repeated Words&quot; to analyze your text.
            </p>
          )}
        </div>
      </section>

      {/* ── 3. How-To Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Find Repeated Words in Text
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to analyze word frequency and find
              overused words in any text. It takes just seconds — no technical
              knowledge required.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {howToSteps.map((item) => (
              <div
                key={item.step}
                className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
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
              Why Use Our Free Repeated Words Finder?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and feature-rich word frequency analyzer built by
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
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
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
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Common Use Cases
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">
              See how writers, SEO professionals, editors, and students use the
              Repeated Words Finder to improve their text.
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
                    <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                      <Icon className="h-5 w-5 text-blue-600" />
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
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Everything you need to know about finding repeated words and
              analyzing word frequency. Can&apos;t find what you&apos;re looking
              for?{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 underline"
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
      <RelatedTools currentSlug="repeated-words-finder" />

      {/* ── 8. CTA ── */}
      <ToolCta theme="blue" />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
