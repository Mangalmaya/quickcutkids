import React, { useState, useEffect } from 'react';
import { Play, Pause, ThumbsUp, FileText, RotateCcw, Clock } from 'lucide-react';
import { VideoHighlight } from '../types/blog';
import { filterVideosByCategory } from '../utils/blogLogic';

interface VideoHighlightsSectionProps {
  videos: VideoHighlight[];
  helpfulVotedVideoIds: string[];
  onToggleHelpfulVote: (videoId: string) => void;
}

const VIDEO_CATEGORIES: Array<'All' | VideoHighlight['category']> = [
  'All',
  'Sensory Techniques',
  'At-Home Trim Guides',
  'Stylist Tricks'
];

export const VideoHighlightsSection: React.FC<VideoHighlightsSectionProps> = ({
  videos,
  helpfulVotedVideoIds,
  onToggleHelpfulVote
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | VideoHighlight['category']>('All');
  const [activeVideoId, setActiveVideoId] = useState<string>(videos[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const filteredVideos = filterVideosByCategory(videos, selectedCategory);
  const activeVideo =
    filteredVideos.find((v) => v.id === activeVideoId) ||
    filteredVideos[0] ||
    videos[0];

  // Simulate playback timer when isPlaying is active
  useEffect(() => {
    if (!isPlaying || !activeVideo) return;
    const interval = window.setInterval(() => {
      setCurrentTime((prev) => {
        if (prev + 1 >= activeVideo.durationSeconds) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isPlaying, activeVideo]);

  const handleSelectVideo = (video: VideoHighlight) => {
    setActiveVideoId(video.id);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleSeekChapter = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  const formatSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Find active chapter note based on currentTime
  const currentChapter =
    [...activeVideo.chapters]
      .reverse()
      .find((ch) => currentTime >= ch.timeSeconds) || activeVideo.chapters[0];

  const isHelpfulVoted = helpfulVotedVideoIds.includes(activeVideo.id);
  const displayedHelpfulCount = activeVideo.helpfulCount + (isHelpfulVoted ? 1 : 0);

  return (
    <section id="video-highlights" className="py-16 scroll-mt-16 border-b border-zinc-200 bg-[#F2F1ED]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
              <span>02. Quickcut Kids Facebook Reels &amp; Studio Breakdowns</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Chapter Walkthroughs</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-serif-display font-medium text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Video Highlights &amp; Stylist Demonstrations
            </h2>
          </div>

          {/* Category Filter Segmented Control */}
          <div
            role="group"
            aria-label="Filter video highlights by topic"
            className="flex flex-wrap items-center gap-1 p-1 bg-white rounded-lg border border-zinc-200"
          >
            {VIDEO_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    const nextList = filterVideosByCategory(videos, category);
                    if (nextList.length > 0 && !nextList.some((v) => v.id === activeVideoId)) {
                      setActiveVideoId(nextList[0].id);
                      setCurrentTime(0);
                      setIsPlaying(false);
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-emerald-900 text-white'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 12-Column Video Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
          {/* Left 7 Columns: Featured Interactive Video Player & Chapter Breakdown */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-zinc-200 overflow-hidden">
            {/* Video Stage */}
            <div className="relative aspect-[16/9] w-full bg-zinc-950 overflow-hidden">
              <img
                src={activeVideo.thumbnailUrl}
                alt={activeVideo.thumbnailAlt}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isPlaying ? 'scale-105 opacity-80' : 'opacity-90'
                }`}
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 flex flex-col justify-between p-6">
                {/* Top Metadata Bar */}
                <div className="flex items-center justify-between gap-4 text-xs text-zinc-200">
                  <div>
                    <span className="font-mono-tabular font-semibold text-white">
                      {activeVideo.episodeNumber}
                    </span>
                    <span aria-hidden="true"> · </span>
                    <span>{activeVideo.category}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{activeVideo.viewsFormatted}</span>
                  </div>
                  <div className="font-mono-tabular bg-black/60 px-2.5 py-1 rounded text-white">
                    {formatSeconds(currentTime)} / {activeVideo.durationFormatted}
                  </div>
                </div>

                {/* Center Play/Pause Trigger & Live Coach Caption Overlay */}
                <div className="my-auto flex flex-col items-center text-center max-w-lg mx-auto">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? `Pause ${activeVideo.title}` : `Play ${activeVideo.title}`}
                    className="w-14 h-14 rounded-full bg-emerald-900/95 hover:bg-emerald-800 text-white flex items-center justify-center border border-white/30 transition-transform hover:scale-105 cursor-pointer mb-4"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5" aria-hidden="true" />
                    )}
                  </button>

                  <div className="bg-black/75 backdrop-blur-xs border border-white/15 rounded-lg px-4 py-3 text-left w-full">
                    <div className="text-[11px] font-mono-tabular text-emerald-300 mb-0.5">
                      Active Chapter ({currentChapter.timeFormatted}): {currentChapter.title}
                    </div>
                    <p className="text-xs sm:text-sm text-white leading-snug">
                      {currentChapter.coachNote}
                    </p>
                  </div>
                </div>

                {/* Interactive Scrubber Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-white/25 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (currentTime / activeVideo.durationSeconds) * 100)}%`
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-300">
                    <span>Stylist: {activeVideo.stylistName}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTime(0);
                        setIsPlaying(false);
                      }}
                      className="inline-flex items-center gap-1 hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" aria-hidden="true" />
                      <span>Restart Reel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Details & Interactive Chapters */}
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-2">
                <span className="font-semibold text-zinc-900">{activeVideo.stylistName}</span>
                <span aria-hidden="true">·</span>
                <span>{activeVideo.stylistSpecialty}</span>
                <span aria-hidden="true">·</span>
                <span>Published {activeVideo.publishedDate}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-zinc-950 mb-3">
                {activeVideo.title}
              </h3>

              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                {activeVideo.summary}
              </p>

              {/* Clickable Chapter Timestamps */}
              <div className="border-t border-zinc-200 pt-5">
                <div className="text-xs font-semibold text-zinc-900 mb-3">
                  Jump to Key Video Moments (Click any timestamp):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
                  {activeVideo.chapters.map((chapter) => {
                    const isCurrent = currentChapter.timeSeconds === chapter.timeSeconds;
                    return (
                      <button
                        key={chapter.timeFormatted}
                        type="button"
                        onClick={() => handleSeekChapter(chapter.timeSeconds)}
                        className={`text-left p-3.5 rounded-lg border transition-colors cursor-pointer flex flex-col justify-between ${
                          isCurrent
                            ? 'bg-emerald-950/5 border-emerald-900 text-zinc-950'
                            : 'bg-[#F9F9F8] border-zinc-200 hover:border-zinc-300 text-zinc-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-mono-tabular font-semibold text-emerald-900 mb-1">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{chapter.timeFormatted}</span>
                          </div>
                          <div className="text-xs font-semibold text-zinc-900 leading-snug">
                            {chapter.title}
                          </div>
                        </div>
                        <div className="text-[11px] text-zinc-600 mt-1.5 leading-relaxed">
                          {chapter.coachNote}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action & Transcript Bar */}
              <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleHelpfulVote(activeVideo.id)}
                    aria-pressed={isHelpfulVoted}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isHelpfulVoted
                        ? 'bg-emerald-900 text-white border-emerald-900'
                        : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="font-mono-tabular">
                      Helpful Reel ({displayedHelpfulCount.toLocaleString()})
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowTranscript(!showTranscript)}
                    aria-expanded={showTranscript}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-700 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{showTranscript ? 'Hide Stylist Transcript' : 'Read Stylist Transcript'}</span>
                  </button>
                </div>

                <span className="text-xs text-zinc-500">
                  Originally aired on Quickcut Kids Facebook Live
                </span>
              </div>

              {showTranscript && (
                <div className="mt-4 p-4 rounded-lg bg-[#F9F9F8] border border-zinc-200 text-xs text-zinc-700 leading-relaxed">
                  <div className="font-semibold text-zinc-900 mb-1">
                    Verbatim Stylist Audio Excerpt ({activeVideo.stylistName}):
                  </div>
                  <p className="italic">{activeVideo.transcriptExcerpt}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Playlist Queue & Studio Tip Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-semibold text-zinc-900 px-1">
              More Quickcut Kids Highlight Reels ({filteredVideos.length})
            </div>

            <div className="space-y-3">
              {filteredVideos.map((video) => {
                const isSelected = video.id === activeVideo.id;
                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => handleSelectVideo(video)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors flex gap-4 items-start cursor-pointer ${
                      isSelected
                        ? 'bg-white border-emerald-900 shadow-xs'
                        : 'bg-white/70 border-zinc-200 hover:bg-white hover:border-zinc-300'
                    }`}
                  >
                    <div className="w-28 aspect-[16/9] rounded-lg overflow-hidden bg-zinc-200 shrink-0 relative border border-zinc-200">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.thumbnailAlt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-mono-tabular px-1.5 py-0.5 rounded">
                        {video.durationFormatted}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mb-1">
                        <span className="font-mono-tabular font-semibold text-emerald-900">
                          {video.episodeNumber}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{video.category}</span>
                      </div>
                      <h4 className="text-sm font-serif-display font-medium text-zinc-950 leading-snug line-clamp-2">
                        {video.title}
                      </h4>
                      <div className="text-[11px] text-zinc-500 mt-1.5 font-mono-tabular">
                        {video.viewsFormatted} · {video.chapters.length} chapters
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Studio Filming Note */}
            <div className="p-5 rounded-xl bg-white border border-zinc-200">
              <div className="text-xs font-semibold text-zinc-900 mb-1">
                Want us to film a tutorial for your child’s hair type?
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Every Tuesday we record a new 2-minute breakdown answering a parent question from our Facebook page and the Q&amp;A board below. Post your question in the forum to request a video demo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
