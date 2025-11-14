'use client';
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import Link from "next/link";
import { Target, Users, Award, Zap, Code2, Heart, TrendingUp, Shield } from "lucide-react";

import { useMemo } from "react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Client-Focused",
      description: "We put your success first. Every solution we build is tailored to your specific business goals and challenges."
    },
    {
      icon: Zap,
      title: "Innovation-Driven",
      description: "We stay ahead of the curve, leveraging the latest technologies and best practices to deliver cutting-edge solutions."
    },
    {
      icon: Shield,
      title: "Quality & Security",
      description: "We never compromise on code quality or security. Every project undergoes rigorous testing and security audits."
    },
    {
      icon: Heart,
      title: "Transparent Communication",
      description: "Clear communication and collaboration are at the heart of everything we do. You're always in the loop."
    }
  ];

  const stats = [
    { value: "100+", label: "Projects Delivered" },
    { value: "50+", label: "Happy Clients" },
    { value: "10+", label: "Team Members" },
    { value: "5+", label: "Years Experience" }
  ];

  const team = [
    {
      name: "Engineering Team",
      role: "Full-Stack & Backend Development",
      description: "Our engineering team consists of full-stack developers, backend specialists, and cloud architects with deep expertise in Python, Node.js, React, and modern frameworks.",
      image: "https://images.unsplash.com/photo-1752170080635-db168448f85d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB0ZWFtfGVufDF8fHx8MTc2MTc5MTA3OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "AI/ML Team",
      role: "Artificial Intelligence & Machine Learning",
      description: "Data scientists and ML engineers building intelligent automation solutions, chatbots, voice assistants, and predictive analytics using TensorFlow, PyTorch, and cutting-edge AI technologies.",
      image: "https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTc5MTA4MHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "SEO & Growth Team",
      role: "AI SEO & AEO Specialists",
      description: "SEO experts specializing in AI-powered optimization, GEO targeting, and Answer Engine Optimization (AEO) to drive organic growth and maximize search visibility.",
      image: "https://images.unsplash.com/photo-1666698809123-44e998e93f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwdGVhbSUyMG9mZmljZXxlbnwxfHx8fDE3NjE3OTg2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Leadership Team",
      role: "Strategic Direction & Management",
      description: "Experienced leaders guiding our vision, ensuring quality delivery, and maintaining strong client relationships across all projects and services.",
      image: "https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlcnNoaXAlMjB0ZWFtJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MTc5OTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  // Call useCountUp hooks at the top level

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={useScrollFadeIn<HTMLElement>()} className="bg-gradient-to-b from-violet-50 to-white pb-20 pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div
            className="text-center"
          >
            <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm text-violet-700">
              About Us
            </div>
            <h1 className="mb-6 text-slate-900">
              Building the Future, One Line of Code at a Time
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
              CoderDesign is a development agency specializing in backend development, custom software, AI/ML, and AI-powered SEO services. Our team brings together experienced professionals who help businesses transform their ideas into scalable, high-performance digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={useScrollFadeIn<HTMLElement>()} className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  ref={useScrollFadeIn<HTMLDivElement>()}
                  className="text-center"
                >
                  <div className="mb-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-5xl text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={useScrollFadeIn<HTMLElement>()} className="bg-slate-50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div
              ref={useScrollFadeIn<HTMLDivElement>()}
            >
              <h2 className="mb-6 text-slate-900">Our Mission</h2>
              <p className="mb-4 text-lg text-slate-600">
                We exist to empower businesses with technology that drives real results. Whether you're a startup looking to build your MVP or an enterprise scaling your infrastructure, we provide the expertise and dedication to make it happen.
              </p>
              <p className="text-lg text-slate-600">
                Our team combines technical excellence with a deep understanding of business needs. We don't just write code – we craft solutions that solve problems, improve efficiency, and create value.
              </p>
            </div>

            <div
              ref={useScrollFadeIn<HTMLDivElement>()}
              className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-2xl"
            >
              <Code2 className="mb-6 h-12 w-12" />
              <h3 className="mb-4 text-2xl">Why Choose CoderDesign?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-violet-200">✓</span>
                  <span>Proven track record of delivering complex projects on time and within budget</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-violet-200">✓</span>
                  <span>Deep expertise across modern tech stacks and industry best practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-violet-200">✓</span>
                  <span>Transparent pricing and clear communication throughout the project</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-violet-200">✓</span>
                  <span>Ongoing support and maintenance to ensure long-term success</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={useScrollFadeIn<HTMLElement>()} className="bg-white py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2
              ref={useScrollFadeIn<HTMLHeadingElement>()}
              className="mb-4 text-slate-900"
            >
              Our Core Values
            </h2>
            <p
              ref={useScrollFadeIn<HTMLParagraphElement>()}
              className="mx-auto max-w-3xl text-lg text-slate-600"
            >
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  ref={useScrollFadeIn<HTMLDivElement>()}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-center"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">
                    <Icon className="h-7 w-7 text-violet-600" />
                  </div>
                  <h3 className="mb-3 text-xl text-slate-900">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={useScrollFadeIn<HTMLElement>()} className="bg-slate-50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2
              ref={useScrollFadeIn<HTMLHeadingElement>()}
              className="mb-4 text-slate-900"
            >
              Meet Our Teams
            </h2>
            <p
              ref={useScrollFadeIn<HTMLParagraphElement>()}
              className="mx-auto max-w-3xl text-lg text-slate-600"
            >
              Talented professionals dedicated to your success
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div
                key={member.name}
                ref={useScrollFadeIn<HTMLDivElement>()}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback 
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl text-slate-900">{member.name}</h3>
                  <p className="mb-3 text-sm text-violet-600">{member.role}</p>
                  <p className="text-sm text-slate-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={useScrollFadeIn<HTMLElement>()} className="bg-gradient-to-br from-violet-600 to-indigo-700 py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div
            ref={useScrollFadeIn<HTMLDivElement>()}
            className="text-center"
          >
            <h2 className="mb-6 text-white">
              Ready to Work Together?
            </h2>
            <p className="mb-8 text-lg text-violet-100">
              Let's discuss how we can help bring your project to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm text-violet-600 transition-colors hover:bg-slate-100"
              >
                Get in Touch
              </Link>
              <a
                href="tel:+14372392448"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 bg-white/10 px-8 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
