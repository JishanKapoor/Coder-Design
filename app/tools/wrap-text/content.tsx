"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Copy, Trash2, Check, Download, Zap, Shield, Globe, WrapText } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function WrapTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [maxWidth, setMaxWidth] = useState(80);
  const [wrapMode, setWrapMode] = useState<"word" | "character">("word");
  const [copied, setCopied] = useState(false);

  const wrapText = () => {
    if (!input) { setOutput(""); return; }

    const inputLines = input.split("\n");
    const wrappedLines: string[] = [];

    for (const line of inputLines) {
      if (line.length <= maxWidth) {
        wrappedLines.push(line);
        continue;
      }

      if (wrapMode === "character") {
        // Break at exact character count
        let remaining = line;
        while (remaining.length > maxWidth) {
          wrappedLines.push(remaining.slice(0, maxWidth));
          remaining = remaining.slice(maxWidth);
        }
        wrappedLines.push(remaining);
      } else {
        // Word-wrap mode
        const words = line.split(/(\s+)/); // keep whitespace tokens
        let currentLine = "";
        for (const token of words) {
          if (currentLine.length + token.length > maxWidth && currentLine.length > 0) {
            wrappedLines.push(currentLine.trimEnd());
            currentLine = token.trimStart();
          } else {
            currentLine += token;
          }
        }
        if (currentLine.length > 0) {
          wrappedLines.push(currentLine.trimEnd());
        }
      }
    }

    setOutput(wrappedLines.join("\n"));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "wrapped-text.txt"; a.click(); };

  const faqs = [
    { question: "What is text wrapping?", answer: "Text wrapping inserts line breaks so that no line exceeds a given maximum width. It is useful for emails, code comments, README files, and terminal output." },
    { question: "What is the difference between word and character mode?", answer: "Word mode breaks lines at the last space before the width limit, keeping words intact. Character mode breaks at the exact character count, which may split words." },
    { question: "Does this preserve existing line breaks?", answer: "Yes. Existing line breaks in the input are preserved. Only lines that exceed the maximum width are wrapped." },
    { question: "What happens if a single word is longer than the max width?", answer: "In word mode, a word longer than the max width is placed on its own line without breaking. In character mode, long words are split at the character limit." },
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
            <span className="text-white">Wrap Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Wrap Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Wrap text to a maximum line width by word or character boundary. Perfect for formatting emails, README files, code comments, and terminal output.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste the text you want to wrap..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Max width (columns)</label>
              <input type="number" min={10} max={500} value={maxWidth} onChange={(e) => setMaxWidth(Math.max(10, parseInt(e.target.value) || 80))} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Wrap mode</label>
              <select value={wrapMode} onChange={(e) => setWrapMode(e.target.value as "word" | "character")} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                <option value="word">Word boundary</option>
                <option value="character">Character boundary</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={wrapText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><WrapText className="h-4 w-4 flex-shrink-0" /><span>Wrap Text Online</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Wrapped text will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="wrap-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
