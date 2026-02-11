"use client";
import { useState, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Minimize2, Code } from "lucide-react";
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
      <section className="relative overflow-hidden bg-emerald-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
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
      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12 space-y-8">
          {/* Language tabs */}
          <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 w-fit">
            {(["html", "css", "javascript"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${lang === l ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>{l.toUpperCase()}</button>
            ))}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Code ({lang.toUpperCase()})</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Paste your ${lang.toUpperCase()} code here...`} rows={10} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors font-mono" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={minify} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full sm:w-auto whitespace-nowrap"><Minimize2 className="h-4 w-4 flex-shrink-0" /><span>Minify Code</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setCompressionStats(null); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
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
              <textarea value={output} readOnly placeholder="Minified code will appear here..." rows={8} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* ── How-To Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Minify Code</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Compress code by removing whitespace and comments.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Paste Code", description: "Paste your JavaScript, CSS, or HTML." },
              { step: 2, title: "Select Language", description: "Choose the code language." },
              { step: 3, title: "Click Minify", description: "Remove whitespace and comments." },
              { step: 4, title: "Copy Result", description: "Copy minified code." },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">{item.step}</div>
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Code Minifier?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Reduce file size for faster loading.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Minification", description: "Minify code in one click." },
              { icon: Shield, title: "100% Private", description: "No data leaves your browser." },
              { icon: Code, title: "Multi-Language", description: "JS, CSS, HTML support." },
              { icon: Globe, title: "Any Device", description: "Works everywhere." },
              { icon: Copy, title: "Easy Export", description: "Copy minified output." },
              { icon: Zap, title: "No Sign-Up", description: "No account needed." },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-emerald-200 hover:shadow-lg">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Use Cases Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how code minification is used.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "JavaScript", input: "function hello() {\n  return 'hi';\n}", output: "function hello(){return'hi'}" },
              { title: "CSS", input: ".box {\n  color: red;\n  margin: 0;\n}", output: ".box{color:red;margin:0}" },
              { title: "HTML", input: "<div>\n  <p>Hello</p>\n</div>", output: "<div><p>Hello</p></div>" },
              { title: "Production Build", input: "// comment\nvar x = 1;", output: "var x=1;" },
            ].map((useCase) => (
              <div key={useCase.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
                  <h3 className="text-base font-semibold text-slate-900">{useCase.title}</h3>
                </div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div>
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">Input</div>
                    <pre className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 overflow-x-auto">{useCase.input}</pre>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">Output</div>
                    <pre className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 overflow-x-auto">{useCase.output}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="code-minifier" />
      <ToolCta theme="emerald" />
      <FooterSection />
    </div>
  );
}
