"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Calendar, Clock, ArrowRight, User, Search } from "lucide-react";

type BlogMeta = {
  id?: number;
  slug: string;
  title: string;
  author: string;
  category: string;
  image?: string | null;
  createdAt: string;
  short_description: string;
  readTime?: number;
};

// Restored richer styling with category badges & subtle hover lift
const categoryStyles: Record<string, { bg: string; badge: string; hover: string }> = {
  "Full-Stack Development": { bg: "from-violet-50 to-white", badge: "bg-violet-600", hover: "hover:border-violet-300" },
  "Mobile App Development": { bg: "from-blue-50 to-white", badge: "bg-blue-600", hover: "hover:border-blue-300" },
  "AI & Machine Learning": { bg: "from-purple-50 to-white", badge: "bg-purple-600", hover: "hover:border-purple-300" },
  "AI SEO & AEO Services": { bg: "from-emerald-50 to-white", badge: "bg-emerald-600", hover: "hover:border-emerald-300" },
};

export default function Blogs({ posts }: { posts: BlogMeta[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="bg-gradient-to-b from-violet-50 to-white pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 text-center">
          <div>
            <div className="mb-6 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm text-violet-700">Our Blog</div>
            <h1 className="mb-6 text-slate-900 text-4xl font-bold">Insights & Articles</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">Expert insights on web development, mobile apps, AI/ML, and more.</p>
            
            <div className="max-w-2xl mx-auto">
              <h2 className="text-left text-sm font-semibold text-slate-700 mb-3 ml-2">Search Articles</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-2 border-violet-200 bg-white py-4 pl-6 pr-14 text-slate-900 placeholder-slate-400 shadow-lg focus:border-violet-500 focus:outline-none focus:ring-0 transition-all"
                />
                <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200"></div>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No posts found matching your criteria.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-violet-600 hover:text-violet-700 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-slate-600">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              </div>
              <div className="grid gap-[1cm] md:grid-cols-2 lg:grid-cols-3">{/* 1cm ≈ 37.8px physical spacing */}
                {filteredPosts.map((post) => {
                  const style = categoryStyles[post.category] || { bg: "from-slate-50 to-white", badge: "bg-slate-600", hover: "hover:border-slate-300" };
                  return (
                    <article
                      key={post.slug}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg"
                    >
                      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                        <div className="relative overflow-hidden">
                          <div className="aspect-[16/9] bg-slate-100">
                            <img
                              src={post.image || "/og-image.png"}
                              alt={post.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          {/* Removed category badge and read-time pill to reduce clutter */}
                        </div>
                        <div className="flex flex-1 flex-col p-6 lg:p-7">
                          <h3 className="mb-3 text-lg lg:text-xl font-semibold leading-snug text-slate-900">
                            {post.title}
                          </h3>
                          <p className="mb-4 text-sm leading-normal text-slate-600 clamp-3 md:clamp-4">
                            {post.short_description}
                          </p>
                          <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 group-hover:text-violet-700">
                            Read more
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </Link>
                      {/* Removed hover ring outline for cleaner look */}
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
