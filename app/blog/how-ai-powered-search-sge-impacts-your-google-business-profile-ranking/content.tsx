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
            <h1 className="mb-6 text-white">The NEW NYC Local SEO: How AI-Powered Search (SGE) Impacts Your Google Business Profile Ranking</h1>
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
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>Google's Search Generative Experience (SGE) is changing how local businesses appear in search results. Understanding these shifts is essential for maintaining and improving your Google Business Profile visibility.</p>

<h2>Understanding SGE and Local Search</h2>
<p>SGE uses AI to generate comprehensive answers directly in search results. For local businesses, this means your Google Business Profile needs to be optimized not just for traditional local SEO, but also for AI-driven discovery.</p>

<h3>How SGE Changes Local Results</h3>
<ul>
<li><strong>AI-generated local recommendations:</strong> Google now summarizes and recommends businesses based on AI analysis</li>
<li><strong>Review sentiment analysis:</strong> AI evaluates the quality and sentiment of your reviews, not just quantity</li>
<li><strong>Content matching:</strong> Your business description and posts are analyzed for relevance to search queries</li>
<li><strong>Visual content weight:</strong> Photos and videos carry more importance in AI-driven results</li>
</ul>

<h2>Optimizing Your Google Business Profile for SGE</h2>

<h3>Complete and Accurate Information</h3>
<p>AI systems rely on complete, accurate data. Ensure every field in your Google Business Profile is filled out correctly, including business hours, services, products, and attributes.</p>

<h3>Quality Reviews and Responses</h3>
<p>Google's AI analyzes review content for relevance and sentiment. Encourage detailed reviews from customers and respond thoughtfully to every review — both positive and negative.</p>

<h3>Regular Posts and Updates</h3>
<p>Active Google Business Profiles signal relevance to AI systems. Post updates, offers, events, and news regularly to maintain visibility in SGE results.</p>

<h3>High-Quality Visual Content</h3>
<p>Upload professional photos and videos regularly. AI systems increasingly use visual content to understand and rank businesses.</p>

<h2>Measuring SGE Impact</h2>
<ul>
<li><strong>Track impressions</strong> in Google Business Profile insights</li>
<li><strong>Monitor click-through rates</strong> from search results</li>
<li><strong>Analyze review trends</strong> and sentiment over time</li>
<li><strong>Compare visibility</strong> before and after optimization efforts</li>
</ul>

<h2>Conclusion</h2>
<p>SGE represents a fundamental shift in how local businesses are discovered online. By optimizing your Google Business Profile for AI-powered search, you can maintain and improve your local visibility in this new era of search.</p>
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
