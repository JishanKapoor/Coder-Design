"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Link2 } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

type ExtractType = "urls" | "emails" | "all";
type OutputFormat = "lines" | "comma" | "json";

export default function LinkExtractorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [extractType, setExtractType] = useState<ExtractType>("all");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("lines");
  const [removeDuplicates, setRemoveDuplicates] = useState(true);

  const extractLinks = () => {
    if (!input.trim()) { setOutput(""); return; }

    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+|ftp:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;

    let results: string[] = [];

    if (extractType === "urls" || extractType === "all") {
      const urls = input.match(urlRegex) || [];
      results.push(...urls);
    }

    if (extractType === "emails" || extractType === "all") {
      const emails = input.match(emailRegex) || [];
      results.push(...emails);
    }

    if (removeDuplicates) {
      results = [...new Set(results)];
    }

    if (results.length === 0) {
      setOutput("No links found.");
      return;
    }

    switch (outputFormat) {
      case "lines":
        setOutput(results.join("\n"));
        break;
      case "comma":
        setOutput(results.join(", "));
        break;
      case "json":
        setOutput(JSON.stringify(results, null, 2));
        break;
    }
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const ext = outputFormat === "json" ? "json" : "txt"; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `extracted-links.${ext}`; a.click(); };

  const faqs = [
    { question: "What types of links can be extracted?", answer: "The tool finds HTTP, HTTPS, and FTP URLs as well as email addresses from any text input." },
    { question: "Can I extract only URLs or only emails?", answer: "Yes. Use the 'Extract type' dropdown to choose URLs only, emails only, or all links." },
    { question: "What output formats are available?", answer: "You can output results one per line, comma-separated, or as a JSON array." },
    { question: "Does it handle duplicates?", answer: "Yes. The 'Remove duplicates' toggle is enabled by default, so each unique link appears only once." },
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
            <span className="text-white">Link Extractor</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Link Extractor</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Extract all URLs and links from any text. Find http, https, ftp, and email links in your content.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text containing links, URLs, or email addresses..." rows={8} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Extract Type</label>
              <select value={extractType} onChange={(e) => setExtractType(e.target.value as ExtractType)} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                <option value="all">All (URLs + Emails)</option>
                <option value="urls">URLs only</option>
                <option value="emails">Emails only</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Output Format</label>
              <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as OutputFormat)} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                <option value="lines">One per line</option>
                <option value="comma">Comma-separated</option>
                <option value="json">JSON array</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
              Remove duplicates
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={extractLinks} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Link2 className="h-4 w-4 flex-shrink-0" /><span>Extract Links</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Extracted Links</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Extracted links will appear here..." rows={8} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && output !== "No links found." && (
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
      <RelatedTools currentSlug="link-extractor" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
