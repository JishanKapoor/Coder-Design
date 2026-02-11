"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Copy, Trash2, Check, Download, Zap, Shield, Globe, AlignLeft } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function LeftAlignTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [preserveRelative, setPreserveRelative] = useState(false);
  const [copied, setCopied] = useState(false);

  const alignLeft = () => {
    if (!input) { setOutput(""); return; }
    const lines = input.split("\n");
    if (preserveRelative) {
      // Find the minimum indentation across all non-empty lines
      const nonEmpty = lines.filter((l) => l.trim().length > 0);
      const minIndent = nonEmpty.reduce((min, line) => {
        const match = line.match(/^(\s*)/);
        const indent = match ? match[1].length : 0;
        return Math.min(min, indent);
      }, Infinity);
      const shift = minIndent === Infinity ? 0 : minIndent;
      const aligned = lines.map((line) => {
        if (line.trim().length === 0) return "";
        return line.slice(shift);
      });
      setOutput(aligned.join("\n"));
    } else {
      // Remove all leading whitespace from every line
      const aligned = lines.map((line) => line.trimStart());
      setOutput(aligned.join("\n"));
    }
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "left-aligned-text.txt"; a.click(); };

  const faqs = [
    { question: "What does left-align text do?", answer: "It removes leading whitespace (spaces, tabs) from each line so all text starts at the left edge." },
    { question: "What does 'Preserve relative indentation' mean?", answer: "When enabled, the tool finds the smallest indentation among all lines and removes only that amount from every line. This keeps the relative indentation structure intact while shifting everything left." },
    { question: "Will this remove blank lines?", answer: "No. Blank lines are preserved. In relative mode, blank lines are converted to empty strings but remain in position." },
    { question: "Does this handle tabs and spaces?", answer: "Yes. In default mode all leading whitespace (including tabs) is removed. In relative mode, the minimum indent is measured in characters, so mixed tabs/spaces are handled as-is." },
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
            <span className="text-white">Left-Align Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Left-Align Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Remove leading whitespace to align all text evenly to the left side. Optionally preserve relative indentation to keep code structure intact.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste the text you want to left-align..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={preserveRelative} onChange={(e) => setPreserveRelative(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500/20" />
              <span className="text-sm text-slate-700">Preserve relative indentation</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={alignLeft} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><AlignLeft className="h-4 w-4 flex-shrink-0" /><span>Align Left</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Left-aligned text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="left-align-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
