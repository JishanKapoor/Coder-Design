"use client";
import { useState, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Lock } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

function utf8Encode(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

function utf8Decode(b64: string): string {
  return decodeURIComponent(escape(atob(b64)));
}

function toUrlSafe(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromUrlSafe(b64: string): string {
  let s = b64.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return s;
}

function wrapLines(text: string, len: number): string {
  const lines: string[] = [];
  for (let i = 0; i < text.length; i += len) lines.push(text.slice(i, i + len));
  return lines.join("\n");
}

export default function Base64EncoderDecoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [urlSafe, setUrlSafe] = useState(false);
  const [lineWrap, setLineWrap] = useState(false);
  const [error, setError] = useState("");
  const [sizes, setSizes] = useState<{ input: number; output: number } | null>(null);

  const encode = useCallback(() => {
    if (!input) { setOutput(""); setError(""); setSizes(null); return; }
    try {
      let result = utf8Encode(input);
      if (urlSafe) result = toUrlSafe(result);
      if (lineWrap) result = wrapLines(result, 76);
      setOutput(result);
      setError("");
      setSizes({ input: new Blob([input]).size, output: new Blob([result]).size });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Encoding error");
      setOutput("");
      setSizes(null);
    }
  }, [input, urlSafe, lineWrap]);

  const decode = useCallback(() => {
    if (!input) { setOutput(""); setError(""); setSizes(null); return; }
    try {
      let cleaned = input.replace(/\s/g, ""); // strip whitespace/line wraps
      if (urlSafe) cleaned = fromUrlSafe(cleaned);
      const result = utf8Decode(cleaned);
      setOutput(result);
      setError("");
      setSizes({ input: new Blob([input]).size, output: new Blob([result]).size });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Decoding error — input may not be valid Base64");
      setOutput("");
      setSizes(null);
    }
  }, [input, urlSafe]);

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "base64-result.txt"; a.click(); };

  const faqs = [
    { question: "What is Base64 encoding?", answer: "Base64 encodes binary data into a set of 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It's commonly used to embed binary data in text-based formats like JSON, XML, emails, and data URIs." },
    { question: "How does UTF-8 support work?", answer: "This tool uses a UTF-8 aware encoding approach: text is first encoded with encodeURIComponent, then processed with unescape, and finally Base64 encoded with btoa. This ensures non-ASCII characters (emoji, accented letters, CJK) are handled correctly." },
    { question: "What is URL-safe Base64?", answer: "Standard Base64 uses + and / which conflict with URL syntax. URL-safe Base64 replaces + with - and / with _, and optionally removes padding (=). This variant is used in JWTs, data URIs, and URL parameters." },
    { question: "What is MIME line wrapping?", answer: "MIME-compliant Base64 wraps output at 76 characters per line, as specified in RFC 2045. This is used in email attachments and certain legacy systems that require fixed-width line breaks." },
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
            <span className="text-white">Base64 Encoder / Decoder</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Base64 Encoder / Decoder</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Encode text to Base64 or decode Base64 strings online. Support for UTF-8 text, URL-safe Base64, and MIME line wrapping.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to encode or Base64 string to decode..." rows={6} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors font-mono" />
          </div>

          {/* Options */}
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
              <span className="text-sm text-slate-700">URL-safe Base64</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={lineWrap} onChange={(e) => setLineWrap(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
              <span className="text-sm text-slate-700">MIME Line Wrap (76 chars)</span>
            </label>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={encode} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Lock className="h-4 w-4 flex-shrink-0" /><span>Encode</span></button>
            <button onClick={decode} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"><Lock className="h-4 w-4 flex-shrink-0" /><span>Decode</span></button>
            <button onClick={() => { setInput(""); setOutput(""); setError(""); setSizes(null); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><strong>Error:</strong> {error}</div>
          )}

          {/* Sizes */}
          {sizes && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <div className="text-lg font-bold text-slate-700">{sizes.input} B</div>
                <div className="text-xs text-slate-500">Input Size</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <div className="text-lg font-bold text-violet-700">{sizes.output} B</div>
                <div className="text-xs text-slate-500">Output Size</div>
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Output</label>
            <div className="relative">
              <textarea value={output} readOnly placeholder="Result will appear here..." rows={6} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
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
      <RelatedTools currentSlug="base64-encoder-decoder" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
