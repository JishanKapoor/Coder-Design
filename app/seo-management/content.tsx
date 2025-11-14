'use client';
import Link from 'next/link';
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { 
  Search, 
  TrendingUp, 
  FileText, 
  Link2,
  BarChart3,
  Target,
  CheckCircle2,
  Calendar,
  Globe,
  Zap,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function SEOManagementDetail() {
  const [showCalendar, setShowCalendar] = useState(false);

  const services = [
    {
      icon: Target,
      title: "AI-Powered SEO Strategy",
      description: "Leverage artificial intelligence and machine learning to identify high-value keywords, predict search trends, and automate content optimization. Our AI tools analyze millions of data points to create winning SEO strategies.",
      features: ["AI Keyword Discovery", "Predictive Analytics", "Auto-optimization", "Smart Content Scoring"]
    },
    {
      icon: FileText,
      title: "On-Page SEO Optimization",
      description: "Optimize your website's content, meta tags, headers, and internal linking structure using AI-driven recommendations to improve search engine rankings and user experience.",
      features: ["AI Content Analysis", "Smart Meta Generation", "Automated Internal Linking", "Content Gap Analysis"]
    },
    {
      icon: Zap,
      title: "Technical SEO Audits",
      description: "Identify and fix technical issues with AI-powered site crawling and analysis. We audit site speed, mobile-friendliness, crawlability, and automatically detect structured data issues.",
      features: ["AI Site Crawling", "Automated Issue Detection", "Performance Optimization", "Smart Schema Markup"]
    },
    {
      icon: Link2,
      title: "AI Link Building & Outreach",
      description: "Use machine learning to identify high-quality link opportunities and automate outreach campaigns. Our AI analyzes domain authority, relevance, and engagement patterns for optimal results.",
      features: ["AI Prospect Discovery", "Automated Outreach", "Link Quality Scoring", "Competitor Backlink Analysis"]
    },
    {
      icon: FileText,
      title: "AI Content Strategy & Creation",
      description: "Generate SEO-optimized content using AI writing assistants and natural language processing. Create blog posts, landing pages, and resources that rank well and engage audiences with AI-powered insights.",
      features: ["AI Content Generation", "Smart Topic Clusters", "Automated Content Briefs", "NLP Optimization"]
    },
    {
      icon: BarChart3,
      title: "AI Analytics & Predictive Reporting",
      description: "Track SEO performance with AI-powered analytics that predict future trends, identify opportunities, and provide automated recommendations for continuous improvement.",
      features: ["Predictive Rankings", "AI Insights", "Automated Reporting", "Smart Recommendations"]
    }
  ];

  const tools = [
    "ChatGPT",
    "Jasper AI",
    "Surfer SEO",
    "Clearscope",
    "MarketMuse",
    "Frase",
    "SEMrush AI",
    "Google AI Tools"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white pb-20 pt-32" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm text-emerald-700">
                AI SEO, GEO & AEO
              </div>
              <h1 className="mb-6 text-slate-900">
                AI-Powered SEO to Dominate Search Rankings
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                Harness the power of artificial intelligence to revolutionize your SEO strategy. Our AI-driven approach combines machine learning, natural language processing, and predictive analytics to boost your organic visibility, drive qualified traffic, and maximize ROI with intelligent automation.
              </p>
              
              <div className="mb-8 flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-700"
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

            <div
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1712571664162-602064e30014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW8lMjBkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2MTc3MjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="SEO & Digital Marketing"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Modal */}
      {showCalendar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowCalendar(false)}
        >
          <div
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
            
            <h3 className="mb-4 sm:mb-6 pr-10 text-xl sm:text-2xl text-slate-900">Schedule Your Free SEO Audit</h3>
            
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
          </div>
        </div>
      )}

      {/* Services Section */}
      <section id="services" className="bg-white py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2
              className="mb-4 text-slate-900"
            >
              Comprehensive SEO Services
            </h2>
            <p
              className="mx-auto max-w-3xl text-lg text-slate-600"
            >
              Everything you need to dominate search engine rankings and drive organic growth
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 hover:border-emerald-300 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mb-3 text-xl text-slate-900">{service.title}</h3>
                  <p className="mb-4 text-slate-600">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
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
      <section className="bg-emerald-50 py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-slate-900">Why SEO is Essential for Business Growth</h2>
              <p className="mb-6 text-lg text-slate-600">
                Search Engine Optimization is one of the most cost-effective marketing strategies. Unlike paid advertising, SEO delivers sustainable long-term results, building organic traffic that compounds over time. With 93% of online experiences beginning with a search engine, ranking high on Google is crucial for visibility and growth.
              </p>
              <p className="text-slate-600">
                Our data-driven SEO strategies help businesses increase organic visibility, attract qualified leads, and achieve measurable ROI from search engine traffic.
              </p>
            </div>

            <div
              className="space-y-3"
            >
              {[
                "Increase organic traffic by 200-500% within 6-12 months",
                "Improve search rankings for high-value keywords",
                "Build brand authority and trust with customers",
                "Generate qualified leads with high purchase intent",
                "Achieve better ROI than paid advertising long-term",
                "Gain competitive advantage in your industry",
                "Improve user experience and site performance",
                "Track and measure results with detailed analytics"
              ].map((benefit, index) => (
                <div
                  key={benefit}
                  className="rounded-lg border border-emerald-200 bg-white p-4 text-sm text-slate-700"
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
            <h2
              className="mb-4 text-slate-900"
            >
              Our SEO Process
            </h2>
            <p
              className="mx-auto max-w-3xl text-lg text-slate-600"
            >
              A proven methodology that delivers sustainable organic growth and measurable results
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {[
              { 
                step: "01", 
                title: "Audit & Research", 
                description: "We conduct a comprehensive audit of your website and analyze your competitive landscape.",
                details: [
                  "Technical SEO audit and site health check",
                  "Competitor analysis and gap identification",
                  "Keyword research and opportunity mapping",
                  "Current ranking and traffic analysis",
                  "Backlink profile assessment"
                ]
              },
              { 
                step: "02", 
                title: "Strategy & Planning", 
                description: "We develop a customized SEO strategy aligned with your business goals and target audience.",
                details: [
                  "Keyword targeting and content strategy",
                  "On-page optimization roadmap",
                  "Technical improvements prioritization",
                  "Link building strategy development",
                  "Content calendar and topic clusters"
                ]
              },
              { 
                step: "03", 
                title: "Implementation & Optimization", 
                description: "We execute the strategy with precision, optimizing every aspect of your online presence.",
                details: [
                  "On-page content optimization",
                  "Technical SEO fixes and improvements",
                  "High-quality content creation",
                  "Strategic link building campaigns",
                  "Local SEO optimization (if applicable)"
                ]
              },
              { 
                step: "04", 
                title: "Monitoring & Reporting", 
                description: "We continuously track performance and refine strategies for optimal results.",
                details: [
                  "Weekly ranking monitoring",
                  "Monthly traffic and conversion reports",
                  "Competitor tracking and analysis",
                  "Algorithm update adaptation",
                  "Ongoing optimization and improvements"
                ]
              },
            ].map((phase, index) => {
              const phaseRef = useScrollFadeIn<HTMLDivElement>();
              return (
              <div
                key={phase.step}
                ref={phaseRef}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/30 p-8 transition-all duration-200 hover:border-emerald-300 hover:shadow-xl"
              >
                <div className="absolute right-4 top-4 text-7xl font-bold text-emerald-600/5">
                  {phase.step}
                </div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-2xl text-white">
                    {phase.step}
                  </div>
                  <h3 className="mb-3 text-2xl text-slate-900">{phase.title}</h3>
                  <p className="mb-6 text-slate-600">{phase.description}</p>
                  <ul className="space-y-2">
                    {phase.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2
              className="mb-4 text-slate-900"
            >
              SEO Questions Answered
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does it take to see SEO results?</AccordionTrigger>
              <AccordionContent>
                SEO is a long-term strategy. You may see initial improvements in 2-3 months, but significant results typically take 4-6 months. Timeframes vary based on competition, current site health, and keyword difficulty.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What's the difference between on-page and off-page SEO?</AccordionTrigger>
              <AccordionContent>
                On-page SEO involves optimizing elements on your website (content, meta tags, site speed), while off-page SEO focuses on external factors like backlinks and brand mentions that boost your site's authority.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you guarantee first page rankings?</AccordionTrigger>
              <AccordionContent>
                No reputable SEO agency can guarantee specific rankings as search algorithms constantly evolve. However, we use proven strategies to significantly improve your visibility and drive qualified organic traffic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do you measure SEO success?</AccordionTrigger>
              <AccordionContent>
                We track multiple metrics including organic traffic growth, keyword rankings, domain authority, conversion rates, and ROI. You'll receive detailed monthly reports showing progress toward your goals.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is SEO better than paid advertising?</AccordionTrigger>
              <AccordionContent>
                SEO and paid ads serve different purposes. SEO provides sustainable long-term growth and higher ROI over time, while paid ads deliver immediate results. We recommend a balanced approach for maximum impact.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div
            className="text-center"
          >
            <h2 className="mb-6 text-white">
              Ready to Rank Higher on Google?
            </h2>
            <p className="mb-8 text-lg text-emerald-100">
              Get a free SEO audit and discover opportunities to improve your search rankings and drive more organic traffic.
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
