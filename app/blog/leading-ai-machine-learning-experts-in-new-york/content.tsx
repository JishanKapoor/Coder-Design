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
            <h1 className="mb-6 text-white">Leading AI & Machine Learning Experts in New York</h1>
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
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>New York City has emerged as a global hub for AI and machine learning innovation. From Wall Street's algorithmic trading to healthcare AI and creative applications, the city's AI ecosystem is thriving.</p>

<h2>Why New York for AI?</h2>
<p>New York offers unique advantages for AI development:</p>
<ul>
<li><strong>Industry diversity:</strong> Finance, healthcare, media, retail, and real estate all drive AI demand</li>
<li><strong>Talent pool:</strong> Columbia, NYU, and Cornell Tech produce world-class AI researchers</li>
<li><strong>Startup ecosystem:</strong> Hundreds of AI-focused startups across all boroughs</li>
<li><strong>Enterprise demand:</strong> Major corporations headquartered in NYC are hungry for AI solutions</li>
</ul>

<h2>Key AI Capabilities in Demand</h2>

<h3>Natural Language Processing</h3>
<p>NLP powers chatbots, content generation, sentiment analysis, and document processing. NYC's media and finance industries are particularly heavy users of NLP technology.</p>

<h3>Computer Vision</h3>
<p>From retail analytics to medical imaging, computer vision applications are growing rapidly across New York industries.</p>

<h3>Predictive Analytics</h3>
<p>Wall Street pioneered predictive modeling, but now every industry from real estate to healthcare uses ML-powered predictions for decision-making.</p>

<h3>Generative AI</h3>
<p>The latest wave of AI — generative models for text, images, code, and video — is transforming how businesses create and communicate.</p>

<h2>Choosing the Right AI Partner</h2>
<p>When evaluating AI and ML service providers, consider:</p>
<ul>
<li><strong>Industry expertise:</strong> Do they understand your specific domain?</li>
<li><strong>Technical depth:</strong> Can they build custom models, not just implement APIs?</li>
<li><strong>Data security:</strong> How do they handle sensitive data and compliance?</li>
<li><strong>Scalability:</strong> Can their solutions grow with your business?</li>
<li><strong>Communication:</strong> Do they explain complex AI concepts clearly?</li>
</ul>

<h2>The Future of AI in New York</h2>
<p>New York's AI ecosystem continues to grow, driven by increasing enterprise adoption, regulatory clarity, and a deep talent pool. Companies that invest in AI partnerships now will be best positioned for the AI-driven future.</p>

<h2>Conclusion</h2>
<p>New York's combination of industry diversity, talent, and enterprise demand makes it one of the best places in the world to develop and deploy AI solutions. Whether you're a startup or enterprise, the right AI partner can accelerate your business transformation.</p>
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
