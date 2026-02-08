"""Fix remaining duplicate bottom CTA button texts and hero button texts across all blogs."""
import os

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "app", "blog")

# Bottom CTA button 1 replacements for Template A blogs
# These currently share the same text across groups
BOTTOM_BTN1_MAP = {
    # "Boost Your Rankings" group → unique per blog
    "googles-ai-seo-revolution-unveiled": ("Boost Your Rankings", "Prepare for AI Search"),
    "how-ai-powered-search-sge-impacts-your-google-business-profile-ranking": ("Boost Your Rankings", "Optimize Your GBP Ranking"),
    "master-ai-driven-seo-aeo-in-2025": ("Boost Your Rankings", "Upgrade to AI-Powered SEO"),
    "premier-ai-seo-aeo-services-in-new-york": ("Boost Your Rankings", "Get Premier SEO Services"),
    
    # "Explore AI Solutions" group → unique per blog
    "why-gemini-3-is-the-next-big-leap": ("Explore AI Solutions", "Explore Gemini Integration"),
    "leading-ai-machine-learning-experts-in-new-york": ("Explore AI Solutions", "Connect with AI Engineers"),
    "new-yorks-best-ai-machine-learning-companies": ("Explore AI Solutions", "Work with AI Specialists"),
    "how-to-implement-ai-solutions-for-startups-in-brooklyn": ("Explore AI Solutions", "Launch Your AI Pilot Project"),
    
    # "Build Your App" group → unique per blog
    "how-apple-broke-the-free-app-economy": ("Build Your App", "Monetize Your App Idea"),
    
    # "Start Your App" with duplicates between hero and bottom
    "mobile-design": ("Start Your App", "Design Your Mobile App"),
    "mobile-app-development-guide-2025": ("Start Your App", "Develop Your App"),
}

# Also fix "Get App Audit" duplicates
APP_AUDIT_MAP = {
    "mobile-design": ("Get App Audit", "Request a UX Review"),
    "mobile-app-development-guide-2025": ("Get App Audit", "Get a Dev Roadmap"),
}

# Template B hero button duplicates (these appear at ~line 62)
HERO_BTN_MAP = {
    "best-mobile-app-development-firms-in-new-york": ("Build Your App", "Start Your App Build"),
    "expert-ai-seo-aeo-services-in-new-york-to-boost-your-rankings": ("Boost Your Rankings", "Improve Your Rankings"),
    "ai-powered-seo-aeo-services-in-new-york-for-next-level-marketing": ("Boost Your Rankings", "Maximize Your SEO"),
    "affordable-seo-services-for-small-businesses-in-new-york": ("Boost Your Rankings", "Grow Your Traffic"),
}

changes = 0

def fix_last_occurrence(content, old_text, new_text):
    """Replace the LAST occurrence of old_text with new_text."""
    idx = content.rfind(old_text)
    if idx >= 0:
        return content[:idx] + new_text + content[idx + len(old_text):], True
    return content, False

def fix_first_occurrence(content, old_text, new_text):
    """Replace the FIRST occurrence of old_text with new_text."""
    idx = content.find(old_text)
    if idx >= 0:
        return content[:idx] + new_text + content[idx + len(old_text):], True
    return content, False

# Fix bottom CTA btn1 for Template A
for slug, (old, new) in BOTTOM_BTN1_MAP.items():
    path = os.path.join(BLOG_DIR, slug, "content.tsx")
    if not os.path.isfile(path):
        continue
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace the LAST occurrence (bottom CTA)
    content, changed = fix_last_occurrence(content, old, new)
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  ✅ {slug}: bottom btn1 '{old}' → '{new}'")
        changes += 1

# Fix "Get App Audit" duplicates
for slug, (old, new) in APP_AUDIT_MAP.items():
    path = os.path.join(BLOG_DIR, slug, "content.tsx")
    if not os.path.isfile(path):
        continue
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    content, changed = fix_last_occurrence(content, old, new)
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  ✅ {slug}: '{old}' → '{new}'")
        changes += 1

# Fix Template B hero button duplicates
for slug, (old, new) in HERO_BTN_MAP.items():
    path = os.path.join(BLOG_DIR, slug, "content.tsx")
    if not os.path.isfile(path):
        continue
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace the FIRST occurrence (hero section)
    content, changed = fix_first_occurrence(content, old, new)
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  ✅ {slug}: hero btn '{old}' → '{new}'")
        changes += 1

print(f"\nTotal: {changes} changes")
