"use client";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants, scaleItemVariants, modalBackdropVariants, modalContentVariants } from "../animations/variants";
import Link from 'next/link';

export function HeroSection() {
  const [showCalendar, setShowCalendar] = useState(false);
  const shouldAnimate = useAnimations();

  return (
    <>
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-32 pb-20 lg:pt-40 lg:pb-32"
      aria-label="Hero section"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={shouldAnimate ? "hidden" : false}
          animate={shouldAnimate ? "visible" : undefined}
          variants={shouldAnimate ? containerVariants : undefined}
        >
          {/* Badge */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-8 inline-flex"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm text-violet-700 transition-transform duration-200 hover:scale-105">
              <Sparkles className="h-4 w-4" />
              <span>Toronto's Top Rated Software Development Company</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-6 text-slate-900"
          >
            Custom Software Development{" "}
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Company in Toronto
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600"
          >
            CoderDesign is a Toronto based software development company that builds custom web applications, 
            mobile apps, AI automation systems, and SEO strategies for startups and enterprises across the GTA. 
            Our senior engineers and data scientists deliver production ready solutions that scale from 
            your first MVP to millions of users.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="gap-2 bg-violet-600 px-8 hover:bg-violet-700 transition-all duration-200" asChild>
              <Link href="/contact">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 px-8 transition-all duration-200"
              onClick={() => setShowCalendar(true)}
            >
              <Calendar className="h-4 w-4" />
              Book a Meet
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8"
          >
            {[
              { value: "100+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={shouldAnimate ? scaleItemVariants : undefined}
              >
                <div className="mb-1 text-3xl text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Calendar Modal */}
    {showCalendar && (
      <motion.div
        initial={shouldAnimate ? "hidden" : false}
        animate={shouldAnimate ? "visible" : undefined}
        exit={shouldAnimate ? "exit" : undefined}
        variants={shouldAnimate ? modalBackdropVariants : undefined}
        transition={shouldAnimate ? { duration: 0.2 } : undefined}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={() => setShowCalendar(false)}
      >
        <motion.div
          initial={shouldAnimate ? "hidden" : false}
          animate={shouldAnimate ? "visible" : undefined}
          exit={shouldAnimate ? "exit" : undefined}
          variants={shouldAnimate ? modalContentVariants : undefined}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowCalendar(false)}
            className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full p-2 hover:bg-slate-100 transition-colors duration-150"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h3 className="mb-4 sm:mb-6 pr-10 text-xl sm:text-2xl text-slate-900">Schedule a Consultation</h3>
          
          {/* Calendly Embed */}
          <div className="h-[500px] sm:h-[600px] overflow-hidden rounded-lg">
            <iframe
              src="https://calendly.com/hello-coderdesign/30min"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a meeting"
            ></iframe>
          </div>
          
          {/* Removed demo calendar note */}
        </motion.div>
      </motion.div>
    )}
    </>
  );
}
