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
            <h1 className="mb-6 text-white">How Apple Broke the ‘Free App’ Economy</h1>
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
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Schedule a Call</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>Apple's App Store policies have fundamentally reshaped how developers monetize mobile applications. From the 30% commission to App Tracking Transparency, these changes have disrupted the free app model that fueled the mobile revolution.</p>

<h2>The Rise and Fall of Free Apps</h2>
<p>The free app economy was built on a simple model: give the app away for free, monetize through ads and data. This model powered billions of downloads and created tech giants. But Apple's privacy-first approach has systematically dismantled this foundation.</p>

<h3>App Tracking Transparency (ATT)</h3>
<p>Introduced in iOS 14.5, ATT requires apps to ask permission before tracking users across other apps and websites. The impact was immediate and dramatic:</p>
<ul>
<li><strong>Only ~25% of users opt in</strong> to tracking when asked</li>
<li><strong>Ad targeting accuracy</strong> decreased significantly for non-consenting users</li>
<li><strong>Ad revenue dropped</strong> for many free apps relying on targeted advertising</li>
<li><strong>Meta (Facebook) estimated</strong> a $10 billion annual revenue impact</li>
</ul>

<h2>The 30% Commission Debate</h2>
<p>Apple's 30% cut on all App Store transactions has been a point of contention since the store launched. For developers, this means:</p>
<ul>
<li>30% of every in-app purchase goes to Apple</li>
<li>30% of every subscription payment (first year), 15% after</li>
<li>No alternative payment methods allowed (though regulations are changing this)</li>
</ul>

<h3>The Impact on Small Developers</h3>
<p>While Apple introduced the Small Business Program (15% commission for developers earning under $1M), the overall ecosystem still heavily favors large publishers who can absorb the costs.</p>

<h2>What This Means for App Development</h2>
<p>The shift away from ad-supported free apps is pushing developers toward:</p>
<ul>
<li><strong>Subscription models:</strong> Recurring revenue that's more predictable</li>
<li><strong>Freemium strategies:</strong> Free core features with premium upgrades</li>
<li><strong>One-time purchases:</strong> A return to paid apps for quality software</li>
<li><strong>First-party data:</strong> Building direct relationships with users</li>
</ul>

<h2>Looking Forward</h2>
<p>The EU's Digital Markets Act and similar regulations worldwide are beginning to force Apple to open up its ecosystem. Sideloading, alternative app stores, and alternative payment methods may reshape the landscape once again.</p>

<blockquote><p>"The free app economy was always subsidized by user privacy. As that subsidy disappears, the true cost of app development becomes visible."</p></blockquote>

<h2>Conclusion</h2>
<p>Apple's policies have permanently altered the mobile app economy. Developers who adapt to subscription models, privacy-first design, and direct user relationships will thrive. Those clinging to the old ad-supported model will struggle increasingly.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-gradient-to-br from-blue-600 to-cyan-700 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">Ready to Launch Your App?</h2>
            <p className="mb-8 text-lg text-white/90">Expert mobile development from concept to App Store success.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-blue-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Build Your App</Link>
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
