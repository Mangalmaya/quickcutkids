import {
  ParentingTip,
  TipCategory,
  QAQuestion,
  QATopic,
  NewQuestionInput,
  ValidationResult,
  VideoHighlight
} from '../types/blog';

export function filterParentingTips(
  tips: ParentingTip[],
  category: TipCategory,
  searchQuery: string,
  onlySaved: boolean,
  savedIds: string[]
): ParentingTip[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return tips.filter((tip) => {
    if (category !== 'All' && tip.category !== category) {
      return false;
    }
    if (onlySaved && !savedIds.includes(tip.id)) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    const searchable = [
      tip.title,
      tip.subtitle,
      tip.category,
      tip.summary,
      tip.ageRange,
      ...tip.keyTakeaways
    ]
      .join(' ')
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export function calculateChecklistProgress(
  totalItems: number,
  completedIds: string[],
  validChecklistIds: string[]
): { completedCount: number; percentage: number } {
  if (totalItems <= 0 || validChecklistIds.length === 0) {
    return { completedCount: 0, percentage: 0 };
  }
  const completedCount = validChecklistIds.filter((id) => completedIds.includes(id)).length;
  const percentage = Math.round((completedCount / totalItems) * 100);
  return { completedCount, percentage };
}

export function filterAndSortQuestions(
  questions: QAQuestion[],
  topic: QATopic,
  searchQuery: string,
  sortBy: 'popular' | 'newest'
): QAQuestion[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = questions.filter((q) => {
    if (topic !== 'All' && q.topic !== topic) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    const text = [
      q.title,
      q.details,
      q.parentName,
      q.childAge,
      q.topic,
      ...q.replies.map((r) => r.body)
    ]
      .join(' ')
      .toLowerCase();
    return text.includes(normalizedQuery);
  });

  if (sortBy === 'popular') {
    return [...filtered].sort((a, b) => b.upvotes - a.upvotes);
  }
  return [...filtered];
}

export function validateNewQuestion(input: NewQuestionInput): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!input.parentName || input.parentName.trim().length < 2) {
    errors.parentName = 'Please enter your name or initials (at least 2 characters).';
  }
  if (!input.childAge || input.childAge.trim().length < 2) {
    errors.childAge = 'Please specify your child’s age (e.g., "2 years old" or "18 months").';
  }
  if (!input.title || input.title.trim().length < 10) {
    errors.title = 'Please enter a clear question headline (at least 10 characters).';
  }
  if (!input.details || input.details.trim().length < 15) {
    errors.details = 'Please share a few details so our stylists and parents can give tailored advice (at least 15 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function filterVideosByCategory(
  videos: VideoHighlight[],
  category: 'All' | VideoHighlight['category']
): VideoHighlight[] {
  if (category === 'All') return videos;
  return videos.filter((v) => v.category === category);
}
