'use client';

// src/app/team/[lo-slug]/LoanOfficerClient.tsx
//
// Client wrapper for the per-LO landing page (regulatory-critical). Owns all
// translatable copy via useTranslation('team'). The server page
// (team/[lo-slug]/page.tsx) keeps generateStaticParams + generateMetadata +
// JSON-LD Person schema, then renders this client component.
//
// CLAUDE.md Compliance Rule (non-negotiable):
//   - Every LO landing page MUST display the LO's NMLS number near their
//     name in BOTH locales — `t('loPage.labels.nmlsPrefix')` (defaults to
//     "NMLS #" in en, "NMLS #" in es since NMLS is a regulatory acronym).
//   - State licensure is rendered from the LO's own `stateLicensure` array.
//     We never imply an LO is licensed in a state they aren't, regardless of
//     locale. Unconfirmed licensure surfaces a [CONFIRM-WITH-CLIENT] banner.
//   - LO `name` (proper noun) stays English in both locales — siteConfig source.
//   - my1003app.com URL (regulated application of record) is unchanged.
//   - SMS opt-in disclaimer stays verbatim from
//     `siteConfig.compliance.smsOptInDisclaimer` (regulatory verbatim copy
//     per CLAUDE.md Compliance Rule).

import { siteConfig } from '@/data/site';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import FadeUp from '@/components/animations/FadeUp';
import BookingCalendar from '@/components/BookingCalendar';
import { buildMy1003AppUrl } from '@/lib/my1003app';

interface LoanOfficerClientProps {
  slug: string;
}

export default function LoanOfficerClient({ slug }: LoanOfficerClientProps) {
  const { t } = useTranslation('team');
  const lo = siteConfig.loanOfficers.find((l) => l.slug === slug);
  if (!lo) return null;

  const firstName = lo.name.split(' ')[0];
  const loTitle = t(`officers.${lo.slug}.title`);
  const loBio = t(`officers.${lo.slug}.bio`);

  // Localized language names (en: English/Spanish/Portuguese, es: Inglés/Español/Portugués)
  const langNames = lo.languages
    .map((l) => t(`loPage.labels.languageNames.${l}`))
    .filter((s) => s && !s.startsWith('loPage.'))
    .join(', ');

  const langFlags = lo.languages
    .map((l) =>
      l === 'en' ? '🇺🇸' : l === 'es' ? '🇪🇸' : l === 'pt' ? '🇧🇷' : ''
    )
    .filter(Boolean)
    .join(' ');

  // State licensure rendering — per-LO compliance:
  //   - Render only the states this LO is actually licensed in.
  //   - If unconfirmed, render the localized [CONFIRM-WITH-CLIENT] banner.
  //   - State codes (MA, NH, etc.) are regulatory abbreviations, identical
  //     in both locales.
  const stateLicensureUnconfirmed =
    lo.stateLicensure.length === 1 &&
    lo.stateLicensure[0].includes('CONFIRM');

  const licensedInBadgeText = stateLicensureUnconfirmed
    ? t('loPage.labels.statesPending')
    : `${t('loPage.labels.licensedIn')} ${lo.stateLicensure.join(', ')}`;

  const trustStripLicensure = stateLicensureUnconfirmed
    ? t('loPage.labels.statesPendingShort')
    : `${t('loPage.labels.licensedIn')} ${lo.stateLicensure.join(', ')}`;

  // Helper for {firstName} / {name} interpolation in label JSON.
  const interp = (s: string) =>
    s
      .replace(/\{firstName\}/g, firstName)
      .replace(/\{name\}/g, lo.name);

  return (
    <>
      {/* Page header — LO photo placeholder + name + NMLS + states + languages */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-16">
        <div className="container-wide px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Photo placeholder */}
            <FadeUp delay={0.1}>
              <div className="aspect-[4/5] rounded-[var(--radius-xl)] bg-[var(--bg-card-dark)] border border-[var(--border-dark-strong)] flex items-center justify-center max-w-sm">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-[var(--accent-muted)] flex items-center justify-center font-display text-h2 text-[var(--primary-deep)] font-bold">
                    {lo.name
                      .split(' ')
                      .map((p) => p.charAt(0))
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <p className="text-eyebrow text-[var(--text-muted)] mt-4 px-4">
                    {interp(t('loPage.labels.portraitPending'))}
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Identity block */}
            <div className="lg:col-span-2">
              <FadeUp delay={0.2}>
                <p className="text-eyebrow text-[var(--accent)]">{loTitle}</p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <h1 className="hero-shimmer font-display text-h1 mt-3">
                  {lo.name}
                </h1>
              </FadeUp>
              {/* NMLS — REGULATORY: rendered in both locales near LO name. */}
              <FadeUp delay={0.4}>
                <p className="text-body font-mono text-[var(--accent)] mt-3">
                  {t('loPage.labels.nmlsPrefix')}
                  {lo.nmls}
                </p>
              </FadeUp>
              <FadeUp delay={0.5}>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Badge color="gold">{licensedInBadgeText}</Badge>
                  <Badge color="neutral">
                    {langFlags} {langNames}
                  </Badge>
                </div>
              </FadeUp>
              <FadeUp delay={0.6}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href={`mailto:${lo.email}`}>
                    {interp(t('loPage.labels.emailCta'))}
                  </Button>
                  <Button
                    href={buildMy1003AppUrl({
                      baseUrl: lo.my1003appUrl,
                      loSlug: lo.slug,
                      medium: 'lo_page',
                    })}
                    variant="secondary"
                    external
                  >
                    {t('loPage.labels.preApprovalCta')}
                  </Button>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Bio — light section */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <FadeUp>
            <h2 className="font-display text-h2 text-[var(--text-on-light)]">
              {t('loPage.labels.aboutSection')} {firstName}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-6 whitespace-pre-line">
              {loBio}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-micro text-[var(--text-on-light-muted)] italic mt-6">
              {t('loPage.labels.demoCopyNote')}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Booking calendar — dark section */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">
              {t('loPage.labels.scheduleEyebrow')} {firstName}
            </p>
            <h2 className="font-display text-h2 mt-3 max-w-2xl">
              {t('loPage.labels.scheduleHeadline')}
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl">
              {interp(t('loPage.labels.scheduleSubheadline'))}
            </p>
          </FadeUp>
          <div className="mt-12">
            <BookingCalendar loSlug={lo.slug} />
          </div>
        </div>
      </section>

      {/* Contact form — light section */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <FadeUp>
            <h2 className="font-display text-h2 text-[var(--text-on-light)]">
              {t('loPage.labels.messageHeadline')}
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
              {interp(t('loPage.labels.messageSubheadline'))}
            </p>
          </FadeUp>
          <form
            action="/api/contact"
            method="POST"
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input type="hidden" name="loSlug" value={lo.slug} />
            <Input
              name="firstName"
              label={t('loPage.labels.form.firstName')}
              required
              variant="light"
            />
            <Input
              name="lastName"
              label={t('loPage.labels.form.lastName')}
              required
              variant="light"
            />
            <div className="md:col-span-2">
              <Input
                name="email"
                label={t('loPage.labels.form.email')}
                type="email"
                required
                variant="light"
              />
            </div>
            <div className="md:col-span-2">
              <Input
                name="phone"
                label={t('loPage.labels.form.phone')}
                type="tel"
                variant="light"
              />
            </div>
            <div className="md:col-span-2">
              <Input
                name="message"
                label={t('loPage.labels.form.situation')}
                multiline
                rows={5}
                required
                variant="light"
                placeholder={t('loPage.labels.form.situationPlaceholder')}
              />
            </div>
            {/* SMS opt-in disclaimer: REGULATORY VERBATIM per CLAUDE.md
                Compliance Rule. Sourced from siteConfig.compliance — never
                rewritten or paraphrased, regardless of locale. */}
            <div className="md:col-span-2">
              <label className="flex items-start gap-3 text-body-sm text-[var(--text-on-light-secondary)]">
                <input type="checkbox" name="smsOptIn" className="mt-1" />
                <span>{siteConfig.compliance.smsOptInDisclaimer}</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" size="lg">
                {interp(t('loPage.labels.sendCta'))}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Trust strip — dark, bottom. Regulatory: NMLS in both locales. */}
      <section className="section-dark-gradient section-pad-tight">
        <div className="container-base px-6">
          <p className="text-center text-micro font-mono text-[var(--text-muted)]">
            {lo.name} · {t('loPage.labels.nmlsPrefix')}
            {lo.nmls} · {trustStripLicensure}
            {' · '}
            {langNames}
          </p>
        </div>
      </section>
    </>
  );
}
