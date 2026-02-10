'use client';
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import Link from 'next/link';
import { 
  Smartphone, 
  Zap, 
  Shield, 
  Users,
  Code2,
  Layers,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Globe,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

export default  function MobileAppDevelopment() {
  const [showCalendar, setShowCalendar] = useState(false);
    const technologies = [
    { name: "Swift", category: "Backend" },
    { name: "Kotlin", category: "Backend" },
    { name: "React Native", category: "Backend" },
    { name: "Flutter", category: "Frontend" },
    { name: "Jetpack Compose", category: "Frontend" },
    { name: "Firebase", category: "Database" },
    { name: "Xcode", category: "Cloud" },
    
  ];
  const services = [
    {
      icon: Smartphone,
      title: "Native iOS Development",
      description: "Build high-performance native iOS apps using Swift and SwiftUI. Optimized for the latest iPhone and iPad devices with seamless integration into the Apple ecosystem.",
      features: ["Swift & SwiftUI", "App Store Optimization", "Push Notifications", "In-App Purchases"]
    },
    {
      icon: Code2,
      title: "Native Android Development",
      description: "Create powerful Android applications using Kotlin and Jetpack Compose. Deliver exceptional experiences across all Android devices and versions.",
      features: ["Kotlin & Jetpack Compose", "Material Design", "Google Play Services", "Firebase Integration"]
    },
    {
      icon: Layers,
      title: "Cross-Platform Development",
      description: "Develop once, deploy everywhere with React Native and Flutter. Build cost-effective apps that work seamlessly on both iOS and Android platforms.",
      features: ["React Native & Flutter", "Code Reusability", "Native Performance", "Faster Time to Market"]
    },
    {
      icon: Globe,
      title: "Progressive Web Apps (PWA)",
      description: "Build web applications that feel like native apps. PWAs offer offline functionality, push notifications, and installation on home screens.",
      features: ["Offline Capability", "Cross-Platform", "App-Like Experience", "SEO Friendly"]
    },
    {
      icon: Shield,
      title: "Mobile Backend & APIs",
      description: "Robust backend infrastructure and RESTful/GraphQL APIs to power your mobile applications with secure data management and real-time synchronization.",
      features: ["RESTful & GraphQL APIs", "Authentication & Security", "Cloud Storage", "Real-Time Sync"]
    },
    {
      icon: Users,
      title: "UI/UX Design for Mobile",
      description: "User-centric design that delights users and drives engagement. We create intuitive interfaces following platform-specific design guidelines.",
      features: ["User Research", "Wireframing & Prototyping", "Usability Testing", "Design Systems"]
    }
  ];

  const benefits = [
    "Native performance and smooth user experience",
    "Offline functionality and local data storage",
    "Push notifications and real-time updates",
    "Biometric authentication (Face ID, Touch ID)",
    "Camera, GPS, and hardware integration",
    "App Store and Google Play deployment",
    "Analytics and crash reporting",
    "Continuous updates and maintenance"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pb-20 pt-32 lg:pt-40" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm text-blue-700">
                Mobile App Development
              </div>
              <h1 className="mb-6 text-slate-900">
                Mobile App Development Company in Toronto
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                We design and develop high performance mobile applications for iOS and Android that users 
                love and businesses depend on. From native apps built with Swift and Kotlin to cross 
                platform solutions powered by React Native and Flutter, we handle every stage including 
                user research, UI/UX design, agile development, automated testing, App Store submission, 
                and post launch analytics. Our Toronto based app developers build for speed, accessibility, 
                and engagement with features like push notifications, biometric authentication, offline 
                capabilities, and real time synchronization built in from the start.
              </p>
               <div className="mb-8 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded-lg bg-white px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
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
                  src="/images/hero-mobile.jpg"
                  alt="Mobile app development services for iOS and Android in Toronto"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Integration */}
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
          </div>
        </div>
      )}

      {/* Services Section */}
      <section className="bg-white py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-slate-900">
              Our Mobile Development Services
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              Comprehensive mobile solutions covering every aspect of app development
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl text-slate-900">{service.title}</h3>
                  <p className="mb-4 text-slate-600">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-blue-600" />
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
      <section className="bg-slate-50 py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-slate-900">Why Mobile App Development Matters</h2>
              <p className="mb-6 text-lg text-slate-600">
                Mobile apps provide a direct, always on channel to your customers offering richer 
                experiences than mobile websites, deeper engagement through push notifications and 
                personalization, and stronger brand loyalty through daily interaction. With over 6.8 billion 
                smartphone users worldwide and mobile commerce accounting for 73% of all e-commerce sales, 
                a well built mobile app is a critical revenue driver and customer retention tool for any 
                business.
              </p>
              <p className="text-slate-600">
                Our Toronto based team specializes in creating apps that not only look beautiful but 
                perform under real world conditions with fast load times, smooth animations, offline first 
                architecture, and crash free releases. We combine data driven UX decisions with rigorous 
                engineering to keep users engaged, reduce churn, and drive measurable conversions.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="rounded-lg border border-blue-200 bg-white p-4 text-sm text-slate-700"
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
              Our Mobile App Development Process
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              A proven methodology that delivers high-quality mobile apps on time and within budget
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {[
              { 
                step: "01", 
                title: "Discovery & Strategy", 
                description: "We research your business objectives, target users, and competitive landscape in depth.",
                details: [
                  "Stakeholder interviews and requirement gathering",
                  "Market research and competitor analysis",
                  "User persona development",
                  "Feature prioritization and roadmap planning",
                  "Technology stack recommendation"
                ]
              },
              { 
                step: "02", 
                title: "Design & Prototyping", 
                description: "Our designers create intuitive, beautiful interfaces that your users will love to interact with.",
                details: [
                  "Wireframing and user flow mapping",
                  "High-fidelity UI/UX design",
                  "Interactive prototypes for testing",
                  "Design system and component library",
                  "User testing and feedback iteration"
                ]
              },
              { 
                step: "03", 
                title: "Development & Testing", 
                description: "We build your app using agile sprints with continuous integration and quality assurance.",
                details: [
                  "Sprint-based development cycles",
                  "Code reviews and pair programming",
                  "Automated testing (unit, integration, E2E)",
                  "Performance optimization",
                  "Security testing and vulnerability scanning"
                ]
              },
              { 
                step: "04", 
                title: "Launch & Support", 
                description: "We handle app store deployment and provide ongoing support to ensure your app's continued success.",
                details: [
                  "App Store and Google Play submission",
                  "Beta testing with TestFlight and Firebase",
                  "Marketing asset preparation",
                  "Post-launch monitoring and analytics",
                  "Continuous updates and feature enhancements"
                ]
              },
            ].map((phase, index) => {
              const phaseRef = useScrollFadeIn<HTMLDivElement>();
              return (
              <div
                key={phase.step}
                ref={phaseRef}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/30 p-8 transition-all hover:border-blue-300 hover:shadow-xl"
              >
                <div className="absolute right-4 top-4 text-7xl font-bold text-blue-600/5">
                  {phase.step}
                </div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-2xl font-bold text-white">
                    {phase.step}
                  </div>
                  <h3 className="mb-3 text-2xl text-slate-900">{phase.title}</h3>
                  <p className="mb-6 text-slate-600">{phase.description}</p>
                  <ul className="space-y-2">
                    {phase.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
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
      <section className="bg-slate-50 py-24" ref={useScrollFadeIn<HTMLDivElement>()}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-slate-900">
              Mobile App Development Questions Answered
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Should I build a native app or a cross platform app?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                It depends on what you need. Native apps built with Swift (iOS) or Kotlin (Android) deliver the best performance and access to every platform feature. Cross platform frameworks like React Native and Flutter let you ship to both platforms faster and at lower cost. For most Toronto startups and small businesses, we recommend React Native because it covers 95% of use cases at roughly 40% less development time than building two native apps.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">How long does it take to build a mobile app?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                A simple app with core features takes 2 to 3 months. Apps with advanced functionality like real time messaging, payment processing, or AI features typically take 4 to 6 months. This includes UI/UX design, development, testing across devices, and preparation for App Store and Google Play submission. We lay out the full timeline during our free consultation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Do you handle App Store and Google Play submission?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Yes, we manage the entire submission process for both stores. This includes preparing screenshots, writing store descriptions, meeting Apple and Google review guidelines, configuring analytics, and handling any rejections or revision requests. We have done this dozens of times and know exactly what reviewers look for.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">Can you update or fix my existing mobile app?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                Absolutely. We offer maintenance packages that cover bug fixes, OS compatibility updates, new feature development, performance optimization, and security patches. Whether your app was built by another team or is just showing its age, our Toronto developers can audit it and bring it up to current standards.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">How do I get started with mobile app development?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-slate-600">
                It starts with a free consultation where we discuss your app idea, target audience, and business goals. From there we create a detailed project roadmap covering design, development, testing, and launch. Every project is scoped individually based on your requirements. <Link href="/contact" className="text-blue-600 underline">Contact us</Link> to schedule your free consultation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-700 py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white">
              Ready to Build Your Mobile App?
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Let's discuss your app idea and create a roadmap to bring it to life.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setShowCalendar(true)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule an App Review
              </Button>
              <Button size="lg" variant="overlay" asChild>
                <Link href="/contact">
                  Get a Free App Quote
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
