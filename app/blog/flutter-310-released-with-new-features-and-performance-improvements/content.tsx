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
            <h1 className="mb-6 text-white">{meta.title}</h1>
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
                <Link href="/contact">Build with Flutter 3.10</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Book a Flutter Review</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<h2>What Is New in Flutter 3.10</h2>
<p>Flutter 3.10 represents a major step forward for cross-platform mobile development. With significant performance improvements, new rendering capabilities, and enhanced developer tooling, this release solidifies Flutter as one of the most powerful frameworks for building beautiful, natively compiled applications.</p>

<h2>Performance Improvements</h2>
<p>The most notable upgrade in Flutter 3.10 is the dramatic improvement in rendering performance. The Impeller rendering engine, which replaces Skia on iOS, now delivers consistent 60fps+ animations with zero shader compilation jank.</p>

<h3>Key Performance Gains</h3>
<ul>
<li>Impeller on iOS: Eliminates shader compilation stuttering, delivering buttery-smooth animations from the first frame</li>
<li>Reduced memory footprint: Apps consume 20-30% less memory on average compared to Flutter 3.7</li>
<li>Faster startup times: Cold start times improved by up to 15% through optimized Dart VM initialization</li>
<li>Web performance: CanvasKit rendering now loads 30% faster with improved tree-shaking</li>
</ul>

<h2>New Features and APIs</h2>

<h3>Material 3 Components</h3>
<p>Flutter 3.10 completes the Material 3 migration with all components now supporting the latest Material Design specifications. New widgets include updated date pickers, time pickers, and search bars with built-in filtering support.</p>

<h3>Enhanced Platform Integration</h3>
<ul>
<li>iOS 17 support: Full compatibility with the latest Apple APIs, including Live Activities and Dynamic Island</li>
<li>Android 14 features: Predictive back gestures, per-app language preferences, and photo picker integration</li>
<li>macOS improvements: Native menu bar support and improved window management</li>
<li>Windows enhancements: Better high-DPI scaling and native accessibility support</li>
</ul>

<h3>DevTools Upgrades</h3>
<p>The Flutter DevTools suite received major updates that make debugging and profiling significantly easier:</p>
<ul>
<li>Performance overlay redesign: Clearer visualization of UI and raster thread performance</li>
<li>Memory profiler: New allocation tracking and leak detection capabilities</li>
<li>Widget inspector: Enhanced layout explorer with real-time constraint visualization</li>
<li>Network profiler: Built-in HTTP request monitoring with timeline integration</li>
</ul>

<h2>Dart 3.1 Integration</h2>
<p>Flutter 3.10 ships with Dart 3.1, which introduces several language features that improve code quality and developer productivity:</p>
<ul>
<li>Sealed classes: Enable exhaustive pattern matching for state management</li>
<li>Class modifiers: Better control over API surface with interface, base, final, and mixin modifiers</li>
<li>Records: Lightweight composite values without defining a class</li>
<li>Pattern matching: Destructure objects and collections with concise, readable syntax</li>
</ul>

<h2>Migration Guide</h2>
<p>Upgrading to Flutter 3.10 is straightforward for most projects:</p>
<ul>
<li>Run flutter upgrade to get the latest stable release</li>
<li>Update deprecated Material 2 widgets to their Material 3 equivalents</li>
<li>Test Impeller rendering on iOS (enabled by default) and report any visual regressions</li>
<li>Review Dart 3.1 migration notes for any breaking changes in your dependencies</li>
</ul>

<h2>What This Means for Businesses</h2>
<p>For companies invested in Flutter, this release delivers tangible business value:</p>
<ul>
<li>Faster time-to-market: Improved hot reload and new DevTools reduce development cycles</li>
<li>Better user retention: Smoother animations and faster startup times improve user experience metrics</li>
<li>Lower costs: Single codebase across iOS, Android, web, and desktop means less maintenance overhead</li>
<li>Future-proof: Strong ecosystem growth and continued investment ensure long-term viability</li>
</ul>

<blockquote><p>Flutter 3.10 is not just an incremental update. It is a statement that cross-platform development can match and exceed native performance when done right.</p></blockquote>

<h2>What Flutter 3.10 Means for Your Next Project</h2>
<p>Flutter 3.10 is a milestone release that addresses the framework biggest criticism, which is performance consistency. With Impeller eliminating shader jank on iOS, Material 3 completion, and Dart 3.1 powerful language features, Flutter is better positioned than ever for production mobile, web, and desktop development.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-gradient-to-br from-blue-600 to-cyan-700 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">
              Build Cross-Platform Apps with Flutter 3.10
            </h2>
            <p className="mb-8 text-lg text-white/90">Cross-platform mobile development for iOS, Android, and beyond.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-blue-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Start Your Flutter App</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Book a Flutter Review</Button>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
      {showCalendar && (
        <motion.div initial="hidden" animate="visible" exit="exit" variants={modalBackdropVariants} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowCalendar(false)}>
          <motion.div initial="hidden" animate="visible" exit="exit" variants={modalContentVariants} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowCalendar(false)} className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full p-2 hover:bg-slate-100 transition-colors duration-150">
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
            <h3 className="mb-4 sm:mb-6 pr-10 text-xl sm:text-2xl text-slate-900">Schedule a Discovery Call</h3>
            <div className="h-[500px] sm:h-[600px] overflow-hidden rounded-lg">
              <iframe src="https://calendly.com/hello-coderdesign/30min" width="100%" height="100%" frameBorder="0" title="Schedule a Discovery Call"></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
