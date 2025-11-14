// Script: fix-blog-themes.js
// Purpose: Align existing blog post themes (hero/background gradients and button accent color)
//          with their corresponding service page themes.
//
// What it does:
// - Looks at app/blog/<slug>/meta.json for the category
// - Updates the gradients in content.tsx for hero and bottom CTA sections
// - Updates the white button accent text color to match the category
//
// Safe to run multiple times.

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(process.cwd(), 'app', 'blog');

// Centralized theme mapping
const themeByCategory = {
  'Full-Stack Development': { gradient: 'from-violet-600 via-indigo-700 to-purple-800', accentText: 'violet-600' },
  'Mobile App Development': { gradient: 'from-blue-600 via-indigo-700 to-cyan-700', accentText: 'blue-600' },
  'AI & Machine Learning': { gradient: 'from-purple-600 via-fuchsia-600 to-pink-600', accentText: 'purple-600' },
  'AI SEO & AEO Services': { gradient: 'from-violet-600 via-indigo-700 to-purple-800', accentText: 'violet-600' },
};

function updateFile(filePath, replacer) {
  const before = fs.readFileSync(filePath, 'utf-8');
  const after = replacer(before);
  if (after !== before) {
    fs.writeFileSync(filePath, after, 'utf-8');
    return true;
  }
  return false;
}

function fixContentTsx(contentTsxPath, theme) {
  return updateFile(contentTsxPath, (code) => {
    let updated = code;

    // 1) Replace hero gradient: className="... bg-gradient-to-br <old> py-20 ..."
    // Keep everything else, only swap the part between 'bg-gradient-to-br' and 'py-20'
    const heroRegex = /(bg-gradient-to-br)\s+[^"']*(py-20)/;
    updated = updated.replace(heroRegex, (_, a, b) => `${a} ${theme.gradient} ${b}`);

    // 2) Replace bottom CTA gradient: className="bg-gradient-to-br <old> py-20"
    const ctaRegex = /(className=\"bg-gradient-to-br)\s+[^"']*(py-20\")/;
    updated = updated.replace(ctaRegex, (_, a, b) => `${a} ${theme.gradient} ${b}`);

    // 3) Update the white button accent text color in hero
    //    Replace text-<color>-600 in: Button className="gap-2 bg-white text-... hover:bg-white/90"
    const btnRegex = /(Button\s+className=\"[^\"]*bg-white\s+text-)([a-z-]+-\d+)(\s+hover:bg-white\/90[^\"]*\")/;
    updated = updated.replace(btnRegex, (_, pre, _oldColor, post) => `${pre}${theme.accentText}${post}`);

    return updated;
  });
}

function run() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log('No app/blog directory found. Nothing to fix.');
    return;
  }

  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  let changed = 0;
  let scanned = 0;
  let skipped = 0;

  for (const dirent of entries) {
    // skip dynamic folder name like [slug]
    if (dirent.name.startsWith('[')) { skipped++; continue; }

    const postDir = path.join(BLOG_DIR, dirent.name);
    const metaPath = path.join(postDir, 'meta.json');
    const contentTsxPath = path.join(postDir, 'content.tsx');

    if (!fs.existsSync(metaPath) || !fs.existsSync(contentTsxPath)) {
      skipped++;
      continue;
    }

    scanned++;

    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      const category = meta.category;
      const theme = themeByCategory[category];
      if (!theme) { skipped++; continue; }

      const didChange = fixContentTsx(contentTsxPath, theme);
      if (didChange) {
        changed++;
        console.log(`Updated theme for post '${dirent.name}' (category: ${category}).`);
      }
    } catch (e) {
      console.warn(`Warning: Failed processing '${dirent.name}':`, e.message);
      skipped++;
    }
  }

  console.log(`\nFix completed. Scanned: ${scanned}, Changed: ${changed}, Skipped: ${skipped}`);
}

run();
