const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function updateReadTime() {
  try {
    const blogs = await prisma.blog.findMany();
    
    for (const blog of blogs) {
      // Check if meta.json exists and has readTime
      const metaPath = path.join(process.cwd(), 'app', 'blog', blog.slug, 'meta.json');
      let readTime = 7; // default
      
      if (fs.existsSync(metaPath)) {
        try {
          const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
          if (meta.readTime) {
            readTime = meta.readTime;
          }
        } catch (e) {
          console.log(`Could not read meta for ${blog.slug}`);
        }
      }
      
      // Update blog with readTime
      await prisma.blog.update({
        where: { id: blog.id },
        data: { readTime }
      });
      
      console.log(`Updated ${blog.slug} with readTime: ${readTime}`);
    }
    
    console.log('\n✅ All blogs updated with readTime');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateReadTime();
