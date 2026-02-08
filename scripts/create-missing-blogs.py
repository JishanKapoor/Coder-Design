#!/usr/bin/env python3
"""Batch create page.tsx and content.tsx for all blogs that only have meta.json."""
import json, os, textwrap

BLOG_DIR = r"c:\Users\bosse\Coder-Design\app\blog"

PAGE_TEMPLATE = '''import type {{ Metadata }} from "next";
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
    images: [{{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: meta.title }}],
  }},
  twitter: {{
    card: "summary_large_image",
    title: meta.title,
    description: meta.short_description,
    images: ["https://coderdesign.com/og-image.png"],
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
  "image": "https://coderdesign.com/og-image.png",
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

# Category → gradient mapping
CATEGORY_GRADIENTS = {
    "AI SEO & AEO Services": ("from-emerald-600 to-teal-700", "emerald", "/seo-management"),
    "Full-Stack Development": ("from-violet-600 to-indigo-700", "violet", "/full-stack-engineering"),
    "Mobile App Development": ("from-blue-600 to-cyan-700", "blue", "/mobile-app-development"),
    "AI & Machine Learning": ("from-purple-600 to-fuchsia-700", "purple", "/ai-workflow"),
}

# Blog content by slug
BLOG_CONTENT = {
    "googles-ai-seo-revolution-unveiled": {
        "category": "AI SEO & AEO Services",
        "content": """<h1>Google's AI SEO Revolution Unveiled</h1>
<p>Google's integration of AI into search is transforming how websites are ranked and discovered. From Search Generative Experience (SGE) to AI Overviews, the search landscape is evolving rapidly. Understanding these changes is critical for businesses that depend on organic traffic.</p>

<h2>What Is Google's AI Search Revolution?</h2>
<p>Google has been progressively embedding AI into its core search algorithm. The introduction of MUM (Multitask Unified Model), helpful content updates, and generative AI results means that traditional SEO alone is no longer sufficient.</p>

<h3>Key Changes in Google's AI-Powered Search</h3>
<ul>
<li><strong>AI Overviews:</strong> Summarized answers generated directly in search results</li>
<li><strong>Search Generative Experience:</strong> Conversational AI responses that reshape how users interact with Google</li>
<li><strong>E-E-A-T Emphasis:</strong> Experience, Expertise, Authoritativeness, and Trustworthiness are more important than ever</li>
<li><strong>Passage Ranking:</strong> Google can now index and rank specific passages within a page</li>
</ul>

<h2>How This Impacts Your SEO Strategy</h2>
<p>The shift to AI-powered search means content must be more comprehensive, authoritative, and user-focused than ever before.</p>

<h3>Content Quality Over Quantity</h3>
<p>Google's AI can now better understand context, intent, and content depth. Thin content that targets keywords without providing real value will be penalized more aggressively.</p>

<h3>Structured Data Becomes Essential</h3>
<p>Schema markup helps Google's AI understand your content better. Implementing proper JSON-LD structured data for articles, FAQs, products, and organizations gives you an edge in AI-generated results.</p>

<h3>Answer Engine Optimization (AEO)</h3>
<p>Beyond traditional SEO, businesses need to optimize for AI answer engines. This means structuring content to directly answer questions, using clear headings, and providing authoritative sources.</p>

<h2>Practical Steps for Businesses</h2>
<ul>
<li><strong>Audit existing content</strong> for depth, accuracy, and E-E-A-T signals</li>
<li><strong>Implement structured data</strong> across all key pages</li>
<li><strong>Focus on topic clusters</strong> rather than individual keywords</li>
<li><strong>Create authoritative, experience-based content</strong> that demonstrates real expertise</li>
<li><strong>Optimize for featured snippets</strong> and AI Overview inclusion</li>
<li><strong>Monitor AI search results</strong> for your target queries</li>
</ul>

<h2>The Future of Search</h2>
<p>As Google continues integrating AI more deeply into search, the gap between websites that adapt and those that don't will widen significantly. Businesses that invest in AI-ready SEO strategies now will be best positioned for the future.</p>

<blockquote><p>"The future of SEO isn't about gaming algorithms — it's about creating genuinely valuable content that AI systems recognize as authoritative and helpful."</p></blockquote>

<h2>Conclusion</h2>
<p>Google's AI revolution isn't coming — it's already here. By focusing on content quality, structured data, and user experience, businesses can thrive in this new search landscape. The key is to start adapting now rather than waiting for traffic declines to force action.</p>
<hr>"""
    },
    "how-ai-powered-search-sge-impacts-your-google-business-profile-ranking": {
        "category": "AI SEO & AEO Services",
        "content": """<h1>How AI-Powered Search (SGE) Impacts Your Google Business Profile Ranking</h1>
<p>Google's Search Generative Experience (SGE) is changing how local businesses appear in search results. Understanding these shifts is essential for maintaining and improving your Google Business Profile visibility.</p>

<h2>Understanding SGE and Local Search</h2>
<p>SGE uses AI to generate comprehensive answers directly in search results. For local businesses, this means your Google Business Profile needs to be optimized not just for traditional local SEO, but also for AI-driven discovery.</p>

<h3>How SGE Changes Local Results</h3>
<ul>
<li><strong>AI-generated local recommendations:</strong> Google now summarizes and recommends businesses based on AI analysis</li>
<li><strong>Review sentiment analysis:</strong> AI evaluates the quality and sentiment of your reviews, not just quantity</li>
<li><strong>Content matching:</strong> Your business description and posts are analyzed for relevance to search queries</li>
<li><strong>Visual content weight:</strong> Photos and videos carry more importance in AI-driven results</li>
</ul>

<h2>Optimizing Your Google Business Profile for SGE</h2>

<h3>Complete and Accurate Information</h3>
<p>AI systems rely on complete, accurate data. Ensure every field in your Google Business Profile is filled out correctly, including business hours, services, products, and attributes.</p>

<h3>Quality Reviews and Responses</h3>
<p>Google's AI analyzes review content for relevance and sentiment. Encourage detailed reviews from customers and respond thoughtfully to every review — both positive and negative.</p>

<h3>Regular Posts and Updates</h3>
<p>Active Google Business Profiles signal relevance to AI systems. Post updates, offers, events, and news regularly to maintain visibility in SGE results.</p>

<h3>High-Quality Visual Content</h3>
<p>Upload professional photos and videos regularly. AI systems increasingly use visual content to understand and rank businesses.</p>

<h2>Measuring SGE Impact</h2>
<ul>
<li><strong>Track impressions</strong> in Google Business Profile insights</li>
<li><strong>Monitor click-through rates</strong> from search results</li>
<li><strong>Analyze review trends</strong> and sentiment over time</li>
<li><strong>Compare visibility</strong> before and after optimization efforts</li>
</ul>

<h2>Conclusion</h2>
<p>SGE represents a fundamental shift in how local businesses are discovered online. By optimizing your Google Business Profile for AI-powered search, you can maintain and improve your local visibility in this new era of search.</p>
<hr>"""
    },
    "how-apple-broke-the-free-app-economy": {
        "category": "Mobile App Development",
        "content": """<h1>How Apple Broke the Free App Economy</h1>
<p>Apple's App Store policies have fundamentally reshaped how developers monetize mobile applications. From the 30% commission to App Tracking Transparency, these changes have disrupted the free app model that fueled the mobile revolution.</p>

<h2>The Rise and Fall of Free Apps</h2>
<p>The free app economy was built on a simple model: give the app away for free, monetize through ads and data. This model powered billions of downloads and created tech giants. But Apple's privacy-first approach has systematically dismantled this foundation.</p>

<h3>App Tracking Transparency (ATT)</h3>
<p>Introduced in iOS 14.5, ATT requires apps to ask permission before tracking users across other apps and websites. The impact was immediate and dramatic:</p>
<ul>
<li><strong>Only ~25% of users opt in</strong> to tracking when asked</li>
<li><strong>Ad targeting accuracy</strong> decreased significantly for non-consenting users</li>
<li><strong>Ad revenue dropped</strong> for many free apps relying on targeted advertising</li>
<li><strong>Meta (Facebook) estimated</strong> a $10 billion annual revenue impact</li>
</ul>

<h2>The 30% Commission Debate</h2>
<p>Apple's 30% cut on all App Store transactions has been a point of contention since the store launched. For developers, this means:</p>
<ul>
<li>30% of every in-app purchase goes to Apple</li>
<li>30% of every subscription payment (first year), 15% after</li>
<li>No alternative payment methods allowed (though regulations are changing this)</li>
</ul>

<h3>The Impact on Small Developers</h3>
<p>While Apple introduced the Small Business Program (15% commission for developers earning under $1M), the overall ecosystem still heavily favors large publishers who can absorb the costs.</p>

<h2>What This Means for App Development</h2>
<p>The shift away from ad-supported free apps is pushing developers toward:</p>
<ul>
<li><strong>Subscription models:</strong> Recurring revenue that's more predictable</li>
<li><strong>Freemium strategies:</strong> Free core features with premium upgrades</li>
<li><strong>One-time purchases:</strong> A return to paid apps for quality software</li>
<li><strong>First-party data:</strong> Building direct relationships with users</li>
</ul>

<h2>Looking Forward</h2>
<p>The EU's Digital Markets Act and similar regulations worldwide are beginning to force Apple to open up its ecosystem. Sideloading, alternative app stores, and alternative payment methods may reshape the landscape once again.</p>

<blockquote><p>"The free app economy was always subsidized by user privacy. As that subsidy disappears, the true cost of app development becomes visible."</p></blockquote>

<h2>Conclusion</h2>
<p>Apple's policies have permanently altered the mobile app economy. Developers who adapt to subscription models, privacy-first design, and direct user relationships will thrive. Those clinging to the old ad-supported model will struggle increasingly.</p>
<hr>"""
    },
    "how-to-implement-ai-solutions-for-startups-in-brooklyn": {
        "category": "AI & Machine Learning",
        "content": """<h1>How to Implement AI Solutions for Startups in Brooklyn</h1>
<p>Brooklyn's startup ecosystem is one of the most vibrant in the world, and AI adoption is accelerating across every industry. Here's a practical guide for Brooklyn startups looking to implement AI solutions effectively.</p>

<h2>Why Brooklyn Startups Need AI</h2>
<p>Brooklyn's diverse business landscape — from fintech to fashion tech, food delivery to healthcare — creates unique opportunities for AI implementation. Startups that leverage AI early gain competitive advantages in efficiency, personalization, and scalability.</p>

<h3>Common AI Applications for Startups</h3>
<ul>
<li><strong>Customer service automation:</strong> AI chatbots and support systems that scale without adding headcount</li>
<li><strong>Predictive analytics:</strong> Forecasting demand, churn, and market trends</li>
<li><strong>Personalization engines:</strong> Tailoring user experiences based on behavior and preferences</li>
<li><strong>Process automation:</strong> Streamlining repetitive tasks in operations, finance, and HR</li>
<li><strong>Natural language processing:</strong> Content generation, sentiment analysis, and document processing</li>
</ul>

<h2>Step-by-Step Implementation Guide</h2>

<h3>1. Identify High-Impact Use Cases</h3>
<p>Don't try to AI-ify everything at once. Start with the business process that has the highest impact-to-effort ratio. Common starting points include customer support, data analysis, and content generation.</p>

<h3>2. Assess Your Data Readiness</h3>
<p>AI runs on data. Before implementing any AI solution, audit your data:</p>
<ul>
<li>What data do you collect?</li>
<li>Is it clean, organized, and accessible?</li>
<li>Do you have enough data to train models?</li>
<li>Are there privacy or compliance concerns?</li>
</ul>

<h3>3. Choose Build vs. Buy</h3>
<p>Most startups should start with existing AI tools and APIs rather than building custom models:</p>
<ul>
<li><strong>OpenAI API:</strong> For text generation, analysis, and conversational AI</li>
<li><strong>Google Cloud AI:</strong> For vision, speech, and translation</li>
<li><strong>AWS SageMaker:</strong> For custom ML model training and deployment</li>
<li><strong>Pre-built solutions:</strong> Tools like Jasper, Intercom AI, or Salesforce Einstein</li>
</ul>

<h3>4. Start Small and Iterate</h3>
<p>Launch a pilot project with clear success metrics. Measure results, gather feedback, and iterate before scaling across the organization.</p>

<h3>5. Build Internal AI Literacy</h3>
<p>Invest in training your team to understand AI capabilities and limitations. This ensures better adoption and more creative applications.</p>

<h2>Budget Considerations</h2>
<p>Brooklyn startups can implement AI solutions at various budget levels:</p>
<ul>
<li><strong>$0-1K/month:</strong> API-based solutions (ChatGPT, Claude, basic automation tools)</li>
<li><strong>$1-5K/month:</strong> Integrated AI tools with custom workflows</li>
<li><strong>$5-20K/month:</strong> Custom AI development and dedicated ML infrastructure</li>
</ul>

<h2>Conclusion</h2>
<p>AI implementation doesn't have to be overwhelming or expensive. Brooklyn startups that take a pragmatic, step-by-step approach to AI adoption will find it transforms their operations, customer experience, and competitive positioning.</p>
<hr>"""
    },
    "is-kubernetes-overkill-for-startups": {
        "category": "Full-Stack Development",
        "content": """<h1>Is Kubernetes Overkill for Startups?</h1>
<p>Kubernetes has become the gold standard for container orchestration, but is it the right choice for every startup? The answer depends on your scale, team, and specific needs.</p>

<h2>What Kubernetes Does Well</h2>
<p>Kubernetes excels at managing containerized applications at scale. It provides:</p>
<ul>
<li><strong>Automatic scaling:</strong> Scale pods up and down based on demand</li>
<li><strong>Self-healing:</strong> Automatically restart failed containers and reschedule workloads</li>
<li><strong>Service discovery:</strong> Built-in DNS and load balancing</li>
<li><strong>Rolling updates:</strong> Deploy new versions with zero downtime</li>
<li><strong>Resource management:</strong> Efficiently allocate CPU and memory across workloads</li>
</ul>

<h2>When Kubernetes IS Overkill</h2>
<p>For many startups, Kubernetes adds unnecessary complexity:</p>

<h3>You Have a Small Team</h3>
<p>Kubernetes requires dedicated DevOps expertise. If your engineering team is under 10 people, the operational overhead of managing K8s likely outweighs the benefits.</p>

<h3>Your Traffic Is Predictable</h3>
<p>If you're not dealing with massive traffic spikes or complex scaling needs, simpler solutions work just as well.</p>

<h3>You're Pre-Product-Market Fit</h3>
<p>Before finding product-market fit, your priority should be shipping features fast — not perfecting infrastructure.</p>

<h2>Better Alternatives for Startups</h2>
<ul>
<li><strong>Vercel / Netlify:</strong> Perfect for Next.js and JAMstack apps with built-in scaling</li>
<li><strong>Railway / Render:</strong> Simple container deployment without K8s complexity</li>
<li><strong>AWS ECS / Fargate:</strong> Managed container services without managing clusters</li>
<li><strong>Google Cloud Run:</strong> Serverless containers that scale to zero</li>
<li><strong>Fly.io:</strong> Deploy apps globally with simple configuration</li>
</ul>

<h2>When to Adopt Kubernetes</h2>
<p>Consider K8s when you have:</p>
<ul>
<li>More than 20+ microservices in production</li>
<li>Dedicated DevOps/SRE team members</li>
<li>Complex deployment pipelines with multiple environments</li>
<li>Strict compliance requirements requiring infrastructure control</li>
<li>Significant cost savings from efficient resource utilization</li>
</ul>

<blockquote><p>"The best infrastructure is the one that lets you ship features fastest. For most startups, that's not Kubernetes."</p></blockquote>

<h2>Conclusion</h2>
<p>Kubernetes is a powerful tool, but power without need is just complexity. Most startups should start with simpler deployment platforms and migrate to K8s only when their scale genuinely demands it.</p>
<hr>"""
    },
    "leading-ai-machine-learning-experts-in-new-york": {
        "category": "AI & Machine Learning",
        "content": """<h1>Leading AI and Machine Learning Experts in New York</h1>
<p>New York City has emerged as a global hub for AI and machine learning innovation. From Wall Street's algorithmic trading to healthcare AI and creative applications, the city's AI ecosystem is thriving.</p>

<h2>Why New York for AI?</h2>
<p>New York offers unique advantages for AI development:</p>
<ul>
<li><strong>Industry diversity:</strong> Finance, healthcare, media, retail, and real estate all drive AI demand</li>
<li><strong>Talent pool:</strong> Columbia, NYU, and Cornell Tech produce world-class AI researchers</li>
<li><strong>Startup ecosystem:</strong> Hundreds of AI-focused startups across all boroughs</li>
<li><strong>Enterprise demand:</strong> Major corporations headquartered in NYC are hungry for AI solutions</li>
</ul>

<h2>Key AI Capabilities in Demand</h2>

<h3>Natural Language Processing</h3>
<p>NLP powers chatbots, content generation, sentiment analysis, and document processing. NYC's media and finance industries are particularly heavy users of NLP technology.</p>

<h3>Computer Vision</h3>
<p>From retail analytics to medical imaging, computer vision applications are growing rapidly across New York industries.</p>

<h3>Predictive Analytics</h3>
<p>Wall Street pioneered predictive modeling, but now every industry from real estate to healthcare uses ML-powered predictions for decision-making.</p>

<h3>Generative AI</h3>
<p>The latest wave of AI — generative models for text, images, code, and video — is transforming how businesses create and communicate.</p>

<h2>Choosing the Right AI Partner</h2>
<p>When evaluating AI and ML service providers, consider:</p>
<ul>
<li><strong>Industry expertise:</strong> Do they understand your specific domain?</li>
<li><strong>Technical depth:</strong> Can they build custom models, not just implement APIs?</li>
<li><strong>Data security:</strong> How do they handle sensitive data and compliance?</li>
<li><strong>Scalability:</strong> Can their solutions grow with your business?</li>
<li><strong>Communication:</strong> Do they explain complex AI concepts clearly?</li>
</ul>

<h2>The Future of AI in New York</h2>
<p>New York's AI ecosystem continues to grow, driven by increasing enterprise adoption, regulatory clarity, and a deep talent pool. Companies that invest in AI partnerships now will be best positioned for the AI-driven future.</p>

<h2>Conclusion</h2>
<p>New York's combination of industry diversity, talent, and enterprise demand makes it one of the best places in the world to develop and deploy AI solutions. Whether you're a startup or enterprise, the right AI partner can accelerate your business transformation.</p>
<hr>"""
    },
    "master-ai-driven-seo-aeo-in-2025": {
        "category": "AI SEO & AEO Services",
        "content": """<h1>Master AI-Driven SEO and AEO in 2025</h1>
<p>The convergence of AI and search engine optimization is creating a new discipline: Answer Engine Optimization (AEO). Mastering both traditional SEO and AEO is essential for visibility in 2025's AI-powered search landscape.</p>

<h2>Understanding the SEO to AEO Evolution</h2>
<p>Traditional SEO focused on ranking web pages for keywords. AEO focuses on getting your content selected as the authoritative answer by AI systems like Google SGE, ChatGPT, Perplexity, and Bing Copilot.</p>

<h3>Key Differences</h3>
<ul>
<li><strong>SEO:</strong> Optimize for blue link rankings → drive clicks to your site</li>
<li><strong>AEO:</strong> Optimize for AI citation → become the source AI recommends</li>
<li><strong>Combined approach:</strong> Optimize for both to maximize visibility across all search interfaces</li>
</ul>

<h2>AI-Driven SEO Strategies for 2025</h2>

<h3>Semantic Content Architecture</h3>
<p>AI search engines understand topics, not just keywords. Build content around topic clusters with comprehensive coverage:</p>
<ul>
<li>Create pillar pages for core topics</li>
<li>Build supporting content that covers subtopics in depth</li>
<li>Interlink content logically to demonstrate expertise</li>
<li>Update content regularly to maintain freshness signals</li>
</ul>

<h3>Structured Data Implementation</h3>
<p>Schema markup is the bridge between your content and AI understanding:</p>
<ul>
<li><strong>Article/BlogPosting:</strong> For all blog and news content</li>
<li><strong>FAQ:</strong> For question-and-answer content</li>
<li><strong>HowTo:</strong> For instructional content</li>
<li><strong>Organization/LocalBusiness:</strong> For business information</li>
<li><strong>Product/Service:</strong> For offerings</li>
</ul>

<h3>E-E-A-T Optimization</h3>
<p>Experience, Expertise, Authoritativeness, and Trustworthiness are the foundation of AI-era SEO:</p>
<ul>
<li>Showcase real experience and case studies</li>
<li>Display author credentials and expertise</li>
<li>Build authoritative backlinks and citations</li>
<li>Maintain consistent, accurate business information</li>
</ul>

<h2>AEO-Specific Tactics</h2>
<ul>
<li><strong>Direct answer format:</strong> Structure content to directly answer common questions</li>
<li><strong>Authoritative sourcing:</strong> Cite credible sources and provide original data</li>
<li><strong>Conversational content:</strong> Write in a way that AI can easily extract and paraphrase</li>
<li><strong>Multi-format content:</strong> Combine text, images, videos, and data for comprehensive coverage</li>
</ul>

<h2>Measuring Success</h2>
<p>Track both traditional and AI-specific metrics:</p>
<ul>
<li>Organic search traffic and rankings</li>
<li>Featured snippet appearances</li>
<li>AI Overview citations</li>
<li>Brand mentions in AI responses</li>
<li>Referral traffic from AI platforms</li>
</ul>

<h2>Conclusion</h2>
<p>Mastering AI-driven SEO and AEO in 2025 requires a comprehensive approach that combines traditional optimization with AI-specific strategies. The businesses that adapt fastest will capture the most visibility in this new search landscape.</p>
<hr>"""
    },
    "mobile-app-development-in-2025-complete-guide-to-building-successful-apps": {
        "category": "Mobile App Development",
        "content": """<h1>Mobile App Development in 2025: Complete Guide to Building Successful Apps</h1>
<p>Mobile app development continues to evolve rapidly. This comprehensive guide covers everything you need to know about building successful mobile applications in 2025.</p>

<h2>The Mobile Landscape in 2025</h2>
<p>Mobile devices account for over 60% of global internet traffic. With 6.8 billion smartphone users worldwide, the opportunity for mobile apps has never been greater.</p>

<h3>Key Trends Shaping Mobile Development</h3>
<ul>
<li><strong>AI-powered features:</strong> On-device ML, smart assistants, and personalization</li>
<li><strong>Cross-platform development:</strong> Flutter and React Native dominate multi-platform builds</li>
<li><strong>5G optimization:</strong> Faster networks enable richer app experiences</li>
<li><strong>Privacy-first design:</strong> Users and regulators demand better data protection</li>
<li><strong>Super apps:</strong> Multi-function platforms that combine services</li>
</ul>

<h2>Choosing Your Development Approach</h2>

<h3>Native Development</h3>
<p>Build separate apps for iOS (Swift) and Android (Kotlin):</p>
<ul>
<li><strong>Pros:</strong> Best performance, full platform API access, superior UX</li>
<li><strong>Cons:</strong> Higher cost, longer development time, two codebases to maintain</li>
<li><strong>Best for:</strong> Performance-critical apps, complex animations, platform-specific features</li>
</ul>

<h3>Cross-Platform Development</h3>
<p>Build once, deploy everywhere:</p>
<ul>
<li><strong>Flutter:</strong> Google's UI toolkit with excellent performance and beautiful widgets</li>
<li><strong>React Native:</strong> Facebook's framework leveraging React and JavaScript</li>
<li><strong>Pros:</strong> Faster development, single codebase, lower cost</li>
<li><strong>Cons:</strong> Slightly lower performance, occasional platform quirks</li>
</ul>

<h2>Essential App Features for 2025</h2>
<ul>
<li><strong>Biometric authentication:</strong> Face ID, fingerprint, and voice recognition</li>
<li><strong>Offline functionality:</strong> Apps must work without constant connectivity</li>
<li><strong>Push notifications:</strong> Smart, personalized, and non-intrusive</li>
<li><strong>Accessibility:</strong> WCAG compliance for inclusive design</li>
<li><strong>Analytics integration:</strong> Data-driven insights for continuous improvement</li>
</ul>

<h2>The Development Process</h2>
<ol>
<li><strong>Discovery & Planning:</strong> Define goals, user personas, and feature requirements</li>
<li><strong>UI/UX Design:</strong> Create wireframes, prototypes, and visual designs</li>
<li><strong>Development:</strong> Build frontend, backend, and integrate APIs</li>
<li><strong>Testing:</strong> Unit tests, integration tests, and user acceptance testing</li>
<li><strong>Launch:</strong> App store submission, marketing, and monitoring</li>
<li><strong>Iteration:</strong> Analyze user feedback and continuously improve</li>
</ol>

<h2>Cost Considerations</h2>
<p>Mobile app development costs vary widely based on complexity:</p>
<ul>
<li><strong>Simple apps:</strong> $15,000 - $50,000</li>
<li><strong>Medium complexity:</strong> $50,000 - $150,000</li>
<li><strong>Complex enterprise apps:</strong> $150,000 - $500,000+</li>
</ul>

<h2>Conclusion</h2>
<p>Building a successful mobile app in 2025 requires understanding current trends, choosing the right technology stack, and following a structured development process. Focus on user experience, performance, and iterative improvement to create apps that users love.</p>
<hr>"""
    },
    "new-yorks-best-ai-machine-learning-companies": {
        "category": "AI & Machine Learning",
        "content": """<h1>New York's Best AI and Machine Learning Companies</h1>
<p>New York City has become a powerhouse for AI and machine learning innovation. The city's unique combination of finance, media, healthcare, and technology creates an unparalleled environment for AI companies to thrive.</p>

<h2>Why NYC Leads in AI</h2>
<p>Several factors make New York a top destination for AI companies:</p>
<ul>
<li><strong>Industry concentration:</strong> More Fortune 500 headquarters than any other city</li>
<li><strong>Research institutions:</strong> World-class universities driving AI research</li>
<li><strong>Funding ecosystem:</strong> Billions in VC funding flowing to AI startups</li>
<li><strong>Diverse talent:</strong> Engineers, data scientists, and domain experts from every industry</li>
</ul>

<h2>Key AI Sectors in New York</h2>

<h3>Financial AI</h3>
<p>Wall Street drives massive demand for AI in trading, risk management, fraud detection, and compliance. NYC's financial AI companies process trillions of dollars in transactions using ML models.</p>

<h3>Healthcare AI</h3>
<p>From diagnostic imaging to drug discovery, New York's healthcare AI sector is advancing medical care through machine learning and data analysis.</p>

<h3>Media and Creative AI</h3>
<p>NYC's media industry is leveraging generative AI for content creation, personalization, and audience analytics.</p>

<h3>Enterprise AI Solutions</h3>
<p>Companies building AI tools for business operations — from customer service to supply chain optimization — are thriving in New York's enterprise-heavy market.</p>

<h2>What to Look for in an AI Partner</h2>
<ul>
<li><strong>Proven track record:</strong> Real case studies and measurable results</li>
<li><strong>Domain expertise:</strong> Understanding of your specific industry challenges</li>
<li><strong>Ethical AI practices:</strong> Commitment to responsible AI development</li>
<li><strong>Scalable solutions:</strong> Architecture that grows with your needs</li>
<li><strong>Transparent communication:</strong> Clear explanations of AI capabilities and limitations</li>
</ul>

<h2>The Future of AI in NYC</h2>
<p>New York's AI ecosystem is poised for continued growth, driven by increasing enterprise adoption, favorable policy environments, and a deepening talent pool. The city's diversity of industries ensures AI innovation will continue across multiple sectors simultaneously.</p>

<h2>Conclusion</h2>
<p>New York's AI and machine learning landscape is rich, diverse, and growing. Whether you need AI consulting, custom ML models, or enterprise AI integration, the city offers world-class expertise across every domain.</p>
<hr>"""
    },
    "premier-ai-seo-aeo-services-in-new-york": {
        "category": "AI SEO & AEO Services",
        "content": """<h1>Premier AI SEO and AEO Services in New York</h1>
<p>In an era where AI is reshaping search, New York businesses need SEO and AEO strategies that go beyond traditional optimization. Premier AI-powered SEO services combine technical expertise with cutting-edge AI tools to deliver measurable results.</p>

<h2>What Sets Premier AI SEO Apart</h2>
<p>Traditional SEO agencies optimize for search engines. Premier AI SEO services optimize for the entire AI-powered discovery ecosystem — including Google SGE, ChatGPT, Perplexity, and voice assistants.</p>

<h3>Core Services</h3>
<ul>
<li><strong>AI Search Audit:</strong> Comprehensive analysis of how your brand appears in AI-generated results</li>
<li><strong>Technical SEO:</strong> Site architecture, Core Web Vitals, structured data, and crawlability</li>
<li><strong>Content Strategy:</strong> AI-optimized content that ranks in traditional and AI search</li>
<li><strong>Local SEO:</strong> Google Business Profile optimization for AI-powered local discovery</li>
<li><strong>AEO Implementation:</strong> Structured content that AI systems cite and recommend</li>
<li><strong>Performance Tracking:</strong> Advanced analytics across traditional and AI search channels</li>
</ul>

<h2>Why New York Businesses Need AI SEO</h2>
<p>New York's competitive business landscape makes strong search visibility essential:</p>
<ul>
<li>Millions of potential customers searching online daily</li>
<li>Intense competition across every industry vertical</li>
<li>AI search changing how consumers discover and choose businesses</li>
<li>Local SEO critical for service-area businesses</li>
</ul>

<h2>The AI SEO Process</h2>
<ol>
<li><strong>Discovery:</strong> Understand your business, goals, and competitive landscape</li>
<li><strong>Audit:</strong> Comprehensive technical and content analysis</li>
<li><strong>Strategy:</strong> Custom AI-optimized SEO plan with clear milestones</li>
<li><strong>Implementation:</strong> Execute technical fixes, content creation, and optimization</li>
<li><strong>Monitoring:</strong> Track performance across all search channels</li>
<li><strong>Optimization:</strong> Continuous improvement based on data and AI search trends</li>
</ol>

<h2>Measuring ROI</h2>
<p>Effective AI SEO delivers measurable business outcomes:</p>
<ul>
<li>Increased organic traffic from traditional and AI search</li>
<li>Higher conversion rates from better-qualified traffic</li>
<li>Improved brand visibility in AI-generated recommendations</li>
<li>Stronger local presence in map and voice search results</li>
</ul>

<h2>Conclusion</h2>
<p>Premier AI SEO and AEO services are essential for New York businesses that want to maintain and grow their online visibility. The integration of AI into search is accelerating, and businesses that invest in AI-optimized strategies now will capture the most value.</p>
<hr>"""
    },
    "top-full-stack-development-companies-in-new-york": {
        "category": "Full-Stack Development",
        "content": """<h1>Top Full-Stack Development Companies in New York</h1>
<p>New York City is home to some of the most talented full-stack development teams in the world. From startups to enterprise solutions, the city's developers build everything from web applications to complex distributed systems.</p>

<h2>What Defines a Top Full-Stack Company</h2>
<p>The best full-stack development companies share several characteristics:</p>
<ul>
<li><strong>Technical breadth:</strong> Expertise across frontend, backend, databases, and DevOps</li>
<li><strong>Modern stack:</strong> Proficiency in current technologies like React, Next.js, Node.js, and cloud platforms</li>
<li><strong>Process maturity:</strong> Agile methodologies, CI/CD, code reviews, and testing practices</li>
<li><strong>Communication:</strong> Clear, transparent project management and client communication</li>
<li><strong>Portfolio:</strong> Proven track record of successful projects across industries</li>
</ul>

<h2>Key Technologies in NYC Full-Stack Development</h2>

<h3>Frontend</h3>
<ul>
<li><strong>React & Next.js:</strong> The dominant framework for modern web applications</li>
<li><strong>TypeScript:</strong> Type-safe JavaScript for maintainable codebases</li>
<li><strong>Tailwind CSS:</strong> Utility-first styling for rapid development</li>
</ul>

<h3>Backend</h3>
<ul>
<li><strong>Node.js:</strong> JavaScript runtime for scalable server applications</li>
<li><strong>Python:</strong> Versatile language for APIs, ML, and data processing</li>
<li><strong>PostgreSQL:</strong> Enterprise-grade relational database</li>
</ul>

<h3>Cloud & DevOps</h3>
<ul>
<li><strong>AWS / GCP / Azure:</strong> Cloud platforms for scalable infrastructure</li>
<li><strong>Docker:</strong> Containerization for consistent deployments</li>
<li><strong>Vercel:</strong> Optimized hosting for Next.js applications</li>
</ul>

<h2>Industries Served</h2>
<p>NYC's full-stack developers build for every industry:</p>
<ul>
<li><strong>Finance:</strong> Trading platforms, banking apps, and fintech solutions</li>
<li><strong>Healthcare:</strong> Patient portals, telemedicine, and health data platforms</li>
<li><strong>E-commerce:</strong> Online stores, marketplaces, and retail technology</li>
<li><strong>Media:</strong> Content management, streaming, and publishing platforms</li>
<li><strong>Real Estate:</strong> Property management, listings, and analytics platforms</li>
</ul>

<h2>Choosing the Right Development Partner</h2>
<ul>
<li>Review their portfolio and case studies</li>
<li>Assess their technical expertise with your required stack</li>
<li>Evaluate their communication and project management approach</li>
<li>Check client references and reviews</li>
<li>Understand their pricing model and timeline estimates</li>
</ul>

<h2>Conclusion</h2>
<p>New York's full-stack development landscape offers world-class talent and diverse expertise. Whether you're building a startup MVP or scaling an enterprise platform, the right development partner can make all the difference in your project's success.</p>
<hr>"""
    },
    "top-tools-for-full-stack-web-development-services-in-queens-ny": {
        "category": "Full-Stack Development",
        "content": """<h1>Top Tools for Full-Stack Web Development Services in Queens, NY</h1>
<p>Queens, NY has emerged as a growing hub for tech talent and full-stack development services. Here's a comprehensive guide to the top tools that power modern full-stack web development.</p>

<h2>Frontend Development Tools</h2>

<h3>Frameworks and Libraries</h3>
<ul>
<li><strong>React:</strong> Component-based UI library dominating the frontend landscape</li>
<li><strong>Next.js:</strong> Full-featured React framework with SSR, SSG, and API routes</li>
<li><strong>Vue.js:</strong> Progressive framework known for gentle learning curve</li>
<li><strong>Angular:</strong> Enterprise-grade framework with comprehensive tooling</li>
</ul>

<h3>Styling Tools</h3>
<ul>
<li><strong>Tailwind CSS:</strong> Utility-first CSS framework for rapid development</li>
<li><strong>Styled Components:</strong> CSS-in-JS for component-scoped styling</li>
<li><strong>Sass/SCSS:</strong> CSS preprocessor for organized stylesheets</li>
</ul>

<h2>Backend Development Tools</h2>

<h3>Runtime and Frameworks</h3>
<ul>
<li><strong>Node.js:</strong> JavaScript runtime for server-side applications</li>
<li><strong>Express.js:</strong> Minimalist web framework for Node.js</li>
<li><strong>Django:</strong> Python framework for rapid backend development</li>
<li><strong>FastAPI:</strong> Modern Python framework with automatic API documentation</li>
</ul>

<h3>Databases</h3>
<ul>
<li><strong>PostgreSQL:</strong> Powerful open-source relational database</li>
<li><strong>MongoDB:</strong> Flexible NoSQL document database</li>
<li><strong>Redis:</strong> In-memory data store for caching and real-time features</li>
<li><strong>Prisma:</strong> Next-generation ORM for type-safe database access</li>
</ul>

<h2>DevOps and Deployment</h2>
<ul>
<li><strong>Docker:</strong> Containerization for consistent development and deployment</li>
<li><strong>Git/GitHub:</strong> Version control and collaboration platform</li>
<li><strong>Vercel:</strong> Optimized hosting for frontend frameworks</li>
<li><strong>AWS:</strong> Comprehensive cloud services for any scale</li>
<li><strong>GitHub Actions:</strong> CI/CD automation integrated with your repository</li>
</ul>

<h2>Development Productivity Tools</h2>
<ul>
<li><strong>VS Code:</strong> The most popular code editor with extensive extensions</li>
<li><strong>Postman:</strong> API testing and documentation</li>
<li><strong>Figma:</strong> Collaborative design tool for UI/UX</li>
<li><strong>Notion/Linear:</strong> Project management and documentation</li>
<li><strong>ESLint/Prettier:</strong> Code quality and formatting tools</li>
</ul>

<h2>Testing Tools</h2>
<ul>
<li><strong>Jest:</strong> JavaScript testing framework</li>
<li><strong>Cypress:</strong> End-to-end testing for web applications</li>
<li><strong>Playwright:</strong> Cross-browser automation and testing</li>
<li><strong>React Testing Library:</strong> Component testing for React apps</li>
</ul>

<h2>Conclusion</h2>
<p>The right tools can dramatically accelerate full-stack development and improve code quality. Queens-based developers and development teams leverage these modern tools to build fast, reliable, and scalable web applications for clients across New York and beyond.</p>
<hr>"""
    },
    "why-gemini-3-is-the-next-big-leap": {
        "category": "AI & Machine Learning",
        "content": """<h1>Why Gemini 3 Is the Next Big Leap in AI Technology</h1>
<p>Google's Gemini 3 represents a significant advancement in artificial intelligence, pushing the boundaries of what multimodal AI can achieve. Here's why it matters and how it impacts businesses and creators.</p>

<h2>What Makes Gemini 3 Different</h2>
<p>Gemini 3 is Google's most capable AI model to date, designed from the ground up to be multimodal — understanding and generating text, images, audio, video, and code natively.</p>

<h3>Key Capabilities</h3>
<ul>
<li><strong>True multimodal reasoning:</strong> Processes multiple data types simultaneously, not just sequentially</li>
<li><strong>Extended context windows:</strong> Handle millions of tokens for analyzing entire codebases or documents</li>
<li><strong>Improved reasoning:</strong> Better logical reasoning, math, and problem-solving abilities</li>
<li><strong>Code generation:</strong> More accurate and context-aware code writing across multiple languages</li>
<li><strong>Creative generation:</strong> Enhanced image and content generation capabilities</li>
</ul>

<h2>Impact on Businesses</h2>

<h3>Productivity Enhancement</h3>
<p>Gemini 3's improved capabilities mean businesses can automate more complex tasks:</p>
<ul>
<li>Document analysis and summarization at scale</li>
<li>Customer service automation with better understanding</li>
<li>Content creation with higher quality and consistency</li>
<li>Data analysis with multimodal inputs (charts, spreadsheets, text)</li>
</ul>

<h3>Developer Tools</h3>
<p>For software teams, Gemini 3 offers:</p>
<ul>
<li>More accurate code completion and generation</li>
<li>Better bug detection and code review assistance</li>
<li>Automated documentation generation</li>
<li>Architecture suggestions based on project context</li>
</ul>

<h2>Impact on Creators</h2>
<p>Content creators and artists can leverage Gemini 3 for:</p>
<ul>
<li><strong>Content ideation:</strong> Generate ideas across text, image, and video formats</li>
<li><strong>Editing assistance:</strong> AI-powered editing for various media types</li>
<li><strong>Translation and localization:</strong> High-quality translations preserving tone and context</li>
<li><strong>Audience analytics:</strong> Better understanding of audience preferences and trends</li>
</ul>

<h2>How to Get Started with Gemini 3</h2>
<ol>
<li><strong>Explore the API:</strong> Access Gemini 3 through Google AI Studio or Vertex AI</li>
<li><strong>Start with simple tasks:</strong> Begin with text generation and analysis</li>
<li><strong>Experiment with multimodal:</strong> Try combining text, image, and code inputs</li>
<li><strong>Build prototypes:</strong> Create proof-of-concept applications for your use case</li>
<li><strong>Scale gradually:</strong> Move from prototypes to production with proper testing</li>
</ol>

<h2>The Competitive Landscape</h2>
<p>Gemini 3 competes with OpenAI's GPT-4, Anthropic's Claude, and Meta's LLaMA. Each has strengths, but Gemini 3's native multimodal architecture and Google's infrastructure give it unique advantages in certain applications.</p>

<h2>Conclusion</h2>
<p>Gemini 3 marks a significant leap in AI capabilities, particularly in multimodal understanding and reasoning. Businesses and creators who explore and adopt these capabilities early will gain meaningful competitive advantages in an increasingly AI-driven world.</p>
<hr>"""
    }
}

def get_category_config(category):
    return CATEGORY_GRADIENTS.get(category, ("from-violet-600 to-indigo-700", "violet", "/blogs"))

def create_content_tsx(slug, meta_data, blog_content_entry):
    category = blog_content_entry["category"]
    gradient, color, category_link = get_category_config(category)
    html_content = blog_content_entry["content"].replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    
    # CTA section customization per category
    cta_map = {
        "AI SEO & AEO Services": ("Ready to Dominate AI Search?", "AI-powered SEO and AEO services to maximize your visibility.", "Boost Your Rankings"),
        "Full-Stack Development": ("Ready to Build Scalable Software?", "Full-stack engineering for robust, secure, performant products.", "Start Your Project"),
        "Mobile App Development": ("Ready to Launch Your App?", "Expert mobile development from concept to App Store success.", "Build Your App"),
        "AI & Machine Learning": ("Ready to Leverage AI?", "Custom AI solutions that transform your business operations.", "Explore AI Solutions"),
    }
    cta_title, cta_desc, cta_btn = cta_map.get(category, ("Ready to Get Started?", "Let us help you achieve your goals.", "Contact Us"))
    
    title = meta_data.get("title", slug.replace("-", " ").title())
    
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
      <section className={{"relative overflow-hidden bg-gradient-to-br {gradient} py-20 lg:py-28"}}>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <div>
            <div className="mb-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to Blogs
              </Link>
            </div>
            <Link href={{categoryLink}} className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
              <span className="text-sm text-white">{category}</span>
            </Link>
            <h1 className="mb-6 text-white">{title}</h1>
            <div className="mb-8 flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm">CoderDesign Team</div>
                  <div className="text-xs text-white/70">Contributor</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{{new Date(meta.createdAt || "2025-01-01T00:00:00.000Z").toDateString()}}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{{meta.readTime}} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className={{"gap-2 bg-white text-{color}-600 hover:bg-white/90"}} asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button variant="overlay" onClick={{() => setShowCalendar(true)}}>Schedule a Call</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{{{ __html: `{html_content}` }}}} />
        </div>
      </article>
      <section className={{"bg-gradient-to-br {gradient} py-20"}}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">{cta_title}</h2>
            <p className="mb-8 text-lg text-white/90">{cta_desc}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={{"bg-white text-{color}-600 hover:bg-white/90"}} asChild>
                <Link href="/contact">{cta_btn}</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={{() => setShowCalendar(true)}}>Schedule a Call</Button>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
      {{showCalendar && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{modalBackdropVariants}}
          transition={{{{ duration: 0.2 }}}}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={{() => setShowCalendar(false)}}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{modalContentVariants}}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-8 shadow-2xl"
            onClick={{(e) => e.stopPropagation()}}
          >
            <button
              onClick={{() => setShowCalendar(false)}}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full p-2 hover:bg-slate-100 transition-colors duration-150"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
            <h3 className="mb-4 sm:mb-6 pr-10 text-xl sm:text-2xl text-slate-900">Schedule a Discovery Call</h3>
            <div className="h-[500px] sm:h-[600px] overflow-hidden rounded-lg">
              <iframe
                src="https://calendly.com/hello-coderdesign/30min"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a Discovery Call"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}}
    </div>
  );
}}
'''

created = 0
for slug_dir in os.listdir(BLOG_DIR):
    dir_path = os.path.join(BLOG_DIR, slug_dir)
    if not os.path.isdir(dir_path):
        continue
    
    meta_path = os.path.join(dir_path, "meta.json")
    page_path = os.path.join(dir_path, "page.tsx")
    content_path = os.path.join(dir_path, "content.tsx")
    
    if not os.path.exists(meta_path):
        continue
    if os.path.exists(page_path) and os.path.exists(content_path):
        continue
    
    if slug_dir not in BLOG_CONTENT:
        print(f"SKIP (no content defined): {slug_dir}")
        continue
    
    with open(meta_path, 'r', encoding='utf-8') as f:
        meta_data = json.load(f)
    
    blog_entry = BLOG_CONTENT[slug_dir]
    
    # Write page.tsx
    if not os.path.exists(page_path):
        with open(page_path, 'w', encoding='utf-8') as f:
            f.write(PAGE_TEMPLATE)
        print(f"Created: {slug_dir}/page.tsx")
    
    # Write content.tsx
    if not os.path.exists(content_path):
        content_code = create_content_tsx(slug_dir, meta_data, blog_entry)
        with open(content_path, 'w', encoding='utf-8') as f:
            f.write(content_code)
        print(f"Created: {slug_dir}/content.tsx")
    
    created += 1

print(f"\nDone! Created files for {created} blogs.")
