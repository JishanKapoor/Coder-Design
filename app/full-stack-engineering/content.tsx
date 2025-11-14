'use client';
import { useState } from "react";
import { motion } from 'framer-motion';




import useScrollFadeIn from "../hooks/useScrollFadeIn";

import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

import { 
  Code2, 
  Cloud, 
  Database, 
  Zap, 
  Shield, 
  Layers,
  CheckCircle2,
  ArrowRight,
  Calendar
} from "lucide-react";


export default function FullStackEngineering() {
  const [showCalendar, setShowCalendar] = useState(false);

  const technologies = [
    { name: "Python", category: "Backend" },
    { name: "Django", category: "Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
  ];

  const services = [
    {
      icon: Layers,
      title: "Frontend Development",
      description: "Modern, responsive user interfaces built with React, Next.js, and TypeScript. We create fast, accessible, and beautiful web applications that deliver exceptional user experiences.",
      features: ["React & Next.js", "TypeScript", "Responsive Design", "Performance Optimization"]
    },
    {
      icon: Database,
      title: "Backend Architecture",
      description: "Scalable server-side applications using Python, Django, and Node.js. Our backend systems are built for reliability, security, and performance at scale.",
      features: ["RESTful APIs", "GraphQL", "Database Design", "Authentication & Security"]
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Cloud-native solutions on AWS, Google Cloud, and Azure. We design and implement infrastructure that scales automatically and remains cost-effective.",
      features: ["AWS & GCP", "Serverless Architecture", "Auto-scaling", "CI/CD Pipelines"]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security measures including encryption, authentication, and compliance with industry standards (GDPR, SOC 2, HIPAA).",
      features: ["Data Encryption", "OAuth & JWT", "GDPR Compliance", "Security Audits"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast applications through code optimization, caching strategies, CDN integration, and database query optimization.",
      features: ["Code Optimization", "Caching Strategies", "CDN Integration", "Load Balancing"]
    },
    {
      icon: Code2,
      title: "Microservices & APIs",
      description: "Modular, maintainable architectures using microservices patterns. We build robust APIs that enable seamless integration and scalability.",
      features: ["Microservices Design", "API Gateway", "Service Mesh", "Event-Driven Architecture"]
    }
  ];

  const benefits = [
    "End-to-end ownership from concept to deployment",
    "Scalable architecture that grows with your business",
    "Modern tech stack with best-in-class tools",
    "Seamless integration with existing systems",
    "24/7 monitoring and support",
    "Automated testing and continuous deployment",
    "Security-first development approach",
    "Optimized for performance and cost-efficiency"
  ];

  const caseStudies = [
    {
      title: "E-commerce Platform Transformation",
      client: "Retail Company",
      result: "300% increase in transaction speed",
      description: "Rebuilt legacy e-commerce platform with modern stack, reducing page load time from 8s to 1.2s and handling 10x traffic during peak sales."
    },
    {
      title: "SaaS Application Development",
      client: "Tech Startup",
      result: "Successfully scaled to 100K+ users",
      description: "Built multi-tenant SaaS platform from scratch with React, Node.js, and PostgreSQL, supporting real-time collaboration and advanced analytics."
    },
    {
      title: "Cloud Migration & Modernization",
      client: "Financial Services",
      result: "60% reduction in infrastructure costs",
      description: "Migrated monolithic application to microservices architecture on AWS, improving reliability and reducing operational expenses significantly."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white pb-20 pt-32" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm text-violet-700">
                Full-Stack Engineering
              </div>
              <h1 className="mb-6 text-slate-900">
                Full-Stack Development Backend, Frontend & Cloud
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                We build complete end-to-end solutions from frontend interfaces to backend APIs and cloud infrastructure. Our expertise spans the entire technology stack — delivering scalable, secure, and high-performance applications using Python, Django, Node.js, React, Next.js, AWS, and Google Cloud.
              </p>
              
              <div className="mb-8 flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 transition-shadow duration-150 hover:shadow-md"
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
                  Book a Consultation
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwc3RhY2slMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjE3OTE5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Full-Stack Development"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Integration */}
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
            
            {/* Calendly Embed */}
            <div className="h-[500px] sm:h-[600px] overflow-hidden rounded-lg">
              <iframe
                src="https://calendly.com/hello-coderdesign/30min"
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
        <section id="services" className="bg-white py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="mb-16 text-center">
            <h2 className="mb-4 text-slate-900">
              Comprehensive Full-Stack Services
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              We provide end-to-end engineering services covering every layer of modern software development
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100">
                    <Icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="mb-3 text-xl text-slate-900">{service.title}</h3>
                  <p className="mb-4 text-slate-600">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-violet-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-violet-50 py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-slate-900">Why Full-Stack Development Matters</h2>
              <p className="mb-6 text-lg text-slate-600">
                Full-stack development ensures seamless integration between frontend, backend, and cloud infrastructure. With a unified approach, we eliminate communication gaps, reduce development time, and deliver cohesive solutions that work flawlessly across the entire technology stack.
              </p>
              <p className="text-slate-600">
                Our team provides end-to-end ownership, from user interface design to scalable backend systems and cloud deployment, ensuring your application is built for success.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="rounded-lg border border-violet-200 bg-white p-4 text-sm text-slate-700 transition-shadow duration-150 hover:shadow-md"
                  >
                    {benefit}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-slate-900">
              Our Full-Stack Development Process
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              A proven methodology that delivers complete solutions from frontend to backend
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {[
              { 
                step: "01", 
                title: "Discovery & Planning", 
                description: "We analyze your business requirements and create a comprehensive technical roadmap.",
                details: [
                  "Business requirements and user story mapping",
                  "Technology stack selection and recommendation",
                  "Database schema and API design planning",
                  "Project timeline and milestone definition",
                  "Risk assessment and mitigation strategies"
                ]
              },
              { 
                step: "02", 
                title: "Design & Architecture", 
                description: "We design scalable system architecture and intuitive user interfaces.",
                details: [
                  "System architecture and infrastructure design",
                  "UI/UX wireframing and prototyping",
                  "Database modeling and optimization",
                  "API endpoint design and documentation",
                  "Security architecture planning"
                ]
              },
              { 
                step: "03", 
                title: "Development & Testing", 
                description: "Agile development with continuous integration, testing, and code quality assurance.",
                details: [
                  "Frontend development with React/Next.js",
                  "Backend API development with Python/Node.js",
                  "Database implementation and optimization",
                  "Automated testing (unit, integration, E2E)",
                  "Code reviews and quality assurance"
                ]
              },
              { 
                step: "04", 
                title: "Deployment & Support", 
                description: "We deploy to production and provide ongoing monitoring and maintenance.",
                details: [
                  "Cloud infrastructure setup (AWS/GCP/Azure)",
                  "CI/CD pipeline configuration",
                  "Production deployment with zero downtime",
                  "Performance monitoring and analytics",
                  "Ongoing maintenance and feature updates"
                ]
              },
            ].map((phase, index) => (
              (() => {
                const phaseRef = useScrollFadeIn<HTMLDivElement>();
                return (
                  <div
                    key={phase.step}
                    ref={phaseRef}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-violet-50/30 p-8 transition-all duration-200 hover:border-violet-300 hover:shadow-lg"
                  >
                <div className="absolute right-4 top-4 text-7xl font-bold text-violet-600/5">
                  {phase.step}
                </div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-700 text-2xl text-white">
                    {phase.step}
                  </div>
                  <h3 className="mb-3 text-2xl text-slate-900">{phase.title}</h3>
                  <p className="mb-6 text-slate-600">{phase.description}</p>
                  <ul className="space-y-2">
                    {phase.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                  </div>
                );
              })()
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What technologies do you specialize in?</AccordionTrigger>
              <AccordionContent>
                We specialize in modern tech stacks including Python/Django, Node.js/Express, React/Next.js, PostgreSQL, MongoDB, Redis, AWS, and Google Cloud. We choose the best technology based on your specific requirements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long does a typical project take?</AccordionTrigger>
              <AccordionContent>
                Project timelines vary based on complexity. A simple web application might take 4-8 weeks, while enterprise-grade platforms can take 3-6 months. We provide detailed timelines during the planning phase.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you provide ongoing maintenance and support?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer flexible maintenance and support packages to ensure your application remains secure, performant, and up-to-date. This includes bug fixes, security patches, and feature enhancements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can you scale my existing application?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We can audit your current infrastructure, identify bottlenecks, and implement optimizations to improve performance and scalability. This includes database optimization, caching strategies, and cloud architecture improvements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What is your development process?</AccordionTrigger>
              <AccordionContent>
                We follow an agile methodology with 2-week sprints, regular demos, and continuous client collaboration. You'll have full visibility into progress through project management tools and weekly status calls.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white">
              Let's Build Your Next Innovation Together
            </h2>
            <p className="mb-8 text-lg text-violet-100">
              Schedule a free consultation to discuss your project requirements and get expert guidance on the best technical approach.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setShowCalendar(true)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10" asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

