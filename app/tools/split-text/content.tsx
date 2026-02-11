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
  Scissors,
  ArrowRight,
  Split,
  Type,
  Settings,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

/* ─── Types ─── */
type SplitMode = "delimiter" | "characters" | "lines" | "words" | "regex";

/* ─── Data ─── */
const features = [
  {
    icon: Scissors,
    title: "Multiple Split Modes",
    desc: "Split by delimiter, character count, line count, word count, or a custom regular expression — five powerful modes in one tool.",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    desc: "Split any amount of text instantly. The tool processes megabytes of text in milliseconds, entirely in your browser.",
  },
  {
    icon: Shield,
    title: "100\u2009% Private",
    desc: "Everything runs client-side in JavaScript. Your text is never sent to any server, stored, logged, or shared with anyone.",
  },
  {
    icon: Code2,
    title: "Regex Support",
    desc: "Use full JavaScript regular expression patterns to split text on complex boundaries — capture groups, lookaheads, and more.",
  },
  {
    icon: Globe,
    title: "Works on Any Device",
    desc: "Fully responsive layout optimized for desktop, tablet, and mobile. No app install required — just open and split.",
  },
  {
    icon: Clock,
    title: "No Sign-Up Required",
    desc: "Completely free, no registration, no email, no limits. Use the tool as many times as you need, forever.",
  },
];

const howToSteps = [
  {
    step: "01",
    title: "Paste or Upload Your Text",
    desc: "Type, paste, or upload a .txt file containing the text you want to split — CSV data, log files, articles, code, or anything else.",
  },
  {
    step: "02",
    title: "Choose a Split Mode",
    desc: "Select one of five modes: by delimiter, by character count, by number of lines, by word count, or by regular expression pattern.",
  },
  {
    step: "03",
    title: "Configure & Click Split",
    desc: "Set the delimiter, chunk size, or regex pattern. Optionally enable trim or remove-empty options. Then click the Split Text button.",
  },
  {
    step: "04",
    title: "Copy or Download Results",
    desc: "Review the resulting chunks, see how many parts were created, and copy to clipboard or download as a .txt file.",
  },
];

const useCases = [
  {
    icon: FileText,
    title: "Split CSV Data",
    desc: "Break comma-separated rows into individual values — one value per line.",
    before: "Alice,Bob,Charlie,David",
    after: "Alice\nBob\nCharlie\nDavid",
  },
  {
    icon: Code2,
    title: "Chunk Code or Logs",
    desc: "Split large log files into manageable sections of N lines each for easier review.",
    before: "(100 log lines)",
    after: "(5 chunks of 20 lines)",
  },
  {
    icon: Type,
    title: "Divide Long Articles",
    desc: "Break a long article into smaller social-media-ready posts by word count.",
    before: "(2 000-word article)",
    after: "(10 chunks of 200 words)",
  },
  {
    icon: Globe,
    title: "Parse API Responses",
    desc: "Split pipe-delimited or tab-separated data from APIs into structured lines.",
    before: "key1|val1|key2|val2",
    after: "key1\nval1\nkey2\nval2",
  },
  {
    icon: Settings,
    title: "Extract Sentences",
    desc: "Split by period to isolate individual sentences for translation, analysis, or NLP tasks.",
    before: "First sentence. Second sentence. Third.",
    after: "First sentence.\nSecond sentence.\nThird.",
  },
];

const faqs = [
  {
    question: "What does the text splitter do?",
    answer:
      "The Text Splitter breaks any block of text into smaller parts based on the method you choose. You can split by a delimiter (comma, semicolon, pipe, tab, or any custom string), by a fixed character count, by a fixed number of lines, by word count, or by a regular expression pattern. Results are displayed in an output box and can be copied or downloaded.",
  },
  {
    question: "What delimiters can I split by?",
    answer:
      "You can split by any delimiter. Common presets include comma (,), semicolon (;), pipe (|), tab, and newline. You can also type any custom string — for example '::' or ' → ' or even a multi-character sequence. The tool uses your exact delimiter string to split the input.",
  },
  {
    question: "Can I split text into a specific number of parts?",
    answer:
      "Yes. Use the 'By Number of Lines' or 'By Word Count' modes to control chunk size. For example, 100 lines split every 20 lines produces 5 chunks. Similarly, a 500-word text split every 50 words produces 10 chunks.",
  },
  {
    question: "How do I split text by character count?",
    answer:
      "Select the 'By Character Count' mode and enter the number of characters per chunk. The tool slices every N characters, producing uniform-length segments — useful for SMS limits, database fields, or fixed-width blocks.",
  },
  {
    question: "Is the tool free to use?",
    answer:
      "Yes, the Text Splitter is completely free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. Split unlimited text as many times as you need.",
  },
  {
    question: "Is my text private?",
    answer:
      "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored, logged, or shared. You can verify this by disconnecting from the internet after the page loads.",
  },
  {
    question: "Can I split CSV or TSV data?",
    answer:
      "Yes. For CSV, use the delimiter mode with a comma. For TSV, choose the tab preset. Each cell value becomes its own line. Enable 'Trim results' to strip whitespace from each value automatically.",
  },
  {
    question: "Does it preserve empty lines?",
    answer:
      "By default, empty parts are kept so you see exactly where consecutive delimiters produced blanks. Enable 'Remove empty parts' to filter them out before the results are displayed.",
  },
];

const splitModes: { value: SplitMode; label: string }[] = [
  { value: "delimiter", label: "By Delimiter" },
  { value: "characters", label: "By Character Count" },
  { value: "lines", label: "By Number of Lines" },
  { value: "words", label: "By Word Count" },
  { value: "regex", label: "By Regex" },
];

/* ─── Component ─── */
export default function SplitTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Split options */
  const [splitMode, setSplitMode] = useState<SplitMode>("delimiter");
  const [customDelimiter, setCustomDelimiter] = useState(",");
  const [charCount, setCharCount] = useState("100");
  const [lineCount, setLineCount] = useState("10");
  const [wordCount, setWordCount] = useState("50");
  const [regexPattern, setRegexPattern] = useState("");
  const [trimResults, setTrimResults] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [outputSeparator, setOutputSeparator] = useState("\\n---\\n");

  const [chunkCount, setChunkCount] = useState(0);

  /* ── Helpers ── */
  const resolveDelimiter = (raw: string): string => {
    return raw.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\r/g, "\r");
  };

  const resolveSeparator = (raw: string): string => {
    return raw.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\r/g, "\r");
  };

  /* ── Core split logic ── */
  const splitText = useCallback(() => {
    if (!input) {
      setOutput("");
      setChunkCount(0);
      return;
    }

    const safeCharCount = Math.max(1, parseInt(charCount || "100", 10) || 100);
    const safeLineCount = Math.max(1, parseInt(lineCount || "10", 10) || 10);
    const safeWordCount = Math.max(1, parseInt(wordCount || "50", 10) || 50);

    let parts: string[] = [];

    switch (splitMode) {
      case "delimiter": {
        const delim = resolveDelimiter(customDelimiter);
        parts = delim ? input.split(delim) : [input];
        break;
      }
      case "characters": {
        const n = safeCharCount;
        for (let i = 0; i < input.length; i += n) {
          parts.push(input.slice(i, i + n));
        }
        break;
      }
      case "lines": {
        const allLines = input.split("\n");
        const n = safeLineCount;
        for (let i = 0; i < allLines.length; i += n) {
          parts.push(allLines.slice(i, i + n).join("\n"));
        }
        break;
      }
      case "words": {
        const allWords = input.split(/\s+/).filter(Boolean);
        const n = safeWordCount;
        for (let i = 0; i < allWords.length; i += n) {
          parts.push(allWords.slice(i, i + n).join(" "));
        }
        break;
      }
      case "regex": {
        if (!regexPattern) {
          parts = [input];
        } else {
          try {
            const re = new RegExp(regexPattern, "g");
            parts = input.split(re);
          } catch {
            parts = [input];
          }
        }
        break;
      }
    }

    if (trimResults) {
      parts = parts.map((p) => p.trim());
    }
    if (removeEmpty) {
      parts = parts.filter((p) => p.length > 0);
    }

    setChunkCount(parts.length);
    const sep = resolveSeparator(outputSeparator);
    setOutput(parts.join(sep));
  }, [
    input,
    splitMode,
    customDelimiter,
    charCount,
    lineCount,
    wordCount,
    regexPattern,
    trimResults,
    removeEmpty,
    outputSeparator,
  ]);

  /* ── Actions ── */
  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "split-text.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") setInput(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setChunkCount(0);
  };

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
            <span className="text-white">Text Splitter</span>
          </nav>

          <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-white/15 p-3 backdrop-blur-sm">
            <Scissors className="h-7 w-7 text-white" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">
            Free Text Splitter Online – Split by Delimiter, Character, or Line
          </h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">
            Split text by any delimiter, character count, line count, word
            count, or regular expression. Chunk CSV data, break log files,
            divide articles — instantly and privately in your browser.
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
          {/* Input */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your text here — CSV rows, log lines, paragraphs, code…"
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
            <div className="mt-2 flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.csv,.tsv,.log,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                <Upload className="h-3.5 w-3.5" />
                Upload File
              </button>
              <span className="text-xs text-slate-400">
                .txt, .csv, .tsv, .log, .md
              </span>
            </div>
          </div>

          {/* Split Mode Tabs */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Split Mode
            </label>
            <div className="flex flex-wrap gap-2">
              {splitModes.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setSplitMode(m.value)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    splitMode === m.value
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode-specific options */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
            {splitMode === "delimiter" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Delimiter
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { label: "Comma", val: "," },
                    { label: "Semicolon", val: ";" },
                    { label: "Pipe", val: "|" },
                    { label: "Tab", val: "\\t" },
                    { label: "Newline", val: "\\n" },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setCustomDelimiter(preset.val)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        customDelimiter === preset.val
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-slate-300 text-slate-700 hover:border-blue-300"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                  <input
                    type="text"
                    value={customDelimiter}
                    onChange={(e) => setCustomDelimiter(e.target.value)}
                    placeholder="Custom…"
                    className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-mono text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            )}

            {splitMode === "characters" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Characters per chunk
                </label>
                <input
                  type="number"
                  min={1}
                  value={charCount}
                  onChange={(e) => setCharCount(e.target.value)}
                  className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}

            {splitMode === "lines" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Lines per chunk
                </label>
                <input
                  type="number"
                  min={1}
                  value={lineCount}
                  onChange={(e) => setLineCount(e.target.value)}
                  className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}

            {splitMode === "words" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Words per chunk
                </label>
                <input
                  type="number"
                  min={1}
                  value={wordCount}
                  onChange={(e) => setWordCount(e.target.value)}
                  className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}

            {splitMode === "regex" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Regex Pattern
                </label>
                <input
                  type="text"
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  placeholder="e.g. [.!?]\\s+"
                  className="w-full max-w-sm rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-mono text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <p className="mt-1 text-xs text-slate-400">
                  JavaScript regex syntax — e.g.{" "}
                  <code className="rounded bg-slate-200 px-1">{`[,;|]`}</code>{" "}
                  or{" "}
                  <code className="rounded bg-slate-200 px-1">{`\\n{2,}`}</code>
                </p>
              </div>
            )}

            {/* Shared options */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-200 pt-4">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trimResults}
                  onChange={(e) => setTrimResults(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Trim results
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeEmpty}
                  onChange={(e) => setRemoveEmpty(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Remove empty parts
              </label>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-600">
                  Output separator
                </label>
                <input
                  type="text"
                  value={outputSeparator}
                  onChange={(e) => setOutputSeparator(e.target.value)}
                  className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-mono text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={splitText}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-auto whitespace-nowrap"
            >
              <Scissors className="h-4 w-4 flex-shrink-0" />
              <span>Split Text</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" />
              <span>Clear</span>
            </button>
          </div>

          {/* Stats bar */}
          {chunkCount > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm text-blue-800">
              <Split className="h-4 w-4 flex-shrink-0" />
              <span>
                Split into{" "}
                <strong className="font-semibold">{chunkCount}</strong>{" "}
                {chunkCount === 1 ? "part" : "parts"}
              </span>
            </div>
          )}

          {/* Output */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Output
            </label>
              <textarea
                value={output}
                readOnly
                placeholder="Split result will appear here…"
                rows={10}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono"
              />
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* ── 3. How-To ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Split Text Online
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Four simple steps to break any text into smaller chunks using
              CoderDesign&apos;s free Text Splitter.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howToSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                  {s.step}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Features ── */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Why Use Our Free Text Splitter?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A powerful, privacy-first splitting tool with five modes, regex
              support, and zero limitations — built for developers, writers,
              and data analysts.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Use Cases ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Real-World Use Cases
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              See how the Text Splitter handles common splitting tasks — from
              CSV parsing to article chunking.
            </p>
          </div>
          <div className="space-y-8">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex items-start gap-4 border-b border-slate-100 px-6 py-4 sm:px-7 sm:py-5">
                  <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                    <uc.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-900">
                      {uc.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {uc.desc}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p>
                    <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-700 font-mono p-3 bg-white rounded-lg">{uc.before}</pre>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Output</p>
                    <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-emerald-800 font-mono p-3 bg-emerald-100 rounded-lg">{uc.after}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 lg:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
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
      <RelatedTools currentSlug="split-text" />

      {/* ── 8. CTA ── */}
      <ToolCta theme="blue" />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
