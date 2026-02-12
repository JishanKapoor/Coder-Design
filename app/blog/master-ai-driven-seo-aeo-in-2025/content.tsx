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
  "AI & Machine Learning": "/ai-workflow",
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
            <h1 className="mb-6 text-white">Master AI-Driven SEO & AEO in 2025</h1>
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
                <Link href="/contact">Upgrade Your SEO Strategy</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Book a Strategy Session</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>The convergence of AI and search engine optimization is creating a new discipline: Answer Engine Optimization (AEO). Mastering both traditional SEO and AEO is essential for visibility in 2025's AI-powered search landscape.</p>

<h2>Understanding the SEO to AEO Evolution</h2>
<p>Traditional SEO focused on ranking web pages for keywords. AEO focuses on getting your content selected as the authoritative answer by AI systems like Google SGE, ChatGPT, Perplexity, and Bing Copilot.</p>

<h3>Key Differences</h3>
<ul>
<li>SEO: Optimize for blue link rankings → drive clicks to your site</li>
<li>AEO: Optimize for AI citation → become the source AI recommends</li>
<li>Combined approach: Optimize for both to maximize visibility across all search interfaces</li>
</ul>

<h2>AI-Driven SEO Strategies for 2025</h2>

<h3>Semantic Content Architecture</h3>
<p>AI search engines understand topics, not just keywords. Build content around topic clusters with comprehensive coverage:</p>
<ul>
<li>Create pillar pages for core topics</li>
<li>Build supporting content that covers subtopics in depth</li>
<li>Interlink content logically to demonstrate expertise</li>
<li>Update content regularly to maintain freshness signals</li>
</ul>

<h3>Structured Data Implementation</h3>
<p>Schema markup is the bridge between your content and AI understanding:</p>
<ul>
<li>Article/BlogPosting: For all blog and news content</li>
<li>FAQ: For question-and-answer content</li>
<li>HowTo: For instructional content</li>
<li>Organization/LocalBusiness: For business information</li>
<li>Product/Service: For offerings</li>
</ul>

<h3>E-E-A-T Optimization</h3>
<p>Experience, Expertise, Authoritativeness, and Trustworthiness are the foundation of AI-era SEO:</p>
<ul>
<li>Showcase real experience and case studies</li>
<li>Display author credentials and expertise</li>
<li>Build authoritative backlinks and citations</li>
<li>Maintain consistent, accurate business information</li>
</ul>

<h2>AEO-Specific Tactics</h2>
<ul>
<li>Direct answer format: Structure content to directly answer common questions</li>
<li>Authoritative sourcing: Cite credible sources and provide original data</li>
<li>Conversational content: Write in a way that AI can easily extract and paraphrase</li>
<li>Multi-format content: Combine text, images, videos, and data for comprehensive coverage</li>
</ul>

<h2>Measuring Success</h2>
<p>Track both traditional and AI-specific metrics:</p>
<ul>
<li>Organic search traffic and rankings</li>
<li>Featured snippet appearances</li>
<li>AI Overview citations</li>
<li>Brand mentions in AI responses</li>
<li>Referral traffic from AI platforms</li>
</ul>

<h2>Your AI SEO Roadmap for 2025 and Beyond</h2>
<p>Mastering AI-driven SEO and AEO in 2025 requires a comprehensive approach that combines traditional optimization with AI-specific strategies. The businesses that adapt fastest will capture the most visibility in this new search landscape.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-emerald-600 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">
              Master AI-Driven SEO Before Your Competitors Do
            </h2>
            <p className="mb-8 text-lg text-white/90">AI-powered SEO and AEO services to maximize your visibility.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-emerald-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Upgrade to AI-Powered SEO</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Book a Strategy Session</Button>
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
