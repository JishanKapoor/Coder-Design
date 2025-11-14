# GoDaddy Shared Hosting Deployment Guide

## Overview
This Next.js site is now configured for **static export**, making it compatible with GoDaddy shared hosting. The site will be pre-rendered as static HTML/CSS/JS files.

## Important Notes

### ⚠️ API Routes Limitation
GoDaddy shared hosting **does not support Node.js API routes**. The following features require alternative solutions:

**Current API Routes (Won't Work on GoDaddy):**
- `/api/upload` - Blog creation
- `/api/fetch` - Blog listing (replaced by static generation)
- `/api/blog/[slug]` - Blog updates
- `/api/[id]` - Blog deletion

**Solutions:**
1. **Option A (Recommended)**: Use the blog management features ONLY during development. Build and deploy the static site after adding/editing blogs locally.
2. **Option B**: Set up a separate Node.js backend (e.g., Vercel, Netlify, Railway) for blog management APIs
3. **Option C**: Use a headless CMS (Contentful, Strapi, Sanity) for blog management

### ✅ What Works on GoDaddy
- All public pages (home, about, services, blogs listing)
- All static blog posts
- Contact forms (using client-side email service or FormSpree)
- All animations and styling
- Image serving from `/public/uploads/`

## Build & Deploy Instructions

### Step 1: Build the Static Site
```bash
npm run build
```

This will generate a static version in the `out/` directory.

### Step 2: Test the Build Locally
```bash
# Install a simple HTTP server
npm install -g serve

# Serve the out directory
serve out
```

Visit http://localhost:3000 to verify everything works.

### Step 3: Upload to GoDaddy

1. **Connect to GoDaddy via FTP/SFTP:**
   - Use FileZilla or your preferred FTP client
   - Host: Your domain (e.g., ftp.yourdomain.com)
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 22 (SFTP)

2. **Upload Files:**
   - Navigate to `public_html` folder (or your domain's root)
   - Upload ALL contents from the `out/` folder
   - Make sure `.htaccess` is uploaded (it's in the `out/` folder)

3. **Set Permissions:**
   - Folders: 755
   - Files: 644

### Step 4: Configure Domain
- In GoDaddy cPanel, set your domain document root to point to the upload location
- Clear any existing files in that directory first

## File Structure After Upload
```
public_html/
├── .htaccess
├── index.html
├── 404.html
├── _next/
│   ├── static/
│   └── ...
├── uploads/
│   └── (your uploaded images)
├── about/
│   └── index.html
├── blogs/
│   └── index.html
├── blog/
│   └── mobile-app-development-guide-2025/
│       └── index.html
└── ... (other pages)
```

## Managing Blog Content

### Adding New Blogs (Development Only)
1. Run site locally: `npm run dev`
2. Go to `/manage-blogs`
3. Create/edit blogs using the admin interface
4. Once done, rebuild: `npm run build`
5. Re-upload the `out/` folder to GoDaddy

### Blog Content Structure
Each blog is a folder in `/app/blog/[slug]/` containing:
- `page.tsx` - Page wrapper
- `content.tsx` - Blog content component
- `content.md` - Markdown source
- `meta.json` - Blog metadata

## Performance Optimizations Included

✅ Static HTML generation (instant load)
✅ Code splitting and minification
✅ Gzip compression via .htaccess
✅ Browser caching headers (1 year for images, 1 month for CSS/JS)
✅ Image compression
✅ Lazy loading animations
✅ Optimized webpack configuration

## Expected Performance
- **First Load:** < 1 second (on good hosting)
- **Subsequent Pages:** < 300ms (cached resources)
- **Lighthouse Score:** 90+ across all metrics

## Troubleshooting

### Issue: Pages show 404
**Fix:** Ensure `.htaccess` file is in the root and mod_rewrite is enabled on your GoDaddy hosting.

### Issue: Images not loading
**Fix:** Check that the `/uploads/` folder and all subdirectories were uploaded correctly.

### Issue: Styles not applying
**Fix:** Clear your browser cache and ensure `_next/static/` folder was uploaded.

### Issue: Links not working
**Fix:** Make sure trailing slash is enabled in `next.config.ts` (already configured).

## Updating the Site

1. Make changes locally
2. Test: `npm run dev`
3. Build: `npm run build`
4. Upload only changed files from `out/` folder via FTP
5. Clear browser cache if needed

## Alternative: Vercel Deployment (Free)
If you want to keep the API routes and admin panel functionality:
1. Push code to GitHub
2. Import to Vercel (free for hobby projects)
3. Connect your custom domain
4. Automatic deployments on every push

## SSL Certificate
GoDaddy provides free SSL certificates. Enable it in cPanel → SSL/TLS → Install SSL.

## Support
For issues with:
- **GoDaddy Hosting:** Contact GoDaddy support
- **Site Building:** Review Next.js static export docs
- **Code Issues:** Check the development server logs

---

**Last Updated:** November 2025
**Next.js Version:** 16.0.1
**Build Type:** Static Export
