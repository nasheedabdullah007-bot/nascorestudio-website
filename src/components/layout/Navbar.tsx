import React, { useState } from 'react';
import { Youtube, Menu, X, SlidersHorizontal, ExternalLink } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { ActiveTab } from '../../types';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenConfig: () => void;
  isApiConfigured: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenConfig,
  isApiConfigured,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'videos', label: 'Videos' },
    { id: 'shorts', label: 'Shorts' },
    { id: 'notices', label: 'Notices' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#050508]/85 backdrop-blur-md">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Distinctive Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 transition-opacity hover:opacity-90 cursor-pointer"
          aria-label="NASCORE STUDIO Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-display font-extrabold text-white text-base shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black tracking-wider text-lg sm:text-xl text-white">
              NASCORE <span className="text-blue-500 font-bold">STUDIO</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Clean 4–5 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (+ Developer Config Inspector & Mobile Toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Setup / Inspector toggle */}
          <button
            onClick={onOpenConfig}
            title={isApiConfigured ? 'YouTube API Connected' : 'Configure YouTube API & Channel'}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors relative cursor-pointer"
            aria-label="Open API and Channel Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {!isApiConfigured && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          {/* Primary CTA: Subscribe on YouTube */}
          <a
            href={siteConfig.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition-all shadow-sm shadow-blue-600/30 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Youtube className="w-4 h-4 text-white fill-current" />
            <span>Subscribe</span>
            <ExternalLink className="w-3 h-3 text-blue-200" />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#090b14] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-blue-600/20 text-white font-semibold'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <a
              href={siteConfig.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
            </a>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfig();
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-xs text-slate-400 hover:text-slate-200 border border-white/[0.08] rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Channel & API Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
