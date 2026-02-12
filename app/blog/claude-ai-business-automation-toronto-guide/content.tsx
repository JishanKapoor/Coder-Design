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
  const category = "AI & Automation";
  const categoryLink = categoryLinks[category] || "/blogs";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
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
                <Link href="/contact">Explore AI Solutions</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Book an AI Consultation</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `

<p>Anthropic just released <strong>Claude 4.6</strong>, and it is not a minor update. This is the biggest leap since Claude 3.5 Sonnet changed the game in 2024. Extended thinking, native tool use, computer use, lower hallucination rates, and faster responses. If you run a business in Toronto and you have been waiting for AI to get good enough to actually trust with real work, this is the version that changes things.</p>

<p>We have been building with Claude since the early API days. We have deployed Claude-powered automation for law firms, e-commerce companies, SaaS platforms, and professional services firms across the GTA. Claude 4.6 is a genuine step change. This article breaks down exactly what is new, why it matters for your business, and how to start using it. (If you want help implementing Claude 4.6 in your operations, explore our <a href="/ai-workflow">AI workflow automation services</a>.)</p>

<hr>

<h2>What Is Claude 4.6? The Key Upgrades</h2>

<p>Claude 4.6 is Anthropic's newest flagship model. It sits at the top of the Claude lineup, above Sonnet 4 and Haiku. But the version number undersells what actually changed. Claude 4.6 introduces three capabilities that fundamentally expand what AI can do for businesses.</p>

<h3>Extended Thinking</h3>

<p>Previous Claude models gave you an answer immediately. Claude 4.6 can <strong>think before it responds</strong>. When you enable extended thinking, the model works through a problem step by step internally before generating its final output. The result is dramatically better performance on complex tasks.</p>

<p>What this means in practice:</p>
<ul>
<li>Financial analysis that actually cross-references multiple data points instead of summarizing surface-level numbers</li>
<li>Contract review that catches subtle conflicts between clauses that earlier models missed</li>
<li>Code generation that considers edge cases, error handling, and architecture before writing the first line</li>
<li>Strategic recommendations that weigh trade-offs instead of listing generic options</li>
</ul>

<p>Extended thinking is not just "more accurate." It changes the <em>type</em> of work you can hand off to AI. Tasks that previously required a senior analyst or experienced developer can now be handled by Claude 4.6 with human review, rather than requiring a human to do the heavy lifting from scratch.</p>

<h3>Native Tool Use</h3>

<p>Claude 4.6 can <strong>call external tools, APIs, and databases</strong> during a conversation. You define the tools available to it (a database query function, a web search API, a Slack integration, a calendar API) and Claude decides when and how to use them.</p>

<p>This turns Claude from a text generator into an <strong>autonomous agent</strong>. Example workflow for a Toronto real estate firm:</p>
<ol>
<li>Client emails asking about comparable sales in a specific neighbourhood</li>
<li>Claude reads the email (text understanding)</li>
<li>Claude queries the MLS database via API (tool use)</li>
<li>Claude pulls recent assessment data from MPAC (tool use)</li>
<li>Claude generates a professional comparable sales report (text generation)</li>
<li>Claude drafts a reply email with the report attached (text generation)</li>
</ol>

<p>That entire workflow, which takes a real estate agent 45 minutes to an hour, happens in under 60 seconds. The agent reviews and sends. That is the difference between tool use and plain text generation.</p>

<h3>Computer Use</h3>

<p>This is the capability that gets the most attention, and for good reason. Claude 4.6 can <strong>see your screen and interact with desktop applications</strong> like a human would: clicking buttons, filling forms, navigating menus, reading results.</p>

<p>Practical applications for Toronto businesses:</p>
<ul>
<li>Data entry across legacy systems that have no API (government portals, old CRMs, insurance platforms)</li>
<li>Automated testing of web applications by navigating the UI and verifying expected behaviour</li>
<li>Filling out compliance forms that require navigating multi-step web portals</li>
<li>Extracting data from systems where the only way to get it is through the user interface</li>
</ul>

<p>Computer use is still in its early days and requires careful setup, but for businesses stuck with legacy systems that have no API, it is a breakthrough. No more paying someone $25 an hour to copy data from one system to another.</p>

<hr>

<h2>Claude 4.6 by the Numbers</h2>

<table>
<thead>
<tr><th>Specification</th><th>Claude 4.6</th><th>Claude Opus 4</th><th>GPT-4o (OpenAI)</th><th>Gemini 2.5 (Google)</th></tr>
</thead>
<tbody>
<tr><td><strong>Context Window</strong></td><td>200K tokens</td><td>200K tokens</td><td>128K tokens</td><td>1M+ tokens</td></tr>
<tr><td><strong>Extended Thinking</strong></td><td>Yes (native)</td><td>No</td><td>Limited (o1-style)</td><td>Yes (Gemini 2.5 Pro)</td></tr>
<tr><td><strong>Tool Use</strong></td><td>Native, multi-step</td><td>Basic</td><td>Function calling</td><td>Function calling</td></tr>
<tr><td><strong>Computer Use</strong></td><td>Yes</td><td>Beta</td><td>No</td><td>No</td></tr>
<tr><td><strong>Hallucination Rate</strong></td><td>Lowest</td><td>Low</td><td>Low-moderate</td><td>Moderate</td></tr>
<tr><td><strong>Code Generation</strong></td><td>Excellent</td><td>Excellent</td><td>Excellent</td><td>Good</td></tr>
<tr><td><strong>Long-Form Writing</strong></td><td>Best in class</td><td>Excellent</td><td>Good</td><td>Good</td></tr>
<tr><td><strong>Speed</strong></td><td>Fast</td><td>Moderate</td><td>Fast</td><td>Fast</td></tr>
<tr><td><strong>API Cost (input/output)</strong></td><td>$3/$15 per 1M tokens</td><td>$3/$15 per 1M tokens</td><td>$2.50/$10 per 1M tokens</td><td>Varies</td></tr>
<tr><td><strong>Data Privacy</strong></td><td>Not used for training</td><td>Not used for training</td><td>Not used for training</td><td>Not used for training</td></tr>
</tbody>
</table>

<p>The context window alone makes Claude 4.6 suitable for processing entire contracts, codebases, or financial reports in a single prompt. 200K tokens is approximately 150,000 words, the equivalent of a 500-page book. No chunking, no summarization workarounds, no lost context.</p>

<hr>

<h2>The Claude 4.6 Model Lineup: Which One to Use</h2>

<p>Anthropic maintains three tiers. Choosing the right one for each task saves money without sacrificing quality.</p>

<table>
<thead>
<tr><th>Model</th><th>Strengths</th><th>Best For</th><th>API Cost (approx.)</th></tr>
</thead>
<tbody>
<tr><td><strong>Claude 4.6</strong></td><td>Extended thinking, tool use, computer use, best reasoning</td><td>Complex analysis, autonomous workflows, high-stakes decisions</td><td>$3/$15 per 1M tokens</td></tr>
<tr><td><strong>Claude Sonnet 4</strong></td><td>Strong balance of capability and speed</td><td>Day-to-day automation, chatbots, content generation, code review</td><td>$1/$5 per 1M tokens</td></tr>
<tr><td><strong>Claude Haiku</strong></td><td>Fastest response, lowest cost</td><td>High-volume simple tasks, classification, routing, quick Q&A</td><td>$0.25/$1.25 per 1M tokens</td></tr>
</tbody>
</table>

<p><strong>The smart approach:</strong> Use Claude 4.6 for the tasks that need deep reasoning (contract analysis, strategic planning, complex code architecture). Use Sonnet 4 for everyday work (email drafting, content creation, standard code generation). Use Haiku for high-volume, low-complexity tasks (email classification, sentiment analysis, routing). A Toronto business running this tiered approach typically spends 60 to 70% less on API costs than one using the top model for everything.</p>

<hr>

<h2>Real Use Cases: How Toronto Businesses Are Using Claude 4.6</h2>

<p>We have been deploying Claude 4.6 for Toronto clients since it launched. Here is what is actually working.</p>

<h3>1. Legal Document Analysis (Law Firms)</h3>

<p>A mid-size Toronto law firm processes 50 to 100 page commercial agreements daily. Previously, a junior associate spent 3 to 4 hours on each contract extracting key terms, identifying risk clauses, and summarizing obligations.</p>

<p>With Claude 4.6's extended thinking enabled, the model reads the entire contract in its 200K context window, reasons through clause interactions, and produces a structured analysis: key dates, financial obligations, termination clauses, liability caps, and flagged risk provisions. The associate reviews Claude's output in 30 minutes instead of doing the analysis from scratch in 4 hours. That is a <strong>7x productivity gain</strong> on one of the firm's most common tasks.</p>

<h3>2. Autonomous Customer Service (E-Commerce)</h3>

<p>A Toronto e-commerce company receives 200+ customer inquiries daily across email, chat, and social media. Response time was averaging 4 to 6 hours.</p>

<p>Using Claude 4.6 with native tool use, they built a system where Claude reads incoming messages, queries the order database (tool use), checks shipping status via Canada Post API (tool use), and generates personalized responses. Complex or sensitive issues are escalated to human agents with a full conversation summary.</p>

<p>Result: 65% of inquiries are fully resolved without human intervention. Average response time dropped from 4 to 6 hours to under 30 seconds. Customer satisfaction increased 23%. The human agents now handle only the cases that genuinely need a person.</p>

<h3>3. Financial Reporting Automation (Professional Services)</h3>

<p>A Toronto consulting firm generates monthly financial reports for 15 clients. Each report requires pulling data from QuickBooks, analyzing trends, comparing against forecasts, and writing a narrative summary. Previously took 2 to 3 hours per client per month.</p>

<p>With Claude 4.6's tool use, the workflow is: Claude queries the QuickBooks API for financial data, runs the analysis with extended thinking enabled, generates the narrative report, and formats it as a PDF. A senior accountant reviews each report in 15 minutes. Monthly reporting for all 15 clients went from 40+ hours to about 4 hours of review time.</p>

<h3>4. Code Generation and Development (SaaS Companies)</h3>

<p>A Toronto SaaS company with a 6-person dev team builds features for their project management platform. Routine coding (CRUD endpoints, form validation, unit tests, documentation) consumed 30 to 40% of developer time.</p>

<p>Claude 4.6 with extended thinking generates better code than previous versions because it plans the architecture before writing. Developers describe what they need, Claude generates TypeScript/React code following the team's existing patterns. Claude also reviews pull requests and generates comprehensive unit tests.</p>

<p>Developer productivity increased 35%. Test coverage went from 45% to 82%. The team ships features faster with fewer bugs.</p>

<h3>5. Legacy System Data Migration (Any Industry)</h3>

<p>A Toronto healthcare clinic runs patient scheduling on a 15-year-old system with no API. Moving to a modern system meant manually re-entering thousands of patient records.</p>

<p>Claude 4.6's computer use capability navigates the legacy system's interface, reads patient data from each screen, and enters it into the new system. What would have taken a temp worker 3 weeks of full-time data entry was completed in 2 days with human spot-checking.</p>

<hr>

<h2>How to Start Using Claude 4.6 in Your Business</h2>

<p>Implementation does not need to be a 6-month project. Here is a practical plan.</p>

<h3>Week 1: Identify and Test</h3>
<ul>
<li>List your team's 10 most repetitive, time-consuming tasks</li>
<li>Score each by volume, time per task, and tolerance for errors</li>
<li>Pick the top 2 to 3 candidates</li>
<li>Sign up for Claude Pro ($20/month) and test the use cases manually at claude.ai</li>
<li>Try extended thinking mode on your most complex task and compare the output to previous Claude versions</li>
</ul>

<h3>Week 2: Prototype with the API</h3>
<ul>
<li>Set up API access at console.anthropic.com</li>
<li>Build a simple script that automates your top use case</li>
<li>Test with 5 to 10 real examples from your business</li>
<li>If tool use is relevant, define the external tools Claude needs access to</li>
<li>Measure time savings versus the manual process</li>
</ul>

<h3>Week 3: Build and Integrate</h3>
<ul>
<li>Connect Claude to your existing tools via API (CRM, database, email, Slack)</li>
<li>Implement error handling and human-in-the-loop review for edge cases</li>
<li>Set up logging and cost tracking</li>
<li>Deploy to a test group of 3 to 5 users</li>
</ul>

<h3>Week 4: Launch and Measure</h3>
<ul>
<li>Roll out to the full team for the selected use case</li>
<li>Track time saved, quality metrics, and user adoption</li>
<li>Gather feedback and refine prompts</li>
<li>Document results and plan the next use case</li>
</ul>

<hr>

<h2>Security and Compliance for Canadian Businesses</h2>

<p>Toronto businesses handling sensitive data need to know how Claude 4.6 handles privacy and compliance.</p>

<h3>Anthropic's Data Policies</h3>
<ul>
<li><strong>API data is not used for training.</strong> Your prompts and outputs stay private.</li>
<li><strong>SOC 2 Type II certified.</strong> Anthropic's security controls meet enterprise standards.</li>
<li><strong>Data retention:</strong> API interactions retained up to 30 days for safety monitoring, then deleted. Shorter retention available for sensitive use cases.</li>
</ul>

<h3>Canadian Compliance Considerations</h3>

<table>
<thead>
<tr><th>Requirement</th><th>How to Address It</th></tr>
</thead>
<tbody>
<tr><td><strong>PIPEDA compliance</strong></td><td>Scrub PII before sending data to Claude. Obtain consent for AI processing. Document your AI data handling practices.</td></tr>
<tr><td><strong>Data residency</strong></td><td>Deploy Claude via AWS Bedrock in ca-central-1 (Montreal) to keep data in Canada.</td></tr>
<tr><td><strong>PHIPA (healthcare)</strong></td><td>Strip patient identifiers before processing. Use placeholders. Maintain audit trails of all AI interactions.</td></tr>
<tr><td><strong>PCI DSS (payments)</strong></td><td>Never send card numbers or CVVs to Claude. Tokenize payment data before processing.</td></tr>
<tr><td><strong>Audit logging</strong></td><td>Log every API call with timestamp, user, and prompt summary (not full content). Retain per compliance requirements.</td></tr>
</tbody>
</table>

<p>For maximum security, access Claude through <strong>AWS Bedrock</strong> in the ca-central-1 region. Your data stays within Canadian infrastructure, you get AWS's additional security controls, and you can use IAM for fine-grained access management.</p>

<hr>

<h2>Prompt Engineering for Claude 4.6</h2>

<p>Claude 4.6 responds to detailed instructions better than any previous model. The gap between a lazy prompt and a well-crafted prompt is enormous.</p>

<h3>The CRAFT Framework</h3>
<ul>
<li><strong>Context:</strong> Give Claude the background. "You are analysing a contract for a Toronto construction company with $15M annual revenue."</li>
<li><strong>Role:</strong> Define the expertise. "Act as a senior contracts analyst with expertise in Canadian construction law."</li>
<li><strong>Action:</strong> Be specific. "Extract all payment terms, deadlines, penalty clauses, and insurance requirements."</li>
<li><strong>Format:</strong> Specify the output. "Format as a table with columns: Clause Number, Type, Summary, Risk Level, Recommended Action."</li>
<li><strong>Tone:</strong> Set the style. "Professional but accessible for a project manager who is not a lawyer."</li>
</ul>

<h3>Extended Thinking Tips</h3>
<ul>
<li>Enable extended thinking for any task involving multi-step analysis, comparison, or decision-making</li>
<li>Give Claude permission to reason at length: "Think through this carefully before responding"</li>
<li>For complex tasks, break the problem into stages and let Claude work through each one</li>
<li>Extended thinking works best with specific, measurable questions rather than open-ended ones</li>
</ul>

<h3>Tool Use Best Practices</h3>
<ul>
<li>Define each tool with a clear, descriptive name and parameter schema</li>
<li>Provide examples of when each tool should and should not be used</li>
<li>Start with a small set of tools and expand as you validate the workflow</li>
<li>Always implement error handling for tool failures. Claude will retry or ask for help if a tool returns an error</li>
</ul>

<hr>

<h2>Claude 4.6 vs. the Competition: Honest Assessment</h2>

<p>Every model has strengths. Here is where Claude 4.6 wins, where it ties, and where competitors have an edge:</p>

<p><strong>Claude 4.6 wins:</strong></p>
<ul>
<li>Extended thinking produces the best results on complex reasoning tasks</li>
<li>Lowest hallucination rate among major models. When accuracy matters, Claude 4.6 is the safest choice</li>
<li>Best long-form writing. Most natural, least repetitive, best structural organization</li>
<li>Computer use. No other major model offers reliable desktop application interaction</li>
<li>Instruction following. Handles multi-step, detailed instructions more precisely than GPT-4o or Gemini</li>
</ul>

<p><strong>It is a tie:</strong></p>
<ul>
<li>Code generation. Claude 4.6 and GPT-4o are both excellent. Claude is slightly better at TypeScript and Python; GPT-4o has broader language support</li>
<li>Multimodal. All three models handle image analysis well. Gemini has the edge on video</li>
<li>API data privacy. All three major providers now commit to not using API data for training</li>
</ul>

<p><strong>Competitors win:</strong></p>
<ul>
<li>Context window. Gemini 2.5 offers 1M+ tokens versus Claude's 200K. If you need to process extremely long documents in a single pass, Gemini has the advantage</li>
<li>Ecosystem integration. If your business runs entirely on Google Workspace, Gemini's native integration is smoother. If you are deep in Microsoft, GPT-4o via Azure is the path of least resistance</li>
<li>Price. GPT-4o is slightly cheaper per token. For high-volume, simple tasks, the cost difference adds up</li>
</ul>

<hr>

<h2>Common Mistakes to Avoid</h2>

<ol>
<li><strong>Using Claude 4.6 for everything.</strong> It is the most capable model, but also the most expensive. Use Sonnet 4 or Haiku for simple tasks. Reserve Claude 4.6 for work that actually needs deep reasoning or tool use.</li>
<li><strong>Skipping human review.</strong> Claude 4.6 is remarkably good, but it is not perfect. Every business-critical output should have human oversight, especially in the first few months.</li>
<li><strong>Lazy prompts.</strong> "Write me a marketing email" produces generic output. A detailed CRAFT prompt produces output that sounds like your brand wrote it.</li>
<li><strong>Not measuring ROI.</strong> Track time saved, cost per task, and error rates from day one. If you cannot quantify the value, you cannot justify expanding.</li>
<li><strong>Trying to automate everything at once.</strong> Pick one high-impact use case. Nail it. Measure results. Then expand. Ten half-built automations deliver zero value.</li>
</ol>

<hr>

<h2>The Toronto AI Advantage</h2>

<p>Toronto is one of the best cities in the world to adopt AI. The Vector Institute, the University of Toronto's computer science department (where Geoffrey Hinton pioneered modern deep learning), and a dense startup ecosystem mean you have access to AI talent that most cities cannot match. Companies like Cohere, Ada, and Wealthsimple are pushing AI adoption across industries, creating a culture where AI is a business tool, not a novelty.</p>

<p>Canadian cloud infrastructure is mature. AWS's ca-central-1 in Montreal and Google Cloud's northamerica-northeast2 in Toronto give you low-latency, Canadian-resident infrastructure for AI workloads. Data sovereignty is handled. Compliance is manageable. The technical barriers are lower than they have ever been.</p>

<p>The question is not whether your Toronto business should use Claude 4.6. The question is whether you will be the one adopting it, or whether you will be competing against businesses that already have.</p>

<hr>

<h2>Frequently Asked Questions</h2>

<h3>What is Claude 4.6 and what is new?</h3>
<p>Claude 4.6 is Anthropic's latest flagship AI model. The major upgrades are extended thinking (the model reasons through complex problems step by step before responding), native tool use (Claude can call APIs, query databases, and interact with external services autonomously), and computer use (Claude can navigate desktop applications by reading screens and clicking interfaces). It also has lower hallucination rates and faster response times compared to Claude Opus 4.</p>

<h3>How much does Claude 4.6 cost for business use?</h3>
<p>Claude offers multiple pricing tiers from free to enterprise, with API access available on a pay-per-usage model. Costs vary significantly based on your use case, volume, and which model tier you choose. Anthropic publishes current pricing on their website, and rates change as the technology evolves. <a href="/contact">Contact our AI team</a> for a tailored cost estimate based on your specific automation requirements and expected usage volume.</p>

<h3>Can Claude 4.6 handle confidential business data securely?</h3>
<p>Yes. Anthropic's API does not use your data for model training. The company holds SOC 2 Type II certification. For Canadian businesses with data residency requirements, deploy Claude through <strong>AWS Bedrock in ca-central-1 (Montreal)</strong> to ensure data stays within Canadian infrastructure. Enterprise plans include additional admin controls, SSO, and audit logging.</p>

<h3>What can Claude 4.6 do that previous versions could not?</h3>
<p>Three major capabilities: extended thinking for better reasoning on complex problems, native tool use for calling external APIs and databases autonomously, and computer use for navigating desktop applications. These make Claude 4.6 capable of autonomous multi-step workflows, not just text generation.</p>

<h3>Should I upgrade from Claude Opus 4 to Claude 4.6?</h3>
<p>Yes, for most use cases. Claude 4.6 offers better reasoning, lower hallucination rates, and faster responses at the same price point. The extended thinking and tool use capabilities enable automation workflows that were not possible before. If you use the API, switching is as simple as updating the model parameter in your API calls.</p>

          ` }} />
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-pink-600 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">Ready to Deploy Claude 4.6 in Your Toronto Business?</h2>
            <p className="mb-8 text-lg text-white/90">We build Claude-powered automation workflows, chatbots, and internal tools for Toronto businesses. From initial strategy to production deployment, we handle the technical work so you get results.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-white/90" asChild>
                <Link href="/contact">Explore AI Solutions</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Book an AI Consultation</Button>
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
