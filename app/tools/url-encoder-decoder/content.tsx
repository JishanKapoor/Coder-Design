"use client";
import { useState, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Link as LinkIcon, Code2, FileText, RefreshCw } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

type EncodingMode = "component" | "full";

export default function UrlEncoderDecoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<EncodingMode>("component");
  const [error, setError] = useState("");
  const [breakdown, setBreakdown] = useState<{ original: string; encoded: string }[]>([]);

  const encode = useCallback(() => {
    if (!input.trim()) { setOutput(""); setError(""); setBreakdown([]); return; }
    try {
      const result = mode === "component" ? encodeURIComponent(input) : encodeURI(input);
      setOutput(result);
      setError("");
      // Build char breakdown
      const chars: { original: string; encoded: string }[] = [];
      for (const ch of input) {
        const enc = mode === "component" ? encodeURIComponent(ch) : encodeURI(ch);
        if (enc !== ch) chars.push({ original: ch, encoded: enc });
      }
      setBreakdown(chars);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Encoding error");
      setOutput("");
      setBreakdown([]);
    }
  }, [input, mode]);

  const decode = useCallback(() => {
    if (!input.trim()) { setOutput(""); setError(""); setBreakdown([]); return; }
    try {
      const result = mode === "component" ? decodeURIComponent(input) : decodeURI(input);
      setOutput(result);
      setError("");
      setBreakdown([]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Decoding error — input may contain malformed percent-encoding");
      setOutput("");
      setBreakdown([]);
    }
  }, [input, mode]);

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "url-result.txt"; a.click(); };

  const faqs = [
    { question: "What is URL encoding?", answer: "URL encoding (percent-encoding) replaces unsafe characters with a '%' followed by their hexadecimal ASCII value. For example, a space becomes %20. This ensures URLs are transmitted correctly over the internet." },
    { question: "What's the difference between Component and Full URL modes?", answer: "Component mode (encodeURIComponent) encodes everything except letters, digits, and - _ . ! ~ * ' ( ). Full URL mode (encodeURI) preserves URL-special characters like :, /, ?, #, &, = so the URL structure remains intact." },
    { question: "When should I use Component mode?", answer: "Use Component mode when encoding individual query parameter values or path segments. Use Full URL mode when encoding a complete URL where you want to preserve the structure (protocol, slashes, etc.)." },
    { question: "What happens with malformed encoded strings?", answer: "If you try to decode a string with invalid percent-encoding (e.g., %ZZ), the tool will display a descriptive error message instead of crashing." },
    { question: "Is my data private?", answer: "Yes. All encoding and decoding happens locally in your browser — no data is sent to any server." },
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
            <span className="text-white">URL Encoder / Decoder</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">URL Encoder / Decoder</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Encode or decode URLs and query strings online. Convert special characters to percent-encoding and back.</p>
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
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text or encoded URL..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors font-mono" />
          </div>

          {/* Mode */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Encoding Mode</h3>
            <select value={mode} onChange={(e) => setMode(e.target.value as EncodingMode)} className="h-9 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
              <option value="component">Component (encodeURIComponent)</option>
              <option value="full">Full URL (encodeURI)</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={encode} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full sm:w-auto whitespace-nowrap"><LinkIcon className="h-4 w-4 flex-shrink-0" /><span>Encode</span></button>
            <button onClick={decode} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full sm:w-auto whitespace-nowrap"><LinkIcon className="h-4 w-4 flex-shrink-0" /><span>Decode</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setError(""); setBreakdown([]); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><strong>Error:</strong> {error}</div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
              <textarea value={output} readOnly placeholder="Result will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
          </div>

          {/* Character breakdown */}
          {breakdown.length > 0 && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Encoded Characters</label>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50"><tr><th className="px-4 py-2 text-left font-medium text-slate-600">Character</th><th className="px-4 py-2 text-left font-medium text-slate-600">Encoded</th></tr></thead>
                  <tbody>
                    {breakdown.map((b, i) => (
                      <tr key={i} className="border-t border-slate-100"><td className="px-4 py-1.5 font-mono text-slate-900">{b.original}</td><td className="px-4 py-1.5 font-mono text-emerald-700">{b.encoded}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How To Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Encode & Decode URLs</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Convert special characters to percent-encoding and back in seconds.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Enter Text or URL", desc: "Paste your URL, query string, or text with special characters." },
              { step: 2, title: "Choose Mode", desc: "Select Component mode for parameters or Full URL mode for complete URLs." },
              { step: 3, title: "Click Encode or Decode", desc: "Convert to percent-encoding or back to readable text." },
              { step: 4, title: "Copy Result", desc: "Copy the encoded/decoded output or download as a file." },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">{item.step}</div>
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our URL Encoder/Decoder?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Encode and decode URLs safely for web development and API work.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Conversion", desc: "Encode or decode URLs in milliseconds with real-time processing." },
              { icon: Shield, title: "100% Private", desc: "All processing happens locally in your browser. No data is sent anywhere." },
              { icon: Code2, title: "Two Modes", desc: "Choose Component mode for parameters or Full URL mode for complete URLs." },
              { icon: Globe, title: "Any Device", desc: "Works on desktop, tablet, and mobile with any modern browser." },
              { icon: FileText, title: "Character Breakdown", desc: "See exactly which characters were encoded and their hex values." },
              { icon: RefreshCw, title: "Encode & Decode", desc: "Convert in both directions with a single tool." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600"><f.icon className="h-6 w-6" /></div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-2xl text-slate-600">See how URL encoding and decoding is used in real-world scenarios.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Query Parameters", input: "search=hello world&filter=a+b", output: "search=hello%20world&filter=a%2Bb" },
              { title: "Special Characters", input: "name=John Doe&city=São Paulo", output: "name=John%20Doe&city=S%C3%A3o%20Paulo" },
              { title: "API Endpoints", input: "https://api.example.com/data?q=test value", output: "https://api.example.com/data?q=test%20value" },
              { title: "Decode Encoded URL", input: "hello%20world%21", output: "hello world!" },
            ].map((uc, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-3"><h4 className="text-sm font-semibold text-slate-900">{uc.title}</h4></div>
                <div className="grid grid-cols-1 gap-8 p-6 sm:p-7 md:grid-cols-2 md:gap-7">
                  <div><p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">Input</p><pre className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 text-sm font-mono text-slate-700 whitespace-pre-wrap break-all">{uc.input}</pre></div>
                  <div><p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">Output</p><pre className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-sm font-mono text-emerald-700 whitespace-pre-wrap break-all">{uc.output}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="url-encoder-decoder" />
      <ToolCta theme="emerald" />
      <FooterSection />
    </div>
  );
}
