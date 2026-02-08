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
      description: "Modern, responsive user interfaces built with React, Next.js, and TypeScript. We create fast, accessible web applications with server side rendering (SSR), static site generation (SSG), and optimistic UI patterns that deliver great user experiences across all devices and screen sizes.",
      features: ["React and Next.js", "TypeScript and SSR/SSG", "Responsive and Accessible Design", "Performance Optimization and Core Web Vitals"]
    },
    {
      icon: Database,
      title: "Backend Architecture",
      description: "Scalable server side systems using Python, Django, Node.js, and Express. We design RESTful and GraphQL APIs with proper authentication, rate limiting, caching layers, and database optimization built to handle thousands of concurrent requests while maintaining sub 100ms response times.",
      features: ["RESTful and GraphQL APIs", "Python/Django and Node.js", "Database Design and Query Optimization", "Authentication, Authorization, and Security"]
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Cloud native architectures on AWS, Google Cloud, and Azure designed for high availability and cost efficiency. We implement infrastructure as code with Terraform, auto scaling groups, container orchestration with Docker and Kubernetes, and fully automated CI/CD pipelines for seamless deployments.",
      features: ["AWS, GCP, and Azure", "Docker and Kubernetes", "Terraform and Infrastructure as Code", "CI/CD Pipelines and GitOps"]
    },
    {
      icon: Shield,
      title: "Security and Compliance",
      description: "Enterprise grade security measures including AES 256 encryption at rest and TLS 1.3 in transit, multi factor authentication, RBAC, and compliance with GDPR, SOC 2, PIPEDA, and HIPAA standards. We conduct regular penetration testing and automated vulnerability scanning.",
      features: ["End to End Encryption", "OAuth 2.0, JWT, and MFA", "GDPR, SOC 2, and PIPEDA Compliance", "Penetration Testing and Security Audits"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "We obsess over speed. From code splitting and lazy loading to Redis caching, CDN integration, database indexing, and query optimization, we ensure your application scores 90+ on Google Lighthouse and meets all Core Web Vitals thresholds for superior SEO performance and user experience.",
      features: ["Core Web Vitals Optimization", "Redis and CDN Caching Strategies", "Code Splitting and Lazy Loading", "Load Balancing and Horizontal Scaling"]
    },
    {
      icon: Code2,
      title: "Microservices and APIs",
      description: "Modular, maintainable architectures using microservices patterns with API gateways, service mesh, and event driven communication via Kafka or RabbitMQ. We build APIs that are well documented with OpenAPI/Swagger, versioned, and designed for backward compatibility and seamless third party integration.",
      features: ["Microservices and Domain Driven Design", "API Gateway and Service Mesh", "Event Driven Architecture (Kafka/RabbitMQ)", "OpenAPI Documentation and Versioning"]
    }
  ];

  const benefits = [
    "End to end ownership from concept to deployment",
    "Scalable architecture that grows with your business",
    "Modern tech stack with best in class tools",
    "Seamless integration with existing systems",
    "24/7 monitoring and support",
    "Automated testing and continuous deployment",
    "Security first development approach",
    "Optimized for performance and cost efficiency"
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
                Custom Web Application Development in Toronto
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                We build complete, production ready software systems from pixel perfect frontend 
                interfaces to high throughput backend APIs and auto scaling cloud infrastructure. 
                Our senior Toronto developers architect solutions using Python, Django, Node.js, 
                React, Next.js, PostgreSQL, AWS, and Google Cloud, following industry best practices 
                for test driven development, continuous integration, and zero downtime deployments. 
                Whether you are launching an MVP, migrating a legacy system, or scaling to millions 
                of users, we deliver clean, maintainable code that your business can depend on.
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
                  src="/images/hero-fullstack.jpg"
                  alt="Full-stack web development services in Toronto by CoderDesign"
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
              <h2 className="mb-6 text-slate-900">Why Custom Web Development Matters</h2>
              <p className="mb-6 text-lg text-slate-600">
                Custom web application development ensures seamless integration between every layer of 
                your product, from the user interface your customers interact with to the APIs and 
                business logic powering your features to the cloud infrastructure keeping it all 
                running. With a unified engineering team owning the entire stack, you eliminate 
                handoff delays between frontend and backend teams, reduce bugs caused by 
                miscommunication, and accelerate your time to market by up to 40%.
              </p>
              <p className="text-slate-600">
                Our Toronto based engineers bring end to end ownership to every project. That means 
                one team, one vision, and one accountable partner from initial architecture design 
                through production deployment, monitoring, and ongoing iteration. The result is a 
                cohesive, well tested product that performs under load and scales as your business grows.
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
                description: "We analyze your business requirements and create a comprehensive technical roadmap for success.",
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
                description: "We design scalable system architecture and intuitive user interfaces aligned with your goals.",
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
                description: "We deploy to production with zero downtime and provide ongoing monitoring and maintenance.",
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
              Web Development Questions Answered
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">What technologies do you use for web development?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Our Toronto team works with React, Next.js, Node.js, Python, Django, PostgreSQL, MongoDB, Redis, AWS, and Google Cloud. We pick the right stack based on your project goals, expected traffic, and long term scalability needs. No cookie cutter solutions here.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">How long does a web development project take?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                A straightforward web application usually takes 4 to 8 weeks from kickoff to launch. More complex enterprise platforms with custom integrations and multiple user roles can take 3 to 6 months. We give you a detailed timeline and milestones during the free consultation so there are no surprises.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Do you offer ongoing maintenance after launch?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Yes. Every project comes with a post launch support period, and we offer monthly maintenance packages that cover bug fixes, security patches, performance monitoring, and feature updates. Most of our clients in Toronto and the GTA stay with us well beyond the initial build.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Can you modernize or scale my existing application?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Absolutely. We do this regularly for businesses that have outgrown their current platform. Our process starts with a full code and infrastructure audit, then we tackle bottlenecks through database optimization, API refactoring, cloud migration, caching, and frontend modernization to React or Next.js.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">What does your development process look like?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                We follow agile methodology with two week sprints. You get regular demos, direct Slack access to your development team, and weekly status calls. Full transparency from day one so you always know exactly where your project stands and what is coming next.
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

