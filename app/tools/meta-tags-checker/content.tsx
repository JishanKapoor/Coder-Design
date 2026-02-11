"use client";
import { useState, useMemo } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Trash2, FileSearch, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Helpers ── */
const TITLE_CHAR_LIMIT = 60;
const DESC_CHAR_LIMIT = 160;
const TITLE_IDEAL_MIN = 50;
const DESC_IDEAL_MIN = 150;

type Indicator = "pass" | "warn" | "fail";

interface CheckItem {
  label: string;
  status: Indicator;
  detail: string;
}

function estimatePixelWidth(text: string): number {
  // Rough avg: 6.5px per char at ~14px font. Google title ≈ 580px
  return Math.round(text.length * 6.5);
}

function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname;
  } catch {
    return url;
  }
}

function extractBreadcrumb(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    const parts = [u.hostname, ...u.pathname.split("/").filter(Boolean)];
    return parts.join(" › ");
  } catch {
    return url;
  }
}

/* ── Heading parser ── */
interface HeadingNode { level: number; text: string; }

function parseHeadings(html: string): HeadingNode[] {
  const headings: HeadingNode[] = [];
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    headings.push({ level: parseInt(m[1], 10), text: m[2].replace(/<[^>]*>/g, "").trim() });
  }
  // Also try plain text patterns like "# Heading"
  if (headings.length === 0) {
    const lines = html.split("\n");
    for (const line of lines) {
      const md = line.match(/^(#{1,6})\s+(.+)/);
      if (md) headings.push({ level: md[1].length, text: md[2].trim() });
    }
  }
  return headings;
}

export default function MetaTagsCheckerTool() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [pageContent, setPageContent] = useState("");

  const domain = useMemo(() => url ? extractDomain(url) : "example.com", [url]);
  const breadcrumb = useMemo(() => url ? extractBreadcrumb(url) : "example.com", [url]);

  /* ── Analysis ── */
  const checks = useMemo<CheckItem[]>(() => {
    const items: CheckItem[] = [];
    // Title length
    if (title.length >= TITLE_IDEAL_MIN && title.length <= TITLE_CHAR_LIMIT) {
      items.push({ label: "Title Length", status: "pass", detail: `${title.length} chars — Ideal (50–60)` });
    } else if (title.length > 0 && title.length < TITLE_IDEAL_MIN) {
      items.push({ label: "Title Length", status: "warn", detail: `${title.length} chars — A bit short, aim for 50–60` });
    } else if (title.length > TITLE_CHAR_LIMIT) {
      items.push({ label: "Title Length", status: "fail", detail: `${title.length} chars — Will be truncated (max ~60)` });
    } else {
      items.push({ label: "Title Length", status: "fail", detail: "No title provided" });
    }

    // Description length
    if (description.length >= DESC_IDEAL_MIN && description.length <= DESC_CHAR_LIMIT) {
      items.push({ label: "Description Length", status: "pass", detail: `${description.length} chars — Ideal (150–160)` });
    } else if (description.length > 0 && description.length < DESC_IDEAL_MIN) {
      items.push({ label: "Description Length", status: "warn", detail: `${description.length} chars — Could be longer, aim for 150–160` });
    } else if (description.length > DESC_CHAR_LIMIT) {
      items.push({ label: "Description Length", status: "fail", detail: `${description.length} chars — Will be truncated` });
    } else {
      items.push({ label: "Description Length", status: "fail", detail: "No description provided" });
    }

    // URL check
    if (url) {
      const hasSpecial = /[^a-zA-Z0-9/:._\-~?#&=%]/.test(url);
      items.push({ label: "URL Cleanliness", status: hasSpecial ? "warn" : "pass", detail: hasSpecial ? "URL contains unusual characters" : "URL looks clean" });
    }

    // Title doesn't start with brand
    if (title) {
      const startsWithBrand = /^(CoderDesign|[A-Z][a-z]+Design)/i.test(title.trim());
      items.push({ label: "Title Structure", status: startsWithBrand ? "warn" : "pass", detail: startsWithBrand ? "Consider not starting with brand name — put keywords first" : "Good — title leads with content" });
    }

    // Description CTA words
    if (description) {
      const ctaWords = ["learn", "discover", "find", "get", "try", "start", "explore", "see", "read", "check", "free"];
      const hasCta = ctaWords.some((w) => description.toLowerCase().includes(w));
      items.push({ label: "Description CTA", status: hasCta ? "pass" : "warn", detail: hasCta ? "Description contains action words" : "Consider adding a call-to-action (learn, discover, try...)" });
    }

    return items;
  }, [title, description, url]);

  const headings = useMemo(() => parseHeadings(pageContent), [pageContent]);
  const headingWarnings = useMemo<string[]>(() => {
    const warns: string[] = [];
    if (headings.length === 0 && pageContent.trim()) warns.push("No headings found in content");
    const h1s = headings.filter((h) => h.level === 1);
    if (h1s.length === 0 && headings.length > 0) warns.push("Missing H1 heading");
    if (h1s.length > 1) warns.push(`Multiple H1 headings found (${h1s.length})`);
    // Check for skipped levels
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level > headings[i - 1].level + 1) {
        warns.push(`Skipped heading level: H${headings[i - 1].level} → H${headings[i].level}`);
        break;
      }
    }
    return warns;
  }, [headings, pageContent]);

  const StatusIcon = ({ status }: { status: Indicator }) => {
    if (status === "pass") return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />;
    if (status === "warn") return <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />;
    return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
  };

  const truncatedTitle = title.length > TITLE_CHAR_LIMIT ? title.slice(0, TITLE_CHAR_LIMIT) + "..." : title;
  const truncatedDesc = description.length > DESC_CHAR_LIMIT ? description.slice(0, DESC_CHAR_LIMIT) + "..." : description;

  const faqs = [
    { question: "Why is the title tag limited to 60 characters?", answer: "Google typically displays the first 50–60 characters (about 580 pixels) of a title tag. Titles longer than that get truncated with an ellipsis, potentially cutting off important keywords or calls-to-action." },
    { question: "What is the ideal meta description length?", answer: "Aim for 150–160 characters. Google can display up to ~160 characters on desktop and ~120 on mobile. Keep the most important information and CTA within the first 120 characters." },
    { question: "Why should I not start the title with my brand name?", answer: "Search engines give more weight to words appearing earlier in the title. Leading with your primary keyword instead of the brand name helps relevance. Place the brand at the end, separated by a dash or pipe." },
    { question: "What are Open Graph tags?", answer: "Open Graph (OG) tags control how your page appears when shared on Facebook, LinkedIn, and other platforms. The key tags are og:title, og:description, og:image, and og:url." },
    { question: "Is my data private?", answer: "Yes. All analysis happens locally in your browser — no data is sent to any server." },
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
            <span className="text-white">Meta Tags Checker &amp; Preview</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Meta Tags Checker &amp; Preview</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Check and preview how your meta tags appear in Google, Twitter, and Facebook. Validate title, description, and Open Graph tags.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" />100% Private</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" />Instant</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />Any Device</span>
          </div>
        </div>
      </section>

      {/* Tool UI */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 space-y-6">
          {/* Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-slate-900">Title Tag</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Best Web Development Tools — CoderDesign" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
              <div className="mt-1 flex items-center gap-2 text-xs"><span className={title.length > TITLE_CHAR_LIMIT ? "text-red-600 font-semibold" : "text-slate-400"}>{title.length}/{TITLE_CHAR_LIMIT} chars</span><span className="text-slate-300">|</span><span className="text-slate-400">~{estimatePixelWidth(title)}px / 580px</span></div>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-slate-900">Meta Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Compelling description of your page content..." rows={3} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
              <div className="mt-1 text-xs"><span className={description.length > DESC_CHAR_LIMIT ? "text-red-600 font-semibold" : "text-slate-400"}>{description.length}/{DESC_CHAR_LIMIT} chars</span></div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-900">Page URL</label>
              <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.example.com/page" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-900">OG Image URL <span className="font-normal text-slate-400">(optional)</span></label>
              <input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://www.example.com/og-image.jpg" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
            </div>
          </div>

          <button onClick={() => { setTitle(""); setDescription(""); setUrl(""); setOgImage(""); setPageContent(""); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear All</span></button>

          {/* ── Google Preview ── */}
          {(title || description || url) && (
            <div className="space-y-6 pt-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"><FileSearch className="h-4 w-4" />Google Search Preview</h3>
                <div className="max-w-[600px] space-y-1">
                  <div className="text-xl leading-snug text-[#1a0dab] hover:underline cursor-pointer truncate">{truncatedTitle || "Page Title"}</div>
                  <div className="text-sm text-[#006621]">{breadcrumb || "example.com"}</div>
                  <div className="text-sm text-[#545454] leading-relaxed line-clamp-2">{truncatedDesc || "Page description will appear here..."}</div>
                </div>
                {title.length > TITLE_CHAR_LIMIT && <p className="mt-3 text-xs text-red-600">⚠ Title will be truncated — {title.length - TITLE_CHAR_LIMIT} chars over limit</p>}
                {description.length > DESC_CHAR_LIMIT && <p className="mt-1 text-xs text-red-600">⚠ Description will be truncated — {description.length - DESC_CHAR_LIMIT} chars over limit</p>}
              </div>

              {/* ── Social Preview ── */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Social Media Preview</h3>
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Facebook / OG */}
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-slate-500">Facebook / Open Graph</h4>
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      {ogImage && (
                        <div className="h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={ogImage} alt="OG preview" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                      )}
                      {!ogImage && <div className="h-40 bg-slate-100 flex items-center justify-center text-xs text-slate-400">No OG image provided</div>}
                      <div className="bg-[#f2f3f5] p-3">
                        <div className="text-[11px] uppercase text-[#606770]">{domain}</div>
                        <div className="mt-0.5 text-sm font-semibold text-[#1d2129] leading-tight line-clamp-2">{title || "Page Title"}</div>
                        <div className="mt-0.5 text-xs text-[#606770] line-clamp-1">{description || "Page description"}</div>
                      </div>
                    </div>
                  </div>
                  {/* Twitter */}
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-slate-500">Twitter / X</h4>
                    <div className="overflow-hidden rounded-xl border border-slate-200">
                      {ogImage && (
                        <div className="h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={ogImage} alt="Twitter preview" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                      )}
                      {!ogImage && <div className="h-40 bg-slate-100 flex items-center justify-center text-xs text-slate-400">No image provided</div>}
                      <div className="p-3">
                        <div className="text-sm font-bold text-slate-900 leading-tight line-clamp-2">{title || "Page Title"}</div>
                        <div className="mt-0.5 text-xs text-slate-500 line-clamp-2">{description || "Page description"}</div>
                        <div className="mt-1 text-xs text-slate-400">{domain}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Analysis Checklist ── */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Analysis</h3>
                <div className="space-y-2">
                  {checks.map((c) => (
                    <div key={c.label} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <StatusIcon status={c.status} />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{c.label}</div>
                        <div className="text-xs text-slate-500">{c.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Heading Structure ── */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Heading Structure Analysis</h3>
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">Paste page HTML/Markdown content to analyze heading hierarchy (optional)</label>
                  <textarea value={pageContent} onChange={(e) => setPageContent(e.target.value)} placeholder={"<h1>Main Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>\n\nOr use Markdown:\n# Main Title\n## Section"} rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors font-mono" />
                </div>
                {headings.length > 0 && (
                  <div className="mt-4 space-y-1">
                    {headings.map((h, i) => (
                      <div key={i} className="flex items-center gap-2" style={{ paddingLeft: `${(h.level - 1) * 20}px` }}>
                        <span className={`inline-flex h-6 min-w-[2.5rem] items-center justify-center rounded text-xs font-bold ${h.level === 1 ? "bg-violet-100 text-violet-700" : h.level === 2 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>H{h.level}</span>
                        <span className="text-sm text-slate-700 truncate">{h.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                {headingWarnings.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {headingWarnings.map((w, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-amber-700"><AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />{w}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="meta-tags-checker" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
