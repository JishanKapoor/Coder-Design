"use client";
import { useState, useMemo, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Trash2, Search } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

interface MatchResult {
  text: string;
  index: number;
  groups: string[];
}

const QUICK_PATTERNS: { label: string; pattern: string; flags: string }[] = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "g" },
  { label: "URL", pattern: "https?://[^\\s/$.?#].[^\\s]*", flags: "gi" },
  { label: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: "g" },
  { label: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}", flags: "g" },
  { label: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { label: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b", flags: "gi" },
];

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flagG, setFlagG] = useState(true);
  const [flagI, setFlagI] = useState(false);
  const [flagM, setFlagM] = useState(false);
  const [flagS, setFlagS] = useState(false);
  const [regexError, setRegexError] = useState("");

  const flags = `${flagG ? "g" : ""}${flagI ? "i" : ""}${flagM ? "m" : ""}${flagS ? "s" : ""}`;

  const { matches, highlighted } = useMemo(() => {
    if (!pattern || !testString) return { matches: [] as MatchResult[], highlighted: "" };
    try {
      const re = new RegExp(pattern, flags);
      setRegexError("");
      const results: MatchResult[] = [];
      let m: RegExpExecArray | null;

      if (flagG) {
        while ((m = re.exec(testString)) !== null) {
          results.push({ text: m[0], index: m.index, groups: m.slice(1) });
          if (m[0].length === 0) re.lastIndex++; // avoid infinite loop on zero-length matches
        }
      } else {
        m = re.exec(testString);
        if (m) results.push({ text: m[0], index: m.index, groups: m.slice(1) });
      }

      // Build highlighted string
      let html = "";
      let last = 0;
      const colors = ["bg-violet-200", "bg-blue-200", "bg-green-200", "bg-amber-200", "bg-pink-200"];
      results.forEach((r, i) => {
        const before = testString.slice(last, r.index);
        html += escapeHtml(before);
        html += `<mark class="${colors[i % colors.length]} rounded px-0.5">${escapeHtml(r.text)}</mark>`;
        last = r.index + r.text.length;
      });
      html += escapeHtml(testString.slice(last));

      return { matches: results, highlighted: html };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid regex";
      setRegexError(msg);
      return { matches: [] as MatchResult[], highlighted: "" };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pattern, testString, flags]);

  const applyQuickPattern = useCallback((p: { pattern: string; flags: string }) => {
    setPattern(p.pattern);
    setFlagG(p.flags.includes("g"));
    setFlagI(p.flags.includes("i"));
    setFlagM(p.flags.includes("m"));
    setFlagS(p.flags.includes("s"));
  }, []);

  const faqs = [
    { question: "How does real-time regex testing work?", answer: "As you type your pattern and test string, the tool instantly compiles the regex and runs it against the test string. Matches are highlighted in-place and listed below with their positions and capture groups." },
    { question: "What are regex flags?", answer: "Flags modify how the regex engine behaves: g (global) finds all matches, i (case-insensitive) ignores case, m (multiline) makes ^ and $ match line starts/ends, s (dotAll) makes . match newlines." },
    { question: "What are capture groups?", answer: "Capture groups are parts of the regex enclosed in parentheses (). They let you extract specific portions of a match. Named groups use (?<name>...) syntax." },
    { question: "What if my regex has an error?", answer: "The tool gracefully catches regex compilation errors and displays a descriptive error message so you can fix the pattern." },
    { question: "Is my data private?", answer: "Yes. All regex testing happens locally in your browser — no data is sent to any server." },
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
            <span className="text-white">Regex Tester</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Regex Tester</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Test and debug regular expressions in real-time. See matches highlighted with capture groups and explanations.</p>
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
          {/* Pattern input */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Regular Expression</label>
            <div className="flex items-center gap-2">
              <span className="text-lg text-slate-400 font-mono">/</span>
              <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Enter regex pattern..." className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors font-mono" />
              <span className="text-lg text-slate-400 font-mono">/{flags}</span>
            </div>
            {regexError && <p className="mt-1.5 text-xs text-red-600">{regexError}</p>}
          </div>

          {/* Flags */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-medium text-slate-600">Flags:</span>
            {[
              { label: "g (global)", checked: flagG, set: setFlagG },
              { label: "i (case-insensitive)", checked: flagI, set: setFlagI },
              { label: "m (multiline)", checked: flagM, set: setFlagM },
              { label: "s (dotAll)", checked: flagS, set: setFlagS },
            ].map((f) => (
              <label key={f.label} className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={f.checked} onChange={(e) => f.set(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                <span className="text-sm text-slate-700 font-mono">{f.label}</span>
              </label>
            ))}
          </div>

          {/* Test string */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Test String</label>
            <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test against..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors font-mono" />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => { setPattern(""); setTestString(""); setRegexError(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear All</span></button>
            <span className="text-sm text-slate-500">{matches.length} match{matches.length !== 1 ? "es" : ""} found</span>
          </div>

          {/* Highlighted result */}
          {highlighted && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Highlighted Matches</label>
              <div className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 font-mono whitespace-pre-wrap break-all" dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>
          )}

          {/* Match list */}
          {matches.length > 0 && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Match Details</label>
              <div className="space-y-2 max-h-64 overflow-auto">
                {matches.map((m, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 bg-white p-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{i + 1}</span>
                      <code className="font-mono text-slate-900">&quot;{m.text}&quot;</code>
                      <span className="text-xs text-slate-400">index {m.index}</span>
                    </div>
                    {m.groups.length > 0 && (
                      <div className="mt-1.5 ml-9 flex flex-wrap gap-2">
                        {m.groups.map((g, gi) => (
                          <span key={gi} className="inline-flex items-center rounded bg-blue-50 px-2 py-0.5 text-xs font-mono text-blue-700">Group {gi + 1}: &quot;{g ?? ""}&quot;</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick reference */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Quick Patterns</label>
            <div className="flex flex-wrap gap-2">
              {QUICK_PATTERNS.map((p) => (
                <button key={p.label} onClick={() => applyQuickPattern(p)} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-700 transition-colors">
                  <Search className="mr-1 inline h-3 w-3" />{p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="regex-tester" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}

/* ── Utility ── */
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
