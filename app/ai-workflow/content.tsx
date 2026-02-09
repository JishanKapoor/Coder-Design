'use client';
import Link from "next/link";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { 
  Brain, 
  Mic, 
  MessageSquare, 
  Workflow,
  Cpu,
  Zap,
  CheckCircle2,
  Calendar,
  ArrowRight,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

export default function AIWorkflowDetail() {
  const [showCalendar, setShowCalendar] = useState(false);

  const services = [
    {
      icon: Workflow,
      title: "n8n Workflow Automation",
      description: "Build powerful, self-hosted workflow automation with n8n. Create sophisticated integrations connecting 400+ apps, databases, and APIs with a visual workflow builder. Perfect for custom automation needs.",
      features: ["Visual Workflow Builder", "400+ Integrations", "Self-Hosted Control", "Custom Node Creation"]
    },
    {
      icon: MessageSquare,
      title: "AI Chatbot Workflows",
      description: "Design intelligent chatbot workflows using n8n combined with AI models. Create context-aware bots that integrate with ChatGPT, Claude, and other LLMs while connecting to your business systems.",
      features: ["LLM Integration", "Context Management", "Multi-Channel Deployment", "Conversation Flow Design"]
    },
    {
      icon: Cpu,
      title: "Business Process Automation",
      description: "Automate complex business processes with n8n workflows. Connect CRMs, databases, email systems, and custom APIs to create end-to-end automation that saves time and reduces errors.",
      features: ["CRM Automation", "Data Synchronization", "Email Workflows", "API Orchestration"]
    },
    {
      icon: Zap,
      title: "Make (Integromat) Workflows",
      description: "Design advanced automation scenarios using Make platform. Build multi-step workflows with conditional logic, data transformation, and error handling across hundreds of applications.",
      features: ["Visual Scenario Builder", "Advanced Routing", "Data Operations", "Error Handling"]
    },
    {
      icon: Brain,
      title: "AI-Powered Automation",
      description: "Integrate machine learning models into your workflows using n8n and Make. Add intelligent decision-making, natural language processing, and predictive analytics to automation workflows.",
      features: ["ML Model Integration", "AI Decision Making", "NLP Processing", "Predictive Triggers"]
    },
    {
      icon: BarChart3,
      title: "Data Pipeline Automation",
      description: "Build automated data pipelines with n8n to extract, transform, and load data between systems. Create scheduled workflows for reporting, analytics, and data synchronization.",
      features: ["ETL Workflows", "Scheduled Automation", "Data Transformation", "Multi-Source Integration"]
    }
  ];

  const techStack = [
    "n8n",
    "Make (Integromat)",
    "Zapier",
    "OpenAI API",
    "Claude AI",
    "Python",
    "LangChain",
    "Webhooks"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white pb-20 pt-32" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm text-purple-700">
                AI & Workflow Automation
              </div>
              <h1 className="mb-6 text-slate-900">
                AI Automation and Chatbot Development in Toronto
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                Build powerful, self hosted automation workflows with n8n, Make, and deep AI integration. 
                We design custom workflow solutions that connect your CRMs, databases, email systems, and 
                400+ apps, then supercharge them with AI models from OpenAI, Anthropic (Claude), and 
                custom LLMs for intelligent decision making, content generation, and predictive triggers. 
                Whether you need an AI powered customer support pipeline, an automated lead qualification 
                system, or a complex data synchronization workflow, our Toronto team delivers production 
                ready automation that saves hours of manual work every week.
              </p>
              
              <div className="mb-8 flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
                  src="/images/hero-ai.jpg"
                  alt="AI automation and workflow development services in Toronto"
                  className="h-full w-full object-cover object-top"
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
            
            <h3 className="mb-4 sm:mb-6 pr-10 text-xl sm:text-2xl text-slate-900">Schedule an AI Consultation</h3>
            
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
              AI & Machine Learning Services
            </h2>
            <p
              className="mx-auto max-w-3xl text-lg text-slate-600"
            >
              End-to-end AI solutions from model development to production deployment
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 hover:border-purple-300 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="mb-3 text-xl text-slate-900">{service.title}</h3>
                  <p className="mb-4 text-slate-600">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
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
      <section className="bg-purple-50 py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-slate-900">Why AI Automation Matters for Your Business</h2>
              <p className="mb-6 text-lg text-slate-600">
                Artificial Intelligence and workflow automation are fundamentally reshaping how businesses 
                operate. Organizations leveraging AI powered automation report 30% to 50% reductions in 
                operational costs, 60% faster task completion, and significantly improved accuracy in 
                repetitive processes. From intelligent chatbots handling customer inquiries around the 
                clock to predictive analytics systems that forecast demand and optimize inventory, AI 
                is no longer a luxury. It is a competitive necessity.
              </p>
              <p className="text-slate-600">
                Our team specializes in implementing practical, production-ready AI solutions that deliver 
                measurable business value from day one. We don't just build proof-of-concepts — we deploy 
                robust, monitored automation workflows that integrate seamlessly with your existing tech 
                stack and scale as your needs evolve.
              </p>
            </div>

            <div
              className="space-y-3"
            >
              {/*
                List of benefits
              */}
              { [
                "Automate repetitive tasks and reduce operational costs",
                "Extract actionable insights from large datasets",
                "Provide 24/7 customer support with AI chatbots",
                "Predict customer behavior and market trends",
                "Improve decision-making with data-driven recommendations",
                "Scale operations without proportional cost increases",
                "Enhance personalization and user experiences",
                "Detect anomalies and prevent fraud in real-time"
              ].map((benefit, index) => (
                <div
                  key={benefit}
                  className="rounded-lg border border-purple-200 bg-white p-4 text-sm text-slate-700"
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
              Our AI Implementation Process
            </h2>
            <p
              className="mx-auto max-w-3xl text-lg text-slate-600"
            >
              A structured approach to delivering AI solutions that drive real business results
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/*
              List of process phases
            */}
            { [
              { 
                step: "01", 
                title: "Workflow Discovery & Design", 
                description: "We analyze your business processes to identify automation opportunities and design custom workflow solutions.",
                details: [
                  "Business process mapping and analysis",
                  "Automation opportunity identification",
                  "Workflow architecture design",
                  "Integration requirements assessment",
                  "n8n vs Make platform recommendation"
                ]
              },
              { 
                step: "02", 
                title: "Workflow Development & Testing", 
                description: "We build custom workflows connecting your apps, APIs, and databases with robust error handling.",
                details: [
                  "Visual workflow construction",
                  "Custom node and integration setup",
                  "Data transformation logic",
                  "Error handling and retry mechanisms",
                  "Comprehensive testing and validation"
                ]
              },
              { 
                step: "03", 
                title: "AI Integration & Enhancement", 
                description: "We integrate AI capabilities using ChatGPT, Claude, and custom ML models for intelligent automation.",
                details: [
                  "LLM API integration (OpenAI, Anthropic)",
                  "AI-powered decision nodes",
                  "Natural language processing workflows",
                  "Predictive automation triggers",
                  "Context management and memory"
                ]
              },
              { 
                step: "04", 
                title: "Deployment & Monitoring", 
                description: "We deploy workflows to production and set up monitoring for reliability and performance.",
                details: [
                  "Self-hosted n8n setup or cloud deployment",
                  "Webhook and trigger configuration",
                  "Performance monitoring and logging",
                  "Error alerts and notifications",
                  "Regular optimization and updates"
                ]
              },
            ].map((phase, index) => {
              const phaseRef = useScrollFadeIn<HTMLDivElement>();
              return (
              <div
                key={phase.step}
                ref={phaseRef}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-purple-50/30 p-8 transition-all hover:border-purple-300 hover:shadow-xl"
              >
                <div className="absolute right-4 top-4 text-7xl font-bold text-purple-600/5">
                  {phase.step}
                </div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-2xl text-white">
                    {phase.step}
                  </div>
                  <h3 className="mb-3 text-2xl text-slate-900">{phase.title}</h3>
                  <p className="mb-6 text-slate-600">{phase.description}</p>
                  <ul className="space-y-2">
                    {phase.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-600" />
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
              AI Automation Questions Answered
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">What is the difference between n8n, Make, and Zapier?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                n8n is open source and self hosted, which means you own your data and can run unlimited workflows without per task pricing. Make (formerly Integromat) is great for complex visual workflows hosted in the cloud. Zapier is the easiest to learn but gets expensive fast and has less flexibility. We typically recommend n8n for Toronto businesses that want full control and Make for teams that prefer managed hosting.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">How long does it take to build a workflow automation?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Simple automations connecting two or three apps can be done in 1 to 3 days. A multi step workflow with AI integration, error handling, and conditional logic usually takes 1 to 2 weeks. Enterprise level automation projects with dozens of interconnected workflows typically take 4 to 8 weeks including testing and documentation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Can you integrate ChatGPT or other AI models into workflows?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Yes, this is one of our specialties. We integrate OpenAI (GPT 4, GPT 4o), Anthropic Claude, and custom fine tuned models into n8n and Make workflows. This powers things like intelligent customer support chatbots, automated content generation, email classification, lead scoring, and document processing for businesses across Toronto.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Do I need technical skills to manage the automations?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Not at all. We build workflows with clear visual interfaces and provide thorough documentation for your team. You can monitor, pause, and adjust workflows through simple dashboards without writing any code. We also include training sessions and offer ongoing support if you need it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Is self hosted n8n secure enough for business data?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Yes. With self hosted n8n, your data never leaves your own infrastructure. We set up proper encryption, authentication, access controls, and regular backups. This is actually more secure than cloud based alternatives because you have complete control over where your data lives. It is ideal for businesses handling sensitive customer or financial information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div
            className="text-center"
          >
            <h2 className="mb-6 text-white">
              Ready to Automate Your Business Workflows?
            </h2>
            <p className="mb-8 text-lg text-purple-100">
              Let's discuss how n8n workflow automation and AI integration can streamline your operations and save time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setShowCalendar(true)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule an AI Assessment
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10" asChild>
                <Link href="/contact">
                  Get Your AI Strategy Quote
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
