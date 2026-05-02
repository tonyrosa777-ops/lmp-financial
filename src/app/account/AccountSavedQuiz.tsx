'use client';

/**
 * /account → "Your match" section.
 *
 * Phase 1J. Client Component that reads the saved quiz result from
 * localStorage on mount and renders the recommended program + LO. If no quiz
 * has been completed yet, prompts the user to take it.
 *
 * The localStorage write itself happens in src/app/quiz/QuizClient.tsx the
 * moment ResultsPhase renders. Key: `lmp.quizResult.v1`. Shape:
 *   { resultType: QuizType, recommendedProgramSlug: string, recommendedLOSlug: string, savedAt: ISO8601 }
 *
 * No server persistence in MVP. If the user clears their browser storage,
 * the recommendation is gone — they retake the quiz. (Phase 5b: add
 * "Save to my account" button that POSTs to a small KV layer.)
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/data/site';
import { useTranslation } from '@/hooks/useTranslation';

interface SavedQuiz {
  resultType: string;
  recommendedProgramSlug: string;
  recommendedLOSlug: string;
  savedAt: string;
}

const STORAGE_KEY = 'lmp.quizResult.v1';

export default function AccountSavedQuiz() {
  const { t, locale } = useTranslation('account');
  const [quiz, setQuiz] = useState<SavedQuiz | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedQuiz;
        if (
          parsed.resultType &&
          parsed.recommendedProgramSlug &&
          parsed.recommendedLOSlug
        ) {
          setQuiz(parsed);
        }
      }
    } catch {
      // Corrupted localStorage entry — treat as no quiz saved.
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <Card variant="light" hover={false}>
        <p className="text-body text-[var(--text-on-light-muted)]">
          {t('savedQuiz.loading')}
        </p>
      </Card>
    );
  }

  if (!quiz) {
    return (
      <Card variant="light" hover={false}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-body text-[var(--text-on-light-secondary)]">
              {t('savedQuiz.noQuizBody')}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button href="/quiz" variant="primary" size="md">
              {t('savedQuiz.noQuizCta')}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  const program = siteConfig.loanPrograms.find(
    (p) => p.slug === quiz.recommendedProgramSlug,
  );
  const lo = siteConfig.loanOfficers.find(
    (l) => l.slug === quiz.recommendedLOSlug,
  );

  // Defensive — slugs may have changed since quiz was saved. If we can't
  // resolve the program or LO, prompt to retake.
  if (!program || !lo) {
    return (
      <Card variant="light" hover={false}>
        <p className="text-body text-[var(--text-on-light-secondary)]">
          {t('savedQuiz.outdatedBody')}{' '}
          <Link
            href="/quiz"
            className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
          >
            {t('savedQuiz.outdatedCta')}
          </Link>
          {t('savedQuiz.outdatedSuffix')}
        </p>
      </Card>
    );
  }

  const initials = lo.name
    .split(' ')
    .filter((n) => n && !/\.$/.test(n))
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card variant="light" hover={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recommended program */}
        <Link
          href={`/services/${program.slug}`}
          className="block group"
        >
          <p className="text-eyebrow text-[var(--accent-deep)]">
            {t('savedQuiz.programLabel')}
          </p>
          <div className="flex items-start gap-4 mt-3">
            <span className="text-4xl flex-shrink-0" aria-hidden="true">
              {program.emoji}
            </span>
            <div>
              <h3 className="font-display text-xl text-[var(--text-on-light)] group-hover:text-[var(--accent-deep)] transition-colors">
                {program.name}
              </h3>
              <p className="text-body-sm text-[var(--text-on-light-muted)] mt-1">
                {t('savedQuiz.programDetailsLink')}
              </p>
            </div>
          </div>
        </Link>

        {/* Recommended LO */}
        <Link
          href={`/team/${lo.slug}`}
          className="block group"
        >
          <p className="text-eyebrow text-[var(--accent-deep)]">
            {t('savedQuiz.loLabel')}
          </p>
          <div className="flex items-start gap-4 mt-3">
            <div
              aria-hidden="true"
              className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center font-display text-lg font-bold text-[var(--primary-deep)]"
            >
              {initials}
            </div>
            <div>
              <h3 className="font-display text-xl text-[var(--text-on-light)] group-hover:text-[var(--accent-deep)] transition-colors">
                {lo.name}
              </h3>
              <p className="text-body-sm text-[var(--text-on-light-muted)] mt-1 font-mono uppercase tracking-wider">
                NMLS #{lo.nmls}
              </p>
              <p className="text-body-sm text-[var(--text-on-light-muted)] mt-1">
                {t('savedQuiz.loProfileLink')}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-6 pt-6 border-t border-[rgba(14,27,51,0.08)] flex flex-wrap items-center justify-between gap-4">
        <p className="text-micro text-[var(--text-on-light-muted)]">
          {t('savedQuiz.savedDateTemplate').replace(
            '{date}',
            new Date(quiz.savedAt).toLocaleDateString(
              locale === 'es' ? 'es-ES' : 'en-US',
              {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              },
            ),
          )}
        </p>
        <Link
          href="/quiz"
          className="text-body-sm text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
        >
          {t('savedQuiz.retakeLink')}
        </Link>
      </div>
    </Card>
  );
}
