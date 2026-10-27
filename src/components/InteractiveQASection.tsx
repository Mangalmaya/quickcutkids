import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Send, CheckCircle2, Search } from 'lucide-react';
import { QAQuestion, QATopic, NewQuestionInput } from '../types/blog';
import { filterAndSortQuestions, validateNewQuestion } from '../utils/blogLogic';

interface InteractiveQASectionProps {
  questions: QAQuestion[];
  upvotedQuestionIds: string[];
  onToggleUpvoteQuestion: (questionId: string) => void;
  onAddQuestion: (input: NewQuestionInput) => void;
  onAddReply: (questionId: string, authorName: string, body: string) => void;
  highlightFormTrigger?: number;
}

const QA_TOPICS: QATopic[] = [
  'All',
  'Sensory Sensitivity',
  'Toddlers (1–3 yrs)',
  'Curls & Detangling',
  'Chair Anxiety'
];

export const InteractiveQASection: React.FC<InteractiveQASectionProps> = ({
  questions,
  upvotedQuestionIds,
  onToggleUpvoteQuestion,
  onAddQuestion,
  onAddReply
}) => {
  const [selectedTopic, setSelectedTopic] = useState<QATopic>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state for asking a new question
  const [parentName, setParentName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [topic, setTopic] = useState<Exclude<QATopic, 'All'>>('Sensory Sensitivity');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NewQuestionInput, string>>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reply state per question
  const [openReplyBoxId, setOpenReplyBoxId] = useState<string | null>(null);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [replyError, setReplyError] = useState('');

  const filteredQuestions = filterAndSortQuestions(
    questions,
    selectedTopic,
    searchQuery,
    sortBy
  );

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input: NewQuestionInput = {
      parentName,
      childAge,
      topic,
      title,
      details
    };
    const validation = validateNewQuestion(input);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      setSubmitSuccess(false);
      return;
    }

    setFormErrors({});
    onAddQuestion(input);
    setParentName('');
    setChildAge('');
    setTitle('');
    setDetails('');
    setSubmitSuccess(true);
    setSelectedTopic('All');
    setSortBy('newest');
  };

  const handleReplySubmit = (e: React.FormEvent, questionId: string) => {
    e.preventDefault();
    if (replyAuthor.trim().length < 2 || replyBody.trim().length < 5) {
      setReplyError('Please enter your name and a helpful reply (at least 5 characters).');
      return;
    }
    onAddReply(questionId, replyAuthor.trim(), replyBody.trim());
    setReplyAuthor('');
    setReplyBody('');
    setReplyError('');
    setOpenReplyBoxId(null);
  };

  return (
    <section id="community-qa" className="py-16 scroll-mt-16 bg-[#F9F9F8]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
              <span>03. Interactive Parent &amp; Stylist Forum</span>
              <span aria-hidden="true">·</span>
              <span>Synced with Quickcut Kids Facebook Q&amp;A Fridays</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-serif-display font-medium text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Ask the Quickcut Kids Community
            </h2>
          </div>

          <p className="text-sm text-zinc-600 max-w-md leading-relaxed">
            Have a question about clipper anxiety, cowlicks, toddler curls, or preparing for a first trim? Browse verified stylist answers or post your own question below.
          </p>
        </div>

        {/* Main 12-Column Split: Left 7 Cols Q&A Feed | Right 5 Cols Ask Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 items-start">
          {/* Left 7 Columns: Filterable Q&A Discussions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Topic Filter & Sort Bar */}
            <div className="space-y-3 bg-[#F2F1ED] p-4 rounded-xl border border-zinc-200/80">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  role="group"
                  aria-label="Filter Q&A by topic"
                  className="flex flex-wrap items-center gap-1"
                >
                  {QA_TOPICS.map((t) => {
                    const active = selectedTopic === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTopic(t)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-emerald-900 text-white'
                            : 'bg-white/80 text-zinc-700 hover:bg-white'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                {/* Sort Segmented Control */}
                <div
                  role="group"
                  aria-label="Sort questions"
                  className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-zinc-200"
                >
                  <button
                    type="button"
                    onClick={() => setSortBy('popular')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      sortBy === 'popular'
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Most Helpful
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('newest')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      sortBy === 'newest'
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Newest
                  </button>
                </div>
              </div>

              {/* Search Input */}
              <div className="relative">
                <label htmlFor="qa-search-input" className="sr-only">
                  Search parent Q&amp;A questions
                </label>
                <Search
                  className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="qa-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search parent questions (e.g., scissors only, 3B curls, car seat)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-900"
                />
              </div>
            </div>

            {/* Question List */}
            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center rounded-xl border border-zinc-200 bg-white">
                <p className="text-sm font-medium text-zinc-900 mb-1">
                  No questions match that filter yet
                </p>
                <p className="text-xs text-zinc-500 mb-4">
                  Try clearing your search or ask our stylists directly using the form on this page.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTopic('All');
                    setSearchQuery('');
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-900 rounded-lg cursor-pointer"
                >
                  Show All Questions
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredQuestions.map((q) => {
                  const hasUpvoted = upvotedQuestionIds.includes(q.id);
                  const isReplying = openReplyBoxId === q.id;

                  return (
                    <article
                      key={q.id}
                      className="p-6 rounded-xl border border-zinc-200 bg-white"
                    >
                      {/* Unboxed Metadata Line (Zero-Pill Rule) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-2.5">
                        <span className="font-semibold text-emerald-900">{q.topic}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-zinc-800 font-medium">Asked by {q.parentName}</span>
                        <span aria-hidden="true">·</span>
                        <span>Child: {q.childAge}</span>
                        <span aria-hidden="true">·</span>
                        <span>{q.createdAt}</span>
                        {q.isAnsweredByTeam && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-900 font-medium">
                              Stylist Verified Answer
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-serif-display font-medium text-zinc-950 leading-snug mb-2">
                        {q.title}
                      </h3>

                      <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                        {q.details}
                      </p>

                      {/* Question Actions */}
                      <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
                        <button
                          type="button"
                          onClick={() => onToggleUpvoteQuestion(q.id)}
                          aria-pressed={hasUpvoted}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            hasUpvoted
                              ? 'bg-emerald-900 text-white border-emerald-900'
                              : 'bg-[#F9F9F8] text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                          <span className="font-mono-tabular">
                            Helpful Question ({q.upvotes})
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOpenReplyBoxId(isReplying ? null : q.id);
                            setReplyError('');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-[#F9F9F8] border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Add Parent Tip ({q.replies.length})</span>
                        </button>
                      </div>

                      {/* Replies Thread */}
                      {q.replies.length > 0 && (
                        <div className="mt-4 space-y-3">
                          {q.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="p-4 rounded-lg bg-[#F9F9F8] border border-zinc-200/80"
                            >
                              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-1.5">
                                <span className="font-semibold text-zinc-900">
                                  {reply.authorName}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="font-medium text-emerald-900">
                                  {reply.authorBadge}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{reply.createdAt}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                                {reply.body}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Inline Add Reply Form */}
                      {isReplying && (
                        <form
                          onSubmit={(e) => handleReplySubmit(e, q.id)}
                          className="mt-4 p-4 rounded-lg bg-[#F2F1ED] border border-zinc-200 space-y-3"
                        >
                          <div className="text-xs font-semibold text-zinc-900">
                            Share what worked for your child:
                          </div>
                          <div>
                            <label htmlFor={`reply-name-${q.id}`} className="block text-xs text-zinc-700 mb-1">
                              Your Name
                            </label>
                            <input
                              id={`reply-name-${q.id}`}
                              type="text"
                              value={replyAuthor}
                              onChange={(e) => setReplyAuthor(e.target.value)}
                              placeholder="e.g., Jordan P. (Mom of a 3yo)"
                              className="w-full px-3 py-1.5 text-xs bg-white border border-zinc-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label htmlFor={`reply-body-${q.id}`} className="block text-xs text-zinc-700 mb-1">
                              Your Advice or Experience
                            </label>
                            <textarea
                              id={`reply-body-${q.id}`}
                              rows={2}
                              value={replyBody}
                              onChange={(e) => setReplyBody(e.target.value)}
                              placeholder="Share a tip or reassurance..."
                              className="w-full px-3 py-1.5 text-xs bg-white border border-zinc-300 rounded-md"
                            />
                          </div>
                          {replyError && (
                            <p className="text-xs text-red-700 font-medium">{replyError}</p>
                          )}
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-900 rounded-md hover:bg-emerald-800 cursor-pointer"
                            >
                              Post Reply
                            </button>
                            <button
                              type="button"
                              onClick={() => setOpenReplyBoxId(null)}
                              className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right 5 Columns: Validated "Ask the Quickcut Team" Form */}
          <div className="lg:col-span-5">
            <div
              id="ask-question-form-card"
              className="p-6 sm:p-8 rounded-xl border border-zinc-200 bg-white sticky top-20"
            >
              <div className="text-xs text-emerald-900 font-semibold mb-1">
                Direct to Our Pediatric Stylists
              </div>
              <h3 className="text-2xl font-serif-display font-medium text-zinc-950 mb-2">
                Post a Question for the Team
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                Your question appears immediately in the community feed and is queued for our Friday Facebook Live Q&amp;A session.
              </p>

              {submitSuccess && (
                <div
                  role="status"
                  className="mb-5 p-3.5 rounded-lg bg-emerald-950/5 border border-emerald-900/30 flex items-start gap-2.5 text-xs text-emerald-950"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-900 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="font-semibold block">Question published to the Q&amp;A board!</strong>
                    <span>We switched the feed to “Newest” so you can see your question at the top of the list.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleQuestionSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="qa-parent-name"
                      className="block text-xs font-semibold text-zinc-800 mb-1"
                    >
                      Parent Name or Initials
                    </label>
                    <input
                      id="qa-parent-name"
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g., Rachel S."
                      className="w-full px-3 py-2 text-xs bg-[#F9F9F8] border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:border-emerald-900"
                    />
                    {formErrors.parentName && (
                      <p className="text-[11px] text-red-700 mt-1">{formErrors.parentName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="qa-child-age"
                      className="block text-xs font-semibold text-zinc-800 mb-1"
                    >
                      Child’s Age
                    </label>
                    <input
                      id="qa-child-age"
                      type="text"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      placeholder="e.g., 22 months old"
                      className="w-full px-3 py-2 text-xs bg-[#F9F9F8] border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:border-emerald-900"
                    />
                    {formErrors.childAge && (
                      <p className="text-[11px] text-red-700 mt-1">{formErrors.childAge}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="qa-topic-select"
                    className="block text-xs font-semibold text-zinc-800 mb-1"
                  >
                    Topic Category
                  </label>
                  <select
                    id="qa-topic-select"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as Exclude<QATopic, 'All'>)}
                    className="w-full px-3 py-2 text-xs bg-[#F9F9F8] border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:border-emerald-900"
                  >
                    <option value="Sensory Sensitivity">Sensory Sensitivity</option>
                    <option value="Toddlers (1–3 yrs)">Toddlers (1–3 yrs)</option>
                    <option value="Curls & Detangling">Curls &amp; Detangling</option>
                    <option value="Chair Anxiety">Chair Anxiety</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="qa-question-title"
                    className="block text-xs font-semibold text-zinc-800 mb-1"
                  >
                    Question Headline
                  </label>
                  <input
                    id="qa-question-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., How do I keep my 2-year-old from grabbing the comb?"
                    className="w-full px-3 py-2 text-xs bg-[#F9F9F8] border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:border-emerald-900"
                  />
                  {formErrors.title && (
                    <p className="text-[11px] text-red-700 mt-1">{formErrors.title}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="qa-question-details"
                    className="block text-xs font-semibold text-zinc-800 mb-1"
                  >
                    Background Details (Hair Texture, Triggers, What You’ve Tried)
                  </label>
                  <textarea
                    id="qa-question-details"
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us a bit about your child's routine or what usually happens during hair brushing or trims..."
                    className="w-full px-3 py-2 text-xs bg-[#F9F9F8] border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:border-emerald-900"
                  />
                  {formErrors.details && (
                    <p className="text-[11px] text-red-700 mt-1">{formErrors.details}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Submit Question to Quickcut Kids Q&amp;A</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
