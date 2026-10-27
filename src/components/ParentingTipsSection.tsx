import React, { useState } from 'react';
import { Bookmark, CheckSquare, Search, ArrowUpRight, RotateCcw } from 'lucide-react';
import { ParentingTip, TipCategory } from '../types/blog';
import { filterParentingTips, calculateChecklistProgress } from '../utils/blogLogic';

interface ParentingTipsSectionProps {
  tips: ParentingTip[];
  savedTipIds: string[];
  completedChecklistIds: string[];
  onlySavedFilter: boolean;
  onToggleOnlySaved: (val: boolean) => void;
  onToggleSaveTip: (tipId: string) => void;
  onToggleChecklistItem: (itemId: string) => void;
  onSelectTip: (tip: ParentingTip) => void;
}

const CATEGORIES: TipCategory[] = [
  'All',
  'First Haircuts',
  'Sensory Care',
  'Morning Routines',
  'Curl & Texture Care'
];

export const ParentingTipsSection: React.FC<ParentingTipsSectionProps> = ({
  tips,
  savedTipIds,
  completedChecklistIds,
  onlySavedFilter,
  onToggleOnlySaved,
  onToggleSaveTip,
  onToggleChecklistItem,
  onSelectTip
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TipCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredTips = filterParentingTips(
    tips,
    selectedCategory,
    searchQuery,
    onlySavedFilter,
    savedTipIds
  );

  const allChecklistItems = tips.flatMap((t) => t.prepChecklist);
  const overallProgress = calculateChecklistProgress(
    allChecklistItems.length,
    completedChecklistIds,
    allChecklistItems.map((i) => i.id)
  );

  return (
    <section id="parenting-tips" className="py-16 scroll-mt-16 border-b border-zinc-200">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
              <span>01. Editorial Guides &amp; Field Notes</span>
              <span aria-hidden="true">·</span>
              <span>From the Quickcut Kids Facebook Archive</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-serif-display font-medium text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Parenting Tips for Stress-Free Hair Care
            </h2>
          </div>

          <p className="text-sm text-zinc-600 max-w-md leading-relaxed">
            Practical, occupational-therapist-reviewed strategies for toddlers, sensory-sensitive kids, and busy school mornings. Save your favorite guides or check off steps below.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="py-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-zinc-200/80">
          {/* Interactive Category Filter Buttons */}
          <div
            role="group"
            aria-label="Filter parenting tips by category"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#F2F1ED] rounded-lg border border-zinc-200/80"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category && !onlySavedFilter;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    if (onlySavedFilter) onToggleOnlySaved(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-xs border border-zinc-200/80'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search & Saved Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <label htmlFor="tip-search-input" className="sr-only">
                Search parenting tips
              </label>
              <Search
                className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="tip-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tips (e.g., Montessori, curls)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-900"
              />
            </div>

            <button
              type="button"
              onClick={() => onToggleOnlySaved(!onlySavedFilter)}
              aria-pressed={onlySavedFilter}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                onlySavedFilter
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Saved Guides ({savedTipIds.length})</span>
            </button>
          </div>
        </div>

        {/* Results Count Line */}
        <div className="py-4 flex items-center justify-between text-xs text-zinc-500">
          <div>
            Showing <span className="font-mono-tabular font-semibold text-zinc-900">{filteredTips.length}</span> of{' '}
            <span className="font-mono-tabular">{tips.length}</span> editorial parenting guides
            {selectedCategory !== 'All' && <span> · Category: {selectedCategory}</span>}
            {onlySavedFilter && <span> · Viewing Saved Bookmarks</span>}
          </div>
          {(selectedCategory !== 'All' || searchQuery.trim() !== '' || onlySavedFilter) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                onToggleOnlySaved(false);
              }}
              className="inline-flex items-center gap-1 text-emerald-900 font-medium hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredTips.length === 0 ? (
          <div className="my-6 p-12 text-center rounded-xl border border-zinc-200 bg-[#F2F1ED]/50">
            <h3 className="text-lg font-serif-display font-medium text-zinc-900 mb-2">
              No parenting guides match your current filter
            </h3>
            <p className="text-sm text-zinc-600 max-w-md mx-auto mb-5">
              {onlySavedFilter
                ? 'You have not bookmarked any parenting guides in this category yet. Click "Save Guide" on any article to keep it handy for haircut day.'
                : `We couldn't find any articles matching "${searchQuery}". Try searching for "first haircut", "sensory", or "curls".`}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                onToggleOnlySaved(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              Show All Parenting Tips
            </button>
          </div>
        ) : (
          /* Editorial Grid: 2-Column Asymmetric Catalog Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
            {filteredTips.map((tip) => {
              const isSaved = savedTipIds.includes(tip.id);
              const tipProgress = calculateChecklistProgress(
                tip.prepChecklist.length,
                completedChecklistIds,
                tip.prepChecklist.map((c) => c.id)
              );

              return (
                <article
                  key={tip.id}
                  className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white overflow-hidden transition-colors hover:border-zinc-300"
                >
                  <div>
                    {/* 4:3 Editorial Image with Resilient Fallback */}
                    <div className="aspect-[4/3] w-full bg-zinc-100 border-b border-zinc-200 overflow-hidden relative">
                      {!failedImages[tip.id] ? (
                        <img
                          src={tip.imageUrl}
                          alt={tip.imageAlt}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [tip.id]: true }))
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-6 text-center bg-stone-100">
                          <span className="text-xs text-zinc-500">{tip.title}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-3">
                        <span className="font-mono-tabular font-semibold text-emerald-900">
                          {tip.indexNumber}. {tip.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Ages {tip.ageRange}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{tip.readTimeMinutes} min read</span>
                        <span aria-hidden="true">·</span>
                        <span>{tip.publishedDate}</span>
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-serif-display font-medium text-zinc-950 leading-snug mb-2.5"
                        style={{ textWrap: 'balance' }}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectTip(tip)}
                          className="text-left hover:text-emerald-900 transition-colors cursor-pointer"
                        >
                          {tip.title}
                        </button>
                      </h3>

                      <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                        {tip.summary}
                      </p>

                      {/* Key Takeaways Preview */}
                      <div className="pt-4 border-t border-zinc-100">
                        <div className="text-xs font-semibold text-zinc-800 mb-2">
                          Quick Takeaways:
                        </div>
                        <ul className="space-y-1.5 text-xs text-zinc-600">
                          {tip.keyTakeaways.slice(0, 2).map((point, idx) => (
                            <li key={idx} className="leading-relaxed">
                              <span className="font-mono-tabular text-zinc-400 mr-1.5">
                                0{idx + 1}.
                              </span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action Bar */}
                  <div className="px-6 py-4 bg-[#F9F9F8] border-t border-zinc-200/80 flex items-center justify-between gap-4">
                    <div className="text-xs text-zinc-500 font-mono-tabular">
                      <span>Checklist: {tipProgress.completedCount}/{tip.prepChecklist.length} done</span>
                      <span aria-hidden="true"> · </span>
                      <span>{tip.fbPostEngagement.saves.toLocaleString()} FB saves</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleSaveTip(tip.id)}
                        aria-label={isSaved ? `Remove ${tip.title} from saved guides` : `Save ${tip.title}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          isSaved
                            ? 'bg-emerald-950/10 border-emerald-900/40 text-emerald-950'
                            : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-900 text-emerald-900' : ''}`}
                          aria-hidden="true"
                        />
                        <span>{isSaved ? 'Saved' : 'Save Guide'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectTip(tip)}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Read Full Guide</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Interactive At-Home Haircut Prep Checklist Strip */}
        <div
          id="prep-checklist"
          className="mt-14 p-6 sm:p-8 rounded-xl border border-zinc-200 bg-[#F2F1ED]/70"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
            <div>
              <div className="text-xs text-zinc-500 mb-1">
                Interactive Readiness Tracker · Saved Automatically in Your Browser
              </div>
              <h3 className="text-2xl font-serif-display font-medium text-zinc-950">
                Quickcut Kids Appointment Readiness Checklist
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right font-mono-tabular">
                <div className="text-sm font-semibold text-zinc-950">
                  {overallProgress.completedCount} of {allChecklistItems.length} Milestones Checked ({overallProgress.percentage}%)
                </div>
                <div className="text-xs text-zinc-500">
                  Check off steps as you practice at home
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {tips.slice(0, 3).map((tip) => (
              <div key={tip.id} className="p-4 rounded-lg bg-white border border-zinc-200/90">
                <div className="text-xs font-semibold text-emerald-900 mb-1">
                  {tip.indexNumber}. {tip.category} ({tip.ageRange})
                </div>
                <div className="text-xs text-zinc-500 mb-3">From: {tip.title}</div>
                <div className="space-y-2.5">
                  {tip.prepChecklist.map((item) => {
                    const checked = completedChecklistIds.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className="flex items-start gap-2.5 cursor-pointer group text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggleChecklistItem(item.id)}
                          className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-900 focus:ring-emerald-900 cursor-pointer"
                        />
                        <div>
                          <span
                            className={`font-medium block transition-colors ${
                              checked ? 'line-through text-zinc-400' : 'text-zinc-900 group-hover:text-emerald-900'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="text-zinc-500 text-[11px] leading-snug block mt-0.5">
                            {item.detail}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
