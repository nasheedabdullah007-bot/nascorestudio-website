import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { YouTubeVideo } from '../../types';
import { formatPublishedDate, formatCount } from '../../services/youtube';

interface ShortCardProps {
  short: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
}

export const ShortCard: React.FC<ShortCardProps> = ({ short, onPlay }) => {
  const [imageError, setImageError] = useState(false);

  const thumbUrl =
    short.thumbnails.maxres?.url ||
    short.thumbnails.high?.url ||
    short.thumbnails.medium?.url ||
    short.thumbnails.default?.url;

  return (
    <article className="group flex flex-col bg-[#0b0d17] border border-white/[0.08] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/20">
      {/* 9:16 Vertical Thumbnail */}
      <div
        className="relative aspect-[9/16] w-full bg-[#121524] overflow-hidden cursor-pointer"
        onClick={() => onPlay(short)}
      >
        {!imageError && thumbUrl ? (
          <img
            src={thumbUrl}
            alt={short.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-[#12162a] p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center mb-2">
              <Play className="w-4 h-4 text-blue-400 fill-current ml-0.5" />
            </div>
            <span className="text-xs text-slate-400 font-medium">{short.title}</span>
          </div>
        )}

        {/* Gradient Scrim for readable overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        {/* Play Icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Top Tag: Shorts Indicator */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-semibold tracking-wider uppercase text-blue-400 border border-white/10">
          Shorts
        </div>

        {/* Duration / Timestamp at top right */}
        {short.duration && (
          <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono tabular-nums text-slate-300">
            {short.duration}
          </div>
        )}

        {/* Bottom Overlay Title and Metadata */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 flex flex-col justify-end">
          <h4
            className="text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors"
            title={short.title}
          >
            {short.title}
          </h4>

          {/* Clean unboxed metadata */}
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-300 font-mono tabular-nums">
            <span>{formatPublishedDate(short.publishedAt)}</span>
            {short.viewCount && (
              <>
                <span aria-hidden="true">·</span>
                <span>{formatCount(short.viewCount)} views</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card Action bar */}
      <div className="p-2.5 bg-[#080912] border-t border-white/[0.06] flex items-center justify-between text-xs">
        <button
          onClick={() => onPlay(short)}
          className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Play</span>
        </button>

        <a
          href={`https://www.youtube.com/shorts/${short.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-white inline-flex items-center gap-1"
          title="Open in YouTube Shorts"
        >
          <span>Open</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
};
