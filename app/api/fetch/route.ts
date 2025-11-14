import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { prisma } from '../../../lib/prisma'

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  try {
    // Read database (authoritative if present) and filesystem to merge
    const dbBlogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        author: true,
        category: true,
        image: true,
        createdAt: true,
        short_description: true,
        readTime: true,
      },
    });

    // Read filesystem meta.json (legacy/static content)
    const blogDir = path.join(process.cwd(), 'app', 'blog');
    const fsBlogs: any[] = [];
    if (fs.existsSync(blogDir)) {
      const entries = fs.readdirSync(blogDir, { withFileTypes: true });
      for (const e of entries) {
        if (!e.isDirectory() || e.name === '[slug]') continue;
        const metaPath = path.join(blogDir, e.name, 'meta.json');
        if (fs.existsSync(metaPath)) {
          try {
            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
            fsBlogs.push(meta);
          } catch {}
        }
      }
    }

    // Merge DB-first with filesystem extras (avoid duplicates by slug)
    const map = new Map<string, any>();
    for (const b of dbBlogs) {
      map.set(b.slug, {
        id: b.id,
        slug: b.slug,
        title: b.title,
        author: b.author,
        category: b.category,
        image: b.image,
        createdAt: b.createdAt,
        short_description: b.short_description,
        readTime: b.readTime,
      });
    }
    for (const f of fsBlogs) {
      if (!map.has(f.slug)) {
        map.set(f.slug, f);
      }
    }

    const merged = Array.from(map.values()).sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    );

    return NextResponse.json(merged, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}
