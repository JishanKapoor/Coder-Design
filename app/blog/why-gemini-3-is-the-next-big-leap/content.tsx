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
  const category = "AI & Machine Learning";
  const categoryLink = categoryLinks[category as keyof typeof categoryLinks] || "/blogs";
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className={"relative overflow-hidden bg-gradient-to-br from-purple-600 to-fuchsia-700 py-20 lg:py-28"}>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <div>
            <div className="mb-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to Blogs
              </Link>
            </div>
            <Link href={categoryLink} className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
              <span className="text-sm text-white">AI & Machine Learning</span>
            </Link>
            <h1 className="mb-6 text-white">Why Gemini 3 Is the Next Big Leap in AI Technology</h1>
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
              <Button className={"gap-2 bg-white text-purple-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Schedule a Call</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>Google's Gemini 3 represents a significant advancement in artificial intelligence, pushing the boundaries of what multimodal AI can achieve. Here's why it matters and how it impacts businesses and creators.</p>

<h2>What Makes Gemini 3 Different</h2>
<p>Gemini 3 is Google's most capable AI model to date, designed from the ground up to be multimodal — understanding and generating text, images, audio, video, and code natively.</p>

<h3>Key Capabilities</h3>
<ul>
<li><strong>True multimodal reasoning:</strong> Processes multiple data types simultaneously, not just sequentially</li>
<li><strong>Extended context windows:</strong> Handle millions of tokens for analyzing entire codebases or documents</li>
<li><strong>Improved reasoning:</strong> Better logical reasoning, math, and problem-solving abilities</li>
<li><strong>Code generation:</strong> More accurate and context-aware code writing across multiple languages</li>
<li><strong>Creative generation:</strong> Enhanced image and content generation capabilities</li>
</ul>

<h2>Impact on Businesses</h2>

<h3>Productivity Enhancement</h3>
<p>Gemini 3's improved capabilities mean businesses can automate more complex tasks:</p>
<ul>
<li>Document analysis and summarization at scale</li>
<li>Customer service automation with better understanding</li>
<li>Content creation with higher quality and consistency</li>
<li>Data analysis with multimodal inputs (charts, spreadsheets, text)</li>
</ul>

<h3>Developer Tools</h3>
<p>For software teams, Gemini 3 offers:</p>
<ul>
<li>More accurate code completion and generation</li>
<li>Better bug detection and code review assistance</li>
<li>Automated documentation generation</li>
<li>Architecture suggestions based on project context</li>
</ul>

<h2>Impact on Creators</h2>
<p>Content creators and artists can leverage Gemini 3 for:</p>
<ul>
<li><strong>Content ideation:</strong> Generate ideas across text, image, and video formats</li>
<li><strong>Editing assistance:</strong> AI-powered editing for various media types</li>
<li><strong>Translation and localization:</strong> High-quality translations preserving tone and context</li>
<li><strong>Audience analytics:</strong> Better understanding of audience preferences and trends</li>
</ul>

<h2>How to Get Started with Gemini 3</h2>
<ol>
<li><strong>Explore the API:</strong> Access Gemini 3 through Google AI Studio or Vertex AI</li>
<li><strong>Start with simple tasks:</strong> Begin with text generation and analysis</li>
<li><strong>Experiment with multimodal:</strong> Try combining text, image, and code inputs</li>
<li><strong>Build prototypes:</strong> Create proof-of-concept applications for your use case</li>
<li><strong>Scale gradually:</strong> Move from prototypes to production with proper testing</li>
</ol>

<h2>The Competitive Landscape</h2>
<p>Gemini 3 competes with OpenAI's GPT-4, Anthropic's Claude, and Meta's LLaMA. Each has strengths, but Gemini 3's native multimodal architecture and Google's infrastructure give it unique advantages in certain applications.</p>

<h2>Conclusion</h2>
<p>Gemini 3 marks a significant leap in AI capabilities, particularly in multimodal understanding and reasoning. Businesses and creators who explore and adopt these capabilities early will gain meaningful competitive advantages in an increasingly AI-driven world.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-gradient-to-br from-purple-600 to-fuchsia-700 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">Ready to Leverage AI?</h2>
            <p className="mb-8 text-lg text-white/90">Custom AI solutions that transform your business operations.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-purple-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Explore AI Solutions</Link>
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
