"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, ChevronDown, Copy, Trash2, Check, Download, Zap, Shield, Globe, ArrowRight, Layers, Type, FileText, RotateCw } from "lucide-react";

export default function RepeatTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [count, setCount] = useState(3);
  const [separator, setSeparator] = useState("newline");
  const [customSep, setCustomSep] = useState(" ");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const repeatText = () => {
    if (!input || count < 1) { setOutput(""); return; }
    const sep = separator === "newline" ? "\n" : separator === "space" ? " " : separator === "none" ? "" : customSep;
    const repeated = Array(Math.min(count, 10000)).fill(input).join(sep);
    setOutput(repeated);
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "repeated-text.txt"; a.click(); };

  const faqs = [
    { question: "What is the maximum repeat count?", answer: "You can repeat text up to 10,000 times. This limit prevents browser memory issues." },
    { question: "Can I repeat multi-line text?", answer: "Yes. The entire text block (including newlines) is repeated as a unit." },
    { question: "What separators are available?", answer: "Newline, space, no separator, or any custom string you type." },
    { question: "Can I use it for generating test data?", answer: "Absolutely. It's great for creating test data, filler text, or repeated patterns." },
    { question: "Is my data private?", answer: "Yes. Everything runs in your browser. No data is transmitted." },
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
            <span className="text-white">Repeat Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Repeat Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Repeat any text multiple times with your choice of separator. Perfect for test data, filler content, and patterns. Free, private, instant.</p>
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
            <label className="mb-2 block text-sm font-semibold text-slate-900">Text to Repeat</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste the text you want to repeat..." rows={4} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors" />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Repeat count</label>
              <input type="number" min={1} max={10000} value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Separator</label>
              <select value={separator} onChange={(e) => setSeparator(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option value="newline">New line</option>
                <option value="space">Space</option>
                <option value="none">No separator</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            {separator === "custom" && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Custom</label>
                <input type="text" value={customSep} onChange={(e) => setCustomSep(e.target.value)} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-center font-mono text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={repeatText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-auto whitespace-nowrap"><RotateCw className="h-4 w-4 flex-shrink-0" /><span>Repeat Text</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Repeated text will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Repeat Text Online</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Duplicate any text multiple times with optional separators.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Your Text", description: "Type or paste the text you want to repeat." },
              { step: 2, title: "Set Repeat Count", description: "Choose how many times the text should be repeated." },
              { step: 3, title: "Choose a Separator", description: "Optionally add a separator between repetitions (newline, comma, space, etc.)." },
              { step: 4, title: "Copy the Result", description: "Copy the repeated text or download it as a file." },
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Text Repeater?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Repeat any text quickly for testing, content, or creative projects.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Repetition", description: "Repeat text hundreds of times in a single click." },
              { icon: Shield, title: "100% Private", description: "All processing happens in your browser — nothing is uploaded." },
              { icon: Globe, title: "Any Device", description: "Works on desktop, tablet, and mobile browsers." },
              { icon: RotateCw, title: "Custom Separators", description: "Choose newlines, commas, spaces, or any custom separator." },
              { icon: Copy, title: "Copy or Download", description: "One-click copy or download your repeated text." },
              { icon: Zap, title: "No Sign-Up", description: "Use the tool right away without any registration." },
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how text repetition is used in various scenarios.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Load Testing", before: "test data", after: "test data\ntest data\ntest data\n(×100)" },
              { title: "CSS Patterns", before: "▓░", after: "▓░▓░▓░▓░▓░▓░▓░" },
              { title: "Social Media", before: "GO! ", after: "GO! GO! GO! GO! GO!" },
              { title: "Dummy Content", before: "Lorem ipsum.", after: "Lorem ipsum.\nLorem ipsum.\nLorem ipsum." },
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
            {[{ href: "/tools", label: "All Free Tools", icon: Layers, color: "bg-blue-100 text-blue-600" }, { href: "/tools/reverse-text", label: "Reverse Text", icon: Type, color: "bg-blue-100 text-blue-600" }, { href: "/tools/alternating-case-converter", label: "Alternating Case", icon: FileText, color: "bg-blue-100 text-blue-600" }].map((t) => (<Link key={t.href} href={t.href} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"><div className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${t.color}`}><t.icon className="h-4 w-4" /></div><span className="text-sm font-medium text-slate-900">{t.label}</span><ArrowRight className="ml-auto h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500" /></Link>))}
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
