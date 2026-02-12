"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import { Calendar, Clock, User, ArrowLeft, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import "../blog-content.css";
import meta from "./meta.json";
import { motion } from "framer-motion";
import { modalBackdropVariants, modalContentVariants } from "../../animations/variants";
const categoryLinks: { [key: string]: string } = {
  "AI SEO & AEO Services": "/seo-management",
  "Full-Stack Development": "/full-stack-engineering",
  "Mobile App Development": "/mobile-app-development",
  "AI & Automation": "/ai-workflow",
};
export default function BlogPost() {
  const [showCalendar, setShowCalendar] = useState(false);
  const category = "AI SEO & AEO Services";
  const categoryLink = categoryLinks[category as keyof typeof categoryLinks] || "/blogs";
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className={"relative overflow-hidden bg-emerald-600 py-20 lg:py-28"}>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <div>
            <div className="mb-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to Blogs
              </Link>
            </div>
            <Link href={categoryLink} className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
              <span className="text-sm text-white">AI SEO & AEO Services</span>
            </Link>
            <h1 className="mb-6 text-white">Premier AI SEO & AEO Services in Toronto for Business Growth</h1>
            <div className="mb-8 flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm">CoderDesign Team</div>
                  <div className="text-xs text-white/70">Contributor</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(meta.createdAt || "2025-01-01T00:00:00.000Z").toDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{meta.readTime} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className={"gap-2 bg-white text-emerald-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Boost Your Toronto Rankings</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Get a Ranking Analysis</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>In an era where AI is reshaping search, Toronto businesses need SEO and AEO strategies that go beyond traditional optimization. Premier AI-powered SEO services combine technical expertise with cutting-edge AI tools to deliver measurable results.</p>

<h2>What Sets Premier AI SEO Apart</h2>
<p>Traditional SEO agencies optimize for search engines. Premier AI SEO services optimize for the entire AI-powered discovery ecosystem — including Google SGE, ChatGPT, Perplexity, and voice assistants.</p>

<h3>Core Services</h3>
<ul>
<li>AI Search Audit: Comprehensive analysis of how your brand appears in AI-generated results</li>
<li>Technical SEO: Site architecture, Core Web Vitals, structured data, and crawlability</li>
<li>Content Strategy: AI-optimized content that ranks in traditional and AI search</li>
<li>Local SEO: Google Business Profile optimization for AI-powered local discovery</li>
<li>AEO Implementation: Structured content that AI systems cite and recommend</li>
<li>Performance Tracking: Advanced analytics across traditional and AI search channels</li>
</ul>

<h2>Why Toronto Businesses Need AI SEO</h2>
<p>Toronto's competitive business landscape makes strong search visibility essential:</p>
<ul>
<li>Millions of potential customers searching online daily</li>
<li>Intense competition across every industry vertical</li>
<li>AI search changing how consumers discover and choose businesses</li>
<li>Local SEO critical for service-area businesses</li>
</ul>

<h2>The AI SEO Process</h2>
<ol>
<li>Discovery: Understand your business, goals, and competitive landscape</li>
<li>Audit: Comprehensive technical and content analysis</li>
<li>Strategy: Custom AI-optimized SEO plan with clear milestones</li>
<li>Implementation: Execute technical fixes, content creation, and optimization</li>
<li>Monitoring: Track performance across all search channels</li>
<li>Optimization: Continuous improvement based on data and AI search trends</li>
</ol>

<h2>Measuring ROI</h2>
<p>Effective AI SEO delivers measurable business outcomes:</p>
<ul>
<li>Increased organic traffic from traditional and AI search</li>
<li>Higher conversion rates from better-qualified traffic</li>
<li>Improved brand visibility in AI-generated recommendations</li>
<li>Stronger local presence in map and voice search results</li>
</ul>

<h2>Winning the AI SEO Race in Toronto</h2>
<p>Premier AI SEO and AEO services are essential for Toronto businesses that want to maintain and grow their online visibility. The integration of AI into search is accelerating, and businesses that invest in AI-optimized strategies now will capture the most value.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-emerald-600 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">
              Dominate Toronto Search Results with AI SEO
            </h2>
            <p className="mb-8 text-lg text-white/90">AI-powered SEO and AEO services to maximize your visibility.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-emerald-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Get Premier SEO Services</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Get a Ranking Analysis</Button>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
      {showCalendar && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalBackdropVariants}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowCalendar(false)}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalContentVariants}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full p-2 hover:bg-slate-100 transition-colors duration-150"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
            <h3 className="mb-4 sm:mb-6 pr-10 text-xl sm:text-2xl text-slate-900">Schedule a Discovery Call</h3>
            <div className="h-[500px] sm:h-[600px] overflow-hidden rounded-lg">
              <iframe
                src="https://calendly.com/hello-coderdesign/30min"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a Discovery Call"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
