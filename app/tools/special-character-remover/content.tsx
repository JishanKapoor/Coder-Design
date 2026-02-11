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
  Sparkles,
  ArrowRight,
  Database,
  Mail,
  Type,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

export default function SpecialCharRemoverTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ─── Options ─── */
  const [keepLetters, setKeepLetters] = useState(true);
  const [keepNumbers, setKeepNumbers] = useState(true);
  const [keepSpaces, setKeepSpaces] = useState(true);
  const [keepNewlines, setKeepNewlines] = useState(true);
  const [keepPeriods, setKeepPeriods] = useState(false);
  const [keepCommas, setKeepCommas] = useState(false);
  const [keepHyphens, setKeepHyphens] = useState(false);
  const [customKeep, setCustomKeep] = useState("");

  /* ─── Core Logic ─── */
  const removeSpecialChars = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let pattern = "";
    if (keepLetters) pattern += "a-zA-Z";
    if (keepNumbers) pattern += "0-9";
    if (keepSpaces) pattern += " ";
    if (keepNewlines) pattern += "\\n\\r";
    if (keepPeriods) pattern += ".";
    if (keepCommas) pattern += ",";
    if (keepHyphens) pattern += "\\-";

    /* Escape custom characters for use inside a character class */
    if (customKeep.trim()) {
      const escaped = customKeep
        .split("")
        .map((c) => c.replace(/[-\\^\]]/g, "\\$&"))
        .join("");
      pattern += escaped;
    }

    const regex = new RegExp(`[^${pattern}]`, "g");
    setOutput(input.replace(regex, ""));
  }, [
    input,
    keepLetters,
    keepNumbers,
    keepSpaces,
    keepNewlines,
    keepPeriods,
    keepCommas,
    keepHyphens,
    customKeep,
  ]);

  /* ─── Handlers ─── */
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
    a.download = "clean-text.txt";
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
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  /* ─── Data ─── */

  const features = [
    {
      icon: Zap,
      title: "Instant Text Cleaning",
      description:
        "Process text in milliseconds, no matter the length. The tool uses optimized regex patterns to strip unwanted characters instantly — paste, click, and get clean text with zero waiting.",
    },
    {
      icon: Shield,
      title: "100% Private & Secure",
      description:
        "All processing happens locally in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party. Complete privacy guaranteed.",
    },
    {
      icon: Sparkles,
      title: "Customizable Filters",
      description:
        "Choose exactly which character types to keep or remove. Toggle letters, numbers, spaces, newlines, periods, commas, hyphens, or enter any custom characters to preserve.",
    },
    {
      icon: FileText,
      title: "File Upload Support",
      description:
        "Upload .txt files directly to clean their contents. The file is read locally in your browser and never uploaded to any server — perfect for processing large text files quickly.",
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
        "Start cleaning text immediately. No login, no account creation, no email address required. Free forever with unlimited usage — just paste your text and get results instantly.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Paste or Upload Your Text",
      description:
        "Enter your text in the input area by typing directly, pasting from your clipboard, or uploading a .txt file. There is no character limit — process as much text as you need.",
    },
    {
      step: 2,
      title: "Choose What to Keep",
      description:
        "Select which character types to preserve using the checkboxes: letters, numbers, spaces, newlines, periods, commas, and hyphens. Enter any custom characters to keep in the text field.",
    },
    {
      step: 3,
      title: "Click Remove Special Characters",
      description:
        "Press the \"Remove Special Characters\" button to process your text. All characters not matching your selected keep filters will be instantly stripped from the text.",
    },
    {
      step: 4,
      title: "Copy or Download Clean Text",
      description:
        "Use the Copy button to copy the cleaned text to your clipboard, or click Download to save it as a .txt file. The before/after character count shows exactly how many characters were removed.",
    },
  ];

  const useCases = [
    {
      icon: Database,
      title: "Clean Data for Database Import",
      before: "John D'Souza, Sr. — $4,500 (est.)",
      after: "John DSouza Sr 4500 est",
      description:
        "Strip special characters from CSV data, user records, and product catalogs before importing into databases. Prevent SQL injection risks and ensure clean data entry across all your tables.",
    },
    {
      icon: Code2,
      title: "Sanitize User Input",
      before: "<script>alert('XSS')</script>",
      after: "scriptalertXSSscript",
      description:
        "Remove potentially dangerous characters from user-submitted text. Strip HTML tags, script injections, and special symbols to sanitize input before processing or storing it.",
    },
    {
      icon: FileText,
      title: "Clean Filenames",
      before: "My Document (Final v2) [2024].pdf",
      after: "My Document Final v2 2024pdf",
      description:
        "Remove characters that cause issues in filenames across different operating systems. Strip brackets, parentheses, and special symbols to create safe, cross-platform filenames.",
    },
    {
      icon: Mail,
      title: "Clean Pasted Content",
      before: "\u201CSmart quotes\u201D \u2014 em\u2013dashes & \u2026ellipsis",
      after: "Smart quotes emdashes ellipsis",
      description:
        "Remove curly quotes, em-dashes, smart apostrophes, and other formatting characters that appear when pasting from Word, Google Docs, or rich text editors into plain text fields.",
    },
    {
      icon: Globe,
      title: "Prepare Text for URLs",
      before: "My Blog Post: A Guide & Tips!",
      after: "My Blog Post A Guide Tips",
      description:
        "Strip special characters from titles and headings to create clean URL slugs. Remove colons, ampersands, exclamation marks, and other symbols that break or encode poorly in web addresses.",
    },
  ];

  const faqs = [
    {
      question: "What counts as a special character?",
      answer:
        "A special character is any character that is not a standard letter (a-z, A-Z) or digit (0-9). This includes punctuation marks like commas, periods, exclamation points, and question marks, as well as symbols such as @, #, $, %, ^, &, *, and brackets. Spaces and newlines are technically special characters too, but the tool lets you choose to keep them with dedicated checkboxes.",
    },
    {
      question: "How do I remove special characters from text?",
      answer:
        "Simply paste your text into the input area, select which character types you want to keep using the checkboxes (letters, numbers, spaces, etc.), and click \"Remove Special Characters.\" The tool will instantly strip all unwanted characters and display the clean text in the output area, ready to copy or download as a .txt file.",
    },
    {
      question: "Can I choose which characters to keep or remove?",
      answer:
        "Yes. The tool provides granular control through checkboxes for keeping letters, numbers, spaces, newlines, periods, commas, and hyphens. You can also enter any custom characters you want to preserve in the \"Custom characters to keep\" text field. This makes it easy to tailor the cleaning process to your exact requirements.",
    },
    {
      question: "Does it remove accented characters like é or ñ?",
      answer:
        "By default, accented characters like é, ñ, ü, and other non-ASCII letters are treated as special characters and will be removed. The \"Keep letters\" option preserves only standard ASCII letters (a-z, A-Z). If you need to keep specific accented characters, simply add them to the custom characters field and they will be preserved.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Yes, the Special Character Remover is completely free with no limitations whatsoever. There are no hidden charges, no premium tiers, and no sign-up required. You can clean unlimited text as many times as you need. CoderDesign provides this tool as a free resource for developers, writers, data analysts, and anyone who needs to sanitize text.",
    },
    {
      question: "Is my text data safe?",
      answer:
        "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this yourself by disconnecting from the internet and using the tool offline after the page has loaded.",
    },
    {
      question: "Can I keep numbers while removing symbols?",
      answer:
        "Yes. Simply check the \"Keep numbers\" checkbox and the tool will preserve all digits (0-9) while removing symbols, punctuation, and other special characters. You can combine this with other options — for example, keeping letters, numbers, and spaces while stripping everything else gives you clean alphanumeric text.",
    },
    {
      question: "Does it work with Unicode text?",
      answer:
        "Yes, the tool processes Unicode text correctly and can handle text in any language or script. However, by default only ASCII letters (a-z, A-Z) are considered \"letters\" for the keep filter. Non-ASCII characters like Chinese, Arabic, or Cyrillic text will be removed unless you add the specific characters you need to the custom characters field.",
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
            <span className="text-white">Special Character Remover</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-4xl">
              Free Special Character Remover – Strip Symbols &amp; Punctuation
              Instantly
            </h1>
          </div>

          <p className="max-w-2xl text-white/90 leading-relaxed">
            Remove special characters, symbols, and punctuation from any text
            with one click. Keep only the characters you need — letters, numbers,
            spaces, and more. Customizable filters give you full control over
            what stays and what goes. Free, private, no login required.
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
              placeholder="Paste your text here to remove special characters, symbols, and punctuation..."
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors font-mono"
            />
          </div>

          {/* Options Box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Characters to Keep
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={keepLetters}
                  onChange={(e) => setKeepLetters(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Keep letters
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={keepNumbers}
                  onChange={(e) => setKeepNumbers(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Keep numbers
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={keepSpaces}
                  onChange={(e) => setKeepSpaces(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Keep spaces
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={keepNewlines}
                  onChange={(e) => setKeepNewlines(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Keep newlines
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={keepPeriods}
                  onChange={(e) => setKeepPeriods(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Keep periods
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={keepCommas}
                  onChange={(e) => setKeepCommas(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Keep commas
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={keepHyphens}
                  onChange={(e) => setKeepHyphens(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Keep hyphens
              </label>
            </div>

            {/* Custom Characters */}
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Custom characters to keep
              </label>
              <input
                type="text"
                value={customKeep}
                onChange={(e) => setCustomKeep(e.target.value)}
                placeholder="e.g. @#_ (enter characters to preserve)"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={removeSpecialChars}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700"
            >
              <Sparkles className="h-4 w-4 flex-shrink-0" />
              <span>Remove Special Characters</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" />
              <span>Clear</span>
            </button>
          </div>

          {/* Before / After Character Count */}
          {output && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <div className="text-lg font-bold text-slate-700">
                  {input.length}
                </div>
                <div className="text-xs text-slate-500">
                  Characters Before
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <div className="text-lg font-bold text-blue-700">
                  {output.length}
                </div>
                <div className="text-xs text-slate-500">
                  Characters After
                </div>
              </div>
            </div>
          )}

          {/* Output Textarea */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Output
            </label>
              <textarea
                value={output}
                readOnly
                placeholder="Clean text will appear here after processing..."
                rows={8}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono"
              />
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
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
              How to Remove Special Characters from Text
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to strip unwanted symbols and punctuation
              from any text. It takes just seconds — no technical knowledge
              required.
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
              Why Use Our Free Special Character Remover?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and fully customizable text cleaning tool built by
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
              See how developers, writers, data analysts, and marketers use the
              Special Character Remover to clean text for real-world workflows.
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
                      <p className="mb-3 text-sm leading-relaxed text-slate-600">
                        {useCase.description}
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2">
                          <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-400">
                            Before
                          </div>
                          <div className="text-xs font-mono text-red-700 break-all">
                            {useCase.before}
                          </div>
                        </div>
                        <div className="rounded-lg border border-green-100 bg-green-50 px-3 py-2">
                          <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-400">
                            After
                          </div>
                          <div className="text-xs font-mono text-green-700 break-all">
                            {useCase.after}
                          </div>
                        </div>
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
              Everything you need to know about removing special characters from
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
      <RelatedTools currentSlug="special-character-remover" />

      {/* ── 8. CTA ── */}
      <ToolCta theme="blue" />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
