import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { siteConfig } from '@/data/site';
import AccountBookings from './AccountBookings';
import AccountSavedQuiz from './AccountSavedQuiz';

export const metadata: Metadata = {
  title: 'Your Borrower Portal',
  description:
    'Your LMP Financial Borrower Portal: upcoming consultations, your saved quiz match, and your application progress.',
  robots: { index: false, follow: false },
};

/**
 * /account — Borrower Portal home.
 *
 * Phase 1J. Server Component reads the session from Auth.js. If somehow
 * unauthed (middleware should have caught it), redirect to sign-in. Otherwise,
 * render four sections:
 *   1. Welcome row with email + sign-out
 *   2. Upcoming consultations (Calendly via /api/account/bookings — demo seeded)
 *   3. Your match — saved quiz result (localStorage, hydrated client-side)
 *   4. Continue your application — deep-link to the recommended LO's my1003app
 *      via the central buildMy1003AppUrl() helper, with utm_medium=borrower_portal
 *
 * No database. Quiz and bookings come from client (localStorage) + Calendly API
 * respectively. Application status is the deep-link only — until ARIVE/my1003app
 * confirms a status feed (Mike-question, Phase 3).
 */
export default async function AccountPage() {
  const session = await auth();

  // Defense in depth: middleware should have redirected, but if a session was
  // somehow stripped between middleware and render, send them to sign-in.
  if (!session?.user?.email) {
    redirect('/account/sign-in');
  }

  const userEmail = session.user.email;

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
                <p className="text-eyebrow text-[var(--accent)]">Borrower Portal</p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h1 className="hero-shimmer font-display text-h1 mt-3">
                  Welcome back
                </h1>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="font-mono text-body text-[var(--text-secondary)] mt-3">
                  {userEmail}
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.4}>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <Button type="submit" variant="secondary" size="sm">
                  Sign out
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
                Upcoming consultations
              </p>
              <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-2">
                Your scheduled calls
              </h2>
            </div>
          </FadeUp>
          <AccountBookings userEmail={userEmail} />

          {/* Section 2 — Saved quiz match */}
          <FadeUp>
            <div>
              <p className="text-eyebrow text-[var(--accent-deep)]">
                Your match
              </p>
              <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-2">
                Recommended for you
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
                    Application
                  </p>
                  <h3 className="font-display text-h3 text-[var(--text-on-light)] mt-2">
                    Continue your application
                  </h3>
                  <p className="text-body text-[var(--text-on-light-secondary)] mt-3">
                    Pick up where you left off in our secure application portal. You will move into a hosted form built for mortgage applications: SSN, employment, and address history. We hand you off there with your contact info already known to us.
                  </p>
                  <p className="text-body-sm text-[var(--text-on-light-muted)] mt-3">
                    Not sure which loan officer to start with?{' '}
                    <Link
                      href="/quiz"
                      className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
                    >
                      Take the 5-question quiz
                    </Link>{' '}
                    or{' '}
                    <Link
                      href="/team"
                      className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
                    >
                      browse our loan officers
                    </Link>
                    .
                  </p>
                  <div className="mt-6">
                    <Badge color="neutral">
                      Hosted with our application partner · Secure
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
                ← Back to {siteConfig.business.name}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
