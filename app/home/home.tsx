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
            <Link href="/full-stack-engineering" style={{ margin: "0 0.5rem", color: "#64748b" }}>
              Full-Stack Development
            </Link>
            <Link href="/mobile-app-development" style={{ margin: "0 0.5rem", color: "#64748b" }}>
              Mobile Apps
            </Link>
            <Link href="/ai-workflow" style={{ margin: "0 0.5rem", color: "#64748b" }}>
              AI & ML
            </Link>
            <Link href="/seo-management" style={{ margin: "0 0.5rem", color: "#64748b" }}>
              SEO
            </Link>
            <Link href="/contact" style={{ margin: "0 0.5rem", color: "#7c3aed" }}>
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
            and data-driven SEO strategies. Based in New York at 17 State Street, serving
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
                iOS & Android apps with React Native, Flutter, Swift, Kotlin for NYC businesses.
              </p>
            </article>
            <article style={cardStyle}>
              <h3 style={cardHeading}>AI & Machine Learning</h3>
              <p style={cardText}>
                Custom AI models, chatbots, computer vision, predictive analytics & automation.
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
            17 State Street, New York, NY 10004
          </p>
          <p style={{ fontSize: "1.125rem", color: "#64748b", marginBottom: "1rem" }}>
            <a href="tel:+14372392448" style={{ color: "#7c3aed", textDecoration: "none" }}>
              (437) 239-2448
            </a>{" "}
            |{" "}
            <a href="mailto:hello@coderdesign.com" style={{ color: "#7c3aed", textDecoration: "none" }}>
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
          © 2025 Coder Design. New York development agency serving Manhattan, Brooklyn & beyond.
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
