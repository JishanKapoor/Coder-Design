"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown, ArrowRight, Layers, Type, Eraser, Hash, Sparkles,
  SmilePlus, Search, Scissors, Link2, RotateCw, ArrowLeftRight,
  List, Replace, Palette, Bold,
  Italic, Underline, Strikethrough, Circle, Pen, Maximize2, EyeOff,
  ExternalLink, Braces, FileCode2, Regex, Globe, Lock,
  Code2, Zap, Table, Eye, Link as LinkIcon,
} from "lucide-react";

/* ── Full tools catalog (used for Related Tools randomization) ── */
export const allTools: { href: string; label: string; category: string; icon: React.ElementType; color: string }[] = [
  /* ── Text Tools ── */
  { href: "/tools/add-prefix-suffix-lines", label: "Add Prefix & Suffix", category: "Text", icon: Type, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/alternating-case-converter", label: "Alternating Case", category: "Text", icon: Type, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/comma-to-column", label: "Comma to Column", category: "Text", icon: List, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/duplicate-eraser", label: "Duplicate Eraser", category: "Text", icon: Eraser, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/lines-counter", label: "Lines Counter", category: "Text", icon: Hash, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/special-character-remover", label: "Special Char Remover", category: "Text", icon: Sparkles, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/emoji-remover", label: "Emoji Remover", category: "Text", icon: SmilePlus, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/emoji-counter", label: "Emoji Counter", category: "Text", icon: Hash, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/repeated-words-finder", label: "Repeated Words Finder", category: "Text", icon: Search, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/split-text", label: "Split Text", category: "Text", icon: Scissors, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/join-text", label: "Join Text", category: "Text", icon: Link2, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/repeat-text", label: "Repeat Text", category: "Text", icon: RotateCw, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/reverse-text", label: "Reverse Text", category: "Text", icon: ArrowLeftRight, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/truncate-text", label: "Truncate Text", category: "Text", icon: Scissors, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/trim-text", label: "Trim Text", category: "Text", icon: Scissors, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/reverse-words", label: "Reverse Words", category: "Text", icon: ArrowLeftRight, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/word-remover", label: "Word Remover", category: "Text", icon: Eraser, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/word-replacer", label: "Word Replacer", category: "Text", icon: Replace, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/censor-text", label: "Censor Text", category: "Text", icon: EyeOff, color: "bg-blue-100 text-blue-600" },
  /* ── Style Tools ── */
  { href: "/tools/bold-text-generator", label: "Bold Text Generator", category: "Style", icon: Bold, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/tiny-text-generator", label: "Tiny Text Generator", category: "Style", icon: Type, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/text-symbols", label: "Text Symbols", category: "Style", icon: Palette, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/create-zalgo-text", label: "Zalgo Text Generator", category: "Style", icon: Zap, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/undo-zalgo-text", label: "Undo Zalgo Effect", category: "Style", icon: Sparkles, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/italic-text-generator", label: "Italic Text Generator", category: "Style", icon: Italic, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/underline-text-generator", label: "Underline Text Generator", category: "Style", icon: Underline, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/strikethrough-text-generator", label: "Strikethrough Text", category: "Style", icon: Strikethrough, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/bubble-text-generator", label: "Bubble Text Generator", category: "Style", icon: Circle, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/cursive-text-maker", label: "Cursive Text Maker", category: "Style", icon: Pen, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/wide-text-maker", label: "Wide Text Maker", category: "Style", icon: Maximize2, color: "bg-purple-100 text-purple-600" },
  /* ── Developer Tools ── */
  { href: "/tools/link-extractor", label: "Link Extractor", category: "Developer", icon: ExternalLink, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/json-formatter", label: "JSON Formatter", category: "Developer", icon: Braces, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/code-minifier", label: "Code Minifier", category: "Developer", icon: FileCode2, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/regex-tester", label: "Regex Tester", category: "Developer", icon: Regex, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/regex-explainer", label: "Regex Explainer", category: "Developer", icon: Regex, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/url-encoder-decoder", label: "URL Encoder/Decoder", category: "Developer", icon: Globe, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder/Decoder", category: "Developer", icon: Lock, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/markdown-table-generator", label: "Markdown Table Generator", category: "Developer", icon: Table, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/url-slug-generator", label: "URL Slug Generator", category: "Developer", icon: LinkIcon, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/og-preview", label: "OG Preview", category: "Developer", icon: Eye, color: "bg-emerald-100 text-emerald-600" },
];

/* ── Randomized Related Tools Component (8 random tools, no services) ── */
export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const deterministic = useMemo(() => {
    const others = allTools.filter((t) => t.href !== `/tools/${currentSlug}`);
    return others.slice(0, 8);
  }, [currentSlug]);

  const [picks, setPicks] = useState(deterministic);

  useEffect(() => {
    const others = allTools.filter((t) => t.href !== `/tools/${currentSlug}`);
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    setPicks(shuffled.slice(0, 8));
  }, [currentSlug]);

  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Explore More Free Tools</h2>
          <p className="mx-auto max-w-2xl text-slate-600">Discover more free online tools built by CoderDesign — all instant, private, and no sign-up required.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((t) => (
            <Link key={t.href} href={t.href} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-md">
              <div className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${t.color}`}><t.icon className="h-4 w-4" /></div>
              <span className="text-sm font-medium text-slate-900 truncate">{t.label}</span>
              <ArrowRight className="ml-auto h-4 w-4 flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" />
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            View All Free Tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Reusable FAQ Accordion ── */
export function ToolFaq({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors" aria-expanded={isOpen}>
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600">{faq.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Reusable CTA Section ── */
export function ToolCta({ theme = "blue" }: { theme?: "blue" | "purple" | "emerald" }) {
  const styles = {
    blue:    { bg: "bg-blue-600",    btn: "text-blue-700 hover:bg-blue-50" },
    purple:  { bg: "bg-purple-600",  btn: "text-purple-700 hover:bg-purple-50" },
    emerald: { bg: "bg-emerald-600", btn: "text-emerald-700 hover:bg-emerald-50" },
  };
  const s = styles[theme];
  return (
    <section className={`${s.bg} py-16`}>
      <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">Ready to Work Together?</h2>
        <p className="mb-6 text-white/90">Need a custom tool or web application? Let&apos;s discuss your project.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={`inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold ${s.btn}`}>Get in Touch</Link>
          <a href="tel:+14372392448" className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20">Call Us Now</a>
        </div>
      </div>
    </section>
  );
}
