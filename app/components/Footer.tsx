"use client";
import { Brain } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Documentation", "API Reference"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Community", "Tutorials", "Support", "Status"],
  Legal: ["Privacy", "Terms", "Security", "Compliance"],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg text-white">AI Backend</span>
            </div>
            <p className="text-sm text-slate-400">
              Powering the next generation of intelligent applications with cutting-edge AI infrastructure.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} AI Backend Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
