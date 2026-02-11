"use client";
import { useMemo, useRef, useState } from "react";
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
  FileText,
  Clock,
  SmilePlus,
  ArrowRight,
  BarChart3,
  BarChart2,
  Hash,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

type EmojiRow = {
  emoji: string;
  count: number;
  percentage: number;
};

function downloadTextFile(filename: string, contents: string) {
  const blob = new Blob([contents], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function EmojiCounterTool() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emojiRegex = useMemo(() => {
    // Broad emoji matcher (same ranges we use in Emoji Remover).
    // Counts emoji code points and ZWJ sequences reasonably well for analytics.
    return /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{231A}-\u{231B}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{E0020}-\u{E007F}\u{FE0F}]/gu;
  }, []);

  const stats = useMemo(() => {
    const matches = input.match(emojiRegex) || [];
    const totalEmojis = matches.length;

    const freq = new Map<string, number>();
    for (const e of matches) {
      freq.set(e, (freq.get(e) || 0) + 1);
    }

    const rows: EmojiRow[] = Array.from(freq.entries())
      .map(([emoji, count]) => ({
        emoji,
        count,
        percentage: totalEmojis > 0 ? (count / totalEmojis) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);

    const uniqueEmojis = freq.size;
    const totalChars = input.length;
    const totalWords = input.trim() ? input.trim().split(/\s+/).filter(Boolean).length : 0;
    const densityPer100Chars = totalChars > 0 ? (totalEmojis / totalChars) * 100 : 0;

    return {
      totalEmojis,
      uniqueEmojis,
      totalChars,
      totalWords,
      densityPer100Chars,
      rows,
    };
  }, [input, emojiRegex]);

  const handleCopy = async () => {
    const lines = stats.rows
      .map((r, i) => `${i + 1}. ${r.emoji} — ${r.count} (${r.percentage.toFixed(1)}%)`)
      .join("\n");

    const header = `Total emojis: ${stats.totalEmojis}\nUnique emojis: ${stats.uniqueEmojis}\nEmoji density (per 100 chars): ${stats.densityPer100Chars.toFixed(2)}\n\n`;

    const text = header + (lines || "(No emojis found)");

    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const lines = stats.rows
      .map((r) => `${r.emoji}\t${r.count}\t${r.percentage.toFixed(2)}%`)
      .join("\n");

    const header = `Emoji\tCount\tPercentage\n`;
    downloadTextFile("emoji-count.txt", header + lines);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") setInput(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClear = () => setInput("");

  const faqs = [
    {
      q: "What does the Emoji Counter do?",
      a: "Emoji Counter scans your text, finds emojis, and returns a breakdown: total emoji count, unique emojis, frequency table, and percentages. It’s useful for analyzing social captions, chat logs, marketing copy, and UX copy that includes emoji.",
    },
    {
      q: "Does it count unique emojis?",
      a: "Yes. The tool shows both the total number of emojis and the number of unique emojis. For example, '🔥🔥🚀' contains 3 total emojis and 2 unique emojis.",
    },
    {
      q: "How are percentages calculated?",
      a: "Percentage is calculated as: (emoji count ÷ total emojis) × 100. If you have 40 emojis total and '🔥' appears 8 times, '🔥' is 20.0%.",
    },
    {
      q: "Is my text private?",
      a: "Yes. Everything runs locally in your browser. We don’t upload, store, or log your text.",
    },
    {
      q: "Can I use this for social media analytics?",
      a: "Absolutely. Paste captions from Instagram, TikTok, YouTube, X, or LinkedIn and see which emojis you overuse. This helps you keep a consistent brand voice and avoid repetitive patterns.",
    },
    {
      q: "Does it handle complex emojis (skin tones / ZWJ sequences)?",
      a: "We use a broad Unicode emoji matcher that covers the major emoji ranges and common sequence components. For analytics, it’s very accurate in practice, but some multi-codepoint sequences can be counted as multiple parts depending on how they’re encoded.",
    },
    {
      q: "Can I export the results?",
      a: "Yes. You can copy the report to your clipboard or download it as a simple text file.",
    },
    {
      q: "Is the tool free?",
      a: "Yes — 100% free, no sign-up required.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* 1) Hero */}
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
            <span className="text-white">Emoji Counter</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <SmilePlus className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-4xl">
              Free Emoji Counter – Count &amp; Analyze Emojis in Text
            </h1>
          </div>

          <p className="max-w-2xl text-white/90 leading-relaxed">
            Count emojis instantly, see unique emoji totals, and get a frequency
            breakdown with percentages. Private, fast, and free — runs entirely in
            your browser.
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

      {/* 2) Tool */}
      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12 space-y-8">
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
              placeholder="Paste your text here — we’ll count emojis and show a breakdown…"
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={handleClear}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" />
              <span>Clear</span>
            </button>
            <button
              onClick={handleCopy}
              disabled={stats.totalEmojis === 0 && !input}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {copied ? (
                <Check className="h-4 w-4 flex-shrink-0" />
              ) : (
                <Copy className="h-4 w-4 flex-shrink-0" />
              )}
              <span>{copied ? "Copied" : "Copy Report"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Download className="h-4 w-4 flex-shrink-0" />
              <span>Download</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-600">
                <SmilePlus className="h-4 w-4 text-blue-600" />
                Total Emojis
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                {stats.totalEmojis}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-600">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                Unique Emojis
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                {stats.uniqueEmojis}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-600">
                <Hash className="h-4 w-4 text-blue-600" />
                Characters
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                {stats.totalChars}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-600">
                <FileText className="h-4 w-4 text-blue-600" />
                Emoji / 100 chars
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                {stats.densityPer100Chars.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Frequency table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            <div className="grid grid-cols-[3rem_1fr_5rem_7rem] gap-2 bg-slate-100 px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <span>#</span>
              <span>Emoji</span>
              <span className="text-center">Count</span>
              <span className="text-right">% of Total</span>
            </div>
            {stats.rows.length > 0 ? (
              <div className="max-h-[24rem] overflow-y-auto divide-y divide-slate-100">
                {stats.rows.map((r, i) => {
                  const maxPct = stats.rows[0]?.percentage || 1;
                  const barWidth = maxPct > 0 ? Math.max(4, (r.percentage / maxPct) * 100) : 0;
                  return (
                    <div
                      key={`${r.emoji}-${i}`}
                      className="grid grid-cols-[3rem_1fr_5rem_7rem] gap-2 items-center px-5 py-2.5 text-sm hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs font-medium text-slate-400">{i + 1}</span>
                      <span className="text-lg leading-none">{r.emoji}</span>
                      <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {r.count}
                      </span>
                      <div className="flex items-center justify-end gap-2">
                        <div className="hidden sm:block h-2 w-20 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-blue-400" style={{ width: `${barWidth}%` }} />
                        </div>
                        <span className="text-xs font-medium text-slate-500 tabular-nums w-12 text-right">
                          {r.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="px-5 py-8 text-sm text-slate-500">
                Paste text above to see emoji frequency.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Count Emojis in Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Analyze emoji usage in your text in four easy steps.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Your Text", description: "Paste or type text containing emojis in the input box." },
              { step: 2, title: "View Instant Stats", description: "See emoji count, unique emojis, density, and character counts update in real time." },
              { step: 3, title: "Check the Frequency Table", description: "Review a breakdown showing each emoji and how many times it appears." },
              { step: 4, title: "Copy or Download Report", description: "Copy the analysis or download it as a text file." },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">{item.step}</div>
                <div><h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3><p className="text-sm leading-relaxed text-slate-600">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Emoji Counter?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">A fast, detailed emoji analysis tool for content creators.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Real-Time Analysis", description: "Emoji stats update as you type \u2014 no button click needed." },
              { icon: Shield, title: "100% Private", description: "All counting happens in your browser. No data is sent anywhere." },
              { icon: Globe, title: "Any Device", description: "Works on desktop, tablet, and mobile browsers." },
              { icon: Hash, title: "Detailed Breakdown", description: "See total emojis, unique emojis, density, and per-emoji frequency." },
              { icon: BarChart2, title: "Frequency Table", description: "View a ranked table of each emoji with usage count and percentage." },
              { icon: Zap, title: "No Sign-Up", description: "Start counting emojis immediately \u2014 no registration needed." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-blue-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"><f.icon className="h-6 w-6 text-blue-600" /></div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how emoji counting helps content creators and analysts.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Social Media Analysis", before: "Great job! \ud83c\udf89\ud83c\udf89\ud83d\udd25\ud83d\udcaa", after: "4 emojis, 3 unique\n\ud83c\udf89 \u00d7 2 (50%)\n\ud83d\udd25 \u00d7 1 (25%)\n\ud83d\udcaa \u00d7 1 (25%)" },
              { title: "Character Limits", before: "Hello \ud83d\udc4b\ud83c\udf0d World", after: "2 emojis\n14 characters total\nEmoji density: 14.3%" },
              { title: "Content Moderation", before: "Join us! \ud83c\udfb0\ud83d\udcb0\ud83e\udd11\ud83d\udcb5", after: "4 gambling-related emojis detected" },
              { title: "Marketing Copy Review", before: "Sale! \ud83d\udd25\ud83d\udd25\ud83d\udd25\ud83c\udf81", after: "4 emojis, 2 unique\n\ud83d\udd25 \u00d7 3 (75%)" },
            ].map((uc) => (
              <div key={uc.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-start gap-4 border-b border-slate-100 px-6 py-4 sm:px-7 sm:py-5"><h3 className="text-base font-semibold text-slate-900">{uc.title}</h3></div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6"><p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p><pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-700 font-mono p-3 bg-white rounded-lg">{uc.before}</pre></div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6"><p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Output</p><pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-emerald-800 font-mono p-3 bg-emerald-100 rounded-lg">{uc.after}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Emoji Counter FAQ
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Common questions about counting emojis and interpreting the results.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4) Related tools */}
      <RelatedTools currentSlug="emoji-counter" />

      {/* 5) CTA */}
      <ToolCta theme="blue" />

      {/* 6) Footer */}
      <FooterSection />
    </div>
  );
}
