"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Copy, Trash2, Check, Download, Zap, Shield, Globe, Scissors } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function SliceTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"position" | "regex">("position");
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(100);
  const [pattern, setPattern] = useState("");
  const [regexError, setRegexError] = useState("");
  const [copied, setCopied] = useState(false);

  const sliceText = () => {
    if (!input) { setOutput(""); return; }
    if (mode === "position") {
      const start = Math.max(0, startIdx);
      const end = endIdx <= 0 ? undefined : endIdx;
      setOutput(input.slice(start, end));
      setRegexError("");
    } else {
      try {
        const re = new RegExp(pattern, "g");
        const matches = input.match(re);
        if (matches && matches.length > 0) {
          setOutput(matches.join("\n"));
        } else {
          setOutput("(No matches found)");
        }
        setRegexError("");
      } catch (err) {
        setRegexError(err instanceof Error ? err.message : "Invalid regex");
        setOutput("");
      }
    }
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "sliced-text.txt"; a.click(); };

  const faqs = [
    { question: "What is the difference between position mode and regex mode?", answer: "Position mode extracts a substring between a start and end character index. Regex mode finds and extracts all matches of a regular expression pattern." },
    { question: "Are the position indices zero-based?", answer: "Yes. The start index is zero-based (0 = first character). The end index is exclusive, just like JavaScript's String.slice()." },
    { question: "What happens if the end index is 0 or empty?", answer: "If the end index is 0, the tool slices from the start index to the end of the text." },
    { question: "Can I use regex flags?", answer: "The global flag (g) is automatically applied so all matches are returned. For case-insensitive matching, use (?i) in your pattern." },
    { question: "Is my data private?", answer: "Yes. All processing happens entirely in your browser. No data is sent to any server." },
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
            <span className="text-white">Slice Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Slice Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Slice text by character position or regex pattern. Extract specific portions of your text instantly — perfect for data parsing and text manipulation.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste the text you want to slice..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Mode</label>
              <select value={mode} onChange={(e) => { setMode(e.target.value as "position" | "regex"); setRegexError(""); }} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                <option value="position">By Position</option>
                <option value="regex">By Regex</option>
              </select>
            </div>
            {mode === "position" ? (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Start index</label>
                  <input type="number" min={0} value={startIdx} onChange={(e) => setStartIdx(parseInt(e.target.value) || 0)} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">End index <span className="text-slate-400">(0 = end)</span></label>
                  <input type="number" min={0} value={endIdx} onChange={(e) => setEndIdx(parseInt(e.target.value) || 0)} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
                </div>
              </>
            ) : (
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Regex pattern</label>
                <input type="text" value={pattern} onChange={(e) => { setPattern(e.target.value); setRegexError(""); }} placeholder="e.g. \\d+" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
                {regexError && <p className="mt-1 text-xs text-red-500">{regexError}</p>}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={sliceText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Scissors className="h-4 w-4 flex-shrink-0" /><span>Slice Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setRegexError(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Sliced text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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

      {/* ── How-To Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Slice Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Extract a portion of text by position.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Text", description: "Paste text to slice." },
              { step: 2, title: "Set Range", description: "Choose start and end positions." },
              { step: 3, title: "Click Slice", description: "Extract the text portion." },
              { step: 4, title: "Copy Result", description: "Copy or download." },
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

      {/* ── Features Section ── */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Text Slicer?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Extract precise text portions by character or line.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Slicing", description: "Slice text in one click." },
              { icon: Shield, title: "100% Private", description: "No data leaves your browser." },
              { icon: Scissors, title: "Precise Ranges", description: "Set exact start and end positions." },
              { icon: Globe, title: "Any Device", description: "Works everywhere." },
              { icon: Copy, title: "Easy Export", description: "Copy sliced text." },
              { icon: Zap, title: "No Sign-Up", description: "No account needed." },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-violet-200 hover:shadow-lg">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                    <Icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Use Cases Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how text slicing is used.</p>
          </div>
          <div className="space-y-4">
            {[
              { title: "Extract Substring", input: "Hello World\n(start: 0, end: 5)", output: "Hello" },
              { title: "Get First Line", input: "Line 1\nLine 2\nLine 3\n(start: 0, end: 6)", output: "Line 1" },
              { title: "Trim Prefix", input: "PREFIX_data_here\n(start: 7)", output: "data_here" },
              { title: "Extract Middle", input: "abcdefghij\n(start: 3, end: 7)", output: "defg" },
            ].map((useCase) => (
              <div key={useCase.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
                  <h3 className="text-sm font-semibold text-slate-900">{useCase.title}</h3>
                </div>
                <div className="grid gap-4 p-6 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">Input</div>
                    <pre className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 overflow-x-auto">{useCase.input}</pre>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">Output</div>
                    <pre className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 overflow-x-auto">{useCase.output}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="slice-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
