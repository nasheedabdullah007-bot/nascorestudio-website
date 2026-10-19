import React from 'react';
import { Pin, ArrowRight, Calendar, User } from 'lucide-react';
import { NoticeItem } from '../../types';

interface NoticeCardProps {
  notice: NoticeItem;
  onRead: (notice: NoticeItem) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onRead }) => {
  const formattedDate = new Date(notice.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article
      onClick={() => onRead(notice)}
      className={`group relative flex flex-col justify-between p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
        notice.pinned
          ? 'bg-[#0e1224] border-blue-500/40 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-950/30'
          : 'bg-[#0a0c16] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0c0f1c]'
      }`}
    >
      <div>
        {/* Header Metadata (Zero-Pill Discipline: Unboxed text with subtle typographic separators) */}
        <div className="flex items-center justify-between gap-3 mb-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            {notice.pinned && (
              <span className="inline-flex items-center gap-1 text-blue-400 font-semibold">
                <Pin className="w-3 h-3 fill-current rotate-45" />
                <span>Pinned Dispatch</span>
              </span>
            )}
            {notice.pinned && <span aria-hidden="true" className="text-slate-600">·</span>}
            <span className="text-blue-300 font-medium">{notice.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono tabular-nums">{formattedDate}</span>
          </div>
        </div>

        {/* Notice Title */}
        <h3 className="text-lg sm:text-xl font-display font-semibold text-white group-hover:text-blue-400 transition-colors leading-snug">
          {notice.title}
        </h3>

        {/* Summary */}
        <p className="mt-2.5 text-sm text-slate-400 leading-relaxed line-clamp-3">
          {notice.summary}
        </p>
      </div>

      {/* Footer Info: Author & Read CTA */}
      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
        {notice.author ? (
          <div className="flex items-center gap-1.5 text-slate-400">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>{notice.author.name}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-slate-500">{notice.author.role}</span>
          </div>
        ) : (
          <div className="text-slate-500">Official Notice</div>
        )}

        <div className="inline-flex items-center gap-1 font-medium text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all">
          <span>Read Dispatch</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
};
