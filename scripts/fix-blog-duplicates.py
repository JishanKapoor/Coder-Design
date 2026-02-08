"""
Fix duplicate headings and anchor texts across all 28 blog content.tsx files.
Targets:
1. CTA h2 headings - make each unique
2. "Conclusion" h2 headings - make descriptive per blog topic
3. Duplicate hero button texts - differentiate where needed
"""
import os
import re

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "app", "blog")

# ──────────────────────────────────────────────
# UNIQUE CTA h2 HEADINGS PER BLOG
# ──────────────────────────────────────────────
CTA_H2_MAP = {
    # Template B – all currently "Ready to Start Your Project?"
    "affordable-seo-services-for-small-businesses-in-new-york": "Grow Your Business with Affordable SEO",
    "ai-black-box-ethical-transparency-2025": "Build Transparent AI Solutions Today",
    "ai-ethics-in-2025-navigating-moral-dilemmas": "Implement Ethical AI in Your Organization",
    "ai-powered-language-models-transform-healthcare-diagnostics-in-2025": "Harness AI Language Models for Healthcare",
    "ai-powered-seo-aeo-services-in-new-york-for-next-level-marketing": "Supercharge Your Marketing with AI-Powered SEO",
    "ai-voice-bots-how-they-work-why-they-matter": "Add AI Voice Technology to Your Business",
    "ai-vs-writers-the-new-creative-frontier": "Integrate AI into Your Content Strategy",
    "best-ai-consulting-firms-in-manhattan-2025": "Partner with Manhattan\u2019s Top AI Experts",
    "best-mobile-app-development-firms-in-new-york": "Launch Your Next Mobile App in New York",
    "expert-ai-seo-aeo-services-in-new-york-to-boost-your-rankings": "Elevate Your Search Rankings with Expert AI SEO",

    # Template A – "Ready to Build Scalable Software?" group
    "ai-business": "Transform Your Business with Custom AI Software",
    "full-stack-developers-in-new-york": "Hire Elite Full-Stack Developers in New York",
    "is-kubernetes-overkill-for-startups": "Scale Your Startup Infrastructure the Right Way",
    "top-full-stack-development-companies-in-new-york": "Find the Best Full-Stack Team for Your Project",
    "top-tools-for-full-stack-web-development-services-in-queens-ny": "Build Better Web Apps with the Right Tech Stack",

    # Template A – "Ready to Dominate AI Search?" group
    "googles-ai-seo-revolution-unveiled": "Stay Ahead of Google\u2019s AI Search Revolution",
    "how-ai-powered-search-sge-impacts-your-google-business-profile-ranking": "Optimize Your Business for AI-Powered Search",
    "master-ai-driven-seo-aeo-in-2025": "Master AI-Driven SEO Before Your Competitors Do",
    "premier-ai-seo-aeo-services-in-new-york": "Dominate New York Search Results with AI SEO",

    # Template A – "Ready to Leverage AI?" group
    "why-gemini-3-is-the-next-big-leap": "Leverage Gemini and Next-Gen AI for Your Business",
    "new-yorks-best-ai-machine-learning-companies": "Work with New York\u2019s Leading AI Engineers",
    "leading-ai-machine-learning-experts-in-new-york": "Connect with Top AI & ML Talent in New York",
    "how-to-implement-ai-solutions-for-startups-in-brooklyn": "Launch AI-Powered Solutions for Your Brooklyn Startup",

    # Template A – "Ready to Launch Your App?" group
    "mobile-app-development-in-2025-a-complete-guide-for-startups-and-enterprises": "Build a Future-Ready Mobile App in 2025",
    "how-apple-broke-the-free-app-economy": "Navigate the New App Economy Successfully",

    # Template A – "Launch a High-Performance Mobile App" group
    "mobile-design": "Design a Mobile Experience Users Love",
    "mobile-app-development-guide-2025": "Ship Your Mobile App Faster with Expert Guidance",

    # Template A – unique already but let's ensure
    "flutter-310-released-with-new-features-and-performance-improvements": "Build Cross-Platform Apps with Flutter 3.10",
}

# ──────────────────────────────────────────────
# UNIQUE CONCLUSION HEADINGS PER BLOG
# ──────────────────────────────────────────────
CONCLUSION_MAP = {
    "ai-business": "Key Takeaways for AI-Driven Business Growth",
    "full-stack-developers-in-new-york": "Finding the Right Full-Stack Partner in NYC",
    "is-kubernetes-overkill-for-startups": "Making the Right Infrastructure Decision",
    "top-full-stack-development-companies-in-new-york": "Choosing Your Ideal Development Partner",
    "top-tools-for-full-stack-web-development-services-in-queens-ny": "Picking the Right Tools for Your Stack",
    "googles-ai-seo-revolution-unveiled": "Preparing for the AI Search Landscape",
    "how-ai-powered-search-sge-impacts-your-google-business-profile-ranking": "Adapting Your Business Profile for AI Search",
    "master-ai-driven-seo-aeo-in-2025": "Your AI SEO Roadmap for 2025 and Beyond",
    "premier-ai-seo-aeo-services-in-new-york": "Winning the AI SEO Race in New York",
    "why-gemini-3-is-the-next-big-leap": "What Gemini 3 Means for Your AI Strategy",
    "new-yorks-best-ai-machine-learning-companies": "Selecting the Right AI Partner in New York",
    "leading-ai-machine-learning-experts-in-new-york": "Working with Top AI Talent in New York",
    "how-to-implement-ai-solutions-for-startups-in-brooklyn": "Your Brooklyn AI Implementation Checklist",
    "mobile-app-development-in-2025-a-complete-guide-for-startups-and-enterprises": "Your Mobile App Roadmap for 2025",
    "how-apple-broke-the-free-app-economy": "Navigating Apple\u2019s New App Economy",
    "mobile-design": "Designing Mobile Apps That Convert",
    "mobile-app-development-guide-2025": "Your Step-by-Step Mobile Development Plan",
    "flutter-310-released-with-new-features-and-performance-improvements": "What Flutter 3.10 Means for Your Next Project",
    "ai-ethics-in-2025-navigating-moral-dilemmas": "Building AI with Ethics at the Core",
    "affordable-seo-services-for-small-businesses-in-new-york": "Your Path to Affordable SEO Success",
    "ai-powered-seo-aeo-services-in-new-york-for-next-level-marketing": "Transforming Your Marketing with AI SEO",
    "ai-voice-bots-how-they-work-why-they-matter": "The Future of AI Voice Technology",
    "best-mobile-app-development-firms-in-new-york": "Choosing the Best App Developer in New York",
    "expert-ai-seo-aeo-services-in-new-york-to-boost-your-rankings": "Your Next Steps to Higher Rankings",
}

# ──────────────────────────────────────────────
# UNIQUE HERO BUTTON 1 TEXTS (currently many say "Start Your Project")
# ──────────────────────────────────────────────
HERO_BTN1_MAP = {
    # Template A blogs that currently say "Start Your Project" (16 blogs)
    "ai-business": "Build Your AI Solution",
    "full-stack-developers-in-new-york": "Hire Full-Stack Experts",
    "is-kubernetes-overkill-for-startups": "Optimize Your Infrastructure",
    "top-full-stack-development-companies-in-new-york": "Find Your Dev Team",
    "top-tools-for-full-stack-web-development-services-in-queens-ny": "Start Building Your App",
    "googles-ai-seo-revolution-unveiled": "Future-Proof Your SEO",
    "how-ai-powered-search-sge-impacts-your-google-business-profile-ranking": "Optimize for AI Search",
    "master-ai-driven-seo-aeo-in-2025": "Upgrade Your SEO Strategy",
    "premier-ai-seo-aeo-services-in-new-york": "Boost Your NY Rankings",
    "why-gemini-3-is-the-next-big-leap": "Explore Gemini AI Solutions",
    "new-yorks-best-ai-machine-learning-companies": "Talk to an AI Expert",
    "leading-ai-machine-learning-experts-in-new-york": "Connect with AI Talent",
    "how-to-implement-ai-solutions-for-startups-in-brooklyn": "Launch Your AI Pilot",
    "mobile-app-development-in-2025-a-complete-guide-for-startups-and-enterprises": "Plan Your Mobile App",
    "how-apple-broke-the-free-app-economy": "Monetize Your App",
    "flutter-310-released-with-new-features-and-performance-improvements": "Build with Flutter 3.10",
}

# ──────────────────────────────────────────────
# UNIQUE HERO BUTTON 2 TEXTS (many say "Schedule a Call")
# ──────────────────────────────────────────────
HERO_BTN2_MAP = {
    "ai-business": "Discuss Your Architecture",
    "full-stack-developers-in-new-york": "Discuss Your Architecture",
    "is-kubernetes-overkill-for-startups": "Get an Infra Review",
    "top-full-stack-development-companies-in-new-york": "Book a Discovery Call",
    "top-tools-for-full-stack-web-development-services-in-queens-ny": "Talk to a Dev Lead",
    "googles-ai-seo-revolution-unveiled": "Get an SEO Audit",
    "how-ai-powered-search-sge-impacts-your-google-business-profile-ranking": "Request an SGE Review",
    "master-ai-driven-seo-aeo-in-2025": "Book a Strategy Session",
    "premier-ai-seo-aeo-services-in-new-york": "Get a Ranking Analysis",
    "why-gemini-3-is-the-next-big-leap": "Book an AI Consultation",
    "new-yorks-best-ai-machine-learning-companies": "Request an AI Proposal",
    "leading-ai-machine-learning-experts-in-new-york": "Discuss Your AI Needs",
    "how-to-implement-ai-solutions-for-startups-in-brooklyn": "Get a Free AI Assessment",
    "mobile-app-development-in-2025-a-complete-guide-for-startups-and-enterprises": "Get an App Strategy Call",
    "how-apple-broke-the-free-app-economy": "Talk to an App Expert",
    "flutter-310-released-with-new-features-and-performance-improvements": "Book a Flutter Review",
}

# Template B bottom CTA button replacements
# Currently: "Book a Consultation" + "Contact Us"
TEMPLATE_B_BTN1_MAP = {
    "affordable-seo-services-for-small-businesses-in-new-york": "Get Your Free SEO Audit",
    "ai-black-box-ethical-transparency-2025": "Book an AI Transparency Review",
    "ai-ethics-in-2025-navigating-moral-dilemmas": "Schedule an Ethics Assessment",
    "ai-powered-language-models-transform-healthcare-diagnostics-in-2025": "Explore Healthcare AI Solutions",
    "ai-powered-seo-aeo-services-in-new-york-for-next-level-marketing": "Get a Custom SEO Proposal",
    "ai-voice-bots-how-they-work-why-they-matter": "Request a Voice Bot Demo",
    "ai-vs-writers-the-new-creative-frontier": "Plan Your AI Content Strategy",
    "best-ai-consulting-firms-in-manhattan-2025": "Schedule an AI Strategy Call",
    "best-mobile-app-development-firms-in-new-york": "Get a Free App Estimate",
    "expert-ai-seo-aeo-services-in-new-york-to-boost-your-rankings": "Claim Your Free Rankings Analysis",
}

TEMPLATE_B_BTN2_MAP = {
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


def fix_blog(slug, content):
    """Apply all fixes to a single blog content.tsx"""
    original = content
    changes = []

    # ─── Fix CTA h2 ───
    if slug in CTA_H2_MAP:
        new_h2 = CTA_H2_MAP[slug]
        # Template B pattern: <h2 className="...text-white...">Ready to Start Your Project?</h2>
        # Template A patterns vary but all have h2 with the CTA text
        for old_h2 in [
            "Ready to Start Your Project?",
            "Ready to Build Scalable Software?",
            "Ready to Dominate AI Search?",
            "Ready to Leverage AI?",
            "Ready to Launch Your App?",
            "Ready to Build Your Mobile App?",
            "Launch a High-Performance Mobile App",
        ]:
            if old_h2 in content:
                # Only replace the CTA h2, not other occurrences
                # Look for the h2 tag pattern in the CTA section
                pattern = re.compile(
                    r'(<h2[^>]*>)\s*' + re.escape(old_h2) + r'\s*(</h2>)',
                    re.DOTALL
                )
                if pattern.search(content):
                    content = pattern.sub(r'\1\n              ' + new_h2 + r'\n            \2', content, count=1)
                    changes.append(f"CTA h2: '{old_h2}' → '{new_h2}'")
                    break

    # ─── Fix "Conclusion" h2 ───
    if slug in CONCLUSION_MAP:
        new_conclusion = CONCLUSION_MAP[slug]
        # Match <h2 ...>Conclusion</h2> pattern (JSX or innerHTML)
        # Pattern 1: JSX h2
        pattern_jsx = re.compile(r'(<h2[^>]*>)\s*Conclusion\s*(</h2>)', re.DOTALL)
        if pattern_jsx.search(content):
            content = pattern_jsx.sub(r'\1' + new_conclusion + r'\2', content, count=1)
            changes.append(f"Conclusion h2 → '{new_conclusion}'")
        else:
            # Pattern 2: inside innerHTML/dangerouslySetInnerHTML  
            # e.g. <h2>Conclusion</h2> in a template string
            pattern_inner = re.compile(r'(<h2[^>]*>)\s*Conclusion\s*(</h2>)')
            if pattern_inner.search(content):
                content = pattern_inner.sub(r'\1' + new_conclusion + r'\2', content, count=1)
                changes.append(f"Conclusion h2 (innerHTML) → '{new_conclusion}'")

    # ─── Fix "Final Thoughts" h2 (also duplicated across blogs) ───
    final_thoughts_map = {
        "affordable-seo-services-for-small-businesses-in-new-york": "Your Path to Affordable SEO Success",
        "ai-powered-seo-aeo-services-in-new-york-for-next-level-marketing": "Transforming Your Marketing with AI SEO",
        "ai-voice-bots-how-they-work-why-they-matter": "The Future of AI Voice Technology",
        "best-mobile-app-development-firms-in-new-york": "Choosing the Best App Developer in New York",
        "expert-ai-seo-aeo-services-in-new-york-to-boost-your-rankings": "Your Next Steps to Higher Rankings",
    }
    if slug in final_thoughts_map:
        new_ft = final_thoughts_map[slug]
        pattern_ft = re.compile(r'(<h2[^>]*>)\s*Final Thoughts\s*(</h2>)', re.DOTALL)
        if pattern_ft.search(content):
            content = pattern_ft.sub(r'\1' + new_ft + r'\2', content, count=1)
            changes.append(f"Final Thoughts h2 → '{new_ft}'")

    # ─── Fix Template A hero button 1: "Start Your Project" ───
    if slug in HERO_BTN1_MAP:
        new_btn = HERO_BTN1_MAP[slug]
        # Hero buttons are typically Link components with the text
        # Pattern: >Start Your Project<  or  >Start Your Project\n
        old_btn_patterns = ["Start Your Project"]
        for old_btn in old_btn_patterns:
            # Only replace in the hero section (first occurrence usually)
            pattern = re.compile(r'(\s*)' + re.escape(old_btn) + r'(\s*(?:<|{))')
            match = pattern.search(content)
            if match:
                content = content[:match.start()] + match.group(1) + new_btn + match.group(2) + content[match.end():]
                changes.append(f"Hero btn1: '{old_btn}' → '{new_btn}'")
                break

    # ─── Fix Template A hero button 2: "Schedule a Call" ───
    if slug in HERO_BTN2_MAP:
        new_btn2 = HERO_BTN2_MAP[slug]
        old_btn2 = "Schedule a Call"
        if old_btn2 in content:
            # Replace first occurrence (hero section)
            content = content.replace(old_btn2, new_btn2, 1)
            changes.append(f"Hero btn2: '{old_btn2}' → '{new_btn2}'")

    # ─── Fix Template B bottom CTA buttons ───
    if slug in TEMPLATE_B_BTN1_MAP:
        new_b1 = TEMPLATE_B_BTN1_MAP[slug]
        new_b2 = TEMPLATE_B_BTN2_MAP[slug]
        # Template B bottom CTA has "Book a Consultation" and "Contact Us"
        # These appear in the bg-violet-600 section near the bottom
        # We need to be careful to only change the bottom CTA, not the hero
        
        # Find the bottom CTA section (usually contains the CTA h2 we just changed)
        # Strategy: replace the LAST occurrence of "Book a Consultation" and "Contact Us"
        
        # Count occurrences of "Book a Consultation"
        bc_count = content.count("Book a Consultation")
        if bc_count >= 1:
            # Replace the last occurrence
            idx = content.rfind("Book a Consultation")
            content = content[:idx] + new_b1 + content[idx + len("Book a Consultation"):]
            changes.append(f"Bottom CTA btn1: 'Book a Consultation' → '{new_b1}'")
        
        cu_positions = [m.start() for m in re.finditer(r'>Contact Us<', content)]
        if len(cu_positions) >= 1:
            # Replace the last occurrence
            idx = cu_positions[-1]
            content = content[:idx] + ">" + new_b2 + "<" + content[idx + len(">Contact Us<"):]
            changes.append(f"Bottom CTA btn2: 'Contact Us' → '{new_b2}'")

    # ─── Fix Template A bottom CTA buttons (Boost Your Rankings, Explore AI Solutions, etc.) ───
    # These are already somewhat varied, but let's fix "Start Your Project" in bottom CTA
    # for template A blogs where the bottom CTA also says "Start Your Project"
    template_a_bottom_btn_map = {
        "ai-business": "Launch Your AI Project",
        "full-stack-developers-in-new-york": "Hire Your Dev Team",
        "is-kubernetes-overkill-for-startups": "Get Expert Infra Guidance",
        "top-full-stack-development-companies-in-new-york": "Start Your Development",
        "top-tools-for-full-stack-web-development-services-in-queens-ny": "Begin Your Web Project",
        "flutter-310-released-with-new-features-and-performance-improvements": "Start Your Flutter App",
    }
    if slug in template_a_bottom_btn_map:
        new_bottom = template_a_bottom_btn_map[slug]
        # These blogs have "Start Your Project" in both hero AND bottom CTA
        # We already changed the hero one, so check if there's still a "Start Your Project" remaining
        remaining = content.count(HERO_BTN1_MAP.get(slug, ""))
        sp_count = content.count("Start Your Project")
        if sp_count >= 1:
            # Replace remaining "Start Your Project" (bottom CTA)
            idx = content.rfind("Start Your Project")
            content = content[:idx] + new_bottom + content[idx + len("Start Your Project"):]
            changes.append(f"Bottom CTA btn: 'Start Your Project' → '{new_bottom}'")

    return content, changes


def main():
    if not os.path.isdir(BLOG_DIR):
        print(f"ERROR: Blog directory not found: {BLOG_DIR}")
        return

    slugs = sorted([
        d for d in os.listdir(BLOG_DIR)
        if os.path.isdir(os.path.join(BLOG_DIR, d))
    ])

    print(f"Found {len(slugs)} blog directories\n")
    
    total_changes = 0
    
    for slug in slugs:
        content_path = os.path.join(BLOG_DIR, slug, "content.tsx")
        if not os.path.isfile(content_path):
            print(f"  SKIP {slug}: no content.tsx")
            continue
        
        with open(content_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content, changes = fix_blog(slug, content)
        
        if changes:
            with open(content_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"  ✅ {slug}:")
            for c in changes:
                print(f"     • {c}")
            total_changes += len(changes)
        else:
            print(f"  ── {slug}: no changes needed")
    
    print(f"\n{'='*60}")
    print(f"TOTAL: {total_changes} changes across {len(slugs)} blogs")


if __name__ == "__main__":
    main()
