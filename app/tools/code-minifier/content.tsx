"use client";
import { useState, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Minimize2 } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

type Language = "html" | "css" | "javascript";

function minifyHTML(code: string): string {
  let r = code;
  // Remove HTML comments
  r = r.replace(/<!--[\s\S]*?-->/g, "");
  // Collapse whitespace between tags
  r = r.replace(/>\s+</g, "><");
  // Collapse remaining runs of whitespace
  r = r.replace(/\s{2,}/g, " ");
  return r.trim();
}

function minifyCSS(code: string): string {
  let r = code;
  // Remove comments
  r = r.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove whitespace around special chars
  r = r.replace(/\s*([{};:,>~+])\s*/g, "$1");
  // Remove last semicolon before closing brace
  r = r.replace(/;}/g, "}");
  // Collapse whitespace
  r = r.replace(/\s{2,}/g, " ");
  return r.trim();
}

function minifyJS(code: string): string {
  let r = code;
  // Remove single-line comments (but not URLs like http://)
  r = r.replace(/(["'`])(?:\\.|(?!\1).)*?\1|\/\/.*$/gm, (match) => {
    if (/^["'`]/.test(match)) return match; // preserve strings
    return "";
  });
  // Remove multi-line comments (preserving strings)
  r = r.replace(/(["'`])(?:\\.|(?!\1).)*?\1|\/\*[\s\S]*?\*\//g, (match) => {
    if (/^["'`]/.test(match)) return match;
    return "";
  });
  // Collapse whitespace outside strings
  const tokens: string[] = [];
  const stringRe = /(["'`])(?:\\.|(?!\1).)*?\1/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = stringRe.exec(r)) !== null) {
    const before = r.slice(last, m.index).replace(/\s{2,}/g, " ");
    tokens.push(before, m[0]);
    last = m.index + m[0].length;
  }
  tokens.push(r.slice(last).replace(/\s{2,}/g, " "));
  r = tokens.join("");
  // Remove whitespace around operators/braces
  r = r.replace(/\s*([{};,()=+\-*/<>!&|?:])\s*/g, "$1");
  return r.trim();
}

const MINIFIERS: Record<Language, (code: string) => string> = {
  html: minifyHTML,
  css: minifyCSS,
  javascript: minifyJS,
};

export default function CodeMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<Language>("html");
  const [compressionStats, setCompressionStats] = useState<{ before: number; after: number; pct: string } | null>(null);

  const minify = useCallback(() => {
    if (!input.trim()) { setOutput(""); setCompressionStats(null); return; }
    const result = MINIFIERS[lang](input);
    setOutput(result);
    const before = new Blob([input]).size;
    const after = new Blob([result]).size;
    const pct = before > 0 ? ((1 - after / before) * 100).toFixed(1) : "0";
    setCompressionStats({ before, after, pct });
  }, [input, lang]);

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => {
    if (!output) return;
    const exts: Record<Language, string> = { html: "html", css: "css", javascript: "js" };
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `minified.${exts[lang]}`; a.click();
  };

  const faqs = [
    { question: "What does minification do?", answer: "Minification removes unnecessary characters from source code — whitespace, comments, line breaks, and optional syntax — without changing functionality. This reduces file size for faster page loads." },
    { question: "Which languages are supported?", answer: "This tool supports HTML, CSS, and JavaScript minification. Each language has tailored rules: HTML removes comments and collapses tag whitespace, CSS strips comments and unnecessary spaces, JS removes comments while preserving strings." },
    { question: "Does it handle JavaScript strings correctly?", answer: "Yes. The JavaScript minifier is careful to preserve quoted strings (single, double, and backtick) while removing comments and collapsing whitespace outside of them." },
    { question: "How much compression can I expect?", answer: "Typical compression ranges from 10% to 60% depending on how much whitespace and comments your code contains. The tool shows before/after sizes and compression percentage." },
    { question: "Is my code private?", answer: "Yes. All minification happens locally in your browser — no code is sent to any server." },
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
            <span className="text-white">Code Minifier</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Code Minifier</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Minify HTML, CSS, and JavaScript code online. Remove whitespace, comments, and unnecessary characters to reduce file size.</p>
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
          {/* Language tabs */}
          <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 w-fit">
            {(["html", "css", "javascript"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${lang === l ? "bg-white text-violet-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>{l.toUpperCase()}</button>
            ))}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Code ({lang.toUpperCase()})</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Paste your ${lang.toUpperCase()} code here...`} rows={10} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors font-mono" />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={minify} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Minimize2 className="h-4 w-4 flex-shrink-0" /><span>Minify Code</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setCompressionStats(null); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          {/* Compression stats */}
          {compressionStats && (
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <div className="text-lg font-bold text-slate-700">{compressionStats.before} B</div>
                <div className="text-xs text-slate-500">Before</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <div className="text-lg font-bold text-slate-700">{compressionStats.after} B</div>
                <div className="text-xs text-slate-500">After</div>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center">
                <div className="text-lg font-bold text-green-700">{compressionStats.pct}%</div>
                <div className="text-xs text-green-600">Saved</div>
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Minified Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Minified code will appear here..." rows={8} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="code-minifier" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
