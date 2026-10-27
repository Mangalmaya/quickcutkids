/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_PARENTING_TIPS,
  INITIAL_VIDEO_HIGHLIGHTS,
  INITIAL_QA_QUESTIONS
} from './data/seedData';
import { ParentingTip, QAQuestion, NewQuestionInput } from './types/blog';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ParentingTipsSection } from './components/ParentingTipsSection';
import { VideoHighlightsSection } from './components/VideoHighlightsSection';
import { InteractiveQASection } from './components/InteractiveQASection';
import { ArticleModal } from './components/ArticleModal';
import { Footer } from './components/Footer';

const STORAGE_KEYS = {
  SAVED_TIPS: 'quickcut_kids_saved_tips_v1',
  CHECKLIST: 'quickcut_kids_checklist_v1',
  QA_QUESTIONS: 'quickcut_kids_qa_questions_v1',
  QA_UPVOTES: 'quickcut_kids_qa_upvotes_v1',
  VIDEO_VOTES: 'quickcut_kids_video_votes_v1'
};

export default function App() {
  const [tips] = useState<ParentingTip[]>(INITIAL_PARENTING_TIPS);
  const [videos] = useState(INITIAL_VIDEO_HIGHLIGHTS);

  const [savedTipIds, setSavedTipIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SAVED_TIPS);
      return raw ? JSON.parse(raw) : ['tip-first-haircut-blueprint'];
    } catch {
      return ['tip-first-haircut-blueprint'];
    }
  });

  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
      return raw ? JSON.parse(raw) : ['chk-1', 'chk-2'];
    } catch {
      return ['chk-1', 'chk-2'];
    }
  });

  const [questions, setQuestions] = useState<QAQuestion[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.QA_QUESTIONS);
      return raw ? JSON.parse(raw) : INITIAL_QA_QUESTIONS;
    } catch {
      return INITIAL_QA_QUESTIONS;
    }
  });

  const [upvotedQuestionIds, setUpvotedQuestionIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.QA_UPVOTES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [helpfulVotedVideoIds, setHelpfulVotedVideoIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.VIDEO_VOTES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [activeModalTip, setActiveModalTip] = useState<ParentingTip | null>(null);
  const [onlySavedFilter, setOnlySavedFilter] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_TIPS, JSON.stringify(savedTipIds));
    } catch {
      // ignore storage quota errors
    }
  }, [savedTipIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(completedChecklistIds));
    } catch {
      // ignore
    }
  }, [completedChecklistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QA_QUESTIONS, JSON.stringify(questions));
    } catch {
      // ignore
    }
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QA_UPVOTES, JSON.stringify(upvotedQuestionIds));
    } catch {
      // ignore
    }
  }, [upvotedQuestionIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VIDEO_VOTES, JSON.stringify(helpfulVotedVideoIds));
    } catch {
      // ignore
    }
  }, [helpfulVotedVideoIds]);

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'prep-checklist') {
      const el = document.getElementById('prep-checklist');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenAskQuestion = () => {
    const formCard = document.getElementById('ask-question-form-card');
    formCard?.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('qa-parent-name') as HTMLInputElement | null;
    if (nameInput) {
      window.setTimeout(() => nameInput.focus(), 300);
    }
  };

  const handleToggleSaveTip = (tipId: string) => {
    setSavedTipIds((prev) =>
      prev.includes(tipId) ? prev.filter((id) => id !== tipId) : [...prev, tipId]
    );
  };

  const handleToggleChecklistItem = (itemId: string) => {
    setCompletedChecklistIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleToggleUpvoteQuestion = (questionId: string) => {
    const alreadyUpvoted = upvotedQuestionIds.includes(questionId);
    setUpvotedQuestionIds((prev) =>
      alreadyUpvoted ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, upvotes: alreadyUpvoted ? Math.max(0, q.upvotes - 1) : q.upvotes + 1 }
          : q
      )
    );
  };

  const handleAddQuestion = (input: NewQuestionInput) => {
    const newQuestion: QAQuestion = {
      id: `qa-${Date.now()}`,
      parentName: input.parentName.trim(),
      childAge: input.childAge.trim(),
      topic: input.topic,
      createdAt: 'Just now',
      title: input.title.trim(),
      details: input.details.trim(),
      upvotes: 1,
      isAnsweredByTeam: false,
      replies: []
    };
    setQuestions((prev) => [newQuestion, ...prev]);
    setUpvotedQuestionIds((prev) => [...prev, newQuestion.id]);
  };

  const handleAddReply = (questionId: string, authorName: string, body: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              replies: [
                ...q.replies,
                {
                  id: `rep-${Date.now()}`,
                  authorName,
                  authorBadge: 'Community Parent',
                  createdAt: 'Just now',
                  body,
                  helpfulVotes: 1
                }
              ]
            }
          : q
      )
    );
  };

  const handleToggleHelpfulVideo = (videoId: string) => {
    setHelpfulVotedVideoIds((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F8] text-zinc-900">
      <Header
        savedTipsCount={savedTipIds.length}
        onNavigateSection={handleNavigateSection}
        onOpenAskQuestion={handleOpenAskQuestion}
      />

      <main className="flex-1">
        <HeroSection
          featuredTip={tips[0]}
          onReadTip={(tip) => setActiveModalTip(tip)}
          onJumpToVideos={() => handleNavigateSection('video-highlights')}
          onJumpToQA={() => handleNavigateSection('community-qa')}
        />

        <ParentingTipsSection
          tips={tips}
          savedTipIds={savedTipIds}
          completedChecklistIds={completedChecklistIds}
          onlySavedFilter={onlySavedFilter}
          onToggleOnlySaved={setOnlySavedFilter}
          onToggleSaveTip={handleToggleSaveTip}
          onToggleChecklistItem={handleToggleChecklistItem}
          onSelectTip={(tip) => setActiveModalTip(tip)}
        />

        <VideoHighlightsSection
          videos={videos}
          helpfulVotedVideoIds={helpfulVotedVideoIds}
          onToggleHelpfulVote={handleToggleHelpfulVideo}
        />

        <InteractiveQASection
          questions={questions}
          upvotedQuestionIds={upvotedQuestionIds}
          onToggleUpvoteQuestion={handleToggleUpvoteQuestion}
          onAddQuestion={handleAddQuestion}
          onAddReply={handleAddReply}
        />
      </main>

      <Footer onNavigateSection={handleNavigateSection} />

      <ArticleModal
        tip={activeModalTip}
        isSaved={activeModalTip ? savedTipIds.includes(activeModalTip.id) : false}
        completedChecklistIds={completedChecklistIds}
        onClose={() => setActiveModalTip(null)}
        onToggleSave={handleToggleSaveTip}
        onToggleChecklistItem={handleToggleChecklistItem}
      />
    </div>
  );
}
