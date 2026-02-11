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
  Eraser,
  ArrowRight,
  Database,
  Mail,
  List,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

export default function DuplicateEraserTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(false);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [stats, setStats] = useState<{
    totalLines: number;
    uniqueLines: number;
    duplicatesRemoved: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processText = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }

    const lines = input.split("\n");
    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      /* optionally skip empty/blank lines */
      if (removeEmptyLines && line.trim() === "") {
        continue;
      }

      /* build a comparison key */
      let key = trimWhitespace ? line.trim() : line;
      if (!caseSensitive) {
        key = key.toLowerCase();
      }

      if (!seen.has(key)) {
        seen.add(key);
        result.push(trimWhitespace ? line.trim() : line);
      }
    }

    const outputText = result.join("\n");
    setOutput(outputText);
    setStats({
      totalLines: lines.length,
      uniqueLines: result.length,
      duplicatesRemoved: lines.length - result.length,
    });
  }, [input, caseSensitive, trimWhitespace, removeEmptyLines]);

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
    a.download = "unique-lines.txt";
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
        setOutput("");
        setStats(null);
      }
    };
    reader.readAsText(file);
    /* reset so the same file can be re-uploaded */
    e.target.value = "";
  };

  /* ─── Data ─── */

  const features = [
    {
      icon: Zap,
      title: "Instant Deduplication",
      description:
        "Remove thousands of duplicate lines in milliseconds. No waiting, no server uploads — everything runs instantly in your browser with zero latency.",
    },
    {
      icon: Shield,
      title: "100% Private & Secure",
      description:
        "Your text never leaves your device. All processing happens locally in your browser. No data is stored, sent to servers, or tracked in any way.",
    },
    {
      icon: Globe,
      title: "Works on Any Device",
      description:
        "Use this tool on desktop, tablet, or mobile. Compatible with Chrome, Firefox, Safari, Edge, and all modern browsers — no installation needed.",
    },
    {
      icon: FileText,
      title: "File Upload Support",
      description:
        "Upload .txt files directly and process them instantly. Download your deduplicated output as a clean file when you are done.",
    },
    {
      icon: Code2,
      title: "Smart Comparison",
      description:
        "Choose case-sensitive or case-insensitive matching, trim leading and trailing whitespace, and optionally strip empty lines for maximum flexibility.",
    },
    {
      icon: Clock,
      title: "No Sign-Up Required",
      description:
        "Start using the tool immediately. No login, no account creation, no email required. Free forever — just paste your text and get results.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Paste or Upload Your Text",
      description:
        'Enter your text in the input box above, with one item per line. You can also click "Upload .txt file" to load text from a file on your device.',
    },
    {
      step: 2,
      title: "Choose Your Options",
      description:
        "Select whether the comparison should be case-sensitive, whether to trim whitespace from each line, and whether to remove empty or blank lines from the result.",
    },
    {
      step: 3,
      title: 'Click "Remove Duplicates"',
      description:
        "Press the button to process your text. Duplicate lines are removed instantly, keeping only unique entries in their original order.",
    },
    {
      step: 4,
      title: "Copy or Download the Result",
      description:
        'Your deduplicated text appears in the Output box. Click "Copy" to copy it to your clipboard or "Download" to save it as a .txt file.',
    },
  ];

  const useCases = [
    {
      icon: Database,
      title: "Clean Database Exports",
      description:
        "Remove repeated rows from database dumps or CSV exports. Get a clean, unique dataset ready for import or analysis.",
      before: "John Doe, Toronto\nJane Smith, Vancouver\nJohn Doe, Toronto\nMark Lee, Calgary\nJane Smith, Vancouver",
      after: "John Doe, Toronto\nJane Smith, Vancouver\nMark Lee, Calgary",
    },
    {
      icon: Mail,
      title: "Deduplicate Email Lists",
      description:
        "Clean up email lists before sending campaigns. Remove duplicate addresses so each recipient gets exactly one message.",
      before: "alice@example.com\nbob@example.com\nalice@example.com\ncharlie@example.com\nbob@example.com",
      after: "alice@example.com\nbob@example.com\ncharlie@example.com",
    },
    {
      icon: Code2,
      title: "Remove Duplicate Imports",
      description:
        "Clean up source code files by removing repeated import statements that accumulate during development and copy-pasting.",
      before: "import React from 'react';\nimport axios from 'axios';\nimport React from 'react';\nimport lodash from 'lodash';\nimport axios from 'axios';",
      after: "import React from 'react';\nimport axios from 'axios';\nimport lodash from 'lodash';",
    },
    {
      icon: List,
      title: "Clean Survey Responses",
      description:
        "Consolidate survey or form responses by removing repeated answers to get a clean list of unique entries.",
      before: "Very Satisfied\nSatisfied\nVery Satisfied\nNeutral\nSatisfied\nVery Satisfied",
      after: "Very Satisfied\nSatisfied\nNeutral",
    },
    {
      icon: FileText,
      title: "Deduplicate Log Files",
      description:
        "Strip repeated log entries from server or application logs to focus on unique events and simplify debugging.",
      before: "[INFO] Server started on port 3000\n[WARN] Disk usage 85%\n[INFO] Server started on port 3000\n[ERROR] Connection timeout\n[WARN] Disk usage 85%",
      after: "[INFO] Server started on port 3000\n[WARN] Disk usage 85%\n[ERROR] Connection timeout",
    },
  ];

  const faqs = [
    {
      question: "What does the duplicate line remover do?",
      answer:
        "The duplicate line remover scans your text line by line and keeps only the first occurrence of each unique line. All subsequent duplicates are removed, leaving you with a clean list of unique entries. The original order of first appearances is always preserved, so your data stays organized exactly the way you intended.",
    },
    {
      question: "How do I remove duplicate lines from my text?",
      answer:
        'Simply paste your text into the input box with each item on a separate line. Choose your preferred options — case sensitivity, whitespace trimming, and empty line removal — then click "Remove Duplicates". The deduplicated text appears instantly in the output box, ready to copy or download as a .txt file.',
    },
    {
      question: "Does this tool preserve the original order?",
      answer:
        "Yes, absolutely. The tool preserves the order of first appearances. When a duplicate line is encountered, only the first occurrence is kept in its original position while all later duplicates are removed. This means your data stays in the same sequence — only the repeats are stripped out.",
    },
    {
      question: "Is the comparison case-sensitive?",
      answer:
        "By default, yes — \"Apple\" and \"apple\" are treated as different lines. However, you can toggle case sensitivity off by unchecking the \"Case sensitive\" option. When case-insensitive mode is enabled, lines that differ only in letter casing are treated as duplicates and only the first occurrence is kept.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Yes, this duplicate line remover is completely free with no limitations whatsoever. There are no hidden charges, no premium tiers, and no sign-up required. You can process unlimited lines of text as many times as you need. CoderDesign provides this tool as a free resource for the developer and data community.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "Absolutely. All text processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this yourself by using the tool with your browser in offline mode after the page has loaded.",
    },
    {
      question: "Can I also remove empty or blank lines?",
      answer:
        "Yes. Simply enable the \"Remove empty lines\" checkbox and the tool will strip all blank lines from the output in addition to removing duplicates. This is especially useful for cleaning up text files that have extra line breaks, or when you want a compact list with no gaps between entries.",
    },
    {
      question: "How many lines can this tool handle?",
      answer:
        "There is no hard limit on the number of lines you can process. Because everything runs locally in your browser, performance depends on your device. Documents with 10,000+ lines typically process in well under a second on modern devices. For extremely large files (100,000+ lines), performance remains excellent on desktop browsers.",
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
            <span className="text-white">Duplicate Line Remover</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Eraser className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-4xl">
              Duplicate Line Remover
            </h1>
          </div>

          <p className="max-w-2xl text-white/90 leading-relaxed">
            Remove duplicate lines from any text instantly. Keep only unique
            entries while preserving the original order — perfect for cleaning
            lists, database exports, email addresses, and log files. Free,
            private, no login.
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
              placeholder={
                "apple\nbanana\napple\ncherry\nbanana\ndate\napple\ndate"
              }
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors font-mono"
            />
          </div>

          {/* Options */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Options
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Case sensitive
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={trimWhitespace}
                  onChange={(e) => setTrimWhitespace(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Trim whitespace
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={removeEmptyLines}
                  onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Remove empty lines
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={processText}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700"
            >
              <Eraser className="h-4 w-4 flex-shrink-0" />
              <span>Remove Duplicates</span>
            </button>
            <button
              onClick={() => {
                setInput("");
                setOutput("");
                setStats(null);
              }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" />
              <span>Clear</span>
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-slate-700">
                Total: <strong>{stats.totalLines}</strong>
              </span>
              <span className="inline-flex items-center gap-1">
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </span>
              <span className="rounded-lg bg-green-50 px-3 py-1.5 text-green-700">
                Unique: <strong>{stats.uniqueLines}</strong>
              </span>
              <span className="rounded-lg bg-red-50 px-3 py-1.5 text-red-700">
                Duplicates removed: <strong>{stats.duplicatesRemoved}</strong>
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
                placeholder="Unique lines will appear here..."
                rows={8}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono"
              />
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-700"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download .txt
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
              How to Remove Duplicate Lines from Text
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to deduplicate your text. It takes just
              seconds — no technical knowledge required.
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
              Why Use Our Free Duplicate Line Remover?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and reliable deduplication tool built by
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
              See how developers, marketers, and data analysts use the duplicate
              line remover to save hours of manual editing.
            </p>
          </div>

          <div className="space-y-8">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Card Header */}
                  <div className="flex items-start gap-4 border-b border-slate-100 px-6 py-4 sm:px-7 sm:py-5">
                    <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-slate-900">
                        {useCase.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {useCase.description.split(".")[0]}.
                      </p>
                    </div>
                  </div>
                  {/* Card Body — Before / After */}
                  <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Before
                      </p>
                      <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-700 font-mono p-3 bg-white rounded-lg">
                        {useCase.before
                          .split("\n")
                          .slice(0, 4)
                          .join("\n")}
                      </pre>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                        After
                      </p>
                      <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-emerald-800 font-mono p-3 bg-emerald-100 rounded-lg">
                        {useCase.after
                          .split("\n")
                          .slice(0, 4)
                          .join("\n")}
                      </pre>
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
              Everything you need to know about removing duplicate lines from
              text. Can&apos;t find what you&apos;re looking for?{" "}
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
      <RelatedTools currentSlug="duplicate-eraser" />

      {/* ── 8. CTA ── */}
      <ToolCta theme="blue" />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
