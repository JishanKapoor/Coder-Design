"use client";
import { Brain, Zap, Shield, Cpu, Cloud, BarChart3 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description: "Leverage state-of-the-art machine learning models trained on your data for precise predictions.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized infrastructure ensures millisecond response times for real-time applications.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with industry standards to protect your data.",
  },
  {
    icon: Cpu,
    title: "Auto-Scaling",
    description: "Automatically scale your infrastructure based on demand without any configuration.",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    description: "Built for the cloud with multi-region support and 99.99% uptime guarantee.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Monitor performance and gain insights with comprehensive analytics dashboards.",
  },
];

export function Features() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl text-slate-900">
            Everything you need to power your AI applications
          </h2>
          <p className="text-lg text-slate-600">
            Comprehensive backend services designed for modern AI-driven products
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-slate-200 transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
