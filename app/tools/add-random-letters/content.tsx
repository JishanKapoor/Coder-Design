"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Shuffle } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function AddRandomLettersTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [lettersPerWord, setLettersPerWord] = useState(1);
  const [position, setPosition] = useState<"random" | "start" | "middle" | "end">("random");
  const [letterType, setLetterType] = useState<"lowercase" | "uppercase" | "both">("lowercase");

  const getAlphabet = () => {
    if (letterType === "uppercase") return UPPERCASE;
    if (letterType === "both") return LOWERCASE + UPPERCASE;
    return LOWERCASE;
  };

  const randomChar = (alpha: string) => alpha[Math.floor(Math.random() * alpha.length)];

  const addLetters = () => {
    if (!input.trim()) { setOutput(""); return; }
    const alpha = getAlphabet();

    const result = input.replace(/\b\w+\b/g, (word) => {
      let modified = word;
      for (let i = 0; i < lettersPerWord; i++) {
        const ch = randomChar(alpha);
        if (position === "start") {
          modified = ch + modified;
        } else if (position === "end") {
          modified = modified + ch;
        } else if (position === "middle") {
          const mid = Math.floor(modified.length / 2);
          modified = modified.slice(0, mid) + ch + modified.slice(mid);
        } else {
          const pos = Math.floor(Math.random() * (modified.length + 1));
          modified = modified.slice(0, pos) + ch + modified.slice(pos);
        }
      }
      return modified;
    });

    setOutput(result);
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "random-letters-text.txt"; a.click(); };

  const faqs = [
    { question: "How many letters can I add per word?", answer: "You can add 1 to 5 random letters per word using the slider or input control." },
    { question: "Where are the letters inserted?", answer: "Choose from random positions within each word, the start, the middle, or the end of each word." },
    { question: "Can I choose uppercase or lowercase letters?", answer: "Yes. You can select lowercase only, uppercase only, or a mix of both." },
    { question: "What is this tool useful for?", answer: "It's perfect for testing typo-tolerance in search engines, spell-checkers, fuzzy matching algorithms, and OCR software." },
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
            <span className="text-white">Add Random Letters</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Add Random Letters to Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Insert random letters into words in your text. Useful for testing typo-tolerance and text corruption.</p>
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

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Letters per Word</label>
              <input type="number" min={1} max={5} value={lettersPerWord} onChange={(e) => setLettersPerWord(Math.max(1, Math.min(5, Number(e.target.value))))} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Position in Word</label>
              <select value={position} onChange={(e) => setPosition(e.target.value as typeof position)} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                <option value="random">Random</option>
                <option value="start">Start</option>
                <option value="middle">Middle</option>
                <option value="end">End</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Letter Type</label>
              <select value={letterType} onChange={(e) => setLetterType(e.target.value as typeof letterType)} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                <option value="lowercase">Lowercase</option>
                <option value="uppercase">Uppercase</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={addLetters} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Shuffle className="h-4 w-4 flex-shrink-0" /><span>Add Letters</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Text with random letters will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="add-random-letters" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
