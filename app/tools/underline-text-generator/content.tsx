"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Underline } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

type UnderlineStyle = "single" | "double";

function addUnderline(text: string, style: UnderlineStyle): string {
  const combiner = style === "double" ? "\u0333" : "\u0332";
  return Array.from(text)
    .map((ch) => ch + combiner)
    .join("");
}

export default function UnderlineTextGeneratorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<UnderlineStyle>("single");

  const generate = (text?: string, s?: UnderlineStyle) => {
    const src = text ?? input;
    const st = s ?? style;
    if (!src) { setOutput(""); return; }
    setOutput(addUnderline(src, st));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "underline-text.txt"; a.click(); };

  const faqs = [
    { question: "How does Unicode underline work?", answer: "The combining underline character (U+0332) is placed after each character in your text. Renderers draw a continuous underline beneath the text. The double underline uses U+0333 for a heavier effect." },
    { question: "Where can I use underlined text?", answer: "Unicode underlined text works on social media (Instagram, Twitter/X, Facebook, TikTok), messaging apps, bios, comments, and anywhere that accepts plain text." },
    { question: "What's the difference between single and double underline?", answer: "Single underline (U+0332) adds one line beneath each character. Double underline (U+0333) adds a thicker double-line effect beneath each character." },
    { question: "Will the underline look continuous?", answer: "In most fonts and platforms, the combining underline renders as a continuous line. However, some fonts may show slight gaps between characters." },
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
            <span className="text-white">Underline Text Generator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Underline Text Generator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Add underline to any text using Unicode combining characters. Works on social media and plain text fields.</p>
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

          {/* Style Selector */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">Style</label>
            <div className="flex flex-wrap gap-2">
              {([
                { value: "single" as const, label: "S\u0332i\u0332n\u0332g\u0332l\u0332e\u0332", desc: "Single Underline (U+0332)" },
                { value: "double" as const, label: "D\u0333o\u0333u\u0333b\u0333l\u0333e\u0333", desc: "Double Underline (U+0333)" },
              ]).map((s) => (
                <button key={s.value} onClick={() => { setStyle(s.value); if (input) generate(input, s.value); }} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${style === s.value ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>{s.label}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => generate()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Underline className="h-4 w-4 flex-shrink-0" /><span>Underline Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Underlined text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="underline-text-generator" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
