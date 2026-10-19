import React, { useEffect } from 'react';
import { X, Calendar, User, Pin, ExternalLink, ArrowLeft } from 'lucide-react';
import { NoticeItem } from '../../types';
import { MarkdownViewer } from '../../utils/markdown';

interface NoticeDetailModalProps {
  notice: NoticeItem | null;
  onClose: () => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({ notice, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (notice) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [notice, onClose]);

  if (!notice) return null;

  const formattedDate = new Date(notice.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#090b14] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl shadow-black flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header navigation bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0c0e1a]">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Notices</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Close notice modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 mb-4 font-mono tabular-nums">
            {notice.pinned && (
              <span className="inline-flex items-center gap-1 text-blue-400 font-semibold">
                <Pin className="w-3 h-3 fill-current" />
                <span>Pinned</span>
              </span>
            )}
            {notice.pinned && <span aria-hidden="true" className="text-slate-600">·</span>}
            <span className="text-blue-300 font-semibold">{notice.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight mb-4">
            {notice.title}
          </h1>

          {/* Author attribution if present */}
          {notice.author && (
            <div className="flex items-center gap-2 text-xs text-slate-400 pb-6 mb-6 border-b border-white/[0.06]">
              <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-[10px]">
                {notice.author.name[0]}
              </div>
              <span className="text-slate-200 font-medium">{notice.author.name}</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span className="text-slate-500">{notice.author.role}</span>
            </div>
          )}

          {/* Cover image if provided */}
          {notice.coverImage && (
            <div className="my-6 rounded-xl overflow-hidden border border-white/[0.08]">
              <img
                src={notice.coverImage}
                alt={notice.title}
                className="w-full max-h-72 object-cover"
              />
            </div>
          )}

          {/* Render Markdown Content safely */}
          <div className="mt-2 text-slate-200">
            <MarkdownViewer content={notice.content} />
          </div>

          {/* External Action Link */}
          {notice.externalLink && (
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <a
                href={notice.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
              >
                <span>{notice.externalLink.label || 'Learn More'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
