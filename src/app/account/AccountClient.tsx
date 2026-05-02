'use client';

/**
 * AccountClient — Borrower Portal home (client-side translation chrome).
 *
 * The /account route is a Server Component that calls auth() and feeds this
 * Client Component the userEmail + a server-action sign-out function. We
 * extracted into a client to use useTranslation('account') for the chrome.
 *
 * Section structure unchanged from the server-only version:
 *   1. Welcome row with email + sign-out
 *   2. Upcoming consultations (AccountBookings)
 *   3. Saved quiz match (AccountSavedQuiz)
 *   4. Continue your application — link to my1003app
 */

import Link from 'next/link';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { useTranslation } from '@/hooks/useTranslation';
import AccountBookings from './AccountBookings';
import AccountSavedQuiz from './AccountSavedQuiz';

interface AccountClientProps {
  userEmail: string;
  businessName: string;
  signOutAction: () => Promise<void>;
}

export default function AccountClient({
  userEmail,
  businessName,
  signOutAction,
}: AccountClientProps) {
  const { t } = useTranslation('account');

  return (
    <>
      {/* Header — dark gradient + static orb */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 60%)' }}
        />
        <div className="container-base px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <FadeUp delay={0.1}>
                <p className="text-eyebrow text-[var(--accent)]">{t('portal.eyebrow')}</p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h1 className="hero-shimmer font-display text-h1 mt-3">
                  {t('portal.welcomeBack')}
                </h1>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="font-mono text-body text-[var(--text-secondary)] mt-3">
                  {userEmail}
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.4}>
              <form action={signOutAction}>
                <Button type="submit" variant="secondary" size="sm">
                  {t('portal.signOut')}
                </Button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Body — light gradient */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-base px-6 space-y-12">
          {/* Section 1 — Upcoming consultations */}
          <FadeUp>
            <div>
              <p className="text-eyebrow text-[var(--accent-deep)]">
                {t('bookings.eyebrow')}
              </p>
              <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-2">
                {t('bookings.headline')}
              </h2>
            </div>
          </FadeUp>
          <AccountBookings userEmail={userEmail} />

          {/* Section 2 — Saved quiz match */}
          <FadeUp>
            <div>
              <p className="text-eyebrow text-[var(--accent-deep)]">
                {t('savedQuiz.eyebrow')}
              </p>
              <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-2">
                {t('savedQuiz.headline')}
              </h2>
            </div>
          </FadeUp>
          <AccountSavedQuiz />

          {/* Section 3 — Continue your application */}
          <FadeUp>
            <Card variant="light" hover={false}>
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <span className="text-5xl flex-shrink-0" aria-hidden="true">
                  📋
                </span>
                <div className="flex-1">
                  <p className="text-eyebrow text-[var(--accent-deep)]">
                    {t('application.eyebrow')}
                  </p>
                  <h3 className="font-display text-h3 text-[var(--text-on-light)] mt-2">
                    {t('application.headline')}
                  </h3>
                  <p className="text-body text-[var(--text-on-light-secondary)] mt-3">
                    {t('application.body')}
                  </p>
                  <p className="text-body-sm text-[var(--text-on-light-muted)] mt-3">
                    {t('application.helperPrefix')}
                    <Link
                      href="/quiz"
                      className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
                    >
                      {t('application.helperQuizLink')}
                    </Link>
                    {t('application.helperOr')}
                    <Link
                      href="/team"
                      className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
                    >
                      {t('application.helperTeamLink')}
                    </Link>
                    {t('application.helperSuffix')}
                  </p>
                  <div className="mt-6">
                    <Badge color="neutral">
                      {t('application.secureBadge')}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </FadeUp>

          {/* Bottom — back to public site */}
          <FadeUp>
            <div className="text-center pt-4">
              <Link
                href="/"
                className="text-body-sm text-[var(--text-on-light-muted)] hover:text-[var(--accent-deep)] underline"
              >
                {t('portal.backToSiteTemplate').replace('{businessName}', businessName)}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
