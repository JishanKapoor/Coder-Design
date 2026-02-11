"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, ArrowLeftRight } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function ReverseSentencesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [keepParagraphs, setKeepParagraphs] = useState(false);

  const flipSentences = () => {
    if (!input.trim()) { setOutput(""); return; }
    if (keepParagraphs) {
      const paragraphs = input.split(/\n\s*\n/);
      const result = paragraphs.map((para) => {
        const sentences = para.match(/[^.!?]+[.!?]+[\s]*/g) || [para];
        return sentences.reverse().map((s) => s.trim()).join(" ");
      });
      setOutput(result.join("\n\n"));
    } else {
      const sentences = input.match(/[^.!?]+[.!?]+[\s]*/g) || [input];
      setOutput(sentences.reverse().map((s) => s.trim()).join(" "));
    }
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "reversed-sentences.txt"; a.click(); };

  const faqs = [
    { question: "How are sentences detected?", answer: "Sentences are split by periods (.), exclamation marks (!), and question marks (?). Each segment ending with one of these is treated as a sentence." },
    { question: "What does 'keep paragraph structure' do?", answer: "When enabled, sentences are only reversed within each paragraph. Paragraphs (separated by blank lines) remain in their original order." },
    { question: "Does it handle abbreviations like 'Dr.' or 'U.S.'?", answer: "Simple abbreviations with periods may be treated as sentence boundaries. For best results, use text with clear sentence endings." },
    { question: "Can I use this with multi-paragraph text?", answer: "Yes. Use the paragraph option to reverse sentences within each paragraph independently, or leave it off to reverse all sentences across the entire text." },
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
            <span className="text-white">Reverse Sentences</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Reverse Sentences</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Reverse the order of sentences in your text. Sentences split by period, exclamation, or question mark. Free, private, instant.</p>
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

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" checked={keepParagraphs} onChange={(e) => setKeepParagraphs(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
              Keep paragraph structure
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={flipSentences} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><ArrowLeftRight className="h-4 w-4 flex-shrink-0" /><span>Flip Sentences</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Reversed sentences will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="reverse-sentences" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
