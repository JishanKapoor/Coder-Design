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
      title: "Client Focused",
      description: "Your success is our north star. Every architecture decision, every line of code, and every deployment is tailored to your specific business goals, timeline, and budget constraints."
    },
    {
      icon: Zap,
      title: "Innovation Driven",
      description: "We stay at the forefront of technology, continuously evaluating new frameworks, AI models, and engineering practices to ensure our clients benefit from the most effective tools available."
    },
    {
      icon: Shield,
      title: "Quality and Security",
      description: "We never cut corners. Every project includes automated testing, code reviews, security audits, and performance benchmarking to ensure production-grade reliability from day one."
    },
    {
      icon: Heart,
      title: "Transparent Communication",
      description: "Weekly demos, Slack channels, detailed sprint reports, and honest timelines. You always know exactly where your project stands and what is coming next."
    }
  ];

  const stats = [
    { value: "30+", label: "Projects Delivered" },
    { value: "7+", label: "Years Experience" },
    { value: "2023", label: "Founded" },
    { value: "Toronto", label: "Based In" }
  ];

  const team = [
    {
      name: "Founder & Lead Developer",
      role: "Full-Stack Development & AI",
      description: "7+ years of hands-on development experience across Python, Node.js, React, and modern AI frameworks. Leads all architecture decisions and client engagements.",
      image: "/images/team-engineering.jpg"
    },
    {
      name: "Contract Engineers",
      role: "Specialized Development Support",
      description: "Trusted contract developers brought in for specialized work — mobile app development, complex backend systems, and projects requiring additional bandwidth.",
      image: "/images/team-ai.jpg"
    },
    {
      name: "SEO & Content",
      role: "Search & Growth Strategy",
      description: "SEO specialists focused on AI-powered optimization, local search, Answer Engine Optimization (AEO), and content strategy for organic growth.",
      image: "/images/team-seo.jpg"
    },
    {
      name: "Design & UX",
      role: "UI/UX & Brand Design",
      description: "Contract designers handling user interface design, brand identity, and user experience work for client projects that require dedicated design expertise.",
      image: "/images/team-leadership.jpg"
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
              About CoderDesign: Software Development Company in Toronto
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
              CoderDesign is a Toronto-based software development studio founded in 2023. Our founder brings 7+ years 
              of hands-on development and AI experience from previous roles and freelance work. We are a small, 
              senior-only team — currently a solo founder with trusted contractors — specializing in custom web 
              applications, mobile app development, AI automation, and SEO services for startups and small-to-medium 
              businesses across Toronto and the GTA.
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
                We exist to give startups and small-to-medium businesses access to the same quality of 
                software engineering that larger companies take for granted. Whether you need your first 
                MVP built, an AI workflow automated, a mobile app launched, or your search rankings 
                improved, we bring senior-level expertise without the overhead of a large agency.
              </p>
              <p className="text-lg text-slate-600">
                Founded in 2023 in Toronto, CoderDesign started from 7+ years of the founder's 
                hands-on development and AI experience across previous roles and freelance work. We 
                keep our team small and senior-only — no junior developers learning on your project. 
                Every engagement is led directly by the founder, with trusted contract specialists 
                brought in when a project needs specific expertise.
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
                  <span>Founder-led — you work directly with the person building your product</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-violet-200">✓</span>
                  <span>Senior-only team — no junior developers learning on your project</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-violet-200">✓</span>
                  <span>Transparent pricing and honest timelines — no bait-and-switch</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-violet-200">✓</span>
                  <span>30+ projects delivered for startups and SMBs since 2023</span>
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
              Meet Our Team
            </h2>
            <p
              ref={useScrollFadeIn<HTMLParagraphElement>()}
              className="mx-auto max-w-3xl text-lg text-slate-600"
            >
              Small, senior-only — founder-led with trusted specialists
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
