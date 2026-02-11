"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Copy, Trash2, Check, Download, Zap, Shield, Globe, Scissors } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function TrimTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [side, setSide] = useState<"both" | "left" | "right">("both");
  const [trimChars, setTrimChars] = useState("");
  const [copied, setCopied] = useState(false);

  const trimText = () => {
    if (!input) { setOutput(""); return; }
    const lines = input.split("\n");
    const trimmed = lines.map((line) => {
      if (!trimChars) {
        // Default: trim whitespace
        if (side === "left") return line.trimStart();
        if (side === "right") return line.trimEnd();
        return line.trim();
      }
      // Custom character trimming
      const chars = trimChars.split("");
      let start = 0;
      let end = line.length;
      if (side === "left" || side === "both") {
        while (start < end && chars.includes(line[start])) start++;
      }
      if (side === "right" || side === "both") {
        while (end > start && chars.includes(line[end - 1])) end--;
      }
      return line.slice(start, end);
    });
    setOutput(trimmed.join("\n"));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "trimmed-text.txt"; a.click(); };

  const faqs = [
    { question: "What does trim text do?", answer: "Trim text removes unwanted characters from the beginning (left), end (right), or both sides of each line in your text." },
    { question: "What characters are trimmed by default?", answer: "By default, whitespace characters (spaces, tabs, etc.) are trimmed. You can specify custom characters to trim instead." },
    { question: "Can I trim custom characters?", answer: "Yes. Enter the characters you want to remove in the 'Characters to trim' field. Each character in the field will be trimmed individually." },
    { question: "Does this process each line separately?", answer: "Yes. Each line is trimmed independently, so leading/trailing characters on every line are removed." },
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
            <span className="text-white">Trim Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Trim Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Trim characters from the left, right, or both sides of each line. Remove unwanted spaces, characters, or custom strings with one click.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste the text you want to trim..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Trim side</label>
              <select value={side} onChange={(e) => setSide(e.target.value as "both" | "left" | "right")} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                <option value="both">Both sides</option>
                <option value="left">Left only</option>
                <option value="right">Right only</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Characters to trim <span className="text-slate-400">(blank = whitespace)</span></label>
              <input type="text" value={trimChars} onChange={(e) => setTrimChars(e.target.value)} placeholder="e.g. -_#" className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={trimText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Scissors className="h-4 w-4 flex-shrink-0" /><span>Trim Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Trimmed text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="trim-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
