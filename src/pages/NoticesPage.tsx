import React, { useState, useMemo } from 'react';
import { Search, Pin, Bell, HelpCircle, ChevronDown, ChevronUp, Github, ExternalLink, RefreshCw } from 'lucide-react';
import { NoticeItem } from '../types';
import { NoticeCard } from '../components/cards/NoticeCard';
import { siteConfig } from '../config/siteConfig';

interface NoticesPageProps {
  notices: NoticeItem[];
  onReadNotice: (notice: NoticeItem) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const NoticesPage: React.FC<NoticesPageProps> = ({
  notices,
  onReadNotice,
  onRefresh,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPublishGuide, setShowPublishGuide] = useState(false);

  const categories = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'Announcement', label: 'Announcements' },
    { id: 'Production', label: 'Production' },
    { id: 'Gaming', label: 'Gaming' },
    { id: 'Release', label: 'Releases' },
    { id: 'Community', label: 'Community' },
  ];

  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || n.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [notices, searchQuery, selectedCategory]);

  const pinnedNotices = filteredNotices.filter((n) => n.pinned);
  const regularNotices = filteredNotices.filter((n) => !n.pinned);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-xs uppercase font-semibold tracking-wider text-blue-400 font-mono mb-1">
            Studio Communications
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Notices & Announcements
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Official broadcasts, production schedules, casting calls, and channel updates published directly from our GitHub content repository.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPublishGuide(!showPublishGuide)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-blue-500/30 bg-blue-950/30 hover:bg-blue-900/40 text-xs font-semibold text-blue-300 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to Publish Free via GitHub</span>
            {showPublishGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh notices from GitHub"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expandable GitHub Notice Publishing Guide */}
      {showPublishGuide && (
        <div className="p-6 rounded-2xl border border-blue-500/40 bg-[#090d1e] text-slate-200 animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold text-white font-display">
                How to Publish a Notice for Free via GitHub (No Server Required)
              </h3>
            </div>
            <a
              href={`${siteConfig.deployment.repoUrl}/blob/main/public/content/notices/index.json`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline"
            >
              <span>Open File on GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed mb-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="font-semibold text-white mb-1.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-mono text-xs">1</span>
                <span>Open in Browser</span>
              </div>
              <p>
                Open your repository on GitHub and browse to <code className="text-blue-400 font-mono">public/content/notices/index.json</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="font-semibold text-white mb-1.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-mono text-xs">2</span>
                <span>Edit & Paste Notice</span>
              </div>
              <p>
                Click the pencil icon, append your new notice object with title, date, category, and markdown content.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="font-semibold text-white mb-1.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-mono text-xs">3</span>
                <span>Commit & Go Live</span>
              </div>
              <p>
                Click Commit changes. The site fetches directly from GitHub Raw or GitHub Pages, making it instantly live!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#090b14] border border-white/[0.08] rounded-xl overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices by keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#090b14] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Pinned Notices Section (Rendered first) */}
      {pinnedNotices.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono">
            <Pin className="w-3.5 h-3.5 fill-current" />
            <span>Pinned Studio Dispatches</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pinnedNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} onRead={onReadNotice} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Notices Section */}
      <div className="space-y-4">
        {pinnedNotices.length > 0 && regularNotices.length > 0 && (
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono pt-4">
            Chronological Archive
          </div>
        )}

        {regularNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} onRead={onReadNotice} />
            ))}
          </div>
        ) : pinnedNotices.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center border border-dashed border-white/[0.1] rounded-2xl bg-[#080a14] p-8">
            <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white font-display">No notices found</h3>
            <p className="mt-1.5 text-xs text-slate-400 max-w-sm mx-auto">
              There are no announcements currently matching your filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
