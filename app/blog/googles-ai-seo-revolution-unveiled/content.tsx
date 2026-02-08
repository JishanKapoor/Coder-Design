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
      <section className={"relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 py-20 lg:py-28"}>
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
            <h1 className="mb-6 text-white">Google's AI SEO Revolution Unveiled</h1>
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
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Schedule a Call</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>Google's integration of AI into search is transforming how websites are ranked and discovered. From Search Generative Experience (SGE) to AI Overviews, the search landscape is evolving rapidly. Understanding these changes is critical for businesses that depend on organic traffic.</p>

<h2>What Is Google's AI Search Revolution?</h2>
<p>Google has been progressively embedding AI into its core search algorithm. The introduction of MUM (Multitask Unified Model), helpful content updates, and generative AI results means that traditional SEO alone is no longer sufficient.</p>

<h3>Key Changes in Google's AI-Powered Search</h3>
<ul>
<li><strong>AI Overviews:</strong> Summarized answers generated directly in search results</li>
<li><strong>Search Generative Experience:</strong> Conversational AI responses that reshape how users interact with Google</li>
<li><strong>E-E-A-T Emphasis:</strong> Experience, Expertise, Authoritativeness, and Trustworthiness are more important than ever</li>
<li><strong>Passage Ranking:</strong> Google can now index and rank specific passages within a page</li>
</ul>

<h2>How This Impacts Your SEO Strategy</h2>
<p>The shift to AI-powered search means content must be more comprehensive, authoritative, and user-focused than ever before.</p>

<h3>Content Quality Over Quantity</h3>
<p>Google's AI can now better understand context, intent, and content depth. Thin content that targets keywords without providing real value will be penalized more aggressively.</p>

<h3>Structured Data Becomes Essential</h3>
<p>Schema markup helps Google's AI understand your content better. Implementing proper JSON-LD structured data for articles, FAQs, products, and organizations gives you an edge in AI-generated results.</p>

<h3>Answer Engine Optimization (AEO)</h3>
<p>Beyond traditional SEO, businesses need to optimize for AI answer engines. This means structuring content to directly answer questions, using clear headings, and providing authoritative sources.</p>

<h2>Practical Steps for Businesses</h2>
<ul>
<li><strong>Audit existing content</strong> for depth, accuracy, and E-E-A-T signals</li>
<li><strong>Implement structured data</strong> across all key pages</li>
<li><strong>Focus on topic clusters</strong> rather than individual keywords</li>
<li><strong>Create authoritative, experience-based content</strong> that demonstrates real expertise</li>
<li><strong>Optimize for featured snippets</strong> and AI Overview inclusion</li>
<li><strong>Monitor AI search results</strong> for your target queries</li>
</ul>

<h2>The Future of Search</h2>
<p>As Google continues integrating AI more deeply into search, the gap between websites that adapt and those that don't will widen significantly. Businesses that invest in AI-ready SEO strategies now will be best positioned for the future.</p>

<blockquote><p>"The future of SEO isn't about gaming algorithms — it's about creating genuinely valuable content that AI systems recognize as authoritative and helpful."</p></blockquote>

<h2>Conclusion</h2>
<p>Google's AI revolution isn't coming — it's already here. By focusing on content quality, structured data, and user experience, businesses can thrive in this new search landscape. The key is to start adapting now rather than waiting for traffic declines to force action.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-gradient-to-br from-emerald-600 to-teal-700 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">Ready to Dominate AI Search?</h2>
            <p className="mb-8 text-lg text-white/90">AI-powered SEO and AEO services to maximize your visibility.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-emerald-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Boost Your Rankings</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Schedule a Call</Button>
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
