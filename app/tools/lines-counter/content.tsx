"use client";
import { useState, useRef, useMemo } from "react";
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
  Hash,
  ArrowRight,
  BarChart3,
  Type,
  Mail,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

export default function LinesCounterTool() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ─── Real-Time Stats (useMemo — updates on every keystroke) ─── */
  const stats = useMemo(() => {
    if (!input) {
      return {
        lines: 0,
        nonEmptyLines: 0,
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        averageWordLength: "0",
        longestLine: 0,
        readingTime: "0 min",
      };
    }

    const linesArr = input.split("\n");
    const lines = linesArr.length;
    const nonEmptyLines = linesArr.filter((l) => l.trim().length > 0).length;

    const wordsArr = input.trim().split(/\s+/).filter((w) => w.length > 0);
    const words = wordsArr.length;

    const characters = input.length;
    const charactersNoSpaces = input.replace(/\s/g, "").length;

    const sentenceMatches = input.match(/[.!?]+/g);
    const sentences = sentenceMatches ? sentenceMatches.length : 0;

    const paragraphsArr = input
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0);
    const paragraphs =
      paragraphsArr.length > 0 ? paragraphsArr.length : input.trim() ? 1 : 0;

    const totalWordChars = wordsArr.reduce((sum, w) => sum + w.length, 0);
    const averageWordLength =
      words > 0 ? (totalWordChars / words).toFixed(1) : "0";

    const longestLine = Math.max(...linesArr.map((l) => l.length), 0);

    const readingTime = Math.ceil(words / 200) + " min";

    return {
      lines,
      nonEmptyLines,
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      averageWordLength,
      longestLine,
      readingTime,
    };
  }, [input]);

  /* ─── Handlers ─── */
  const handleCopyStats = async () => {
    const text = [
      `Lines: ${stats.lines}`,
      `Non-Empty Lines: ${stats.nonEmptyLines}`,
      `Words: ${stats.words}`,
      `Characters: ${stats.characters}`,
      `Characters (no spaces): ${stats.charactersNoSpaces}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Avg Word Length: ${stats.averageWordLength}`,
      `Longest Line: ${stats.longestLine} chars`,
      `Reading Time: ${stats.readingTime}`,
    ].join("\n");
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!input) return;
    const blob = new Blob([input], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "text-content.txt";
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
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  /* ─── Data ─── */

  const primaryStats = [
    {
      label: "Lines",
      value: stats.lines,
      color: "bg-violet-50 text-violet-700 border-violet-200",
    },
    {
      label: "Words",
      value: stats.words,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      label: "Characters",
      value: stats.characters,
      color: "bg-green-50 text-green-700 border-green-200",
    },
    {
      label: "Chars (no spaces)",
      value: stats.charactersNoSpaces,
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
  ];

  const secondaryStats = [
    {
      label: "Sentences",
      value: stats.sentences,
      color: "bg-pink-50 text-pink-700 border-pink-200",
    },
    {
      label: "Paragraphs",
      value: stats.paragraphs,
      color: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      label: "Avg Word Length",
      value: stats.averageWordLength,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      label: "Reading Time",
      value: stats.readingTime,
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-Time Counting",
      description:
        "Statistics update instantly as you type — no button needed. Every keystroke triggers an immediate recalculation of all metrics so you always see accurate counts.",
    },
    {
      icon: Shield,
      title: "100% Private",
      description:
        "All counting happens locally in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party.",
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description:
        "Use this tool on any device — desktop, tablet, or mobile. Compatible with Chrome, Firefox, Safari, Edge, and all modern browsers. No installation needed.",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Statistics",
      description:
        "Get a full breakdown: lines, non-empty lines, words, characters (with and without spaces), sentences, paragraphs, average word length, longest line, and estimated reading time.",
    },
    {
      icon: FileText,
      title: "File Upload Support",
      description:
        "Upload .txt files directly to analyze their contents. The file is read locally in your browser and all statistics appear instantly — perfect for large text files.",
    },
    {
      icon: Clock,
      title: "No Sign-Up Required",
      description:
        "Start using the tool immediately. No login, no account creation, no email required. Free forever with unlimited usage — just paste your text and get results.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Paste or Type Your Text",
      description:
        "Enter your text in the text area below. You can type directly, paste from your clipboard, or upload a .txt file. There is no character limit.",
    },
    {
      step: 2,
      title: "View Real-Time Statistics",
      description:
        "Statistics appear instantly in the cards above and below the text area. Line count, word count, character count, and all other metrics update on every keystroke.",
    },
    {
      step: 3,
      title: "Upload a File (Optional)",
      description:
        'For large text files, click the "Upload .txt file" button to load a file directly from your device. The file is read locally and statistics appear immediately.',
    },
    {
      step: 4,
      title: "Copy Your Text or Stats",
      description:
        'Click "Copy Stats" to copy all statistics as formatted text to your clipboard. You can also download your text as a .txt file using the Download button.',
    },
  ];

  const useCases = [
    {
      icon: FileText,
      title: "Check Essay Word Count",
      description:
        "Verify that your essay, assignment, or thesis meets word count requirements for academic submissions. See word count, character count, and paragraph count in real time as you write.",
    },
    {
      icon: Code2,
      title: "Analyze Code Files",
      description:
        "Count lines of code in your source files. Upload or paste code to get total line count, non-empty lines, and longest line metrics — useful for code reviews and documentation.",
    },
    {
      icon: Globe,
      title: "Social Media Character Limits",
      description:
        "Check your text against social media character limits — Twitter/X (280 characters), LinkedIn posts (3,000 characters), Instagram captions (2,200 characters), and more.",
    },
    {
      icon: Mail,
      title: "Email Length Optimization",
      description:
        "Keep your emails concise and effective. Monitor word count and reading time to ensure your email stays under the ideal 200-word mark for maximum engagement.",
    },
    {
      icon: BarChart3,
      title: "Content Writing & SEO",
      description:
        "Analyze content length for SEO optimization. Check if your blog posts meet recommended word counts (1,500–2,500 words), estimate reading time, and track paragraph structure.",
    },
  ];

  const faqs = [
    {
      question: "What does the line counter tool do?",
      answer:
        "The line counter tool analyzes any text you enter and gives you a comprehensive breakdown of statistics including the total number of lines, non-empty lines, words, characters (with and without spaces), sentences, paragraphs, average word length, longest line length, and estimated reading time. All statistics update in real time as you type — no button needed.",
    },
    {
      question: "Does it count words and characters too?",
      answer:
        "Yes. In addition to counting lines, the tool provides a full word count, total character count, and a character count excluding spaces. It also calculates the number of sentences, paragraphs, average word length, and estimated reading time — all updating live on every keystroke as you type or paste text.",
    },
    {
      question: "How are paragraphs counted?",
      answer:
        "Paragraphs are counted by splitting your text on double line breaks (blank lines). Each block of text separated by one or more blank lines is counted as one paragraph. If your text has no blank lines but contains content, the entire text is treated as a single paragraph.",
    },
    {
      question: "Does it count in real time?",
      answer:
        "Yes! All statistics update instantly on every keystroke — there is no button to press. As soon as you start typing, pasting, or editing text, the line count, word count, character count, and all other metrics refresh immediately in the stats cards above the text area.",
    },
    {
      question: "Is this tool free?",
      answer:
        "Yes, the line counter is completely free with no limitations whatsoever. There are no hidden charges, no premium tiers, and no sign-up required. You can count unlimited text as many times as you need. CoderDesign provides this tool as a free resource for writers, developers, students, and content creators.",
    },
    {
      question: "Is my text private?",
      answer:
        "Absolutely. All counting and analysis happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this yourself by using the tool in offline mode after the page has loaded.",
    },
    {
      question: "Can I upload a file to count?",
      answer:
        'Yes. Click the "Upload .txt file" button to load a text file from your device. The file is read locally in your browser — it is never uploaded to any server. All statistics will immediately appear for the uploaded text, and you can continue editing it in the text area.',
    },
    {
      question: "What counts as a 'word' in the counter?",
      answer:
        "A word is defined as any sequence of non-whitespace characters separated by spaces, tabs, or line breaks. For example, \"hello-world\" counts as one word, while \"hello world\" counts as two words. Numbers, punctuation marks, and special characters surrounded by whitespace are also counted as individual words.",
    },
  ];

  /* ─── Render ─── */

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-16 lg:py-20">
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
            <span className="text-white">Line Counter</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Hash className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-4xl">
              Free Online Line Counter – Count Lines, Words &amp; Characters
              Instantly
            </h1>
          </div>

          <p className="max-w-2xl text-white/90 leading-relaxed">
            Count lines, words, characters, sentences, paragraphs, and estimated
            reading time in real time as you type. Paste any text or upload a
            file — statistics update instantly on every keystroke. Free, private,
            no login required.
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
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 space-y-5">
          {/* Primary Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {primaryStats.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border p-4 text-center ${s.color}`}
              >
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-xs font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Secondary Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {secondaryStats.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border p-4 text-center ${s.color}`}
              >
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-xs font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Non-Empty Lines + Longest Line (inline) */}
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-slate-700">
              Non-Empty Lines: <strong>{stats.nonEmptyLines}</strong>
            </span>
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-slate-700">
              Longest Line: <strong>{stats.longestLine}</strong> chars
            </span>
          </div>

          {/* Textarea */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-900">
                Your Text
              </label>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors"
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
              placeholder="Paste or type your text here to count lines, words, characters, sentences, and paragraphs in real time..."
              rows={10}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyStats}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 flex-shrink-0" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 flex-shrink-0" />
                  <span>Copy Stats</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              disabled={!input}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4 flex-shrink-0" />
              <span>Download .txt</span>
            </button>
            <button
              onClick={() => setInput("")}
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
              How to Count Lines, Words, and Characters in Text
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to get a complete text analysis. It takes
              just seconds — no technical knowledge required.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {howToSteps.map((item) => (
              <div
                key={item.step}
                className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
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
              Why Use Our Free Line &amp; Word Counter?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and comprehensive text statistics tool built by
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
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-violet-200 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                    <Icon className="h-6 w-6 text-violet-600" />
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
              See how writers, developers, students, and marketers use the line
              counter to save time and stay on target.
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
                    <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100">
                      <Icon className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
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
              Everything you need to know about counting lines, words, and
              characters in text. Can&apos;t find what you&apos;re looking for?{" "}
              <Link
                href="/contact"
                className="text-violet-600 hover:text-violet-700 underline"
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
      <RelatedTools currentSlug="lines-counter" />

      {/* ── 8. CTA ── */}
      <ToolCta />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
