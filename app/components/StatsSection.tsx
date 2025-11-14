"use client";
import { motion } from "framer-motion";
import { Code2, Search, Brain, TrendingUp } from "lucide-react";
import { useAnimations } from "../hooks/useAnimations";

const stats = [
  {
    icon: Code2,
    metric: "15+",
    label: "Years Combined Experience",
    description: "Expert full-stack developers"
  },
  {
    icon: Brain,
    metric: "100+",
    label: "AI Models Deployed",
    description: "Machine learning in production"
  },
  {
    icon: Search,
    metric: "300%",
    label: "Average Traffic Increase",
    description: "Through SEO optimization"
  },
  {
    icon: TrendingUp,
    metric: "99.9%",
    label: "Uptime Guaranteed",
    description: "Enterprise-grade reliability"
  },
];

export function StatsSection() {
  const shouldAnimate = useAnimations();

  return (
    <section className="border-b border-slate-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 text-center">
          <motion.h2
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldAnimate ? { once: true, amount: 0.3 } : undefined}
            className="mb-4 text-slate-900"
          >
            Proven Results Across All Services
          </motion.h2>
          <motion.p
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldAnimate ? { once: true, amount: 0.3 } : undefined}
            transition={shouldAnimate ? { delay: 0.1 } : undefined}
            className="mx-auto max-w-2xl text-lg text-slate-600"
          >
            From full-stack development to AI integration and SEO optimization—delivering excellence at scale
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                viewport={shouldAnimate ? { once: true, amount: 0.2 } : undefined}
                transition={shouldAnimate ? { delay: index * 0.1, duration: 0.5 } : undefined}
                whileHover={shouldAnimate ? { y: -5 } : undefined}
                className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg"
              >
                <motion.div 
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600"
                  whileHover={shouldAnimate ? { rotate: 360 } : undefined}
                  transition={shouldAnimate ? { duration: 0.6 } : undefined}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <div className="mb-2 text-4xl text-slate-900">{stat.metric}</div>
                <div className="mb-2 text-slate-900">{stat.label}</div>
                <div className="text-sm text-slate-600">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
