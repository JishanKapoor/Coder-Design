"""Create content.tsx and page.tsx for all blog directories that only have meta.json."""
import urllib.request
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "app", "blog")
EXISTING_COMPLETE = {"ai-business", "mobile-app-development-guide-2025", "mobile-design"}

CATEGORY_LINKS = {
    "AI SEO & AEO Services": "/seo-management",
    "Full-Stack Development": "/full-stack-engineering",
    "Mobile App Development": "/mobile-app-development",
    "AI & Machine Learning": "/ai-workflow",
}

CATEGORY_CTAS = {
    "AI & Machine Learning": ("Build an AI Feature", "AI Strategy Call"),
    "AI SEO & AEO Services": ("Boost Your Rankings", "SEO Strategy Call"),
    "Full-Stack Development": ("Start Your Project", "Discuss Architecture"),
    "Mobile App Development": ("Build Your App", "App Strategy Call"),
}


def fetch_page(slug):
    url = f"https://www.coderdesign.com/blog/{slug}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    resp = urllib.request.urlopen(req, timeout=60)
    return resp.read().decode("utf-8", errors="replace")


def extract_blog_content_html(page_html):
    """Extract the raw HTML inside the blog-content div."""
    # Pattern: <div class="blog-content" ...>CONTENT</div> inside <article>
    # The content is in dangerouslySetInnerHTML so it's rendered as raw HTML
    # In the static export, it appears as:
    # <div class="blog-content">...actual HTML content...</div>
    
    # Try multiple patterns
    patterns = [
        # Standard blog-content div
        r'<div\s+class="blog-content"[^>]*>(.*?)</div>\s*</div>\s*</article>',
        r'<div\s+class="blog-content">(.*?)</div>\s*</div>\s*</article>',
        # Broader: content between blog-content opening and closing
        r'class="blog-content"[^>]*>(.*?)</div>\s*</div>\s*</(?:article|section)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, page_html, re.DOTALL)
        if match:
            content = match.group(1).strip()
            if len(content) > 100:  # meaningful content
                return content
    
    return None


def escape_for_tsx(html_content):
    """Escape HTML content for use in a TSX template literal."""
    # Replace backticks and ${} to avoid template literal issues
    content = html_content.replace('\\', '\\\\')
    content = content.replace('`', '\\`')
    content = content.replace('${', '\\${')
    return content


def create_content_tsx(slug, meta, blog_html):
    """Create the content.tsx file for a blog post."""
    category = meta.get("category", "AI & Machine Learning")
    category_link = CATEGORY_LINKS.get(category, "/blogs")
    cta_primary, cta_secondary = CATEGORY_CTAS.get(category, ("Start Your Project", "Schedule a Call"))
    
    escaped_html = escape_for_tsx(blog_html)
    
    return f'''"use client";
import {{ useState }} from "react";
import {{ Navigation }} from "../../components/Navigation";
import {{ FooterSection }} from "../../components/FooterSection";
import {{ Calendar, Clock, User, ArrowLeft, X }} from "lucide-react";
import {{ Button }} from "../../components/ui/button";
import Link from "next/link";
import "../blog-content.css";
import meta from "./meta.json";
import {{ motion }} from "framer-motion";
import {{ modalBackdropVariants, modalContentVariants }} from "../../animations/variants";
const categoryLinks: {{ [key: string]: string }} = {{
  "AI SEO & AEO Services": "/seo-management",
  "Full-Stack Development": "/full-stack-engineering",
  "Mobile App Development": "/mobile-app-development",
  "AI & Machine Learning": "/ai-workflow",
}};
export default function BlogPost() {{
  const [showCalendar, setShowCalendar] = useState(false);
  const category = "{category}";
  const categoryLink = categoryLinks[category as keyof typeof categoryLinks] || "/blogs";
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className={{"relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-20 lg:py-28"}}>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <div>
            <div className="mb-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to Blogs
              </Link>
            </div>
            <div className="mb-6">
              <Link
                href={{categoryLink}}
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <span>{{category}}</span>
              </Link>
            </div>
            <h1 className="mb-6 text-white">{{meta.title}}</h1>
            <div className="mb-8 flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{{meta.author}}</span>
                <span className="text-xs text-white/60">Contributor</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{{new Date(meta.createdAt).toLocaleDateString("en-US", {{ year: "numeric", month: "long", day: "numeric" }})}}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{{meta.readTime || 8}} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={{() => setShowCalendar(true)}}
                className="bg-white text-violet-700 hover:bg-white/90"
              >
                {cta_primary}
              </Button>
              <Button
                onClick={{() => setShowCalendar(true)}}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {cta_secondary}
              </Button>
            </div>
          </div>
        </div>
      </section>
      {{meta.image && (
        <div className="mx-auto max-w-4xl px-6 lg:px-12 -mt-12">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
            <img src={{meta.image}} alt={{meta.title}} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      )}}
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{{{ __html: `{escaped_html}` }}}} />
        </div>
      </article>
      <section className="bg-violet-600 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-2xl font-bold">Ready to Start Your Project?</h2>
          <p className="mb-8 text-white/80">Let&apos;s discuss how we can help bring your ideas to life with expert development and strategy.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={{() => setShowCalendar(true)}} className="bg-white text-violet-700 hover:bg-white/90">
              Book a Consultation
            </Button>
            <Link href="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <FooterSection />
      {{showCalendar && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={{modalBackdropVariants}} initial="hidden" animate="visible" exit="hidden"
          onClick={{() => setShowCalendar(false)}}
        >
          <motion.div
            className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            variants={{modalContentVariants}} initial="hidden" animate="visible"
            onClick={{(e) => e.stopPropagation()}}
          >
            <button onClick={{() => setShowCalendar(false)}} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </button>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Schedule a Consultation</h3>
            <p className="mb-4 text-sm text-slate-600">Book a free 30-minute consultation to discuss your project.</p>
            <div className="flex gap-3">
              <a href="https://calendly.com/coderdesign/30min" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-violet-600 text-white hover:bg-violet-700">Book on Calendly</Button>
              </a>
              <Link href="/contact" className="flex-1">
                <Button variant="outline" className="w-full">Contact Form</Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}}
    </div>
  );
}}
'''


def create_page_tsx(slug, meta):
    """Create the page.tsx file for a blog post."""
    return f'''import type {{ Metadata }} from "next";
import Content from "./content";
import meta from "./meta.json";

export const dynamic = "force-static";

export const metadata: Metadata = {{
  title: `${{meta.title}} | CoderDesign Blog`,
  description: meta.short_description,
  openGraph: {{
    title: meta.title,
    description: meta.short_description,
    url: `https://coderdesign.com/blog/${{meta.slug}}`,
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "article",
    images: [{{ url: meta.image ? `https://coderdesign.com${{meta.image}}` : "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: meta.title }}],
  }},
  twitter: {{
    card: "summary_large_image",
    title: meta.title,
    description: meta.short_description,
    images: [meta.image ? `https://coderdesign.com${{meta.image}}` : "https://coderdesign.com/og-image.png"],
  }},
  alternates: {{
    canonical: `https://coderdesign.com/blog/${{meta.slug}}`,
  }},
}};

const articleJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": meta.title,
  "description": meta.short_description,
  "author": {{ "@type": "Organization", "name": "CoderDesign", "url": "https://coderdesign.com" }},
  "publisher": {{ "@type": "Organization", "name": "CoderDesign", "url": "https://coderdesign.com", "logo": {{ "@type": "ImageObject", "url": "https://coderdesign.com/og-image.png" }} }},
  "datePublished": meta.createdAt,
  "dateModified": meta.createdAt,
  "image": meta.image ? `https://coderdesign.com${{meta.image}}` : "https://coderdesign.com/og-image.png",
  "url": `https://coderdesign.com/blog/${{meta.slug}}`,
  "mainEntityOfPage": `https://coderdesign.com/blog/${{meta.slug}}`,
}};

export default function Page() {{
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(articleJsonLd) }}}} />
      <Content />
    </>
  );
}}
'''


# Process all blog directories
blog_dirs = [d for d in os.listdir(BASE_DIR) 
             if os.path.isdir(os.path.join(BASE_DIR, d)) and d not in EXISTING_COMPLETE]

ok = 0
fail = 0
skipped = 0

for slug in sorted(blog_dirs):
    blog_dir = os.path.join(BASE_DIR, slug)
    meta_path = os.path.join(blog_dir, "meta.json")
    page_path = os.path.join(blog_dir, "page.tsx")
    content_path = os.path.join(blog_dir, "content.tsx")
    
    if not os.path.exists(meta_path):
        print(f"SKIP {slug}: no meta.json")
        skipped += 1
        continue
    
    if os.path.exists(page_path) and os.path.exists(content_path):
        print(f"SKIP {slug}: already complete")
        skipped += 1
        continue
    
    with open(meta_path, "r", encoding="utf-8") as f:
        meta = json.load(f)
    
    # Fetch the blog content from production
    try:
        page_html = fetch_page(slug)
        blog_html = extract_blog_content_html(page_html)
        
        if not blog_html:
            print(f"WARN {slug}: could not extract content, using placeholder")
            blog_html = f"<h1>{meta['title']}</h1><p>{meta.get('short_description', '')}</p>"
        
        # Create content.tsx
        content_tsx = create_content_tsx(slug, meta, blog_html)
        with open(content_path, "w", encoding="utf-8") as f:
            f.write(content_tsx)
        
        # Create page.tsx
        page_tsx = create_page_tsx(slug, meta)
        with open(page_path, "w", encoding="utf-8") as f:
            f.write(page_tsx)
        
        content_len = len(blog_html)
        print(f"OK {slug}: content={content_len} chars")
        ok += 1
        
    except Exception as e:
        print(f"FAIL {slug}: {e}")
        fail += 1

print(f"\nDone: {ok} created, {fail} failed, {skipped} skipped")
