'use client';
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { 
  Database, 
  Zap, 
  Shield, 
  Code2, 
  Globe, 
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  Lock
} from "lucide-react";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";

const platformFeatures = [
  {
    icon: Database,
    title: "Enterprise Data Engine",
    description:
      "Securely integrate your proprietary data with foundation models. Support for structured and unstructured data with automatic versioning and lineage tracking.",
    features: [
      "Multi-source data connectors",
      "Automated data pipelines",
      "Real-time synchronization",
      "Data governance & compliance"
    ]
  },
  {
    icon: Zap,
    title: "Real-time Inference",
    description:
      "Deploy models with industry-leading performance. Optimized inference engine with automatic scaling and load balancing.",
    features: [
      "Sub-50ms latency",
      "Auto-scaling infrastructure",
      "Global edge deployment",
      "99.99% uptime SLA"
    ]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified infrastructure with comprehensive security controls and compliance certifications.",
    features: [
      "End-to-end encryption",
      "Role-based access control",
      "Audit logging",
      "Compliance reporting"
    ]
  },
  {
    icon: Code2,
    title: "Fine-tuning Pipeline",
    description:
      "Customize foundation models with your data using advanced training techniques and RLHF workflows.",
    features: [
      "Custom model training",
      "RLHF & feedback loops",
      "Model versioning",
      "A/B testing framework"
    ]
  },
  {
    icon: Globe,
    title: "Multi-region Deployment",
    description:
      "Deploy models globally with automatic failover, geographic redundancy, and edge caching for optimal performance.",
    features: [
      "Global CDN integration",
      "Automatic failover",
      "Regional compliance",
      "Low-latency routing"
    ]
  },
  {
    icon: BarChart3,
    title: "Observability & Analytics",
    description:
      "Monitor model performance, costs, and usage with comprehensive dashboards, alerts, and reporting.",
    features: [
      "Real-time monitoring",
      "Cost analytics",
      "Performance metrics",
      "Custom alerts"
    ]
  },
];

const technicalSpecs = [
  {
    icon: Clock,
    metric: "< 50ms",
    label: "Average Latency",
    description: "Industry-leading inference speed"
  },
  {
    icon: Cpu,
    metric: "1M+",
    label: "Requests/Second",
    description: "Handle massive scale effortlessly"
  },
  {
    icon: Lock,
    metric: "SOC 2",
    label: "Type II Certified",
    description: "Enterprise-grade security"
  },
  {
    icon: Globe,
    metric: "15+",
    label: "Global Regions",
    description: "Deploy anywhere in the world"
  },
];

export function Platform() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta would go in document head */}
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
              className="mb-6 inline-block rounded-full bg-violet-50 px-4 py-1.5 text-sm text-violet-700"
            >
              Platform Overview
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-slate-900"
            >
              The complete AI infrastructure
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                for modern enterprises
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-slate-600"
            >
              Everything you need to build, deploy, and scale production AI applications. 
              From data integration to model deployment, we handle the infrastructure so you can focus on innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="gap-2 bg-violet-600 px-8 hover:bg-violet-700">
                  Start building
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="px-8">
                  View documentation
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {technicalSpecs.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="text-center"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2 text-3xl text-slate-900">{spec.metric}</div>
                  <div className="mb-1 text-sm text-slate-900">{spec.label}</div>
                  <div className="text-sm text-slate-600">{spec.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-slate-900"
            >
              Comprehensive platform capabilities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-slate-600"
            >
              Built for developers, trusted by enterprises. Our platform provides everything you need to succeed with AI.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl text-slate-900">{feature.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item) => (
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
              Ready to build with CoderDesign?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-lg text-slate-400"
            >
              Join thousands of developers building the future of AI. Get started in minutes.
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
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-700 bg-transparent px-8 text-white hover:bg-slate-800 hover:text-white"
                >
                  Talk to sales
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
