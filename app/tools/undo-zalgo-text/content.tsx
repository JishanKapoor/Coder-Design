"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Sparkles } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Comprehensive regex to strip combining diacritical marks & zero-width chars ── */
const COMBINING_REGEX = /[\u0300-\u036F\u0483-\u0489\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE00-\uFE0F\uFE20-\uFE2F\u200B-\u200F\u2028-\u202F\u2060-\u206F\uFEFF]/g;

function cleanZalgo(text: string): string {
  return text.replace(COMBINING_REGEX, "");
}

export default function UndoZalgoTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const clean = () => {
    if (!input) { setOutput(""); return; }
    setOutput(cleanZalgo(input));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "cleaned-text.txt"; a.click(); };

  const faqs = [
    { question: "What does this tool remove?", answer: "It strips all Unicode combining diacritical marks (U+0300–U+036F, U+0483–U+0489, U+1AB0–U+1AFF, U+1DC0–U+1DFF, U+20D0–U+20FF), variation selectors, and zero-width characters that create the Zalgo glitch effect." },
    { question: "Will it remove accented characters?", answer: "It removes combining marks applied on top of base characters. Pre-composed accented characters like é (U+00E9) are left intact. If your text uses combining sequences for legitimate accents, those marks will also be removed." },
    { question: "Can I paste Zalgo text directly?", answer: "Yes! Simply paste the corrupted Zalgo text into the input field and click Clean Text. The tool will instantly strip all combining marks and return the clean base text." },
    { question: "Does it remove zero-width characters too?", answer: "Yes. The tool also removes zero-width spaces, joiners, non-joiners, and other invisible Unicode characters that may be hiding in the text." },
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
            <span className="text-white">Undo Zalgo Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Undo Zalgo Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Remove Zalgo effect and combining diacritical marks from corrupted Unicode text. Clean up glitchy text instantly.</p>
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
            <label className="mb-2 block text-sm font-semibold text-slate-900">Paste Zalgo Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your Zalgo / corrupted text here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={clean} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full sm:w-auto whitespace-nowrap"><Sparkles className="h-4 w-4 flex-shrink-0" /><span>Clean Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Cleaned Output</label>
              <textarea value={output} readOnly placeholder="Clean text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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

      {/* How-To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">How to Remove Zalgo Text</h2>
            <p className="mt-3 text-slate-600">Clean corrupted text in four simple steps.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: "1", title: "Paste Zalgo Text", desc: "Paste the corrupted or glitchy text in the input box." },
              { step: "2", title: "Click Clean", desc: "Press the button to strip all combining marks from the text." },
              { step: "3", title: "Review the Output", desc: "See the clean, readable text in the output area." },
              { step: "4", title: "Copy Clean Text", desc: "Copy the cleaned text and use it wherever you need." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">{s.step}</div>
                <h3 className="mb-1 font-semibold text-slate-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Zalgo Text Remover?</h2>
            <p className="mt-3 text-slate-600">Restore corrupted text to its clean, readable form.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Zap className="h-5 w-5" />, title: "Instant Cleaning", desc: "Remove all Zalgo combining marks from text in milliseconds." },
              { icon: <Shield className="h-5 w-5" />, title: "100% Private", desc: "Your text is processed locally — nothing is stored or sent." },
              { icon: <Globe className="h-5 w-5" />, title: "Works with Any Text", desc: "Handles all levels of Zalgo corruption regardless of intensity." },
              { icon: <Sparkles className="h-5 w-5" />, title: "Complete Restoration", desc: "Strips all combining characters while preserving the base text." },
              { icon: <Copy className="h-5 w-5" />, title: "Easy Copy", desc: "Copy your cleaned text with one click or download it." },
              { icon: <Zap className="h-5 w-5" />, title: "No Sign-Up", desc: "Use immediately without creating an account." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-purple-200 hover:shadow-lg">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">{f.icon}</div>
                <h3 className="mb-1 font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">Use Cases</h2>
            <p className="mt-3 text-slate-600">See how the Zalgo remover restores corrupted text.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Clean Pasted Text", before: "H̸̡̎ë̵̩l̷̛̗l̴̢̎ö̸̧", after: "Hello" },
              { title: "Fix Corrupted Names", before: "J̶̨̈́o̷̻̽h̸̲̄ṉ̴̛", after: "John" },
              { title: "Restore Messages", before: "G̵̰̑ő̸̝ǫ̶̈d̷̞̀ m̸̡̈́ö̵̜r̴̛̮n̸̝̊ī̵̹n̶̗̆g̸̱̈́", after: "Good morning" },
              { title: "Clean Forum Posts", before: "Ẅ̷̱́h̸̜̾a̵̡̔t̶̰̑?", after: "What?" },
            ].map((uc, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-3">
                  <h3 className="font-semibold text-slate-900">{uc.title}</h3>
                </div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div className="border-r border-slate-100 px-5 py-3">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Input</span>
                    <p className="text-sm text-slate-700">{uc.before}</p>
                  </div>
                  <div className="px-5 py-3">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Output</span>
                    <p className="text-sm text-slate-700">{uc.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="undo-zalgo-text" />
      <ToolCta theme="purple" />
      <FooterSection />
    </div>
  );
}
