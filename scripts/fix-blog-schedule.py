"""Fix remaining 'Schedule a Call' bottom CTA buttons in Template A blogs."""
import os

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "app", "blog")

# These are the BOTTOM CTA "Schedule a Call" buttons (hero ones already fixed)
BOTTOM_CALL_MAP = {
    "flutter-310-released-with-new-features-and-performance-improvements": "Book a Flutter Review",
    "top-tools-for-full-stack-web-development-services-in-queens-ny": "Talk to a Dev Lead",
    "why-gemini-3-is-the-next-big-leap": "Book an AI Consultation",
    "top-full-stack-development-companies-in-new-york": "Book a Discovery Call",
    "new-yorks-best-ai-machine-learning-companies": "Request an AI Proposal",
    "master-ai-driven-seo-aeo-in-2025": "Book a Strategy Session",
    "leading-ai-machine-learning-experts-in-new-york": "Discuss Your AI Needs",
    "is-kubernetes-overkill-for-startups": "Get an Infra Review",
    "premier-ai-seo-aeo-services-in-new-york": "Get a Ranking Analysis",
    "how-to-implement-ai-solutions-for-startups-in-brooklyn": "Get a Free AI Assessment",
    "how-apple-broke-the-free-app-economy": "Talk to an App Expert",
    "how-ai-powered-search-sge-impacts-your-google-business-profile-ranking": "Request an SGE Review",
    "googles-ai-seo-revolution-unveiled": "Get an SEO Audit",
}

changes = 0
for slug, new_text in BOTTOM_CALL_MAP.items():
    path = os.path.join(BLOG_DIR, slug, "content.tsx")
    if not os.path.isfile(path):
        print(f"  SKIP {slug}")
        continue
    
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    old = ">Schedule a Call<"
    if old in content:
        # Replace LAST occurrence (bottom CTA)
        idx = content.rfind(old)
        content = content[:idx] + ">" + new_text + "<" + content[idx + len(old):]
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  ✅ {slug}: 'Schedule a Call' → '{new_text}'")
        changes += 1
    else:
        print(f"  ── {slug}: no match")

print(f"\nTotal: {changes} changes")
