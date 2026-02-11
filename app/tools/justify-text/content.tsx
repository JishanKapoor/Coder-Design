"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Copy, Trash2, Check, Download, Zap, Shield, Globe, AlignJustify } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function JustifyTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lineWidth, setLineWidth] = useState(80);
  const [copied, setCopied] = useState(false);

  const justifyText = () => {
    if (!input) { setOutput(""); return; }

    // Split into paragraphs (double newlines) and process each
    const paragraphs = input.split(/\n\s*\n/);
    const justified = paragraphs.map((para) => {
      // Merge all words in the paragraph
      const words = para.split(/\s+/).filter(Boolean);
      if (words.length === 0) return "";

      const lines: string[] = [];
      let currentWords: string[] = [];
      let currentLen = 0;

      for (const word of words) {
        const newLen = currentLen + (currentWords.length > 0 ? 1 : 0) + word.length;
        if (newLen > lineWidth && currentWords.length > 0) {
          lines.push(justifyLine(currentWords, lineWidth));
          currentWords = [word];
          currentLen = word.length;
        } else {
          currentWords.push(word);
          currentLen = newLen;
        }
      }
      // Last line of paragraph is left-aligned
      if (currentWords.length > 0) {
        lines.push(currentWords.join(" "));
      }
      return lines.join("\n");
    });

    setOutput(justified.join("\n\n"));
  };

  const justifyLine = (words: string[], width: number): string => {
    if (words.length === 1) return words[0];
    const totalChars = words.reduce((sum, w) => sum + w.length, 0);
    const totalSpaces = width - totalChars;
    const gaps = words.length - 1;
    const baseSpaces = Math.floor(totalSpaces / gaps);
    let extraSpaces = totalSpaces % gaps;

    let result = "";
    for (let i = 0; i < words.length; i++) {
      result += words[i];
      if (i < gaps) {
        let spaces = baseSpaces;
        if (extraSpaces > 0) { spaces++; extraSpaces--; }
        result += " ".repeat(spaces);
      }
    }
    return result;
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "justified-text.txt"; a.click(); };

  const faqs = [
    { question: "What does justify text mean?", answer: "Justifying text distributes extra spaces evenly between words so that every line (except the last) fills the entire specified width. This creates clean, aligned left and right edges." },
    { question: "How is the last line handled?", answer: "The last line of each paragraph is left-aligned, matching the behavior of justified text in word processors and typesetting." },
    { question: "What happens with very long words?", answer: "If a single word exceeds the line width, it is placed on its own line without breaking. Hyphenation is not applied." },
    { question: "Does this handle multiple paragraphs?", answer: "Yes. Paragraphs separated by blank lines are justified independently. Each paragraph is reformatted and separated by a blank line in the output." },
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
            <span className="text-white">Justify Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Justify Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Justify and align text to a fixed line width. Words are spaced evenly to fill each line, giving your paragraphs a polished, professional look.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste the paragraph(s) you want to justify..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Line width (columns)</label>
              <input type="number" min={10} max={500} value={lineWidth} onChange={(e) => setLineWidth(Math.max(10, parseInt(e.target.value) || 80))} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={justifyText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><AlignJustify className="h-4 w-4 flex-shrink-0" /><span>Justify Paragraph</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Justified text will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="justify-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
