# API Routes - Development Only

## ⚠️ Important Note

The API routes in this folder (`api-routes-dev-only/`) are **NOT included in the static export** build that gets deployed to GoDaddy.

### Why?
GoDaddy shared hosting only supports static files (HTML, CSS, JavaScript). It cannot run Node.js API routes.

### What This Means

**During Development (Local):**
- To use admin features (blog management), temporarily move this folder back:
  ```powershell
  Move-Item "api-routes-dev-only" "app/api"
  ```
- Run `npm run dev`
- Use `/manage-blogs`, `/upload-blog`, `/edit-blog` features
- When done, move it back before building:
  ```powershell
  Move-Item "app/api" "api-routes-dev-only"
  ```

**For Production (GoDaddy):**
- Build without API routes: `npm run build`
- Deploy the `out/` folder
- Admin features won't work on live site (expected behavior)

### Alternative Solutions

If you need admin features on the live site:

1. **Option A - Vercel/Netlify (Recommended)**
   - Deploy to Vercel (free) instead of GoDaddy
   - API routes work out of the box
   - Keep full admin functionality
   - Connect your custom domain

2. **Option B - Separate Backend**
   - Deploy API routes to Railway, Render, or Heroku
   - Update fetch URLs to point to external API
   - Keep static site on GoDaddy

3. **Option C - Headless CMS**
   - Use Contentful, Strapi, or Sanity for blog management
   - Static site reads from CMS API at build time
   - Manage content through CMS dashboard

### Files in This Folder

- `[id]/route.ts` - Delete blog endpoint
- `blog/[slug]/route.ts` - Update blog endpoint
- `blog/[slug]/markdown/route.ts` - Get markdown for editing
- `fetch/route.ts` - List all blogs (replaced by static generation)
- `upload/route.ts` - Create new blog

### Recommendation

For the best experience with GoDaddy hosting:
1. Manage all blog content locally during development
2. Build the static site when content is finalized
3. Upload to GoDaddy
4. For content updates, repeat the process

---

**Note:** This folder is automatically excluded from the build when `output: 'export'` is set in `next.config.ts`.
