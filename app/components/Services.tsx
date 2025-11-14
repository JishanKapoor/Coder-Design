"use client";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2 } from "lucide-react";

const services = [
  {
    title: "Natural Language Processing",
    description: "Build intelligent chatbots, sentiment analysis, and text classification systems.",
    features: ["Text Analysis", "Language Translation", "Entity Recognition", "Sentiment Detection"],
    badge: "Popular",
  },
  {
    title: "Computer Vision",
    description: "Implement image recognition, object detection, and visual search capabilities.",
    features: ["Image Classification", "Object Detection", "Facial Recognition", "OCR"],
    badge: "Featured",
  },
  {
    title: "Predictive Analytics",
    description: "Make data-driven decisions with forecasting and predictive modeling.",
    features: ["Demand Forecasting", "Anomaly Detection", "Churn Prediction", "Risk Assessment"],
    badge: "New",
  },
];

export function Services() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl text-slate-900">
            AI Services Tailored to Your Needs
          </h2>
          <p className="text-lg text-slate-600">
            Choose from our suite of pre-built AI capabilities or create custom solutions
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="border-slate-200 bg-white">
              <CardContent className="p-6">
                {service.badge && (
                  <Badge className="mb-4" variant="secondary">
                    {service.badge}
                  </Badge>
                )}
                <h3 className="mb-3 text-slate-900">{service.title}</h3>
                <p className="mb-6 text-slate-600">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
