import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "../../../../../lib/prisma";
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

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

const HTML_REGEX = /dangerouslySetInnerHTML=\{\{ __html: ("[\s\S]*?") \}\}/;

function extractMarkdownFromTsx(contentTsxPath: string) {
  if (!fs.existsSync(contentTsxPath)) return null;

  const tsx = fs.readFileSync(contentTsxPath, "utf-8");
  const match = tsx.match(HTML_REGEX);
  if (!match || !match[1]) return null;

  try {
    const htmlString = JSON.parse(match[1]);
    return turndown.turndown(htmlString);
  } catch (error) {
    console.error("Failed to parse HTML string from TSX:", error);
    return null;
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // 1) Try DB first
    try {
      const dbBlog = await prisma.blog.findUnique({
        where: { slug },
        select: { description: true },
      });
      if (dbBlog?.description) {
        return NextResponse.json({ markdown: dbBlog.description });
      }
    } catch (e) {
      // Non-fatal, continue to filesystem fallback
    }

    const postDir = path.join(process.cwd(), "app", "blog", slug);
    const mdPath = path.join(postDir, "content.md");

    // 2) Check if markdown file exists
    if (fs.existsSync(mdPath)) {
      const markdown = fs.readFileSync(mdPath, "utf-8");
      return NextResponse.json({ markdown });
    }

    // 3) Fallback to extracting from content.tsx
    const contentTsxPath = path.join(postDir, "content.tsx");
    const fallbackMarkdown = extractMarkdownFromTsx(contentTsxPath);
    
    if (fallbackMarkdown) {
      // Optionally save it as content.md for future use
      try {
        fs.writeFileSync(mdPath, fallbackMarkdown, "utf-8");
      } catch (err) {
        console.error("Failed to persist fallback markdown:", err);
      }
      return NextResponse.json({ markdown: fallbackMarkdown });
    }

    return NextResponse.json(
      { error: "Content not found for this blog post." },
      { status: 404 }
    );
  } catch (err: any) {
    console.error("Fetch markdown error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to fetch markdown" },
      { status: 500 }
    );
  }
}
