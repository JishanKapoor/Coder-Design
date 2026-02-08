"""Download all blog data from production coderdesign.com and create local blog directories."""
import urllib.request
import json
import os
import re
import html
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "app", "blog")

# All slugs from production that we DON'T have locally
EXISTING = {"ai-business", "mobile-app-development-guide-2025", "mobile-design"}
ALL_SLUGS = [
    "affordable-seo-services-for-small-businesses-in-new-york",
    "ai-black-box-ethical-transparency-2025",
    "ai-ethics-in-2025-navigating-moral-dilemmas",
    "ai-powered-language-models-transform-healthcare-diagnostics-in-2025",
    "ai-powered-seo-aeo-services-in-new-york-for-next-level-marketing",
    "ai-voice-bots-how-they-work-why-they-matter",
    "ai-vs-writers-the-new-creative-frontier",
    "best-ai-consulting-firms-in-manhattan-2025",
    "best-mobile-app-development-firms-in-new-york",
    "expert-ai-seo-aeo-services-in-new-york-to-boost-your-rankings",
    "flutter-310-released-with-new-features-and-performance-improvements",
    "full-stack-developers-in-new-york",
    "googles-ai-seo-revolution-unveiled",
    "how-ai-powered-search-sge-impacts-your-google-business-profile-ranking",
    "how-apple-broke-the-free-app-economy",
    "how-to-implement-ai-solutions-for-startups-in-brooklyn",
    "is-kubernetes-overkill-for-startups",
    "leading-ai-machine-learning-experts-in-new-york",
    "local-seo",
    "master-ai-driven-seo-aeo-in-2025",
    "mobile-app-development-in-2025-complete-guide-to-building-successful-apps",
    "new-yorks-best-ai-machine-learning-companies",
    "premier-ai-seo-aeo-services-in-new-york",
    "top-full-stack-development-companies-in-new-york",
    "top-tools-for-full-stack-web-development-services-in-queens-ny",
    "why-gemini-3-is-the-next-big-leap",
]

MISSING = [s for s in ALL_SLUGS if s not in EXISTING]


def fetch_page(slug):
    """Fetch the blog page HTML from production."""
    url = f"https://www.coderdesign.com/blog/{slug}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    resp = urllib.request.urlopen(req, timeout=30)
    return resp.read().decode("utf-8", errors="replace")


def extract_json_ld(html_text):
    """Extract BlogPosting JSON-LD from page HTML."""
    pattern = r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>'
    matches = re.findall(pattern, html_text, re.DOTALL)
    for m in matches:
        try:
            data = json.loads(m)
            if isinstance(data, dict) and data.get("@type") == "BlogPosting":
                return data
        except json.JSONDecodeError:
            continue
    return None


def extract_meta_from_html(html_text, slug):
    """Extract blog metadata from the HTML page."""
    # Try JSON-LD first
    jsonld = extract_json_ld(html_text)
    
    # Extract title from og:title or <title>
    title_match = re.search(r'<meta[^>]*property="og:title"[^>]*content="([^"]*)"', html_text)
    if not title_match:
        title_match = re.search(r'<title>([^<]*)</title>', html_text)
    title = html.unescape(title_match.group(1).replace(" | CoderDesign Blog", "").replace(" - CoderDesign", "")) if title_match else slug.replace("-", " ").title()
    
    # Extract description
    desc_match = re.search(r'<meta[^>]*property="og:description"[^>]*content="([^"]*)"', html_text)
    if not desc_match:
        desc_match = re.search(r'<meta[^>]*name="description"[^>]*content="([^"]*)"', html_text)
    description = html.unescape(desc_match.group(1)) if desc_match else ""
    
    # Extract image
    img_match = re.search(r'<meta[^>]*property="og:image"[^>]*content="([^"]*)"', html_text)
    image = img_match.group(1) if img_match else None
    if image and "coderdesign.com" in image:
        # Convert absolute URL to relative path
        image = re.sub(r'https?://[^/]+', '', image)
    
    # Extract date
    date = None
    if jsonld and jsonld.get("datePublished"):
        date = jsonld["datePublished"]
    if not date:
        date_match = re.search(r'"datePublished"\s*:\s*"([^"]*)"', html_text)
        date = date_match.group(1) if date_match else "2025-01-01T00:00:00.000Z"
    
    # Extract category from breadcrumb or page content
    category = "AI & Machine Learning"  # default
    if "seo" in slug.lower() or "aeo" in slug.lower():
        category = "AI SEO & AEO Services"
    elif "full-stack" in slug.lower() or "full stack" in slug.lower():
        category = "Full-Stack Development"
    elif "mobile" in slug.lower() or "flutter" in slug.lower() or "app" in slug.lower():
        category = "Mobile App Development"
    elif "ai" in slug.lower() or "machine-learning" in slug.lower() or "chatbot" in slug.lower():
        category = "AI & Machine Learning"
    elif "kubernetes" in slug.lower() or "devops" in slug.lower():
        category = "Full-Stack Development"
    
    # Extract readTime
    read_match = re.search(r'(\d+)\s*min\s*read', html_text)
    read_time = int(read_match.group(1)) if read_match else 8
    
    return {
        "id": int(round(
            (2025 - 1970) * 365.25 * 24 * 3600 * 1000 + 
            hash(slug) % (365 * 24 * 3600 * 1000)
        )),
        "slug": slug,
        "title": title,
        "author": "CoderDesign Team",
        "category": category,
        "image": image,
        "createdAt": date,
        "short_description": description,
        "readTime": read_time
    }


def extract_blog_content(html_text):
    """Extract the main blog article content from HTML."""
    # Try to find the blog-content div
    content_match = re.search(r'<div[^>]*class="[^"]*blog-content[^"]*"[^>]*>(.*?)</div>\s*</div>\s*</section>', html_text, re.DOTALL)
    if not content_match:
        # Try broader extraction
        content_match = re.search(r'<article[^>]*>(.*?)</article>', html_text, re.DOTALL)
    if not content_match:
        # Try the content between header and footer
        content_match = re.search(r'class="blog-content[^"]*"[^>]*>(.*?)<(?:footer|section[^>]*class="[^"]*bg-slate)', html_text, re.DOTALL)
    
    if content_match:
        return content_match.group(1).strip()
    return ""


ok = 0
fail = 0
for slug in MISSING:
    try:
        page_html = fetch_page(slug)
        meta = extract_meta_from_html(page_html, slug)
        blog_content = extract_blog_content(page_html)
        
        # Create directory
        blog_dir = os.path.join(BASE_DIR, slug)
        os.makedirs(blog_dir, exist_ok=True)
        
        # Write meta.json
        with open(os.path.join(blog_dir, "meta.json"), "w", encoding="utf-8") as f:
            json.dump(meta, f, indent=2, ensure_ascii=False)
        
        print(f"OK {slug}: title='{meta['title'][:50]}...' cat={meta['category']}")
        ok += 1
    except Exception as e:
        print(f"FAIL {slug}: {e}")
        fail += 1

print(f"\nDone: {ok} blogs created, {fail} failed")
