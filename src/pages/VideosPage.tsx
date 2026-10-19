import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Film, RefreshCw, AlertCircle, Play } from 'lucide-react';
import { YouTubeVideo } from '../types';
import { VideoCard } from '../components/cards/VideoCard';

interface VideosPageProps {
  videos: YouTubeVideo[];
  onPlayVideo: (video: YouTubeVideo) => void;
  isLoading: boolean;
  onRefresh: () => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({
  videos,
  onPlayVideo,
  isLoading,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Available categories
  const categories = [
    { id: 'all', label: 'All Releases' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'storytelling', label: 'Storytelling & Docs' },
    { id: 'creator-culture', label: 'Creator Culture' },
    { id: 'music-creative', label: 'Music & Audio' },
  ];

  // Filter & sort logic
  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        // Exclude Shorts from main regular videos library unless explicitly searched
        const matchesSearch =
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesCat = true;
        if (selectedCategory !== 'all') {
          if (video.category) {
            matchesCat = video.category === selectedCategory;
          } else {
            // Intelligent heuristic based on title/tags
            const lowerTitle = video.title.toLowerCase();
            if (selectedCategory === 'gaming') {
              matchesCat = lowerTitle.includes('game') || lowerTitle.includes('tactical') || lowerTitle.includes('clutch');
            } else if (selectedCategory === 'storytelling') {
              matchesCat = lowerTitle.includes('documentary') || lowerTitle.includes('story') || lowerTitle.includes('archives') || lowerTitle.includes('algorithm');
            } else if (selectedCategory === 'creator-culture') {
              matchesCat = lowerTitle.includes('youtuber') || lowerTitle.includes('creator') || lowerTitle.includes('exposure') || lowerTitle.includes('drama');
            } else if (selectedCategory === 'music-creative') {
              matchesCat = lowerTitle.includes('music') || lowerTitle.includes('sound') || lowerTitle.includes('synth') || lowerTitle.includes('soundtrack');
            }
          }
        }

        return matchesSearch && matchesCat;
      })
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime() || 0;
        const dateB = new Date(b.publishedAt).getTime() || 0;
        return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
      });
  }, [videos, searchQuery, selectedCategory, sortOrder]);

  const displayedVideos = filteredVideos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVideos.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-xs uppercase font-semibold tracking-wider text-blue-400 font-mono mb-1">
            Media Archive
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Video Productions
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Explore the complete broadcast catalog of documentaries, gaming analyses, investigations, and audio productions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh from YouTube API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
            <span>{isLoading ? 'Syncing...' : 'Sync Channel'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* Category Tabs (Segmented control button style - permitted for interactive filter bars) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#090b14] border border-white/[0.08] rounded-xl overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(12);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Right side: Search & Sort controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(12);
              }}
              placeholder="Search by title or topic..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#090b14] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'latest' | 'oldest')}
              className="px-3 py-2 rounded-xl bg-[#090b14] border border-white/[0.08] text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="latest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Videos Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
        <span>
          Showing {displayedVideos.length} of {filteredVideos.length} productions
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Video Grid */}
      {displayedVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedVideos.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={onPlayVideo} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center border border-dashed border-white/[0.1] rounded-2xl bg-[#080a14] p-8">
          <Film className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white font-display">No videos match your query</h3>
          <p className="mt-1.5 text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords or switching category filters to find what you are looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="pt-8 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="px-6 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.2] text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white transition-colors cursor-pointer shadow-sm"
          >
            Load More Videos ({filteredVideos.length - displayedVideos.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
};
