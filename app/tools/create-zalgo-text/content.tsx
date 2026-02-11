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
      <section className="relative overflow-hidden bg-purple-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
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
      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12 space-y-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your text here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors" />
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
                <button key={s.value} onClick={() => setIntensity(s.value)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${intensity === s.value ? "border-purple-300 bg-purple-50 text-purple-700" : "border-slate-200 bg-white text-slate-600 hover:border-purple-200"}`}>{s.label}</button>
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
                  <input type="checkbox" checked={d.checked} onChange={(e) => d.set(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                  {d.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={generate} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full sm:w-auto whitespace-nowrap"><Zap className="h-4 w-4 flex-shrink-0" /><span>Zalgo-ify</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Zalgo text will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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

      {/* How-To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">How to Create Zalgo Text</h2>
            <p className="mt-3 text-slate-600">Generate creepy glitch text in four easy steps.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: "1", title: "Enter Your Text", desc: "Type or paste any text you want to make glitchy." },
              { step: "2", title: "Adjust Intensity", desc: "Set the level of distortion using the intensity slider." },
              { step: "3", title: "Click Generate", desc: "Press the button to apply Zalgo combining marks to your text." },
              { step: "4", title: "Copy and Share", desc: "Copy the creepy text and paste it on social media or messages." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">{s.step}</div>
                <h3 className="mb-1 font-semibold text-slate-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Zalgo Text Generator?</h2>
            <p className="mt-3 text-slate-600">Create unsettling glitch text for memes, posts, and creative projects.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Zap className="h-5 w-5" />, title: "Instant Generation", desc: "Create Zalgo text instantly with adjustable intensity levels." },
              { icon: <Shield className="h-5 w-5" />, title: "100% Private", desc: "All processing happens in your browser — no data leaves your device." },
              { icon: <Globe className="h-5 w-5" />, title: "Works Everywhere", desc: "Zalgo text renders on most social media platforms and messaging apps." },
              { icon: <Zap className="h-5 w-5" />, title: "Adjustable Intensity", desc: "Control how extreme the glitch effect is — from subtle to chaotic." },
              { icon: <Copy className="h-5 w-5" />, title: "One-Click Copy", desc: "Copy your Zalgo text to clipboard instantly or download as a file." },
              { icon: <Zap className="h-5 w-5" />, title: "No Sign-Up", desc: "Use the tool right away without creating any account." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-purple-200 hover:shadow-lg">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">{f.icon}</div>
                <h3 className="mb-1 font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">Use Cases</h2>
            <p className="mt-3 text-slate-600">See how Zalgo text is used for creative and fun purposes.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Creepy Social Posts", before: "He comes", after: "H̸̡̎ë̵̩ c̷̛̗o̴̢̎m̸̧̈e̶̜̕s̵̹̎" },
              { title: "Horror Memes", before: "Behind you", after: "B̶̨̈́e̷̻̽h̸̲̄i̴̛̱n̶̡̔d̴̰̈́ y̵̛̗o̸̜̊u̶̗̇" },
              { title: "Game Usernames", before: "DarkKnight", after: "D̵̰̑a̸̝̋r̶̨̈k̷̞̀K̸̡̈́n̵̜̈i̴̛̮g̸̝̊h̵̹̄t̶̗̆" },
              { title: "Spooky Messages", before: "Goodbye", after: "G̷̱̈́o̸̜̾o̵̡̔d̶̰̑b̸̨̋y̵̛̗e̸̻̊" },
            ].map((uc, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-3">
                  <h3 className="font-semibold text-slate-900">{uc.title}</h3>
                </div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div className="border-r border-slate-100 px-5 py-3">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Input</span>
                    <p className="text-sm text-slate-700">{uc.before}</p>
                  </div>
                  <div className="px-5 py-3">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Output</span>
                    <p className="text-sm text-slate-700">{uc.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="create-zalgo-text" />
      <ToolCta theme="purple" />
      <FooterSection />
    </div>
  );
}
