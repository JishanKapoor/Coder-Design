"""
Fix critical SEO issues across all 28 blogs:
1. Remove base64 images from meta.json (broken og:image, JS bloat)
2. Remove duplicate <h1> from dangerouslySetInnerHTML in content.tsx
3. Report results
"""
import os
import json
import re

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "app", "blog")

stats = {"meta_fixed": 0, "h1_fixed": 0, "errors": []}

# ── Fix 1: Strip base64 images from meta.json ──
for slug in sorted(os.listdir(BLOG_DIR)):
    slug_dir = os.path.join(BLOG_DIR, slug)
    if not os.path.isdir(slug_dir):
        continue

    meta_path = os.path.join(slug_dir, "meta.json")
    if os.path.exists(meta_path):
        try:
            with open(meta_path, "r", encoding="utf-8") as f:
                meta = json.load(f)

            img = meta.get("image", None)
            if img and not img.startswith("/"):
                # Base64 or invalid image — clear it
                old_len = len(img)
                meta["image"] = None
                with open(meta_path, "w", encoding="utf-8") as f:
                    json.dump(meta, f, indent=2, ensure_ascii=False)
                print(f"  ✅ {slug}/meta.json — removed base64 image ({old_len:,} chars)")
                stats["meta_fixed"] += 1
            else:
                status = f"valid path: {img}" if img else "already null"
                print(f"  ⏭️  {slug}/meta.json — {status}")
        except Exception as e:
            stats["errors"].append(f"meta.json {slug}: {e}")
            print(f"  ❌ {slug}/meta.json — ERROR: {e}")

print(f"\n{'='*60}")
print(f"Meta.json: Fixed {stats['meta_fixed']} files\n")

# ── Fix 2: Remove duplicate <h1> from dangerouslySetInnerHTML ──
for slug in sorted(os.listdir(BLOG_DIR)):
    slug_dir = os.path.join(BLOG_DIR, slug)
    if not os.path.isdir(slug_dir):
        continue

    content_path = os.path.join(slug_dir, "content.tsx")
    if not os.path.exists(content_path):
        continue

    try:
        with open(content_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Count h1 tags
        h1_matches = re.findall(r'<h1[\s>]', content)
        if len(h1_matches) < 2:
            print(f"  ⏭️  {slug}/content.tsx — {len(h1_matches)} h1 tag(s), OK")
            continue

        # The first <h1> is in the hero JSX (keep it)
        # The second <h1> is inside dangerouslySetInnerHTML (remove it)
        # Pattern: inside the HTML string, find <h1>...</h1>\n and replace with empty
        # The dangerouslySetInnerHTML content starts after __html:
        
        # Find the dangerouslySetInnerHTML section
        inner_html_match = re.search(r'dangerouslySetInnerHTML=\{\{.*?__html:\s*[`"\']', content)
        if not inner_html_match:
            print(f"  ⏭️  {slug}/content.tsx — no dangerouslySetInnerHTML found")
            continue

        start_pos = inner_html_match.end()
        
        # Find the first <h1>...</h1> after the dangerouslySetInnerHTML start
        h1_in_html = re.search(r'<h1[^>]*>.*?</h1>\s*\\?\n?', content[start_pos:])
        if h1_in_html:
            # Calculate absolute positions
            abs_start = start_pos + h1_in_html.start()
            abs_end = start_pos + h1_in_html.end()
            
            removed_text = content[abs_start:abs_end].strip()[:80]
            content = content[:abs_start] + content[abs_end:]
            
            with open(content_path, "w", encoding="utf-8") as f:
                f.write(content)
            
            print(f"  ✅ {slug}/content.tsx — removed duplicate h1: {removed_text}...")
            stats["h1_fixed"] += 1
        else:
            print(f"  ⏭️  {slug}/content.tsx — no h1 in dangerouslySetInnerHTML")
            
    except Exception as e:
        stats["errors"].append(f"content.tsx {slug}: {e}")
        print(f"  ❌ {slug}/content.tsx — ERROR: {e}")

print(f"\n{'='*60}")
print(f"Content.tsx h1 fix: Fixed {stats['h1_fixed']} files")
print(f"Total errors: {len(stats['errors'])}")
for err in stats["errors"]:
    print(f"  ❌ {err}")
print(f"\nDone! Fixed {stats['meta_fixed']} meta.json + {stats['h1_fixed']} content.tsx files")
