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
  const category = "Mobile App Development";
  const categoryLink = categoryLinks[category as keyof typeof categoryLinks] || "/blogs";
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className={"relative overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-700 py-20 lg:py-28"}>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <div>
            <div className="mb-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to Blogs
              </Link>
            </div>
            <Link href={categoryLink} className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
              <span className="text-sm text-white">Mobile App Development</span>
            </Link>
            <h1 className="mb-6 text-white">Mobile App Development in 2025: Complete Guide to Building Successful Apps</h1>
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
              <Button className={"gap-2 bg-white text-blue-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Plan Your Mobile App</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Get an App Strategy Call</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>Mobile app development continues to evolve rapidly. This comprehensive guide covers everything you need to know about building successful mobile applications in 2025.</p>

<h2>The Mobile Landscape in 2025</h2>
<p>Mobile devices account for over 60% of global internet traffic. With 6.8 billion smartphone users worldwide, the opportunity for mobile apps has never been greater.</p>

<h3>Key Trends Shaping Mobile Development</h3>
<ul>
<li><strong>AI-powered features:</strong> On-device ML, smart assistants, and personalization</li>
<li><strong>Cross-platform development:</strong> Flutter and React Native dominate multi-platform builds</li>
<li><strong>5G optimization:</strong> Faster networks enable richer app experiences</li>
<li><strong>Privacy-first design:</strong> Users and regulators demand better data protection</li>
<li><strong>Super apps:</strong> Multi-function platforms that combine services</li>
</ul>

<h2>Choosing Your Development Approach</h2>

<h3>Native Development</h3>
<p>Build separate apps for iOS (Swift) and Android (Kotlin):</p>
<ul>
<li><strong>Pros:</strong> Best performance, full platform API access, superior UX</li>
<li><strong>Cons:</strong> Higher cost, longer development time, two codebases to maintain</li>
<li><strong>Best for:</strong> Performance-critical apps, complex animations, platform-specific features</li>
</ul>

<h3>Cross-Platform Development</h3>
<p>Build once, deploy everywhere:</p>
<ul>
<li><strong>Flutter:</strong> Google's UI toolkit with excellent performance and beautiful widgets</li>
<li><strong>React Native:</strong> Facebook's framework leveraging React and JavaScript</li>
<li><strong>Pros:</strong> Faster development, single codebase, lower cost</li>
<li><strong>Cons:</strong> Slightly lower performance, occasional platform quirks</li>
</ul>

<h2>Essential App Features for 2025</h2>
<ul>
<li><strong>Biometric authentication:</strong> Face ID, fingerprint, and voice recognition</li>
<li><strong>Offline functionality:</strong> Apps must work without constant connectivity</li>
<li><strong>Push notifications:</strong> Smart, personalized, and non-intrusive</li>
<li><strong>Accessibility:</strong> WCAG compliance for inclusive design</li>
<li><strong>Analytics integration:</strong> Data-driven insights for continuous improvement</li>
</ul>

<h2>The Development Process</h2>
<ol>
<li><strong>Discovery & Planning:</strong> Define goals, user personas, and feature requirements</li>
<li><strong>UI/UX Design:</strong> Create wireframes, prototypes, and visual designs</li>
<li><strong>Development:</strong> Build frontend, backend, and integrate APIs</li>
<li><strong>Testing:</strong> Unit tests, integration tests, and user acceptance testing</li>
<li><strong>Launch:</strong> App store submission, marketing, and monitoring</li>
<li><strong>Iteration:</strong> Analyze user feedback and continuously improve</li>
</ol>

<h2>Cost Considerations</h2>
<p>Mobile app development costs vary widely based on complexity:</p>
<ul>
<li><strong>Simple apps:</strong> $15,000 - $50,000</li>
<li><strong>Medium complexity:</strong> $50,000 - $150,000</li>
<li><strong>Complex enterprise apps:</strong> $150,000 - $500,000+</li>
</ul>

<h2>Your Mobile App Roadmap for 2025</h2>
<p>Building a successful mobile app in 2025 requires understanding current trends, choosing the right technology stack, and following a structured development process. Focus on user experience, performance, and iterative improvement to create apps that users love.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-gradient-to-br from-blue-600 to-cyan-700 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">Build a Future-Ready Mobile App in 2025</h2>
            <p className="mb-8 text-lg text-white/90">Expert mobile development from concept to App Store success.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-blue-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Build Your App</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Talk to an App Expert</Button>
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
