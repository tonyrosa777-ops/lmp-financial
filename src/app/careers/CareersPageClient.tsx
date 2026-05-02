'use client';

// src/app/careers/CareersPageClient.tsx
//
// Audience 3 of Mike's three-headed monster — the LO-recruiting funnel.
// Brian Walsh is the named recruiter contact (per IBD §10 + market-intelligence.md §9).
//
// Owns chrome copy via useTranslation('careers'). Compliance posture:
//   - SMS opt-in disclaimer rendered VERBATIM ENGLISH from siteConfig in BOTH
//     locales — regulatory text never paraphrased. Surrounding form labels translate.
//   - Broker disclosure under form, also verbatim.
//   - 220-275 bps comp range flagged [COMPLIANCE-REVIEW-PENDING] inline.

import { siteConfig } from '@/data/site';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import SlideIn from '@/components/animations/SlideIn';

// Structural emojis stay in code — visual UI tokens, not translatable copy.
const ARCHETYPE_EMOJIS = ['🌎', '🗣️', '🏘️', '💼'];
const TESTIMONIALS_LENGTH = 3;

interface ArchetypeItem {
  title: string;
  body: string;
}

interface ToolItem {
  badge: string;
  title: string;
  body: string;
}

interface VsSoloItem {
  boldLabel: string;
  rest: string;
}

interface TestimonialItem {
  name: string;
  title: string;
  body: string;
}

const RECRUIT_STATES = siteConfig.business.licensedStates;

export default function CareersPageClient() {
  const { t, ta } = useTranslation('careers');
  const { compliance, business, loanOfficers } = siteConfig;

  // Brian Walsh — sourced by role from siteConfig (IBD §10).
  const brian = loanOfficers.find((lo) => lo.role.toLowerCase().includes('recruit'));
  if (!brian) {
    throw new Error(
      'Brian Walsh not found in siteConfig.loanOfficers — required for /careers page.'
    );
  }

  const brianInitials = brian.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const archetypes = ta<ArchetypeItem[]>('archetypes.items') ?? [];
  const tools = ta<ToolItem[]>('tools.items') ?? [];
  const vsSoloItems = ta<VsSoloItem[]>('comp.vsSolo.items') ?? [];
  const paragraphs = ta<string[]>('whyLmp.paragraphs') ?? [];
  const testimonials = ta<TestimonialItem[]>('loTestimonials.items') ?? [];

  // Hero meta line + states label — substitute structural numerics into templates.
  const heroMeta = t('page.metaTemplate')
    .replace('{nmls}', business.nmls)
    .replace('{stateCount}', String(business.licensedStates.length));
  const statesLabel = t('form.fields.statesLabelTemplate').replace(
    '{statesList}',
    RECRUIT_STATES.join(', ')
  );

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark, breathing-orb ambient)                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/careers.jpg" priority />
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
            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                href={`mailto:${brian.email}?subject=LMP%20LO%20intro%20call`}
                variant="primary"
                size="lg"
                external
              >
                {t('page.primaryCta')}
              </Button>
              <Button href="#why-lmp" variant="secondary" size="lg">
                {t('page.secondaryCta')}
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.5}>
            <p className="font-mono text-micro text-[var(--text-muted)] mt-8 max-w-xl">
              {heroMeta}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Why LMP — Mike's founder essay (light)             */}
      {/* ============================================================ */}
      <section
        id="why-lmp"
        className="section-light-gradient section-pad-base scroll-mt-32"
      >
        <div className="container-base px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">
              {t('whyLmp.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              {t('whyLmp.headline')}
            </h2>
          </FadeUp>
          <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-2">
            {t('whyLmp.demoFlag')}
          </p>

          <div className="mt-10 max-w-3xl flex flex-col gap-6">
            {paragraphs.map((para, idx) => (
              <FadeUp key={idx} delay={0.15 + idx * 0.1}>
                <p className="text-body text-[var(--text-on-light-secondary)]">
                  {para}
                </p>
              </FadeUp>
            ))}
            <FadeUp delay={0.45}>
              <p className="font-display text-h5 text-[var(--text-on-light)] italic">
                {t('whyLmp.signature')}
              </p>
              <p className="font-mono text-eyebrow text-[var(--text-on-light-secondary)] mt-1">
                {t('whyLmp.signatureTitle')}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Comp transparency (dark)                           */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.08), transparent 60%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">{t('comp.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              {t('comp.headline')}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
            {/* The number, big */}
            <FadeUp delay={0.15} className="lg:col-span-3">
              <Card variant="dark" hover={false} className="h-full">
                <p className="text-eyebrow text-[var(--accent)]">
                  {t('comp.rangeEyebrow')}
                </p>
                <p className="font-display text-display mt-3">
                  {t('comp.rangeValue')}{' '}
                  <span className="text-h2">{t('comp.rangeUnit')}</span>
                </p>
                <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl">
                  {t('comp.rangeBody')}
                </p>
                <p className="font-mono text-[10px] text-[var(--text-muted)] mt-4">
                  {t('comp.rangeFlag')}
                </p>
              </Card>
            </FadeUp>

            {/* What you get vs solo */}
            <FadeUp delay={0.25} className="lg:col-span-2">
              <Card variant="dark" hover={false} className="h-full">
                <p className="text-eyebrow text-[var(--accent)]">
                  {t('comp.vsSolo.eyebrow')}
                </p>
                <h3 className="font-display text-h4 mt-3">
                  {t('comp.vsSolo.headline')}
                </h3>
                <ul className="mt-6 flex flex-col gap-4 text-body-sm text-[var(--text-secondary)]">
                  {vsSoloItems.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span aria-hidden="true">✅</span>
                      <span>
                        <strong className="text-[var(--text-primary)]">
                          {item.boldLabel}
                        </strong>{' '}
                        {item.rest}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Who we're looking for (light)                      */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">
              {t('archetypes.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              {t('archetypes.headline')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-6 max-w-2xl">
              {t('archetypes.subheadline')}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {archetypes.map((arch, idx) => (
              <FadeUp key={arch.title} delay={0.1 + idx * 0.1}>
                <Card variant="light" className="h-full">
                  <div className="text-4xl" aria-hidden="true">
                    {ARCHETYPE_EMOJIS[idx] ?? '⭐'}
                  </div>
                  <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-4">
                    {arch.title}
                  </h3>
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-3">
                    {arch.body}
                  </p>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Tools you'll have (dark)                           */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 60%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">{t('tools.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              {t('tools.headline')}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {tools.map((tool, idx) => (
              <FadeUp key={tool.title} delay={0.1 + idx * 0.075}>
                <Card variant="dark" className="h-full">
                  <Badge color="gold">{tool.badge}</Badge>
                  <h3 className="font-display text-h4 mt-4">{tool.title}</h3>
                  <p className="text-body-sm text-[var(--text-secondary)] mt-3">
                    {tool.body}
                  </p>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — What it's like at LMP (light)                      */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">
              {t('loTestimonials.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              {t('loTestimonials.headline')}
            </h2>
          </FadeUp>
          <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-2">
            {t('loTestimonials.demoFlag')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {Array.from({ length: TESTIMONIALS_LENGTH }).map((_, idx) => {
              const tst = testimonials[idx];
              if (!tst) return null;
              return (
                <FadeUp key={idx} delay={0.1 + idx * 0.1}>
                  <Card variant="light" className="h-full">
                    <p className="text-body text-[var(--text-on-light)] italic">
                      &ldquo;{tst.body}&rdquo;
                    </p>
                    <div className="mt-6 pt-4 border-t border-[rgba(14,27,51,0.08)]">
                      <p className="font-display text-h5 text-[var(--text-on-light)]">
                        {tst.name}
                      </p>
                      <p className="font-mono text-eyebrow text-[var(--text-on-light-secondary)] mt-1">
                        {tst.title}
                      </p>
                    </div>
                  </Card>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — Talk to Brian form (dark, anchor #talk-to-brian)   */}
      {/* ============================================================ */}
      <section
        id="talk-to-brian"
        className="relative overflow-hidden section-dark-gradient section-pad-base scroll-mt-32"
      >
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.08), transparent 60%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">{t('form.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              {t('form.headline')}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
            {/* Form column */}
            <SlideIn direction="left" className="lg:col-span-3">
              <form
                action="/api/contact"
                method="POST"
                className="flex flex-col gap-6"
              >
                <input type="hidden" name="recruitInquiry" value="true" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="firstName"
                    label={t('form.fields.firstName')}
                    required
                    variant="dark"
                    placeholder={t('form.fields.firstNamePlaceholder')}
                  />
                  <Input
                    name="lastName"
                    label={t('form.fields.lastName')}
                    required
                    variant="dark"
                    placeholder={t('form.fields.lastNamePlaceholder')}
                  />
                </div>

                <Input
                  name="currentEmployer"
                  label={t('form.fields.currentEmployer')}
                  required
                  variant="dark"
                  placeholder={t('form.fields.currentEmployerPlaceholder')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="email"
                    type="email"
                    label={t('form.fields.email')}
                    required
                    variant="dark"
                    placeholder={t('form.fields.emailPlaceholder')}
                    helperText={t('form.fields.emailHelper')}
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label={t('form.fields.phone')}
                    required
                    variant="dark"
                    placeholder={t('form.fields.phonePlaceholder')}
                  />
                </div>

                <Input
                  name="states"
                  label={statesLabel}
                  variant="dark"
                  placeholder={t('form.fields.statesPlaceholder')}
                  helperText={t('form.fields.statesHelper')}
                />

                <Input
                  name="annualVolume"
                  label={t('form.fields.annualVolume')}
                  variant="dark"
                  placeholder={t('form.fields.annualVolumePlaceholder')}
                  helperText={t('form.fields.annualVolumeHelper')}
                />

                <Input
                  name="missing"
                  label={t('form.fields.missing')}
                  multiline
                  rows={4}
                  variant="dark"
                  placeholder={t('form.fields.missingPlaceholder')}
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
                  <span className="text-body-sm text-[var(--text-secondary)]">
                    {compliance.smsOptInDisclaimer}
                  </span>
                </label>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg">
                    {t('form.submit')}
                  </Button>
                </div>

                {/* [COMPLIANCE-VERBATIM] — broker disclosure, English both locales. */}
                <p className="font-mono text-micro text-[var(--text-muted)]">
                  {compliance.brokerDisclosure}
                </p>
              </form>
            </SlideIn>

            {/* Brian's bio card */}
            <SlideIn direction="right" delay={0.15} className="lg:col-span-2">
              <Card variant="dark" hover={false} className="h-full">
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent)] text-[var(--primary-deep)] font-display text-h4 font-bold"
                    aria-hidden="true"
                  >
                    {brianInitials}
                  </div>
                  <div>
                    <p className="font-display text-h4">{brian.name}</p>
                    <p className="font-mono text-eyebrow text-[var(--accent)] mt-1">
                      {brian.role}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[var(--border-dark)]">
                  <p className="text-body-sm text-[var(--text-secondary)]">
                    {brian.bio}
                  </p>
                </div>

                <dl className="mt-6 pt-6 border-t border-[var(--border-dark)] flex flex-col gap-4 text-body-sm">
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-muted)]">
                      {t('brianCard.labels.email')}
                    </dt>
                    <dd className="text-[var(--text-primary)] mt-1">
                      <a
                        href={`mailto:${brian.email}?subject=LMP%20LO%20intro%20call`}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {brian.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-muted)]">
                      {t('brianCard.labels.nmls')}
                    </dt>
                    <dd className="text-[var(--text-primary)] mt-1">
                      {brian.nmls}{' '}
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">
                        {t('brianCard.labels.nmlsNote')}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-muted)]">
                      {t('brianCard.labels.office')}
                    </dt>
                    <dd className="text-[var(--text-primary)] mt-1">
                      {business.address.street}, Ste {business.address.suite}
                      <br />
                      {business.address.city}, {business.address.state}{' '}
                      {business.address.zip}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 pt-6 border-t border-[var(--border-dark)]">
                  <Button
                    href={`mailto:${brian.email}?subject=LMP%20LO%20intro%20call`}
                    variant="primary"
                    size="md"
                    fullWidth
                    external
                  >
                    {t('brianCard.directButton')}
                  </Button>
                </div>
              </Card>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8 — Final CTA (light — alternation rule overrides spec) */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-loose">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h1 text-[var(--text-on-light)] max-w-3xl mx-auto">
              {t('finalCta.headline')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-body text-[var(--text-on-light-secondary)] max-w-xl mx-auto mt-6">
              {t('finalCta.body')}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button
                href={`mailto:${brian.email}?subject=LMP%20LO%20intro%20call`}
                variant="primary"
                size="lg"
                external
              >
                {t('finalCta.primary')}
              </Button>
              <Button href="#why-lmp" variant="secondary" size="lg">
                {t('finalCta.secondary')}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
