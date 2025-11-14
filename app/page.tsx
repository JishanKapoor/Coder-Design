"use client";
import React, { useState, useEffect } from "react"; 

// import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { LogoCloud } from "./components/LogoCloud";
import { PlatformSection } from "./components/PlatformSection";
import { SolutionsSection } from "./components/SolutionsSection";
import { EnterpriseSection } from "./components/EnterpriseSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CTASection } from "./components/CTASection";
import { FooterSection } from "./components/FooterSection";
// import { BackendDevelopment } from "./BackendDevelopment/BackendDevelopment";



import { BackendDevelopmentDetail } from "./BackendDevelopmentDetail/BackendDevelopmentDetail";


// SEO Component for adding meta tags and structured data
function SEO({ 
  title = "Coder Design - Full-Stack Development, AI & SEO Agency in New York",
  description = "Premier New York development agency specializing in full-stack engineering, AI/ML solutions, and data-driven SEO. Serving NYC, Manhattan, Brooklyn, and nationwide. Expert React, Next.js, Python, Django developers. Call (437) 239-2448.",
  keywords = "New York development agency, NYC web development, full-stack development New York, AI machine learning NYC, SEO services New York, React developers NYC, Manhattan web agency, Brooklyn app development, enterprise software New York, custom software development NYC",
  canonical = "https://coderdesign.com"
}) {
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Set canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Open Graph tags for social media
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:site_name', content: 'CoderDesign' },
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ];

    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', tag.name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', tag.content);
    });

    // Add structured data (JSON-LD) for organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Coder Design",
      "alternateName": "CoderDesign",
      "description": description,
      "url": canonical,
      "logo": `${canonical}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "17 State Street",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10004",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "40.7037",
        "longitude": "-74.0137"
      },
      "telephone": "(437) 239-2448",
      "email": "hello@coderdesign.com",
      "areaServed": [
        "New York",
        "Manhattan",
        "Brooklyn",
        "Queens",
        "Bronx",
        "Staten Island",
        "United States"
      ],
      "priceRange": "$$$$",
      "sameAs": [
        "https://twitter.com/coderdesign",
        "https://linkedin.com/company/coderdesign",
        "https://github.com/coderdesign"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "telephone": "(437) 239-2448",
        "email": "hello@coderdesign.com",
        "areaServed": "US",
        "availableLanguage": ["English"]
      },
      "offers": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full-Stack Development",
            "description": "End-to-end web application development using modern frameworks"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI & Machine Learning",
            "description": "Custom AI models and machine learning solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI SEO & AEO Services",
            "description": "AI-powered SEO with GEO targeting and Answer Engine Optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "description": "iOS and Android mobile application development"
          }
        }
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, canonical]);

  return null;
}

export default function App() {
  // Simple routing based on hash
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.substring(2) || 'home'; // Remove #/ prefix
      setCurrentPage(path);
      
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);



  // Home page (default)
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <main id="main-content">
          <HeroSection />
          <LogoCloud />
          <PlatformSection />
          <SolutionsSection />
          <EnterpriseSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        
        <FooterSection />
      </div>
    </>
  );
}
