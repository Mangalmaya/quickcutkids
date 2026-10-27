export type TipCategory = 'All' | 'First Haircuts' | 'Sensory Care' | 'Morning Routines' | 'Curl & Texture Care';

export interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
}

export interface ParentingTip {
  id: string;
  indexNumber: string;
  title: string;
  subtitle: string;
  category: Exclude<TipCategory, 'All'>;
  ageRange: string;
  readTimeMinutes: number;
  publishedDate: string;
  authorName: string;
  authorRole: string;
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  summary: string;
  pullQuote: string;
  keyTakeaways: string[];
  bodyParagraphs: string[];
  prepChecklist: ChecklistItem[];
  fbPostEngagement: {
    shares: number;
    saves: number;
    commentsCount: number;
  };
}

export interface VideoChapter {
  timeSeconds: number;
  timeFormatted: string;
  title: string;
  coachNote: string;
}

export interface VideoHighlight {
  id: string;
  episodeNumber: string;
  title: string;
  category: 'Sensory Techniques' | 'Stylist Tricks' | 'At-Home Trim Guides';
  durationFormatted: string;
  durationSeconds: number;
  publishedDate: string;
  viewsFormatted: string;
  helpfulCount: number;
  thumbnailUrl: string;
  thumbnailAlt: string;
  stylistName: string;
  stylistSpecialty: string;
  summary: string;
  fbReelUrl: string;
  chapters: VideoChapter[];
  transcriptExcerpt: string;
}

export type QATopic = 'All' | 'Sensory Sensitivity' | 'Toddlers (1–3 yrs)' | 'Curls & Detangling' | 'Chair Anxiety';

export interface QAReply {
  id: string;
  authorName: string;
  authorBadge: 'Quickcut Lead Stylist' | 'Pediatric OT Advisor' | 'Community Parent';
  createdAt: string;
  body: string;
  helpfulVotes: number;
}

export interface QAQuestion {
  id: string;
  parentName: string;
  childAge: string;
  topic: Exclude<QATopic, 'All'>;
  createdAt: string;
  title: string;
  details: string;
  upvotes: number;
  isAnsweredByTeam: boolean;
  replies: QAReply[];
}

export interface NewQuestionInput {
  parentName: string;
  childAge: string;
  topic: Exclude<QATopic, 'All'>;
  title: string;
  details: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof NewQuestionInput, string>>;
}
