"use client";
import { useState, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Link as LinkIcon } from "lucide-react";
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
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-14 lg:py-18">
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
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text or encoded URL..." rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors font-mono" />
          </div>

          {/* Mode */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Encoding Mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value as EncodingMode)} className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-violet-500 focus:outline-none">
              <option value="component">Component (encodeURIComponent)</option>
              <option value="full">Full URL (encodeURI)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={encode} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><LinkIcon className="h-4 w-4 flex-shrink-0" /><span>Encode</span></button>
            <button onClick={decode} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><LinkIcon className="h-4 w-4 flex-shrink-0" /><span>Decode</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setError(""); setBreakdown([]); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><strong>Error:</strong> {error}</div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Result will appear here..." rows={5} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && (
                <div className="absolute right-2 top-2 flex gap-1.5">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700">{copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}</button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-700"><Download className="h-3.5 w-3.5" />Download</button>
                </div>
              )}
            </div>
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
                      <tr key={i} className="border-t border-slate-100"><td className="px-4 py-1.5 font-mono text-slate-900">{b.original}</td><td className="px-4 py-1.5 font-mono text-violet-700">{b.encoded}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="url-encoder-decoder" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
