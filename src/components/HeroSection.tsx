import React, { useState } from 'react';
import { ArrowRight, Play, BookOpen, MessageSquare } from 'lucide-react';
import { ParentingTip } from '../types/blog';

interface HeroSectionProps {
  featuredTip: ParentingTip;
  onReadTip: (tip: ParentingTip) => void;
  onJumpToVideos: () => void;
  onJumpToQA: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredTip,
  onReadTip,
  onJumpToVideos,
  onJumpToQA
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="border-b border-zinc-200 bg-[#F9F9F8]">
      {/* Operational & Community Context Ribbon */}
      <div className="border-b border-zinc-200/80 bg-[#F2F1ED]">
        <div className="max-w-[1200px] mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-600">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-zinc-900">Official Quickcut Kids Facebook Companion Journal</span>
            <span aria-hidden="true">·</span>
            <span>Updated Weekly by Pediatric Stylists &amp; OT Advisors</span>
          </div>
          <div className="flex items-center gap-3 font-mono-tabular text-zinc-600">
            <span>48,400+ FB Community Parents</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onJumpToQA}
              className="text-emerald-900 font-medium underline underline-offset-4 hover:text-emerald-700 cursor-pointer whitespace-nowrap shrink-0"
            >
              Friday Q&amp;A Thread Open
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Hero Split (items-stretch for balanced height) */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Lead Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                <span className="font-semibold text-emerald-900">Lead Issue No. 14</span>
                <span aria-hidden="true">·</span>
                <span>Sensory-Friendly Grooming &amp; Family Routines</span>
                <span aria-hidden="true">·</span>
                <span>Autumn 2026</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl font-serif-display font-medium tracking-tight text-zinc-950 leading-[1.12] mb-6"
                style={{ textWrap: 'balance' }}
              >
                Calm chairs, confident toddlers, and zero-tears haircut days.
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl mb-8">
                Welcome to the editorial home of the <strong className="font-semibold text-zinc-900">Quickcut Kids</strong> Facebook community. Explore step-by-step sensory prep guides, watch our most-saved stylist reel breakdowns, and get answers from our pediatric hair specialists.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200/80">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => onReadTip(featuredTip)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Read Featured First-Cut Guide</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onJumpToVideos}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-800 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Play className="w-4 h-4 text-emerald-900" aria-hidden="true" />
                  <span>Watch FB Video Highlights</span>
                </button>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed">
                Featured this week: <span className="text-zinc-800 font-medium">“{featuredTip.title}”</span> · {featuredTip.readTimeMinutes} min read · Saved by {featuredTip.fbPostEngagement.saves.toLocaleString()} parents on Facebook
              </p>
            </div>
          </div>

          {/* Right Column: High-Impact 16:9 Editorial Photograph with Caption */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[300px] lg:min-h-[380px] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
              {!imgError ? (
                <img
                  src="/src/assets/images/hero_quickcut_kids_1793098115170.jpg"
                  alt="Joyful mother and young child sharing a laugh in the sunlit Quickcut Kids family studio"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-stone-100 to-emerald-950/10">
                  <BookOpen className="w-10 h-10 text-emerald-900 mb-3" aria-hidden="true" />
                  <p className="text-sm font-medium text-zinc-800">Quickcut Kids Family Studio Documentary Series</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-6">
                <div className="text-white max-w-lg">
                  <div className="text-xs text-zinc-200 mb-1">
                    <span>Community Spotlight</span>
                    <span aria-hidden="true"> · </span>
                    <span>Quickcut Kids Facebook Page</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium leading-snug">
                    “Switching from the word ‘cut’ to ‘tidy-up’ and practicing the 5-second mirror game turned our 2-year-old’s trim into his favorite Saturday outing.”
                  </p>
                  <p className="text-xs text-zinc-300 mt-1.5">
                    — Claire &amp; Leo (Age 3), Featured in Reel #42
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Proof & Quick-Jump Strip Below Hero Split */}
        <div className="mt-12 pt-8 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col justify-between p-5 rounded-lg bg-[#F2F1ED]/70 border border-zinc-200/80">
            <div>
              <div className="text-xs text-zinc-500">01. Sensory First-Cut Prep</div>
              <div className="text-2xl font-serif-display font-semibold text-zinc-950 tabular-nums whitespace-nowrap mt-1.5">
                94% Calm Visits
              </div>
            </div>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Reported by 1,200+ Quickcut Kids parents using our 48-hour Mirror &amp; Mist rehearsal at home.
            </p>
          </div>

          <div className="flex flex-col justify-between p-5 rounded-lg bg-[#F2F1ED]/70 border border-zinc-200/80">
            <div>
              <div className="text-xs text-zinc-500">02. Video Reel Library</div>
              <div className="text-2xl font-serif-display font-semibold text-zinc-950 tabular-nums whitespace-nowrap mt-1.5">
                350K+ Reel Views
              </div>
            </div>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Bite-sized Facebook Reels showing real eye-level stylist communication and home fringe rescues.
            </p>
          </div>

          <div className="flex flex-col justify-between p-5 rounded-lg bg-[#F2F1ED]/70 border border-zinc-200/80">
            <div>
              <div className="text-xs text-zinc-500">03. Specialist Q&amp;A Desk</div>
              <div className="text-2xl font-serif-display font-semibold text-zinc-950 tabular-nums whitespace-nowrap mt-1.5">
                &lt; 24h Reply Time
              </div>
            </div>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Direct answers from lead pediatric stylists and occupational therapy contributors.
            </p>
          </div>

          <div className="flex flex-col justify-between p-5 rounded-lg bg-[#F2F1ED]/70 border border-zinc-200/80">
            <div>
              <div className="text-xs text-zinc-500">04. Interactive Prep Checklists</div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-2xl font-serif-display font-semibold text-zinc-950 tabular-nums whitespace-nowrap">
                  12 Core Steps
                </span>
                <MessageSquare className="w-4 h-4 text-emerald-900 shrink-0" aria-hidden="true" />
              </div>
            </div>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Check off each sensory milestone right inside any guide—automatically saved in your browser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
