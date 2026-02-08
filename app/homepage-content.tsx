"use client";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { LogoCloud } from "./components/LogoCloud";
import { PlatformSection } from "./components/PlatformSection";
import { SolutionsSection } from "./components/SolutionsSection";
import { EnterpriseSection } from "./components/EnterpriseSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CTASection } from "./components/CTASection";
import { FooterSection } from "./components/FooterSection";

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
