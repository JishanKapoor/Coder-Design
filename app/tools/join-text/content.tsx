"use client";
import { useState, useRef, useCallback, useMemo } from "react";
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
  Merge,
  ArrowRight,
  Type,
  Settings,
  Link2,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

/* ─── Data ─── */
const features = [
  {
    icon: Merge,
    title: "Flexible Separators",
    desc: "Join lines with comma, pipe, space, tab, newline, or any custom multi-character string — no limit on separator length or complexity.",
  },
  {
    icon: Zap,
    title: "Instant Joining",
    desc: "Merge thousands of lines in milliseconds. The tool processes large text files instantly, entirely in your browser with zero lag.",
  },
  {
    icon: Shield,
    title: "100\u2009% Private",
    desc: "Everything runs client-side in JavaScript. Your text is never sent to any server, stored, logged, or shared with anyone.",
  },
  {
    icon: Code2,
    title: "Developer-Friendly",
    desc: "Create JavaScript arrays, Python lists, CSV rows, SQL IN clauses, and more — use wrap, prefix, and suffix to format each item perfectly.",
  },
  {
    icon: Globe,
    title: "Works on Any Device",
    desc: "Fully responsive layout optimized for desktop, tablet, and mobile. No app install required — just open and join.",
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
    title: "Paste or Upload Your Lines",
    desc: "Type, paste, or upload a .txt file containing the lines you want to join — one item per line.",
  },
  {
    step: "02",
    title: "Choose a Separator",
    desc: "Pick a preset separator pill (comma, semicolon, pipe, space, tab, newline) or click Custom and type any multi-character delimiter.",
  },
  {
    step: "03",
    title: "Configure Options",
    desc: "Optionally trim lines, remove blanks, add a prefix/suffix to each line, or wrap each item in quotes or brackets.",
  },
  {
    step: "04",
    title: "Copy or Download the Joined Text",
    desc: "Click Join Lines to merge everything. Copy the result to your clipboard or download it as a .txt file.",
  },
];

const useCases = [
  {
    icon: FileText,
    title: "Create CSV Data",
    desc: "Turn a column of values into a single comma-separated row — ready for spreadsheets, databases, or APIs.",
    before: "Alice\nBob\nCharlie",
    after: "Alice, Bob, Charlie",
  },
  {
    icon: Code2,
    title: "Build Code Arrays",
    desc: "Wrap each item in quotes and join with commas to create JavaScript, Python, or JSON arrays instantly.",
    before: "red\nblue\ngreen",
    after: '"red", "blue", "green"',
  },
  {
    icon: Type,
    title: "Merge Paragraphs",
    desc: "Combine separate lines into a single continuous paragraph by joining with a space.",
    before: "Line 1\nLine 2\nLine 3",
    after: "Line 1 Line 2 Line 3",
  },
  {
    icon: Globe,
    title: "SQL IN Clauses",
    desc: "Wrap IDs in single quotes and join with commas to build SQL WHERE IN clauses in seconds.",
    before: "101\n102\n103",
    after: "'101', '102', '103'",
  },
  {
    icon: Settings,
    title: "Create Pipe-Delimited Data",
    desc: "Join fields with pipe separators for log files, data exports, or custom data formats.",
    before: "field1\nfield2\nfield3",
    after: "field1 | field2 | field3",
  },
];

const faqs = [
  {
    question: "What does the text joiner do?",
    answer:
      "The Text Joiner takes multiple lines of text and merges them into a single string using any separator you choose — comma, semicolon, pipe, space, tab, newline, or any custom multi-character delimiter. It is the reverse of splitting text: you start with one item per line and end with all items joined together.",
  },
  {
    question: "What separators can I use?",
    answer:
      "You can use any separator. The tool provides seven quick presets — comma, semicolon, pipe, space, tab, newline, and a custom input field. The custom field accepts any string including multi-character separators like ' :: ', ' → ', ' -- ', or even HTML tags. There is no limit on separator length.",
  },
  {
    question: "Can I join lines into a comma-separated list?",
    answer:
      "Yes. Select the Comma preset and click Join Lines. Each line becomes one item in a clean comma-separated list — perfect for creating CSV rows, JavaScript arrays, or comma-delimited values for spreadsheets and databases.",
  },
  {
    question: "How do I handle blank lines?",
    answer:
      "The 'Remove empty lines' checkbox is enabled by default, stripping blank lines before joining. Uncheck it if you need to preserve blank entries — empty lines become empty strings between separators.",
  },
  {
    question: "Can I add a prefix and suffix to each line before joining?",
    answer:
      "Yes. Use the Prefix and Suffix input fields to prepend and append any string to every line. For example, set prefix to '<li>' and suffix to '</li>' to wrap each line in HTML tags. Use the Wrap field to enclose each line in quotes, brackets, or any pair of characters.",
  },
  {
    question: "Can I use custom multi-character separators?",
    answer:
      "Absolutely. Click the Custom pill and type any string into the custom separator field. Multi-character separators like ' :: ', ' | ', ' → ', or even longer strings are fully supported. The tool uses your exact string between every pair of joined lines.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored, logged, or shared. You can verify this by disconnecting from the internet after the page loads.",
  },
  {
    question: "Is the tool free? Are there any limits?",
    answer:
      "The Text Joiner is completely free with no limitations. No hidden charges, no premium tiers, no sign-up. Join unlimited text as many times as you need — CoderDesign provides this as a free resource for developers, writers, and data analysts.",
  },
];

/* ─── Separator presets ─── */
interface SeparatorPreset {
  label: string;
  value: string;
  display: string;
}

const separatorPresets: SeparatorPreset[] = [
  { label: "Comma", value: ", ", display: ", " },
  { label: "Semicolon", value: "; ", display: "; " },
  { label: "Pipe", value: " | ", display: " | " },
  { label: "Space", value: " ", display: "␣" },
  { label: "Tab", value: "\t", display: "\\t" },
  { label: "Newline", value: "\n", display: "\\n" },
];

/* ─── Component ─── */
export default function JoinTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Join options */
  const [separator, setSeparator] = useState(", ");
  const [customSeparator, setCustomSeparator] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [addPrefix, setAddPrefix] = useState("");
  const [addSuffix, setAddSuffix] = useState("");
  const [wrapEach, setWrapEach] = useState("");

  const [joinedLineCount, setJoinedLineCount] = useState(0);
  const [resultLength, setResultLength] = useState(0);

  /* ── Active separator ── */
  const activeSeparator = useMemo(
    () => (useCustom ? customSeparator : separator),
    [useCustom, customSeparator, separator]
  );

  /* ── Core join logic ── */
  const joinText = useCallback(() => {
    if (!input) {
      setOutput("");
      setJoinedLineCount(0);
      setResultLength(0);
      return;
    }

    let lines = input.split("\n");

    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }
    if (removeEmpty) {
      lines = lines.filter((l) => l.length > 0);
    }

    /* Apply prefix + suffix */
    if (addPrefix || addSuffix) {
      lines = lines.map((l) => `${addPrefix}${l}${addSuffix}`);
    }

    /* Apply wrap (e.g. quotes around each item) */
    if (wrapEach) {
      lines = lines.map((l) => `${wrapEach}${l}${wrapEach}`);
    }

    const result = lines.join(activeSeparator);
    setOutput(result);
    setJoinedLineCount(lines.length);
    setResultLength(result.length);
  }, [input, trimLines, removeEmpty, addPrefix, addSuffix, wrapEach, activeSeparator]);

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
    a.download = "joined-text.txt";
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
    setJoinedLineCount(0);
    setResultLength(0);
  };

  /* ─── Render ─── */
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 py-16 lg:py-20">
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
            <span className="text-white">Text Joiner</span>
          </nav>

          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 p-3 backdrop-blur-sm">
            <Link2 className="h-7 w-7 text-white" />
            <Merge className="h-7 w-7 text-white" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">
            Free Text Joiner Online – Merge &amp; Combine Lines
          </h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">
            Join multiple lines of text into one string with any separator —
            comma, pipe, space, tab, newline, or custom. Perfect for creating
            CSV data, code arrays, SQL IN clauses, and merged lists. Free,
            private, and instant.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
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
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 space-y-6">
          {/* Input */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Input Text (one item per line)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={"apple\nbanana\ncherry\ndate\nelderberry"}
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-colors font-mono"
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-green-300 hover:text-green-700 transition-colors"
              >
                <Upload className="h-3.5 w-3.5" />
                Upload File
              </button>
              <span className="text-xs text-slate-400">
                .txt, .csv, .tsv, .log, .md
              </span>
            </div>
          </div>

          {/* Separator presets */}
          <div className="space-y-3">
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">
              Separator
            </label>
            <div className="flex flex-wrap gap-2">
              {separatorPresets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setSeparator(p.value);
                    setUseCustom(false);
                  }}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    !useCustom && separator === p.value
                      ? "border-green-300 bg-green-50 text-green-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-green-200"
                  }`}
                >
                  {p.label}
                  <span className="ml-1 font-mono text-[10px] opacity-60">
                    {p.display}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setUseCustom(true)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  useCustom
                    ? "border-green-300 bg-green-50 text-green-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-green-200"
                }`}
              >
                Custom
              </button>
            </div>
            {useCustom && (
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Custom Separator
                </label>
                <input
                  type="text"
                  value={customSeparator}
                  onChange={(e) => setCustomSeparator(e.target.value)}
                  placeholder="e.g.  ::  or  →  or any string"
                  className="w-64 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
            )}
          </div>

          {/* Options */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trimLines}
                  onChange={(e) => setTrimLines(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
                Trim lines
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeEmpty}
                  onChange={(e) => setRemoveEmpty(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
                Remove empty lines
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Prefix per line
                </label>
                <input
                  type="text"
                  value={addPrefix}
                  onChange={(e) => setAddPrefix(e.target.value)}
                  placeholder='e.g. <li> or "  '
                  className="w-36 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Suffix per line
                </label>
                <input
                  type="text"
                  value={addSuffix}
                  onChange={(e) => setAddSuffix(e.target.value)}
                  placeholder='e.g. </li> or "'
                  className="w-36 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Wrap each line
                </label>
                <input
                  type="text"
                  value={wrapEach}
                  onChange={(e) => setWrapEach(e.target.value)}
                  placeholder={`e.g. " or ' or [`}
                  className="w-36 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
                <p className="mt-0.5 text-[10px] text-slate-400">
                  Added to both sides
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={joinText}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-colors hover:bg-green-700"
            >
              <Link2 className="h-4 w-4 flex-shrink-0" />
              <span>Join Lines</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" />
              <span>Clear</span>
            </button>
          </div>

          {/* Stats bar */}
          {joinedLineCount > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-800">
              <Merge className="h-4 w-4 flex-shrink-0" />
              <span>
                Joined{" "}
                <strong className="font-semibold">{joinedLineCount}</strong>{" "}
                {joinedLineCount === 1 ? "line" : "lines"} →{" "}
                <strong className="font-semibold">
                  {resultLength.toLocaleString()}
                </strong>{" "}
                characters
              </span>
            </div>
          )}

          {/* Output */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Output
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                placeholder="Joined text will appear here…"
                rows={6}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono"
              />
              {output && (
                <div className="absolute right-2 top-2 flex gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-green-300 hover:text-green-700 transition-colors"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-green-300 hover:text-green-700 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. How-To ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Join Text Lines Online
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Four simple steps to merge any lines of text into a single string
              using CoderDesign&apos;s free Text Joiner.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howToSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-sm font-bold text-green-700">
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
      <section className="border-t border-slate-200 bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Why Use Our Free Text Joiner?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A powerful, privacy-first text merging tool with flexible
              separators, wrapping options, and zero limitations — built for
              developers, writers, and data analysts.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
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
      <section className="border-t border-slate-200 bg-slate-50 py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Real-World Use Cases
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              See how the Text Joiner handles common merging tasks — from CSV
              creation to SQL clause generation.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <uc.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-slate-900">
                  {uc.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  {uc.desc}
                </p>
                <div className="space-y-2 text-xs">
                  <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 font-mono text-red-700">
                    <span className="font-semibold text-red-500">
                      Before:{" "}
                    </span>
                    {uc.before}
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <div className="rounded-lg bg-green-50 border border-green-100 px-3 py-2 font-mono text-green-700 whitespace-pre-line">
                    <span className="font-semibold text-green-500">
                      After:{" "}
                    </span>
                    {uc.after}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-14 lg:py-18">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
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
      <RelatedTools currentSlug="join-text" />

      {/* ── 8. CTA ── */}
      <ToolCta />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
