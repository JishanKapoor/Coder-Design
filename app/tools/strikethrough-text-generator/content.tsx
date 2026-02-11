"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Strikethrough } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

type StrikeStyle = "long" | "short";

function addStrikethrough(text: string, style: StrikeStyle): string {
  const combiner = style === "short" ? "\u0335" : "\u0336";
  return Array.from(text)
    .map((ch) => ch + combiner)
    .join("");
}

export default function StrikethroughTextGeneratorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<StrikeStyle>("long");

  const generate = (text?: string, s?: StrikeStyle) => {
    const src = text ?? input;
    const st = s ?? style;
    if (!src) { setOutput(""); return; }
    setOutput(addStrikethrough(src, st));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "strikethrough-text.txt"; a.click(); };

  const faqs = [
    { question: "How does Unicode strikethrough work?", answer: "The combining long stroke overlay (U+0336) is placed after each character, causing renderers to draw a horizontal line through the middle of each character. The short stroke (U+0335) creates a shorter crossbar." },
    { question: "Where can I use strikethrough text?", answer: "Unicode strikethrough works on social media (Instagram, Twitter/X, Facebook, TikTok), messaging apps, bios, comments, emails, and anywhere that accepts plain text." },
    { question: "What's the difference between long and short stroke?", answer: "Long stroke overlay (U+0336) draws a line that extends the full width of the character. Short stroke (U+0335) draws a shorter line through the center, which looks more like a tilde overlay." },
    { question: "Is this the same as HTML strikethrough?", answer: "No. HTML strikethrough uses the <del> or <s> tags which only work in HTML contexts. Unicode strikethrough uses combining characters that work in plain text everywhere." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — no data is sent to any server." },
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
            <span className="text-white">Strikethrough Text Generator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Strikethrough Text Generator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Cross out text using Unicode combining characters. Create strikethrough text for social media and messaging.</p>
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
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your text here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          {/* Style Selector */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">Style</label>
            <div className="flex flex-wrap gap-2">
              {([
                { value: "long" as const, label: "L\u0336o\u0336n\u0336g\u0336 S\u0336t\u0336r\u0336o\u0336k\u0336e\u0336", desc: "Long Stroke (U+0336)" },
                { value: "short" as const, label: "S\u0335h\u0335o\u0335r\u0335t\u0335 S\u0335t\u0335r\u0335o\u0335k\u0335e\u0335", desc: "Short Stroke (U+0335)" },
              ]).map((s) => (
                <button key={s.value} onClick={() => { setStyle(s.value); if (input) generate(input, s.value); }} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${style === s.value ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>{s.label}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => generate()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Strikethrough className="h-4 w-4 flex-shrink-0" /><span>Strikethrough</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Strikethrough text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="absolute right-2 top-2 flex gap-1.5">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
            </div>
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Generate Strikethrough Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Cross out text for social media and messaging in seconds.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Your Text", description: "Type or paste text you want to cross out." },
              { step: 2, title: "Click Convert", description: "Press the button to apply Unicode strikethrough marks." },
              { step: 3, title: "Preview the Result", description: "See the crossed-out text in the output box." },
              { step: 4, title: "Copy and Share", description: "Copy strikethrough text and paste it anywhere you like." },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">{item.step}</div>
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
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Strikethrough Text Generator?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Create crossed-out text that works in plain text fields.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Conversion", description: "Generate strikethrough text immediately using Unicode combining marks." },
              { icon: Shield, title: "Fully Private", description: "Everything runs in your browser. No data is ever sent to a server." },
              { icon: Globe, title: "Works Everywhere", description: "Strikethrough text displays on social media, messages, and more." },
              { icon: Strikethrough, title: "Real Strikethrough", description: "Uses Unicode combining long stroke overlay, not HTML tags." },
              { icon: Copy, title: "Copy or Download", description: "One-click copy to clipboard or download as a text file." },
              { icon: Zap, title: "No Account Needed", description: "Use it instantly without any sign-up or registration." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-violet-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                  <f.icon className="h-6 w-6 text-violet-600" />
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
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how strikethrough Unicode text is used.</p>
          </div>
          <div className="space-y-4">
            {[
              { title: "Show Price Changes", before: "$99.99\n$49.99", after: "$̶9̶9̶.̶9̶9̶\n$49.99" },
              { title: "Humor in Posts", before: "I love Mondays", after: "I̶ ̶l̶o̶v̶e̶ ̶M̶o̶n̶d̶a̶y̶s̶" },
              { title: "Corrections", before: "Meet at 3pm\nMeet at 4pm", after: "M̶e̶e̶t̶ ̶a̶t̶ ̶3̶p̶m̶\nMeet at 4pm" },
              { title: "Task Completion", before: "Buy groceries\nClean house", after: "B̶u̶y̶ ̶g̶r̶o̶c̶e̶r̶i̶e̶s̶\nClean house" },
            ].map((uc) => (
              <div key={uc.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3.5">
                  <h3 className="text-sm font-semibold text-slate-900">{uc.title}</h3>
                </div>
                <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 divide-slate-100">
                  <div className="px-5 py-3">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p>
                    <pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-slate-600 font-mono">{uc.before}</pre>
                  </div>
                  <div className="px-5 py-3 bg-green-50/50">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-green-600">Output</p>
                    <pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-green-800 font-mono">{uc.after}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="strikethrough-text-generator" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
