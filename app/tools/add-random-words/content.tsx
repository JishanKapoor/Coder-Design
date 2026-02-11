"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Shuffle } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

const COMMON_WORDS = [
  "the", "and", "but", "very", "quite", "simply", "often", "almost", "really", "just",
  "also", "many", "some", "every", "each", "other", "much", "own", "all", "more",
  "new", "old", "big", "small", "good", "great", "long", "first", "last", "little",
];

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
];

export default function AddRandomWordsTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(5);
  const [position, setPosition] = useState<"random" | "every-n" | "beginning" | "end">("random");
  const [everyN, setEveryN] = useState(3);
  const [category, setCategory] = useState<"common" | "lorem" | "custom">("common");
  const [customWords, setCustomWords] = useState("");

  const getWordList = (): string[] => {
    if (category === "lorem") return LOREM_WORDS;
    if (category === "custom") {
      const list = customWords.split(",").map((w) => w.trim()).filter(Boolean);
      return list.length > 0 ? list : COMMON_WORDS;
    }
    return COMMON_WORDS;
  };

  const randomWord = (list: string[]) => list[Math.floor(Math.random() * list.length)];

  const addWords = () => {
    if (!input.trim()) { setOutput(""); return; }
    const wordList = getWordList();
    const words = input.split(/\s+/);

    if (position === "beginning") {
      const toAdd = Array.from({ length: wordCount }, () => randomWord(wordList));
      setOutput([...toAdd, ...words].join(" "));
      return;
    }

    if (position === "end") {
      const toAdd = Array.from({ length: wordCount }, () => randomWord(wordList));
      setOutput([...words, ...toAdd].join(" "));
      return;
    }

    if (position === "every-n") {
      const result: string[] = [];
      words.forEach((w, i) => {
        result.push(w);
        if ((i + 1) % everyN === 0 && i < words.length - 1) {
          result.push(randomWord(wordList));
        }
      });
      setOutput(result.join(" "));
      return;
    }

    // random positions
    const result = [...words];
    for (let i = 0; i < wordCount; i++) {
      const pos = Math.floor(Math.random() * (result.length + 1));
      result.splice(pos, 0, randomWord(wordList));
    }
    setOutput(result.join(" "));
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "random-words-text.txt"; a.click(); };

  const faqs = [
    { question: "What word lists are available?", answer: "You can choose from common English words, Lorem Ipsum words, or provide your own custom comma-separated word list." },
    { question: "Where are the random words inserted?", answer: "You can insert them at random positions throughout the text, after every N words, or at the beginning or end of the text." },
    { question: "Can I control how many words are added?", answer: "Yes. Use the 'Number of words' option to set exactly how many random words to insert (1–50)." },
    { question: "What is this tool useful for?", answer: "It's great for testing text-processing software, creating training data, obfuscating text, or adding variety to sample content." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — nothing is sent to any server." },
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
            <span className="text-white">Add Random Words</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Add Random Words to Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Insert random words at random positions in your text. Great for testing, obfuscation, and text augmentation.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste your text here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Number of Words</label>
              <input type="number" min={1} max={50} value={wordCount} onChange={(e) => setWordCount(Math.max(1, Math.min(50, Number(e.target.value))))} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Insert Position</label>
              <select value={position} onChange={(e) => setPosition(e.target.value as typeof position)} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
                <option value="random">Random positions</option>
                <option value="every-n">After every N words</option>
                <option value="beginning">Beginning of text</option>
                <option value="end">End of text</option>
              </select>
            </div>
          </div>

          {position === "every-n" && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Insert After Every N Words</label>
              <input type="number" min={1} max={100} value={everyN} onChange={(e) => setEveryN(Math.max(1, Math.min(100, Number(e.target.value))))} className="h-10 w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Word List Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className="h-10 w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
              <option value="common">Common English Words</option>
              <option value="lorem">Lorem Ipsum Words</option>
              <option value="custom">Custom Word List</option>
            </select>
          </div>

          {category === "custom" && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Custom Words (comma-separated)</label>
              <input type="text" value={customWords} onChange={(e) => setCustomWords(e.target.value)} placeholder="word1, word2, word3..." className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            </div>
          )}

          <div className="flex items-center gap-3">
            <button onClick={addWords} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Shuffle className="h-4 w-4 flex-shrink-0" /><span>Add Words</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Text with random words will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="add-random-words" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
