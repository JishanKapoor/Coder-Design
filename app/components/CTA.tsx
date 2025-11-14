"use client";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Start Building Today</span>
          </div>
          
          <h2 className="mb-6 text-4xl sm:text-5xl text-white">
            Ready to transform your applications with AI?
          </h2>
          
          <p className="mb-10 text-lg text-blue-50">
            Join hundreds of companies using our AI backend platform to build intelligent, scalable applications.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Schedule Demo
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-blue-100">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
