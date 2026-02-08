"use client";
import { motion } from "framer-motion";
import { Code2, Smartphone, Brain, Search, Cloud, Shield } from "lucide-react";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants } from "../animations/variants";

const features = [
  {
    icon: Code2,
    title: "Web Application Development",
    description:
      "We build custom web applications from responsive frontends to scalable backend APIs. Our Toronto developers work with React, Next.js, Node.js, Python, and Django to deliver fast, reliable web apps with automated testing, CI/CD pipelines, and production grade code that ships quickly.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native iOS and Android apps built with Swift and Kotlin, plus cross platform solutions using React Native and Flutter. We handle UI/UX design, prototyping, App Store submission, push notifications, in-app purchases, and post launch analytics.",
  },
  {
    icon: Brain,
    title: "AI Automation and Chatbots",
    description:
      "Custom AI chatbots, workflow automation, computer vision, and predictive analytics pipelines. We integrate OpenAI, Claude, LangChain, and TensorFlow into production systems to automate repetitive tasks, extract insights from data, and build systems that learn over time.",
  },
  {
    icon: Search,
    title: "SEO Services Toronto",
    description:
      "AI powered search engine optimization with local GEO targeting and Answer Engine Optimization (AEO). We use machine learning for keyword discovery, automate on-page optimization, build high authority backlinks, and optimize for Google AI Overviews and voice search.",
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
            Software Development Services in Toronto
          </motion.h2>
          
          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-16"
          >
            Full stack web development, mobile apps, AI automation, and SEO services to help 
            your business grow in Toronto and across Canada.
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
