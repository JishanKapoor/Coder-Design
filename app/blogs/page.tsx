import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import Blogs from "./content";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Development Blog | CoderDesign Toronto",
  description:
    "Expert insights from Toronto developers. Full stack web development, mobile apps, AI automation, and SEO best practices from the CoderDesign team.",
  keywords:
    "development blog Toronto, web development blog, AI artificial intelligence blog, SEO blog Toronto, mobile app development blog, tech insights Toronto, software development articles, Ontario tech blog",
  openGraph: {
    title: "Development Blog | CoderDesign Toronto",
    description: "Expert insights from Toronto developers. Web development, mobile apps, AI automation, and SEO best practices.",
    url: "https://coderdesign.com/blogs/",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Development Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Development Blog | CoderDesign Toronto",
    description: "Expert insights from Toronto developers. Web, mobile, AI, and SEO best practices.",
    images: ["https://coderdesign.com/og-image.png"],
  },
  alternates: {
    canonical: "https://coderdesign.com/blogs/",
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

  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "CoderDesign Development Blog",
    "description": "Expert insights from Toronto developers. Full stack web development, mobile apps, AI automation, and SEO best practices.",
    "url": "https://coderdesign.com/blogs",
    "publisher": { "@type": "Organization", "name": "CoderDesign", "url": "https://coderdesign.com" },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://coderdesign.com/blog/${post.slug}`,
        "name": post.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }} />
      <Blogs posts={posts} />
    </>
  );
}
