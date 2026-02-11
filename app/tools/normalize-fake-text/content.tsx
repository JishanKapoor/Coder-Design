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
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-14 lg:py-18">
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
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text with suspicious Unicode characters..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          {/* Options */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Options</h3>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={replaceHomoglyphs} onChange={(e) => setReplaceHomoglyphs(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                Replace Homoglyphs with ASCII
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={removeZeroWidth} onChange={(e) => setRemoveZeroWidth(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                Remove Zero-Width Characters
              </label>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Normalization Form</label>
              <select value={normForm} onChange={(e) => setNormForm(e.target.value as NormForm)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                <option value="NFC">NFC — Canonical Composition</option>
                <option value="NFD">NFD — Canonical Decomposition</option>
                <option value="NFKC">NFKC — Compatibility Composition (recommended)</option>
                <option value="NFKD">NFKD — Compatibility Decomposition</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={normalizeText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Sparkles className="h-4 w-4 flex-shrink-0" /><span>Normalize Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setStats(null); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Normalized text will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="absolute right-2 top-2 flex gap-1.5">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
            </div>
          </div>

          {stats && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-2xl font-bold text-slate-900">{input.length}</p>
                <p className="text-xs text-slate-500">Before</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-2xl font-bold text-slate-900">{output.length}</p>
                <p className="text-xs text-slate-500">After</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-2xl font-bold text-amber-600">{stats.removed}</p>
                <p className="text-xs text-slate-500">Invisible Removed</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{stats.replaced}</p>
                <p className="text-xs text-slate-500">Homoglyphs Fixed</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="normalize-fake-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
