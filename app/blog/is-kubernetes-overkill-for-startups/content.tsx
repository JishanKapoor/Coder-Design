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
      <section className={"relative overflow-hidden bg-purple-600 py-20 lg:py-28"}>
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
            <h1 className="mb-6 text-white">Is Kubernetes overkill for startups?</h1>
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
                <Link href="/contact">Optimize Your Infrastructure</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Get an Infra Review</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>Kubernetes has become the gold standard for container orchestration, but is it the right choice for every startup? The answer depends on your scale, team, and specific needs.</p>

<h2>What Kubernetes Does Well</h2>
<p>Kubernetes excels at managing containerized applications at scale. It provides:</p>
<ul>
<li>Automatic scaling: Scale pods up and down based on demand</li>
<li>Self-healing: Automatically restart failed containers and reschedule workloads</li>
<li>Service discovery: Built-in DNS and load balancing</li>
<li>Rolling updates: Deploy new versions with zero downtime</li>
<li>Resource management: Efficiently allocate CPU and memory across workloads</li>
</ul>

<h2>When Kubernetes IS Overkill</h2>
<p>For many startups, Kubernetes adds unnecessary complexity:</p>

<h3>You Have a Small Team</h3>
<p>Kubernetes requires dedicated DevOps expertise. If your engineering team is under 10 people, the operational overhead of managing K8s likely outweighs the benefits.</p>

<h3>Your Traffic Is Predictable</h3>
<p>If you're not dealing with massive traffic spikes or complex scaling needs, simpler solutions work just as well.</p>

<h3>You're Pre-Product-Market Fit</h3>
<p>Before finding product-market fit, your priority should be shipping features fast — not perfecting infrastructure.</p>

<h2>Better Alternatives for Startups</h2>
<ul>
<li>Vercel / Netlify: Perfect for Next.js and JAMstack apps with built-in scaling</li>
<li>Railway / Render: Simple container deployment without K8s complexity</li>
<li>AWS ECS / Fargate: Managed container services without managing clusters</li>
<li>Google Cloud Run: Serverless containers that scale to zero</li>
<li>Fly.io: Deploy apps globally with simple configuration</li>
</ul>

<h2>When to Adopt Kubernetes</h2>
<p>Consider K8s when you have:</p>
<ul>
<li>More than 20+ microservices in production</li>
<li>Dedicated DevOps/SRE team members</li>
<li>Complex deployment pipelines with multiple environments</li>
<li>Strict compliance requirements requiring infrastructure control</li>
<li>Significant cost savings from efficient resource utilization</li>
</ul>

<blockquote><p>"The best infrastructure is the one that lets you ship features fastest. For most startups, that's not Kubernetes."</p></blockquote>

<h2>Making the Right Infrastructure Decision</h2>
<p>Kubernetes is a powerful tool, but power without need is just complexity. Most startups should start with simpler deployment platforms and migrate to K8s only when their scale genuinely demands it.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-purple-600 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">
              Scale Your Startup Infrastructure the Right Way
            </h2>
            <p className="mb-8 text-lg text-white/90">Full-stack engineering for robust, secure, performant products.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-purple-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Get Expert Infra Guidance</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Get an Infra Review</Button>
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
