const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

const HTML_REGEX = /dangerouslySetInnerHTML=\{\{ __html: ("[\s\S]*?") \}\}/;

const blogsDir = path.join(process.cwd(), 'app', 'blog');
const blogDirs = fs.readdirSync(blogsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${blogDirs.length} blog directories\n`);

let successCount = 0;
let skipCount = 0;
let errorCount = 0;

for (const blogSlug of blogDirs) {
  const blogPath = path.join(blogsDir, blogSlug);
  const contentTsxPath = path.join(blogPath, 'content.tsx');
  const contentMdPath = path.join(blogPath, 'content.md');
  
  // Skip if content.md already exists
  if (fs.existsSync(contentMdPath)) {
    console.log(`⏭️  Skipping ${blogSlug} (content.md already exists)`);
    skipCount++;
    continue;
  }
  
  // Skip if content.tsx doesn't exist
  if (!fs.existsSync(contentTsxPath)) {
    console.log(`⚠️  Skipping ${blogSlug} (no content.tsx found)`);
    skipCount++;
    continue;
  }
  
  try {
    const tsx = fs.readFileSync(contentTsxPath, 'utf-8');
    const match = tsx.match(HTML_REGEX);
    
    if (!match || !match[1]) {
      console.log(`❌ ${blogSlug}: No HTML content found in content.tsx`);
      errorCount++;
      continue;
    }
    
    const htmlString = JSON.parse(match[1]);
    const markdown = turndown.turndown(htmlString);
    
    fs.writeFileSync(contentMdPath, markdown, 'utf-8');
    console.log(`✅ ${blogSlug}: Generated content.md (${markdown.length} chars)`);
    successCount++;
    
  } catch (error) {
    console.log(`❌ ${blogSlug}: Error - ${error.message}`);
    errorCount++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Generated: ${successCount}`);
console.log(`   ⏭️  Skipped: ${skipCount}`);
console.log(`   ❌ Errors: ${errorCount}`);
