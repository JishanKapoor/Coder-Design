"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Replace, Plus, X } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

interface ReplacementPair {
  id: number;
  find: string;
  replace: string;
}

export default function WordReplacerTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(true);
  const [pairs, setPairs] = useState<ReplacementPair[]>([
    { id: 1, find: "", replace: "" },
  ]);
  const [nextId, setNextId] = useState(2);

  const addPair = () => {
    setPairs((prev) => [...prev, { id: nextId, find: "", replace: "" }]);
    setNextId((n) => n + 1);
  };

  const removePair = (id: number) => {
    if (pairs.length <= 1) return;
    setPairs((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePair = (id: number, field: "find" | "replace", value: string) => {
    setPairs((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const replaceWords = () => {
    if (!input.trim()) { setOutput(""); return; }
    let result = input;
    pairs.forEach(({ find, replace: rep }) => {
      if (!find) return;
      const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
      const flags = caseSensitive ? "g" : "gi";
      result = result.replace(new RegExp(pattern, flags), rep);
    });
    setOutput(result);
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "replaced-text.txt"; a.click(); };

  const faqs = [
    { question: "Can I do multiple replacements at once?", answer: "Yes. Add as many find → replace pairs as you need. They are applied sequentially from top to bottom." },
    { question: "What does 'whole word match' mean?", answer: "When enabled, only complete words are matched. Searching for 'cat' won't affect 'category' or 'concatenate'." },
    { question: "Is the replacement case-sensitive?", answer: "By default it's case-insensitive. Toggle the case-sensitive option to match exact capitalisation only." },
    { question: "Does the order of replacements matter?", answer: "Yes. Replacements are applied from top to bottom. If a later rule matches text produced by an earlier rule, it will apply." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — nothing is sent to any server." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="relative overflow-hidden bg-blue-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} /></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Word Replacer</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Word Replacer</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Find and replace specific words in any text. Support for multiple replacements at once.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" />100% Private</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" />Instant</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />Any Device</span>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12 space-y-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste your text here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Replacements</label>
            <div className="space-y-2">
              {pairs.map((pair, idx) => (
                <div key={pair.id} className="flex items-center gap-2">
                  <span className="flex-shrink-0 text-xs font-medium text-slate-400 w-5 text-right">{idx + 1}.</span>
                  <input
                    type="text"
                    value={pair.find}
                    onChange={(e) => updatePair(pair.id, "find", e.target.value)}
                    placeholder="Find..."
                    className="h-10 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <span className="flex-shrink-0 text-xs font-medium text-slate-400">→</span>
                  <input
                    type="text"
                    value={pair.replace}
                    onChange={(e) => updatePair(pair.id, "replace", e.target.value)}
                    placeholder="Replace with..."
                    className="h-10 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    onClick={() => removePair(pair.id)}
                    disabled={pairs.length <= 1}
                    className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:border-red-300 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addPair} className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-600">
              <Plus className="h-3.5 w-3.5" />Add Replacement
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
            <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              Case sensitive
            </label>
            <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" checked={wholeWord} onChange={(e) => setWholeWord(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              Whole word match
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={replaceWords} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-auto whitespace-nowrap"><Replace className="h-4 w-4 flex-shrink-0" /><span>Replace Words</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setPairs([{ id: 1, find: "", replace: "" }]); setNextId(2); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Replaced text will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Replace Words in Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Find and replace multiple words at once.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Text", description: "Paste text with words to replace." },
              { step: 2, title: "Add Replacement Pairs", description: "Enter find→replace pairs." },
              { step: 3, title: "Click Replace", description: "Replace all matches instantly." },
              { step: 4, title: "Copy Result", description: "Copy or download the result." },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">{item.step}</div>
                <div><h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3><p className="text-sm leading-relaxed text-slate-600">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Word Replacer?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Find and replace multiple word pairs simultaneously.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Bulk Replace", description: "Replace multiple different words in a single operation." },
              { icon: Shield, title: "100% Private", description: "All processing happens in your browser." },
              { icon: Replace, title: "Multiple Pairs", description: "Define many find-and-replace pairs at once." },
              { icon: Globe, title: "Any Device", description: "Works on all modern browsers." },
              { icon: Copy, title: "Easy Export", description: "Copy or download your result." },
              { icon: Zap, title: "No Sign-Up", description: "Use immediately without any account." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-blue-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"><f.icon className="h-6 w-6 text-blue-600" /></div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how word replacement saves time.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Localization", before: "colour favourite", after: "color favorite" },
              { title: "Brand Rename", before: "OldCorp products", after: "NewBrand products" },
              { title: "Pronoun Switch", before: "he said his", after: "she said her" },
              { title: "Template Fill", before: "{name} {city}", after: "John Toronto" },
            ].map((uc) => (
              <div key={uc.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-start gap-4 border-b border-slate-100 px-6 py-4 sm:px-7 sm:py-5"><h3 className="text-base font-semibold text-slate-900">{uc.title}</h3></div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6"><p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p><pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-700 font-mono p-3 bg-white rounded-lg">{uc.before}</pre></div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6"><p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Output</p><pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-emerald-800 font-mono p-3 bg-emerald-100 rounded-lg">{uc.after}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="word-replacer" />
      <ToolCta theme="blue" />
      <FooterSection />
    </div>
  );
}
