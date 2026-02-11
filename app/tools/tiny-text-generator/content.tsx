"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Type } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Superscript character map ── */
const SUPERSCRIPT: Record<string, string> = {
  a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ",
  i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ",
  q: "𐞥", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ",
  y: "ʸ", z: "ᶻ",
  A: "ᴬ", B: "ᴮ", D: "ᴰ", E: "ᴱ", G: "ᴳ", H: "ᴴ", I: "ᴵ", J: "ᴶ",
  K: "ᴷ", L: "ᴸ", M: "ᴹ", N: "ᴺ", O: "ᴼ", P: "ᴾ", R: "ᴿ", T: "ᵀ",
  U: "ᵁ", V: "ⱽ", W: "ᵂ",
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
};

/* ── Subscript character map (only available chars) ── */
const SUBSCRIPT: Record<string, string> = {
  a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ",
  n: "ₙ", o: "ₒ", p: "ₚ", r: "ᵣ", s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ",
  x: "ₓ",
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
  "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
};

type TinyStyle = "superscript" | "subscript";

export default function TinyTextGeneratorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<TinyStyle>("superscript");

  const makeTiny = (text?: string, s?: TinyStyle) => {
    const src = text ?? input;
    const st = s ?? style;
    if (!src) { setOutput(""); return; }
    const map = st === "superscript" ? SUPERSCRIPT : SUBSCRIPT;
    const result = Array.from(src).map((ch) => map[ch] ?? ch).join("");
    setOutput(result);
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "tiny-text.txt"; a.click(); };

  const faqs = [
    { question: "How does tiny text work?", answer: "Unicode includes superscript and subscript characters that are smaller versions of regular letters and digits. This tool maps each character to its tiny equivalent, creating text that appears smaller than normal." },
    { question: "Why can't all letters be converted to subscript?", answer: "Unicode only defines subscript forms for certain letters (a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, x) and digits. Letters without subscript forms are left unchanged." },
    { question: "Where can I use tiny text?", answer: "Tiny text works on social media (Instagram, Twitter/X, Facebook), messaging apps, bios, comments, and anywhere that accepts Unicode text." },
    { question: "Will tiny text work on all devices?", answer: "Most modern devices and platforms support these Unicode characters. Some older systems or specific fonts may not render all superscript/subscript characters correctly." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — no data is sent to any server." },
  ];

  const howToSteps = [
    { step: 1, title: "Enter Your Text", description: "Type or paste the text you want to make tiny." },
    { step: 2, title: "Click Convert", description: "Press the button to convert to superscript Unicode." },
    { step: 3, title: "Preview the Result", description: "See your tiny text in the output area." },
    { step: 4, title: "Copy and Use", description: "Copy the tiny text and paste it on any platform." },
  ];

  const features = [
    { icon: Zap, title: "Instant Results", description: "Convert text to tiny superscript characters instantly." },
    { icon: Shield, title: "Completely Private", description: "No data is stored or sent — processing happens locally." },
    { icon: Globe, title: "Works Everywhere", description: "Tiny text renders on social media, bios, and messages." },
    { icon: Type, title: "Unique Look", description: "ᵗⁱⁿʸ text creates a distinctive miniature appearance." },
    { icon: Copy, title: "One-Click Copy", description: "Copy or download your tiny text with a single click." },
    { icon: Zap, title: "No Sign-Up", description: "Start using the tool immediately without any registration." },
  ];

  const useCases = [
    { title: "Fun Social Bios", before: "Designer & Developer", after: "ᴰᵉˢⁱᵍⁿᵉʳ ⁿ ᴰᵉᵛᵉˡᵒᵖᵉʳ" },
    { title: "Subtle Captions", before: "Whisper this", after: "ᵂʰⁱˢᵖᵉʳ ᵗʰⁱˢ" },
    { title: "Creative Posts", before: "Think small", after: "ᵀʰⁱⁿᵏ ˢᵐᵃˡˡ" },
    { title: "Footnote Style", before: "See note below", after: "ˢᵉᵉ ⁿᵒᵗᵉ ᵇᵉˡᵒʷ" },
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
            <span className="text-white">Tiny Text Generator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Tiny Text Generator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Convert text to tiny superscript or subscript Unicode characters. Create small text for social media, bios, and notes.</p>
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
              <button onClick={() => { setStyle("superscript"); if (input) makeTiny(input, "superscript"); }} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${style === "superscript" ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>ˢᵘᵖᵉʳˢᶜʳⁱᵖᵗ Superscript</button>
              <button onClick={() => { setStyle("subscript"); if (input) makeTiny(input, "subscript"); }} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${style === "subscript" ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>ₛᵤᵦₛ꜀ᵣᵢₚₜ Subscript</button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => makeTiny()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Type className="h-4 w-4 flex-shrink-0" /><span>Make Tiny</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Tiny text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
              <div className="flex items-baseline gap-4 text-slate-900">
                <span className="text-base">Normal: {input.slice(0, 50)}{input.length > 50 ? "…" : ""}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-4 text-slate-900">
                <span className="text-base">Tiny: {output.slice(0, 80)}{output.length > 80 ? "…" : ""}</span>
              </div>
            </div>
          )}

          {style === "subscript" && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <strong>Note:</strong> Subscript forms only exist for: a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, x and digits 0–9. Other characters will remain unchanged.
            </div>
          )}
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Generate Tiny Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Create superscript Unicode text in four simple steps.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {howToSteps.map((item) => (<div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"><div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">{item.step}</div><div><h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3><p className="text-sm leading-relaxed text-slate-600">{item.description}</p></div></div>))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Tiny Text Generator?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Generate small superscript text that works everywhere.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (<div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-violet-200 hover:shadow-lg"><div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100"><f.icon className="h-6 w-6 text-violet-600" /></div><h3 className="mb-2 text-base font-semibold text-slate-900">{f.title}</h3><p className="text-sm leading-relaxed text-slate-600">{f.description}</p></div>))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how tiny text adds a unique touch to your content.</p>
          </div>
          <div className="space-y-4">
            {useCases.map((uc) => (<div key={uc.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3.5"><h3 className="text-sm font-semibold text-slate-900">{uc.title}</h3></div><div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 divide-slate-100"><div className="px-5 py-3"><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p><pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-slate-600 font-mono">{uc.before}</pre></div><div className="px-5 py-3 bg-green-50/50"><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-green-600">Output</p><pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-green-800 font-mono">{uc.after}</pre></div></div></div>))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="tiny-text-generator" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
