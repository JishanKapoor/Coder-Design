"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, ChevronDown, Copy, Trash2, Check, Download, Zap, Shield, Globe, ArrowRight, Layers, Type, FileText, ArrowLeftRight } from "lucide-react";

export default function ReverseTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"chars" | "words" | "lines">("chars");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const reverseText = () => {
    if (!input.trim()) { setOutput(""); return; }
    switch (mode) {
      case "chars": setOutput(input.split("").reverse().join("")); break;
      case "words": setOutput(input.split("\n").map((line) => line.split(/\s+/).reverse().join(" ")).join("\n")); break;
      case "lines": setOutput(input.split("\n").reverse().join("\n")); break;
    }
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "reversed-text.txt"; a.click(); };

  const modes = [
    { value: "chars" as const, label: "Reverse Characters", desc: "Reverse all characters" },
    { value: "words" as const, label: "Reverse Words", desc: "Reverse word order per line" },
    { value: "lines" as const, label: "Reverse Lines", desc: "Reverse line order" },
  ];

  const faqs = [
    { question: "What does reverse characters do?", answer: "It reverses the entire text character by character. 'Hello' becomes 'olleH'." },
    { question: "What does reverse words do?", answer: "It reverses the order of words within each line. 'Hello World' becomes 'World Hello'." },
    { question: "What does reverse lines do?", answer: "It reverses the order of lines — the last line becomes the first and vice versa." },
    { question: "Does it preserve formatting?", answer: "Spaces and line breaks are preserved appropriately for each mode." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — no data is sent anywhere." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="relative overflow-hidden bg-blue-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} /></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Reverse Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Reverse Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Reverse text by characters, words, or lines. Flip your text in three different ways. Free, private, instant.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" />100% Private</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" />Instant</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />Any Device</span>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12 space-y-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste your text here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors" />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">Reverse Mode</label>
            <div className="flex flex-wrap gap-2">
              {modes.map((m) => (
                <button key={m.value} onClick={() => setMode(m.value)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${mode === m.value ? "border-blue-300 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"}`}>{m.label}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={reverseText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-auto whitespace-nowrap"><ArrowLeftRight className="h-4 w-4 flex-shrink-0" /><span>Reverse Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Reversed text will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-blue-300 hover:text-blue-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Reverse Text Online</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Reverse characters, words, or lines in four simple steps.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Your Text", description: "Type or paste the text you want to reverse." },
              { step: 2, title: "Choose Reverse Mode", description: "Select whether to reverse by characters, words, or lines." },
              { step: 3, title: "Click Reverse", description: "Press the button to reverse your text instantly." },
              { step: 4, title: "Copy the Result", description: "Copy the reversed text or download it as a file." },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">{item.step}</div>
                <div><h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3><p className="text-sm leading-relaxed text-slate-600">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Text Reverser?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Reverse text in multiple ways for fun, testing, or analysis.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Reversal", description: "Reverse text by characters, words, or lines in milliseconds." },
              { icon: Shield, title: "100% Private", description: "Your text stays in your browser — no data is stored." },
              { icon: ArrowLeftRight, title: "Multiple Modes", description: "Reverse by characters, words, or entire lines." },
              { icon: Globe, title: "Any Device", description: "Works on desktop, tablet, and mobile browsers." },
              { icon: Copy, title: "Copy or Download", description: "Copy reversed text or download it as a file." },
              { icon: Zap, title: "No Sign-Up", description: "Use the tool immediately without any account." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-blue-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"><f.icon className="h-6 w-6 text-blue-600" /></div>
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See common uses for text reversal.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Mirror Text", before: "Hello World", after: "dlroW olleH" },
              { title: "Palindrome Check", before: "racecar", after: "racecar ✓ palindrome" },
              { title: "Fun Messages", before: "Read this backwards", after: "sdrawkcab siht daeR" },
              { title: "Word Order Reversal", before: "one two three", after: "three two one" },
            ].map((uc) => (
              <div key={uc.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-start gap-4 border-b border-slate-100 px-6 py-4 sm:px-7 sm:py-5"><h3 className="text-base font-semibold text-slate-900">{uc.title}</h3></div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6"><p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p><pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-700 font-mono p-3 bg-white rounded-lg">{uc.before}</pre></div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6"><p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Output</p><pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-emerald-800 font-mono p-3 bg-emerald-100 rounded-lg">{uc.after}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">{faqs.map((faq, i) => { const isOpen = openFaq === i; return (<div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden"><button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors" aria-expanded={isOpen}><span>{faq.question}</span><ChevronDown className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`} /></button><div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}><div className="overflow-hidden"><div className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600">{faq.answer}</div></div></div></div>); })}</div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">Explore More Free Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[{ href: "/tools", label: "All Free Tools", icon: Layers, color: "bg-blue-100 text-blue-600" }, { href: "/tools/repeat-text", label: "Repeat Text", icon: Type, color: "bg-blue-100 text-blue-600" }, { href: "/tools/alternating-case-converter", label: "Alternating Case", icon: FileText, color: "bg-blue-100 text-blue-600" }].map((t) => (<Link key={t.href} href={t.href} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"><div className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${t.color}`}><t.icon className="h-4 w-4" /></div><span className="text-sm font-medium text-slate-900">{t.label}</span><ArrowRight className="ml-auto h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500" /></Link>))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">Ready to Work Together?</h2>
          <p className="mb-6 text-blue-100">Need a custom tool or web application? Let&apos;s discuss your project.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-8 text-sm font-semibold text-blue-600 hover:bg-slate-100">Get in Touch</Link>
            <a href="tel:+14372392448" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20">Call Us Now</a>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}
