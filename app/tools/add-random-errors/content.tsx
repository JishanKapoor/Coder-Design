"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Shuffle } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

const ALPHA = "abcdefghijklmnopqrstuvwxyz";

type ErrorType = "swap" | "double" | "missing" | "wrong" | "extra-space";

export default function AddRandomErrorsTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorRate, setErrorRate] = useState(10);
  const [errorTypes, setErrorTypes] = useState<Record<ErrorType, boolean>>({
    swap: true,
    double: true,
    missing: true,
    wrong: true,
    "extra-space": true,
  });

  const toggleError = (type: ErrorType) => {
    setErrorTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const enabledTypes = () => (Object.keys(errorTypes) as ErrorType[]).filter((k) => errorTypes[k]);

  const addErrors = () => {
    if (!input.trim()) { setOutput(""); return; }
    const types = enabledTypes();
    if (types.length === 0) { setOutput(input); return; }

    const chars = input.split("");
    const result: string[] = [];

    for (let i = 0; i < chars.length; i++) {
      if (Math.random() * 100 > errorRate || !/[a-zA-Z]/.test(chars[i])) {
        result.push(chars[i]);
        continue;
      }

      const type = types[Math.floor(Math.random() * types.length)];

      switch (type) {
        case "swap":
          if (i + 1 < chars.length && /[a-zA-Z]/.test(chars[i + 1])) {
            result.push(chars[i + 1], chars[i]);
            i++;
          } else {
            result.push(chars[i]);
          }
          break;
        case "double":
          result.push(chars[i], chars[i]);
          break;
        case "missing":
          // skip the character
          break;
        case "wrong": {
          const isUpper = chars[i] === chars[i].toUpperCase();
          let replacement = ALPHA[Math.floor(Math.random() * ALPHA.length)];
          if (isUpper) replacement = replacement.toUpperCase();
          result.push(replacement);
          break;
        }
        case "extra-space":
          result.push(chars[i], " ");
          break;
      }
    }

    setOutput(result.join(""));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "errored-text.txt"; a.click(); };

  const errorLabels: Record<ErrorType, string> = {
    swap: "Swap adjacent letters",
    double: "Double letters",
    missing: "Missing letters",
    wrong: "Wrong letters",
    "extra-space": "Extra spaces",
  };

  const faqs = [
    { question: "What types of errors can I introduce?", answer: "You can swap adjacent letters, double letters, remove letters, replace with wrong letters, and insert extra spaces." },
    { question: "How does the error rate work?", answer: "The error rate (1–50%) controls the probability that each letter in your text will be affected. Higher rates produce more errors." },
    { question: "Can I select which error types to apply?", answer: "Yes. Use the checkboxes to enable or disable each error type. Only enabled types will be applied." },
    { question: "What is this tool useful for?", answer: "It's perfect for testing spell-checkers, OCR error correction, fuzzy search algorithms, and natural-language-processing pipelines." },
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
            <span className="text-white">Add Random Errors</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Add Random Errors to Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Introduce realistic typos and errors into your text. Perfect for testing spell-checkers and text processing.</p>
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

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Error Rate: {errorRate}%</label>
            <input type="range" min={1} max={50} value={errorRate} onChange={(e) => setErrorRate(Number(e.target.value))} className="w-full max-w-sm accent-violet-600" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Error Types</label>
            <div className="flex flex-wrap gap-4">
              {(Object.keys(errorLabels) as ErrorType[]).map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={errorTypes[type]} onChange={() => toggleError(type)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                  {errorLabels[type]}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={addErrors} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Shuffle className="h-4 w-4 flex-shrink-0" /><span>Add Errors</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Text with random errors will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="add-random-errors" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
