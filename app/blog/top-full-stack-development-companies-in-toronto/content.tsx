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
  const category = "Full-Stack Development";
  const categoryLink = categoryLinks[category as keyof typeof categoryLinks] || "/blogs";
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className={"relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-20 lg:py-28"}>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <div>
            <div className="mb-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to Blogs
              </Link>
            </div>
            <Link href={categoryLink} className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
              <span className="text-sm text-white">Full-Stack Development</span>
            </Link>
            <h1 className="mb-6 text-white">Top Full-Stack Development Companies in Toronto</h1>
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
              <Button className={"gap-2 bg-white text-violet-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Find Your Dev Team</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Book a Discovery Call</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>Toronto is home to some of the most talented full-stack development teams in the world. From startups to enterprise solutions, the city's developers build everything from web applications to complex distributed systems.</p>

<h2>What Defines a Top Full-Stack Company</h2>
<p>The best full-stack development companies share several characteristics:</p>
<ul>
<li><strong>Technical breadth:</strong> Expertise across frontend, backend, databases, and DevOps</li>
<li><strong>Modern stack:</strong> Proficiency in current technologies like React, Next.js, Node.js, and cloud platforms</li>
<li><strong>Process maturity:</strong> Agile methodologies, CI/CD, code reviews, and testing practices</li>
<li><strong>Communication:</strong> Clear, transparent project management and client communication</li>
<li><strong>Portfolio:</strong> Proven track record of successful projects across industries</li>
</ul>

<h2>Key Technologies in Toronto Full-Stack Development</h2>

<h3>Frontend</h3>
<ul>
<li><strong>React & Next.js:</strong> The dominant framework for modern web applications</li>
<li><strong>TypeScript:</strong> Type-safe JavaScript for maintainable codebases</li>
<li><strong>Tailwind CSS:</strong> Utility-first styling for rapid development</li>
</ul>

<h3>Backend</h3>
<ul>
<li><strong>Node.js:</strong> JavaScript runtime for scalable server applications</li>
<li><strong>Python:</strong> Versatile language for APIs, ML, and data processing</li>
<li><strong>PostgreSQL:</strong> Enterprise-grade relational database</li>
</ul>

<h3>Cloud & DevOps</h3>
<ul>
<li><strong>AWS / GCP / Azure:</strong> Cloud platforms for scalable infrastructure</li>
<li><strong>Docker:</strong> Containerization for consistent deployments</li>
<li><strong>Vercel:</strong> Optimized hosting for Next.js applications</li>
</ul>

<h2>Industries Served</h2>
<p>Toronto's full-stack developers build for every industry:</p>
<ul>
<li><strong>Finance:</strong> Trading platforms, banking apps, and fintech solutions</li>
<li><strong>Healthcare:</strong> Patient portals, telemedicine, and health data platforms</li>
<li><strong>E-commerce:</strong> Online stores, marketplaces, and retail technology</li>
<li><strong>Media:</strong> Content management, streaming, and publishing platforms</li>
<li><strong>Real Estate:</strong> Property management, listings, and analytics platforms</li>
</ul>

<h2>Choosing the Right Development Partner</h2>
<ul>
<li>Review their portfolio and case studies</li>
<li>Assess their technical expertise with your required stack</li>
<li>Evaluate their communication and project management approach</li>
<li>Check client references and reviews</li>
<li>Understand their pricing model and timeline estimates</li>
</ul>

<h2>Choosing Your Ideal Development Partner</h2>
<p>Toronto's full-stack development landscape offers world-class talent and diverse expertise. Whether you're building a startup MVP or scaling an enterprise platform, the right development partner can make all the difference in your project's success.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-gradient-to-br from-violet-600 to-indigo-700 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">
              Find the Best Full-Stack Team for Your Project
            </h2>
            <p className="mb-8 text-lg text-white/90">Full-stack engineering for robust, secure, performant products.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-violet-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Start Your Development</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Book a Discovery Call</Button>
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
