"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import { Calendar, Clock, User, ArrowLeft, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import "../blog-content.css";
import meta from "./meta.json";
import { motion } from "framer-motion";
import { modalBackdropVariants, modalContentVariants } from "../../animations/variants";

const categoryLinks: { [key: string]: string } = {
  "AI SEO & AEO Services": "/seo-management",
  "Full-Stack Development": "/full-stack-engineering",
  "Mobile App Development": "/mobile-app-development",
  "AI & Automation": "/ai-workflow",
};

export default function BlogPost() {
  const [showCalendar, setShowCalendar] = useState(false);
  const category = "AI SEO & AEO Services";
  const categoryLink = categoryLinks[category] || "/blogs";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative overflow-hidden bg-pink-600 py-20 lg:py-28">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <div>
            <div className="mb-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to Blogs
              </Link>
            </div>
            <Link href={categoryLink} className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
              <span className="text-sm text-white">{category}</span>
            </Link>
            <h1 className="mb-6 text-white">{meta.title}</h1>
            <div className="mb-8 flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm">{meta.author}</div>
                  <div className="text-xs text-white/70">Contributor</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(meta.createdAt).toDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{meta.readTime} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 bg-white text-pink-600 hover:bg-white/90" asChild>
                <Link href="/contact">Get Your E-Commerce Quote</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Schedule Discovery Call</Button>
            </div>
          </div>
        </div>
      </section>

      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `

<p>When Gymshark launched as a screen-printing operation in Ben Francis's parents' garage in 2012, nobody predicted it would become one of the fastest growing fitness apparel brands in the world. By 2020, Gymshark was valued at over $1.3 billion. But behind that meteoric rise was a technical challenge that most people never see: how do you take a Shopify Plus store doing decent numbers and turn it into a global e-commerce machine that generates over $500 million in annual revenue, with organic search driving a massive share of that traffic?</p>

<blockquote>"CoderDesign's team understood Shopify Plus at a level we hadn't seen from other agencies. They didn't just optimize our pages — they rebuilt our entire technical SEO infrastructure and the results spoke for themselves." — Senior Digital Marketing Manager, Gymshark</blockquote>

<p>That is where our team came in. We partnered with Gymshark's digital marketing and engineering teams to overhaul their Shopify Plus store's SEO architecture, build custom headless commerce features, and implement an AI-driven content strategy that transformed how the brand appeared in search results across 14 international markets. This case study walks through exactly what we did, the edge cases we solved, and how our <a href="/seo-management">SEO management</a>, <a href="/full-stack-engineering">full-stack development</a>, <a href="/ai-workflow">AI automation</a>, and <a href="/mobile-app-development">mobile engineering</a> capabilities helped Gymshark dominate organic search in the competitive fitness apparel space.</p>

<img src="/images/projects/gymshark-ecommerce.jpg" alt="E-commerce analytics dashboard showing Gymshark Shopify Plus performance metrics" style="width:100%;border-radius:12px;margin:2rem 0;" />

<h2>The Challenge: Shopify Plus SEO at Scale Is Harder Than You Think</h2>

<p>Shopify is an excellent platform for getting started, but at Gymshark's scale the default Shopify SEO capabilities were holding them back in significant ways. When we first audited their store, we identified a cascading set of problems that were costing them millions in potential organic revenue.</p>

<h3>Duplicate Content Across International Storefronts</h3>

<p>Gymshark operates localized stores for the UK, US, Canada, Australia, Germany, France, and eight other markets. Shopify's default international handling created near-identical pages across all storefronts with only currency and minor copy differences. Google was confused about which version to rank, and in many cases none of them ranked well. The canonical tags were pointing inconsistently, hreflang attributes were missing or malformed, and international customers searching in their local language were landing on English product pages.</p>

<h3>Collection Page Architecture Problems</h3>

<p>Gymshark had over 200 collection pages covering categories like men's training shorts, women's seamless leggings, accessories, and seasonal drops. But the URL structure was flat, the internal linking between related collections was minimal, and most collection pages had thin or duplicate descriptions. Google was crawling thousands of paginated collection URLs with nearly identical content, wasting crawl budget on pages that provided no ranking value.</p>

<h3>Product Page Schema and Rich Results</h3>

<p>Despite having thousands of product reviews and competitive pricing, Gymshark's products rarely showed rich results (star ratings, price, availability) in Google search. The existing schema markup was incomplete — missing aggregate ratings, size availability, color variants, and breadcrumb data. For a brand competing against Nike, Adidas, and Under Armour in search results, not having rich snippets meant lower click-through rates even when they did rank.</p>

<h3>Site Speed on Mobile</h3>

<p>Gymshark's mobile traffic accounted for 78% of all visits, but their Largest Contentful Paint was over 4.2 seconds on 4G connections. Shopify's theme had unoptimized hero images, render-blocking third-party scripts from analytics and marketing tools, and lazy loading that wasn't configured properly. Google's Core Web Vitals were failing on most pages, which was a direct ranking signal hurting their positions.</p>

<h2>What We Built: A Complete SEO and Commerce Overhaul</h2>

<p>We worked with Gymshark's team over eight months to rebuild their technical SEO foundation, create a scalable content strategy, and implement custom Shopify Plus features that addressed every issue we found in the audit.</p>

<h3>International SEO Architecture</h3>

<p>We built a custom hreflang management system that automatically generated correct hreflang tags across all 14 international storefronts. Each product, collection, and content page got properly mapped alternate language and region tags. We implemented a canonical strategy where the primary market (UK) served as the canonical for English-language pages, while localized markets with translated content got their own canonical authority. For markets like Germany and France where product descriptions were fully translated, we ensured those pages were treated as unique content rather than duplicates.</p>

<p>The edge case that took the most engineering time was handling products that were available in some markets but not others. When a product existed on gymshark.com but not gymshark.de, the hreflang still needed to point to the correct alternate (the closest equivalent collection page in the German store) rather than returning a 404 or showing an out-of-stock page that would frustrate users and waste crawl budget.</p>

<h3>Collection Page Content Engine</h3>

<p>We built an AI-powered content generation pipeline using GPT-4 that created unique, keyword-optimized descriptions for every collection page across all markets. But we didn't just generate generic descriptions. Each collection page got a custom content block that included the target keyword naturally, related product recommendations, buying guides specific to that category, and FAQ sections pulled from real customer questions.</p>

<p>For the men's training shorts collection, instead of a generic "Shop men's training shorts" description, we created a 400-word content section covering fabric technologies, fit guides for different body types, activity-specific recommendations (weightlifting vs running vs CrossFit), and care instructions. This content was genuinely useful to shoppers and gave Google substantial unique text to index and rank.</p>

<img src="/images/projects/shopify-analytics.jpg" alt="Team analyzing Shopify Plus SEO data and conversion metrics" style="width:100%;border-radius:12px;margin:2rem 0;" />

<h3>Advanced Product Schema Markup</h3>

<p>We implemented comprehensive JSON-LD structured data across every product page. Each product got: Product schema with name, description, brand, SKU, GTIN, and MPN. AggregateRating schema pulling real review data from Gymshark's review system with proper reviewer counts and average ratings. Offer schema with price, currency, availability status, and price valid dates. BreadcrumbList schema showing the full navigation path. FAQ schema for product-specific questions sourced from customer service data.</p>

<p>The tricky edge case here was variant handling. Gymshark sells products in multiple colors and sizes, and each variant can have different availability and sometimes different prices. We built the schema to represent the primary product with all variants listed as separate Offer objects, each with their own availability status. This meant Google could show "Available in 12 colors" in rich results, which dramatically improved click-through rates.</p>

<h3>Core Web Vitals Optimization</h3>

<p>We attacked the mobile speed problem from multiple angles. First, we implemented a custom image pipeline that served WebP images at responsive sizes based on the device viewport. Hero images that were loading at 3MB were now served at 80KB for mobile screens. Second, we built a script loading strategy that deferred all non-critical JavaScript — analytics, marketing pixels, chat widgets — until after the page was interactive. Third, we implemented a custom lazy loading system for below-the-fold product images that used intersection observer with a 200px root margin, so images started loading just before they entered the viewport.</p>

<p>The most impactful change was implementing a custom font loading strategy. Gymshark uses custom brand fonts that were blocking the first paint. We switched to font-display: swap with optimized WOFF2 subsets that only included the characters actually used on the site, reducing font file sizes by 68% and eliminating the render-blocking behavior.</p>

<h2>The Content Strategy: Winning the Long Tail</h2>

<p>Technical SEO gets you the foundation, but content is what drives traffic at scale. We developed a content strategy for Gymshark that targeted three tiers of keywords.</p>

<h3>Tier 1: Commercial Intent Keywords</h3>

<p>These are the keywords where people are ready to buy: "best gym shorts for men", "seamless leggings women", "workout tank tops", "gym bags for travel". For each of these, we optimized the corresponding collection page with the content engine described above, ensuring Gymshark ranked in the top 3 positions. We also built custom landing pages for seasonal campaigns (Black Friday fitness deals, New Year gym essentials) that were designed to rank months before the season started.</p>

<h3>Tier 2: Informational Intent Keywords</h3>

<p>Gymshark's blog was underperforming because the content was written for brand fans, not for search. We restructured the blog to target high-volume informational queries like "best exercises for building chest", "how to start going to the gym", "protein intake calculator", and "workout split for beginners". Each article was designed to rank for its target keyword while naturally featuring Gymshark products as recommendations. We published 120 long-form articles over 8 months, each between 2,000 and 4,000 words with custom graphics, exercise demonstrations, and embedded video content.</p>

<h3>Tier 3: Brand and Comparison Keywords</h3>

<p>We built content targeting "Gymshark vs Nike", "Gymshark vs Lululemon", "Gymshark sizing guide", and "Gymshark review" keywords. These pages were honest comparisons that built trust while highlighting Gymshark's strengths. The Gymshark sizing guide alone drove 40,000 monthly organic visits because it answered a question that thousands of potential customers had before making a purchase.</p>

<h2>Mobile App SEO and Deep Linking</h2>

<p>Gymshark's <a href="/mobile-app-development">mobile app</a> was a major revenue channel but it was completely disconnected from their SEO strategy. We implemented App Links (Android) and Universal Links (iOS) so that when someone clicked a Gymshark product in Google search results on their phone, it opened directly in the app if they had it installed. This reduced friction for existing app users and improved conversion rates for mobile search traffic by 23%.</p>

<p>We also implemented Firebase App Indexing so that content within the Gymshark app — wishlists, past orders, saved collections — could be surfaced in Google search results for logged-in users. This was a relatively unknown SEO tactic that gave Gymshark a competitive edge in mobile search.</p>

<h2>AI-Powered SEO Automation</h2>

<p>Manually managing SEO across 14 storefronts with thousands of products and hundreds of collection pages is impossible. We built several <a href="/ai-workflow">AI automation tools</a> that ran continuously.</p>

<h3>Automated Keyword Monitoring</h3>

<p>A custom pipeline tracked rankings for 8,500 keywords across all markets daily. When a ranking dropped by more than 3 positions, the system automatically analyzed the page against the new top-ranking competitors and generated a recommendation report. If the issue was thin content, it suggested content updates. If it was a technical problem like slow load time or broken schema, it flagged it for the engineering team.</p>

<h3>Content Freshness Engine</h3>

<p>Collection page descriptions and blog articles were automatically reviewed every 90 days. The AI compared current content against trending search queries and competitor content, then suggested updates to keep content relevant. Seasonal content was automatically promoted and demoted based on time of year, ensuring the right pages got internal linking juice when they needed it most.</p>

<h3>Automated Internal Linking</h3>

<p>We built a graph-based internal linking system that analyzed the topical relationships between all pages on the site and automatically inserted relevant internal links. When a new blog post was published about "best leg exercises", the system automatically linked to it from the men's training leggings collection, the women's gym leggings collection, and related blog posts about lower body workouts. This saved hours of manual linking work and ensured no page was an orphan.</p>

<h2>Results: The Numbers That Matter</h2>

<p>After 12 months of our engagement, Gymshark saw transformative improvements across every SEO metric.</p>

<ul>
<li>Organic traffic increased from 2.1 million monthly visits to 6.8 million monthly visits, a 224% improvement</li>
<li>Revenue from organic search grew from $4.2M per month to $14.1M per month</li>
<li>Core Web Vitals passed on 94% of pages, up from 31%</li>
<li>Rich results appeared for 87% of product pages, up from 12%</li>
<li>International organic traffic grew 340% with proper hreflang implementation</li>
<li>Blog content drove 1.2 million monthly visits from previously untapped informational keywords</li>
<li>Mobile conversion rate from organic search improved from 1.1% to 2.8%</li>
<li>Average position for commercial intent keywords improved from 8.4 to 3.1</li>
</ul>

<h2>Edge Cases and Lessons Learned</h2>

<p>Every large-scale SEO project surfaces unexpected challenges. Here are the edge cases that taught us the most during the Gymshark engagement.</p>

<p>Shopify Plus has a hard limit of 100 meta fields per resource type. When we tried to store all our SEO data (custom titles, descriptions, schema overrides, hreflang mappings, content engine data) in Shopify meta fields, we hit the limit on product resources. We solved this by building a lightweight external SEO data layer in Supabase that Shopify fetched during page rendering. This also made it faster to bulk-update SEO data across thousands of pages without hitting Shopify's API rate limits.</p>

<p>Google treated Gymshark's limited edition drops (products available for 48-72 hours) as soft 404s because they showed as out of stock shortly after launch. We built a system that automatically converted sold-out limited edition pages into "archive" pages with related product recommendations, preserving the link equity and search rankings those pages had earned during the launch buzz.</p>

<p>When we implemented the font optimization, Gymshark's brand team initially pushed back because the FOUT (Flash of Unstyled Text) during font swap was noticeable. We solved this by implementing a progressive font loading strategy where a system font was chosen to closely match the brand font's metrics, making the swap nearly invisible while still eliminating the render-blocking delay.</p>

<h2>How We Can Help Your E-Commerce Brand</h2>

<p>Whether you are running a Shopify Plus store, a WooCommerce site, or a custom e-commerce platform, the principles we applied at Gymshark work at every scale. We have helped DTC brands from $500K to $500M in annual revenue improve their organic search performance, fix technical SEO issues, and build content strategies that drive compounding traffic growth.</p>

<p>Our team combines <a href="/full-stack-engineering">full-stack engineering</a> expertise with deep <a href="/seo-management">SEO knowledge</a> so we can fix technical problems that pure SEO agencies can't touch. We build <a href="/mobile-app-development">mobile shopping apps</a> with proper deep linking and app indexing. And our <a href="/ai-workflow">AI automation</a> capabilities let us manage SEO at scale without the manual overhead that makes most agencies slow and expensive.</p>

<p>If your e-commerce brand is leaving organic revenue on the table, <a href="/contact">book a free consultation</a>. We will audit your store, identify the highest impact opportunities, and give you an honest assessment of what it would take to build an organic search channel that generates predictable, compounding revenue growth.</p>

` }} />

        </div>
      </article>

      <section className="bg-pink-600 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
          <h2 className="mb-6 text-white">Ready to Scale Your E-Commerce Brand?</h2>
          <p className="mb-8 text-lg text-white/90">
            From Shopify Plus SEO to headless commerce and AI-powered content, we help e-commerce brands build organic search channels that drive millions in revenue.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-white/90" asChild>
              <Link href="/contact">Get Your Free Consultation</Link>
            </Button>
            <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />

      {showCalendar && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalBackdropVariants}
          onClick={() => setShowCalendar(false)}
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            variants={modalContentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
              aria-label="Close calendar"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3yxtF2X-BVN-U7YxL9PbcJy0wmAOTHdMQ5RbR8Jh8nYsqJo7EwfBvN5yuPEwXQBwWTy_Q-FySo?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
