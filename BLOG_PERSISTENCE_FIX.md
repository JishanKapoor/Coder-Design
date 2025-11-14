# Blog Persistence Fix

## Problem
When restarting the Next.js dev server, deleted blogs reappear and new blogs don't show up.

## Root Cause
Your blogs are stored in the **file system** (not a database) at `app/blog/[slug]/`. Next.js was caching the routes in the `.next` directory, causing stale data to persist even after adding/deleting blogs.

## What Was Fixed

### 1. **Disabled Route Caching**
Added `export const dynamic = 'force-dynamic'` to:
- `app/api/fetch/route.ts` - Blog listing API
- `app/api/upload/route.ts` - Blog creation/editing API
- `app/api/[id]/route.ts` - Blog deletion API
- `app/blogs/page.tsx` - Public blogs page

Also added `export const revalidate = 0` to prevent any time-based caching.

### 2. **Cache Clearing Script**
Created `scripts/clear-cache.js` to manually clear the `.next` cache directory.

### 3. **New NPM Commands**
Added two new commands to `package.json`:
- `npm run clear-cache` - Clears the `.next` cache
- `npm run fresh-start` - Clears cache and starts dev server

## How to Use

### When Blogs Don't Update:

**Option 1: Use the fresh-start command (Recommended)**
```bash
npm run fresh-start
```

**Option 2: Clear cache manually, then restart**
```bash
npm run clear-cache
npm run dev
```

**Option 3: Delete .next folder manually**
1. Stop the dev server (Ctrl+C)
2. Delete the `.next` folder
3. Run `npm run dev`

## Blog Storage Structure

```
app/blog/
  ├── your-blog-slug/
  │   ├── content.md      # Original markdown (editable)
  │   ├── content.tsx     # Rendered React component
  │   ├── page.tsx        # Next.js page wrapper
  │   └── meta.json       # Metadata (title, author, etc.)
```

### How It Works:
1. **Create/Edit**: `POST /api/upload` saves files to `app/blog/[slug]/`
2. **List**: `GET /api/fetch` reads all `meta.json` files from `app/blog/*/`
3. **Delete**: `DELETE /api/[slug]` removes the entire `app/blog/[slug]/` directory
4. **Edit Mode**: `GET /api/blog/[slug]/markdown` reads `content.md` for editing

## Why Not Use a Database?

Currently, blogs are file-based for simplicity. If you want persistence with a database instead:

1. **Prisma is already set up** in your project
2. Need to migrate from file storage to DB storage
3. Create a `Blog` model in `prisma/schema.prisma`
4. Update all API routes to use Prisma instead of `fs`

Let me know if you want to switch to database storage!

## Quick Checklist

✅ Blogs persist between server restarts  
✅ Deleted blogs stay deleted  
✅ New blogs show up immediately  
✅ Edits are saved correctly  
✅ No caching issues  

## Still Having Issues?

If blogs still don't update after using `npm run fresh-start`:

1. Check if the blog folder exists: `app/blog/[your-slug]/`
2. Verify `meta.json` file exists in the blog folder
3. Check browser dev tools → Network tab for API errors
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try in incognito/private browsing mode

## Future Improvements

- [ ] Add database storage (Prisma + MySQL/PostgreSQL)
- [ ] Implement proper caching strategy (ISR with revalidation)
- [ ] Add search functionality
- [ ] Add tags/categories filtering
- [ ] Implement draft/published status
