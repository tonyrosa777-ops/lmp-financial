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
import { useTranslation } from '@/hooks/useTranslation';

interface SignInClientProps {
  searchParamsPromise: Promise<{ verify?: string; demo?: string }>;
}

export default function SignInClient({ searchParamsPromise }: SignInClientProps) {
  const { t } = useTranslation('account');
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
        setError(t('signIn.form.errorGeneric'));
        return;
      }
      // Demo mode: Credentials provider issues a session JWT immediately on
      // valid email. Send the user straight to the portal. (Phase 2A: replace
      // this with the magic-link "check your email" screen.)
      router.push('/account');
      router.refresh();
    } catch {
      setError(t('signIn.form.errorUnexpected'));
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
            <p className="text-eyebrow text-[var(--accent)]">{t('signIn.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3">
              {t('signIn.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('signIn.subheadline')}
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
                    {t('signIn.checkInbox.headline')}
                  </h2>
                  <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
                    {t('signIn.checkInbox.bodyTemplate').replace(
                      '{email}',
                      email || t('signIn.checkInbox.fallbackEmail'),
                    )}
                  </p>
                  <p className="text-body-sm text-[var(--text-on-light-muted)] mt-6">
                    {t('signIn.checkInbox.missingPrefix')}
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
                    >
                      {t('signIn.checkInbox.tryDifferent')}
                    </button>
                    {t('signIn.checkInbox.missingSuffix')}
                  </p>
                </div>
              </FadeUp>
            ) : (
              <FadeUp>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    name="email"
                    label={t('signIn.form.emailLabel')}
                    type="email"
                    required
                    placeholder={t('signIn.form.emailPlaceholder')}
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
                    {submitting ? t('signIn.form.submitting') : t('signIn.form.submit')}
                  </Button>
                  <div className="flex items-center justify-center pt-2">
                    <Badge color="neutral">
                      {t('signIn.form.modeBadge')}
                    </Badge>
                  </div>
                </form>
              </FadeUp>
            )}
          </div>

          {/* [DEMO COPY · COMPLIANCE-REVIEW-PENDING] — Mike's compliance IT firm
              should review this sign-in flow + email template before launch. */}
          <p className="mt-12 text-center text-micro text-[var(--text-on-light-muted)] italic">
            {t('signIn.complianceFlag')}
          </p>
        </div>
      </section>
    </>
  );
}
