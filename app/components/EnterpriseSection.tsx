"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants, slideInLeftVariants, slideInRightVariants } from "../animations/variants";
import Link from 'next/link';

const features = [
  "Enterprise-grade security & compliance",
  "Scalable cloud architecture (AWS, GCP, Azure)",
  "Custom development & integration",
  "Dedicated project management",
  "24/7 priority support",
  "Agile development methodology",
  "Advanced analytics & reporting",
  "Flexible engagement models",
];

export function EnterpriseSection() {
  const shouldAnimate = useAnimations();

  return (
    <section id="enterprise" className="bg-slate-900 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={shouldAnimate ? "hidden" : false}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={shouldAnimate ? { once: true, amount: 0.3 } : undefined}
            variants={shouldAnimate ? slideInLeftVariants : undefined}
          >
            <motion.div 
              variants={shouldAnimate ? itemVariants : undefined}
              className="mb-4 inline-block rounded-full bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400"
            >
              Enterprise Solutions
            </motion.div>

            <motion.h2 
              variants={shouldAnimate ? itemVariants : undefined}
              className="mb-6 text-white"
            >
              Built for New York's
              <br />
              Most Demanding Enterprises
            </motion.h2>

            <motion.p 
              variants={shouldAnimate ? itemVariants : undefined}
              className="mb-8 text-lg leading-relaxed text-slate-400"
            >
              Serving Fortune 500 companies and high-growth startups in NYC with enterprise-grade 
              development, AI solutions, and AI-powered SEO services. Our proven methodologies deliver 
              results at scale with security and compliance built-in.
            </motion.p>

            <motion.div 
              variants={shouldAnimate ? itemVariants : undefined}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 transition-all duration-200" asChild>
                <Link href="/contact">Custom Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white hover:opacity-80 transition-all duration-200"
                asChild
              >
                <a href="tel:+14372392448">
                  <Calendar className="mr-2 h-5 w-5" />
                  (437) 239-2448
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-800/50 p-4 transition-all duration-200 hover:border-violet-500/50 hover:bg-slate-800"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-violet-400 mt-1" />
                <span className="text-sm text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
