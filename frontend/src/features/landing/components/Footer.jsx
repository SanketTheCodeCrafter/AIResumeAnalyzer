import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { FOOTER_LINKS } from "../constants/landingData";

const SocialIcons = {
  Github: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.1a5.8 5.8 0 0 0-1.6-4.03 5.9 5.9 0 0 0-.16-3.9s-1.3-.4-4 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-4-1.4-4-1.4a5.9 5.9 0 0 0-.16 3.9 5.8 5.8 0 0 0-1.6 4.03c0 5.7 3.35 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.03v4"/><path d="M9 20c-3 1-5-1-6-3"/></svg>,
  Linkedin: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  Twitter: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
};

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#030712] pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-6 inline-flex">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-80" />
                <Sparkles className="w-4 h-4 text-white relative z-10" />
              </div>
              <span className="text-xl font-bold text-slate-50 tracking-tight">
                AI Resume Analyzer
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">
              AI-powered platform to help you optimize your resume, prepare for interviews, and land your dream job.
            </p>
            <div className="flex items-center gap-4">
              {Object.entries(SocialIcons).map(([name, Icon]) => (
                <a key={name} href="#" aria-label={name} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/10 transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-slate-200 font-semibold mb-6">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
          </p>
          <div className="text-sm text-slate-500">
             Contact: support@airesumeanalyzer.com
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
