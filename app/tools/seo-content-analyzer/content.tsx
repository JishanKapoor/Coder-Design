"use client";
import { useState, useCallback, useMemo } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Trash2, BarChart3, CheckCircle2, AlertTriangle, XCircle, Search, BarChart2 } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Stop words ── */
const STOP_WORDS = new Set([
  "a","an","the","and","or","but","is","are","was","were","be","been","being",
  "have","has","had","do","does","did","will","would","shall","should","may",
  "might","must","can","could","of","in","to","for","with","on","at","by",
  "from","as","into","through","during","before","after","above","below",
  "between","out","off","over","under","again","further","then","once","here",
  "there","when","where","why","how","all","both","each","few","more","most",
  "other","some","such","no","nor","not","only","own","same","so","than",
  "too","very","just","about","up","it","its","this","that","these","those",
  "i","me","my","myself","we","our","ours","you","your","yours","he","him",
  "his","she","her","hers","they","them","their","which","who","whom","what",
]);

/* ── Syllable counter (heuristic) ── */
function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 2) return 1;
  let count = 0;
  const vowels = "aeiouy";
  let prevVowel = false;
  for (let i = 0; i < w.length; i++) {
    const isVowel = vowels.includes(w[i]);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }
  // silent e
  if (w.endsWith("e") && count > 1) count--;
  // -le ending
  if (w.endsWith("le") && w.length > 2 && !vowels.includes(w[w.length - 3])) count++;
  return Math.max(1, count);
}

/* ── n-gram extraction ── */
function getNgrams(words: string[], n: number, limit: number): { phrase: string; count: number }[] {
  const map = new Map<string, number>();
  for (let i = 0; i <= words.length - n; i++) {
    const phrase = words.slice(i, i + n).join(" ").toLowerCase();
    map.set(phrase, (map.get(phrase) || 0) + 1);
  }
  return [...map.entries()]
    .filter(([, c]) => c > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([phrase, count]) => ({ phrase, count }));
}

type Indicator = "green" | "yellow" | "red";

interface Recommendation {
  label: string;
  status: Indicator;
  detail: string;
}

export default function SeoContentAnalyzerTool() {
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const analyze = useCallback(() => { setAnalyzed(true); }, []);

  const analysis = useMemo(() => {
    if (!analyzed || !content.trim()) return null;

    const text = content.trim();
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = Math.max(1, sentences.length);
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    const paragraphCount = Math.max(1, paragraphs.length);
    const avgWordLen = wordCount > 0 ? (words.reduce((s, w) => s + w.length, 0) / wordCount).toFixed(1) : "0";
    const avgSentenceLen = (wordCount / sentenceCount).toFixed(1);
    const readingTime = Math.max(1, Math.ceil(wordCount / 225));

    // Syllables
    const totalSyllables = words.reduce((s, w) => s + countSyllables(w), 0);
    const fleschEase = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount);
    const fleschKincaid = 0.39 * (wordCount / sentenceCount) + 11.8 * (totalSyllables / wordCount) - 15.59;
    const clampedEase = Math.max(0, Math.min(100, fleschEase));
    const clampedGrade = Math.max(0, fleschKincaid);

    let gradeLabel = "";
    if (clampedEase >= 80) gradeLabel = "Very Easy — 5th grade";
    else if (clampedEase >= 70) gradeLabel = "Easy — 6th grade";
    else if (clampedEase >= 60) gradeLabel = "Standard — 7th–8th grade — Good for general audience";
    else if (clampedEase >= 50) gradeLabel = "Fairly Difficult — 9th–10th grade";
    else if (clampedEase >= 30) gradeLabel = "Difficult — College level";
    else gradeLabel = "Very Difficult — Graduate level";

    // Keyword analysis
    const kw = keyword.trim().toLowerCase();
    const kwCount = kw ? words.filter((w) => w.toLowerCase().includes(kw)).length : 0;
    const kwDensity = kw && wordCount > 0 ? ((kwCount / wordCount) * 100).toFixed(2) : "0";

    // Top words (excluding stop words)
    const wordFreq = new Map<string, number>();
    words.forEach((w) => {
      const lw = w.toLowerCase().replace(/[^a-z0-9'-]/g, "");
      if (lw && !STOP_WORDS.has(lw) && lw.length > 2) wordFreq.set(lw, (wordFreq.get(lw) || 0) + 1);
    });
    const topWords = [...wordFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
    const cleanWords = words.map((w) => w.replace(/[^a-z0-9'-]/gi, "").toLowerCase()).filter((w) => w.length > 0);
    const bigrams = getNgrams(cleanWords, 2, 10);
    const trigrams = getNgrams(cleanWords, 3, 5);

    // Sentence length distribution
    const shortSentences = sentences.filter((s) => s.trim().split(/\s+/).length < 10).length;
    const medSentences = sentences.filter((s) => { const l = s.trim().split(/\s+/).length; return l >= 10 && l <= 20; }).length;
    const longSentences = sentences.filter((s) => s.trim().split(/\s+/).length > 20).length;

    // SEO Recommendations
    const recs: Recommendation[] = [];
    // Word count
    if (wordCount >= 300) recs.push({ label: "Word Count", status: "green", detail: `${wordCount} words — Sufficient for SEO` });
    else if (wordCount >= 150) recs.push({ label: "Word Count", status: "yellow", detail: `${wordCount} words — Consider adding more content` });
    else recs.push({ label: "Word Count", status: "red", detail: `${wordCount} words — Too short, aim for 300+` });

    // Keyword density
    if (kw) {
      const d = parseFloat(kwDensity);
      if (d >= 1 && d <= 3) recs.push({ label: "Keyword Density", status: "green", detail: `${kwDensity}% — Optimal range` });
      else if ((d >= 0.5 && d < 1) || (d > 3 && d <= 5)) recs.push({ label: "Keyword Density", status: "yellow", detail: `${kwDensity}% — Slightly ${d < 1 ? "low" : "high"}` });
      else recs.push({ label: "Keyword Density", status: "red", detail: `${kwDensity}% — ${d < 0.5 ? "Too low" : "Keyword stuffing risk"}` });
    }

    // Readability
    if (clampedEase >= 60) recs.push({ label: "Readability", status: "green", detail: `Flesch ${clampedEase.toFixed(0)} — Easy to read` });
    else if (clampedEase >= 40) recs.push({ label: "Readability", status: "yellow", detail: `Flesch ${clampedEase.toFixed(0)} — Moderate difficulty` });
    else recs.push({ label: "Readability", status: "red", detail: `Flesch ${clampedEase.toFixed(0)} — Too difficult for most readers` });

    // Sentence variety
    const hasVariety = shortSentences > 0 && medSentences > 0;
    recs.push({ label: "Sentence Variety", status: hasVariety ? "green" : "yellow", detail: hasVariety ? "Good mix of short and medium sentences" : "Try varying sentence lengths" });

    // Paragraph length
    const avgParaWords = wordCount / paragraphCount;
    if (avgParaWords <= 150) recs.push({ label: "Paragraph Length", status: "green", detail: `Avg ${avgParaWords.toFixed(0)} words/paragraph — Good` });
    else recs.push({ label: "Paragraph Length", status: "yellow", detail: `Avg ${avgParaWords.toFixed(0)} words/paragraph — Consider breaking up` });

    return {
      chars, charsNoSpaces, wordCount, sentenceCount, paragraphCount,
      avgWordLen, avgSentenceLen, readingTime,
      clampedEase, clampedGrade, gradeLabel,
      kwCount, kwDensity,
      topWords, bigrams, trigrams,
      shortSentences, medSentences, longSentences,
      recs,
    };
  }, [content, keyword, analyzed]);

  const StatusIcon = ({ status }: { status: Indicator }) => {
    if (status === "green") return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />;
    if (status === "yellow") return <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />;
    return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
  };

  const faqs = [
    { question: "How is the Flesch Reading Ease score calculated?", answer: "The formula is: 206.835 − 1.015 × (words/sentences) − 84.6 × (syllables/words). Scores range from 0–100 where higher means easier to read. A score of 60–70 is considered ideal for general audiences." },
    { question: "What is keyword density?", answer: "Keyword density is the percentage of times your target keyword appears relative to the total word count. An optimal range is 1–3%. Below 0.5% means the keyword may not register for SEO, while above 5% risks keyword stuffing penalties." },
    { question: "How does the syllable counter work?", answer: "The tool uses a heuristic approach: it counts vowel groups (consecutive vowels = 1 syllable), adjusts for silent 'e' endings, and handles special cases like '-le' endings. It's not perfect but provides a reliable estimate." },
    { question: "What are n-gram phrases?", answer: "N-grams are contiguous sequences of words. The tool shows the most frequently used 2-word and 3-word phrases in your content, helping you identify recurring themes and potential long-tail keywords." },
    { question: "Is my content stored anywhere?", answer: "No. All analysis runs 100% in your browser — nothing is sent to any server. Your content remains completely private." },
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
            <span className="text-white">SEO Content Analyzer</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">SEO Content Analyzer</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Analyze your content for SEO with keyword density, readability scores, word count, and actionable recommendations.</p>
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
            <label className="mb-2 block text-sm font-semibold text-slate-900">Content</label>
            <textarea value={content} onChange={(e) => { setContent(e.target.value); setAnalyzed(false); }} placeholder="Paste your article, blog post, or page content here..." rows={10} className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Target Keyword <span className="font-normal text-slate-400">(optional)</span></label>
            <input value={keyword} onChange={(e) => { setKeyword(e.target.value); setAnalyzed(false); }} placeholder="e.g., web development" className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={analyze} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full sm:w-auto whitespace-nowrap"><BarChart3 className="h-4 w-4 flex-shrink-0" /><span>Analyze Content</span></button>
            <button onClick={() => { setContent(""); setKeyword(""); setAnalyzed(false); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"><Trash2 className="h-4 w-4 flex-shrink-0" /><span>Clear</span></button>
          </div>

          {/* ── Dashboard ── */}
          {analysis && (
            <div className="space-y-6 pt-4">
              {/* Word Stats Panel */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Word Stats</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Words", value: analysis.wordCount },
                    { label: "Characters", value: analysis.chars },
                    { label: "Chars (no spaces)", value: analysis.charsNoSpaces },
                    { label: "Sentences", value: analysis.sentenceCount },
                    { label: "Paragraphs", value: analysis.paragraphCount },
                    { label: "Avg Word Length", value: analysis.avgWordLen },
                    { label: "Avg Sentence Length", value: `${analysis.avgSentenceLen} words` },
                    { label: "Reading Time", value: `${analysis.readingTime} min` },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg bg-slate-50 p-3">
                      <div className="text-xl font-bold text-emerald-700">{s.value}</div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keyword Analysis Panel */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Keyword Analysis</h3>
                {keyword.trim() && (
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-emerald-50 p-3">
                      <div className="text-xl font-bold text-emerald-700">{analysis.kwCount}</div>
                      <div className="text-xs text-emerald-600">Keyword Occurrences</div>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-3">
                      <div className="text-xl font-bold text-emerald-700">{analysis.kwDensity}%</div>
                      <div className="text-xs text-emerald-600">Keyword Density</div>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-slate-600">Top Words</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.topWords.map(([word, count]) => (
                        <span key={word} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{word} <span className="text-emerald-600 font-bold">{count}</span></span>
                      ))}
                      {analysis.topWords.length === 0 && <span className="text-xs text-slate-400">No significant words found</span>}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-slate-600">Top 2-Word Phrases</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.bigrams.map((b) => (
                        <span key={b.phrase} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{b.phrase} <span className="font-bold">{b.count}</span></span>
                      ))}
                      {analysis.bigrams.length === 0 && <span className="text-xs text-slate-400">No recurring phrases</span>}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-slate-600">Top 3-Word Phrases</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.trigrams.map((t) => (
                        <span key={t.phrase} className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">{t.phrase} <span className="font-bold">{t.count}</span></span>
                      ))}
                      {analysis.trigrams.length === 0 && <span className="text-xs text-slate-400">No recurring phrases</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Readability Panel */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Readability</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <div className="text-3xl font-bold text-emerald-700">{analysis.clampedEase.toFixed(1)}</div>
                    <div className="text-xs text-slate-500">Flesch Reading Ease</div>
                    <div className="mt-2 h-2 rounded-full bg-slate-200 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-green-500" style={{ width: `${analysis.clampedEase}%` }} /></div>
                    <div className="mt-1 text-xs text-slate-600">{analysis.gradeLabel}</div>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <div className="text-3xl font-bold text-emerald-700">{analysis.clampedGrade.toFixed(1)}</div>
                    <div className="text-xs text-slate-500">Flesch-Kincaid Grade Level</div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-slate-600">Sentence Length Distribution</h4>
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-lg bg-green-50 p-2 text-center">
                      <div className="text-lg font-bold text-green-700">{analysis.shortSentences}</div>
                      <div className="text-xs text-green-600">Short (&lt;10 words)</div>
                    </div>
                    <div className="flex-1 rounded-lg bg-blue-50 p-2 text-center">
                      <div className="text-lg font-bold text-blue-700">{analysis.medSentences}</div>
                      <div className="text-xs text-blue-600">Medium (10–20)</div>
                    </div>
                    <div className="flex-1 rounded-lg bg-amber-50 p-2 text-center">
                      <div className="text-lg font-bold text-amber-700">{analysis.longSentences}</div>
                      <div className="text-xs text-amber-600">Long (&gt;20 words)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Recommendations Panel */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-wider">SEO Recommendations</h3>
                <div className="space-y-3">
                  {analysis.recs.map((r) => (
                    <div key={r.label} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <StatusIcon status={r.status} />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{r.label}</div>
                        <div className="text-xs text-slate-500">{r.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── How-To Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">How to Analyze SEO Content</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Get actionable SEO insights for your content.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: "Paste Content", description: "Paste your article or page text." },
              { step: 2, title: "Enter Target Keyword", description: "Specify your focus keyword." },
              { step: 3, title: "Click Analyze", description: "Get detailed SEO scores." },
              { step: 4, title: "Follow Suggestions", description: "Implement recommended improvements." },
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
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">Why Use Our SEO Analyzer?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Optimize content for search engine rankings.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Analysis", description: "Get SEO scores in seconds." },
              { icon: Shield, title: "100% Private", description: "No content leaves your browser." },
              { icon: Search, title: "Keyword Density", description: "Track keyword usage and density." },
              { icon: Globe, title: "Readability Score", description: "Assess content readability." },
              { icon: BarChart2, title: "Detailed Metrics", description: "Word count, heading analysis, more." },
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
            <p className="mx-auto max-w-xl text-sm text-slate-500">See how SEO content analysis is used.</p>
          </div>
          <div className="space-y-8">
            {[
              { title: "Blog Post", input: "1500 words, keyword: 'web design'", output: "Score: 82/100, keyword density: 2.1%" },
              { title: "Product Page", input: "500 words, keyword: 'running shoes'", output: "Score: 65/100, needs more headings" },
              { title: "Landing Page", input: "800 words, keyword: 'SaaS tool'", output: "Score: 91/100, well optimized" },
              { title: "Category Page", input: "300 words, keyword: 'electronics'", output: "Score: 45/100, needs more content" },
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
      <RelatedTools currentSlug="seo-content-analyzer" />
      <ToolCta theme="emerald" />
      <FooterSection />
    </div>
  );
}
