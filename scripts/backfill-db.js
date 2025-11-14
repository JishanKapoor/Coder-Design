/*
 Backfill existing file-based blog posts into the database.
 - Reads app/blog/<slug>/meta.json for metadata
 - Reads app/blog/<slug>/content.md for markdown (preferred)
 - If no content.md, extracts HTML from content.tsx and converts to markdown via turndown
 - Upserts into Prisma Blog table by slug
*/

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const TurndownService = require('turndown');

const prisma = new PrismaClient();
const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

const BLOG_ROOT = path.join(process.cwd(), 'app', 'blog');
const HTML_REGEX = /dangerouslySetInnerHTML=\{\{ __html: ("[\s\S]*?") \}\}/;

function extractMarkdownFromTsx(contentTsxPath) {
  if (!fs.existsSync(contentTsxPath)) return null;
  try {
    const tsx = fs.readFileSync(contentTsxPath, 'utf-8');
    const match = tsx.match(HTML_REGEX);
    if (!match || !match[1]) return null;
    const htmlString = JSON.parse(match[1]);
    return turndown.turndown(htmlString);
  } catch (e) {
    console.error('Failed to extract markdown from TSX:', contentTsxPath, e.message);
    return null;
  }
}

async function backfill() {
  if (!fs.existsSync(BLOG_ROOT)) {
    console.log('No app/blog directory found; nothing to backfill.');
    return;
  }

  const entries = fs.readdirSync(BLOG_ROOT, { withFileTypes: true });
  const slugs = entries
    .filter(e => e.isDirectory())
    // Skip dynamic route folders like [slug]
    .map(e => e.name)
    .filter(name => !name.startsWith('['));

  const results = [];

  for (const slug of slugs) {
    const dir = path.join(BLOG_ROOT, slug);
    const metaPath = path.join(dir, 'meta.json');
    const mdPath = path.join(dir, 'content.md');
    const tsxPath = path.join(dir, 'content.tsx');

    let meta = {};
    if (fs.existsSync(metaPath)) {
      try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')); } catch {}
    }

    // Prefer content.md; fallback to extracting from content.tsx
    let markdown = '';
    if (fs.existsSync(mdPath)) {
      try { markdown = fs.readFileSync(mdPath, 'utf-8'); } catch {}
    }
    if (!markdown) {
      const extracted = extractMarkdownFromTsx(tsxPath);
      if (extracted) markdown = extracted;
    }

    const title = meta.title || slug.replace(/-/g, ' ');
    const author = meta.author || 'Admin';
    const category = meta.category || 'General';
    const short_description = meta.short_description || '';
    const image = meta.image || null;
    const createdAt = meta.createdAt ? new Date(meta.createdAt) : new Date();

    try {
      await prisma.blog.upsert({
        where: { slug },
        update: {
          title,
          author,
          category,
          description: markdown || '',
          short_description,
          image,
          updatedAt: new Date(),
        },
        create: {
          slug,
          title,
          author,
          category,
          description: markdown || '',
          short_description,
          image,
          createdAt,
        },
      });
      results.push({ slug, status: 'ok', hasMarkdown: !!markdown });
      console.log(`Backfilled ${slug} ${markdown ? '(markdown ok)' : '(no markdown)'}`);
    } catch (e) {
      results.push({ slug, status: 'error', error: e.message });
      console.error(`Failed to backfill ${slug}:`, e.message);
    }
  }

  const ok = results.filter(r => r.status === 'ok').length;
  const errs = results.filter(r => r.status === 'error').length;
  console.log(`\nBackfill complete. Success: ${ok}, Errors: ${errs}`);
}

backfill()
  .catch(e => { console.error('Backfill crashed:', e); process.exitCode = 1; })
  .finally(async () => { await prisma.$disconnect(); });
