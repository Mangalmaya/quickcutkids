import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterParentingTips,
  calculateChecklistProgress,
  filterAndSortQuestions,
  validateNewQuestion,
  filterVideosByCategory
} from './blogLogic';
import { INITIAL_PARENTING_TIPS, INITIAL_QA_QUESTIONS, INITIAL_VIDEO_HIGHLIGHTS } from '../data/seedData';

test('filterParentingTips filters by category, search query, and saved state', () => {
  const sensoryOnly = filterParentingTips(INITIAL_PARENTING_TIPS, 'Sensory Care', '', false, []);
  assert.equal(sensoryOnly.length, 1);
  assert.equal(sensoryOnly[0].id, 'tip-sensory-sound-desensitization');

  const searchMatch = filterParentingTips(INITIAL_PARENTING_TIPS, 'All', 'Montessori', false, []);
  assert.equal(searchMatch.length, 1);
  assert.equal(searchMatch[0].id, 'tip-montessori-morning-hair-station');

  const savedOnly = filterParentingTips(
    INITIAL_PARENTING_TIPS,
    'All',
    '',
    true,
    ['tip-first-haircut-blueprint', 'tip-curl-hydration-bedhead']
  );
  assert.equal(savedOnly.length, 2);
});

test('calculateChecklistProgress computes accurate completion count and percentage', () => {
  const validIds = ['chk-1', 'chk-2', 'chk-3', 'chk-4'];
  const progress = calculateChecklistProgress(4, ['chk-1', 'chk-3', 'unrelated-id'], validIds);
  assert.equal(progress.completedCount, 2);
  assert.equal(progress.percentage, 50);

  const empty = calculateChecklistProgress(0, [], []);
  assert.equal(empty.completedCount, 0);
  assert.equal(empty.percentage, 0);
});

test('filterAndSortQuestions filters by topic and sorts by popular upvotes', () => {
  const sensory = filterAndSortQuestions(INITIAL_QA_QUESTIONS, 'Sensory Sensitivity', '', 'popular');
  assert.equal(sensory.length, 1);
  assert.equal(sensory[0].id, 'qa-1');

  const sortedPopular = filterAndSortQuestions(INITIAL_QA_QUESTIONS, 'All', '', 'popular');
  assert.equal(sortedPopular[0].upvotes >= sortedPopular[1].upvotes, true);
});

test('validateNewQuestion rejects empty/short inputs and accepts valid parent question', () => {
  const invalid = validateNewQuestion({
    parentName: 'A',
    childAge: '',
    topic: 'Sensory Sensitivity',
    title: 'Short',
    details: 'Too short'
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.parentName);
  assert.ok(invalid.errors.childAge);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.details);

  const valid = validateNewQuestion({
    parentName: 'Elena G.',
    childAge: '3 years old',
    topic: 'Chair Anxiety',
    title: 'How do we transition from lap haircuts to sitting solo in the booster chair?',
    details: 'My daughter sits calmly on my lap for trims, but cries when asked to sit by herself.'
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('filterVideosByCategory returns matching videos or all', () => {
  const all = filterVideosByCategory(INITIAL_VIDEO_HIGHLIGHTS, 'All');
  assert.equal(all.length, 3);

  const stylistTricks = filterVideosByCategory(INITIAL_VIDEO_HIGHLIGHTS, 'Stylist Tricks');
  assert.equal(stylistTricks.length, 1);
  assert.equal(stylistTricks[0].id, 'vid-ear-tickle-scissor-trick');
});
