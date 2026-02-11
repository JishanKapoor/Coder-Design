"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Maximize2 } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Fullwidth conversion ── */
function toFullwidth(text: string): string {
  return Array.from(text)
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code === 32) return "\u3000"; // space → ideographic space
      if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xfee0);
      return ch;
    })
    .join("");
}

function toVaporwave(text: string): string {
  const wide = Array.from(text).map((ch) => {
    const code = ch.charCodeAt(0);
    if (code === 32) return "\u3000";
    if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xfee0);
    return ch;
  });
  return wide.join(" ");
}

type Mode = "fullwidth" | "vaporwave";

export default function WideTextMakerTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<Mode>("fullwidth");

  const convert = (text?: string, m?: Mode) => {
    const src = text ?? input;
    const currentMode = m ?? mode;
    if (!src) { setOutput(""); return; }
    setOutput(currentMode === "vaporwave" ? toVaporwave(src) : toFullwidth(src));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "wide-text.txt"; a.click(); };

  const faqs = [
    { question: "What is fullwidth text?", answer: "Fullwidth text uses Unicode characters that take up the same width as CJK (Chinese, Japanese, Korean) ideographs. Each Latin letter is replaced with its fullwidth equivalent (e.g., A → Ａ), making text appear wider and more spaced out." },
    { question: "What is Vaporwave mode?", answer: "Vaporwave mode converts text to fullwidth characters AND adds extra spaces between each character, creating the iconic a e s t h e t i c vaporwave look popular in internet culture and social media." },
    { question: "Where can I use wide text?", answer: "Wide text works on most social media platforms (Instagram, Twitter/X, Facebook, TikTok), messaging apps, Discord, Twitch chat, and anywhere that supports Unicode text." },
    { question: "How does the conversion work?", answer: "ASCII characters (code points 33–126) are shifted by adding 0xFEE0 to produce their fullwidth Unicode equivalents. Regular spaces become ideographic spaces (U+3000). Characters outside this range pass through unchanged." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — no text is ever sent to any server." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-14 lg:py-18">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} /></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Wide Text Maker</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Wide Text Maker</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Convert text to fullwidth Unicode characters with extra spacing. Create aesthetic wide text for social media and vaporwave aesthetics.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" />100% Private</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" />Instant</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />Any Device</span>
          </div>
        </div>
      </section>

      {/* Tool UI */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your text here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          {/* Mode Selector */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">Mode</label>
            <div className="flex flex-wrap gap-2">
              {([
                { value: "fullwidth" as const, label: "Ｆｕｌｌｗｉｄｔｈ", desc: "Standard wide text" },
                { value: "vaporwave" as const, label: "Ｖ ａ ｐ ｏ ｒ ｗ ａ ｖ ｅ", desc: "Extra-spaced aesthetic" },
              ]).map((m) => (
                <button key={m.value} onClick={() => { setMode(m.value); if (input) convert(input, m.value); }} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${mode === m.value ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>{m.label}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => convert()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Maximize2 className="h-4 w-4 flex-shrink-0" /><span>Widen Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Wide text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="absolute right-2 top-2 flex gap-1.5">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview */}
          {output && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Live Preview</h3>
              <p className="text-lg leading-relaxed text-slate-900 break-all">{output}</p>
            </div>
          )}
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="wide-text-maker" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
