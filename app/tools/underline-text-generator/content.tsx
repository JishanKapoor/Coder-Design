"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Underline } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

type UnderlineStyle = "single" | "double";

function addUnderline(text: string, style: UnderlineStyle): string {
  const combiner = style === "double" ? "\u0333" : "\u0332";
  return Array.from(text)
    .map((ch) => ch + combiner)
    .join("");
}

export default function UnderlineTextGeneratorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<UnderlineStyle>("single");

  const generate = (text?: string, s?: UnderlineStyle) => {
    const src = text ?? input;
    const st = s ?? style;
    if (!src) { setOutput(""); return; }
    setOutput(addUnderline(src, st));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "underline-text.txt"; a.click(); };

  const faqs = [
    { question: "How does Unicode underline work?", answer: "The combining underline character (U+0332) is placed after each character in your text. Renderers draw a continuous underline beneath the text. The double underline uses U+0333 for a heavier effect." },
    { question: "Where can I use underlined text?", answer: "Unicode underlined text works on social media (Instagram, Twitter/X, Facebook, TikTok), messaging apps, bios, comments, and anywhere that accepts plain text." },
    { question: "What's the difference between single and double underline?", answer: "Single underline (U+0332) adds one line beneath each character. Double underline (U+0333) adds a thicker double-line effect beneath each character." },
    { question: "Will the underline look continuous?", answer: "In most fonts and platforms, the combining underline renders as a continuous line. However, some fonts may show slight gaps between characters." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — no data is sent to any server." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-purple-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} /></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Underline Text Generator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Underline Text Generator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Add underline to any text using Unicode combining characters. Works on social media and plain text fields.</p>
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
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your text here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors" />
          </div>

          {/* Style Selector */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">Style</label>
            <div className="flex flex-wrap gap-2">
              {([
                { value: "single" as const, label: "S\u0332i\u0332n\u0332g\u0332l\u0332e\u0332", desc: "Single Underline (U+0332)" },
                { value: "double" as const, label: "D\u0333o\u0333u\u0333b\u0333l\u0333e\u0333", desc: "Double Underline (U+0333)" },
              ]).map((s) => (
                <button key={s.value} onClick={() => { setStyle(s.value); if (input) generate(input, s.value); }} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${style === s.value ? "border-purple-300 bg-purple-50 text-purple-700" : "border-slate-200 bg-white text-slate-600 hover:border-purple-200"}`}>{s.label}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={() => generate()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full sm:w-auto whitespace-nowrap"><Underline className="h-4 w-4 flex-shrink-0" /><span>Underline Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Underlined text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-purple-300 hover:text-purple-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-purple-300 hover:text-purple-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
          </div>

          {/* Live Preview */}
          {output && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Live Preview</h3>
              <p className="text-lg leading-relaxed text-slate-900 break-all">{output}</p>
            </div>
          )}
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Generate Underlined Unicode Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Add underlines to text for social media and messaging.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Your Text", description: "Type or paste the text you want to underline." },
              { step: 2, title: "Click Convert", description: "Press the button to add Unicode underline marks to each character." },
              { step: 3, title: "Preview the Result", description: "See how your underlined text looks in the output box." },
              { step: 4, title: "Copy and Paste", description: "Copy the underlined text and use it on any platform." },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">{item.step}</div>
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Underline Text Generator?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Create underlined text that works in plain text fields.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Processing", description: "Underline text is generated instantly using Unicode combining characters." },
              { icon: Shield, title: "100% Private", description: "Your text never leaves your browser. No data is stored or transmitted." },
              { icon: Globe, title: "Cross-Platform", description: "Works on social media, messaging apps, emails, and more." },
              { icon: Underline, title: "True Underline", description: "Uses Unicode combining underline marks, not HTML or CSS." },
              { icon: Copy, title: "One-Click Copy", description: "Copy or download your underlined text with a single click." },
              { icon: Zap, title: "No Sign-Up", description: "Start using the tool immediately — no account needed." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-purple-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <f.icon className="h-6 w-6 text-purple-600" />
                </div>
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how underlined Unicode text is used across platforms.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Social Media Emphasis", before: "Important update", after: "I̲m̲p̲o̲r̲t̲a̲n̲t̲ u̲p̲d̲a̲t̲e̲" },
              { title: "Bio Styling", before: "CEO & Founder", after: "C̲E̲O̲ &̲ F̲o̲u̲n̲d̲e̲r̲" },
              { title: "Highlight Keywords", before: "Free shipping today", after: "F̲r̲e̲e̲ s̲h̲i̲p̲p̲i̲n̲g̲ t̲o̲d̲a̲y̲" },
              { title: "Title Formatting", before: "Chapter One", after: "C̲h̲a̲p̲t̲e̲r̲ O̲n̲e̲" },
            ].map((uc) => (
              <div key={uc.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-start gap-4 border-b border-slate-100 px-6 py-4 sm:px-7 sm:py-5">
                  <h3 className="text-base font-semibold text-slate-900">{uc.title}</h3>
                </div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p>
                    <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-700 font-mono p-3 bg-white rounded-lg">{uc.before}</pre>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Output</p>
                    <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-emerald-800 font-mono p-3 bg-emerald-100 rounded-lg">{uc.after}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="underline-text-generator" />
      <ToolCta theme="purple" />
      <FooterSection />
    </div>
  );
}
