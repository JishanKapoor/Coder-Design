"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, ArrowLeftRight } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function ReverseParagraphsTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const flipParagraphs = () => {
    if (!input.trim()) { setOutput(""); return; }
    const paragraphs = input.split(/\n\s*\n/).filter((p) => p.trim());
    setOutput(paragraphs.reverse().join("\n\n"));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "reversed-paragraphs.txt"; a.click(); };

  const faqs = [
    { question: "How are paragraphs detected?", answer: "Paragraphs are separated by one or more blank lines (double newlines). Each block of text between blank lines is treated as a paragraph." },
    { question: "What if my text has no blank lines?", answer: "If there are no blank lines, the entire text is treated as one paragraph and the output will be the same as the input." },
    { question: "Does it preserve formatting within paragraphs?", answer: "Yes. The content inside each paragraph is left untouched — only the order of paragraphs is reversed." },
    { question: "Can I use this for essays or articles?", answer: "Absolutely. It's useful for restructuring documents, rearranging sections, or creative writing experiments." },
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
            <span className="text-white">Reverse Paragraphs</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Reverse Paragraphs</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Reverse the order of entire paragraphs in your text. Paragraphs separated by blank lines. Free, private, instant.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text with multiple paragraphs (separated by blank lines)..." rows={8} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={flipParagraphs} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><ArrowLeftRight className="h-4 w-4 flex-shrink-0" /><span>Flip Paragraphs</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Reversed paragraphs will appear here..." rows={8} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Reverse Paragraph Order</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Flip the order of paragraphs in your text.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Your Text", description: "Paste text containing multiple paragraphs separated by blank lines." },
              { step: 2, title: "Click Reverse", description: "Press the button to reverse the paragraph order." },
              { step: 3, title: "Review Output", description: "See paragraphs in reversed order." },
              { step: 4, title: "Copy the Result", description: "Copy or download the reversed text." },
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Paragraph Reverser?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Reorder paragraphs quickly for writing and editing.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Reversal", description: "Reverse paragraph order in milliseconds." },
              { icon: Shield, title: "100% Private", description: "No data leaves your browser — everything is processed locally." },
              { icon: ArrowLeftRight, title: "Paragraph Detection", description: "Detects paragraphs separated by blank lines." },
              { icon: Globe, title: "Any Device", description: "Works on desktop, tablet, and mobile." },
              { icon: Copy, title: "Easy Export", description: "Copy or download with one click." },
              { icon: Zap, title: "No Sign-Up", description: "Use immediately without any account." },
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how paragraph reversal is used.</p>
          </div>
          <div className="space-y-4">
            {[
              { title: "Blog Restructuring", before: "Introduction...\n\nBody...\n\nConclusion...", after: "Conclusion...\n\nBody...\n\nIntroduction..." },
              { title: "Reverse Chronology", before: "2020 events...\n\n2021 events...\n\n2022 events...", after: "2022 events...\n\n2021 events...\n\n2020 events..." },
              { title: "Story Inversion", before: "Chapter 1...\n\nChapter 2...\n\nChapter 3...", after: "Chapter 3...\n\nChapter 2...\n\nChapter 1..." },
              { title: "List Reordering", before: "First item...\n\nSecond item...\n\nThird item...", after: "Third item...\n\nSecond item...\n\nFirst item..." },
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
      <RelatedTools currentSlug="reverse-paragraphs" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
