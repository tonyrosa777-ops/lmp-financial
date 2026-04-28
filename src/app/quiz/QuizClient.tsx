'use client';

// src/app/quiz/QuizClient.tsx
//
// 3-phase quiz client component. State machine: 'intro' → 'question' → 'results'.
//
// Per CLAUDE.md Always-Built Features Rule → Interactive Quiz section:
//   - Auto-advance with 400ms glow on selected answer
//   - Other answers dim to 30% opacity during the pending period
//   - Back navigation slices answers array, re-highlights saved answer
//   - Forward direction: 1 (slide right-to-left), back: -1 (slide left-to-right)
//   - NO email gate phase
//   - NO /api/quiz route — Calendly captures contact info on its own
//   - Results phase mounts <BookingCalendar /> inline — never a link to /booking
//
// Trust contract: <BookingCalendar /> is built by the parallel Booking Agent.
// Expected API: <BookingCalendar loSlug="..." />.

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import FadeUp from '@/components/animations/FadeUp';
import BookingCalendar from '@/components/BookingCalendar';
import { siteConfig } from '@/data/site';
import {
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  scoreQuiz,
  type QuizType,
} from '@/data/quiz';
import { cn, easings, prefersReducedMotion } from '@/lib/utils';

type QuizPhase = 'intro' | 'question' | 'results';

const PENDING_GLOW_MS = 400;

export default function QuizClient() {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizType[]>([]);
  const [pendingAnswer, setPendingAnswer] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [resultType, setResultType] = useState<QuizType | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // SSR-safe motion preference detection (client-only effect).
  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[questionIndex];

  // Find the previously-saved answer for the current question (used for re-highlight on back nav).
  const savedAnswerIndex = useMemo(() => {
    if (pendingAnswer !== null) return null; // pending takes precedence visually
    if (questionIndex >= answers.length) return null;
    const savedType = answers[questionIndex];
    return currentQuestion.answers.findIndex((a) => a.type === savedType);
  }, [pendingAnswer, questionIndex, answers, currentQuestion]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  function handleStart() {
    setPhase('question');
    setQuestionIndex(0);
    setAnswers([]);
    setPendingAnswer(null);
    setDirection(1);
    setResultType(null);
  }

  function handleAnswerClick(answerIndex: number) {
    if (pendingAnswer !== null) return; // ignore during glow window
    setPendingAnswer(answerIndex);

    const selectedType = currentQuestion.answers[answerIndex].type;

    // Replace the current slot in the answers array (handles back-nav re-pick).
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedType;

    window.setTimeout(() => {
      setAnswers(newAnswers);
      setPendingAnswer(null);

      const isFinalQuestion = questionIndex === totalQuestions - 1;
      if (isFinalQuestion) {
        const winner = scoreQuiz(newAnswers);
        setResultType(winner);
        setPhase('results');
      } else {
        setDirection(1);
        setQuestionIndex(questionIndex + 1);
      }
    }, PENDING_GLOW_MS);
  }

  function handleBack() {
    if (questionIndex === 0) {
      setPhase('intro');
      return;
    }
    setDirection(-1);
    setPendingAnswer(null);
    // Slice answers to discard future answers (per spec).
    setAnswers((prev) => prev.slice(0, questionIndex));
    setQuestionIndex(questionIndex - 1);
  }

  function handleRestart() {
    setPhase('intro');
    setQuestionIndex(0);
    setAnswers([]);
    setPendingAnswer(null);
    setDirection(1);
    setResultType(null);
  }

  // ---------------------------------------------------------------------------
  // Phase render
  // ---------------------------------------------------------------------------

  if (phase === 'intro') {
    return <IntroPhase onStart={handleStart} />;
  }

  if (phase === 'question') {
    return (
      <QuestionPhase
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
        question={currentQuestion}
        pendingAnswer={pendingAnswer}
        savedAnswerIndex={savedAnswerIndex}
        direction={direction}
        reducedMotion={reducedMotion}
        onAnswerClick={handleAnswerClick}
        onBack={handleBack}
      />
    );
  }

  // phase === 'results'
  if (resultType === null) {
    // Defensive — shouldn't happen, but render restart button if it does.
    return (
      <div className="text-center">
        <p className="text-[var(--text-secondary)]">Something went sideways. Please retry.</p>
        <Button onClick={handleRestart} variant="primary" className="mt-4">
          Restart the quiz
        </Button>
      </div>
    );
  }
  return <ResultsPhase resultType={resultType} onRestart={handleRestart} />;
}

// ===========================================================================
// INTRO PHASE
// ===========================================================================

function IntroPhase({ onStart }: { onStart: () => void }) {
  return (
    <FadeUp>
      <div className="text-center max-w-2xl mx-auto">
        <Badge color="gold">Quiz · 5 questions</Badge>
        <h2 className="font-display text-h2 mt-4 text-[var(--text-on-light)]">
          Tell us your situation. We will tell you the program.
        </h2>
        <p className="mt-6 text-lg text-[var(--text-on-light-muted)]">
          We built this quiz the way we open intro calls in our office. Five
          fast questions, no credit pull, no documents, no commitment. By the
          end you will know which loan program fits your situation and which
          loan officer on our team is best for it.
        </p>
        <div className="mt-10">
          <Button onClick={onStart} variant="primary" size="lg">
            Start the quiz
          </Button>
        </div>
      </div>
    </FadeUp>
  );
}

// ===========================================================================
// QUESTION PHASE
// ===========================================================================

interface QuestionPhaseProps {
  questionIndex: number;
  totalQuestions: number;
  question: (typeof QUIZ_QUESTIONS)[number];
  pendingAnswer: number | null;
  savedAnswerIndex: number | null;
  direction: 1 | -1;
  reducedMotion: boolean;
  onAnswerClick: (answerIndex: number) => void;
  onBack: () => void;
}

function QuestionPhase({
  questionIndex,
  totalQuestions,
  question,
  pendingAnswer,
  savedAnswerIndex,
  direction,
  reducedMotion,
  onAnswerClick,
  onBack,
}: QuestionPhaseProps) {
  // Slide x-offset — short-circuited under reduced motion.
  const slideOffset = reducedMotion ? 0 : 40;

  return (
    <div>
      {/* Top bar — back button + progress */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-[var(--text-on-light-muted)] hover:text-[var(--accent-deep)] font-body font-semibold transition-colors duration-200 inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded"
          type="button"
          aria-label={questionIndex === 0 ? 'Back to intro' : 'Previous question'}
        >
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>
        <Badge color="neutral">
          {questionIndex + 1} / {totalQuestions}
        </Badge>
      </div>

      {/* Progress bar */}
      <div
        className="h-1 w-full bg-[rgba(14,27,51,0.08)] rounded-full overflow-hidden mb-10"
        role="progressbar"
        aria-valuenow={questionIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
      >
        <motion.div
          className="h-full bg-[var(--accent)] rounded-full"
          initial={false}
          animate={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          transition={{ duration: 0.4, ease: easings.confident }}
        />
      </div>

      {/* Animated question slot */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ x: direction * slideOffset, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * slideOffset, opacity: 0 }}
          transition={{ duration: 0.3, ease: easings.entrance }}
        >
          <h2 className="font-display text-h2 text-[var(--text-on-light)] mb-8 text-center">
            {question.prompt}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.answers.map((answer, idx) => {
              const isPending = pendingAnswer === idx;
              const isSaved = savedAnswerIndex === idx;
              const isHighlighted = isPending || isSaved;
              const isDimmed = pendingAnswer !== null && pendingAnswer !== idx;

              return (
                <button
                  key={`${question.id}-${idx}`}
                  type="button"
                  onClick={() => onAnswerClick(idx)}
                  disabled={pendingAnswer !== null}
                  className={cn(
                    'block w-full text-left rounded-[var(--radius-xl)] p-6 border-2 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
                    isHighlighted
                      ? 'bg-[var(--accent)] text-[var(--primary-deep)] border-[var(--accent)] shadow-[var(--shadow-glow-gold)] -translate-y-0.5'
                      : 'bg-[var(--bg-card)] text-[var(--text-on-light)] border-[rgba(14,27,51,0.08)] hover:border-[var(--accent-muted)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]',
                    isDimmed && 'opacity-30',
                  )}
                  aria-pressed={isHighlighted}
                >
                  <span className="font-body text-base md:text-lg font-semibold leading-snug">
                    {answer.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ===========================================================================
// RESULTS PHASE
// ===========================================================================

interface ResultsPhaseProps {
  resultType: QuizType;
  onRestart: () => void;
}

function ResultsPhase({ resultType, onRestart }: ResultsPhaseProps) {
  const result = QUIZ_RESULTS[resultType];
  const lo = siteConfig.loanOfficers.find((l) => l.slug === result.recommendedLOSlug);
  const program = siteConfig.loanPrograms.find(
    (p) => p.slug === result.recommendedProgram.slug,
  );

  // Initials disk for LO photo placeholder (no real headshots yet — see IBD §4).
  const initials = lo
    ? lo.name
        .split(' ')
        .filter((n) => n && !/\.$/.test(n))
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '??';

  return (
    <div>
      {/* Result hero */}
      <FadeUp>
        <div className="text-center mb-12">
          <Badge color="gold">Your match</Badge>
          <h2 className="font-display text-h2 mt-4 text-[var(--text-on-light)]">
            {result.name}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-[var(--text-on-light-muted)] max-w-2xl mx-auto">
            {result.tagline}
          </p>
        </div>
      </FadeUp>

      {/* Body paragraphs */}
      <FadeUp delay={0.1}>
        <div className="max-w-2xl mx-auto mb-14 space-y-5 text-[var(--text-on-light)]">
          {result.body.map((paragraph, i) => (
            <p key={i} className="text-base md:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </FadeUp>

      {/* Recommended program card */}
      {program && (
        <FadeUp delay={0.2}>
          <div className="mb-10">
            <p className="text-eyebrow text-[var(--accent-deep)] mb-3">
              Recommended program
            </p>
            <Card variant="light" href={`/services/${program.slug}`}>
              <div className="flex items-start gap-5">
                <span className="text-4xl md:text-5xl flex-shrink-0" aria-hidden="true">
                  {program.emoji}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl text-[var(--text-on-light)]">
                    {program.name}
                  </h3>
                  <p className="mt-2 text-[var(--text-on-light-muted)]">
                    {result.recommendedProgram.reason}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[var(--accent-deep)]">
                    Read the full program details →
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </FadeUp>
      )}

      {/* Recommended LO + inline Calendly */}
      {lo && (
        <FadeUp delay={0.3}>
          <div className="mb-10">
            <p className="text-eyebrow text-[var(--accent-deep)] mb-3">
              Your loan officer
            </p>
            <Card variant="light" hover={false}>
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Initials disk (placeholder until headshots — IBD §4) */}
                <div
                  aria-hidden="true"
                  className="flex-shrink-0 w-24 h-24 rounded-full bg-[var(--accent)] flex items-center justify-center font-display text-3xl font-bold text-[var(--primary-deep)] mx-auto md:mx-0"
                >
                  {initials}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-display text-2xl text-[var(--text-on-light)]">
                    {lo.name}
                  </h3>
                  <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-on-light-muted)] mt-1">
                    NMLS #{lo.nmls} · {lo.role}
                  </p>
                  <p className="mt-4 text-[var(--text-on-light)] leading-relaxed">
                    {lo.bio}
                  </p>
                </div>
              </div>

              {/* Inline booking calendar — never a link to /booking. */}
              <div className="mt-8 pt-8 border-t border-[rgba(14,27,51,0.08)]">
                <h4 className="font-display text-xl text-[var(--text-on-light)] mb-4 text-center md:text-left">
                  Book your 15-minute intro call
                </h4>
                <BookingCalendar loSlug={lo.slug} />
              </div>
            </Card>
          </div>
        </FadeUp>
      )}

      {/* Restart CTA */}
      <FadeUp delay={0.4}>
        <div className="text-center mt-12">
          <Button onClick={onRestart} variant="tertiary" size="md">
            Restart the quiz
          </Button>
        </div>
      </FadeUp>
    </div>
  );
}
