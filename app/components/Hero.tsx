"use client";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">AI-Powered Backend Solutions</span>
          </div>
          
          <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900">
            Build Smarter with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              AI Backend
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-xl text-lg text-slate-600">
            Transform your applications with intelligent backend infrastructure. 
            We deliver cutting-edge AI solutions that scale with your business.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-24">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MTcyOTI3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI Dashboard"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
