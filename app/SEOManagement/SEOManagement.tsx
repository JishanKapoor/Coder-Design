'use client';
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { 
  Search, 
  TrendingUp, 
  Target, 
  FileText, 
  BarChart3, 
  Link2,
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  Users,
  Award
} from "lucide-react";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";

const services = [
  {
    icon: Search,
    title: "Keyword Research & Strategy",
    description:
      "Identify high-value keywords that drive qualified traffic. We analyze search intent and competition to build a winning SEO strategy.",
    highlights: [
      "Competitor keyword analysis",
      "Search intent mapping",
      "Long-tail keyword opportunities",
      "Keyword difficulty assessment"
    ]
  },
  {
    icon: FileText,
    title: "On-Page Optimization",
    description:
      "Optimize every element of your pages for search engines. From meta tags to content structure, we fine-tune for maximum visibility.",
    highlights: [
      "Title & meta description optimization",
      "Header tag structure",
      "Content optimization",
      "Internal linking strategy"
    ]
  },
  {
    icon: Link2,
    title: "Link Building",
    description:
      "Build high-quality backlinks that boost your domain authority. We focus on white-hat tactics that deliver lasting results.",
    highlights: [
      "Guest posting campaigns",
      "Digital PR outreach",
      "Broken link building",
      "Authority link acquisition"
    ]
  },
  {
    icon: Globe,
    title: "Technical SEO",
    description:
      "Fix technical issues that hold your site back. We optimize site speed, mobile experience, and crawlability.",
    highlights: [
      "Site speed optimization",
      "Mobile-first indexing",
      "Structured data markup",
      "XML sitemap optimization"
    ]
  },
  {
    icon: FileText,
    title: "Content Strategy",
    description:
      "Create content that ranks and converts. We develop comprehensive content plans aligned with your business goals.",
    highlights: [
      "Content gap analysis",
      "Editorial calendar planning",
      "SEO-optimized copywriting",
      "Content refresh strategies"
    ]
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Track your progress with detailed analytics and reporting. We provide actionable insights to continuously improve performance.",
    highlights: [
      "Google Analytics setup",
      "Rank tracking",
      "Traffic & conversion analysis",
      "Monthly performance reports"
    ]
  },
];

const results = [
  {
    icon: TrendingUp,
    metric: "250%",
    label: "Average Traffic Increase",
    description: "Within 6 months"
  },
  {
    icon: Target,
    metric: "85%",
    label: "First Page Rankings",
    description: "For target keywords"
  },
  {
    icon: Users,
    metric: "3x",
    label: "Lead Generation",
    description: "From organic search"
  },
  {
    icon: Award,
    metric: "95%",
    label: "Client Retention",
    description: "Long-term partnerships"
  },
];

export function SEOManagement() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm text-violet-700"
            >
              <Search className="h-4 w-4" />
              SEO Management Services
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-slate-900"
            >
              Dominate search rankings
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                drive organic growth
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-slate-600"
            >
              Data-driven SEO strategies that increase visibility, drive qualified traffic, and convert visitors into customers. 
              We handle the technical details while you focus on growing your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="gap-2 bg-violet-600 px-8 hover:bg-violet-700">
                  Get free SEO audit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="px-8">
                  View case studies
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-slate-900"
            >
              Proven results that matter
            </motion.h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {results.map((result, index) => {
              const Icon = result.icon;
              return (
                <div
                  key={result.label}
                  className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2 text-4xl text-slate-900">{result.metric}</div>
                  <div className="mb-1 text-slate-900">{result.label}</div>
                  <div className="text-sm text-slate-600">{result.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-slate-900"
            >
              Comprehensive SEO services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-slate-600"
            >
              End-to-end SEO management to help your business rank higher and grow faster
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl text-slate-900">{service.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-violet-600 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-white"
            >
              Ready to rank higher on Google?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-lg text-slate-400"
            >
              Get a free SEO audit and discover opportunities to improve your search rankings.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="gap-2 bg-violet-600 px-8 hover:bg-violet-700">
                  Get free audit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-700 bg-transparent px-8 text-white hover:bg-slate-800 hover:text-white"
                >
                  Talk to an expert
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
