import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Share2, Check, Clock, Eye } from 'lucide-react';
import { YouTubeVideo } from '../../types';
import { formatPublishedDate, formatCount } from '../../services/youtube';

interface VideoModalProps {
  video: YouTubeVideo | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  const videoUrl = video.isShort
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#090b14] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl shadow-black flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Title & Close Button */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-[#0c0e1a]">
          <div className="flex items-center gap-2 overflow-hidden pr-3">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <h3 className="text-sm font-semibold text-white truncate font-display">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors shrink-0 cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Video Information & Actions */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                {video.title}
              </h2>
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs text-slate-400 font-mono tabular-nums">
                <span>{formatPublishedDate(video.publishedAt)}</span>
                {video.duration && (
                  <>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {video.duration}
                    </span>
                  </>
                )}
                {video.viewCount && (
                  <>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-500" />
                      {formatCount(video.viewCount)} views
                    </span>
                  </>
                )}
                {video.isDeveloperSample && (
                  <>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-amber-400">Development Sample</span>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-xs font-semibold text-white transition-colors"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Description Section */}
          {video.description && (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div
                className={`text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed ${
                  showFullDesc ? '' : 'line-clamp-3'
                }`}
              >
                {video.description}
              </div>
              {video.description.length > 200 && (
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="mt-2 text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  {showFullDesc ? 'Show less' : 'Show full description'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
