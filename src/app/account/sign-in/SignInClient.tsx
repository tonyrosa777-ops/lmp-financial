'use client';

/**
 * /account/sign-in — email entry form for the Borrower Portal.
 *
 * Phase 1J demo mode: the user types their email; we immediately sign them
 * in via Auth.js's Credentials provider (no password, no magic link, no
 * database). The session JWT carries their email; the portal at /account
 * fetches their bookings + saved quiz from there.
 *
 * Phase 2A swaps the Credentials provider in src/auth.ts for a Resend
 * magic-link provider plus a database adapter — at which point this form
 * will receive a "check your email" success state instead of redirecting
 * directly into /account. The component already handles both flows, so the
 * UI swap is a single conditional.
 *
 * Section rhythm matches the legal pages: dark gradient header + light
 * gradient body, text-heavy exception (motion off, gradient on).
 */

import { useState, useEffect, use } from 'react';
import type { FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

interface SignInClientProps {
  searchParamsPromise: Promise<{ verify?: string; demo?: string }>;
}

export default function SignInClient({ searchParamsPromise }: SignInClientProps) {
  const params = use(searchParamsPromise);
  const arrivedFromVerify = params.verify === '1';
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(arrivedFromVerify);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the user landed via the verifyRequest redirect, mount in the success
  // state regardless of whether they ever typed anything in this session.
  useEffect(() => {
    if (arrivedFromVerify) setSubmitted(true);
  }, [arrivedFromVerify]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await signIn('credentials', {
        email,
        redirect: false,
      });
      if (result?.error) {
        setError('Could not sign you in with that email. Try again.');
        return;
      }
      // Demo mode: Credentials provider issues a session JWT immediately on
      // valid email. Send the user straight to the portal. (Phase 2A: replace
      // this with the magic-link "check your email" screen.)
      router.push('/account');
      router.refresh();
    } catch {
      setError('Something went wrong signing you in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

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
        <div className="container-narrow px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">Borrower Portal</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3">
              Sign in to your account
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              No password needed. Enter the email you used to book a call or take the quiz, and you&apos;ll be signed in.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Body — light gradient (text-heavy: motion off, gradient on) */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <div className="max-w-md mx-auto">
            {submitted ? (
              <FadeUp>
                <div className="text-center">
                  <div className="text-5xl mb-4" aria-hidden="true">
                    📬
                  </div>
                  <h2 className="font-display text-h3 text-[var(--text-on-light)]">
                    Check your inbox
                  </h2>
                  <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
                    We sent a sign-in link to{' '}
                    <span className="font-semibold">{email || 'your email'}</span>. Click the link in the email to access your portal. The link expires in 24 hours.
                  </p>
                  <p className="text-body-sm text-[var(--text-on-light-muted)] mt-6">
                    Did not get it? Check spam, or{' '}
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
                    >
                      try a different email
                    </button>
                    .
                  </p>
                </div>
              </FadeUp>
            ) : (
              <FadeUp>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="light"
                  />
                  {error && (
                    <p
                      className="text-body-sm text-[var(--error)]"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                  <Button type="submit" loading={submitting} fullWidth>
                    {submitting ? 'Signing in...' : 'Sign in'}
                  </Button>
                  <div className="flex items-center justify-center pt-2">
                    <Badge color="neutral">
                      No password · Demo mode
                    </Badge>
                  </div>
                </form>
              </FadeUp>
            )}
          </div>

          {/* [DEMO COPY · COMPLIANCE-REVIEW-PENDING] — Mike's compliance IT firm
              should review this sign-in flow + email template before launch. */}
          <p className="mt-12 text-center text-micro text-[var(--text-on-light-muted)] italic">
            [COMPLIANCE-REVIEW-PENDING]
          </p>
        </div>
      </section>
    </>
  );
}
