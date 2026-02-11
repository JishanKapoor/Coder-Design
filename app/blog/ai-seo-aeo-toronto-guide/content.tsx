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
  "AI & Machine Learning": "/ai-workflow",
};

export default function BlogPost() {
  const [showCalendar, setShowCalendar] = useState(false);
  const category = "AI SEO & AEO Services";
  const categoryLink = categoryLinks[category] || "/blogs";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-20 lg:py-28">
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
              <Button className="gap-2 bg-white text-violet-600 hover:bg-white/90" asChild>
                <Link href="/contact">Get a Free SEO Audit</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Book a Discovery Call</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `

<p>Search is splitting into two channels, and most Toronto businesses are only optimizing for one of them. Google still dominates traditional search, but an increasing share of information-seeking queries now start (or end) in AI-powered tools: Google AI Overviews (the AI summaries that appear above traditional search results), ChatGPT with web browsing, Perplexity, and Microsoft Copilot. If your content is not structured to be understood and cited by these systems, you are becoming invisible to a growing segment of your potential customers.</p>

<p>This guide covers both sides — traditional AI-enhanced SEO and the newer discipline of Answer Engine Optimization (AEO) — with specific, actionable tactics you can implement for your Toronto business. No theory-only content. Every section includes the specific tools, implementations, and steps. (If you would rather have experts handle this for you, explore our <a href="/seo-management">AI SEO & AEO services</a>.)</p>

<hr>

<h2>What Changed: The Search Landscape in 2025-2026</h2>

<p>Understanding what changed helps you understand why different tactics are needed.</p>

<h3>Google AI Overviews (Formerly SGE)</h3>
<p>Google now shows AI-generated summary answers for a significant portion of search queries. When someone searches "best CRM for small business Toronto," instead of just showing 10 blue links, Google displays a multi-paragraph AI-generated answer that synthesizes information from several sources — and cites those sources with links.</p>

<p>The critical insight: the pages Google's AI cites are not always the same pages that rank #1 organically. AI Overviews pull from content that directly answers the question in a clear, structured, authoritative way — even if that content is not on page 1 of traditional results. This is a new opportunity for businesses that create genuinely helpful content.</p>

<h3>ChatGPT, Perplexity, and AI Search Tools</h3>
<p>Perplexity is essentially an AI-powered research engine. When someone asks it "What is the best AI agency in Toronto for workflow automation?", it searches the web in real time, reads dozens of pages, synthesizes an answer, and cites its sources. If your website has clear, authoritative content about AI workflow automation in Toronto, Perplexity will find and cite it.</p>

<p>ChatGPT with browsing does the same thing, though with less consistent citation. Microsoft Copilot integrates Bing search with AI synthesis. All of these tools are training your potential customers to expect direct answers — not to click through 10 results and compare them.</p>

<h3>What This Means for Toronto Businesses</h3>
<p>You now need to optimize for two things simultaneously:</p>
<ol>
<li>Traditional search ranking — still the primary traffic driver and still based on the fundamentals (technical SEO, content quality, backlinks, local signals)</li>
<li>AI citation — being the source that AI tools reference when answering questions related to your business, services, or expertise</li>
</ol>

<p>The good news: the tactics overlap significantly. Great content that ranks well in traditional search is also more likely to be cited by AI. But there are specific additional optimizations that make a meaningful difference in AI visibility.</p>

<hr>

<h2>Part 1: AI-Enhanced Traditional SEO</h2>

<p>These are the foundational tactics — enhanced with AI tools that make execution faster and more data-driven.</p>

<h3>Keyword Research with AI Tools</h3>

<p>Traditional keyword research identifies what people are searching for. AI-enhanced keyword research also identifies the intent behind those searches and the related questions people ask — which is exactly what you need for both SEO and AEO.</p>

<p>Tools and how to use them:</p>

<ul>
<li>Semrush — The most comprehensive keyword research platform. Use the "Keyword Magic Tool" to find search volume and difficulty for your target terms. The "Topic Research" feature shows you related questions, subtopics, and content gaps. For local Toronto SEO, use the "Keyword Gap" tool to compare your keyword rankings against local competitors.</li>
<li>Ahrefs — Particularly strong for analysing what content already ranks and why. The "Content Gap" analysis shows you keywords your competitors rank for that you do not — these are your highest-opportunity targets. The "Questions" filter in Keywords Explorer shows you the exact questions people search for, which are gold for both FAQ content and AEO.</li>
<li>Google Search Console — Free, and often overlooked. The "Performance" report shows you the actual queries people use to find your site, including ones you never thought to target. Look for queries where you appear on page 2 or 3 — these are "striking distance" keywords where a targeted content update could push you to page 1.</li>
<li>AlsoAsked — Maps out the "People Also Ask" questions for any search query. This shows you the complete tree of related questions Google associates with a topic — each one is a potential heading, FAQ entry, or blog post.</li>
<li>Frase — AI-powered content brief generator. Enter a keyword, and Frase analyses the top-ranking pages, identifies the topics and questions they cover, and generates a content brief showing you exactly what to include. This is not about copying competitors — it is about understanding what Google considers comprehensive coverage of a topic.</li>
</ul>

<h3>Content Optimization: What Actually Moves Rankings</h3>

<p>The days of keyword-stuffing paragraphs are long over. Google's AI (including the Helpful Content system and the core ranking algorithms) evaluates content on these dimensions:</p>

<ul>
<li>Topical comprehensiveness. Does your page cover the topic thoroughly, or does it only scratch the surface? Tools like Surfer SEO and Clearscope analyse the top-ranking pages for any keyword and show you the specific subtopics, terms, and questions they cover — giving you a data-driven checklist for comprehensive coverage.</li>
<li>Originality and expertise. Does your content include original insights, specific examples, or first-hand experience that cannot be found elsewhere? Google's E-E-A-T guidelines (Experience, Expertise, Authoritativeness, Trustworthiness) increasingly reward content that demonstrates real knowledge — not just reworded information from other sources.</li>
<li>Structure and clarity. Is the content organized with clear headings, logical flow, and scannable sections? This matters for both human readers and AI extraction.</li>
<li>Freshness. For topics that evolve (technology, regulations, market conditions), regularly updated content outperforms static pages. Add "last updated" dates and actually update the content when things change.</li>
</ul>

<p>Practical workflow for content optimization:</p>
<ol>
<li>Choose a target keyword using Semrush or Ahrefs</li>
<li>Generate a content brief using Frase or MarketMuse that maps the subtopics and questions to cover</li>
<li>Write the content with genuine expertise — use AI writing assistants like Jasper or Claude to help with first drafts or research, but ensure the final content reflects your actual knowledge and experience</li>
<li>Run the draft through Surfer SEO to check topical coverage and identify gaps</li>
<li>Add structured data (see below) and internal links to related content</li>
<li>Publish, submit to Google Search Console for indexing, and monitor performance over the following weeks</li>
</ol>

<h3>Technical SEO: The Foundation AI Systems Depend On</h3>

<p>AI search tools can only cite your content if they can access and understand it. Technical SEO ensures your site is crawlable, fast, and properly structured.</p>

<p>Critical technical elements:</p>

<ul>
<li>Page speed. Google has confirmed that Core Web Vitals (Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint) are ranking factors. Use Google PageSpeed Insights and Lighthouse to audit. For Next.js sites, use next/image for automatic image optimization, implement code splitting, and use static generation where possible.</li>
<li>Mobile-first. Google crawls and indexes the mobile version of your site. If your mobile experience is poor, your rankings suffer. Test with Chrome DevTools device emulation and real devices.</li>
<li>Crawlability. Ensure your robots.txt does not block important content. Use Screaming Frog (free for up to 500 URLs) to crawl your site and identify broken links, missing meta descriptions, duplicate titles, orphan pages, and redirect chains.</li>
<li>Site architecture. Organize your content in a clear hierarchy with logical URL structures. Use internal linking to connect related content — this helps both search engines and AI tools understand the relationships between your pages.</li>
<li>HTTPS. Non-negotiable. If you are not on HTTPS, you are at a ranking disadvantage and browsers will warn visitors about your site.</li>
</ul>

<hr>

<h2>Part 2: Answer Engine Optimization (AEO)</h2>

<p>AEO is the set of tactics specifically designed to get your content cited by AI search tools. These build on traditional SEO fundamentals but add a layer of optimization for how AI systems extract and present information.</p>

<h3>Structured Data / Schema Markup</h3>

<p>Structured data is machine-readable code (JSON-LD format) embedded in your pages that explicitly tells search engines and AI tools what your content is about. It is the single most impactful AEO tactic because it removes ambiguity — instead of an AI system having to infer what your page is about, you tell it directly.</p>

<p>Essential schema types for Toronto businesses:</p>

<ul>
<li>LocalBusiness — Your business name, address, phone, hours, service area. This is foundational for local search and Google Maps. Use the specific subtype that fits: <code>ProfessionalService</code>, <code>LegalService</code>, <code>MedicalBusiness</code>, <code>HomeAndConstructionBusiness</code>, etc.</li>
<li>FAQPage — Mark up your FAQ sections so Google can display them as rich results and AI tools can extract Q&A pairs directly. Every service page should have an FAQ section with structured data.</li>
<li>HowTo — For instructional content (guides, tutorials, how-to articles). Google displays these as step-by-step rich results.</li>
<li>Article / BlogPosting — For blog posts and articles. Includes author, publish date, image, and description.</li>
<li>Service — Describe each service you offer with structured data. This helps AI tools understand your service offerings when answering queries like "What services do AI agencies in Toronto offer?"</li>
<li>Review / AggregateRating — If you have customer reviews on your site, mark them up. Star ratings in search results increase click-through rates significantly.</li>
</ul>

<p>Implementation tools:</p>
<ul>
<li>For WordPress: Rank Math (free version has excellent schema support) or Schema Pro</li>
<li>For Next.js / custom sites: Implement JSON-LD directly in your page components. Use Google's Structured Data Testing Tool and Rich Results Test to validate.</li>
<li>For any site: Schema.org documentation is the definitive reference for all schema types and properties.</li>
</ul>

<h3>Content Architecture for AI Extraction</h3>

<p>AI tools extract answers from your content by identifying clear question-answer patterns, well-structured sections, and definitive statements. Structure your content to make this extraction easy:</p>

<ul>
<li>Use question-based headings. Instead of "Our Services," use "What AI Automation Services Are Available for Toronto Businesses?" The question format matches how people ask AI tools for information.</li>
<li>Answer directly after the heading. The first sentence after each heading should directly answer the implied or stated question. Add detail and nuance afterward, but lead with the answer. This "inverted pyramid" style is exactly what AI tools look for.</li>
<li>Include FAQ sections on every important page. Not just a dedicated FAQ page — add 3-5 relevant questions and answers to each service page, each blog post, and your homepage. Mark them up with FAQPage schema.</li>
<li>Use lists and tables for structured information. AI tools extract structured data more reliably than information buried in paragraphs. If you are comparing options, use a table. If you are listing steps, use an ordered list. If you are listing features or criteria, use an unordered list.</li>
<li>Define terms explicitly. If your page discusses a concept (like "workflow automation" or "answer engine optimization"), include a clear one-sentence definition early in the content. AI tools often pull these definitions directly when answering "What is X?" queries.</li>
</ul>

<h3>Topical Authority: The Long Game</h3>

<p>AI tools are more likely to cite sources they perceive as authoritative on a topic. You build topical authority by publishing comprehensive, interlinked content across all facets of your subject area.</p>

<p>How to build it:</p>
<ol>
<li>Create a content hub. Choose your core topic (e.g., "AI automation for Toronto businesses") and create a comprehensive pillar page that covers the topic broadly.</li>
<li>Publish supporting content. Write detailed articles on each subtopic — workflow automation, AI chatbots, AI SEO, implementation timelines, industry-specific use cases, etc. Each article links back to the pillar page and to related articles.</li>
<li>Cover related questions. Use AlsoAsked and Semrush's Topic Research to find every question people ask about your core topic. Each question is a potential article or FAQ entry.</li>
<li>Update regularly. A hub that was published once and never updated loses authority over time. Refresh content quarterly with new information, updated tool recommendations, and current statistics.</li>
</ol>

<p>This is exactly the strategy behind this blog series — each post covers a specific facet of AI automation for Toronto businesses, and together they build comprehensive topical authority that benefits every page. For example, our deep dive on <a href="/blog/ai-workflow-automation-toronto-small-business">AI workflow automation for Toronto small businesses</a> complements this SEO guide by giving readers the operational detail behind the services they are searching for.</p>

<hr>

<h2>Part 3: Local SEO for Toronto</h2>

<p>For Toronto businesses serving local customers, local SEO signals are critical — and they feed directly into both traditional search results and AI answers about local services.</p>

<h3>Google Business Profile Optimization</h3>
<p>Your Google Business Profile (GBP) is the single most important asset for local search visibility. Optimize it thoroughly:</p>
<ul>
<li>Complete every field — business name (exact match to your legal name), address, phone, website, hours, service area, business description</li>
<li>Choose the most specific primary category available. For an AI agency: "Computer Consultant" or "Software Company" — not just "Technology Company"</li>
<li>Add relevant secondary categories</li>
<li>Upload high-quality photos regularly (Google confirms that businesses with photos receive more clicks)</li>
<li>Post weekly updates using Google Posts — share blog content, project highlights, team updates</li>
<li>Respond to every review — positive and negative — promptly and professionally</li>
</ul>

<h3>Local Content Strategy</h3>
<p>Create content that is specifically relevant to Toronto and the GTA:</p>
<ul>
<li>Reference Toronto neighbourhoods, landmarks, and business districts naturally in your content</li>
<li>Create location-specific service pages if you serve distinct areas (e.g., "AI Automation for Businesses in North York" vs. "AI Automation for Mississauga Companies")</li>
<li>Write about local business challenges — Toronto's competitive labour market, real estate costs for small businesses, the multilingual customer base, seasonal business patterns</li>
<li>Mention local business events, organizations, and resources (Toronto Board of Trade, MaRS, TechTO, etc.)</li>
</ul>

<h3>Review Generation Strategy</h3>
<p>Reviews are both a ranking signal and a trust signal for AI tools. Automate review collection:</p>
<ol>
<li>After every completed project or service, trigger an automated email/SMS requesting a Google review (use Zapier or Make to automate this from your CRM or project management tool). If you are not sure which tools or agency to trust with this, our <a href="/blog/how-to-choose-best-ai-agency-toronto">guide to choosing an AI agency in Toronto</a> covers what to look for.</li>
<li>Make it frictionless — include a direct link to your Google review form (you can get this from your Google Business Profile)</li>
<li>Time it well — request reviews when the customer is most satisfied (immediately after a successful outcome, not weeks later)</li>
<li>Respond to every review within 24-48 hours</li>
</ol>

<hr>

<h2>Part 4: The Tools Stack for AI-Powered SEO</h2>

<p>Here is a practical tools stack organized by function. You do not need all of these — start with the essentials and add tools as your SEO operation matures.</p>

<h3>Essentials (Start Here)</h3>
<ul>
<li>Google Search Console — Free. Monitor your search performance, identify indexing issues, see what queries bring traffic. Non-negotiable.</li>
<li>Google Analytics 4 — Free. Track traffic, user behaviour, conversions. Set up conversion tracking for your key actions (form submissions, phone calls, bookings). Pair this with a proper <a href="/blog/ai-automation-roi-toronto-business">ROI measurement framework</a> to tie SEO outcomes to real revenue.</li>
<li>Screaming Frog SEO Spider — Free for up to 500 URLs. Crawl your site to find technical issues. Run this monthly.</li>
<li>Rank Math (WordPress) or manual JSON-LD (custom sites) — Implement structured data. Free.</li>
</ul>

<h3>Growth (When You Are Ready to Invest in Tools)</h3>
<ul>
<li>Semrush or Ahrefs — Keyword research, competitor analysis, backlink monitoring, rank tracking. Choose one — they are broadly comparable with different strengths. Semrush has better keyword data; Ahrefs has better backlink analysis.</li>
<li>Surfer SEO or Clearscope — Content optimization. Analyse what top-ranking pages cover and ensure your content is at least as comprehensive. Surfer is more affordable; Clearscope is more polished.</li>
<li>Frase or MarketMuse — AI-powered content briefs and gap analysis. Frase is more accessible; MarketMuse is more enterprise-oriented.</li>
</ul>

<h3>Monitoring AI Visibility</h3>
<ul>
<li>Perplexity — Search for questions about your industry and service area. Check whether your content appears as a cited source. If it does not, analyse what sources Perplexity does cite and what makes their content more extractable.</li>
<li>Google Search — AI Overview monitoring. Search for your target keywords in Chrome (not incognito) and observe whether AI Overviews appear. Note which sources are cited. There is no formal tool for tracking AI Overview citations yet, but monitoring manually for your top 20-30 keywords monthly is manageable and informative.</li>
<li>ChatGPT browsing mode. Ask ChatGPT questions about your industry in Toronto. See whether your brand appears in responses. This is less consistent than Perplexity but gives you a signal about your AI visibility.</li>
</ul>

<hr>

<h2>An Action Plan: What to Do This Month</h2>

<p>Instead of trying to implement everything at once, here is a prioritized 30-day action plan:</p>

<p>Week 1: Audit and Baseline</p>
<ul>
<li>Run Screaming Frog on your site and fix critical technical issues (broken links, missing meta descriptions, slow pages)</li>
<li>Set up Google Search Console if you have not already — verify your site and submit your sitemap</li>
<li>Document your current keyword rankings for your top 20 target terms</li>
<li>Search for your key terms in Perplexity and Google AI Overviews — note whether you appear and who does</li>
</ul>

<p>Week 2: Structured Data</p>
<ul>
<li>Add LocalBusiness schema to your homepage</li>
<li>Add FAQPage schema to your top 3 service pages (add FAQ content if it does not exist)</li>
<li>Add Article/BlogPosting schema to all blog posts</li>
<li>Validate all structured data using Google's Rich Results Test</li>
</ul>

<p>Week 3: Content Optimization</p>
<ul>
<li>Identify your top 5 "striking distance" keywords from Google Search Console (pages ranking positions 8-20)</li>
<li>Update those 5 pages: expand content, add FAQ sections, improve headings to question format, add internal links</li>
<li>Ensure each page has a clear, direct answer to the primary query in the first paragraph</li>
</ul>

<p>Week 4: Local and Ongoing</p>
<ul>
<li>Optimize your Google Business Profile completely</li>
<li>Set up automated review collection</li>
<li>Create a content calendar for the next quarter — one new article per week targeting a specific question or topic in your expertise area</li>
<li>Set up weekly rank tracking for your target keywords</li>
</ul>

<hr>

<h2>Frequently Asked Questions</h2>

<h3>How long does it take to see results from SEO and AEO?</h3>
<p>Technical fixes and structured data changes can show results within days to weeks (Google re-crawls and re-indexes relatively quickly). Content-based improvements typically take 2-4 months to impact rankings meaningfully. Local SEO improvements (Google Business Profile optimization, reviews) can show results within a few weeks. Building topical authority is a 6-12 month process that compounds over time.</p>

<h3>Should I create separate content for AI search vs traditional search?</h3>
<p>No. The same content can serve both — the key is how you structure it. Write comprehensive, well-structured content that answers questions clearly (good for AI extraction), is technically optimized (good for traditional ranking), and includes structured data (good for both). Creating separate content would be duplicative and counterproductive.</p>

<h3>Do I need to worry about AI tools stealing my traffic?</h3>
<p>This is a legitimate concern. When AI Overviews answer a question directly, some users will not click through to the source. However, for complex, high-intent queries (the ones that drive business — "hire AI agency Toronto," "best CRM for contractors") users still want to explore options and engage directly with businesses. Optimize for being cited as the source, and ensure your content offers enough depth that users want to visit your site for the full picture.</p>

<h3>Can I use AI to write my SEO content?</h3>
<p>AI writing tools (ChatGPT, Claude, Jasper) can accelerate content creation — they are excellent for first drafts, outlines, and research. But publishing AI-generated content without significant human editing and original insight is a losing strategy. Google's Helpful Content guidelines explicitly value first-hand experience and expertise. Use AI as a tool to write faster, not as a replacement for genuine knowledge. The content on your site should reflect what your team actually knows and has experienced — that is what makes it valuable to both readers and search engines.</p>

          ` }} />
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">Want Your Toronto Business to Show Up in AI Search Results?</h2>
            <p className="mb-8 text-lg text-white/90">We combine technical SEO, content strategy, and AEO optimization to make your business visible wherever your customers are searching — Google, ChatGPT, Perplexity, or whatever comes next.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-violet-600 hover:bg-white/90" asChild>
                <Link href="/contact">Get a Free SEO Audit</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Schedule a Discovery Call</Button>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />

      {/* Calendly Modal */}
      {showCalendar && (
        <motion.div
          initial="hidden" animate="visible" exit="exit"
          variants={modalBackdropVariants}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowCalendar(false)}
        >
          <motion.div
            initial="hidden" animate="visible" exit="exit"
            variants={modalContentVariants}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full p-2 hover:bg-slate-100 transition-colors duration-150"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
            <h3 className="mb-4 sm:mb-6 pr-10 text-xl sm:text-2xl text-slate-900">Schedule a Discovery Call</h3>
            <div className="h-[500px] sm:h-[600px] overflow-hidden rounded-lg">
              <iframe
                src="https://calendly.com/hello-coderdesign/30min"
                width="100%" height="100%" frameBorder="0"
                title="Schedule a Discovery Call"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
