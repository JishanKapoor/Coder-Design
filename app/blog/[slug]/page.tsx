import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

// Generate static paths for all blogs
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "app", "blog");
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const slugs = entries
    .filter((e) => e.isDirectory() && e.name !== "[slug]")
    .map((e) => ({
      slug: e.name,
    }));

  return slugs;
}

// Dynamic import of blog content
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if blog exists
  const blogPath = path.join(process.cwd(), "app", "blog", slug);
  if (!fs.existsSync(blogPath)) {
    notFound();
  }

  // Dynamically import the blog's content component
  const Content = dynamicImport(() => import(`../${slug}/content`), {
    loading: () => <div>Loading...</div>,
  });

  return <Content />;
}
