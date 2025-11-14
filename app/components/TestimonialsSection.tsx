"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants } from "../animations/variants";

const testimonials = [
  {
    quote:
      "Coder Design transformed our e-commerce platform with exceptional full-stack engineering. The team delivered a scalable solution that increased our conversion rate by 150%.",
    author: "David Morrison",
    role: "CEO",
    company: "RetailPro NYC",
    rating: 5,
    image: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE3NDYxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote:
      "Their AI chatbot solution reduced our customer service costs by 40% while improving satisfaction scores. The team's expertise in machine learning is truly impressive.",
    author: "Jennifer Lee",
    role: "VP of Operations",
    company: "FinTech Solutions",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYxNzAzNzgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote:
      "Our organic traffic increased 320% in 6 months with their SEO strategies. Based in Manhattan, they understand the NYC market better than anyone. Highly recommended!",
    author: "Robert Martinez",
    role: "Marketing Director",
    company: "Metro Real Estate Group",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTcwMzg3MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function TestimonialsSection() {
  const shouldAnimate = useAnimations();

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, amount: 0.3 } : undefined}
          variants={shouldAnimate ? containerVariants : undefined}
        >
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-4 inline-block rounded-full bg-violet-50 px-4 py-1.5 text-sm text-violet-700"
          >
            Client Success Stories
          </motion.div>

          <motion.h2
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-16 text-slate-900"
          >
            Trusted by New York Businesses
          </motion.h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-violet-600 text-violet-600" />
                ))}
              </div>

              <p className="mb-6 text-[15px] leading-relaxed text-slate-700">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm text-slate-900">{testimonial.author}</div>
                  <div className="text-xs text-slate-600">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
