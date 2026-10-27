import React, { useEffect } from 'react';
import { X, Bookmark, CheckCircle2 } from 'lucide-react';
import { ParentingTip } from '../types/blog';

interface ArticleModalProps {
  tip: ParentingTip | null;
  isSaved: boolean;
  completedChecklistIds: string[];
  onClose: () => void;
  onToggleSave: (tipId: string) => void;
  onToggleChecklistItem: (itemId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  tip,
  isSaved,
  completedChecklistIds,
  onClose,
  onToggleSave,
  onToggleChecklistItem
}) => {
  useEffect(() => {
    if (!tip) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tip, onClose]);

  if (!tip) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F9F9F8] rounded-xl border border-zinc-200 shadow-xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#F9F9F8]/95 backdrop-blur-xs border-b border-zinc-200">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="font-mono-tabular font-semibold text-emerald-900">
              Guide {tip.indexNumber}
            </span>
            <span aria-hidden="true">·</span>
            <span>{tip.category}</span>
            <span aria-hidden="true">·</span>
            <span>Ages {tip.ageRange}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleSave(tip.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isSaved
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isSaved ? 'Saved in Guides' : 'Save Guide'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close article reader"
              className="p-1.5 text-zinc-500 hover:text-zinc-900 bg-white border border-zinc-200 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Editorial Body */}
        <div className="px-6 sm:px-10 py-8">
          <h2
            id="article-modal-title"
            className="text-2xl sm:text-4xl font-serif-display font-medium text-zinc-950 leading-tight mb-3"
            style={{ textWrap: 'balance' }}
          >
            {tip.title}
          </h2>
          <p className="text-base text-zinc-600 mb-6">{tip.subtitle}</p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 pb-6 border-b border-zinc-200">
            <span className="font-semibold text-zinc-900">By {tip.authorName}</span>
            <span aria-hidden="true">·</span>
            <span>{tip.authorRole}</span>
            <span aria-hidden="true">·</span>
            <span>{tip.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{tip.readTimeMinutes} min read</span>
          </div>

          {/* Figure & Caption */}
          <figure className="my-6">
            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100">
              <img
                src={tip.imageUrl}
                alt={tip.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-xs font-serif-display italic text-zinc-500 mt-2">
              {tip.imageCaption}
            </figcaption>
          </figure>

          {/* Editorial Pull Quote (No thick left accent border — top/bottom hairline dividers) */}
          <blockquote className="my-8 py-6 border-y border-zinc-200 text-center px-4">
            <p className="text-xl sm:text-2xl font-serif-display italic text-zinc-800 leading-relaxed">
              “{tip.pullQuote}”
            </p>
          </blockquote>

          {/* Long-Form Prose with Drop Cap */}
          <div className="space-y-5 max-w-prose mx-auto text-base text-zinc-800 leading-relaxed">
            {tip.bodyParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-4xl first-letter:font-serif-display first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-emerald-950'
                    : ''
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Interactive Action Checklist Inside Modal */}
          <div className="mt-10 p-6 rounded-xl bg-white border border-zinc-200">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="text-lg font-serif-display font-medium text-zinc-950">
                At-Home Practice Steps for This Guide
              </h3>
              <span className="text-xs text-zinc-500 font-mono-tabular">
                Click to mark complete
              </span>
            </div>

            <div className="space-y-3">
              {tip.prepChecklist.map((item) => {
                const isDone = completedChecklistIds.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-emerald-950/5 border-emerald-900/30'
                        : 'bg-[#F9F9F8] border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => onToggleChecklistItem(item.id)}
                      className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-900 focus:ring-emerald-900 cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-semibold text-zinc-900">{item.label}</div>
                      <div className="text-zinc-600 mt-0.5">{item.detail}</div>
                    </div>
                    {isDone && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-900 shrink-0" aria-hidden="true" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
