import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The AI backend platform has transformed how we handle data processing. Response times are incredible and the accuracy is unmatched.",
    author: "Sarah Chen",
    role: "CTO, TechFlow",
    initials: "SC",
    rating: 5,
  },
  {
    quote: "Integration was seamless and the support team went above and beyond. We scaled from 1M to 100M requests without any issues.",
    author: "Marcus Johnson",
    role: "VP Engineering, DataCorp",
    initials: "MJ",
    rating: 5,
  },
  {
    quote: "Best decision we made for our AI infrastructure. The auto-scaling alone has saved us hundreds of hours in DevOps work.",
    author: "Elena Rodriguez",
    role: "Lead Developer, InnovateLabs",
    initials: "ER",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl text-slate-900">
            Loved by developers and trusted by enterprises
          </h2>
          <p className="text-lg text-slate-600">
            See what our clients have to say about their experience
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="border-slate-200">
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="mb-6 text-slate-700">"{testimonial.quote}"</p>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
