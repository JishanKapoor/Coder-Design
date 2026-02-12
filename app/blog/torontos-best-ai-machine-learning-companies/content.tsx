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
      <section className={"relative overflow-hidden bg-purple-600 py-20 lg:py-28"}>
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
            <h1 className="mb-6 text-white">Toronto's Best AI & Machine Learning Companies Driving Innovation</h1>
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
                <Link href="/contact">Talk to an AI Expert</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Request an AI Proposal</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>Toronto has become a powerhouse for AI and machine learning innovation. The city's unique combination of finance, media, healthcare, and technology creates an unparalleled environment for AI companies to thrive.</p>

<h2>Why Toronto Leads in AI</h2>
<p>Several factors make Toronto a top destination for AI companies:</p>
<ul>
<li>Industry concentration: More Fortune 500 headquarters than any other city</li>
<li>Research institutions: World-class universities driving AI research</li>
<li>Funding ecosystem: Billions in VC funding flowing to AI startups</li>
<li>Diverse talent: Engineers, data scientists, and domain experts from every industry</li>
</ul>

<h2>Key AI Sectors in Toronto</h2>

<h3>Financial AI</h3>
<p>Bay Street drives massive demand for AI in trading, risk management, fraud detection, and compliance. Toronto's financial AI companies process trillions of dollars in transactions using ML models.</p>

<h3>Healthcare AI</h3>
<p>From diagnostic imaging to drug discovery, Toronto's healthcare AI sector is advancing medical care through machine learning and data analysis.</p>

<h3>Media and Creative AI</h3>
<p>Toronto's media industry is leveraging generative AI for content creation, personalization, and audience analytics.</p>

<h3>Enterprise AI Solutions</h3>
<p>Companies building AI tools for business operations — from customer service to supply chain optimization — are thriving in Toronto's enterprise-heavy market.</p>

<h2>What to Look for in an AI Partner</h2>
<ul>
<li>Proven track record: Real case studies and measurable results</li>
<li>Domain expertise: Understanding of your specific industry challenges</li>
<li>Ethical AI practices: Commitment to responsible AI development</li>
<li>Scalable solutions: Architecture that grows with your needs</li>
<li>Transparent communication: Clear explanations of AI capabilities and limitations</li>
</ul>

<h2>The Future of AI in Toronto</h2>
<p>Toronto's AI ecosystem is poised for continued growth, driven by increasing enterprise adoption, favorable policy environments, and a deepening talent pool. The city's diversity of industries ensures AI innovation will continue across multiple sectors simultaneously.</p>

<h2>Selecting the Right AI Partner in Toronto</h2>
<p>Toronto's AI and machine learning landscape is rich, diverse, and growing. Whether you need AI consulting, custom ML models, or enterprise AI integration, the city offers world-class expertise across every domain.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-purple-600 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">
              Work with Toronto's Leading AI Engineers
            </h2>
            <p className="mb-8 text-lg text-white/90">Custom AI solutions that transform your business operations.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-purple-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Work with AI Specialists</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Request an AI Proposal</Button>
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
