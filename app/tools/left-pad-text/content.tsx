"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Copy, Trash2, Check, Download, Zap, Shield, Globe, AlignLeft } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

export default function LeftPadTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [width, setWidth] = useState(40);
  const [padChar, setPadChar] = useState(" ");
  const [copied, setCopied] = useState(false);

  const leftPad = () => {
    if (!input) { setOutput(""); return; }
    const fill = padChar || " ";
    const lines = input.split("\n");
    const padded = lines.map((line) => {
      if (line.length >= width) return line;
      const needed = width - line.length;
      const repeated = fill.repeat(Math.ceil(needed / fill.length)).slice(0, needed);
      return repeated + line;
    });
    setOutput(padded.join("\n"));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "left-padded-text.txt"; a.click(); };

  const faqs = [
    { question: "What does left-pad mean?", answer: "Left-padding adds characters to the beginning (left side) of each line until it reaches a specified total width." },
    { question: "Can I use any character for padding?", answer: "Yes. You can use spaces, dots, dashes, underscores, zeros, or any character string. The padding character repeats as needed to fill the remaining width." },
    { question: "What is the default target width?", answer: "The default target width is 40 columns. You can change it to any value that suits your formatting needs." },
    { question: "What happens if a line is already longer than the target width?", answer: "If a line is already equal to or longer than the target width, it is left unchanged. No characters are removed." },
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
            <span className="text-white">Left-Pad Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Left-Pad Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Add padding characters to the start of each line to reach a target width. Perfect for aligning numbers, formatting columns, and creating fixed-width layouts.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste the text you want to left-pad..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Target width (columns)</label>
              <input type="number" min={1} max={500} value={width} onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 40))} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Padding character</label>
              <input type="text" value={padChar} onChange={(e) => setPadChar(e.target.value)} placeholder=" " className="w-20 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={leftPad} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><AlignLeft className="h-4 w-4 flex-shrink-0" /><span>Add Left Padding</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Left-padded text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Left-Pad Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Add padding to the left of each line.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Text", description: "Paste text to pad." },
              { step: 2, title: "Set Width", description: "Choose target width and pad character." },
              { step: 3, title: "Click Pad", description: "Left-pad all lines." },
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Left-Pad Tool?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Pad text from the left for alignment and formatting.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Padding", description: "Pad all lines in one click." },
              { icon: Shield, title: "100% Private", description: "No data leaves your browser." },
              { icon: AlignLeft, title: "Custom Character", description: "Pad with spaces, zeros, or any character." },
              { icon: Globe, title: "Any Device", description: "Works everywhere." },
              { icon: Copy, title: "Easy Export", description: "Copy or download." },
              { icon: Zap, title: "No Sign-Up", description: "No account needed." },
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how left-padding is used.</p>
          </div>
          <div className="space-y-4">
            {[
              { title: "Zero Padding", before: "1\n42\n100", after: "001\n042\n100" },
              { title: "ID Formatting", before: "5\n23\n789", after: "005\n023\n789" },
              { title: "Code Indentation", before: "line 1\nline 2", after: "  line 1\n  line 2" },
              { title: "Table Alignment", before: "5\n100\n1000", after: "   5\n 100\n1000" },
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
      <RelatedTools currentSlug="left-pad-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
