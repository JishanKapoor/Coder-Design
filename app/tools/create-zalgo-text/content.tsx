"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2 } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Zalgo combining mark ranges ── */
const MARKS_ABOVE = [
  "\u0300", "\u0301", "\u0302", "\u0303", "\u0304", "\u0305", "\u0306", "\u0307",
  "\u0308", "\u0309", "\u030A", "\u030B", "\u030C", "\u030D", "\u030E", "\u030F",
  "\u0310", "\u0311", "\u0312", "\u0313",
];

const MARKS_BELOW = [
  "\u0316", "\u0317", "\u0318", "\u0319", "\u031A", "\u031B", "\u031C", "\u031D",
  "\u031E", "\u031F", "\u0320", "\u0321", "\u0322", "\u0323", "\u0324", "\u0325",
  "\u0326", "\u0327", "\u0328", "\u0329",
];

const MARKS_MIDDLE = ["\u0334", "\u0335", "\u0336", "\u0337", "\u0338"];

type Intensity = "mini" | "normal" | "max";

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function zalgoify(text: string, intensity: Intensity, above: boolean, below: boolean, middle: boolean): string {
  const counts: Record<Intensity, [number, number]> = { mini: [1, 2], normal: [3, 5], max: [6, 12] };
  const [min, max] = counts[intensity];

  return Array.from(text)
    .map((ch) => {
      if (ch === " " || ch === "\n") return ch;
      let result = ch;
      const count = Math.floor(Math.random() * (max - min + 1)) + min;
      for (let i = 0; i < count; i++) {
        if (above) result += randomPick(MARKS_ABOVE);
        if (below) result += randomPick(MARKS_BELOW);
        if (middle) result += randomPick(MARKS_MIDDLE);
      }
      return result;
    })
    .join("");
}

export default function ZalgoTextGeneratorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [intensity, setIntensity] = useState<Intensity>("normal");
  const [above, setAbove] = useState(true);
  const [below, setBelow] = useState(true);
  const [middle, setMiddle] = useState(true);

  const generate = () => {
    if (!input) { setOutput(""); return; }
    setOutput(zalgoify(input, intensity, above, below, middle));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "zalgo-text.txt"; a.click(); };

  const faqs = [
    { question: "What is Zalgo text?", answer: "Zalgo text uses Unicode combining diacritical marks stacked above, below, and through normal characters to create a glitchy, corrupted-looking text effect. It's named after a creepypasta meme character." },
    { question: "How does the intensity slider work?", answer: "Mini adds 1–2 combining marks per character for a subtle effect. Normal adds 3–5 marks for a moderate glitch. Max adds 6–12 marks per character for an extreme, barely-readable effect." },
    { question: "Where can I use Zalgo text?", answer: "Zalgo text works on most social media platforms, messaging apps, forums, and anywhere that supports Unicode. Some platforms may strip combining characters." },
    { question: "Can Zalgo text break my computer?", answer: "No. Zalgo text is just normal Unicode characters stacked together. It may slow down rendering in very long texts but cannot cause any harm to your device." },
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
            <span className="text-white">Zalgo Text Generator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Zalgo Text Generator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Create creepy Zalgo text with combining Unicode characters. Add glitchy diacritical marks above and below text.</p>
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

          {/* Intensity */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">Intensity</label>
            <div className="flex flex-wrap gap-2">
              {([
                { value: "mini" as const, label: "Mini (subtle)" },
                { value: "normal" as const, label: "Normal" },
                { value: "max" as const, label: "Max (extreme)" },
              ]).map((s) => (
                <button key={s.value} onClick={() => setIntensity(s.value)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${intensity === s.value ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>{s.label}</button>
              ))}
            </div>
          </div>

          {/* Direction checkboxes */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">Direction</label>
            <div className="flex flex-wrap gap-4">
              {([
                { key: "above", label: "Above", checked: above, set: setAbove },
                { key: "below", label: "Below", checked: below, set: setBelow },
                { key: "middle", label: "Middle", checked: middle, set: setMiddle },
              ] as const).map((d) => (
                <label key={d.key} className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={d.checked} onChange={(e) => d.set(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                  {d.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={generate} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Zap className="h-4 w-4 flex-shrink-0" /><span>Zalgo-ify</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Zalgo text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="create-zalgo-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
