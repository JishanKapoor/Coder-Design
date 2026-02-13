"use client";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { useAnimations } from "../hooks/useAnimations";
import { containerVariants, itemVariants } from "../animations/variants";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  image?: string | null;
  short_description: string;
  createdAt: string;
}

export function WhoWeWorkWith({ posts }: { posts?: BlogPost[] }) {
  const shouldAnimate = useAnimations();
  const latestPosts = (posts ?? []).slice(0, 6);

  if (latestPosts.length === 0) return null;

  return (
    <section id="blog" className="bg-white py-24 lg:py-32">
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
            Latest Insights
          </motion.div>

          <motion.h2
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-6 text-slate-900"
          >
            From Our Blog
          </motion.h2>

          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="mb-16 text-lg text-slate-600"
          >
            Practical guides on full-stack development, AI automation, mobile apps, and SEO for startups and businesses in Toronto.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-violet-300 hover:shadow-lg"
            >
              {post.image && (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-[17px] font-bold leading-tight text-slate-900">{post.category}</h3>
                </div>
                <p className="mb-2 text-sm font-medium leading-snug text-slate-700">{post.title}</p>
                <p className="mb-4 text-[15px] leading-relaxed text-slate-500">{post.short_description}</p>
                <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-violet-600 transition-colors duration-200 group-hover:text-violet-700">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
