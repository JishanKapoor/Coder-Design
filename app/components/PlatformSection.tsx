"use client";
import { motion } from "framer-motion";
import { Code2, Smartphone, Brain, Search, Cloud, Shield } from "lucide-react";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants } from "../animations/variants";

const features = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    description:
      "End-to-end development using React, Next.js, Node.js, Python, and Django. Building scalable, performant applications.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native iOS and Android apps, plus cross-platform solutions with React Native and Flutter for maximum reach.",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Custom AI models, chatbots, computer vision, and predictive analytics to automate and enhance your business.",
  },
  {
    icon: Search,
    title: "AI SEO & AEO Services",
    description:
      "AI-powered SEO with GEO targeting and Answer Engine Optimization (AEO) to dominate search rankings and increase organic traffic.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "AWS, Google Cloud, and Azure deployment with auto-scaling, monitoring, and enterprise-grade security.",
  },
  {
    icon: Shield,
    title: "DevOps & Security",
    description:
      "CI/CD pipelines, automated testing, security audits, and compliance management for peace of mind.",
  },
];

export function PlatformSection() {
  const shouldAnimate = useAnimations();

  return (
    <section id="platform" className="bg-white py-24 lg:py-32">
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
            Our Services
          </motion.div>
          
          <motion.h2
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-6 text-slate-900"
          >
            Everything You Need to Succeed Online
          </motion.h2>
          
          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-16"
          >
            Comprehensive development, AI integration, and marketing solutions to scale your business 
            in New York's competitive market and beyond.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-violet-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-colors duration-200 group-hover:bg-violet-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl text-slate-900">{feature.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
