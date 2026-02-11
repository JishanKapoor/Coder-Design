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
  Type,
  Download,
  Zap,
  Shield,
  Globe,
  Code2,
  FileText,
  Mail,
  Database,
  ListOrdered,
  Layers,
  Clock,
  ArrowRight,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

export default function PrefixSuffixTool() {
  const [input, setInput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [spaceAfterPrefix, setSpaceAfterPrefix] = useState(false);
  const [spaceBeforeSuffix, setSpaceBeforeSuffix] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processText = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setLineCount(0);
      return;
    }

    const lines = input.split("\n");
    const processed = lines.map((line) => {
      if (line.trim() === "") return line;
      const p = prefix + (spaceAfterPrefix && prefix ? " " : "");
      const s = (spaceBeforeSuffix && suffix ? " " : "") + suffix;
      return p + line + s;
    });

    setOutput(processed.join("\n"));
    setLineCount(lines.filter((l) => l.trim() !== "").length);
  }, [input, prefix, suffix, spaceAfterPrefix, spaceBeforeSuffix]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInput(text);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prefixed-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setPrefix("");
    setSuffix("");
    setOutput("");
    setLineCount(0);
    setSpaceAfterPrefix(false);
    setSpaceBeforeSuffix(false);
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Processing",
      description:
        "Add prefixes and suffixes to thousands of lines in a single click. No waiting, no server uploads — everything runs instantly in your browser.",
    },
    {
      icon: Shield,
      title: "100% Private & Secure",
      description:
        "Your text never leaves your device. All processing happens locally in your browser. No data is stored, sent to servers, or tracked.",
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
        "Upload .txt files directly and process them instantly. Download your formatted output as a file when you are done.",
    },
    {
      icon: Code2,
      title: "Built for Developers",
      description:
        "Perfect for wrapping lines in HTML tags, generating SQL values, formatting CSV data, and creating Markdown lists. A developer's everyday tool.",
    },
    {
      icon: Clock,
      title: "No Sign-Up Required",
      description:
        "Start using the tool immediately. No login, no account creation, no email required. Just paste your text and get results.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Paste or Upload Your Text",
      description:
        'Enter your text in the input box above, with each item on a separate line. You can also click "Upload .txt file" to load text from a file.',
    },
    {
      step: 2,
      title: "Enter Your Prefix and Suffix",
      description:
        "Type the text you want to add before each line in the Prefix field, and the text to add after each line in the Suffix field. Use the checkboxes to add optional spaces.",
    },
    {
      step: 3,
      title: "Click \"Add Prefix / Suffix\"",
      description:
        "Press the button to process your text. Every non-empty line will be wrapped with your prefix and suffix instantly.",
    },
    {
      step: 4,
      title: "Copy or Download the Result",
      description:
        'Your formatted text appears in the Output box. Click "Copy" to copy it to your clipboard or "Download" to save it as a .txt file.',
    },
  ];

  const useCases = [
    {
      icon: Mail,
      title: "Generate Email Addresses",
      description:
        "Turn a list of usernames into email addresses by adding a prefix like \"info+\" and a suffix like \"@yourcompany.com\". Great for bulk email campaigns and testing.",
      prefix: "info+",
      suffix: "@company.com",
      before: "john.doe\nemma.watson\nmark.smith",
      after: "info+john.doe@company.com\ninfo+emma.watson@company.com\ninfo+mark.smith@company.com",
    },
    {
      icon: Code2,
      title: "Wrap Lines in HTML Tags",
      description:
        "Convert a plain text list into HTML list items, table cells, paragraph tags, or any other HTML element by adding opening and closing tags.",
      prefix: "<li>",
      suffix: "</li>",
      before: "Home\nAbout\nServices\nContact",
      after: "<li>Home</li>\n<li>About</li>\n<li>Services</li>\n<li>Contact</li>",
    },
    {
      icon: Database,
      title: "Create SQL INSERT Values",
      description:
        "Format data for SQL queries by wrapping each value in quotes and adding commas. Saves hours of manual formatting for database operations.",
      prefix: "('",
      suffix: "'),",
      before: "Toronto\nVancouver\nMontreal\nCalgary",
      after: "('Toronto'),\n('Vancouver'),\n('Montreal'),\n('Calgary'),",
    },
    {
      icon: ListOrdered,
      title: "Add Markdown Checklists",
      description:
        "Turn any list into a Markdown checklist, bullet list, or numbered list by adding the appropriate prefix. Perfect for creating task lists in GitHub, Notion, or Jira.",
      prefix: "- [ ] ",
      suffix: "",
      before: "Review PR #42\nUpdate docs\nDeploy to staging\nRun tests",
      after: "- [ ] Review PR #42\n- [ ] Update docs\n- [ ] Deploy to staging\n- [ ] Run tests",
    },
    {
      icon: Globe,
      title: "Build URL Lists",
      description:
        "Add a base URL as a prefix to generate full URLs from a list of page slugs. Useful for creating sitemaps, redirect lists, or link inventories.",
      prefix: "https://coderdesign.com/blog/",
      suffix: "",
      before: "ai-seo-guide\nhow-to-build-mvp\nai-automation-roi",
      after: "https://coderdesign.com/blog/ai-seo-guide\nhttps://coderdesign.com/blog/how-to-build-mvp\nhttps://coderdesign.com/blog/ai-automation-roi",
    },
    {
      icon: Layers,
      title: "Format CSV Data",
      description:
        "Wrap values in quotes for CSV compatibility. Essential for importing data into Excel, Google Sheets, or database tools that require properly quoted fields.",
      prefix: '"',
      suffix: '",',
      before: "Product A\nProduct B\nProduct C",
      after: '"Product A",\n"Product B",\n"Product C",',
    },
  ];

  const faqs = [
    {
      question: "What is a prefix and suffix text adder?",
      answer:
        "A prefix and suffix text adder is an online tool that lets you add custom text before (prefix) and after (suffix) each line in a block of text. For example, if you have a list of names and want to turn them into email addresses, you can add a prefix like \"user+\" and a suffix like \"@gmail.com\" to each line in one click, instead of editing each line manually.",
    },
    {
      question: "How do I add a prefix or suffix to each line of text?",
      answer:
        "Simply paste your text into the input box with each item on a separate line. Type your desired prefix in the Prefix field and your suffix in the Suffix field. Then click the \"Add Prefix / Suffix\" button. Your formatted text will appear instantly in the Output box, ready to copy or download.",
    },
    {
      question: "Is this tool completely free to use?",
      answer:
        "Yes, this prefix and suffix adder is 100% free with no limitations. There are no hidden charges, no premium tiers, and no sign-up required. You can process unlimited lines of text as many times as you need.",
    },
    {
      question: "Is my text data safe and private?",
      answer:
        "Absolutely. All text processing happens entirely in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party. When you close the page, all data is gone. Your privacy is fully protected.",
    },
    {
      question: "Can I upload a file instead of pasting text?",
      answer:
        "Yes. Click the \"Upload .txt file\" button below the input box to load a text file from your device. The contents will be loaded into the input area automatically. After processing, you can download the result as a new .txt file.",
    },
    {
      question: "What are common use cases for adding prefix and suffix to text?",
      answer:
        "Common use cases include: generating email addresses from usernames, wrapping text lines in HTML tags (like <li> or <p>), creating SQL INSERT values with quotes and commas, building full URLs from page slugs, adding Markdown checkbox prefixes for task lists, formatting CSV data with proper quoting, and adding numbering or bullet points to lists.",
    },
    {
      question: "Can I add only a prefix or only a suffix?",
      answer:
        "Yes. You can leave either the Prefix or Suffix field empty. If you only enter a prefix, it will be added before each line with nothing added after. If you only enter a suffix, it will be added after each line with nothing added before. Both fields are optional.",
    },
    {
      question: "Does this tool work on mobile devices?",
      answer:
        "Yes, this tool is fully responsive and works on smartphones, tablets, laptops, and desktops. It is compatible with all modern browsers including Chrome, Safari, Firefox, and Edge on both iOS and Android.",
    },
    {
      question: "How many lines of text can I process at once?",
      answer:
        "There is no hard limit. Since processing happens locally in your browser, you can handle thousands of lines. Performance may vary depending on your device, but typical documents with 10,000+ lines process in under a second on most modern devices.",
    },
    {
      question: "What does the \"Add space after prefix\" option do?",
      answer:
        "When enabled, this option inserts a single space between the prefix and the original text on each line. For example, if your prefix is \">>\" and your text is \"Hello\", the output will be \">> Hello\" instead of \">>Hello\". This is useful when you want the prefix visually separated from the content.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">
              Free Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Add Prefix &amp; Suffix</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Type className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white lg:text-4xl">
                Add Prefix and Suffix to Each Line Online
              </h1>
            </div>
          </div>
          <p className="max-w-2xl text-lg text-white/90 leading-relaxed">
            Free online tool to add a custom prefix and suffix to every line of
            text instantly. Perfect for bulk text processing, wrapping lines in
            HTML tags, generating email addresses, formatting SQL values, and
            creating Markdown lists. No login required — 100% free and private.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              100% Private
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              Instant Results
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              Works on Any Device
            </span>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12">
          <div className="space-y-8">
            {/* Input */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-900">
                Input Text <span className="font-normal text-slate-500">(one item per line)</span>
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"Enter your text here, one word or sentence per line...\n\nExample:\njohn.doe\nemma.watson\nmark.smith"}
                rows={9}
                className="w-full rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors font-mono sm:text-sm"
              />
              <div className="mt-4 flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                  <Upload className="h-3.5 w-3.5" />
                  Upload .txt file
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {input && (
                  <span className="text-xs text-slate-400">
                    {input.split("\n").filter((l) => l.trim()).length} lines
                  </span>
                )}
              </div>
            </div>

            {/* Prefix / Suffix Inputs */}
            <div className="flex flex-col gap-9 sm:grid sm:grid-cols-2 sm:gap-6">
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-900">
                  Prefix <span className="font-normal text-slate-500">(added before each line)</span>
                </label>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder='e.g. <li> or "https://..."'
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-6 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors font-mono sm:text-sm"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-900">
                  Suffix <span className="font-normal text-slate-500">(added after each line)</span>
                </label>
                <input
                  type="text"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  placeholder='e.g. </li> or "@gmail.com"'
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-6 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors font-mono sm:text-sm"
                />
              </div>
            </div>

            {/* Options */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="mb-4 text-sm font-semibold text-slate-900">
                Options
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={spaceAfterPrefix}
                    onChange={(e) => setSpaceAfterPrefix(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Add space after prefix
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={spaceBeforeSuffix}
                    onChange={(e) => setSpaceBeforeSuffix(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Add space before suffix
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={processText}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 sm:w-auto"
              >
                <Type className="h-4 w-4 flex-shrink-0" />
                <span>Add Prefix / Suffix</span>
              </button>
              <button
                onClick={handleClear}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 sm:w-auto"
              >
                <Trash2 className="h-4 w-4 flex-shrink-0" />
                <span>Clear</span>
              </button>
            </div>

            {/* Output */}
            <div className="pt-2">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-900">
                  Output
                </label>
                {lineCount > 0 && (
                  <span className="text-xs text-slate-400">
                    {lineCount} lines processed
                  </span>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={output}
                  readOnly
                  placeholder="Your formatted result will appear here after clicking 'Add Prefix / Suffix'..."
                  rows={8}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-7 py-4 text-base leading-relaxed text-slate-900 placeholder:text-slate-400 font-mono sm:text-sm"
                />
              </div>
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-700"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download .txt
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Add Prefix and Suffix to Each Line
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to add text before and after each line.
              It takes just seconds — no technical knowledge required.
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

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Why Use Our Free Prefix &amp; Suffix Adder?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and reliable text tool built by professional
              developers at CoderDesign Toronto. Here is what makes it different.
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

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Common Use Cases
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">
              See how developers, marketers, and data analysts save hours of manual editing.
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
                  {/* Card Body — Before / Settings / After */}
                  <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-3 md:gap-7">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Input
                      </p>
                      <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-700 font-mono p-3 bg-white rounded-lg">
                        {useCase.before.split("\n").slice(0, 3).join("\n")}
                      </pre>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Settings
                      </p>
                      <div className="space-y-2 text-sm text-slate-700 break-all">
                        {useCase.prefix ? (
                          <p className="flex flex-wrap items-baseline gap-1">
                            <span>Prefix</span>
                            <code className="rounded bg-blue-50 px-2 py-0.5 text-blue-700 break-all">
                              {useCase.prefix}
                            </code>
                          </p>
                        ) : null}
                        {useCase.suffix ? (
                          <p className="flex flex-wrap items-baseline gap-1">
                            <span>Suffix</span>
                            <code className="rounded bg-blue-50 px-2 py-0.5 text-blue-700 break-all">
                              {useCase.suffix}
                            </code>
                          </p>
                        ) : (
                          <p className="italic text-slate-400">No suffix</p>
                        )}
                      </div>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                        Output
                      </p>
                      <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-emerald-800 font-mono p-3 bg-emerald-100 rounded-lg">
                        {useCase.after.split("\n").slice(0, 3).join("\n")}
                      </pre>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20" id="faq">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Everything you need to know about adding prefix and suffix to
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
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
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

      <RelatedTools currentSlug="add-prefix-suffix-lines" />

      <ToolCta theme="blue" />

      <FooterSection />
    </div>
  );
}
