"use client";
import { motion } from "framer-motion";
import { Code2, Smartphone, Brain, Search, Cloud, Shield } from "lucide-react";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants } from "../animations/variants";

const features = [
  {
    icon: Code2,
    title: "Full Stack Website Development",
    description:
      "We build custom websites and full stack web applications from responsive frontends to scalable backend APIs. Our backend developers in Toronto work with React, Next.js, Node.js, Python, and Django to deliver fast, reliable website development solutions with automated testing, CI/CD pipelines, and production grade code that ships quickly.",
  },
  {
    icon: Smartphone,
    title: "Native & Cross-Platform Mobile Apps",
    description:
      "Native iOS and Android apps built with Swift and Kotlin, plus cross platform solutions using React Native and Flutter. We handle UI/UX design, prototyping, App Store and Google Play Store submission, push notifications, in-app purchases, and post launch analytics for custom mobile app development in Toronto.",
  },
  {
    icon: Brain,
    title: "AI Chatbots, Call Bots & Automation",
    description:
      "Custom AI chatbots for websites, AI call bots, voice bots, and intelligent workflow automation to automate customer support and reduce support tickets. As a generative AI agency in Toronto, we integrate OpenAI, Claude, LangChain, and TensorFlow into production systems to automate repetitive tasks, qualify leads with AI, and build intelligent agents that learn over time.",
  },
  {
    icon: Search,
    title: "AI SEO, GEO & LLM Optimization",
    description:
      "As a leading AI SEO agency in Toronto, we deliver AI-powered search engine optimization with local GEO targeting, generative engine optimization (GEO), and LLM optimization (LLMO) services. We use artificial intelligence to improve Google rankings, automate on-page optimization, build high authority backlinks, and optimize for Google AI Overviews and voice search.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure and DevOps",
    description:
      "Production grade cloud architecture on AWS, Google Cloud, and Azure with auto scaling, load balancing, container orchestration, and infrastructure as code using Terraform. We set up monitoring, alerting, disaster recovery, and cost optimization at any scale.",
  },
  {
    icon: Shield,
    title: "Security and Compliance",
    description:
      "Enterprise grade security at every layer including encrypted data at rest and in transit, OAuth 2.0 authentication, role based access control, and SOC 2, GDPR, and PIPEDA compliance. We run regular penetration testing, vulnerability assessments, and security audits.",
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
            Software Development & AI Services in Toronto
          </motion.h2>
          
          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-16"
          >
            Full stack website development, custom mobile app development, AI automation agency services, 
            and AI-powered SEO to help your business grow in Toronto and across Canada.
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
