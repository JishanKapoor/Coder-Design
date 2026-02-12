import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Generate a sitemap.xml based on current app pages and blog slugs
export async function generateSitemap() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coderdesign.com";
    const today = new Date().toISOString().split("T")[0];

    // Collect static top-level routes we want indexed
    const staticRoutes: Array<{ loc: string; changefreq: string; priority: string }> = [
      { loc: `${baseUrl}/`, changefreq: "weekly", priority: "1.0" },
      { loc: `${baseUrl}/full-stack-engineering`, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/mobile-app-development`, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/ai-workflow`, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/seo-management`, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/contact`, changefreq: "monthly", priority: "0.8" },
      { loc: `${baseUrl}/about`, changefreq: "monthly", priority: "0.7" },
      { loc: `${baseUrl}/blogs`, changefreq: "weekly", priority: "0.8" },
      { loc: `${baseUrl}/privacy`, changefreq: "yearly", priority: "0.3" },
      { loc: `${baseUrl}/terms`, changefreq: "yearly", priority: "0.3" },
    ];

    // Collect blog slugs by reading folders in app/blog (excluding [slug])
    const blogDir = path.join(process.cwd(), "app", "blog");
    let blogSlugs: string[] = [];
    if (fs.existsSync(blogDir)) {
      blogSlugs = fs
        .readdirSync(blogDir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && d.name !== "[slug]")
        .map((d) => d.name);
    }

    const blogEntries = blogSlugs.map((slug) => ({
      loc: `${baseUrl}/blog/${slug}`,
      changefreq: "monthly",
      priority: "0.6",
    }));

    // Collect tool slugs
    const toolsDir = path.join(process.cwd(), "app", "tools");
    let toolSlugs: string[] = [];
    if (fs.existsSync(toolsDir)) {
      toolSlugs = fs
        .readdirSync(toolsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
    }
    const toolEntries = [
      { loc: `${baseUrl}/tools`, changefreq: "monthly", priority: "0.7" },
      ...toolSlugs.map((slug) => ({
        loc: `${baseUrl}/tools/${slug}`,
        changefreq: "monthly",
        priority: "0.5",
      })),
    ];

    const entries = [...staticRoutes, ...blogEntries, ...toolEntries]
      .map(
        (e) =>
          `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
      )
      .join("\n\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n${entries}\n\n</urlset>\n`;

    // Ensure public folder exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    // Write sitemap to the proper static location so it ends up at /sitemap.xml
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf-8");

    // Optional: also update legacy app/public/sitemap.xml if it exists, for compatibility
    const appPublicDir = path.join(process.cwd(), "app", "public");
    if (fs.existsSync(appPublicDir)) {
      try {
        fs.writeFileSync(path.join(appPublicDir, "sitemap.xml"), xml, "utf-8");
      } catch {}
    }
  } catch (err) {
    console.error("Failed to generate sitemap:", err);
  }
}

// Default export for Next.js route handler
export default async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coderdesign.com";
    const today = new Date().toISOString().split("T")[0];

    // Collect static top-level routes we want indexed
    const staticRoutes: Array<{ loc: string; changefreq: string; priority: string }> = [
      { loc: `${baseUrl}/`, changefreq: "weekly", priority: "1.0" },
      { loc: `${baseUrl}/full-stack-engineering`, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/mobile-app-development`, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/ai-workflow`, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/seo-management`, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/contact`, changefreq: "monthly", priority: "0.8" },
      { loc: `${baseUrl}/about`, changefreq: "monthly", priority: "0.7" },
      { loc: `${baseUrl}/blogs`, changefreq: "weekly", priority: "0.8" },
      { loc: `${baseUrl}/privacy`, changefreq: "yearly", priority: "0.3" },
      { loc: `${baseUrl}/terms`, changefreq: "yearly", priority: "0.3" },
    ];

    // Collect blog slugs by reading folders in app/blog (excluding [slug])
    const blogDir = path.join(process.cwd(), "app", "blog");
    let blogSlugs: string[] = [];
    if (fs.existsSync(blogDir)) {
      blogSlugs = fs
        .readdirSync(blogDir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && d.name !== "[slug]")
        .map((d) => d.name);
    }

    const blogEntries = blogSlugs.map((slug) => ({
      loc: `${baseUrl}/blog/${slug}`,
      changefreq: "monthly",
      priority: "0.6",
    }));

    // Collect tool slugs
    const toolsDir2 = path.join(process.cwd(), "app", "tools");
    let toolSlugs2: string[] = [];
    if (fs.existsSync(toolsDir2)) {
      toolSlugs2 = fs
        .readdirSync(toolsDir2, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
    }
    const toolEntries2 = [
      { loc: `${baseUrl}/tools`, changefreq: "monthly", priority: "0.7" },
      ...toolSlugs2.map((slug) => ({
        loc: `${baseUrl}/tools/${slug}`,
        changefreq: "monthly",
        priority: "0.5",
      })),
    ];

    const entries = [...staticRoutes, ...blogEntries, ...toolEntries2]
      .map(
        (e) =>
          `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
      )
      .join("\n\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n${entries}\n\n</urlset>\n`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("Failed to generate sitemap:", err);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
