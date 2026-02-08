"""
Fix remaining 'Contact Us' bottom CTA buttons in Template B blogs.
"""
import os
import re

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "app", "blog")

# Mapping of slug -> replacement for "Contact Us" in bottom CTA
BTN2_MAP = {
    "affordable-seo-services-for-small-businesses-in-new-york": "Talk to an SEO Expert",
    "ai-black-box-ethical-transparency-2025": "Discuss AI Ethics Solutions",
    "ai-ethics-in-2025-navigating-moral-dilemmas": "Connect with Our AI Team",
    "ai-powered-language-models-transform-healthcare-diagnostics-in-2025": "Request a Healthcare AI Demo",
    "ai-powered-seo-aeo-services-in-new-york-for-next-level-marketing": "Speak with an SEO Strategist",
    "ai-voice-bots-how-they-work-why-they-matter": "Talk to a Voice AI Engineer",
    "ai-vs-writers-the-new-creative-frontier": "Discuss AI for Your Content",
    "best-ai-consulting-firms-in-manhattan-2025": "Get a Free AI Consultation",
    "best-mobile-app-development-firms-in-new-york": "Talk to an App Developer",
    "expert-ai-seo-aeo-services-in-new-york-to-boost-your-rankings": "Discuss Your SEO Goals",
}

changes = 0
for slug, new_text in BTN2_MAP.items():
    path = os.path.join(BLOG_DIR, slug, "content.tsx")
    if not os.path.isfile(path):
        print(f"  SKIP {slug}: file not found")
        continue
    
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Pattern: the bottom CTA "Contact Us" inside a Button
    # We want to replace the LAST occurrence of "Contact Us" that's inside a Button
    # The pattern is typically:
    #   <Button ...>
    #     Contact Us
    #   </Button>
    # We'll use a regex to find "Contact Us" preceded by button-like context
    
    # Find all positions of "Contact Us" that are NOT in article body text
    # Strategy: find lines that are just whitespace + "Contact Us"
    lines = content.split('\n')
    last_cu_line = None
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped == "Contact Us":
            last_cu_line = i
    
    if last_cu_line is not None:
        old_line = lines[last_cu_line]
        indent = old_line[:len(old_line) - len(old_line.lstrip())]
        lines[last_cu_line] = indent + new_text
        
        with open(path, "w", encoding="utf-8") as f:
            f.write('\n'.join(lines))
        
        print(f"  ✅ {slug}: 'Contact Us' → '{new_text}'")
        changes += 1
    else:
        print(f"  ── {slug}: no standalone 'Contact Us' found")

print(f"\nTotal: {changes} changes")
