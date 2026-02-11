"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Copy, Check, Download, Trash2, Link2 } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

type ExtractType = "urls" | "emails" | "all";
type OutputFormat = "lines" | "comma" | "json";

export default function LinkExtractorTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [extractType, setExtractType] = useState<ExtractType>("all");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("lines");
  const [removeDuplicates, setRemoveDuplicates] = useState(true);

  const extractLinks = () => {
    if (!input.trim()) { setOutput(""); return; }

    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+|ftp:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;

    let results: string[] = [];

    if (extractType === "urls" || extractType === "all") {
      const urls = input.match(urlRegex) || [];
      results.push(...urls);
    }

    if (extractType === "emails" || extractType === "all") {
      const emails = input.match(emailRegex) || [];
      results.push(...emails);
    }

    if (removeDuplicates) {
      results = [...new Set(results)];
    }

    if (results.length === 0) {
      setOutput("No links found.");
      return;
    }

    switch (outputFormat) {
      case "lines":
        setOutput(results.join("\n"));
        break;
      case "comma":
        setOutput(results.join(", "));
        break;
      case "json":
        setOutput(JSON.stringify(results, null, 2));
        break;
    }
  };

  const handleCopy = async () => { if (!output) return; await navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!output) return; const ext = outputFormat === "json" ? "json" : "txt"; const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `extracted-links.${ext}`; a.click(); };

  const faqs = [
    { question: "What types of links can be extracted?", answer: "The tool finds HTTP, HTTPS, and FTP URLs as well as email addresses from any text input." },
    { question: "Can I extract only URLs or only emails?", answer: "Yes. Use the 'Extract type' dropdown to choose URLs only, emails only, or all links." },
    { question: "What output formats are available?", answer: "You can output results one per line, comma-separated, or as a JSON array." },
    { question: "Does it handle duplicates?", answer: "Yes. The 'Remove duplicates' toggle is enabled by default, so each unique link appears only once." },
    { question: "Is my data private?", answer: "Yes. All processing happens locally in your browser — nothing is sent to any server." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="relative overflow-hidden bg-emerald-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} /></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Link Extractor</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Link Extractor</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Extract all URLs and links from any text. Find http, https, ftp, and email links in your content.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" />100% Private</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" />Instant</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />Any Device</span>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12 space-y-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Input Text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text containing links, URLs, or email addresses..." rows={8} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Extract Type</label>
              <select value={extractType} onChange={(e) => setExtractType(e.target.value as ExtractType)} className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                <option value="all">All (URLs + Emails)</option>
                <option value="urls">URLs only</option>
                <option value="emails">Emails only</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Output Format</label>
              <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as OutputFormat)} className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                <option value="lines">One per line</option>
                <option value="comma">Comma-separated</option>
                <option value="json">JSON array</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
              Remove duplicates
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={extractLinks} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full sm:w-auto whitespace-nowrap"><Link2 className="h-4 w-4 flex-shrink-0" /><span>Extract Links</span></button>
            <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Extracted Links</label>
              <textarea value={output} readOnly placeholder="Extracted links will appear here..." rows={8} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 font-mono" />
              {output && output !== "No links found." && (
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Extract Links</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Pull all URLs from any text or HTML.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Paste Content", description: "Paste text or HTML containing links." },
              { step: 2, title: "Click Extract", description: "Find all URLs automatically." },
              { step: 3, title: "Review Links", description: "See extracted URLs in a clean list." },
              { step: 4, title: "Copy or Export", description: "Copy individual links or all at once." },
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our Link Extractor?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Find and collect every link from any text.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Extraction", description: "Find all links in milliseconds." },
              { icon: Shield, title: "100% Private", description: "No data leaves your browser." },
              { icon: Link2, title: "All URL Types", description: "HTTP, HTTPS, FTP, and more." },
              { icon: Globe, title: "Any Device", description: "Works on all browsers." },
              { icon: Copy, title: "Bulk Export", description: "Copy all links at once." },
              { icon: Zap, title: "No Sign-Up", description: "Use immediately." },
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how link extraction is used.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "SEO Audit", input: "<a href='https://example.com'>Link</a>\n<a href='https://test.com'>Test</a>", output: "https://example.com\nhttps://test.com" },
              { title: "Content Review", input: "Visit https://site.com and https://blog.com", output: "https://site.com\nhttps://blog.com" },
              { title: "Broken Link Check", input: "src='https://img.com/pic.png'\nhref='https://old.com'", output: "https://img.com/pic.png\nhttps://old.com" },
              { title: "Research", input: "Reference: https://wiki.org\nSource: https://data.gov", output: "https://wiki.org\nhttps://data.gov" },
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
      <RelatedTools currentSlug="link-extractor" />
      <ToolCta theme="emerald" />
      <FooterSection />
    </div>
  );
}
