"use client";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants } from "../animations/variants";
import Link from 'next/link';

export function CTASection() {
  const shouldAnimate = useAnimations();

  return (
    <section className="border-b border-slate-200 bg-gradient-to-br from-violet-50 to-indigo-50 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, amount: 0.3 } : undefined}
          variants={shouldAnimate ? containerVariants : undefined}
        >
          <motion.h2
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-6 text-slate-900"
          >
            Let&apos;s Build Something Great Together
          </motion.h2>

          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-10 text-lg leading-relaxed text-slate-600"
          >
            Whether you need a custom web application, a mobile app for iOS and Android, AI powered 
            automation with voice bots and OpenAI integration, or an SEO strategy that drives organic revenue, 
            our Toronto based team of senior engineers, data scientists, and growth strategists is ready to help. 
            Book a free consultation and get a custom project quote today.
          </motion.p>

          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="gap-2 bg-violet-600 px-8 hover:bg-violet-700 transition-all duration-200" asChild>
              <Link href="/contact" title="Get your free quote from CoderDesign">
                Get Your Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 transition-all duration-200" asChild>
              <Link href="/about" title="Learn about the CoderDesign team">About Our Team</Link>
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
