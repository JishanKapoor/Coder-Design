"use client";
import { useState, useRef } from "react";
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
  List,
  ArrowRight,
  Database,
  Mail,
  Layers,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

export default function CommaToColumnTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [separator, setSeparator] = useState(",");
  const [trimSpaces, setTrimSpaces] = useState(true);
  const [removeBlanks, setRemoveBlanks] = useState(true);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    let items = input.split(separator);
    if (trimSpaces) items = items.map((item) => item.trim());
    if (removeBlanks) items = items.filter((item) => item !== "");
    setOutput(items.join("\n"));
  };

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
    a.download = "column-list.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setSeparator(",");
    setTrimSpaces(true);
    setRemoveBlanks(true);
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Conversion",
      description:
        "Transforms your comma-separated text into a column list client-side in milliseconds. No waiting, no server round-trips — results appear the moment you click Convert.",
    },
    {
      icon: Shield,
      title: "100% Private & Secure",
      description:
        "All processing happens entirely in your browser. Your text is never sent to any server, stored in any database, or shared with any third party. Close the tab and it is gone.",
    },
    {
      icon: Globe,
      title: "Works on Any Device",
      description:
        "Fully responsive design that works on desktops, tablets, and smartphones. Compatible with Chrome, Firefox, Safari, Edge, and all modern browsers — no installation needed.",
    },
    {
      icon: FileText,
      title: "File Upload Support",
      description:
        "Upload .txt files directly from your device and convert them instantly. Download the formatted column output as a new text file when you are done.",
    },
    {
      icon: Code2,
      title: "Custom Separators",
      description:
        "Not just commas — split on semicolons, pipes, tabs, colons, or any custom character. One field, infinite flexibility for any delimited data format.",
    },
    {
      icon: Clock,
      title: "No Sign-Up Required",
      description:
        "Start converting immediately. No login, no account creation, no email required. Completely free with unlimited usage — just paste and go.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Paste or Upload Your List",
      description:
        'Enter your comma-separated text into the input box, or click "Upload .txt file" to load a text file from your device. Any delimited text will work.',
    },
    {
      step: 2,
      title: "Choose Your Separator",
      description:
        "Select or type the delimiter that separates your items. The default is a comma, but you can use semicolons, pipes, tabs, or any custom character.",
    },
    {
      step: 3,
      title: "Click Convert",
      description:
        'Press the "Convert to Column" button to split your list into individual lines. Each item appears on its own row instantly.',
    },
    {
      step: 4,
      title: "Copy or Download",
      description:
        'Click "Copy" to copy the column list to your clipboard, or click "Download" to save the result as a .txt file ready for use anywhere.',
    },
  ];

  const useCases = [
    {
      icon: Database,
      title: "Reformat CSV Data",
      description:
        "Turn inline CSV city lists, product names, or database records into a clean vertical column for spreadsheets and SQL imports.",
      separator: ",",
      before: "Toronto, Vancouver, Montreal, Calgary",
      after: "Toronto\nVancouver\nMontreal\nCalgary",
    },
    {
      icon: Mail,
      title: "Clean Email Lists",
      description:
        "Split comma-separated email addresses into individual lines for CRM imports, mailing lists, and contact management tools.",
      separator: ",",
      before: "alice@email.com, bob@email.com, carol@email.com",
      after: "alice@email.com\nbob@email.com\ncarol@email.com",
    },
    {
      icon: Code2,
      title: "Split Programming Arrays",
      description:
        "Break apart inline arrays, enums, or variable lists from code into one item per line for easier editing and review.",
      separator: ",",
      before: "['React', 'Vue', 'Angular', 'Svelte']",
      after: "['React'\n'Vue'\n'Angular'\n'Svelte']",
    },
    {
      icon: List,
      title: "Convert Pipe-Separated Data",
      description:
        "Split pipe-delimited data from log files, CLI output, or data exports into clean rows using a custom pipe separator.",
      separator: "|",
      before: "Red|Green|Blue|Yellow",
      after: "Red\nGreen\nBlue\nYellow",
    },
    {
      icon: FileText,
      title: "Process Tab-Separated Values",
      description:
        "Convert tab-delimited exports from spreadsheets or databases into a single column list by setting the separator to a tab character.",
      separator: "\\t",
      before: "Item1\tItem2\tItem3\tItem4",
      after: "Item1\nItem2\nItem3\nItem4",
    },
  ];

  const faqs = [
    {
      question: "What does a comma to column converter do?",
      answer:
        'A comma to column converter takes a comma-separated list of values and splits each item onto its own line. Instead of a single line like "Toronto, Vancouver, Montreal", you get a clean column with one city per row. It is the fastest way to reformat CSV data, email lists, or any delimited text into a vertical list for spreadsheets, databases, or further processing.',
    },
    {
      question:
        "How do I convert a comma-separated list to individual lines?",
      answer:
        'Paste your comma-separated text into the input box, make sure the separator is set to a comma (the default), then click "Convert to Column". Each item will appear on its own line in the output box. You can then copy the result to your clipboard with one click or download it as a .txt file for use in other applications.',
    },
    {
      question: "Can I use separators other than commas?",
      answer:
        "Yes. You can change the separator to any character you like — semicolons, pipes (|), tabs, colons, dashes, or any custom string. Simply type your desired separator into the Separator field before clicking Convert. This makes the tool work with virtually any delimited text format you encounter.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Yes, this comma to column converter is 100% free with no limitations whatsoever. There are no hidden charges, no premium tiers, and no sign-up required. You can process unlimited amounts of text as many times as you need without ever creating an account or providing personal information.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "Absolutely. All text processing happens entirely in your browser using client-side JavaScript. Your data is never transmitted to any server, stored in any database, or shared with any third party. When you close the page, all data is gone — your privacy is fully protected at all times.",
    },
    {
      question: "Does it trim whitespace from each item?",
      answer:
        'Yes, by default the tool trims leading and trailing whitespace from each item after splitting. This means "apple, banana, cherry" will produce clean lines without extra spaces. You can disable this behaviour by unchecking the "Trim whitespace" option if you need to preserve original spacing in your data.',
    },
    {
      question: "Can I convert the output back to comma-separated?",
      answer:
        "Yes! CoderDesign offers a companion Column to Comma tool that does the reverse — it takes a list of items (one per line) and joins them back into a single comma-separated string. Together, the two tools give you complete control over converting between horizontal and vertical list formats.",
    },
    {
      question: "What file formats can I process?",
      answer:
        'You can upload plain .txt files directly using the "Upload .txt file" button. The tool also accepts pasted text from any source — spreadsheets, code editors, emails, or web pages. After processing, you can download the column output as a .txt file ready for use in any application.',
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
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1.5 text-sm text-white/70"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">
              Free Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Comma to Column Converter</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <List className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white lg:text-4xl">
                Free Comma to Column Converter – Convert CSV Lists to Rows
                Online
              </h1>
            </div>
          </div>
          <p className="max-w-2xl text-lg text-white/90 leading-relaxed">
            Convert comma-separated lists to column format instantly. Split any
            delimited text into one item per line — perfect for reformatting CSV
            data, cleaning email lists, and processing code arrays. Supports
            custom separators. Free, private, and no sign-up required.
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
              Any Device
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              No Sign-Up Needed
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
              <label className="mb-2 block text-sm font-semibold text-slate-900">
                Input Text{" "}
                <span className="font-normal text-slate-500">
                  (comma-separated or delimited list)
                </span>
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  "Paste your comma-separated list here...\n\nExample:\napple, banana, cherry, date, elderberry, fig, grape"
                }
                rows={8}
                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors font-mono"
              />
              <div className="mt-2 flex items-center gap-3">
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
                    {input.length} characters
                  </span>
                )}
              </div>
            </div>

            {/* Separator + Options */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Separator
                  </label>
                  <input
                    type="text"
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    className="w-20 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700 mt-4">
                  <input
                    type="checkbox"
                    checked={trimSpaces}
                    onChange={(e) => setTrimSpaces(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Trim whitespace
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700 mt-4">
                  <input
                    type="checkbox"
                    checked={removeBlanks}
                    onChange={(e) => setRemoveBlanks(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Remove empty items
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={convert}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <List className="h-4 w-4 flex-shrink-0" />
                <span>Convert to Column</span>
              </button>
              <button
                onClick={handleClear}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
              >
                <Trash2 className="h-4 w-4 flex-shrink-0" />
                <span>Clear</span>
              </button>
            </div>

            {/* Output */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-900">
                  Output
                </label>
                {output && (
                  <span className="text-xs text-slate-400">
                    {output.split("\n").filter((l) => l.trim()).length} lines
                  </span>
                )}
              </div>
                <textarea
                  value={output}
                  readOnly
                  placeholder="Your column list will appear here after clicking 'Convert to Column'..."
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
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Convert Comma-Separated Text to Columns
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to split delimited text into a clean
              column list. It takes just seconds — no technical knowledge
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

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Why Use Our Free Comma to Column Converter?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and reliable text conversion tool built by
              professional developers at CoderDesign Toronto. Here is what makes
              it stand out.
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
              See how developers, data analysts, and marketers save hours of manual editing.
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
                        {useCase.before}
                      </pre>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Settings
                      </p>
                      <div className="space-y-2 text-sm text-slate-700">
                        <p>
                          Separator{" "}
                          <code className="ml-1 rounded bg-blue-50 px-2 py-0.5 text-blue-700">
                            {useCase.separator}
                          </code>
                        </p>
                        <p className="text-slate-400">Trim whitespace ✓</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                        Output
                      </p>
                      <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-emerald-800 font-mono p-3 bg-emerald-100 rounded-lg">
                        {useCase.after}
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
              Everything you need to know about converting comma-separated text
              to columns. Can&apos;t find what you&apos;re looking for?{" "}
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

      <RelatedTools currentSlug="comma-to-column" />

      <ToolCta theme="blue" />

      <FooterSection />
    </div>
  );
}
