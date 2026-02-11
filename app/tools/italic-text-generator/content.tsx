"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Italic, Type } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Mathematical Italic character maps (U+1D434 onwards) ── */
const ITALIC_UPPER: Record<string, string> = {
  A: "\uD835\uDC34", B: "\uD835\uDC35", C: "\uD835\uDC36", D: "\uD835\uDC37",
  E: "\uD835\uDC38", F: "\uD835\uDC39", G: "\uD835\uDC3A", H: "\uD835\uDC3B",
  I: "\uD835\uDC3C", J: "\uD835\uDC3D", K: "\uD835\uDC3E", L: "\uD835\uDC3F",
  M: "\uD835\uDC40", N: "\uD835\uDC41", O: "\uD835\uDC42", P: "\uD835\uDC43",
  Q: "\uD835\uDC44", R: "\uD835\uDC45", S: "\uD835\uDC46", T: "\uD835\uDC47",
  U: "\uD835\uDC48", V: "\uD835\uDC49", W: "\uD835\uDC4A", X: "\uD835\uDC4B",
  Y: "\uD835\uDC4C", Z: "\uD835\uDC4D",
};

const ITALIC_LOWER: Record<string, string> = {
  a: "\uD835\uDC4E", b: "\uD835\uDC4F", c: "\uD835\uDC50", d: "\uD835\uDC51",
  e: "\uD835\uDC52", f: "\uD835\uDC53", g: "\uD835\uDC54", h: "\u210E",
  i: "\uD835\uDC56", j: "\uD835\uDC57", k: "\uD835\uDC58", l: "\uD835\uDC59",
  m: "\uD835\uDC5A", n: "\uD835\uDC5B", o: "\uD835\uDC5C", p: "\uD835\uDC5D",
  q: "\uD835\uDC5E", r: "\uD835\uDC5F", s: "\uD835\uDC60", t: "\uD835\uDC61",
  u: "\uD835\uDC62", v: "\uD835\uDC63", w: "\uD835\uDC64", x: "\uD835\uDC65",
  y: "\uD835\uDC66", z: "\uD835\uDC67",
};

function toItalic(text: string): string {
  return Array.from(text)
    .map((ch) => ITALIC_UPPER[ch] || ITALIC_LOWER[ch] || ch)
    .join("");
}

export default function ItalicTextGeneratorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!input) { setOutput(""); return; }
    setOutput(toItalic(input));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "italic-text.txt"; a.click(); };

  const faqs = [
    { question: "How does italic Unicode text work?", answer: "Unicode includes a set of 'Mathematical Italic' characters that look like italic Latin letters. These are distinct code points (e.g., 𝐴 is U+1D434) that render as italic in most fonts and platforms, even in plain text fields." },
    { question: "Where can I use italic Unicode text?", answer: "Italic Unicode text works on social media (Instagram, Twitter/X, Facebook, TikTok), messaging apps (WhatsApp, Telegram), bios, comments, and anywhere that accepts plain text but not HTML formatting." },
    { question: "Why does lowercase h look different?", answer: "The Mathematical Italic lowercase h (U+210E, ℎ) is part of the Letterlike Symbols block rather than the Mathematical Alphanumeric Symbols block, which is a Unicode standard quirk." },
    { question: "Will italic text work everywhere?", answer: "Most modern platforms and devices support these Unicode characters. However, some older systems or specific fonts may not render them correctly, showing boxes or question marks instead." },
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
            <span className="text-white">Italic Text Generator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Italic Text Generator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Convert text to italic Unicode characters that work on social media, bios, and anywhere plain text is used.</p>
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

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={generate} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full sm:w-auto whitespace-nowrap"><Italic className="h-4 w-4 flex-shrink-0" /><span>Make Italic</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Italic text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Generate Italic Unicode Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Create italic text for social media in just seconds.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Your Text", description: "Type or paste any text in the input box." },
              { step: 2, title: "Choose Italic Style", description: "Pick from Italic, Bold Italic, or Script Italic." },
              { step: 3, title: "Click Convert", description: "Press the button to generate italic Unicode text instantly." },
              { step: 4, title: "Copy Your Result", description: "Click Copy to grab your italic text and paste it anywhere." },
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Italic Text Generator?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Convert plain text to italic Unicode that works everywhere.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Results", description: "Convert text to italic Unicode characters instantly in your browser." },
              { icon: Shield, title: "Completely Private", description: "Your text stays on your device — nothing is uploaded to servers." },
              { icon: Globe, title: "Universal Compatibility", description: "Works on Instagram, Twitter, Facebook, WhatsApp, and all platforms." },
              { icon: Type, title: "Multiple Styles", description: "Choose regular italic, bold italic, or script italic styles." },
              { icon: Copy, title: "Easy Copy & Download", description: "One-click copy or download your italic text as a file." },
              { icon: Zap, title: "No Login Needed", description: "Use the tool right away without creating an account." },
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how people use italic Unicode text across platforms.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Instagram Bio", before: "Designer & Developer\nToronto, Canada", after: "𝐷𝑒𝑠𝑖𝑔𝑛𝑒𝑟 & 𝐷𝑒𝑣𝑒𝑙𝑜𝑝𝑒𝑟\n𝑇𝑜𝑟𝑜𝑛𝑡𝑜, 𝐶𝑎𝑛𝑎𝑑𝑎" },
              { title: "Emphasis in Posts", before: "This changes everything", after: "𝑇ℎ𝑖𝑠 𝑐ℎ𝑎𝑛𝑔𝑒𝑠 𝑒𝑣𝑒𝑟𝑦𝑡ℎ𝑖𝑛𝑔" },
              { title: "Quote Styling", before: "To be or not to be", after: "𝑇𝑜 𝑏𝑒 𝑜𝑟 𝑛𝑜𝑡 𝑡𝑜 𝑏𝑒" },
              { title: "Fancy Signatures", before: "With love, Sarah", after: "𝑊𝑖𝑡ℎ 𝑙𝑜𝑣𝑒, 𝑆𝑎𝑟𝑎ℎ" },
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
      <RelatedTools currentSlug="italic-text-generator" />
      <ToolCta theme="purple" />
      <FooterSection />
    </div>
  );
}
