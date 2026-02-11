"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Italic } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Mathematical Italic character maps (U+1D434 onwards) ── */
const ITALIC_UPPER: Record<string, string> = {
  A: "\uD835\uDC34", B: "\uD835\uDC35", C: "\uD835\uDC36", D: "\uD835\uDC37",
  E: "\uD835\uDC38", F: "\uD835\uDC39", G: "\uD835\uDC3A", H: "\uD835\uDC3B",
  I: "\uD835\uDC3C", J: "\uD835\uDC3D", K: "\uD835\uDC3E", L: "\uD835\uDC3F",
  M: "\uD835\uDC40", N: "\uD835\uDC41", O: "\uD835\uDC42", P: "\uD835\uDC43",
  Q: "\uD835\uDC44", R: "\uD835\uDC45", S: "\uD835\uDC46", T: "\uD835\uDC47",
  U: "\uD835\uDC48", V: "\uD835\uDC49", W: "\uD835\uDC4A", X: "\uD835\uDC4B",
  Y: "\uD835\uDC4C", Z: "\uD835\uDC4D",
};

const ITALIC_LOWER: Record<string, string> = {
  a: "\uD835\uDC4E", b: "\uD835\uDC4F", c: "\uD835\uDC50", d: "\uD835\uDC51",
  e: "\uD835\uDC52", f: "\uD835\uDC53", g: "\uD835\uDC54", h: "\u210E",
  i: "\uD835\uDC56", j: "\uD835\uDC57", k: "\uD835\uDC58", l: "\uD835\uDC59",
  m: "\uD835\uDC5A", n: "\uD835\uDC5B", o: "\uD835\uDC5C", p: "\uD835\uDC5D",
  q: "\uD835\uDC5E", r: "\uD835\uDC5F", s: "\uD835\uDC60", t: "\uD835\uDC61",
  u: "\uD835\uDC62", v: "\uD835\uDC63", w: "\uD835\uDC64", x: "\uD835\uDC65",
  y: "\uD835\uDC66", z: "\uD835\uDC67",
};

function toItalic(text: string): string {
  return Array.from(text)
    .map((ch) => ITALIC_UPPER[ch] || ITALIC_LOWER[ch] || ch)
    .join("");
}

export default function ItalicTextGeneratorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!input) { setOutput(""); return; }
    setOutput(toItalic(input));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "italic-text.txt"; a.click(); };

  const faqs = [
    { question: "How does italic Unicode text work?", answer: "Unicode includes a set of 'Mathematical Italic' characters that look like italic Latin letters. These are distinct code points (e.g., 𝐴 is U+1D434) that render as italic in most fonts and platforms, even in plain text fields." },
    { question: "Where can I use italic Unicode text?", answer: "Italic Unicode text works on social media (Instagram, Twitter/X, Facebook, TikTok), messaging apps (WhatsApp, Telegram), bios, comments, and anywhere that accepts plain text but not HTML formatting." },
    { question: "Why does lowercase h look different?", answer: "The Mathematical Italic lowercase h (U+210E, ℎ) is part of the Letterlike Symbols block rather than the Mathematical Alphanumeric Symbols block, which is a Unicode standard quirk." },
    { question: "Will italic text work everywhere?", answer: "Most modern platforms and devices support these Unicode characters. However, some older systems or specific fonts may not render them correctly, showing boxes or question marks instead." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — no data is sent to any server." },
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
            <span className="text-white">Italic Text Generator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Italic Text Generator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Convert text to italic Unicode characters that work on social media, bios, and anywhere plain text is used.</p>
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

          <div className="flex items-center gap-3">
            <button onClick={generate} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Italic className="h-4 w-4 flex-shrink-0" /><span>Make Italic</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Italic text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="italic-text-generator" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
