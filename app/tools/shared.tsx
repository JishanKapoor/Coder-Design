"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown, ArrowRight, Layers, Type, Eraser, Hash, Sparkles,
  SmilePlus, Search, Scissors, Link2, RotateCw, ArrowLeftRight,
  List, AlignLeft, AlignRight, AlignCenter, AlignJustify, Indent,
  WrapText, Copy as CopyIcon, Replace, Shuffle, Palette, Bold,
  Italic, Underline, Strikethrough, Circle, Pen, Maximize2, EyeOff,
  ExternalLink, Braces, FileCode2, Regex, Globe, Lock, BarChart3,
  Tags, FileText, Code2, Zap, Table,
} from "lucide-react";

/* ── Full tools catalog (used for Related Tools randomization) ── */
export const allTools: { href: string; label: string; category: string; icon: React.ElementType; color: string }[] = [
  { href: "/tools/add-prefix-suffix-lines", label: "Add Prefix & Suffix", category: "Text", icon: Type, color: "bg-violet-100 text-violet-600" },
  { href: "/tools/alternating-case-converter", label: "Alternating Case", category: "Text", icon: Type, color: "bg-violet-100 text-violet-600" },
  { href: "/tools/comma-to-column", label: "Comma to Column", category: "Text", icon: List, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/duplicate-eraser", label: "Duplicate Eraser", category: "Text", icon: Eraser, color: "bg-red-100 text-red-600" },
  { href: "/tools/lines-counter", label: "Lines Counter", category: "Text", icon: Hash, color: "bg-teal-100 text-teal-600" },
  { href: "/tools/special-character-remover", label: "Special Char Remover", category: "Text", icon: Sparkles, color: "bg-orange-100 text-orange-600" },
  { href: "/tools/emoji-remover", label: "Emoji Remover", category: "Text", icon: SmilePlus, color: "bg-pink-100 text-pink-600" },
  { href: "/tools/emoji-counter", label: "Emoji Counter", category: "Text", icon: Hash, color: "bg-teal-100 text-teal-600" },
  { href: "/tools/repeated-words-finder", label: "Repeated Words Finder", category: "Text", icon: Search, color: "bg-amber-100 text-amber-600" },
  { href: "/tools/split-text", label: "Split Text", category: "Text", icon: Scissors, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/join-text", label: "Join Text", category: "Text", icon: Link2, color: "bg-green-100 text-green-600" },
  { href: "/tools/repeat-text", label: "Repeat Text", category: "Text", icon: RotateCw, color: "bg-indigo-100 text-indigo-600" },
  { href: "/tools/reverse-text", label: "Reverse Text", category: "Text", icon: ArrowLeftRight, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/truncate-text", label: "Truncate Text", category: "Text", icon: Scissors, color: "bg-red-100 text-red-600" },
  { href: "/tools/trim-text", label: "Trim Text", category: "Text", icon: Scissors, color: "bg-amber-100 text-amber-600" },
  { href: "/tools/slice-text", label: "Slice Text", category: "Text", icon: Scissors, color: "bg-orange-100 text-orange-600" },
  { href: "/tools/right-align-text", label: "Right-Align Text", category: "Formatting", icon: AlignRight, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/right-pad-text", label: "Right-Pad Text", category: "Formatting", icon: AlignRight, color: "bg-sky-100 text-sky-600" },
  { href: "/tools/left-align-text", label: "Left-Align Text", category: "Formatting", icon: AlignLeft, color: "bg-green-100 text-green-600" },
  { href: "/tools/left-pad-text", label: "Left-Pad Text", category: "Formatting", icon: AlignLeft, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/center-text", label: "Center Text", category: "Formatting", icon: AlignCenter, color: "bg-violet-100 text-violet-600" },
  { href: "/tools/indent-text", label: "Indent Text", category: "Formatting", icon: Indent, color: "bg-teal-100 text-teal-600" },
  { href: "/tools/unindent-text", label: "Unindent Text", category: "Formatting", icon: Indent, color: "bg-cyan-100 text-cyan-600" },
  { href: "/tools/justify-text", label: "Justify Text", category: "Formatting", icon: AlignJustify, color: "bg-indigo-100 text-indigo-600" },
  { href: "/tools/wrap-text", label: "Wrap Text", category: "Formatting", icon: WrapText, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/reverse-words", label: "Reverse Words", category: "Text", icon: ArrowLeftRight, color: "bg-pink-100 text-pink-600" },
  { href: "/tools/reverse-sentences", label: "Reverse Sentences", category: "Text", icon: ArrowLeftRight, color: "bg-rose-100 text-rose-600" },
  { href: "/tools/reverse-paragraphs", label: "Reverse Paragraphs", category: "Text", icon: ArrowLeftRight, color: "bg-fuchsia-100 text-fuchsia-600" },
  { href: "/tools/word-duplicator", label: "Word Duplicator", category: "Text", icon: CopyIcon, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/word-remover", label: "Word Remover", category: "Text", icon: Eraser, color: "bg-red-100 text-red-600" },
  { href: "/tools/sentence-duplicator", label: "Sentence Duplicator", category: "Text", icon: CopyIcon, color: "bg-green-100 text-green-600" },
  { href: "/tools/sentence-remover", label: "Sentence Remover", category: "Text", icon: Eraser, color: "bg-orange-100 text-orange-600" },
  { href: "/tools/word-replacer", label: "Word Replacer", category: "Text", icon: Replace, color: "bg-amber-100 text-amber-600" },
  { href: "/tools/add-random-words", label: "Add Random Words", category: "Text", icon: Shuffle, color: "bg-lime-100 text-lime-600" },
  { href: "/tools/add-random-letters", label: "Add Random Letters", category: "Text", icon: Shuffle, color: "bg-emerald-100 text-emerald-600" },
  { href: "/tools/add-random-errors", label: "Add Random Errors", category: "Text", icon: Shuffle, color: "bg-red-100 text-red-600" },
  { href: "/tools/create-fake-text", label: "Fake Unicode Text", category: "Style", icon: Palette, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/detect-fake-text", label: "Detect Fake Text", category: "Style", icon: Search, color: "bg-amber-100 text-amber-600" },
  { href: "/tools/normalize-fake-text", label: "Unfake Text", category: "Style", icon: Sparkles, color: "bg-green-100 text-green-600" },
  { href: "/tools/bold-text-generator", label: "Bold Text Generator", category: "Style", icon: Bold, color: "bg-slate-200 text-slate-700" },
  { href: "/tools/tiny-text-generator", label: "Tiny Text Generator", category: "Style", icon: Type, color: "bg-pink-100 text-pink-600" },
  { href: "/tools/text-symbols", label: "Text Symbols", category: "Style", icon: Palette, color: "bg-violet-100 text-violet-600" },
  { href: "/tools/create-zalgo-text", label: "Zalgo Text Generator", category: "Style", icon: Zap, color: "bg-red-100 text-red-600" },
  { href: "/tools/undo-zalgo-text", label: "Undo Zalgo Effect", category: "Style", icon: Sparkles, color: "bg-green-100 text-green-600" },
  { href: "/tools/italic-text-generator", label: "Italic Text Generator", category: "Style", icon: Italic, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/underline-text-generator", label: "Underline Text Generator", category: "Style", icon: Underline, color: "bg-indigo-100 text-indigo-600" },
  { href: "/tools/strikethrough-text-generator", label: "Strikethrough Text", category: "Style", icon: Strikethrough, color: "bg-orange-100 text-orange-600" },
  { href: "/tools/bubble-text-generator", label: "Bubble Text Generator", category: "Style", icon: Circle, color: "bg-cyan-100 text-cyan-600" },
  { href: "/tools/cursive-text-maker", label: "Cursive Text Maker", category: "Style", icon: Pen, color: "bg-rose-100 text-rose-600" },
  { href: "/tools/wide-text-maker", label: "Wide Text Maker", category: "Style", icon: Maximize2, color: "bg-teal-100 text-teal-600" },
  { href: "/tools/censor-text", label: "Censor Text", category: "Text", icon: EyeOff, color: "bg-slate-200 text-slate-700" },
  { href: "/tools/link-extractor", label: "Link Extractor", category: "Developer", icon: ExternalLink, color: "bg-blue-100 text-blue-600" },
  { href: "/tools/json-formatter", label: "JSON Formatter", category: "Developer", icon: Braces, color: "bg-amber-100 text-amber-600" },
  { href: "/tools/code-minifier", label: "Code Minifier", category: "Developer", icon: FileCode2, color: "bg-green-100 text-green-600" },
  { href: "/tools/regex-tester", label: "Regex Tester", category: "Developer", icon: Regex, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/regex-explainer", label: "Regex Explainer", category: "Developer", icon: Regex, color: "bg-indigo-100 text-indigo-600" },
  { href: "/tools/url-encoder-decoder", label: "URL Encoder/Decoder", category: "Developer", icon: Globe, color: "bg-sky-100 text-sky-600" },
  { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder/Decoder", category: "Developer", icon: Lock, color: "bg-orange-100 text-orange-600" },
  { href: "/tools/markdown-table-generator", label: "Markdown Table Generator", category: "Developer", icon: Table, color: "bg-purple-100 text-purple-600" },
  { href: "/tools/seo-content-analyzer", label: "SEO Content Analyzer", category: "SEO", icon: BarChart3, color: "bg-green-100 text-green-600" },
  { href: "/tools/meta-tags-checker", label: "Meta Tags Checker", category: "SEO", icon: Tags, color: "bg-violet-100 text-violet-600" },
  { href: "/tools/url-slug-generator", label: "URL Slug Generator", category: "SEO", icon: Link2, color: "bg-teal-100 text-teal-600" },
  { href: "/tools/og-preview", label: "OG Preview", category: "SEO", icon: Globe, color: "bg-rose-100 text-rose-600" },
];

/* ── Randomized Related Tools Component (8 random tools, no services) ── */
export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const picks = useMemo(() => {
    const others = allTools.filter((t) => t.href !== `/tools/${currentSlug}`);
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
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
            <Link key={t.href} href={t.href} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-violet-300 hover:shadow-md">
              <div className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${t.color}`}><t.icon className="h-4 w-4" /></div>
              <span className="text-sm font-medium text-slate-900 truncate">{t.label}</span>
              <ArrowRight className="ml-auto h-4 w-4 flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-500" />
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
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
    <section className="border-t border-slate-200 bg-slate-50 py-14 lg:py-18">
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
export function ToolCta() {
  return (
    <section className="bg-gradient-to-br from-violet-600 to-indigo-700 py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">Ready to Work Together?</h2>
        <p className="mb-6 text-violet-100">Need a custom tool or web application? Let&apos;s discuss your project.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-violet-600 hover:bg-slate-100">Get in Touch</Link>
          <a href="tel:+14372392448" className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20">Call Us Now</a>
        </div>
      </div>
    </section>
  );
}
