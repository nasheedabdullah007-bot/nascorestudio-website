import React from 'react';
import { Play, ArrowRight, Youtube, Sparkles, Film, Gamepad2, Radio, Music, ExternalLink, Pin } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { YouTubeVideo, YouTubeChannelInfo, NoticeItem, ActiveTab } from '../types';
import { VideoCard } from '../components/cards/VideoCard';
import { ShortCard } from '../components/cards/ShortCard';
import { NoticeCard } from '../components/cards/NoticeCard';
import { formatCount } from '../services/youtube';

// Import generated cinematic assets
import heroStudioImage from '../assets/images/hero_cinematic_studio_1792319064075.jpg';
import gamingImage from '../assets/images/category_gaming_visual_1792319064758.jpg';
import storytellingImage from '../assets/images/category_storytelling_visual_1792319064610.jpg';
import musicImage from '../assets/images/category_music_production_1792319064770.jpg';

interface HomePageProps {
  channel: YouTubeChannelInfo;
  regularVideos: YouTubeVideo[];
  shorts: YouTubeVideo[];
  notices: NoticeItem[];
  onPlayVideo: (video: YouTubeVideo) => void;
  onReadNotice: (notice: NoticeItem) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenConfig: () => void;
  isFallback: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  channel,
  regularVideos,
  shorts,
  notices,
  onPlayVideo,
  onReadNotice,
  onNavigateTab,
  onOpenConfig,
  isFallback,
}) => {
  const featuredVideo = regularVideos[0] || null;
  const recentUploads = regularVideos.slice(1, 5);
  const recentShorts = shorts.slice(0, 4);
  const recentNotices = notices.slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Fallback Banner (Strictly informative & clean, no telemetry clutter) */}
      {isFallback && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-3.5 sm:p-4 rounded-xl border border-blue-500/30 bg-blue-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-200">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
              <span>
                <strong>Studio Preview Mode:</strong> Connect your official YouTube Data API key & Channel ID to load live uploads automatically.
              </span>
            </div>
            <button
              onClick={onOpenConfig}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap transition-colors cursor-pointer"
            >
              Configure Channel
            </button>
          </div>
        </div>
      )}

      {/* Hero Section: Split-Screen Hero & Oversized Typographic Impact */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2">
              <div>
                {/* Quiet unboxed kicker */}
                <div className="text-xs uppercase font-semibold tracking-widest text-blue-400 mb-3 font-mono">
                  {siteConfig.brand.name} · Official Media Hub
                </div>

                {/* Oversized Headline with text-wrap balance */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-[1.08] [text-wrap:balance]">
                  Stories. Gaming. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">Creativity.</span>
                </h1>

                {/* Lead copy */}
                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                  {siteConfig.brand.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {featuredVideo && (
                  <button
                    onClick={() => onPlayVideo(featuredVideo)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer group"
                  >
                    <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                    <span>Watch Latest Film</span>
                  </button>
                )}

                <button
                  onClick={() => onNavigateTab('videos')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.25] text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer"
                >
                  <span>Explore Library</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <a
                  href={siteConfig.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-sm font-semibold text-red-300 hover:text-white transition-all"
                >
                  <Youtube className="w-4 h-4 text-red-500 fill-current" />
                  <span>Subscribe</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Container at Matching Height */}
            <div className="lg:col-span-5 relative">
              <div
                onClick={() => featuredVideo && onPlayVideo(featuredVideo)}
                className="group relative w-full h-80 sm:h-96 lg:h-full min-h-[340px] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0d101d] shadow-2xl shadow-blue-950/20 cursor-pointer"
              >
                <img
                  src={heroStudioImage}
                  alt="NASCORE STUDIO Production Console"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                {/* Floating Play Action */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl shadow-blue-600/50 transform group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-blue-400 mb-1">
                    Featured Broadcast
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 leading-snug">
                    {featuredVideo?.title || 'Tactical Masterclass & Documentary Series'}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-300 font-mono tabular-nums">
                    <span>{featuredVideo?.duration || 'Full Length'}</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span className="text-blue-400">Click to Play</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Trust & Channel Proof Strip (Placed in a full-width row below the split) */}
          <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white font-mono tabular-nums">
                {channel.statistics?.videoCount ? `${channel.statistics.videoCount}+` : '40+'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Original Productions</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white font-mono tabular-nums">
                {channel.statistics?.subscriberCount ? formatCount(channel.statistics.subscriberCount) : '120K+'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">YouTube Subscribers</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white font-mono tabular-nums">
                {channel.statistics?.viewCount ? formatCount(channel.statistics.viewCount) : '3.5M+'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Global Video Views</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-blue-400 font-mono tabular-nums">
                100% Free
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Direct Public Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Uploads Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase font-semibold tracking-wider text-blue-400 font-mono mb-1">
              Recent Broadcasts
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Latest Video Releases
            </h2>
          </div>

          <button
            onClick={() => onNavigateTab('videos')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            <span>View All Videos ({regularVideos.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentUploads.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={onPlayVideo} />
          ))}
        </div>
      </section>

      {/* YouTube Shorts Vertical Discovery Section */}
      {recentShorts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-blue-400 font-mono mb-1">
                Vertical Motion
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                YouTube Shorts
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('shorts')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            >
              <span>View All Shorts ({shorts.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {recentShorts.map((short) => (
              <ShortCard key={short.id} short={short} onPlay={onPlayVideo} />
            ))}
          </div>
        </section>
      )}

      {/* Content Pillars & Categories Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase font-semibold tracking-wider text-blue-400 font-mono mb-1">
            Media Taxonomy
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            What NASCORE STUDIO Creates
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Our productions span four key pillars of modern digital entertainment, built with uncompromised narrative tension and high-end visual fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Gaming */}
          <div
            onClick={() => onNavigateTab('videos')}
            className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0c16] hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
              <img
                src={gamingImage}
                alt="Gaming & Esports"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c16] via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white group-hover:text-blue-400 transition-colors">
                Gaming & Tactical Esports
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Competitive gameplay analyses, high-stakes clutch breakdowns, tactical strategy masterclasses, and ranked commentary.
              </p>
            </div>
          </div>

          {/* Pillar 2: Documentaries */}
          <div
            onClick={() => onNavigateTab('videos')}
            className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0c16] hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
              <img
                src={storytellingImage}
                alt="Documentaries & Storytelling"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c16] via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <div className="w-9 h-9 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white group-hover:text-purple-400 transition-colors">
                Storytelling & Documentaries
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Cinematic video essays investigating forgotten internet archives, creator controversies, and digital media phenomena.
              </p>
            </div>
          </div>

          {/* Pillar 3: Music & Audio */}
          <div
            onClick={() => onNavigateTab('videos')}
            className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0c16] hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
              <img
                src={musicImage}
                alt="Music & Original Soundtracks"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c16] via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white group-hover:text-indigo-400 transition-colors">
                Music & Original Audio
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Original analog synth scores, atmospheric sound design, and custom soundtrack productions engineered in-house.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notices Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase font-semibold tracking-wider text-blue-400 font-mono mb-1">
              Studio Notices
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Announcements & Production Dispatches
            </h2>
          </div>

          <button
            onClick={() => onNavigateTab('notices')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            <span>Read All Notices ({notices.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} onRead={onReadNotice} />
          ))}
        </div>
      </section>

      {/* Creator Subscription Call-To-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-[#0a0d1c] to-[#110c24] p-8 sm:p-14 shadow-2xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-widest text-blue-400 font-mono mb-3">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Official YouTube Channel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Join the NASCORE Community
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Never miss a documentary premiere, competitive gaming breakdown, or exclusive production notice. Subscribe to support independent digital creation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <Youtube className="w-4 h-4 fill-current" />
                <span>Subscribe on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onNavigateTab('notices')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-sm font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                <span>Read Studio Dispatches</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
