"use client";
import { motion } from "framer-motion";
import { Building2, ShoppingBag, Briefcase, Landmark, Code2, HeartPulse, ArrowRight } from "lucide-react";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants } from "../animations/variants";
import Link from "next/link";

const industries = [
  {
    icon: Building2,
    title: "SaaS & Technology Startups",
    blogTitle: "How We Helped Deel Build Scalable Payroll Microservices for 120+ Countries",
    description: "Backend architecture, microservices, and API development for Y Combinator startups scaling globally.",
    image: "/images/projects/saas-platform.jpg",
    href: "/blog/saas-technology-startups-toronto-development",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce & Retail",
    blogTitle: "How We Helped Gymshark Scale Their Shopify Plus Store to $500M in Annual Revenue",
    description: "Shopify SEO, headless commerce, and conversion optimization for DTC fitness brands scaling globally.",
    image: "/images/projects/gymshark-ecommerce.jpg",
    href: "/blog/ecommerce-retail-solutions-toronto",
  },
  {
    icon: Briefcase,
    title: "Enterprise",
    blogTitle: "How We Partnered with TCS to Deliver a Cloud Migration Platform for Canadian Banks",
    description: "Enterprise outsourcing, cloud architecture, and AI integration for Tata Consultancy Services client projects.",
    image: "/images/projects/tcs-real.jpg",
    href: "/blog/professional-services-software-toronto",
  },
  {
    icon: HeartPulse,
    title: "Healthcare & Wellness",
    blogTitle: "How We Helped Sunnybrook Build a Patient Engagement Platform That Reduced No-Shows by 62%",
    description: "AI scheduling, Epic EMR integration, and telehealth apps for Canada's largest research hospital.",
    image: "/images/projects/healthcare-medical.jpg",
    href: "/blog/healthcare-wellness-software-toronto",
  },
  {
    icon: Landmark,
    title: "Government & Compliance",
    blogTitle: "How We Built TrustShield's Secure Compliance Dashboard That Automated 94% of Audit Workflows",
    description: "SOC 2 automation pipelines, real-time compliance monitoring, and encrypted audit trails for financial institutions.",
    image: "/images/projects/government-building.jpg",
    href: "/blog/government-enterprise-software-toronto",
  },
  {
    icon: Code2,
    title: "Professional Services",
    blogTitle: "How We Built Tailor Brands' AI Voice Calling System That Handles 73% of Calls Autonomously",
    description: "AI voice agents, proactive outbound calls, and merchandise fulfillment automation for 45M+ users.",
    image: "/images/projects/tailor-brands-ai.jpg",
    href: "/blog/manufacturing-logistics-software-toronto",
  },
];

export function WhoWeWorkWith() {
  const shouldAnimate = useAnimations();

  return (
    <section id="industries" className="bg-white py-24 lg:py-32">
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
            Industries We Serve
          </motion.div>

          <motion.h2
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-6 text-slate-900"
          >
            Who We Work With
          </motion.h2>

          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-16 text-lg text-slate-600"
          >
            From AI startups to enterprise — we deliver full-stack platforms, mobile apps, AI automation, and SEO for SaaS, e-commerce, healthcare, government, and manufacturing clients across Toronto and globally.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link
                key={industry.title}
                href={industry.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-violet-300 hover:shadow-lg"
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[17px] font-bold leading-tight text-slate-900">{industry.title}</h3>
                  </div>
                  <p className="mb-2 text-sm font-medium leading-snug text-slate-700">{industry.blogTitle}</p>
                  <p className="mb-4 text-[15px] leading-relaxed text-slate-500">{industry.description}</p>
                  <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-violet-600 transition-colors duration-200 group-hover:text-violet-700">
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
