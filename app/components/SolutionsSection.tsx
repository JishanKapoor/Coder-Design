"use client";
import { motion } from "framer-motion";
import { Layers, Brain, Smartphone, Search } from "lucide-react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants } from "../animations/variants";
import Link from 'next/link';

const solutions = [
  {
    icon: Layers,
    category: "Engineering",
    title: "Full Stack Web Development",
    description:
      "We build robust, production ready applications from interactive frontends to scalable backend APIs and cloud infrastructure. Our senior engineers deliver complete solutions using Python, Django, Node.js, React, Next.js, PostgreSQL, AWS, and Google Cloud with automated testing, CI/CD, and security built in from day one.",
    metrics: ["Frontend and Backend Development", "Cloud Infrastructure and DevOps", "API Development and Integration", "Database Architecture and Optimization"],
    href: "/full-stack-engineering",
  },
  {
    icon: Smartphone,
    category: "Mobile",
    title: "Mobile App Development",
    description:
      "We design and develop high performance mobile applications for iOS and Android that users love. Using React Native, Flutter, Swift, and Kotlin, we handle everything from UX research and prototyping to App Store submission, push notifications, and post launch analytics.",
    metrics: ["iOS and Android Apps", "React Native and Flutter", "Swift and Kotlin Native", "App Store Optimization"],
    href: "/mobile-app-development",
  },
  {
    icon: Brain,
    category: "AI",
    title: "AI Workflow Automation",
    description:
      "Transform your business operations with intelligent automation. We build AI chatbots, n8n and Make workflow pipelines, voice assistants, and predictive analytics systems using OpenAI, Claude, LangChain, and TensorFlow to eliminate repetitive work and unlock data driven insights.",
    metrics: ["n8n and Make Workflows", "AI Chatbots and Agents", "Predictive Analytics", "Natural Language Processing"],
    href: "/ai-workflow",
  },
  {
    icon: Search,
    category: "SEO",
    title: "SEO Services Toronto",
    description:
      "Dominate search rankings with AI powered SEO, local GEO targeting, and Answer Engine Optimization (AEO). We use machine learning for keyword discovery, optimize your content for Google AI Overviews, ChatGPT, and Perplexity, and implement local SEO strategies to maximize qualified organic traffic.",
    metrics: ["AI Powered SEO Strategy", "Local SEO and GEO Targeting", "Answer Engine Optimization", "Voice Search and AI Overviews"],
    href: "/seo-management",
  },
];

export function SolutionsSection() {
  const shouldAnimate = useAnimations();

  return (
    <section id="solutions" className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, amount: 0.3 } : undefined}
          variants={shouldAnimate ? containerVariants : undefined}
        >
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-4 inline-block rounded-full bg-violet-50 px-4 py-1.5 text-sm text-violet-700"
          >
            Solutions
          </motion.div>

          <motion.h2
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-6 text-slate-900"
          >
            What We Build for Toronto Businesses
          </motion.h2>

          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-16 text-lg text-slate-600"
          >
            From custom web applications and mobile apps to AI automation and SEO, we deliver 
            complete solutions tailored to your business goals.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-violet-300 hover:shadow-xl hover:-translate-y-2 lg:p-8"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white lg:h-14 lg:w-14">
                    <Icon className="h-6 w-6 lg:h-7 lg:w-7" />
                  </div>
                  <span className="rounded-full bg-violet-50 px-3 py-1 text-xs text-violet-700">
                    {solution.category}
                  </span>
                </div>

                <h3 className="mb-3 text-xl text-slate-900 lg:text-2xl">{solution.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-600 lg:text-[15px]">
                  {solution.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {solution.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 lg:px-3"
                    >
                      {metric}
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    variant="ghost"
                    className="group/btn gap-2 p-0 text-violet-600 hover:bg-transparent hover:text-violet-700 transition-colors duration-200"
                    asChild
                  >
                    <Link href={solution.href}>
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Quotation CTA */}
        <motion.div
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, amount: 0.3 } : undefined}
          variants={shouldAnimate ? itemVariants : undefined}
          className="mt-12 text-center"
        >
          <Button size="lg" className="bg-violet-600 hover:bg-violet-700 hover:opacity-90 transition-all duration-200" asChild>
            <Link href="/contact">Get a Custom Quotation</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
