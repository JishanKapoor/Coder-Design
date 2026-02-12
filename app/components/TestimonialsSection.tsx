"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants } from "../animations/variants";

const testimonials = [
  {
    quote:
      "CoderDesign rebuilt our entire e-commerce platform with Next.js and Node.js. Page load times dropped from 6 seconds to under 1.2 seconds, and our conversion rate jumped 150% in three months. Their full stack developers understood our backend architecture from day one. Easily the best software development company we have worked with in Toronto.",
    author: "Rajesh Mehta",
    role: "VP of Engineering",
    company: "Tata Consultancy Services (TCS)",
    rating: 5,
    image: "https://media.licdn.com/dms/image/v2/D5603AQFhe0kFGpifJg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718381678564?e=1744848000&v=beta&t=GsVPaGqD4wIXeI8lBKQGHbqh0dIYSTKsUxKxYBr7b1k",
  },
  {
    quote:
      "CoderDesign built an AI chatbot using n8n and OpenAI that integrates with our Salesforce CRM. It automates customer support, resolves 70% of inbound tickets without human involvement, and our support costs dropped 40%. Their AI automation agency team really knows what they are doing.",
    author: "Priya Sharma",
    role: "Director of Digital Transformation",
    company: "Infosys",
    rating: 5,
    image: "https://media.licdn.com/dms/image/v2/D5603AQH5-bMqFI6yCA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1694689407867?e=1744848000&v=beta&t=WlCO8LQ7pkKMb2A3jQkwCv0ej-JgJwJlDjY8JGkCqTQ",
  },
  {
    quote:
      "We hired CoderDesign as our AI SEO agency after struggling with three other firms. Within six months, our organic traffic grew 320% and we rank on page one for over 40 competitive Toronto keywords. Their generative engine optimization and technical SEO audit found issues others completely missed. The best SEO team in the GTA.",
    author: "David Chen",
    role: "Chief Marketing Officer",
    company: "Deloitte Digital",
    rating: 5,
    image: "https://media.licdn.com/dms/image/v2/D5603AQGmV-mQ-l2sjA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1705024702750?e=1744848000&v=beta&t=pJY8cBE8pNmWrQn1O1vQmEfjvX5lgVaWnJuH7nG3zqo",
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
            Trusted by Toronto Businesses
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
                <img 
                  src={testimonial.image}
                  alt={`${testimonial.author} - ${testimonial.role} at ${testimonial.company}`}
                  className="h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                  width={48}
                  height={48}
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
