"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Eraser } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function SentenceRemoverTool() {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const deleteSentences = () => {
    if (!input.trim()) { setOutput(""); return; }
    if (!keywords.trim()) { setOutput(input); return; }
    const kws = keywords.split(",").map((k) => k.trim()).filter(Boolean);
    const sentences = input.match(/[^.!?]+[.!?]+[\s]*/g) || [input];
    const kept = sentences.filter((s) => {
      const check = caseSensitive ? s : s.toLowerCase();
      return !kws.some((kw) => {
        const kwCheck = caseSensitive ? kw : kw.toLowerCase();
        return check.includes(kwCheck);
      });
    });
    setOutput(kept.map((s) => s.trim()).join(" "));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "filtered-text.txt"; a.click(); };

  const faqs = [
    { question: "How does the sentence remover work?", answer: "It splits your text into sentences (by .!?) and removes any sentence that contains one or more of your specified keywords." },
    { question: "How do I specify multiple keywords?", answer: "Enter keywords separated by commas. For example: 'error, warning, deprecated' will remove sentences containing any of those words." },
    { question: "Is the matching case-sensitive?", answer: "By default it's case-insensitive. Toggle the case-sensitive option to match exact capitalisation only." },
    { question: "What if a sentence has no terminator?", answer: "Text without sentence-ending punctuation is treated as a single sentence and will be checked against the keywords." },
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
            <span className="text-white">Sentence Remover</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Sentence Remover</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Remove sentences containing specific keywords or patterns from your text. Free, private, instant.</p>
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
            <label className="mb-2 block text-sm font-semibold text-slate-900">Keywords to Match</label>
            <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Enter comma-separated keywords: error, warning, deprecated..." className="w-full h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
              Case sensitive
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={deleteSentences} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Eraser className="h-4 w-4 flex-shrink-0" /><span>Delete Sentences</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setKeywords(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Filtered text will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Remove Sentences</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Delete sentences containing specific keywords.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Text", description: "Paste text with sentences." },
              { step: 2, title: "Specify Keywords", description: "Enter keywords to match." },
              { step: 3, title: "Click Remove", description: "Remove matching sentences." },
              { step: 4, title: "Copy Result", description: "Copy or download." },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">{item.step}</div>
                <div><h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3><p className="text-sm leading-relaxed text-slate-600">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Sentence Remover?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Remove unwanted sentences by keyword quickly.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Filtering", description: "Remove all matching sentences in one click." },
              { icon: Shield, title: "100% Private", description: "Processing happens locally." },
              { icon: Eraser, title: "Keyword-Based", description: "Remove sentences containing any specified keyword." },
              { icon: Globe, title: "Any Device", description: "Works on all browsers." },
              { icon: Copy, title: "Easy Export", description: "Copy or download." },
              { icon: Zap, title: "No Sign-Up", description: "Use immediately." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-violet-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100"><f.icon className="h-6 w-6 text-violet-600" /></div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how sentence removal cleans text.</p>
          </div>
          <div className="space-y-4">
            {[
              { title: "Remove Disclaimers", before: "Great product. Terms apply. Buy now.", after: "Great product. Buy now." },
              { title: "Filter Content", before: "Good review. Spam link. Nice item.", after: "Good review. Nice item." },
              { title: "Clean Transcripts", before: "Hello. Um. How are you?", after: "Hello. How are you?" },
              { title: "Remove Fillers", before: "So basically. The point is. Let me explain.", after: "The point is." },
            ].map((uc) => (
              <div key={uc.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3.5"><h3 className="text-sm font-semibold text-slate-900">{uc.title}</h3></div>
                <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 divide-slate-100">
                  <div className="px-5 py-3"><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p><pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-slate-600 font-mono">{uc.before}</pre></div>
                  <div className="px-5 py-3 bg-green-50/50"><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-green-600">Output</p><pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-green-800 font-mono">{uc.after}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="sentence-remover" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
