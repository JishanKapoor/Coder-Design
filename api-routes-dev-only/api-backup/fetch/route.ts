import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    // 1) Try database first (authoritative for admin screens)
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
      },
    });

    if (dbBlogs.length > 0) {
      return NextResponse.json(
        dbBlogs.map(b => ({
          id: b.id,
          slug: b.slug,
          title: b.title,
          author: b.author,
          category: b.category,
          image: b.image,
          createdAt: b.createdAt,
          short_description: b.short_description,
          // readTime not in DB; UI uses fallback when missing
        })),
        { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
      );
    }

    // 2) Fallback to filesystem meta.json (legacy content)
    const blogDir = path.join(process.cwd(), 'app', 'blog');
    if (!fs.existsSync(blogDir)) {
      return NextResponse.json([]);
    }

    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    const blogs: any[] = [];

    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const metaPath = path.join(blogDir, e.name, 'meta.json');
      if (fs.existsSync(metaPath)) {
        try {
          const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
          blogs.push(meta);
        } catch {}
      }
    }

    const sortedBlogs = blogs.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    return NextResponse.json(sortedBlogs, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}
