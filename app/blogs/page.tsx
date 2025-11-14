import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import Blogs from "./content";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: "Development Blog | Web, Mobile, AI & SEO Insights - Coder Design NYC",
  description:
    "Expert insights from New York's top development agency. Full-stack, mobile apps, AI/ML, and SEO best practices from experienced NYC developers.",
  keywords:
    "development blog NYC, web development blog, AI machine learning blog, SEO blog New York, mobile app development blog, tech insights NYC, software development articles",
  alternates: {
    canonical: "https://coderdesign.com/blogs",
  },
};

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

function loadPosts(): BlogMeta[] {
  const blogDir = path.join(process.cwd(), 'app', 'blog');
  if (!fs.existsSync(blogDir)) return [];
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const posts: BlogMeta[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const metaPath = path.join(blogDir, e.name, 'meta.json');
    if (fs.existsSync(metaPath)) {
      try {
        const meta: BlogMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        posts.push(meta);
      } catch {}
    }
  }
  return posts.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export default function Page() {
  const posts = loadPosts();
  return <Blogs posts={posts} />;
}
