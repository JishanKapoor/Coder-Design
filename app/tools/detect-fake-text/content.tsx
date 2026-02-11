"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Trash2, Search, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Known homoglyphs: non-ASCII chars that mimic ASCII ── */
const HOMOGLYPH_MAP: Record<string, string> = {
  "\u0430": "a", "\u0435": "e", "\u043E": "o", "\u0440": "p",
  "\u0441": "c", "\u0445": "x", "\u0456": "i", "\u0455": "s",
  "\u0443": "y", "\u0410": "A", "\u0415": "E", "\u041E": "O",
  "\u0420": "P", "\u0421": "C", "\u0425": "X", "\u0406": "I",
  "\u0405": "S", "\u0422": "T", "\u041D": "H", "\u0412": "B",
  "\u041C": "M", "\u041A": "K",
};

/* Zero-width characters */
const ZERO_WIDTH: Record<string, string> = {
  "\u200B": "Zero-Width Space (U+200B)",
  "\u200C": "Zero-Width Non-Joiner (U+200C)",
  "\u200D": "Zero-Width Joiner (U+200D)",
  "\uFEFF": "Byte Order Mark / Zero-Width No-Break Space (U+FEFF)",
  "\u200E": "Left-to-Right Mark (U+200E)",
  "\u200F": "Right-to-Left Mark (U+200F)",
  "\u00AD": "Soft Hyphen (U+00AD)",
  "\u2060": "Word Joiner (U+2060)",
  "\u2061": "Function Application (U+2061)",
  "\u2062": "Invisible Times (U+2062)",
  "\u2063": "Invisible Separator (U+2063)",
  "\u2064": "Invisible Plus (U+2064)",
};

interface Issue {
  type: "homoglyph" | "zero-width" | "mixed-script" | "invisible";
  position: number;
  char: string;
  description: string;
}

function getUnicodeBlock(cp: number): string {
  if (cp >= 0x0000 && cp <= 0x007F) return "Basic Latin (ASCII)";
  if (cp >= 0x0080 && cp <= 0x00FF) return "Latin-1 Supplement";
  if (cp >= 0x0100 && cp <= 0x024F) return "Latin Extended";
  if (cp >= 0x0400 && cp <= 0x04FF) return "Cyrillic";
  if (cp >= 0x0500 && cp <= 0x052F) return "Cyrillic Supplement";
  if (cp >= 0x0370 && cp <= 0x03FF) return "Greek and Coptic";
  if (cp >= 0x0530 && cp <= 0x058F) return "Armenian";
  if (cp >= 0x2000 && cp <= 0x206F) return "General Punctuation";
  if (cp >= 0x2070 && cp <= 0x209F) return "Superscripts and Subscripts";
  if (cp >= 0x20A0 && cp <= 0x20CF) return "Currency Symbols";
  if (cp >= 0x2100 && cp <= 0x214F) return "Letterlike Symbols";
  if (cp >= 0x2190 && cp <= 0x21FF) return "Arrows";
  if (cp >= 0x2200 && cp <= 0x22FF) return "Mathematical Operators";
  if (cp >= 0x2300 && cp <= 0x23FF) return "Miscellaneous Technical";
  if (cp >= 0x2500 && cp <= 0x257F) return "Box Drawing";
  if (cp >= 0x2580 && cp <= 0x259F) return "Block Elements";
  if (cp >= 0x25A0 && cp <= 0x25FF) return "Geometric Shapes";
  if (cp >= 0x2600 && cp <= 0x26FF) return "Miscellaneous Symbols";
  if (cp >= 0x2700 && cp <= 0x27BF) return "Dingbats";
  if (cp >= 0xFE00 && cp <= 0xFE0F) return "Variation Selectors";
  if (cp >= 0x1D400 && cp <= 0x1D7FF) return "Mathematical Alphanumeric Symbols";
  if (cp >= 0x1F600 && cp <= 0x1F64F) return "Emoticons";
  if (cp >= 0x1F300 && cp <= 0x1F5FF) return "Misc Symbols and Pictographs";
  return "Other";
}

export default function DetectFakeTextTool() {
  const [input, setInput] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [blockBreakdown, setBlockBreakdown] = useState<Record<string, number>>({});

  const analyzeText = () => {
    if (!input) { setIssues([]); setAnalyzed(false); setBlockBreakdown({}); return; }

    const found: Issue[] = [];
    const blocks: Record<string, number> = {};
    let hasLatin = false;
    let hasCyrillic = false;

    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      const cp = ch.codePointAt(0)!;
      const block = getUnicodeBlock(cp);
      blocks[block] = (blocks[block] || 0) + 1;

      if (cp >= 0x0041 && cp <= 0x007A) hasLatin = true;
      if (cp >= 0x0400 && cp <= 0x04FF) hasCyrillic = true;

      // Check homoglyphs
      if (HOMOGLYPH_MAP[ch]) {
        found.push({ type: "homoglyph", position: i, char: ch, description: `"${ch}" (U+${cp.toString(16).toUpperCase().padStart(4, "0")}) looks like "${HOMOGLYPH_MAP[ch]}" but is ${block}` });
      }

      // Check zero-width
      if (ZERO_WIDTH[ch]) {
        found.push({ type: "zero-width", position: i, char: ch, description: ZERO_WIDTH[ch] });
      }

      // Check other invisible characters
      if (cp > 0x7F && cp < 0x10000 && !HOMOGLYPH_MAP[ch] && !ZERO_WIDTH[ch]) {
        const cat = String.fromCodePoint(cp);
        if (/^\p{Cf}$/u.test(cat)) {
          found.push({ type: "invisible", position: i, char: ch, description: `Invisible format character (U+${cp.toString(16).toUpperCase().padStart(4, "0")})` });
        }
      }
    }

    // Mixed-script detection
    if (hasLatin && hasCyrillic) {
      found.unshift({ type: "mixed-script", position: -1, char: "", description: "Text contains both Latin and Cyrillic characters — potential homoglyph attack" });
    }

    setIssues(found);
    setBlockBreakdown(blocks);
    setAnalyzed(true);
  };

  const severityColor = (type: Issue["type"]) => {
    switch (type) {
      case "homoglyph": return "bg-red-100 text-red-700 border-red-200";
      case "zero-width": return "bg-amber-100 text-amber-700 border-amber-200";
      case "mixed-script": return "bg-orange-100 text-orange-700 border-orange-200";
      case "invisible": return "bg-purple-100 text-purple-700 border-purple-200";
    }
  };

  const severityLabel = (type: Issue["type"]) => {
    switch (type) {
      case "homoglyph": return "Homoglyph";
      case "zero-width": return "Zero-Width";
      case "mixed-script": return "Mixed Script";
      case "invisible": return "Invisible";
    }
  };

  const faqs = [
    { question: "What does this tool detect?", answer: "It scans text for Unicode homoglyphs (characters that look like Latin letters but come from other scripts like Cyrillic), zero-width invisible characters, mixed-script usage, and other invisible formatting characters." },
    { question: "Why are homoglyphs dangerous?", answer: "Homoglyphs can be used for phishing (e.g., a URL that looks like 'apple.com' but uses Cyrillic characters), bypassing content filters, evading plagiarism detection, and social engineering attacks." },
    { question: "What are zero-width characters used for?", answer: "Zero-width characters are legitimate Unicode characters used in some languages for proper text rendering. However, they can also be inserted maliciously to watermark text, bypass filters, or create hidden content." },
    { question: "What does 'mixed script' mean?", answer: "Mixed script means the text contains characters from multiple writing systems (e.g., Latin and Cyrillic). While sometimes legitimate, it can indicate homoglyph substitution attacks." },
    { question: "Is my data private?", answer: "Yes. All analysis happens locally in your browser — no data is ever sent to any server." },
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
            <span className="text-white">Detect Fake Text</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Detect Fake Unicode Text</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Detect hidden Unicode characters, homoglyphs, and zero-width characters in suspicious text. Identify potential security threats and deceptive content.</p>
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
            <label className="mb-2 block text-sm font-semibold text-slate-900">Paste Suspicious Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text you want to analyze for hidden characters..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={analyzeText} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Search className="h-4 w-4 flex-shrink-0" /><span>Analyze Text</span></button>
            <button onClick={() => { setInput(""); setIssues([]); setAnalyzed(false); setBlockBreakdown({}); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          {/* Analysis Report */}
          {analyzed && (
            <div className="space-y-4">
              {/* Summary */}
              <div className={`flex items-start gap-3 rounded-xl border p-5 ${issues.length === 0 ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                {issues.length === 0 ? (
                  <><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" /><div><h3 className="text-sm font-semibold text-green-800">Text appears clean</h3><p className="mt-1 text-sm text-green-700">No homoglyphs, zero-width characters, or suspicious Unicode detected.</p></div></>
                ) : (
                  <><AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" /><div><h3 className="text-sm font-semibold text-red-800">{issues.length} issue{issues.length !== 1 ? "s" : ""} detected</h3><p className="mt-1 text-sm text-red-700">Suspicious Unicode characters were found in the text.</p></div></>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                  <p className="text-2xl font-bold text-slate-900">{input.length}</p>
                  <p className="text-xs text-slate-500">Total Characters</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{issues.filter((i) => i.type === "homoglyph").length}</p>
                  <p className="text-xs text-slate-500">Homoglyphs</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                  <p className="text-2xl font-bold text-amber-600">{issues.filter((i) => i.type === "zero-width").length}</p>
                  <p className="text-xs text-slate-500">Zero-Width</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{issues.filter((i) => i.type === "invisible").length}</p>
                  <p className="text-xs text-slate-500">Invisible</p>
                </div>
              </div>

              {/* Unicode Block Breakdown */}
              {Object.keys(blockBreakdown).length > 1 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900"><Info className="h-4 w-4 text-slate-400" />Unicode Block Breakdown</h3>
                  <div className="space-y-2">
                    {Object.entries(blockBreakdown).sort(([, a], [, b]) => b - a).map(([block, count]) => (
                      <div key={block} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700">{block}</span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{count} chars</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Issues List */}
              {issues.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="mb-3 text-sm font-semibold text-slate-900">Detected Issues</h3>
                  <div className="max-h-80 space-y-2 overflow-y-auto">
                    {issues.map((issue, idx) => (
                      <div key={idx} className={`flex items-start gap-3 rounded-lg border p-3 ${severityColor(issue.type)}`}>
                        <span className="mt-0.5 inline-flex flex-shrink-0 items-center rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{severityLabel(issue.type)}</span>
                        <div className="min-w-0 flex-1 text-sm">
                          <p>{issue.description}</p>
                          {issue.position >= 0 && <p className="mt-0.5 text-xs opacity-70">Position: {issue.position}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="detect-fake-text" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
