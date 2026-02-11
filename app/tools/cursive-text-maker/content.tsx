"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Pen } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Mathematical Script character maps ── */
const SCRIPT_UPPER: Record<string, string> = {
  A: "\uD835\uDC9C", B: "\u212C",       C: "\uD835\uDC9E", D: "\uD835\uDC9F",
  E: "\u2130",       F: "\u2131",       G: "\uD835\uDCA2", H: "\u210B",
  I: "\u2110",       J: "\uD835\uDCA5", K: "\uD835\uDCA6", L: "\u2112",
  M: "\u2133",       N: "\uD835\uDCA9", O: "\uD835\uDCAA", P: "\uD835\uDCAB",
  Q: "\uD835\uDCAC", R: "\u211B",       S: "\uD835\uDCAE", T: "\uD835\uDCAF",
  U: "\uD835\uDCB0", V: "\uD835\uDCB1", W: "\uD835\uDCB2", X: "\uD835\uDCB3",
  Y: "\uD835\uDCB4", Z: "\uD835\uDCB5",
};

const SCRIPT_LOWER: Record<string, string> = {
  a: "\uD835\uDCB6", b: "\uD835\uDCB7", c: "\uD835\uDCB8", d: "\uD835\uDCB9",
  e: "\u212F",       f: "\uD835\uDCBB", g: "\u210A",       h: "\uD835\uDCBD",
  i: "\uD835\uDCBE", j: "\uD835\uDCBF", k: "\uD835\uDCC0", l: "\uD835\uDCC1",
  m: "\uD835\uDCC2", n: "\uD835\uDCC3", o: "\u2134",       p: "\uD835\uDCC5",
  q: "\uD835\uDCC6", r: "\uD835\uDCC7", s: "\uD835\uDCC8", t: "\uD835\uDCC9",
  u: "\uD835\uDCCA", v: "\uD835\uDCCB", w: "\uD835\uDCCC", x: "\uD835\uDCCD",
  y: "\uD835\uDCCE", z: "\uD835\uDCCF",
};

/* Bold Script (U+1D4D0–U+1D503) */
const BOLD_SCRIPT_UPPER: Record<string, string> = {
  A: "\uD835\uDCD0", B: "\uD835\uDCD1", C: "\uD835\uDCD2", D: "\uD835\uDCD3",
  E: "\uD835\uDCD4", F: "\uD835\uDCD5", G: "\uD835\uDCD6", H: "\uD835\uDCD7",
  I: "\uD835\uDCD8", J: "\uD835\uDCD9", K: "\uD835\uDCDA", L: "\uD835\uDCDB",
  M: "\uD835\uDCDC", N: "\uD835\uDCDD", O: "\uD835\uDCDE", P: "\uD835\uDCDF",
  Q: "\uD835\uDCE0", R: "\uD835\uDCE1", S: "\uD835\uDCE2", T: "\uD835\uDCE3",
  U: "\uD835\uDCE4", V: "\uD835\uDCE5", W: "\uD835\uDCE6", X: "\uD835\uDCE7",
  Y: "\uD835\uDCE8", Z: "\uD835\uDCE9",
};

const BOLD_SCRIPT_LOWER: Record<string, string> = {
  a: "\uD835\uDCEA", b: "\uD835\uDCEB", c: "\uD835\uDCEC", d: "\uD835\uDCED",
  e: "\uD835\uDCEE", f: "\uD835\uDCEF", g: "\uD835\uDCF0", h: "\uD835\uDCF1",
  i: "\uD835\uDCF2", j: "\uD835\uDCF3", k: "\uD835\uDCF4", l: "\uD835\uDCF5",
  m: "\uD835\uDCF6", n: "\uD835\uDCF7", o: "\uD835\uDCF8", p: "\uD835\uDCF9",
  q: "\uD835\uDCFA", r: "\uD835\uDCFB", s: "\uD835\uDCFC", t: "\uD835\uDCFD",
  u: "\uD835\uDCFE", v: "\uD835\uDCFF", w: "\uD835\uDD00", x: "\uD835\uDD01",
  y: "\uD835\uDD02", z: "\uD835\uDD03",
};

type CursiveStyle = "script" | "bold-script";

const STYLE_MAPS: Record<CursiveStyle, { upper: Record<string, string>; lower: Record<string, string> }> = {
  script: { upper: SCRIPT_UPPER, lower: SCRIPT_LOWER },
  "bold-script": { upper: BOLD_SCRIPT_UPPER, lower: BOLD_SCRIPT_LOWER },
};

function toCursive(text: string, style: CursiveStyle): string {
  const maps = STYLE_MAPS[style];
  return Array.from(text)
    .map((ch) => maps.upper[ch] || maps.lower[ch] || ch)
    .join("");
}

export default function CursiveTextMakerTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<CursiveStyle>("script");

  const generate = (text?: string, s?: CursiveStyle) => {
    const src = text ?? input;
    const st = s ?? style;
    if (!src) { setOutput(""); return; }
    setOutput(toCursive(src, st));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "cursive-text.txt"; a.click(); };

  const faqs = [
    { question: "How does cursive Unicode text work?", answer: "Unicode includes 'Mathematical Script' characters that resemble elegant cursive handwriting. These are distinct code points (e.g., \uD835\uDC9C for Script A) that render as script letters on most platforms." },
    { question: "What's the difference between Script and Bold Script?", answer: "Script uses the lighter Mathematical Script characters that look like elegant handwriting. Bold Script uses the bolder variant that appears heavier and more decorative." },
    { question: "Where can I use cursive text?", answer: "Cursive Unicode text works on social media (Instagram, Twitter/X, Facebook, TikTok), messaging apps (WhatsApp, Telegram), bios, comments, and anywhere that accepts Unicode plain text." },
    { question: "Why do some letters look different?", answer: "Some Mathematical Script characters (like B, E, F, H, I, L, M, R for uppercase and e, g, o for lowercase) use characters from the Letterlike Symbols block instead of the main Mathematical block, which is a Unicode standard design choice." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — no data is sent to any server." },
  ];

  const howToSteps = [
    { step: 1, title: "Enter Your Text", description: "Type or paste text you want to make cursive." },
    { step: 2, title: "Click Convert", description: "Press the button to transform text into Unicode script." },
    { step: 3, title: "Preview the Result", description: "See your cursive text in the output box." },
    { step: 4, title: "Copy and Use", description: "Copy the cursive text and paste it on any platform." },
  ];

  const features = [
    { icon: Zap, title: "Instant Results", description: "Convert text to cursive Unicode instantly in your browser." },
    { icon: Shield, title: "Completely Private", description: "Your text stays on your device — no data sent anywhere." },
    { icon: Globe, title: "Universal Support", description: "Cursive Unicode works on Instagram, Twitter, Facebook, and more." },
    { icon: Pen, title: "Elegant Style", description: "Beautiful 𝒸𝓊𝓇𝓈𝒾𝓋ℯ script characters that look handwritten." },
    { icon: Copy, title: "One-Click Copy", description: "Copy or download your cursive text with a single click." },
    { icon: Zap, title: "No Account Required", description: "Start using the tool immediately without signing up." },
  ];

  const useCases = [
    { title: "Wedding Invitations", before: "You Are Invited", after: "𝒴ℴ𝓊 𝒜𝓇ℯ ℐ𝓃𝓋𝒾𝓉ℯ𝒹" },
    { title: "Social Bios", before: "Living my best life", after: "ℒ𝒾𝓋𝒾𝓃ℊ 𝓂𝓎 𝒷ℯ𝓈𝓉 𝓁𝒾𝒻ℯ" },
    { title: "Instagram Captions", before: "Dream big", after: "𝒟𝓇ℯ𝒶𝓂 𝒷𝒾ℊ" },
    { title: "Fancy Signatures", before: "With love, Emma", after: "𝒲𝒾𝓉𝒽 𝓁ℴ𝓋ℯ, ℰ𝓂𝓂𝒶" },
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
            <span className="text-white">Cursive Text Maker</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Cursive Text Maker</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Convert text to elegant cursive Unicode script characters. Create fancy handwriting-style text.</p>
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
              {([
                { value: "script" as const, label: "\uD835\uDC9C\uD835\uDCB7\uD835\uDCC8 \uD835\uDC9E\uD835\uDCCA\uD835\uDCC7\uD835\uDCC8\uD835\uDCBE\uD835\uDCCB\uD835\uDCBE" },
                { value: "bold-script" as const, label: "\uD835\uDCD0\uD835\uDCEB\uD835\uDCFC \uD835\uDCD2\uD835\uDCFE\uD835\uDCFB\uD835\uDCFC\uD835\uDCF2\uD835\uDCFF\uD835\uDCF2" },
              ]).map((s) => (
                <button key={s.value} onClick={() => { setStyle(s.value); if (input) generate(input, s.value); }} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${style === s.value ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>{s.label}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => generate()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Pen className="h-4 w-4 flex-shrink-0" /><span>Make Cursive</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Cursive text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
              <p className="text-lg leading-relaxed text-slate-900 break-all">{output}</p>
            </div>
          )}
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Generate Cursive Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Create elegant script text in seconds.</p>
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Cursive Text Maker?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Generate beautiful handwritten-style text effortlessly.</p>
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how cursive text adds elegance to your content.</p>
          </div>
          <div className="space-y-4">
            {useCases.map((uc) => (<div key={uc.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3.5"><h3 className="text-sm font-semibold text-slate-900">{uc.title}</h3></div><div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 divide-slate-100"><div className="px-5 py-3"><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Input</p><pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-slate-600 font-mono">{uc.before}</pre></div><div className="px-5 py-3 bg-green-50/50"><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-green-600">Output</p><pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed text-green-800 font-mono">{uc.after}</pre></div></div></div>))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="cursive-text-maker" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
