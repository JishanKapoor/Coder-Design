"use client";
import { useState, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Braces, Code } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── helpers ── */
function countKeys(obj: unknown): number {
  if (obj === null || typeof obj !== "object") return 0;
  if (Array.isArray(obj)) return obj.reduce((n, v) => n + countKeys(v), 0);
  const entries = Object.entries(obj as Record<string, unknown>);
  return entries.reduce((n, [, v]) => n + 1 + countKeys(v), 0);
}

function maxDepth(obj: unknown, d = 0): number {
  if (obj === null || typeof obj !== "object") return d;
  if (Array.isArray(obj)) return obj.reduce((m, v) => Math.max(m, maxDepth(v, d + 1)), d);
  return Object.values(obj as Record<string, unknown>).reduce((m: number, v) => Math.max(m, maxDepth(v, d + 1)), d);
}

function sortKeysDeep(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sortKeysDeep);
  const sorted: Record<string, unknown> = {};
  Object.keys(obj as Record<string, unknown>).sort().forEach((k) => { sorted[k] = sortKeysDeep((obj as Record<string, unknown>)[k]); });
  return sorted;
}

function syntaxHighlight(json: string): string {
  return json.replace(/("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
    let cls = "text-amber-700"; // number
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? "text-emerald-700 font-semibold" : "text-green-700"; // key : string
    } else if (/true|false/.test(match)) {
      cls = "text-blue-600";
    } else if (/null/.test(match)) {
      cls = "text-slate-400";
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

type IndentType = "2" | "4" | "tab";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [highlighted, setHighlighted] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState<IndentType>("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [stats, setStats] = useState<{ keys: number; depth: number; inputBytes: number; outputBytes: number } | null>(null);

  const indentValue = indent === "tab" ? "\t" : Number(indent);

  const format = useCallback(() => {
    if (!input.trim()) { setOutput(""); setHighlighted(""); setError(""); setStats(null); return; }
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortKeysDeep(parsed);
      const result = JSON.stringify(parsed, null, indentValue);
      setOutput(result);
      setHighlighted(syntaxHighlight(result));
      setError("");
      setStats({ keys: countKeys(parsed), depth: maxDepth(parsed), inputBytes: new Blob([input]).size, outputBytes: new Blob([result]).size });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setOutput("");
      setHighlighted("");
      setError(msg);
      setStats(null);
    }
  }, [input, indent, sortKeys, indentValue]);

  const minify = useCallback(() => {
    if (!input.trim()) return;
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortKeysDeep(parsed);
      const result = JSON.stringify(parsed);
      setOutput(result);
      setHighlighted(syntaxHighlight(result));
      setError("");
      setStats({ keys: countKeys(parsed), depth: maxDepth(parsed), inputBytes: new Blob([input]).size, outputBytes: new Blob([result]).size });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setOutput("");
      setHighlighted("");
      setError(msg);
      setStats(null);
    }
  }, [input, sortKeys]);

  const validate = useCallback(() => {
    if (!input.trim()) return;
    try {
      JSON.parse(input);
      setError("");
      setOutput("✅ Valid JSON");
      setHighlighted("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
      setHighlighted("");
    }
  }, [input]);

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "formatted.json"; a.click(); };

  const faqs = [
    { question: "What does this JSON formatter do?", answer: "It parses your JSON input, validates its syntax, and re-formats it with configurable indentation (2 spaces, 4 spaces, or tabs). It can also minify JSON by removing all unnecessary whitespace, and sort keys alphabetically." },
    { question: "What happens if my JSON is invalid?", answer: "The tool catches the parse error and displays a descriptive error message pointing to the issue in your JSON. You can use the Validate button to quickly check syntax without formatting." },
    { question: "Does the tool sort object keys?", answer: "Yes. Toggle the 'Sort Keys' option to alphabetically sort all keys in your JSON objects at every nesting level. This is useful for comparing two JSON documents." },
    { question: "Why is the output syntax-highlighted?", answer: "The formatted output uses color-coded highlighting: green for keys, green for strings, amber for numbers, blue for booleans, and gray for null values — making it easier to scan large documents." },
    { question: "Is my data private?", answer: "Absolutely. All formatting and validation happens locally in your browser — no JSON data is sent to any server." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-emerald-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} /></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">JSON Formatter &amp; Validator</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">JSON Formatter &amp; Validator</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Format, validate, and beautify JSON data online. Minify or pretty-print with customizable indentation and syntax highlighting.</p>
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
            <label className="mb-2 block text-sm font-semibold text-slate-900">JSON Input</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"key": "value", "numbers": [1, 2, 3]}' rows={10} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors font-mono" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Options</h3>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Indentation</label>
                <select value={indent} onChange={(e) => setIndent(e.target.value as IndentType)} className="h-9 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none">
                  <option value="2">2 Spaces</option>
                  <option value="4">4 Spaces</option>
                  <option value="tab">Tab</option>
                </select>
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer sm:pt-4">
                <input type="checkbox" checked={sortKeys} onChange={(e) => setSortKeys(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm text-slate-700">Sort Keys</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={format} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full sm:w-auto whitespace-nowrap"><Braces className="h-4 w-4 flex-shrink-0" /><span>Format JSON</span></button>
            <button onClick={minify} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap">Minify</button>
            <button onClick={validate} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap">Validate</button>
            <button onClick={() => { setInput(""); setOutput(""); setHighlighted(""); setError(""); setStats(null); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Keys", value: stats.keys },
                { label: "Max Depth", value: stats.depth },
                { label: "Input Size", value: `${stats.inputBytes} B` },
                { label: "Output Size", value: `${stats.outputBytes} B` },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                  <div className="text-lg font-bold text-emerald-700">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Output */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              {highlighted ? (
                <pre
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 font-mono overflow-auto max-h-[28rem] whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              ) : (
                <textarea value={output} readOnly placeholder="Formatted JSON will appear here..." rows={10} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              )}
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* ── How-To Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Format JSON</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Beautify and validate JSON data instantly.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Paste JSON", description: "Paste your raw or minified JSON." },
              { step: 2, title: "Click Format", description: "Beautify with proper indentation." },
              { step: 3, title: "Review Output", description: "See clean, readable JSON." },
              { step: 4, title: "Copy Result", description: "Copy formatted JSON." },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">{item.step}</div>
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our JSON Formatter?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Format, validate, and beautify JSON data.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Formatting", description: "Format JSON in one click." },
              { icon: Shield, title: "100% Private", description: "No data leaves your browser." },
              { icon: Code, title: "Syntax Validation", description: "Catch JSON errors instantly." },
              { icon: Globe, title: "Any Device", description: "Works everywhere." },
              { icon: Copy, title: "Easy Export", description: "Copy formatted output." },
              { icon: Zap, title: "No Sign-Up", description: "No account needed." },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-emerald-200 hover:shadow-lg">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Use Cases Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how JSON formatting is used in real scenarios.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "API Response", input: '{"name":"John","age":30}', output: '{\n  "name": "John",\n  "age": 30\n}' },
              { title: "Config Files", input: '{"debug":true,"port":3000}', output: '{\n  "debug": true,\n  "port": 3000\n}' },
              { title: "Database Records", input: '{"id":1,"status":"active"}', output: '{\n  "id": 1,\n  "status": "active"\n}' },
              { title: "Log Parsing", input: '{"level":"error","msg":"fail"}', output: '{\n  "level": "error",\n  "msg": "fail"\n}' },
            ].map((useCase) => (
              <div key={useCase.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
                  <h3 className="text-base font-semibold text-slate-900">{useCase.title}</h3>
                </div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div>
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">Input</div>
                    <pre className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 overflow-x-auto">{useCase.input}</pre>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">Output</div>
                    <pre className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 overflow-x-auto">{useCase.output}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="json-formatter" />
      <ToolCta theme="emerald" />
      <FooterSection />
    </div>
  );
}
