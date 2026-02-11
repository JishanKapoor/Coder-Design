"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Circle } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Circled / Bubble character maps ── */
const BUBBLE_UPPER: Record<string, string> = {
  A: "\u24B6", B: "\u24B7", C: "\u24B8", D: "\u24B9", E: "\u24BA", F: "\u24BB",
  G: "\u24BC", H: "\u24BD", I: "\u24BE", J: "\u24BF", K: "\u24C0", L: "\u24C1",
  M: "\u24C2", N: "\u24C3", O: "\u24C4", P: "\u24C5", Q: "\u24C6", R: "\u24C7",
  S: "\u24C8", T: "\u24C9", U: "\u24CA", V: "\u24CB", W: "\u24CC", X: "\u24CD",
  Y: "\u24CE", Z: "\u24CF",
};

const BUBBLE_LOWER: Record<string, string> = {
  a: "\u24D0", b: "\u24D1", c: "\u24D2", d: "\u24D3", e: "\u24D4", f: "\u24D5",
  g: "\u24D6", h: "\u24D7", i: "\u24D8", j: "\u24D9", k: "\u24DA", l: "\u24DB",
  m: "\u24DC", n: "\u24DD", o: "\u24DE", p: "\u24DF", q: "\u24E0", r: "\u24E1",
  s: "\u24E2", t: "\u24E3", u: "\u24E4", v: "\u24E5", w: "\u24E6", x: "\u24E7",
  y: "\u24E8", z: "\u24E9",
};

const BUBBLE_DIGITS: Record<string, string> = {
  "0": "\u24EA", "1": "\u2460", "2": "\u2461", "3": "\u2462", "4": "\u2463",
  "5": "\u2464", "6": "\u2465", "7": "\u2466", "8": "\u2467", "9": "\u2468",
};

/* Negative circled (filled) — uppercase only + digits */
const FILLED_UPPER: Record<string, string> = {
  A: "\uD83C\uDD50", B: "\uD83C\uDD51", C: "\uD83C\uDD52", D: "\uD83C\uDD53",
  E: "\uD83C\uDD54", F: "\uD83C\uDD55", G: "\uD83C\uDD56", H: "\uD83C\uDD57",
  I: "\uD83C\uDD58", J: "\uD83C\uDD59", K: "\uD83C\uDD5A", L: "\uD83C\uDD5B",
  M: "\uD83C\uDD5C", N: "\uD83C\uDD5D", O: "\uD83C\uDD5E", P: "\uD83C\uDD5F",
  Q: "\uD83C\uDD60", R: "\uD83C\uDD61", S: "\uD83C\uDD62", T: "\uD83C\uDD63",
  U: "\uD83C\uDD64", V: "\uD83C\uDD65", W: "\uD83C\uDD66", X: "\uD83C\uDD67",
  Y: "\uD83C\uDD68", Z: "\uD83C\uDD69",
};

const FILLED_DIGITS: Record<string, string> = {
  "0": "\u24FF", "1": "\u2776", "2": "\u2777", "3": "\u2778", "4": "\u2779",
  "5": "\u277A", "6": "\u277B", "7": "\u277C", "8": "\u277D", "9": "\u277E",
};

type BubbleStyle = "circled" | "filled";

function toBubble(text: string, style: BubbleStyle): string {
  return Array.from(text)
    .map((ch) => {
      if (style === "filled") {
        const upper = ch.toUpperCase();
        if (FILLED_UPPER[upper]) return FILLED_UPPER[upper];
        if (FILLED_DIGITS[ch]) return FILLED_DIGITS[ch];
        return ch;
      }
      if (BUBBLE_UPPER[ch]) return BUBBLE_UPPER[ch];
      if (BUBBLE_LOWER[ch]) return BUBBLE_LOWER[ch];
      if (BUBBLE_DIGITS[ch]) return BUBBLE_DIGITS[ch];
      return ch;
    })
    .join("");
}

export default function BubbleTextGeneratorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<BubbleStyle>("circled");

  const generate = (text?: string, s?: BubbleStyle) => {
    const src = text ?? input;
    const st = s ?? style;
    if (!src) { setOutput(""); return; }
    setOutput(toBubble(src, st));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "bubble-text.txt"; a.click(); };

  const faqs = [
    { question: "How do bubble letters work?", answer: "Unicode includes 'Enclosed Alphanumeric' characters — letters and digits inside circles. These are standard Unicode code points (e.g., Ⓐ is U+24B6) that render as circled letters on most platforms." },
    { question: "What's the difference between circled and filled?", answer: "Circled uses outlined circle characters (Ⓐ Ⓑ Ⓒ) from the Enclosed Alphanumerics block. Filled uses negative/dark circle characters from the Enclosed Alphanumeric Supplement block for a bolder look." },
    { question: "Where can I use bubble text?", answer: "Bubble text works on social media (Instagram, Twitter/X, Facebook, TikTok), messaging apps, bios, comments, and anywhere that accepts plain text with Unicode support." },
    { question: "Do lowercase filled bubbles exist?", answer: "Unicode doesn't include lowercase filled/negative circled letters. The filled style converts all letters to uppercase equivalents automatically." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — no data is sent to any server." },
  ];

  const howToSteps = [
    { step: 1, title: "Enter Your Text", description: "Type or paste text in the input box." },
    { step: 2, title: "Click Convert", description: "Press the button to wrap each letter in Unicode circles." },
    { step: 3, title: "Preview Output", description: "See the bubble text in the output area." },
    { step: 4, title: "Copy and Share", description: "Copy bubble text to clipboard and use it anywhere." },
  ];

  const features = [
    { icon: Zap, title: "Instant Conversion", description: "Generate bubble text from any input instantly in your browser." },
    { icon: Shield, title: "100% Private", description: "No data leaves your device — all processing is local." },
    { icon: Globe, title: "Works on All Platforms", description: "Bubble text renders on Instagram, Twitter, WhatsApp, and more." },
    { icon: Circle, title: "Unique Style", description: "Stand out with Ⓑⓤⓑⓑⓛⓔ circled letters that catch attention." },
    { icon: Copy, title: "Easy Copy & Download", description: "One-click copy or download your bubble text as a file." },
    { icon: Zap, title: "No Sign-Up Required", description: "Use the tool instantly without creating an account." },
  ];

  const useCases = [
    { title: "Instagram Username", before: "JohnDesign", after: "Ⓙⓞⓗⓝⓓⓔⓢⓘⓖⓝ" },
    { title: "Social Media Bio", before: "Creative Director", after: "Ⓒⓡⓔⓐⓣⓘⓥⓔ Ⓓⓘⓡⓔⓒⓣⓞⓡ" },
    { title: "Fun Messages", before: "Happy Birthday", after: "Ⓗⓐⓟⓟⓨ Ⓑⓘⓡⓣⓗⓓⓐⓨ" },
    { title: "Decorative Headers", before: "Welcome Home", after: "Ⓦⓔⓛⓒⓞⓜⓔ Ⓗⓞⓜⓔ" },
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
            <span className="text-white">Bubble Text Generator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Bubble Text Generator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Convert text to circled Unicode bubble letters. Create eye-catching text for social media and bios.</p>
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
                { value: "circled" as const, label: "\u24B7\u24E4\u24D1\u24D1\u24DB\u24D4", desc: "Circled (outlined)" },
                { value: "filled" as const, label: "Filled (dark circles)" },
              ]).map((s) => (
                <button key={s.value} onClick={() => { setStyle(s.value); if (input) generate(input, s.value); }} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${style === s.value ? "border-purple-300 bg-purple-50 text-purple-700" : "border-slate-200 bg-white text-slate-600 hover:border-purple-200"}`}>{s.label}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={() => generate()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full sm:w-auto whitespace-nowrap"><Circle className="h-4 w-4 flex-shrink-0" /><span>Bubble-ify</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Bubble text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Generate Bubble Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Create circled Unicode text in four simple steps.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {howToSteps.map((item) => (<div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"><div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">{item.step}</div><div><h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3><p className="text-sm leading-relaxed text-slate-600">{item.description}</p></div></div>))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Bubble Text Generator?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Create eye-catching circled text for any platform.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (<div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-purple-200 hover:shadow-lg"><div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100"><f.icon className="h-6 w-6 text-purple-600" /></div><h3 className="mb-2 text-base font-semibold text-slate-900">{f.title}</h3><p className="text-sm leading-relaxed text-slate-600">{f.description}</p></div>))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how bubble text is used on social media and messaging.</p>
          </div>
          <div className="space-y-8">
            {useCases.map((uc) => (<div key={uc.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-start gap-4 border-b border-slate-100 px-6 py-4 sm:px-7 sm:py-5"><h3 className="text-base font-semibold text-slate-900">{uc.title}</h3></div><div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7"><div className="rounded-xl border border-slate-200 bg-slate-50 p-6"><p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p><pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-700 font-mono p-3 bg-white rounded-lg">{uc.before}</pre></div><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6"><p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Output</p><pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-emerald-800 font-mono p-3 bg-emerald-100 rounded-lg">{uc.after}</pre></div></div></div>))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="bubble-text-generator" />
      <ToolCta theme="purple" />
      <FooterSection />
    </div>
  );
}
