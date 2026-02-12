
"use client";
import React from "react";
import Link from "next/link";
import "../globals.css"; // or wherever your CSS lives


export default function HomePage() {
  return (
    <div>
      <header style={{ padding: "1rem", borderBottom: "1px solid #e2e8f0", background: "white" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", margin: 0, color: "#0f172a" }}>CoderDesign</h1>
          <nav>
            <Link href="/full-stack-engineering" style={{ margin: "0 0.5rem", color: "#64748b" }} title="Full-Stack Development Services">
              Full-Stack Development
            </Link>
            <Link href="/mobile-app-development" style={{ margin: "0 0.5rem", color: "#64748b" }} title="Mobile App Development Services">
              Mobile Apps
            </Link>
            <Link href="/ai-workflow" style={{ margin: "0 0.5rem", color: "#64748b" }} title="AI and Intelligent Automation Services">
              AI & Automation
            </Link>
            <Link href="/seo-management" style={{ margin: "0 0.5rem", color: "#64748b" }} title="SEO Management Services">
              SEO
            </Link>
            <Link href="/contact" style={{ margin: "0 0.5rem", color: "#7c3aed" }} title="Contact CoderDesign">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        <article style={{ textAlign: "center", padding: "4rem 0" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              color: "#0f172a",
            }}
          >
            Full-Stack Development, AI & SEO Solutions
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.7,
              color: "#64748b",
              maxWidth: "800px",
              margin: "0 auto 2rem",
            }}
          >
            Transform your business with cutting-edge full-stack engineering, AI-powered automation,
            and data-driven SEO strategies. Based in Toronto at 7 Grosvenor Street, serving
            enterprises nationwide.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              background: "#7c3aed",
              color: "white",
              textDecoration: "none",
              borderRadius: "0.5rem",
              fontWeight: 500,
            }}
            title="Get started with CoderDesign"
          >
            Get Started
          </Link>
        </article>

        <section style={{ padding: "3rem 0" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: "3rem",
              color: "#0f172a",
            }}
          >
            Our Services
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            <article style={cardStyle}>
              <h3 style={cardHeading}>Full-Stack Development</h3>
              <p style={cardText}>
                End-to-end web applications using React, Next.js, Node.js, Python, Django, AWS &
                Google Cloud.
              </p>
            </article>
            <article style={cardStyle}>
              <h3 style={cardHeading}>Mobile App Development</h3>
              <p style={cardText}>
                iOS & Android apps with React Native, Flutter, Swift, Kotlin for Toronto businesses.
              </p>
            </article>
            <article style={cardStyle}>
              <h3 style={cardHeading}>AI & Intelligent Automation</h3>
              <p style={cardText}>
                Custom AI models, chatbots, computer vision, predictive analytics & intelligent automation.
              </p>
            </article>
            <article style={cardStyle}>
              <h3 style={cardHeading}>AI SEO & AEO Services</h3>
              <p style={cardText}>
                AI-powered SEO with GEO targeting and Answer Engine Optimization for maximum
                visibility.
              </p>
            </article>
          </div>
        </section>

        <section style={{ padding: "3rem 0", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 600, marginBottom: "1.5rem", color: "#0f172a" }}>
            Contact Coder Design
          </h2>
          <p style={{ fontSize: "1.125rem", color: "#64748b", marginBottom: "1rem" }}>
            7 Grosvenor Street, Toronto, ON M4Y 0E2
          </p>
          <p style={{ fontSize: "1.125rem", color: "#64748b", marginBottom: "1rem" }}>
            <a href="tel:+14372392448" style={{ color: "#7c3aed", textDecoration: "none" }} title="Call CoderDesign at (437) 239-2448">
              (437) 239-2448
            </a>{" "}
            |{" "}
            <a href="mailto:hello@coderdesign.com" style={{ color: "#7c3aed", textDecoration: "none" }} title="Email CoderDesign">
              hello@coderdesign.com
            </a>
          </p>
        </section>
      </main>

      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          padding: "2rem",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        <p>
          © 2026 CoderDesign. Toronto software development company serving the GTA, Ontario & beyond.
        </p>
      </footer>
    </div>
  );
}

const cardStyle = {
  padding: "1.5rem",
  border: "1px solid #e2e8f0",
  borderRadius: "0.75rem",
};

const cardHeading = {
  fontSize: "1.5rem",
  fontWeight: 600,
  marginBottom: "1rem",
  color: "#0f172a",
};

const cardText = {
  color: "#64748b",
  lineHeight: 1.7,
};
