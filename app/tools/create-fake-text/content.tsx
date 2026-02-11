"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Palette } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* Homoglyph map: ASCII to visually similar Unicode (mostly Cyrillic) */
const HOMOGLYPHS: Record<string, string> = {
  a: "\u0430", e: "\u0435", o: "\u043E", p: "\u0440",
  c: "\u0441", x: "\u0445", i: "\u0456", s: "\u0455",
  y: "\u0443",
  A: "\u0410", E: "\u0415", O: "\u041E", P: "\u0420",
  C: "\u0421", X: "\u0425", I: "\u0406", S: "\u0405",
  T: "\u0422", H: "\u041D", B: "\u0412", M: "\u041C",
  K: "\u041A",
};

/* Zero-width characters */
const ZW_SPACE = "\u200B";   // zero-width space
const ZW_JOINER = "\u200D";  // zero-width joiner
const ZW_NON_JOINER = "\u200C"; // zero-width non-joiner

export default function CreateFakeTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [replacePercent, setReplacePercent] = useState(50);
  const [useHomoglyphs, setUseHomoglyphs] = useState(true);
  const [useZeroWidth, setUseZeroWidth] = useState(false);

  const createFakeText = () => {
    if (!input.trim()) { setOutput(""); return; }

    const chars = input.split("");
    const result: string[] = [];

    for (let i = 0; i < chars.length; i++) {
      let ch = chars[i];

      // Homoglyph replacement
      if (useHomoglyphs && HOMOGLYPHS[ch] && Math.random() * 100 < replacePercent) {
        ch = HOMOGLYPHS[ch];
      }

      result.push(ch);

      // Zero-width insertion between characters
      if (useZeroWidth && i < chars.length - 1 && Math.random() * 100 < replacePercent) {
        const zwChars = [ZW_SPACE, ZW_JOINER, ZW_NON_JOINER];
        result.push(zwChars[Math.floor(Math.random() * zwChars.length)]);
      }
    }

    setOutput(result.join(""));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "fake-text.txt"; a.click(); };

  const faqs = [
    { question: "What are Unicode homoglyphs?", answer: "Homoglyphs are characters from different Unicode scripts that look identical or nearly identical to common Latin letters. For example, the Cyrillic 'а' (U+0430) looks the same as the Latin 'a' (U+0061) but is a completely different character." },
    { question: "What are zero-width characters?", answer: "Zero-width characters are invisible Unicode characters that take up no visible space. They include zero-width space (U+200B), zero-width joiner (U+200D), and zero-width non-joiner (U+200C). They can be inserted between characters without changing appearance." },
    { question: "Why would someone create fake text?", answer: "This tool is educational — it demonstrates how Unicode can be exploited for phishing, plagiarism detection evasion, and bypassing text filters. Understanding this helps developers build better security and detection systems." },
    { question: "Can this bypass plagiarism checkers?", answer: "Some basic plagiarism checkers may not detect homoglyph-substituted text. However, modern tools are increasingly aware of these techniques. This tool helps highlight why better detection is needed." },
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
            <span className="text-white">Create Fake Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Create Fake Text with Unicode</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Generate deceptive text using invisible Unicode characters and homoglyphs that looks normal but contains hidden characters.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste your text here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          {/* Options */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Options</h3>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={useHomoglyphs} onChange={(e) => setUseHomoglyphs(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                Homoglyph Replacement
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={useZeroWidth} onChange={(e) => setUseZeroWidth(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                Zero-Width Insertion
              </label>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Replacement Rate: {replacePercent}%</label>
              <input type="range" min={5} max={100} step={5} value={replacePercent} onChange={(e) => setReplacePercent(Number(e.target.value))} className="w-full accent-violet-600" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={createFakeText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Palette className="h-4 w-4 flex-shrink-0" /><span>Create Fake Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Fake text will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="absolute right-2 top-2 flex gap-1.5">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
            </div>
          </div>

          {output && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500 space-y-1">
              <p><strong>Original length:</strong> {input.length} characters</p>
              <p><strong>Output length:</strong> {output.length} characters</p>
              <p><strong>Hidden characters added:</strong> {output.length - input.length}</p>
            </div>
          )}
        </div>
      </section>

      {/* How-To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">How to Create Fake Unicode Text</h2>
            <p className="mt-3 text-slate-600">Generate deceptive text with Unicode homoglyphs.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: "1", title: "Enter Your Text", desc: "Type or paste the text you want to disguise." },
              { step: "2", title: "Click Generate", desc: "Press the button to replace characters with visually similar Unicode alternatives." },
              { step: "3", title: "Preview the Result", desc: "See the fake text that looks identical but uses different code points." },
              { step: "4", title: "Copy and Use", desc: "Copy the text for testing content filters, security research, or fun." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">{s.step}</div>
                <h3 className="mb-1 font-semibold text-slate-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Fake Unicode Text Generator?</h2>
            <p className="mt-3 text-slate-600">Create text with lookalike characters for testing and research.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Zap className="h-5 w-5" />, title: "Instant Generation", desc: "Create fake Unicode text instantly using homoglyph substitution." },
              { icon: <Shield className="h-5 w-5" />, title: "100% Private", desc: "All processing happens locally in your browser." },
              { icon: <Globe className="h-5 w-5" />, title: "Educational Tool", desc: "Learn about Unicode homoglyphs and character spoofing." },
              { icon: <Palette className="h-5 w-5" />, title: "Visual Deception", desc: "Text looks identical to the eye but uses entirely different code points." },
              { icon: <Copy className="h-5 w-5" />, title: "One-Click Copy", desc: "Copy or download your fake text with a single click." },
              { icon: <Zap className="h-5 w-5" />, title: "No Account Needed", desc: "Use the tool instantly without any registration." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-violet-200 hover:shadow-lg">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">{f.icon}</div>
                <h3 className="mb-1 font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">Use Cases</h2>
            <p className="mt-3 text-slate-600">See how fake Unicode text is used for testing and security.</p>
          </div>
          <div className="space-y-4">
            {[
              { title: "Content Filter Testing", before: "Hello World", after: "Ηеllο Wοrld" },
              { title: "Security Research", before: "admin", after: "аdmіn" },
              { title: "Phishing Awareness", before: "google.com", after: "gооgle.cоm" },
              { title: "Homoglyph Demo", before: "password", after: "pаsswоrd" },
            ].map((uc, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-5 py-3">
                  <h3 className="font-semibold text-slate-900">{uc.title}</h3>
                </div>
                <div className="grid sm:grid-cols-2">
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
      <RelatedTools currentSlug="create-fake-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
