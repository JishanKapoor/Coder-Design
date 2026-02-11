"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Sparkles } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Homoglyph → ASCII replacement map ── */
const HOMOGLYPH_TO_ASCII: Record<string, string> = {
  "\u0430": "a", "\u0435": "e", "\u043E": "o", "\u0440": "p",
  "\u0441": "c", "\u0445": "x", "\u0456": "i", "\u0455": "s",
  "\u0443": "y", "\u0410": "A", "\u0415": "E", "\u041E": "O",
  "\u0420": "P", "\u0421": "C", "\u0425": "X", "\u0406": "I",
  "\u0405": "S", "\u0422": "T", "\u041D": "H", "\u0412": "B",
  "\u041C": "M", "\u041A": "K",
  // Greek homoglyphs
  "\u0391": "A", "\u0392": "B", "\u0395": "E", "\u0396": "Z",
  "\u0397": "H", "\u0399": "I", "\u039A": "K", "\u039C": "M",
  "\u039D": "N", "\u039F": "O", "\u03A1": "P", "\u03A4": "T",
  "\u03A5": "Y", "\u03A7": "X", "\u03BF": "o",
};

/* Zero-width and invisible characters to strip */
const INVISIBLE_CHARS = new Set([
  0x200B, 0x200C, 0x200D, 0xFEFF, 0x200E, 0x200F, 0x00AD,
  0x2060, 0x2061, 0x2062, 0x2063, 0x2064, 0x034F, 0x115F,
  0x1160, 0x17B4, 0x17B5, 0x180E, 0x2800,
]);

type NormForm = "NFC" | "NFD" | "NFKC" | "NFKD";

export default function NormalizeFakeTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [normForm, setNormForm] = useState<NormForm>("NFC");
  const [removeZeroWidth, setRemoveZeroWidth] = useState(true);
  const [replaceHomoglyphs, setReplaceHomoglyphs] = useState(true);
  const [stats, setStats] = useState<{ removed: number; replaced: number } | null>(null);

  const normalizeText = () => {
    if (!input) { setOutput(""); setStats(null); return; }

    let text = input;
    let removed = 0;
    let replaced = 0;

    // Remove zero-width / invisible characters
    if (removeZeroWidth) {
      const before = text.length;
      text = Array.from(text).filter((ch) => {
        const cp = ch.codePointAt(0)!;
        return !INVISIBLE_CHARS.has(cp);
      }).join("");
      removed = before - text.length;
    }

    // Replace homoglyphs
    if (replaceHomoglyphs) {
      text = Array.from(text).map((ch) => {
        if (HOMOGLYPH_TO_ASCII[ch]) {
          replaced++;
          return HOMOGLYPH_TO_ASCII[ch];
        }
        return ch;
      }).join("");
    }

    // Apply Unicode normalization
    text = text.normalize(normForm);

    setOutput(text);
    setStats({ removed, replaced });
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "normalized-text.txt"; a.click(); };

  const faqs = [
    { question: "What is Unicode normalization?", answer: "Unicode normalization converts text into a standard form. NFC composes characters (é as one char), NFD decomposes them (e + combining accent). NFKC and NFKD additionally convert compatibility characters — NFKC is the most aggressive normalization and is recommended for sanitizing text." },
    { question: "What homoglyphs does this remove?", answer: "It replaces Cyrillic and Greek characters that look identical to Latin letters with their ASCII equivalents. For example, Cyrillic 'а' (U+0430) → Latin 'a' (U+0061)." },
    { question: "What zero-width characters are removed?", answer: "Zero-width space (U+200B), zero-width joiner (U+200D), zero-width non-joiner (U+200C), byte order mark (U+FEFF), directional marks (U+200E, U+200F), soft hyphen (U+00AD), and other invisible formatting characters." },
    { question: "When should I use this tool?", answer: "Use it when you receive suspicious text that may contain hidden characters, when sanitizing user input for security, when comparing text that should match but doesn't, or when cleaning scraped content." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — no data is sent to any server." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-purple-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} /></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Normalize Fake Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Normalize Fake Unicode Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Clean and normalize text by removing hidden Unicode characters, replacing homoglyphs with ASCII equivalents, and stripping zero-width characters.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" />100% Private</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" />Instant</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />Any Device</span>
          </div>
        </div>
      </section>

      {/* Tool UI */}
      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12 space-y-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text with suspicious Unicode characters..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors" />
          </div>

          {/* Options */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Options</h3>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={replaceHomoglyphs} onChange={(e) => setReplaceHomoglyphs(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                Replace Homoglyphs with ASCII
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={removeZeroWidth} onChange={(e) => setRemoveZeroWidth(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                Remove Zero-Width Characters
              </label>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Normalization Form</label>
              <select value={normForm} onChange={(e) => setNormForm(e.target.value as NormForm)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                <option value="NFC">NFC — Canonical Composition</option>
                <option value="NFD">NFD — Canonical Decomposition</option>
                <option value="NFKC">NFKC — Compatibility Composition (recommended)</option>
                <option value="NFKD">NFKD — Compatibility Decomposition</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={normalizeText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full sm:w-auto whitespace-nowrap"><Sparkles className="h-4 w-4 flex-shrink-0" /><span>Normalize Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setStats(null); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Normalized text will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-purple-300 hover:text-purple-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-purple-300 hover:text-purple-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
          </div>

          {stats && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-2xl font-bold text-slate-900">{input.length}</p>
                <p className="text-xs text-slate-500">Before</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-2xl font-bold text-slate-900">{output.length}</p>
                <p className="text-xs text-slate-500">After</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-2xl font-bold text-amber-600">{stats.removed}</p>
                <p className="text-xs text-slate-500">Invisible Removed</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-2xl font-bold text-green-600">{stats.replaced}</p>
                <p className="text-xs text-slate-500">Homoglyphs Fixed</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How-To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">How to Normalize Fake Unicode Text</h2>
            <p className="mt-3 text-slate-600">Clean text by replacing homoglyphs with standard characters.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: "1", title: "Paste Suspicious Text", desc: "Paste text that may contain Unicode homoglyphs." },
              { step: "2", title: "Click Normalize", desc: "Press the button to replace lookalike characters with their standard equivalents." },
              { step: "3", title: "Review Clean Text", desc: "See the normalized text with all homoglyphs replaced." },
              { step: "4", title: "Copy the Result", desc: "Copy the clean text for safe use." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">{s.step}</div>
                <h3 className="mb-1 font-semibold text-slate-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Text Normalizer?</h2>
            <p className="mt-3 text-slate-600">Strip homoglyphs and restore text to standard characters.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Zap className="h-5 w-5" />, title: "Instant Normalization", desc: "Replace all homoglyph characters with standard Latin equivalents." },
              { icon: <Shield className="h-5 w-5" />, title: "100% Private", desc: "Text processing happens entirely in your browser." },
              { icon: <Sparkles className="h-5 w-5" />, title: "Smart Replacement", desc: "Intelligently maps Cyrillic, Greek, and other lookalikes to Latin." },
              { icon: <Globe className="h-5 w-5" />, title: "Comprehensive", desc: "Handles hundreds of known homoglyph substitution patterns." },
              { icon: <Copy className="h-5 w-5" />, title: "One-Click Copy", desc: "Copy or download normalized text easily." },
              { icon: <Zap className="h-5 w-5" />, title: "No Sign-Up", desc: "Use the tool instantly without any account." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-purple-200 hover:shadow-lg">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">{f.icon}</div>
                <h3 className="mb-1 font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">Use Cases</h2>
            <p className="mt-3 text-slate-600">See how text normalization cleans up suspicious content.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Clean Usernames", before: "аdmіn", after: "admin" },
              { title: "Fix URLs", before: "gооgle.cоm", after: "google.com" },
              { title: "Normalize Content", before: "Ηеllο Wοrld", after: "Hello World" },
              { title: "Restore Passwords", before: "pаsswоrd", after: "password" },
            ].map((uc, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-3">
                  <h3 className="font-semibold text-slate-900">{uc.title}</h3>
                </div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div className="border-r border-slate-100 px-5 py-3">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Input</span>
                    <p className="text-sm text-slate-700">{uc.before}</p>
                  </div>
                  <div className="px-5 py-3">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Output</span>
                    <p className="text-sm text-slate-700">{uc.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="normalize-fake-text" />
      <ToolCta theme="purple" />
      <FooterSection />
    </div>
  );
}
