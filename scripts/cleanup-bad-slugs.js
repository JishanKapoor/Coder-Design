const { PrismaClient } = require('@prisma/client');

async function run() {
  const prisma = new PrismaClient();
  try {
    const res = await prisma.blog.deleteMany({ where: { slug: { startsWith: '[' } } });
    console.log(`Deleted ${res.count} invalid slug rows (starting with '[').`);
  } catch (e) {
    console.error('Cleanup failed:', e.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

run();
