'use client';

// src/app/contact/ContactPageClient.tsx
//
// Client wrapper for /contact. Owns chrome copy via useTranslation('contact').
// Compliance posture (per CLAUDE.md Compliance Rule):
//   - SMS opt-in disclaimer rendered VERBATIM ENGLISH from siteConfig in BOTH
//     locales — regulatory text never paraphrased. Surrounding form labels translate.
//   - Broker disclosure printed under form, also verbatim from siteConfig.

import { siteConfig } from '@/data/site';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import SlideIn from '@/components/animations/SlideIn';

export default function ContactPageClient() {
  const { business, social, compliance } = siteConfig;
  const { t } = useTranslation('contact');

  // Hero meta line — substitute structural numerics into the translated template.
  const heroMeta = t('page.metaTemplate')
    .replace('{nmls}', business.nmls)
    .replace('{stateCount}', String(business.licensedStates.length))
    .replace('{loCount}', String(siteConfig.loanOfficers.length - 1));

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark, breathing-orb ambient)                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/contact.jpg" priority />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 60%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">{t('page.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {t('page.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('page.subheadline')}
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="font-mono text-micro text-[var(--text-muted)] mt-8 max-w-xl">
              {heroMeta}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Form + Contact Info (light, 2-col)                 */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form column (left) */}
            <SlideIn direction="left" className="lg:col-span-3">
              <FadeUp>
                <p className="text-eyebrow text-[var(--accent-deep)]">
                  {t('form.eyebrow')}
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3">
                  {t('form.headline')}
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-4 max-w-xl">
                  {t('form.subheadline')}
                </p>
              </FadeUp>

              <form
                action="/api/contact"
                method="POST"
                className="flex flex-col gap-6 mt-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="firstName"
                    label={t('form.fields.firstName')}
                    required
                    variant="light"
                    placeholder={t('form.fields.firstNamePlaceholder')}
                  />
                  <Input
                    name="lastName"
                    label={t('form.fields.lastName')}
                    required
                    variant="light"
                    placeholder={t('form.fields.lastNamePlaceholder')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="email"
                    type="email"
                    label={t('form.fields.email')}
                    required
                    variant="light"
                    placeholder={t('form.fields.emailPlaceholder')}
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label={t('form.fields.phone')}
                    required
                    variant="light"
                    placeholder={t('form.fields.phonePlaceholder')}
                  />
                </div>

                <Input
                  name="message"
                  label={t('form.fields.message')}
                  required
                  multiline
                  rows={5}
                  variant="light"
                  placeholder={t('form.fields.messagePlaceholder')}
                />

                {/* SMS opt-in — verbatim disclaimer per CLAUDE.md Compliance Rule. */}
                {/* [COMPLIANCE-VERBATIM] — English in BOTH locales, regulatory text. */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="smsOptIn"
                    value="true"
                    className="mt-1 h-4 w-4 accent-[var(--accent)] flex-shrink-0"
                  />
                  <span className="text-body-sm text-[var(--text-on-light-secondary)]">
                    {compliance.smsOptInDisclaimer}
                  </span>
                </label>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg">
                    {t('form.submit')}
                  </Button>
                </div>

                {/* [COMPLIANCE-VERBATIM] — broker disclosure, English both locales. */}
                <p className="font-mono text-micro text-[var(--text-on-light-muted)]">
                  {compliance.brokerDisclosure}
                </p>
              </form>
            </SlideIn>

            {/* Contact info column (right) */}
            <SlideIn direction="right" delay={0.15} className="lg:col-span-2">
              <Card variant="light" hover={false} className="h-full">
                <p className="text-eyebrow text-[var(--accent-deep)]">
                  {t('info.eyebrow')}
                </p>
                <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-3">
                  {t('info.headline')}
                </h3>

                <dl className="mt-8 flex flex-col gap-6 text-body-sm">
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('info.labels.office')}
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-2">
                      {business.address.street}, Ste {business.address.suite}
                      <br />
                      {business.address.city}, {business.address.state}{' '}
                      {business.address.zip}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('info.labels.phone')}
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-2">
                      <a
                        href="tel:+19784535626"
                        className="hover:text-[var(--accent-deep)] transition-colors"
                      >
                        {business.phone}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('info.labels.generalEmail')}
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-2">
                      <a
                        href={`mailto:${business.emailMain}`}
                        className="hover:text-[var(--accent-deep)] transition-colors break-all"
                      >
                        {business.emailMain}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('info.labels.founder')}
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-2">
                      <a
                        href={`mailto:${business.emailFounder}`}
                        className="hover:text-[var(--accent-deep)] transition-colors break-all"
                      >
                        {business.emailFounder}
                      </a>
                    </dd>
                  </div>

                  {social.linkedinPersonal && (
                    <div>
                      <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                        {t('info.labels.linkedin')}
                      </dt>
                      <dd className="text-[var(--text-on-light)] mt-2">
                        <a
                          href={social.linkedinPersonal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--accent-deep)] transition-colors"
                        >
                          {t('info.labels.linkedinLabel')}
                        </a>
                      </dd>
                    </div>
                  )}

                  {/* [DEMO COPY — pending client review — generic office hours] */}
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('info.labels.officeHours')}
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-2">
                      {t('info.officeHoursLine1')}
                      <br />
                      {t('info.officeHoursLine2')}
                    </dd>
                    <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-2">
                      {t('info.officeHoursDemoFlag')}
                    </p>
                  </div>
                </dl>

                <div className="mt-8 pt-6 border-t border-[rgba(14,27,51,0.08)]">
                  <Badge color="gold">NMLS #{business.nmls}</Badge>
                </div>
              </Card>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Trust strip (dark, bottom)                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.08), transparent 65%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)] text-center">
              {t('trust.eyebrow')}
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <FadeUp delay={0.1}>
              <Card variant="dark" hover={false} className="h-full text-center">
                <p className="font-display text-h3 text-[var(--accent)]">
                  #{business.nmls}
                </p>
                <p className="font-mono text-eyebrow text-[var(--text-secondary)] mt-2">
                  {t('trust.stats.companyNmls')}
                </p>
              </Card>
            </FadeUp>
            <FadeUp delay={0.15}>
              <Card variant="dark" hover={false} className="h-full text-center">
                <p className="font-display text-h3 text-[var(--accent)]">
                  {business.licensedStates.length}
                </p>
                <p className="font-mono text-eyebrow text-[var(--text-secondary)] mt-2">
                  {t('trust.stats.statesLicensed')}
                </p>
              </Card>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Card variant="dark" hover={false} className="h-full text-center">
                <p className="font-display text-h3 text-[var(--accent)]">
                  {siteConfig.loanOfficers.length - 1}
                </p>
                <p className="font-mono text-eyebrow text-[var(--text-secondary)] mt-2">
                  {t('trust.stats.loanOfficers')}
                </p>
              </Card>
            </FadeUp>
            <FadeUp delay={0.25}>
              <Card variant="dark" hover={false} className="h-full text-center">
                <p className="font-display text-h3 text-[var(--accent)]">
                  {t('trust.stats.lowellLabel')}
                </p>
                <p className="font-mono text-eyebrow text-[var(--text-secondary)] mt-2">
                  {t('trust.stats.lowellSub')}
                </p>
              </Card>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
