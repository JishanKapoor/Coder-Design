"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import Link from "next/link";

export function Navigation() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { label: "Web Development", href: "/full-stack-engineering" },
    { label: "Mobile Apps", href: "/mobile-app-development" },
    { label: "AI Automation", href: "/ai-workflow" },
    { label: "SEO Services", href: "/seo-management" },
    { label: "Blogs", href: "/blogs" },
    { label: "Tools", href: "/tools" },
    { label: "About", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-[1400px] px-4 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo className="text-2xl" />
            <span className="text-xl font-semibold tracking-tight text-slate-900">
              CoderDesign
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className=" nav_lg items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 transition-colors hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact + Mobile Toggle */}
          <div className=" flex items-center gap-4">
            <Button
              className=" nav_lg bg-violet-600 hover:bg-violet-700"
              size="sm"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav_md flex items-center justify-center text-slate-900"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 500 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="mx-auto max-w-[1400px] space-y-1 px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 pt-2">
                <Button className="w-full bg-violet-600 hover:bg-violet-700" asChild>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
