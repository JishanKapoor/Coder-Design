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
  "AI & Automation": "/ai-workflow",
};
export default function BlogPost() {
  const [showCalendar, setShowCalendar] = useState(false);
  const category = "Mobile App Development";
  const categoryLink = categoryLinks[category as keyof typeof categoryLinks] || "/blogs";
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className={"relative overflow-hidden bg-blue-600 py-20 lg:py-28"}>
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
            <h1 className="mb-6 text-white">Mobile App Design Best Practices for 2025</h1>
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
                <span>{new Date(meta.createdAt || "2025-11-14T16:31:15.470Z").toDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{meta.readTime} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className={"gap-2 bg-white text-blue-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Start Your App</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>UX Design Review</Button>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 lg:px-12 -mt-12">
        <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
          <img src="/uploads/1763136852914-Mobile_Design.jfif" alt="Mobile App Design Best Practices for 2025" className="w-full h-full object-cover" />
        </div>
      </div>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: "<p>Mobile app design has evolved significantly over the years. With users spending more time on smartphones than ever before, creating exceptional mobile experiences is crucial for app success. Whether you&#39;re building a new product or optimizing an existing one, great design plays a vital role in user engagement, retention, and long-term business growth.</p>\n<h2>Why Mobile App Design Matters in 2025</h2>\n<p>A well-designed app isn’t just visually appealing — it directly impacts user behavior. Users judge an app within the first 3 seconds, and poor design often leads to instant uninstalls.</p>\n<h3>Key Reasons Design Is Critical</h3>\n<ul>\n<li>First Impressions Drive Retention: Users decide almost immediately whether to keep or delete an app.</li>\n<li>Higher Engagement Rates: Intuitive design improves feature usage and navigation flow.</li>\n<li>Brand Recognition: Consistent, polished visuals build trust and credibility.</li>\n<li>Enhanced User Satisfaction: Smooth UX increases retention and reduces churn.</li>\n</ul>\n<h2>Core Design Principles</h2>\n<h3>1. Simplicity and Clarity</h3>\n<p>Mobile screens are limited in space. Every design element must have a clear purpose.</p>\n<ul>\n<li>Use minimal, focused features  </li>\n<li>Keep text clear, concise, and readable  </li>\n<li>Maintain a consistent visual hierarchy  </li>\n<li>Avoid clutter and unnecessary components  </li>\n<li>Prioritize features based on real data and user needs</li>\n</ul>\n<h3>2. Streamlined Navigation</h3>\n<p>Effective navigation reduces cognitive load and enhances usability.</p>\n<h4>Bottom Navigation</h4>\n<p>Ideal for apps with 3–5 main sections. Easily reachable with thumbs and visible across screens.</p>\n<h4>Tab Bars</h4>\n<p>Commonly used on iOS to switch between key views quickly.</p>\n<h4>Hamburger Menu</h4>\n<p>Suitable for secondary features like settings, but not recommended for primary functions.</p>\n<h4>Gesture-Based Navigation</h4>\n<p>Swipes, long-presses, and drag gestures offer modern interactions, but always provide visible alternatives.</p>\n<h2>Visual Design Elements</h2>\n<h3>Typography</h3>\n<p>Readable text is essential for a great mobile experience.</p>\n<ul>\n<li>Body text: minimum 16px</li>\n<li>Headings: 20–34px</li>\n<li>Small text: minimum 12px</li>\n<li>Use system or optimized custom fonts</li>\n</ul>\n<h3>Color and Visual Hierarchy</h3>\n<ul>\n<li>Maintain a consistent color palette  </li>\n<li>Use contrast for readability  </li>\n<li>Apply shadows and elevation to separate elements  </li>\n<li>Create clear visual flow from top-priority elements to secondary ones</li>\n</ul>\n<h2>User Experience Best Practices</h2>\n<h3>Loading States and Feedback</h3>\n<p>Never leave users uncertain.</p>\n<ul>\n<li>Use skeleton screens instead of blank pages  </li>\n<li>Show progress indicators for actions taking over 1 second  </li>\n<li>Provide clear error messages with solutions  </li>\n<li>Use micro-interactions to confirm successful actions</li>\n</ul>\n<h3>Onboarding Experience</h3>\n<p>Make a strong, clear first impression.</p>\n<ul>\n<li>Keep onboarding between 3–5 screens  </li>\n<li>Highlight essential features only  </li>\n<li>Allow users to skip onboarding  </li>\n<li>Use contextual onboarding to teach features at the right time</li>\n</ul>\n<h3>Forms and Input</h3>\n<p>Typing on mobile can be frustrating — reduce friction wherever possible.</p>\n<ul>\n<li>Minimize the number of form fields  </li>\n<li>Use appropriate keyboard layouts  </li>\n<li>Enable autofill options  </li>\n<li>Provide live inline validation  </li>\n<li>Include social sign-in options for faster onboarding</li>\n</ul>\n<h2>Performance Optimization</h2>\n<p>Great design must be paired with smooth performance.</p>\n<h3>App Launch Speed</h3>\n<p>Aim for launch times under 2 seconds on mid-range devices.</p>\n<h3>Smooth Animations</h3>\n<p>Maintain 60fps animations for fluid transitions and interactions.</p>\n<h3>Memory Optimization</h3>\n<ul>\n<li>Optimize and compress images  </li>\n<li>Lazy-load content  </li>\n<li>Reduce unnecessary background tasks</li>\n</ul>\n<h2>Accessibility Considerations</h2>\n<p>Accessibility ensures your app is usable by everyone.</p>\n<ul>\n<li>Support screen readers like VoiceOver and TalkBack  </li>\n<li>Respect system text-size preferences  </li>\n<li>Honor reduced-motion settings  </li>\n<li>Ensure color contrast meets accessibility standards</li>\n</ul>\n<h2>Platform-Specific Guidelines</h2>\n<h3>iOS Design (Apple Human Interface Guidelines)</h3>\n<ul>\n<li>Use native iOS components  </li>\n<li>Respect safe-area insets  </li>\n<li>Use SF Symbols for icon consistency  </li>\n<li>Apply iOS navigation and gesture standards</li>\n</ul>\n<h3>Android Material Design (Material You)</h3>\n<ul>\n<li>Use Material Design 3 components  </li>\n<li>Apply elevation and shadows purposefully  </li>\n<li>Follow Android back navigation expectations  </li>\n<li>Support dynamic color theming</li>\n</ul>\n<h2>Testing and Iteration</h2>\n<p>Testing is essential for refining the user experience.</p>\n<ul>\n<li>Run usability tests with real users  </li>\n<li>Measure task completion times  </li>\n<li>Track user flow analytics (Firebase, Mixpanel)  </li>\n<li>Use A/B testing before major design changes</li>\n</ul>\n<p>Mobile app design is an ongoing process. Based on feedback and performance data, continuously improve layouts, features, and interactions.</p>\n<h2>Designing Mobile Apps That Convert</h2>\n<p>Great mobile app design balances aesthetics with functionality, simplicity with capability, and innovation with familiarity. By following modern best practices, respecting platform guidelines, and continually iterating based on user feedback, you can build mobile experiences that users truly love.</p>\n<hr>\n" }} />
        </div>
      </article>
      <section className={"bg-blue-600 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">
              Design a Mobile Experience Users Love
            </h2>
            <p className="mb-8 text-lg text-white/90">We design & build native and cross-platform apps users love.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-blue-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Design Your Mobile App</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Request a UX Review</Button>
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