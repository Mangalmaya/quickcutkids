import React from 'react';

interface HeaderProps {
  savedTipsCount: number;
  onNavigateSection: (sectionId: string) => void;
  onOpenAskQuestion: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedTipsCount,
  onNavigateSection,
  onOpenAskQuestion
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F9F9F8]/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('top');
          }}
          className="text-xl font-bold tracking-tight text-zinc-900 font-serif-display whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900"
        >
          Quickcut Kids
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600">
          <a
            href="#parenting-tips"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('parenting-tips');
            }}
            className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Parenting Tips
          </a>
          <a
            href="#video-highlights"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('video-highlights');
            }}
            className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Video Highlights
          </a>
          <a
            href="#community-qa"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('community-qa');
            }}
            className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Parent Q&amp;A
          </a>
          <a
            href="#prep-checklist"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('prep-checklist');
            }}
            className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Saved Guides ({savedTipsCount})
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenAskQuestion}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            Ask a Question
          </button>
        </div>
      </div>
    </header>
  );
};
