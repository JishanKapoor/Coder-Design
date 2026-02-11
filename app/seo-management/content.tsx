'use client';
import Link from 'next/link';
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
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
      features: ["AI Keyword Discovery", "Predictive Analytics", "Google Business Profile Optimization", "Smart Content Scoring"]
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
    "Google My Business (Google Business Profile)",
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
                SEO Services Toronto: AI Powered Search Optimization
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                Harness the power of artificial intelligence to grow your organic search traffic. 
                Our Toronto SEO team combines machine learning, natural language processing, and 
                predictive analytics to boost your visibility, drive qualified traffic, and maximize 
                ROI with intelligent automation. We go beyond traditional keyword research. Our team 
                builds comprehensive content ecosystems, optimizes for Google AI Overviews, and ensures 
                your brand appears as a trusted answer across search engines, voice assistants, and AI 
                platforms like ChatGPT, Perplexity, and Gemini. For local businesses, we also optimize
                your Google Business Profile (formerly Google My Business) to improve Maps rankings,
                increase calls, and win the Toronto “near me” searches.
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
                  src="/images/hero-seo.jpg"
                  alt="SEO and digital marketing services in Toronto by CoderDesign"
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
              <h2 className="mb-6 text-slate-900">Why SEO is Essential for Toronto Businesses</h2>
              <p className="mb-6 text-lg text-slate-600">
                Search Engine Optimization is the highest ROI marketing channel available to businesses. 
                Unlike paid advertising where traffic stops the moment you pause your budget, SEO delivers 
                sustainable, compounding organic traffic that grows month over month. With 93% of online 
                experiences beginning with a search engine and 75% of users never scrolling past the first 
                page, ranking high on Google is essential for visibility, credibility, and long term 
                revenue growth.
              </p>
              <p className="text-slate-600">
                Our data driven, AI enhanced SEO strategies help Toronto businesses and enterprises 
                nationwide increase organic visibility by 200 to 500%, attract high intent leads actively 
                searching for their services, and achieve measurable ROI that compounds over time. We 
                combine technical SEO audits, AI powered content strategy, and strategic link building 
                to build sustainable competitive advantages.
              </p>
            </div>

            <div
              className="space-y-3"
            >
              {[
                "Increase organic traffic by 200% to 500% within 6 to 12 months",
                "Improve search rankings for high value keywords in Toronto",
                "Build brand authority and trust with your target customers",
                "Generate qualified leads with high purchase intent",
                "Achieve better ROI than paid advertising over the long term",
                "Gain a competitive advantage in your industry and local market",
                "Improve user experience and site performance scores",
                "Track and measure results with detailed monthly analytics"
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
                description: "We continuously track performance metrics and refine strategies to deliver optimal results.",
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
            <h2 className="mb-4 text-slate-900">
              SEO Questions Answered
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">How long does it take to see results from SEO?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Most of our Toronto clients see initial ranking improvements within 2 to 3 months. Significant results like first page rankings for competitive keywords typically show up around the 4 to 6 month mark. The timeline depends on your current domain authority, competition level, and how aggressively we can publish new content.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">What is the difference between on page and off page SEO?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                On page SEO covers everything directly on your website: content quality, meta tags, header structure, internal linking, page speed, and mobile friendliness. Off page SEO focuses on building your site authority through quality backlinks, brand mentions, and local citations. You need both to rank well on Google in a competitive market like Toronto.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Do you guarantee first page Google rankings?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                No honest SEO company can guarantee specific rankings because Google updates its algorithm hundreds of times a year. What we can guarantee is a proven process: thorough keyword research, technical optimization, quality content creation, and consistent link building. Our track record speaks for itself with 300% average traffic increases for our clients.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">How do you track and report on SEO progress?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                You get a detailed monthly report covering organic traffic growth, keyword ranking changes, domain authority trends, conversion rates, and ROI. We use Google Search Console, Google Analytics, and professional SEO tools to track every metric. No vanity numbers, just the data that actually matters to your business.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Should I invest in SEO or paid advertising?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Both have their place. Paid ads give you immediate traffic but stop the moment you stop paying. SEO takes longer to build but generates compounding returns over time with much higher ROI. For most Toronto businesses, we recommend starting SEO alongside a smaller paid ad budget, then gradually shifting budget to SEO as organic rankings grow.
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
                Claim Your Free SEO Audit
              </Button>
              <Button size="lg" variant="overlay" asChild>
                <Link href="/contact">
                  Request an SEO Proposal
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
