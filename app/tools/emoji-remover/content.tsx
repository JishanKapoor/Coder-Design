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
  SmilePlus,
  ArrowRight,
  Database,
  Mail,
  BarChart3,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

export default function EmojiRemoverTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [removeTextEmoticons, setRemoveTextEmoticons] = useState(false);
  const [emojiCount, setEmojiCount] = useState(0);

  /* ─── Core Logic ─── */
  const removeEmojis = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setEmojiCount(0);
      return;
    }

    /* Comprehensive emoji regex covering all major Unicode emoji ranges */
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{231A}-\u{231B}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{E0020}-\u{E007F}\u{FE0F}]/gu;

    const emojiMatches = input.match(emojiRegex);
    let cleaned = input.replace(emojiRegex, "");
    let count = emojiMatches ? emojiMatches.length : 0;

    /* Optional: remove text emoticons */
    if (removeTextEmoticons) {
      const emoticonRegex =
        /(?<!\w)(?:[:;8xXB=][-'^]?[)(\][\\/|DdPpOo0*@#$3><}{]|[)(\\/|DdPp><][-'^]?[:;8xXB=]|<3|<\/3|\bXD\b|\bxD\b)(?!\w)/g;
      const emoticonMatches = cleaned.match(emoticonRegex);
      if (emoticonMatches) count += emoticonMatches.length;
      cleaned = cleaned.replace(emoticonRegex, "");
    }

    /* Collapse multiple spaces into one, but preserve newlines */
    cleaned = cleaned.replace(/[^\S\n]{2,}/g, " ");
    setEmojiCount(count);
    setOutput(cleaned);
  }, [input, removeTextEmoticons]);

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
    a.download = "no-emojis.txt";
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
        setEmojiCount(0);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setEmojiCount(0);
  };

  /* ─── Data ─── */

  const features = [
    {
      icon: Zap,
      title: "Instant Emoji Stripping",
      description:
        "Clean thousands of emojis in milliseconds. The tool uses an optimized comprehensive regex to strip every emoji character instantly — paste, click, and get clean text with zero waiting.",
    },
    {
      icon: Shield,
      title: "100% Private & Secure",
      description:
        "All processing happens locally in your browser using JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party. Complete privacy guaranteed.",
    },
    {
      icon: SmilePlus,
      title: "Comprehensive Detection",
      description:
        "Catches all Unicode emoji types including smiley faces, flags, skin-tone modifiers, gender variants, zero-width joiner sequences (family & profession emojis), regional indicators, and variation selectors.",
    },
    {
      icon: FileText,
      title: "File Upload Support",
      description:
        "Upload .txt files directly to clean their contents. The file is read locally in your browser and never uploaded to any server — perfect for processing large text files or exported chat logs quickly.",
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
        "Start removing emojis immediately. No login, no account creation, no email address required. Free forever with unlimited usage — just paste your text and get clean results instantly.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Paste or Upload Your Text",
      description:
        "Enter your text in the input area by pasting from social media, chat apps, email, or any source containing emojis. You can also upload a .txt file directly.",
    },
    {
      step: 2,
      title: "Choose Options",
      description:
        "Optionally enable the \"Also remove text emoticons\" checkbox to strip text-based emoticons like :) ;-P :D and XD in addition to Unicode emojis.",
    },
    {
      step: 3,
      title: "Click Remove Emojis",
      description:
        "Press the \"Remove Emojis\" button to process your text. All emoji characters — and optionally text emoticons — will be instantly stripped from the text.",
    },
    {
      step: 4,
      title: "Copy or Download Clean Text",
      description:
        "Use the Copy button to copy the cleaned text to your clipboard, or click Download to save it as a .txt file. A stats badge shows exactly how many emojis were removed.",
    },
  ];

  const useCases = [
    {
      icon: Database,
      title: "Clean Social Media Data",
      before: "Had a great day! \u{1F389}\u{1F60A} Loved the food \u{1F355}",
      after: "Had a great day! Loved the food",
      description:
        "Strip emojis from social media exports, scraped tweets, and user-generated content. Clean datasets for analytics, reporting, or database storage without emoji-related encoding issues.",
    },
    {
      icon: Code2,
      title: "Process User Input",
      before: "My username is coolDev\u{1F680}\u{1F4BB}",
      after: "My username is coolDev",
      description:
        "Remove emojis from user-submitted form data, usernames, comments, and search queries. Sanitize input before processing, validating, or storing it in your application's database.",
    },
    {
      icon: Mail,
      title: "Professional Email Cleanup",
      before: "Thanks for the meeting today! \u{1F64F}\u{2728} Let\u2019s sync next week \u{1F4C5}",
      after: "Thanks for the meeting today! Let\u2019s sync next week",
      description:
        "Clean up email drafts that picked up emojis from chat or mobile typing. Ensure professional, clean communication without stray emojis in business correspondence.",
    },
    {
      icon: FileText,
      title: "Clean Text for NLP",
      before: "This product is amazing \u{1F60D}\u{1F60D}\u{1F60D} best purchase ever \u{1F44D}",
      after: "This product is amazing best purchase ever",
      description:
        "Prepare text corpora for natural language processing, sentiment analysis, and machine learning models. Remove emoji noise to improve tokenization and model accuracy.",
    },
    {
      icon: BarChart3,
      title: "Data Analysis Prep",
      before: "Survey response: Great service! \u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50} Would recommend \u{1F44D}",
      after: "Survey response: Great service! Would recommend",
      description:
        "Clean survey responses, customer feedback, and review data by stripping emojis. Prepare analyzable text for word-frequency analysis, topic modeling, and BI dashboards.",
    },
  ];

  const faqs = [
    {
      question: "What types of emojis does this tool remove?",
      answer:
        "This tool removes all standard Unicode emojis including smiley faces and people, hand gestures, animals and nature, food and drink, travel and places, activities, objects, flags, weather symbols, hearts, stars, and every other emoji category in the Unicode Standard. It also removes skin-tone modifiers, gender variants, zero-width joiner sequences (family emojis, profession emojis), regional indicator flags, variation selectors, and keycap sequences.",
    },
    {
      question: "How do I remove emojis from text?",
      answer:
        "Simply paste your text into the input area, optionally check the box to also remove text emoticons like :) and ;-P, then click \"Remove Emojis.\" The tool will instantly strip all emoji characters and display the clean text in the output area, ready to copy to your clipboard or download as a .txt file. There is no character limit — process as much text as you need.",
    },
    {
      question: "Does it remove emoticons like :) and :-P too?",
      answer:
        "By default, the tool only removes Unicode emojis (the colorful graphical characters). However, you can enable the \"Also remove text emoticons\" option to strip common text-based emoticons like :) :-) :( ;) :P :D XD :-/ :O B-) 8) and more. This is optional because many users want to keep text emoticons while only removing Unicode emojis — the two are quite different.",
    },
    {
      question: "Will it remove non-emoji Unicode symbols?",
      answer:
        "No. The tool specifically targets emoji Unicode ranges and leaves standard text characters, accented letters (é, ñ, ü), CJK characters (Chinese, Japanese, Korean), mathematical symbols, currency signs, and other non-emoji Unicode intact. It is designed to be surgically precise — removing only emojis without damaging the rest of your text content.",
    },
    {
      question: "Is this emoji remover free?",
      answer:
        "Yes, the Emoji Remover is completely free with no limitations whatsoever. There are no hidden charges, no premium tiers, and no sign-up required. You can clean unlimited text as many times as you need. CoderDesign provides this tool as a free resource for developers, writers, data analysts, marketers, and anyone who needs to strip emojis from text.",
    },
    {
      question: "Is my text private and secure?",
      answer:
        "Absolutely. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your text is never stored in any database, logged, or shared with any third party. You can verify this yourself by disconnecting from the internet and using the tool offline after the page has loaded. We do not use analytics or tracking on your text content.",
    },
    {
      question: "Why would I need to remove emojis from text?",
      answer:
        "Common reasons include: cleaning social media data for NLP and sentiment analysis, preparing text for databases that don't support emoji encoding (especially older MySQL with utf8 instead of utf8mb4), creating professional email or document content, sanitizing user input in web applications, cleaning text for print materials, removing emojis from CSV or Excel exports, and ensuring compatibility with legacy systems that cannot render emojis properly.",
    },
    {
      question: "Does it work with text from social media?",
      answer:
        "Yes. The tool works perfectly with text copied from Twitter/X, Instagram, Facebook, WhatsApp, Discord, Telegram, TikTok, LinkedIn, Reddit, and any other social media platform. Simply copy the text containing emojis, paste it into the input area, and click Remove Emojis to get clean text instantly. It handles all emoji variations used across different platforms.",
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
            <span className="text-white">Emoji Remover</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <SmilePlus className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-4xl">
              Free Emoji Remover – Strip Emojis &amp; Emoticons from Text
              Online
            </h1>
          </div>

          <p className="max-w-2xl text-white/90 leading-relaxed">
            Instantly remove all emojis, emoticons, and special Unicode symbols
            from any text. Perfect for cleaning social media posts, chat exports,
            user-generated content, and data for processing. Free, private, no
            login required.
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
              placeholder={"Had a great day! \u{1F389}\u{1F60A} Loved the food \u{1F355}\u{1F354} See you soon \u{1F44B}\u{2764}\u{FE0F}"}
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>

          {/* Options Box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Options
            </h3>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={removeTextEmoticons}
                onChange={(e) => setRemoveTextEmoticons(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Also remove text emoticons (<span className="font-mono">:) ;-P :D XD</span> etc.)
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={removeEmojis}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700"
            >
              <SmilePlus className="h-4 w-4 flex-shrink-0" />
              <span>Remove Emojis</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" />
              <span>Clear</span>
            </button>
          </div>

          {/* Stats Badge */}
          {emojiCount > 0 && (
            <div className="text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 border border-red-100 px-3 py-1.5 text-red-700">
                <SmilePlus className="h-3.5 w-3.5" />
                <strong>{emojiCount}</strong> emoji{emojiCount !== 1 ? "s" : ""}{" "}
                found and removed
              </span>
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
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400"
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
              How to Remove Emojis from Text
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to strip unwanted emojis and emoticons
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
              Why Use Our Free Emoji Remover?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and comprehensive emoji stripping tool built by
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
              See how developers, data scientists, marketers, and writers use the
              Emoji Remover to clean text for real-world workflows.
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
              Everything you need to know about removing emojis and emoticons
              from text. Can&apos;t find what you&apos;re looking for?{" "}
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
      <RelatedTools currentSlug="emoji-remover" />

      {/* ── 8. CTA ── */}
      <ToolCta theme="blue" />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
