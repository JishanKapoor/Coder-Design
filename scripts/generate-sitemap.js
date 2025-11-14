const fs = require('fs');
const path = require('path');

function generate() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coderdesign.com';
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { loc: `${baseUrl}/`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${baseUrl}/full-stack-engineering`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/mobile-app-development`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/ai-workflow`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/seo-management`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/contact`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/about`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/blogs`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/privacy`, changefreq: 'yearly', priority: '0.3' },
    { loc: `${baseUrl}/terms`, changefreq: 'yearly', priority: '0.3' },
  ];

  const blogDir = path.join(process.cwd(), 'app', 'blog');
  let blogSlugs = [];
  if (fs.existsSync(blogDir)) {
    blogSlugs = fs
      .readdirSync(blogDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== '[slug]')
      .map((d) => d.name);
  }

  const blogEntries = blogSlugs.map((slug) => ({
    loc: `${baseUrl}/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.6',
  }));

  const entries = [...staticRoutes, ...blogEntries]
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join('\n\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n${entries}\n\n</urlset>\n`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf-8');

  const appPublicDir = path.join(process.cwd(), 'app', 'public');
  if (fs.existsSync(appPublicDir)) {
    try {
      fs.writeFileSync(path.join(appPublicDir, 'sitemap.xml'), xml, 'utf-8');
    } catch {}
  }

  console.log(`✅ Sitemap generated with ${blogSlugs.length} blog(s)`);
}

if (require.main === module) {
  generate();
}

module.exports = { generate };
