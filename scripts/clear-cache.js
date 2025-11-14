const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

if (fs.existsSync(nextDir)) {
  console.log('🗑️  Clearing .next cache directory...');
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('✅ Cache cleared successfully!');
  console.log('💡 Restart your dev server with: npm run dev');
} else {
  console.log('ℹ️  No .next cache found.');
}
