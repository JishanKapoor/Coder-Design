"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Trash2,
  Check,
  Download,
  Zap,
  Shield,
  Globe,
  Clock,
  Code2,
  FileText,
  Type,
  Mail,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

export default function AlternatingCaseTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [startUpper, setStartUpper] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    let idx = 0;
    const result = input
      .split("")
      .map((ch) => {
        if (/[a-zA-Z]/.test(ch)) {
          const upper = startUpper ? idx % 2 === 0 : idx % 2 !== 0;
          idx++;
          return upper ? ch.toUpperCase() : ch.toLowerCase();
        }
        return ch;
      })
      .join("");
    setOutput(result);
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
    a.download = "alternating-case.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStartUpper(false);
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Conversion",
      description:
        "Convert text to alternating case in real-time with a single click. Everything runs client-side in your browser — no server uploads, no waiting.",
    },
    {
      icon: Shield,
      title: "100% Private & Secure",
      description:
        "Your text never leaves your device. All alternating case conversion happens locally in your browser. No data is stored, sent to servers, or tracked.",
    },
    {
      icon: Globe,
      title: "Works on Any Device",
      description:
        "Use this alternating case converter on desktop, tablet, or mobile. Fully responsive and compatible with Chrome, Firefox, Safari, Edge, and all modern browsers.",
    },
    {
      icon: FileText,
      title: "No Sign-Up Required",
      description:
        "Start converting text immediately. No login, no account creation, no email required. Just paste your text and get aLtErNaTiNg CaSe results instantly.",
    },
    {
      icon: Code2,
      title: "Multiple Conversion Modes",
      description:
        "Choose whether to start with uppercase or lowercase. Non-alphabetical characters like numbers and symbols are preserved exactly, keeping the alternation pattern clean.",
    },
    {
      icon: Clock,
      title: "Unlimited Usage",
      description:
        "No limits, no rate caps, no daily quotas. Convert as much text as you want, as many times as you need. This alternating case generator is free forever.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Paste or Type Your Text",
      description:
        "Enter the text you want to convert in the input box above. You can paste sentences, paragraphs, or entire documents — there is no length limit.",
    },
    {
      step: 2,
      title: "Choose Starting Case",
      description:
        "By default the first letter is lowercase. Toggle the \"Start with uppercase\" option if you want the pattern to begin with a capital letter instead.",
    },
    {
      step: 3,
      title: "Click Convert",
      description:
        "Press the \"Convert to aLtErNaTiNg CaSe\" button. Your text is converted instantly right in your browser — no server round-trip needed.",
    },
    {
      step: 4,
      title: "Copy or Download",
      description:
        "Click \"Copy\" to copy the alternating case text to your clipboard, or \"Download\" to save it as a .txt file. Paste it anywhere you need.",
    },
  ];

  const useCases = [
    {
      icon: Mail,
      title: "SpongeBob Mocking Meme Text",
      description:
        "Create the iconic SpongeBob mocking meme text that conveys sarcasm and humor. The alternating capitalization is the hallmark of this internet-famous meme format.",
      before: "I don't need to study for the test",
      after: "i DoN't nEeD tO sTuDy FoR tHe TeSt",
    },
    {
      icon: Globe,
      title: "Social Media Posts",
      description:
        "Make your tweets, Instagram captions, and TikTok comments stand out from the crowd with eye-catching alternating case text that grabs attention in any feed.",
      before: "check out my new video",
      after: "cHeCk OuT mY nEw ViDeO",
    },
    {
      icon: Type,
      title: "Creative Typography",
      description:
        "Use alternating case for unique headings, poster titles, and graphic design text. The mixed capitalization creates a visually dynamic and playful typographic effect.",
      before: "Summer Sale Now On",
      after: "sUmMeR sAlE nOw On",
    },
    {
      icon: Code2,
      title: "Discord & Gaming Chat",
      description:
        "Stand out in Discord servers, Twitch chat, and gaming lobbies with alternating case messages. It is a quick way to add emphasis or personality to your messages.",
      before: "good game everyone",
      after: "gOoD gAmE eVeRyOnE",
    },
    {
      icon: FileText,
      title: "Sarcastic Responses",
      description:
        "Convey sarcasm effortlessly in text conversations. Alternating case is universally recognized online as a way to mock or sarcastically repeat what someone said.",
      before: "That was a really great idea",
      after: "tHaT wAs A rEaLlY gReAt IdEa",
    },
  ];

  const faqs = [
    {
      question: "What is alternating case text?",
      answer:
        "Alternating case text is a writing style where each successive letter switches between lowercase and uppercase, producing output like \"hElLo WoRlD\". The pattern only applies to alphabetical characters — numbers, spaces, and punctuation remain unchanged. It is widely used for humor, memes, social media posts, and creative typography across the internet.",
    },
    {
      question: "How do I convert text to alternating case?",
      answer:
        "Simply paste or type your text into the input box above, optionally toggle the \"Start with uppercase\" setting, then click the \"Convert to aLtErNaTiNg CaSe\" button. Your converted text appears instantly in the output area, where you can copy it to your clipboard or download it as a .txt file. The entire process takes seconds and requires no technical knowledge.",
    },
    {
      question: "What is the SpongeBob mocking text meme?",
      answer:
        "The SpongeBob mocking meme pairs an image of SpongeBob SquarePants in a chicken-like pose with text written in alternating case to convey sarcasm or mockery. For example, \"i DoN't nEeD tO sTuDy FoR tHe TeSt\" implies the original statement was foolish. This meme format became viral in 2017 and remains one of the most popular uses of alternating case text online.",
    },
    {
      question: "Is this alternating case converter free?",
      answer:
        "Yes, this alternating case converter is 100% free with absolutely no limitations. There are no hidden charges, no premium tiers, and no sign-up walls. You can convert unlimited text as many times as you need. The tool is maintained by CoderDesign Toronto as part of our free tools collection.",
    },
    {
      question: "Is my text private and secure?",
      answer:
        "Absolutely. All text processing happens entirely in your browser using client-side JavaScript. Your text is never sent to any server, stored in any database, or shared with any third party. When you close or refresh the page, all data is gone. Your privacy is fully protected at all times.",
    },
    {
      question: "Can I start the alternation with uppercase?",
      answer:
        "Yes. By default, the first alphabetical character is converted to lowercase and the second to uppercase (e.g., \"hElLo\"). If you toggle the \"Start with uppercase\" option, the pattern reverses so the first letter is uppercase (e.g., \"HeLlO\"). This gives you full control over the alternation pattern for your specific needs.",
    },
    {
      question: "Does alternating case work with numbers and symbols?",
      answer:
        "Numbers, symbols, punctuation marks, and whitespace are all preserved exactly as they are in the original text. Only alphabetical characters (A–Z, a–z) are affected by the alternating case conversion. The alternation counter only advances on letters, so the uppercase/lowercase pattern stays perfectly consistent regardless of non-letter characters in between.",
    },
    {
      question: "What are common uses for alternating case text?",
      answer:
        "The most popular uses include creating SpongeBob mocking meme text, crafting sarcastic social media posts and replies, adding creative typography to designs and thumbnails, standing out in Discord and gaming chat, and generating attention-grabbing headlines. Developers also use it for testing how applications handle mixed-case text rendering.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
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
            <span className="text-white">Alternating Case Converter</span>
          </nav>

          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Type className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white lg:text-4xl">
                Free Alternating Case Converter – aLtErNaTiNg CaSe Generator
                Online
              </h1>
            </div>
          </div>
          <p className="max-w-2xl text-lg text-white/90 leading-relaxed">
            Convert any text to aLtErNaTiNg CaSe instantly with this free online
            tool. Perfect for SpongeBob mocking memes, sarcastic social media
            posts, creative typography, and Discord chat. No login required —
            100% free and private.
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
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              No Sign-Up Needed
            </span>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-10 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="space-y-6">
            {/* Input */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">
                Input Text{" "}
                <span className="font-normal text-slate-500">
                  (paste or type your text)
                </span>
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  "Type or paste your text here...\n\nExample:\nI don't need to study for the test"
                }
                rows={8}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
              />
            </div>

            {/* Options */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-900">
                Options
              </p>
              <div className="flex flex-wrap gap-6">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={startUpper}
                    onChange={(e) => setStartUpper(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  Start with uppercase
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={convert}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                <Type className="h-4 w-4 flex-shrink-0" />
                <span>Convert to aLtErNaTiNg CaSe</span>
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
              </div>
              <div className="relative">
                <textarea
                  value={output}
                  readOnly
                  placeholder="Your aLtErNaTiNg CaSe text will appear here after clicking Convert..."
                  rows={8}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono"
                />
                {output && (
                  <div className="absolute right-2 top-2 flex gap-1.5">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-violet-300 hover:text-violet-700"
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
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-violet-300 hover:text-violet-700"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download .txt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Convert Text to Alternating Case
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to generate alternating case text. It
              takes just seconds — no technical knowledge required.
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

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Why Use Our Free Alternating Case Converter?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and reliable alternating case generator built by
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

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Popular Uses for Alternating Case Text
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">
              See how people use alternating case for memes, social media,
              gaming, and creative projects every day.
            </p>
          </div>

          <div className="space-y-4">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3.5">
                    <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-violet-100">
                      <Icon className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {useCase.title}
                      </h3>
                      <p className="truncate text-xs text-slate-500">
                        {useCase.description.split(".")[0]}.
                      </p>
                    </div>
                  </div>
                  {/* Card Body — Before / After */}
                  <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 divide-slate-100">
                    <div className="px-5 py-3">
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Before
                      </p>
                      <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed text-slate-600 font-mono">
                        {useCase.before}
                      </pre>
                    </div>
                    <div className="px-5 py-3 bg-green-50/50">
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-green-600">
                        After
                      </p>
                      <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed text-green-800 font-mono">
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
        className="border-t border-slate-200 bg-white py-16 lg:py-20"
        id="faq"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Everything you need to know about alternating case text and this
              converter tool. Can&apos;t find what you&apos;re looking for?{" "}
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

      <RelatedTools currentSlug="alternating-case-converter" />

      <ToolCta />

      <FooterSection />
    </div>
  );
}
