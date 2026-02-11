"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Bold, Code2 } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Mathematical Bold character maps ── */
const BOLD_UPPER: Record<string, string> = {
  A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇",
  I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏",
  Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗",
  Y: "𝐘", Z: "𝐙",
};

const BOLD_LOWER: Record<string, string> = {
  a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡",
  i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩",
  q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱",
  y: "𝐲", z: "𝐳",
};

const BOLD_DIGITS: Record<string, string> = {
  "0": "𝟎", "1": "𝟏", "2": "𝟐", "3": "𝟑", "4": "𝟒",
  "5": "𝟓", "6": "𝟔", "7": "𝟕", "8": "𝟖", "9": "𝟗",
};

/* Bold Italic (U+1D468–U+1D49B) */
const BOLD_ITALIC_UPPER: Record<string, string> = {
  A: "𝑨", B: "𝑩", C: "𝑪", D: "𝑫", E: "𝑬", F: "𝑭", G: "𝑮", H: "𝑯",
  I: "𝑰", J: "𝑱", K: "𝑲", L: "𝑳", M: "𝑴", N: "𝑵", O: "𝑶", P: "𝑷",
  Q: "𝑸", R: "𝑹", S: "𝑺", T: "𝑻", U: "𝑼", V: "𝑽", W: "𝑾", X: "𝑿",
  Y: "𝒀", Z: "𝒁",
};

const BOLD_ITALIC_LOWER: Record<string, string> = {
  a: "𝒂", b: "𝒃", c: "𝒄", d: "𝒅", e: "𝒆", f: "𝒇", g: "𝒈", h: "𝒉",
  i: "𝒊", j: "𝒋", k: "𝒌", l: "𝒍", m: "𝒎", n: "𝒏", o: "𝒐", p: "𝒑",
  q: "𝒒", r: "𝒓", s: "𝒔", t: "𝒕", u: "𝒖", v: "𝒗", w: "𝒘", x: "𝒙",
  y: "𝒚", z: "𝒛",
};

/* Bold Script (U+1D4D0–U+1D503) */
const BOLD_SCRIPT_UPPER: Record<string, string> = {
  A: "𝓐", B: "𝓑", C: "𝓒", D: "𝓓", E: "𝓔", F: "𝓕", G: "𝓖", H: "𝓗",
  I: "𝓘", J: "𝓙", K: "𝓚", L: "𝓛", M: "𝓜", N: "𝓝", O: "𝓞", P: "𝓟",
  Q: "𝓠", R: "𝓡", S: "𝓢", T: "𝓣", U: "𝓤", V: "𝓥", W: "𝓦", X: "𝓧",
  Y: "𝓨", Z: "𝓩",
};

const BOLD_SCRIPT_LOWER: Record<string, string> = {
  a: "𝓪", b: "𝓫", c: "𝓬", d: "𝓭", e: "𝓮", f: "𝓯", g: "𝓰", h: "𝓱",
  i: "𝓲", j: "𝓳", k: "𝓴", l: "𝓵", m: "𝓶", n: "𝓷", o: "𝓸", p: "𝓹",
  q: "𝓺", r: "𝓻", s: "𝓼", t: "𝓽", u: "𝓾", v: "𝓿", w: "𝔀", x: "𝔁",
  y: "𝔂", z: "𝔃",
};

/* Bold Fraktur (U+1D56C–U+1D59F) */
const BOLD_FRAKTUR_UPPER: Record<string, string> = {
  A: "𝕬", B: "𝕭", C: "𝕮", D: "𝕯", E: "𝕰", F: "𝕱", G: "𝕲", H: "𝕳",
  I: "𝕴", J: "𝕵", K: "𝕶", L: "𝕷", M: "𝕸", N: "𝕹", O: "𝕺", P: "𝕻",
  Q: "𝕼", R: "𝕽", S: "𝕾", T: "𝕿", U: "𝖀", V: "𝖁", W: "𝖂", X: "𝖃",
  Y: "𝖄", Z: "𝖅",
};

const BOLD_FRAKTUR_LOWER: Record<string, string> = {
  a: "𝖆", b: "𝖇", c: "𝖈", d: "𝖉", e: "𝖊", f: "𝖋", g: "𝖌", h: "𝖍",
  i: "𝖎", j: "𝖏", k: "𝖐", l: "𝖑", m: "𝖒", n: "𝖓", o: "𝖔", p: "𝖕",
  q: "𝖖", r: "𝖗", s: "𝖘", t: "𝖙", u: "𝖚", v: "𝖛", w: "𝖜", x: "𝖝",
  y: "𝖞", z: "𝖟",
};

type BoldStyle = "bold" | "bold-italic" | "bold-script" | "bold-fraktur";

const STYLE_MAPS: Record<BoldStyle, { upper: Record<string, string>; lower: Record<string, string> }> = {
  bold:          { upper: BOLD_UPPER, lower: BOLD_LOWER },
  "bold-italic": { upper: BOLD_ITALIC_UPPER, lower: BOLD_ITALIC_LOWER },
  "bold-script": { upper: BOLD_SCRIPT_UPPER, lower: BOLD_SCRIPT_LOWER },
  "bold-fraktur": { upper: BOLD_FRAKTUR_UPPER, lower: BOLD_FRAKTUR_LOWER },
};

export default function BoldTextGeneratorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<BoldStyle>("bold");

  const makeBold = (text?: string, s?: BoldStyle) => {
    const src = text ?? input;
    const st = s ?? style;
    if (!src) { setOutput(""); return; }
    const maps = STYLE_MAPS[st];
    const result = Array.from(src).map((ch) => {
      if (maps.upper[ch]) return maps.upper[ch];
      if (maps.lower[ch]) return maps.lower[ch];
      if (st === "bold" && BOLD_DIGITS[ch]) return BOLD_DIGITS[ch];
      return ch;
    }).join("");
    setOutput(result);
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "bold-text.txt"; a.click(); };

  const faqs = [
    { question: "How does bold Unicode text work?", answer: "Unicode includes a set of 'Mathematical Bold' characters that look like bold Latin letters. These are distinct code points (e.g., 𝐀 is U+1D400) that render as bold in most fonts and platforms, even in plain text fields." },
    { question: "Where can I use bold Unicode text?", answer: "Bold Unicode text works on social media (Instagram, Twitter/X, Facebook, TikTok), messaging apps (WhatsApp, Telegram), bios, comments, and anywhere that accepts plain text but not HTML formatting." },
    { question: "What's the difference between the styles?", answer: "Bold uses Mathematical Bold characters. Bold Italic combines bold and italic styles. Bold Script looks like handwritten cursive in bold. Bold Fraktur uses a blackletter/gothic bold style." },
    { question: "Will bold text work everywhere?", answer: "Most modern platforms and devices support these Unicode characters. However, some older systems or specific fonts may not render them correctly, showing boxes or question marks instead." },
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
            <span className="text-white">Bold Text Generator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Bold Text Generator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Convert your text to bold Unicode characters that work on social media, bios, and anywhere plain text is used.</p>
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
                { value: "bold" as const, label: "𝐁𝐨𝐥𝐝", desc: "Mathematical Bold" },
                { value: "bold-italic" as const, label: "𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄", desc: "Bold Italic" },
                { value: "bold-script" as const, label: "𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽", desc: "Bold Script" },
                { value: "bold-fraktur" as const, label: "𝕭𝖔𝖑𝖉 𝕱𝖗𝖆𝖐𝖙𝖚𝖗", desc: "Bold Fraktur" },
              ]).map((s) => (
                <button key={s.value} onClick={() => { setStyle(s.value); if (input) makeBold(input, s.value); }} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${style === s.value ? "border-purple-300 bg-purple-50 text-purple-700" : "border-slate-200 bg-white text-slate-600 hover:border-purple-200"}`}>{s.label}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={() => makeBold()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full sm:w-auto whitespace-nowrap"><Bold className="h-4 w-4 flex-shrink-0" /><span>Make Bold</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Bold text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Generate Bold Unicode Text</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Create bold text for social media in four easy steps.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Your Text", description: "Type or paste the text you want to convert in the input box above." },
              { step: 2, title: "Choose a Bold Style", description: "Select from Mathematical Bold, Bold Italic, Bold Script, or Bold Fraktur." },
              { step: 3, title: "Click Make Bold", description: "Press the button to convert your text instantly. The bold output appears below." },
              { step: 4, title: "Copy and Use Anywhere", description: "Click Copy to copy bold text to your clipboard, then paste it on social media, bios, or messages." },
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Bold Text Generator?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">A fast, private tool built for creators, marketers, and developers.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Conversion", description: "Convert text to bold Unicode in milliseconds. No loading, no waiting." },
              { icon: Shield, title: "100% Private", description: "All processing happens in your browser. No data is sent to any server." },
              { icon: Globe, title: "Works Everywhere", description: "Bold Unicode renders on Instagram, Twitter, Facebook, WhatsApp, TikTok, and more." },
              { icon: Bold, title: "Multiple Styles", description: "Choose from Bold, Bold Italic, Bold Script, and Bold Fraktur styles." },
              { icon: Copy, title: "One-Click Copy", description: "Copy your bold text instantly or download it as a .txt file." },
              { icon: Code2, title: "No Sign-Up Required", description: "Use the tool immediately — no account, no login, no email needed." },
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how creators and marketers use bold Unicode text.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Social Media Bio", before: "John Designer\nCreative Director", after: "𝐉𝐨𝐡𝐧 𝐃𝐞𝐬𝐢𝐠𝐧𝐞𝐫\n𝐂𝐫𝐞𝐚𝐭𝐢𝐯𝐞 𝐃𝐢𝐫𝐞𝐜𝐭𝐨𝐫" },
              { title: "Emphasize Keywords", before: "Sale ends today\nFree shipping", after: "𝐒𝐚𝐥𝐞 𝐞𝐧𝐝𝐬 𝐭𝐨𝐝𝐚𝐲\n𝐅𝐫𝐞𝐞 𝐬𝐡𝐢𝐩𝐩𝐢𝐧𝐠" },
              { title: "Instagram Captions", before: "New collection out now", after: "𝐍𝐞𝐰 𝐜𝐨𝐥𝐥𝐞𝐜𝐭𝐢𝐨𝐧 𝐨𝐮𝐭 𝐧𝐨𝐰" },
              { title: "Fancy Headings", before: "Chapter One\nThe Beginning", after: "𝓒𝓱𝓪𝓹𝓽𝓮𝓻 𝓞𝓷𝓮\n𝓣𝓱𝓮 𝓑𝓮𝓰𝓲𝓷𝓷𝓲𝓷𝓰" },
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
      <RelatedTools currentSlug="bold-text-generator" />
      <ToolCta theme="purple" />
      <FooterSection />
    </div>
  );
}
