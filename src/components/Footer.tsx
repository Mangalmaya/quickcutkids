import React from 'react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="border-t border-zinc-200 bg-[#F2F1ED] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-zinc-300/70">
          <div>
            <div className="text-xl font-serif-display font-bold text-zinc-950">
              Quickcut Kids
            </div>
            <p className="text-xs text-zinc-600 mt-1 max-w-md">
              The official parenting journal, video highlight archive, and specialist Q&amp;A companion for the Quickcut Kids Facebook community.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-700">
            <a
              href="#parenting-tips"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('parenting-tips');
              }}
              className="hover:text-zinc-950 hover:underline underline-offset-4"
            >
              Parenting Tips
            </a>
            <a
              href="#video-highlights"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('video-highlights');
              }}
              className="hover:text-zinc-950 hover:underline underline-offset-4"
            >
              Video Highlights
            </a>
            <a
              href="#community-qa"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('community-qa');
              }}
              className="hover:text-zinc-950 hover:underline underline-offset-4"
            >
              Parent Q&amp;A
            </a>
            <a
              href="#prep-checklist"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('prep-checklist');
              }}
              className="hover:text-zinc-950 hover:underline underline-offset-4"
            >
              Readiness Checklist
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Quickcut Kids Community Hub. Crafted for families and sensory-friendly stylists.
          </div>
          <div>
            New Facebook Reels every Tuesday · Live Parent Q&amp;A every Friday at 1:00 PM
          </div>
        </div>
      </div>
    </footer>
  );
};
