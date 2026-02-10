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
  const category = "Full-Stack Development";
  const categoryLink = categoryLinks[category as keyof typeof categoryLinks] || "/blogs";
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className={"relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-20 lg:py-28"}>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <div>
            <div className="mb-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to Blogs
              </Link>
            </div>
            <Link href={categoryLink} className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
              <span className="text-sm text-white">Full-Stack Development</span>
            </Link>
            <h1 className="mb-6 text-white">Top Tools for Full Stack Web Development Services in Toronto</h1>
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
                <span>{new Date(meta.createdAt || "2025-01-01T00:00:00.000Z").toDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{meta.readTime} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className={"gap-2 bg-white text-violet-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Start Building Your App</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Talk to a Dev Lead</Button>
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `<p>Toronto has emerged as a growing hub for tech talent and full-stack development services. Here's a comprehensive guide to the top tools that power modern full-stack web development.</p>

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

<h2>Picking the Right Tools for Your Stack</h2>
<p>The right tools can dramatically accelerate full-stack development and improve code quality. Toronto-based developers and development teams leverage these modern tools to build fast, reliable, and scalable web applications for clients across the GTA and beyond.</p>
<hr>` }} />
        </div>
      </article>
      <section className={"bg-gradient-to-br from-violet-600 to-indigo-700 py-20"}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="text-center">
            <h2 className="mb-6 text-white text-3xl font-bold">
              Build Better Web Apps with the Right Tech Stack
            </h2>
            <p className="mb-8 text-lg text-white/90">Full-stack engineering for robust, secure, performant products.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className={"bg-white text-violet-600 hover:bg-white/90"} asChild>
                <Link href="/contact">Begin Your Web Project</Link>
              </Button>
              <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>Talk to a Dev Lead</Button>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
      {showCalendar && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalBackdropVariants}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowCalendar(false)}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
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
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a Discovery Call"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
