"use client";
import { Button } from "./ui/button";
import { Brain, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg text-slate-900">AI Backend</span>
          </div>
          
          <nav className="hidden gap-8 md:flex">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">
              Features
            </a>
            <a href="#services" className="text-sm text-slate-600 hover:text-slate-900">
              Services
            </a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900">
              Pricing
            </a>
            <a href="#docs" className="text-sm text-slate-600 hover:text-slate-900">
              Docs
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button>Get Started</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
