import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import TurndownService from "turndown";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "app", "blog");
  if (!fs.existsSync(blogDir)) return [];
  
  const slugs = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "[slug]")
    .map((d) => ({ slug: d.name }));
  
  return slugs;
}

const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
const HTML_REGEX = /dangerouslySetInnerHTML=\{\{ __html: ("[\s\S]*?") \}\}/;

function extractMarkdown(contentTsxPath: string) {
  if (!fs.existsSync(contentTsxPath)) return null;
  const tsx = fs.readFileSync(contentTsxPath, "utf-8");
  const match = tsx.match(HTML_REGEX);
  if (!match) return null;
  try {
    const html = JSON.parse(match[1]);
    return turndown.turndown(html);
  } catch (err) {
    console.error("Failed to parse TSX content for markdown fallback", err);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1]; // Extract slug from URL path
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    const postDir = path.join(process.cwd(), "app", "blog", slug);
    const mdPath = path.join(postDir, "content.md");
    const metaPath = path.join(postDir, "meta.json");

    if (!fs.existsSync(postDir)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    let markdown = "";
    if (fs.existsSync(mdPath)) {
      markdown = fs.readFileSync(mdPath, "utf-8");
    } else {
      const contentTsxPath = path.join(postDir, "content.tsx");
      const fallbackMarkdown = extractMarkdown(contentTsxPath);
      if (fallbackMarkdown) {
        markdown = fallbackMarkdown;
        try {
          fs.writeFileSync(mdPath, markdown, "utf-8");
        } catch (err) {
          console.error("Unable to persist generated markdown:", err);
        }
      }
    }

    let meta: any = null;
    if (fs.existsSync(metaPath)) {
      try { meta = JSON.parse(fs.readFileSync(metaPath, "utf-8")); } catch {}
    }

  return NextResponse.json({ slug, markdown, meta });
  } catch (err: any) {
    console.error("Fetch blog error:", err);
    return NextResponse.json({ error: err?.message || "Failed" }, { status: 500 });
  }
}
