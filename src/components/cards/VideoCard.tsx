import React, { useState } from 'react';
import { Play, ExternalLink, Clock } from 'lucide-react';
import { YouTubeVideo } from '../../types';
import { formatPublishedDate, formatCount } from '../../services/youtube';

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
  priority?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay, priority = false }) => {
  const [imageError, setImageError] = useState(false);

  // Pick highest quality available thumbnail with fallback
  const thumbUrl =
    video.thumbnails.maxres?.url ||
    video.thumbnails.high?.url ||
    video.thumbnails.medium?.url ||
    video.thumbnails.default?.url;

  return (
    <article className="group flex flex-col bg-[#0b0d17] border border-white/[0.08] rounded-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/20">
      {/* Thumbnail Container */}
      <div
        className="relative aspect-video w-full bg-[#121524] overflow-hidden cursor-pointer"
        onClick={() => onPlay(video)}
      >
        {!imageError && thumbUrl ? (
          <img
            src={thumbUrl}
            alt={video.title}
            loading={priority ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-[#0e1222] p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-2">
              <Play className="w-5 h-5 text-blue-400 fill-current ml-0.5" />
            </div>
            <span className="text-xs text-slate-400 font-medium line-clamp-1">{video.title}</span>
          </div>
        )}

        {/* Hover Dark Overlay & Play Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration Badge (Tabular numerals, quiet placement) */}
        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[11px] font-mono tabular-nums text-slate-200 border border-white/10">
            {video.duration}
          </div>
        )}

        {/* Developer Sample Tag (quiet, strictly for transparency) */}
        {video.isDeveloperSample && (
          <div className="absolute top-2.5 left-2.5 px-1.5 py-0.5 rounded bg-amber-500/80 backdrop-blur-sm text-[10px] font-medium tracking-wide uppercase text-black">
            Sample Preview
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata: Unboxed Text with clean dot separator (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono tabular-nums">
            <span>{formatPublishedDate(video.publishedAt)}</span>
            {video.viewCount && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{formatCount(video.viewCount)} views</span>
              </>
            )}
            {video.isShort && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-blue-400">Shorts</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onPlay(video)}
            className="text-sm sm:text-base font-semibold text-white line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors cursor-pointer"
            title={video.title}
          >
            {video.title}
          </h3>

          {/* Description Snippet */}
          {video.description && (
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <button
            onClick={() => onPlay(video)}
            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Now</span>
          </button>

          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            title="Open directly on YouTube"
          >
            <span>YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
};
