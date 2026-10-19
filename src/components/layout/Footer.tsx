import React from 'react';
import { Youtube, Instagram, Mail, Github, MessageSquare, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { ActiveTab } from '../../types';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenConfig }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#030306] text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-display font-extrabold text-white text-sm shadow-sm">
                N
              </div>
              <span className="font-display font-black tracking-wider text-xl text-white">
                NASCORE <span className="text-blue-500 font-bold">STUDIO</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {siteConfig.brand.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              {siteConfig.social.discord && (
                <a
                  href={siteConfig.social.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors"
                  aria-label="Discord Community"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors"
                aria-label="Business Inquiries"
              >
                <Mail className="w-4 h-4" />
              </a>
              {siteConfig.deployment.repoUrl && (
                <a
                  href={siteConfig.deployment.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 hover:bg-white/[0.08] transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-display">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('videos');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Full Video Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('shorts');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  YouTube Shorts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('notices');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Notices & Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  About the Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Publishing & Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-display">
              Content & Publishing
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`${siteConfig.deployment.repoUrl}/tree/main/public/content/notices`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <span>GitHub Notice Directory</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenConfig}
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Channel & API Inspector
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Business: {siteConfig.social.email}
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Static Architecture · Zero Server Cost
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">Independent Digital Creator & Media Brand</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-400">Powered by YouTube Data API & GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
