"""Download all original Unsplash images and save locally."""
import urllib.request
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

base = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "images")
os.makedirs(base, exist_ok=True)

images = {
    # Hero.tsx - dashboard image
    "hero-dashboard.jpg": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    # Full-stack hero
    "hero-fullstack.jpg": "https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    # Mobile app hero
    "hero-mobile.jpg": "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    # AI workflow hero
    "hero-ai.jpg": "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1080",
    # SEO hero
    "hero-seo.jpg": "https://images.unsplash.com/photo-1712571664162-602064e30014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    # About team images
    "team-engineering.jpg": "https://images.unsplash.com/photo-1752170080635-db168448f85d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "team-ai.jpg": "https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "team-seo.jpg": "https://images.unsplash.com/photo-1666698809123-44e998e93f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "team-leadership.jpg": "https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    # Testimonial profile images
    "testimonial-arjun.jpg": "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "testimonial-sarah.jpg": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "testimonial-michael.jpg": "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
}

ok = 0
fail = 0
for name, url in images.items():
    fpath = os.path.join(base, name)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=30)
        data = resp.read()
        with open(fpath, "wb") as f:
            f.write(data)
        print(f"OK {name}: {len(data)//1024}KB")
        ok += 1
    except Exception as e:
        print(f"FAIL {name}: {e}")
        fail += 1

print(f"\nDone: {ok} downloaded, {fail} failed")
