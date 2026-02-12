"use client";
import dynamic from "next/dynamic";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { FooterSection } from "./components/FooterSection";

// Dynamically import below-fold sections to reduce initial JS bundle
const LogoCloud = dynamic(() => import("./components/LogoCloud").then(m => ({ default: m.LogoCloud })), { ssr: true });
const PlatformSection = dynamic(() => import("./components/PlatformSection").then(m => ({ default: m.PlatformSection })), { ssr: true });
const SolutionsSection = dynamic(() => import("./components/SolutionsSection").then(m => ({ default: m.SolutionsSection })), { ssr: true });
const EnterpriseSection = dynamic(() => import("./components/EnterpriseSection").then(m => ({ default: m.EnterpriseSection })), { ssr: true });
const TestimonialsSection = dynamic(() => import("./components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })), { ssr: true });
const CTASection = dynamic(() => import("./components/CTASection").then(m => ({ default: m.CTASection })), { ssr: true });

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main id="main-content">
        <HeroSection />
        <LogoCloud />
        <PlatformSection />
        <SolutionsSection />
        <EnterpriseSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      
      <FooterSection />
    </div>
  );
}
