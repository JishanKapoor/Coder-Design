"use client";
import { Linkedin, Instagram, Mail, Phone, MapPin, FileText } from "lucide-react";
import { Logo } from "./Logo";
import Link from "next/link";
const footerLinks = {
  Services: [
    { label: "Full-Stack Development", href: "/full-stack-engineering" },
    { label: "Mobile App Development", href: "/mobile-app-development" },
    { label: "AI & Machine Learning", href: "/ai-workflow" },
    { label: "AI SEO & AEO Services", href: "/seo-management" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blogs", href: "/blogs" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  // Scroll to top when clicking footer links
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export function FooterSection() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand Column */}
          <div>
            <Link href="/" onClick={handleLinkClick} className="mb-6 inline-flex items-center gap-3">
              <Logo />
              <span className="text-2xl tracking-tight text-slate-900">CoderDesign</span>
            </Link>
            <p className="mb-8 max-w-md text-slate-600">
              Development agency specializing in full-stack development, mobile apps, AI/ML solutions, and AI-powered SEO with GEO targeting & AEO.
            </p>
            
            {/* Contact Info */}
            <div className="mb-8 space-y-4">
              <a 
                href="mailto:hello@coderdesign.com"
                className="flex items-center gap-3 text-slate-600 transition-colors hover:text-violet-600"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                  <Mail className="h-5 w-5 text-violet-600" />
                </div>
                <span>hello@coderdesign.com</span>
              </a>
              <a 
                href="tel:+14372392448" 
                className="flex items-center gap-3 text-slate-600 transition-colors hover:text-violet-600"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                  <Phone className="h-5 w-5 text-violet-600" />
                </div>
                <span>(437) 239-2448</span>
              </a>
              <a 
                href="https://maps.app.goo.gl/vSXFVtvVq2Tm3D4F7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-slate-600 transition-colors hover:text-violet-600"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                  <MapPin className="h-5 w-5 text-violet-600" />
                </div>
                <span>17 State Street<br />New York, NY 10004</span>
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/coder-design-905aa5390/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/coderdesigngroup/?igsh=dW51aXNhODFtN2pr#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://medium.com/@coderdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                aria-label="Medium"
              >
                <svg className="h-5 w-5" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 12A13 13 0 1015 38 13 13 0 1015 12zM35.5 13c-3.59 0-6.5 5.373-6.5 12 0 1.243.102 2.441.292 3.568.253 1.503.662 2.879 1.192 4.065.265.593.56 1.138.881 1.627.642.978 1.388 1.733 2.202 2.201C34.178 36.811 34.827 37 35.5 37s1.322-.189 1.933-.539c.814-.468 1.56-1.223 2.202-2.201.321-.489.616-1.034.881-1.627.53-1.185.939-2.562 1.192-4.065C41.898 27.441 42 26.243 42 25 42 18.373 39.09 13 35.5 13zM45.5 14c-.259 0-.509.173-.743.495-.157.214-.307.494-.448.833-.071.169-.14.353-.206.551-.133.395-.257.846-.37 1.343-.226.995-.409 2.181-.536 3.497-.063.658-.112 1.349-.146 2.065C43.017 23.499 43 24.241 43 25s.017 1.501.051 2.217c.033.716.082 1.407.146 2.065.127 1.316.31 2.501.536 3.497.113.498.237.948.37 1.343.066.198.135.382.206.551.142.339.292.619.448.833C44.991 35.827 45.241 36 45.5 36c1.381 0 2.5-4.925 2.5-11S46.881 14 45.5 14z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="mb-5 text-slate-900">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className="text-slate-600 transition-colors hover:text-violet-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CoderDesign. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
