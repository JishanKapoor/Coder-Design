'use client';
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { 
  Server, 
  Database, 
  Shield, 
  Zap,
  Code2,
  Cloud,
  CheckCircle2,
  Calendar,
  Lock,
  Workflow,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

export function BackendDevelopmentDetail() {
  const [showCalendar, setShowCalendar] = useState(false);

  const services = [
    {
      icon: Code2,
      title: "API Development & Integration",
      description: "Build robust RESTful and GraphQL APIs that power your applications. We design scalable endpoints with proper authentication, rate limiting, and comprehensive documentation.",
      features: ["RESTful APIs", "GraphQL", "API Documentation", "Rate Limiting"]
    },
    {
      icon: Workflow,
      title: "Microservices Architecture",
      description: "Transform monolithic applications into scalable microservices. We design distributed systems that improve fault isolation, enable independent deployment, and scale efficiently.",
      features: ["Service Mesh", "API Gateway", "Event-Driven Architecture", "Service Discovery"]
    },
    {
      icon: Database,
      title: "Database Design & Optimization",
      description: "Design efficient database schemas and optimize queries for maximum performance. We work with PostgreSQL, MySQL, MongoDB, and Redis for various use cases.",
      features: ["Schema Design", "Query Optimization", "Database Indexing", "Data Migration"]
    },
    {
      icon: Lock,
      title: "Authentication & Authorization",
      description: "Implement secure authentication systems using OAuth 2.0, JWT, and session management. We ensure your users' data is protected with industry-standard security practices.",
      features: ["OAuth 2.0", "JWT Tokens", "Role-Based Access", "Multi-Factor Auth"]
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Deploy and manage backend services on AWS, Google Cloud, or Azure. We set up auto-scaling, load balancing, and disaster recovery to ensure high availability.",
      features: ["AWS/GCP/Azure", "Auto-Scaling", "Load Balancing", "Disaster Recovery"]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Protect your backend with comprehensive security measures including encryption, input validation, and compliance with GDPR, SOC 2, and HIPAA standards.",
      features: ["Data Encryption", "Input Validation", "Security Audits", "Compliance"]
    }
  ];

  const techStack = [
    { name: "Python", category: "Language" },
    { name: "Node.js", category: "Runtime" },
    { name: "Django", category: "Framework" },
    { name: "Express", category: "Framework" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Redis", category: "Cache" },
    { name: "Docker", category: "DevOps" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white pb-20 pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-sm text-indigo-700">
                Backend Development
              </div>
              <h1 className="mb-6 text-slate-900">
                Powerful Backend Systems That Scale
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                We specialize in backend systems that power automation, analytics, and large-scale operations. Our expertise includes API development, microservices architecture, database optimization, and cloud-native solutions built with Python, Node.js, and modern frameworks.
              </p>
              
              <div className="mb-8 flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-violet-600 hover:bg-violet-700"
                  onClick={() => setShowCalendar(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 shadow-2xl">
                <div className="space-y-4">
                  {[
                    { icon: Server, label: "API Endpoints", value: "1M+ req/day" },
                    { icon: Database, label: "Database Queries", value: "<10ms" },
                    { icon: Zap, label: "Uptime", value: "99.9%" }
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="flex items-center justify-between rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-white" />
                          <span className="text-sm text-white/90">{stat.label}</span>
                        </div>
                        <span className="text-white">{stat.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendar Modal */}
      {showCalendar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowCalendar(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full p-2 hover:bg-slate-100"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="mb-4 sm:mb-6 pr-10 text-xl sm:text-2xl text-slate-900">Schedule a Consultation</h3>
            
            <div className="h-[500px] sm:h-[600px] overflow-hidden rounded-lg">
              <iframe
                src="https://calendly.com/kapoorjishan2/coder-design"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a meeting"
              ></iframe>
            </div>
            
            {/* Removed demo calendar note */}
          </motion.div>
        </motion.div>
      )}

      {/* Services Section */}
      <section id="services" className="bg-white py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-slate-900"
            >
              Our Backend Development Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-3xl text-lg text-slate-600"
            >
              Comprehensive backend solutions covering every aspect of server-side development
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-indigo-300 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mb-3 text-xl text-slate-900">{service.title}</h3>
                  <p className="mb-4 text-slate-600">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="mb-6 text-slate-900">Why Robust Backend Architecture Matters</h2>
              <p className="mb-6 text-lg text-slate-600">
                A well-architected backend is the foundation of any successful application. It ensures your application can scale seamlessly, handle millions of requests, maintain data integrity, and provide a secure environment for your users and business operations.
              </p>
              <p className="text-slate-600">
                Our backend solutions are built with scalability, security, and performance in mind, ensuring your application can grow with your business needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-3"
            >
              {[
                "Handle millions of API requests per day",
                "Auto-scale based on traffic demands",
                "99.9% uptime with load balancing",
                "Enterprise-grade security and encryption",
                "Real-time data synchronization",
                "Comprehensive API documentation",
                "Performance monitoring and analytics",
                "Disaster recovery and backup systems"
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-lg border border-indigo-200 bg-white p-4 text-sm text-slate-700"
                >
                  {benefit}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-4 text-slate-900"
            >
              Our Backend Development Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-3xl text-lg text-slate-600"
            >
              A systematic approach to building scalable, secure backend systems
            </motion.p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {[
              { 
                step: "01", 
                title: "Architecture & Planning", 
                description: "We design scalable system architecture that meets your current needs and future growth.",
                details: [
                  "Requirements gathering and analysis",
                  "Database schema design and optimization",
                  "API architecture and endpoint planning",
                  "Technology stack selection",
                  "Security and compliance planning"
                ]
              },
              { 
                step: "02", 
                title: "Development & Implementation", 
                description: "Our team builds robust backend systems following industry best practices and coding standards.",
                details: [
                  "API development (REST/GraphQL)",
                  "Database implementation and migrations",
                  "Authentication and authorization",
                  "Third-party integrations",
                  "Code reviews and quality assurance"
                ]
              },
              { 
                step: "03", 
                title: "Testing & Optimization", 
                description: "Comprehensive testing ensures your backend performs flawlessly under any conditions.",
                details: [
                  "Unit and integration testing",
                  "Load and stress testing",
                  "Security vulnerability scanning",
                  "Performance optimization",
                  "API endpoint testing"
                ]
              },
              { 
                step: "04", 
                title: "Deployment & Monitoring", 
                description: "We deploy to production with zero downtime and continuous monitoring for optimal performance.",
                details: [
                  "CI/CD pipeline setup",
                  "Cloud infrastructure deployment",
                  "Real-time monitoring and alerts",
                  "Performance analytics",
                  "Ongoing maintenance and updates"
                ]
              },
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-indigo-50/30 p-8 transition-all hover:border-indigo-300 hover:shadow-xl"
              >
                <div className="absolute right-4 top-4 text-7xl font-bold text-indigo-600/5">
                  {phase.step}
                </div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-700 text-2xl text-white">
                    {phase.step}
                  </div>
                  <h3 className="mb-3 text-2xl text-slate-900">{phase.title}</h3>
                  <p className="mb-6 text-slate-600">{phase.description}</p>
                  <ul className="space-y-2">
                    {phase.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-slate-900"
            >
              Common Questions
            </motion.h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What's the difference between monolithic and microservices architecture?</AccordionTrigger>
              <AccordionContent>
                Monolithic applications have all components in a single codebase, while microservices split functionality into independent services. We help you choose the right approach based on your scale, team size, and requirements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do you ensure API security?</AccordionTrigger>
              <AccordionContent>
                We implement multiple security layers including OAuth 2.0/JWT authentication, rate limiting, input validation, encryption (TLS/SSL), and regular security audits to protect your APIs from common vulnerabilities.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can you optimize our existing backend performance?</AccordionTrigger>
              <AccordionContent>
                Yes. We conduct performance audits, identify bottlenecks in database queries, API endpoints, and infrastructure, then implement caching strategies, query optimization, and scaling solutions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What databases do you work with?</AccordionTrigger>
              <AccordionContent>
                We work with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases. We help you choose the right database based on your data model, scalability needs, and query patterns.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="mb-6 text-white">
              Ready to Build Scalable Backend Systems?
            </h2>
            <p className="mb-8 text-lg text-indigo-100">
              Let's discuss your backend requirements and architect a solution that scales with your business.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setShowCalendar(true)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10" asChild>
                <a href="#/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
