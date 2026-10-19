import React, { useState, useMemo } from 'react';
import { Search, Smartphone, Youtube, ExternalLink } from 'lucide-react';
import { YouTubeVideo } from '../types';
import { ShortCard } from '../components/cards/ShortCard';
import { siteConfig } from '../config/siteConfig';

interface ShortsPageProps {
  shorts: YouTubeVideo[];
  onPlayShort: (video: YouTubeVideo) => void;
}

export const ShortsPage: React.FC<ShortsPageProps> = ({ shorts, onPlayShort }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShorts = useMemo(() => {
    return shorts.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [shorts, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-xs uppercase font-semibold tracking-wider text-blue-400 font-mono mb-1">
            Vertical Feed
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            YouTube Shorts
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Bite-sized moments, clutch highlights, editing breakdowns, and quick behind-the-scenes teasers formatted for vertical mobile viewing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`${siteConfig.youtube.channelUrl}/shorts`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600/90 hover:bg-red-600 text-xs font-semibold text-white transition-colors"
          >
            <Youtube className="w-3.5 h-3.5 fill-current" />
            <span>Open Shorts Feed</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Shorts titles..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#090b14] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="text-xs text-slate-400 font-mono tabular-nums self-end sm:self-auto">
          Showing {filteredShorts.length} verified Shorts
        </div>
      </div>

      {/* Shorts Vertical Grid */}
      {filteredShorts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredShorts.map((short) => (
            <ShortCard key={short.id} short={short} onPlay={onPlayShort} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-white/[0.1] rounded-2xl bg-[#080a14] p-8">
          <Smartphone className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white font-display">No Shorts match your search</h3>
          <p className="mt-1.5 text-xs text-slate-400 max-w-sm mx-auto">
            Try searching for another topic or clear the search query.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};
