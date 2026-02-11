"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, CopyPlus } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function SentenceDuplicatorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(2);
  const [separator, setSeparator] = useState<"space" | "newline">("space");

  const duplicateSentences = () => {
    if (!input.trim()) { setOutput(""); return; }
    const sentences = input.match(/[^.!?]+[.!?]+[\s]*/g) || [input];
    const sep = separator === "newline" ? "\n" : " ";
    const result = sentences.map((s) => {
      const trimmed = s.trim();
      return Array(count).fill(trimmed).join(sep);
    }).join(sep);
    setOutput(result);
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "duplicated-sentences.txt"; a.click(); };

  const faqs = [
    { question: "How are sentences detected?", answer: "Sentences are split by periods (.), exclamation marks (!), and question marks (?). Each segment ending with one of these is treated as a sentence." },
    { question: "What does the repeat count do?", answer: "It controls how many times each sentence appears in the output. A count of 3 means each sentence appears three times." },
    { question: "What separators are available?", answer: "You can separate duplicated sentences with a space (inline) or a newline (one per line)." },
    { question: "Does it preserve punctuation?", answer: "Yes. Each sentence keeps its original punctuation when duplicated." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — nothing is sent to any server." },
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
            <span className="text-white">Sentence Duplicator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Sentence Duplicator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Duplicate each sentence in your text a specified number of times. Free, private, instant.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste your text here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">Repeat Count</label>
              <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))} className="h-11 w-24 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">Separator</label>
              <div className="flex gap-2">
                {(["space", "newline"] as const).map((s) => (
                  <button key={s} onClick={() => setSeparator(s)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${separator === s ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>
                    {s === "space" ? "Space" : "New Line"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={duplicateSentences} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><CopyPlus className="h-4 w-4 flex-shrink-0" /><span>Duplicate Sentences</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Duplicated sentences will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="sentence-duplicator" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
