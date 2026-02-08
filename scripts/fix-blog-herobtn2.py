"""Fix remaining duplicate hero button 2 texts ('AI Strategy Call', 'SEO Strategy Call', 'App Strategy Call')."""
import os

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "app", "blog")

# Hero button 2 replacements
HERO_BTN2_MAP = {
    # "AI Strategy Call" group (Template B hero btn2)
    "ai-black-box-ethical-transparency-2025": ("AI Strategy Call", "Discuss Ethical AI"),
    "ai-ethics-in-2025-navigating-moral-dilemmas": ("AI Strategy Call", "AI Ethics Consultation"),
    "ai-powered-language-models-transform-healthcare-diagnostics-in-2025": ("AI Strategy Call", "Healthcare AI Discussion"),
    "ai-voice-bots-how-they-work-why-they-matter": ("AI Strategy Call", "Voice Bot Demo Call"),
    "ai-vs-writers-the-new-creative-frontier": ("AI Strategy Call", "AI Content Strategy Call"),
    "best-ai-consulting-firms-in-manhattan-2025": ("AI Strategy Call", "Meet Our AI Consultants"),
    
    # "SEO Strategy Call" group (Template B hero btn2)
    "affordable-seo-services-for-small-businesses-in-new-york": ("SEO Strategy Call", "Free SEO Assessment"),
    "ai-powered-seo-aeo-services-in-new-york-for-next-level-marketing": ("SEO Strategy Call", "AI SEO Strategy Session"),
    "expert-ai-seo-aeo-services-in-new-york-to-boost-your-rankings": ("SEO Strategy Call", "Rankings Review Call"),
    
    # "App Strategy Call" group
    "best-mobile-app-development-firms-in-new-york": ("App Strategy Call", "Mobile App Consultation"),
    "mobile-design": ("App Strategy Call", "UX Design Review"),
    "mobile-app-development-guide-2025": ("App Strategy Call", "App Development Roadmap"),
}

changes = 0
for slug, (old, new) in HERO_BTN2_MAP.items():
    path = os.path.join(BLOG_DIR, slug, "content.tsx")
    if not os.path.isfile(path):
        print(f"  SKIP {slug}")
        continue
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace first occurrence (hero section)
    idx = content.find(old)
    if idx >= 0:
        content = content[:idx] + new + content[idx + len(old):]
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  ✅ {slug}: '{old}' → '{new}'")
        changes += 1
    else:
        print(f"  ── {slug}: '{old}' not found")

print(f"\nTotal: {changes} changes")
