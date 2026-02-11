"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Copy, Trash2, Check, Download, Zap, Shield, Globe, AlignRight } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function RightAlignTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [width, setWidth] = useState(80);
  const [copied, setCopied] = useState(false);

  const alignRight = () => {
    if (!input) { setOutput(""); return; }
    const lines = input.split("\n");
    const aligned = lines.map((line) => line.padStart(width));
    setOutput(aligned.join("\n"));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "right-aligned-text.txt"; a.click(); };

  const faqs = [
    { question: "How does right-align work?", answer: "Each line is padded with spaces on the left so that it reaches the target width, making the text appear right-aligned in a monospaced font." },
    { question: "What is the default width?", answer: "The default width is 80 characters, which is a common terminal and code editor column width." },
    { question: "What happens if a line is longer than the width?", answer: "If a line is already longer than the target width, it is left unchanged. No characters are removed." },
    { question: "Does this work with proportional fonts?", answer: "Right-alignment with spaces works best in monospaced (fixed-width) fonts. In proportional fonts, the alignment may appear uneven." },
    { question: "Is my data private?", answer: "Yes. All processing happens entirely in your browser. No data is sent to any server." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-14 lg:py-18">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} /></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Right-Align Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Right-Align Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Align each line of text to the right side within a fixed width. Perfect for code formatting, reports, and monospaced layouts.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" />100% Private</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" />Instant</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />Any Device</span>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste the text you want to right-align..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Target width (columns)</label>
              <input type="number" min={1} max={500} value={width} onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 80))} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={alignRight} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><AlignRight className="h-4 w-4 flex-shrink-0" /><span>Align Right</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Right-aligned text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="absolute right-2 top-2 flex gap-1.5">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="right-align-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
