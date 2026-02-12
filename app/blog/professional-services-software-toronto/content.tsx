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
  const category = "Full-Stack Development";
  const categoryLink = categoryLinks[category] || "/blogs";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative overflow-hidden bg-purple-600 py-20 lg:py-28">
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
              <Button className="gap-2 bg-white text-purple-600 hover:bg-white/90" asChild>
                <Link href="/contact">Get Your Enterprise Quote</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Schedule Discovery Call</Button>
            </div>
          </div>
        </div>
      </section>

      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `

<p>Tata Consultancy Services is the largest IT services company in the world by market capitalization, with over 600,000 employees serving clients across banking, insurance, retail, healthcare, and government in 46 countries. When TCS wins a major enterprise contract — a core banking transformation, a cloud migration program, or a digital workplace rollout — they often need specialized engineering teams to handle specific workstreams that require deep expertise in modern technologies their internal bench may not have immediately available. That is exactly how our partnership with TCS began.</p>

<blockquote>"CoderDesign operates at the quality bar we set for our Tier 1 banking clients. Their engineers embedded into our delivery team seamlessly and took full ownership of the cloud migration workstream. We've since brought them onto three additional engagements." — Delivery Director, TCS Canada Financial Services</blockquote>

<p>We have been a technology delivery partner for TCS Canada since 2023, working on outsourced engineering workstreams for their financial services clients. This case study covers our largest engagement: building a cloud migration platform that helped one of Canada's Big Five banks move 340 legacy applications from on-premise data centers to a hybrid AWS and Azure cloud environment. We'll walk through exactly what we built, the technical decisions we made, the edge cases that nearly derailed the project, and how our <a href="/full-stack-engineering">full-stack development</a>, <a href="/ai-workflow">AI automation</a>, <a href="/mobile-app-development">mobile engineering</a>, and <a href="/seo-management">SEO capabilities</a> contributed to the success of this engagement.</p>

<img src="/images/projects/tcs-office.jpg" alt="Enterprise engineering team working on TCS cloud migration project" style="width:100%;border-radius:12px;margin:2rem 0;" />

<h2>How Enterprise Outsourcing Actually Works</h2>

<p>When people hear "outsourcing" they think of offshoring entire projects to the lowest bidder. That is not what this is. TCS operates a sophisticated partner ecosystem where specialized firms like ours handle specific technical workstreams within larger programs. TCS manages the client relationship, program governance, and overall delivery accountability. We bring deep technical expertise in areas where speed and specialization matter more than headcount.</p>

<p>For this banking engagement, TCS was managing a three-year digital transformation program with over 200 consultants across multiple workstreams: core banking modernization, regulatory reporting, digital channels, and infrastructure migration. Our team was brought in specifically for the infrastructure migration workstream because TCS needed engineers who had hands-on experience building cloud migration tooling, not just consultants who could create migration roadmaps in PowerPoint.</p>

<h3>The Staffing Model</h3>

<p>We embedded a team of six engineers into TCS's delivery structure. They reported to TCS's delivery manager, attended daily standups with the broader program team, used the client's Jira instance and Confluence knowledge base, and followed TCS's delivery methodology (Agile with two-week sprints, formal sprint reviews with the client's CTO office). From the client's perspective, our engineers were indistinguishable from TCS's own team. This is what good partnership outsourcing looks like — seamless integration, shared accountability, and no finger-pointing when things get difficult.</p>

<h2>The Challenge: Migrating 340 Legacy Applications to Cloud</h2>

<p>The bank had 340 applications running across three on-premise data centers in Toronto and Montreal. These ranged from modern Java and Node.js microservices to legacy COBOL batch processing systems, mainframe-connected middleware, and vendor-packaged applications with limited documentation. The mandate from the bank's board was clear: reduce data center costs by 60% within 36 months while maintaining zero downtime for customer-facing services and meeting OSFI (Office of the Superintendent of Financial Institutions) regulatory requirements for cloud deployment of financial data.</p>

<h3>Application Discovery and Classification</h3>

<p>The first challenge was that nobody had a complete, accurate inventory of what was actually running. The bank's CMDB (Configuration Management Database) was outdated and listed applications that had been decommissioned years ago while missing others that had been spun up by individual teams without going through formal IT processes. We built a custom discovery tool using AWS Application Discovery Service combined with network flow analysis that scanned the on-premise environment and mapped every running process, its dependencies, network connections, and data stores. This tool identified 47 applications that were not in the official inventory, including three that processed customer PII (Personally Identifiable Information) without proper data classification labels.</p>

<h3>The Six Migration Strategies</h3>

<p>Not every application can be lifted and shifted to the cloud. We classified each application into one of six migration strategies based on its architecture, dependencies, compliance requirements, and business criticality.</p>

<p>Rehost (lift and shift) was used for 112 applications that were already running on Linux VMs with no hard dependencies on physical hardware. These moved to EC2 instances on AWS with minimal changes. Replatform was used for 89 applications that needed minor modifications — updating database connection strings to point to RDS instead of on-premise Oracle, switching file storage from NAS to S3, or updating service discovery to use cloud-native DNS. Refactor was required for 43 applications that needed significant architectural changes to work in the cloud, including breaking monolithic applications into containers and updating authentication to use the bank's cloud IAM system. Repurchase applied to 31 applications where a SaaS equivalent existed that met the bank's requirements, such as moving from on-premise JIRA to Atlassian Cloud. Retain covered 48 applications that could not move to cloud due to regulatory constraints, mainframe dependencies, or vendor licensing restrictions. Retire applied to 17 applications that were identified as redundant or unused during the discovery phase.</p>

<img src="/images/projects/tcs-team-collab.jpg" alt="Cross-functional team collaborating on cloud migration architecture review" style="width:100%;border-radius:12px;margin:2rem 0;" />

<h2>What We Built: The Cloud Migration Platform</h2>

<p>Rather than migrating applications one at a time through manual processes, we built a migration platform that automated and standardized the entire workflow. This platform became the backbone of the migration program and is now being reused by TCS for other banking clients.</p>

<h3>Migration Pipeline Engine</h3>

<p>We built an orchestration engine in Python and Terraform that automated the end-to-end migration process for each application. The pipeline handled: provisioning the target cloud infrastructure based on the application's resource profile, configuring networking (VPCs, subnets, security groups, transit gateway connections back to on-premise), deploying the application using the appropriate strategy (VM image for rehost, container image for replatform, CI/CD pipeline for refactor), running automated validation tests to verify the application worked correctly in the cloud environment, configuring monitoring and alerting (CloudWatch, Datadog integration), and updating DNS and load balancer configurations to route traffic to the cloud deployment.</p>

<p>Each migration went through a four-stage process: deploy to cloud (parallel running with on-premise), validate with synthetic traffic, gradual traffic shift (10%, 25%, 50%, 100%), and decommission on-premise resources after 30-day stability period. This process was codified in the pipeline so that every migration followed the same rigorous steps regardless of which engineer was executing it.</p>

<h3>Compliance and Security Automation</h3>

<p>Banking regulations in Canada require strict controls over where financial data is stored, who can access it, how it's encrypted, and how access is audited. OSFI's B-13 guideline specifically covers cloud computing and outsourcing for federally regulated financial institutions. We built compliance automation that enforced these requirements at the infrastructure level.</p>

<p>Every cloud resource was automatically tagged with data classification labels (public, internal, confidential, restricted) based on the application's data profile. Resources handling restricted data were automatically deployed to dedicated tenancy instances in the Canada (Central) AWS region with customer-managed KMS encryption keys. Network policies automatically prevented any data from routing through non-Canadian regions. IAM policies were generated from templates that enforced least-privilege access based on the application's security tier. All infrastructure changes were logged to an immutable audit trail in S3 with CloudTrail, and any manual changes outside of the pipeline triggered immediate alerts to the security operations team.</p>

<h3>Application Dependency Mapping</h3>

<p>The most technically challenging part of the project was handling application dependencies. Application A might depend on Application B's database, which depends on Application C's message queue, which depends on a mainframe batch job that runs at 2 AM. If you migrate Application A to the cloud without accounting for these dependencies, it breaks in production.</p>

<p>We built a dependency graph visualization tool using Neo4j that mapped every application's upstream and downstream dependencies based on the network flow data from our discovery tool, plus manual interviews with application owners. This graph was used to determine migration ordering — you cannot migrate Application A until its critical dependencies are either already in the cloud or accessible via the hybrid network connection. The tool also identified circular dependencies (A depends on B, B depends on C, C depends on A) that required careful planning to break.</p>

<h2>AI-Powered Migration Intelligence</h2>

<p>We built several <a href="/ai-workflow">AI-powered tools</a> that significantly accelerated the migration program.</p>

<h3>Automated Code Analysis for Refactoring</h3>

<p>For the 43 applications that needed refactoring, manually analyzing the codebase to identify cloud-incompatible patterns would have taken months. We built an AI code analyzer using GPT-4 that scanned application source code and configuration files to identify: hardcoded IP addresses and hostnames that needed to be replaced with cloud service endpoints, file system dependencies that needed to move to S3 or EFS, session state stored on local disk that needed to move to Redis or DynamoDB, database queries that used vendor-specific syntax incompatible with RDS, and authentication mechanisms that needed to integrate with the bank's cloud IAM. The tool generated a refactoring report for each application with specific code changes required, estimated effort, and risk level. This reduced the assessment phase for refactoring candidates from an average of 3 weeks per application to 3 days.</p>

<h3>Predictive Risk Scoring</h3>

<p>Not every migration goes smoothly, and the consequences of a failed migration in banking are severe — potential customer impact, regulatory scrutiny, and reputational damage. We built a predictive risk scoring model that analyzed each application's characteristics (age, technology stack, number of dependencies, data sensitivity, change frequency, test coverage) and assigned a migration risk score. Applications with high risk scores got additional validation steps, longer parallel running periods, and dedicated rollback procedures. This model correctly predicted 91% of the migrations that encountered issues, allowing the team to allocate extra attention where it mattered most.</p>

<h3>Intelligent Runbook Generation</h3>

<p>Each migration required a detailed runbook — a step-by-step document that operations teams followed during the migration window. Writing runbooks manually for 340 applications was not feasible. We built an AI system that generated migration runbooks automatically based on the application's profile, migration strategy, dependencies, and compliance requirements. Each runbook included pre-migration checks, step-by-step migration procedures, validation tests, rollback procedures, and escalation contacts. Operations teams reviewed and approved each runbook before execution, but the AI generation saved approximately 4,000 hours of documentation work across the program.</p>

<h2>The Mobile Command Center</h2>

<p>Migration windows often happened during weekends and evenings to minimize customer impact. TCS's delivery managers and the bank's IT leadership needed real-time visibility into migration progress from anywhere, not just from their laptops in the office.</p>

<p>We built a <a href="/mobile-app-development">React Native mobile application</a> that served as a migration command center. The app showed real-time status of active migrations, health metrics for recently migrated applications, alerts and incidents requiring attention, approval workflows for migration gate checks, and communication channels for the migration team. This app was used by 45 stakeholders across TCS, the bank's IT organization, and our team during every migration window. The bank's CIO specifically called out the mobile command center as a differentiator in the program's quarterly review.</p>

<h2>Edge Cases That Nearly Derailed the Project</h2>

<p>Enterprise cloud migrations are full of surprises. Here are the edge cases that taught us the most.</p>

<p>One legacy application written in PowerBuilder (a technology from the 1990s) had no source code available. The original vendor had gone out of business, and the bank's developers had been maintaining it through configuration changes only. We could not refactor it, and it could not run in a container. We ended up creating a custom VM image that replicated the exact on-premise server configuration (down to the specific Windows Server 2008 patch level) and ran it on a dedicated EC2 instance with enhanced monitoring. This was not elegant, but it worked and kept the migration timeline on track.</p>

<p>Another application had a hard dependency on a physical hardware security module (HSM) for cryptographic operations. AWS CloudHSM was a potential replacement, but the application's cryptographic library used proprietary APIs that were not compatible with CloudHSM's PKCS#11 interface. We built a lightweight proxy service that translated between the legacy HSM API and CloudHSM, allowing the application to move to the cloud without modifying its cryptographic code. This proxy is now a reusable component in TCS's migration toolkit.</p>

<p>The most politically challenging edge case involved an application owned by a business unit that refused to participate in the migration. Their VP believed the cloud was less secure than their on-premise data center and threatened to escalate to the board. TCS's program director arranged a series of technical briefings where we demonstrated the security controls we had built, showed how the cloud environment actually exceeded the security posture of the on-premise data center (continuous compliance monitoring, automated patching, immutable audit logs), and provided a detailed risk assessment. The VP eventually agreed, and that application was migrated without issues.</p>

<h2>Results: Delivered on Time, Under Budget</h2>

<p>After 18 months of active migration work, the program delivered results that exceeded the original business case.</p>

<ul>
<li>287 of 340 applications successfully migrated to cloud (48 retained on-premise by design, 17 retired, with 12 remaining rehost candidates scheduled for completion)</li>
<li>Data center costs reduced by 52% in year one, projected to reach 65% reduction by year two</li>
<li>Zero customer-facing outages during migration windows across all 287 application migrations</li>
<li>Average migration time per application reduced from 6 weeks (manual process) to 11 days (using our automated pipeline)</li>
<li>OSFI compliance audit passed with zero findings related to cloud deployment</li>
<li>Migration platform now being reused by TCS for three additional banking clients in Canada and the UK</li>
<li>AI code analysis tool saved an estimated 4,000 hours of manual assessment work</li>
<li>Mobile command center adopted as standard tooling for all TCS infrastructure migration programs in Canada</li>
</ul>

<h2>Why TCS Partners with Teams Like Ours</h2>

<p>Large consulting firms like TCS, Infosys, Wipro, and Accenture have massive global workforces, but they often need specialized partners for specific technical capabilities. The technology landscape moves faster than any single organization can keep up with. When TCS needs a team that can build production-grade Terraform modules, write custom Kubernetes operators, implement AI-powered code analysis tools, or build React Native mobile applications on a tight timeline, they bring in partners who do that work every day rather than training internal teams from scratch.</p>

<p>For us, partnering with TCS gives us access to enterprise-scale projects that we would not win as an independent firm. The bank in this case study would never have hired a boutique development shop directly for a program of this size and sensitivity. But through TCS, we get to work on the most technically challenging problems in enterprise IT while TCS handles program management, client relationships, and governance.</p>

<p>This model works because both sides bring genuine value. TCS brings enterprise relationships, delivery methodology, and global scale. We bring deep technical expertise, modern engineering practices, and the ability to build custom tooling that accelerates delivery. The client gets the best of both worlds.</p>

<h2>How We Can Help Your Enterprise</h2>

<p>Whether you are a large consulting firm looking for a specialized technology delivery partner, or an enterprise that needs engineering help with cloud migration, application modernization, or digital transformation, our team brings the same quality and ownership we demonstrated in this TCS engagement.</p>

<p>Our capabilities include <a href="/full-stack-engineering">full-stack web and platform development</a> using React, Next.js, Node.js, Python, and Terraform. We build <a href="/mobile-app-development">enterprise mobile applications</a> for operations teams, field workers, and executive dashboards. Our <a href="/ai-workflow">AI and automation team</a> builds intelligent tools for code analysis, document processing, and workflow automation. And our <a href="/seo-management">digital marketing team</a> helps professional services firms build their online presence and attract clients through organic search.</p>

<p>If you have a technical challenge that requires experienced engineers who can integrate into your delivery team and take full ownership of results, <a href="/contact">book a consultation</a>. We will review your requirements, understand your delivery model, and give you an honest assessment of how we can help.</p>

` }} />

        </div>
      </article>

      <section className="bg-purple-600 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
          <h2 className="mb-6 text-white">Ready to Partner on Your Next Enterprise Project?</h2>
          <p className="mb-8 text-lg text-white/90">
            From cloud migration to AI automation, we help enterprises and consulting firms deliver complex technology programs on time and on budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90" asChild>
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
