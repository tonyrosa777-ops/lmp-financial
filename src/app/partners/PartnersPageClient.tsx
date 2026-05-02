'use client';

// src/app/partners/PartnersPageClient.tsx
//
// Audience 2 of Mike's three-headed monster — the realtor-referral funnel.
// Owns chrome copy via useTranslation('partners'). Structural data (state list,
// NMLS, address) still pulls from siteConfig. Compliance posture:
//   - SMS opt-in disclaimer rendered VERBATIM ENGLISH from siteConfig in BOTH
//     locales — regulatory text never paraphrased. Surrounding form labels translate.
//   - Broker disclosure under form, also verbatim.
//   - ZERO rate displays (Reg Z exposure).

import { siteConfig } from '@/data/site';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import SlideIn from '@/components/animations/SlideIn';

// Structural emojis stay in code — they are visual UI tokens, not copy.
// Titles + bodies come from JSON dictionaries indexed by position.
const VALUE_PROP_EMOJIS = ['⚡', '🤝', '📋', '🎨', '🌎'];
const HOW_IT_WORKS_LENGTH = 3;
const TESTIMONIALS_LENGTH = 3;
const CO_MARKETING_EMOJIS = ['🏡', '✉️', '📱'];

interface ValuePropItem {
  title: string;
  body: string;
  flag?: string;
}

interface HowItWorksStepItem {
  title: string;
  body: string;
}

interface TestimonialItem {
  name: string;
  title: string;
  body: string;
}

interface CoMarketingItem {
  title: string;
  body: string;
}

const PARTNER_STATES = siteConfig.business.licensedStates;

export default function PartnersPageClient() {
  const { t, ta } = useTranslation('partners');
  const { compliance, business } = siteConfig;

  // Demo flag from JSON; the value-prop list also flags an item internally.
  // [SOURCING-REQUIRED] is preserved as a structural flag on the first item.
  const valueProps = ta<ValuePropItem[]>('valueProps.items') ?? [];
  // First item ("14-day average close") historically carried a sourcing flag.
  // Preserve that flag inline since flags are compliance-flagging metadata.
  const valuePropsWithFlags: ValuePropItem[] = valueProps.map((vp, idx) =>
    idx === 0 ? { ...vp, flag: '[SOURCING-REQUIRED]' } : vp
  );

  const steps = ta<HowItWorksStepItem[]>('howItWorks.steps') ?? [];
  const testimonials = ta<TestimonialItem[]>('testimonials.items') ?? [];
  const coMarketing = ta<CoMarketingItem[]>('coMarketing.items') ?? [];

  // Hero subheadline + final-CTA body templates substitute {stateCount}/{loCount}.
  const heroSub = t('page.subheadlineTemplate').replace(
    '{stateCount}',
    String(business.licensedStates.length)
  );
  const heroMeta = t('page.metaTemplate')
    .replace('{nmls}', business.nmls)
    .replace('{stateCount}', String(business.licensedStates.length));
  const finalCtaBody = t('finalCta.bodyTemplate')
    .replace('{stateCount}', String(business.licensedStates.length))
    .replace('{loCount}', String(siteConfig.loanOfficers.length - 1));
  const statesLabel = t('form.fields.statesLabelTemplate').replace(
    '{statesList}',
    PARTNER_STATES.join(', ')
  );

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark, breathing-orb ambient)                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/partners.jpg" priority />
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
              {heroSub}
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button href="#partner-signup" variant="primary" size="lg">
                {t('page.primaryCta')}
              </Button>
              <Button href="#how-it-works" variant="secondary" size="lg">
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
      {/* SECTION 2 — Why partner with LMP (light)                       */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">
              {t('valueProps.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              {t('valueProps.headline')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-6 max-w-2xl">
              {t('valueProps.subheadline')}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {valuePropsWithFlags.map((vp, idx) => (
              <FadeUp key={vp.title} delay={0.1 + idx * 0.075}>
                <Card variant="light" className="h-full">
                  <div className="text-4xl" aria-hidden="true">
                    {VALUE_PROP_EMOJIS[idx] ?? '⭐'}
                  </div>
                  <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-4">
                    {vp.title}
                  </h3>
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-3">
                    {vp.body}
                  </p>
                  {vp.flag && (
                    <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-3">
                      {vp.flag}
                    </p>
                  )}
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — How it works (dark)                                */}
      {/* ============================================================ */}
      <section
        id="how-it-works"
        className="relative overflow-hidden section-dark-gradient section-pad-base scroll-mt-32"
      >
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 65%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">
              {t('howItWorks.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              {t('howItWorks.headline')}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {Array.from({ length: HOW_IT_WORKS_LENGTH }).map((_, idx) => {
              const step = steps[idx];
              if (!step) return null;
              return (
                <FadeUp key={idx} delay={0.2 + idx * 0.15}>
                  <Card variant="dark" hover={false} className="h-full">
                    <div className="font-mono text-eyebrow text-[var(--accent)]">
                      {t('howItWorks.stepLabel')} {idx + 1}
                    </div>
                    <h3 className="font-display text-h4 mt-3">{step.title}</h3>
                    <p className="text-body-sm text-[var(--text-secondary)] mt-3">
                      {step.body}
                    </p>
                  </Card>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — What partners say (light)                          */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">
              {t('testimonials.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              {t('testimonials.headline')}
            </h2>
          </FadeUp>
          <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-2">
            {t('testimonials.demoFlag')}
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
      {/* SECTION 5 — Co-marketing kits (dark)                           */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.08), transparent 60%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">
              {t('coMarketing.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              {t('coMarketing.headline')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('coMarketing.subheadline')}
            </p>
          </FadeUp>
          <p className="font-mono text-[10px] text-[var(--text-muted)] mt-3">
            {t('coMarketing.assetFlag')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {coMarketing.map((asset, idx) => (
              <FadeUp key={asset.title} delay={0.2 + idx * 0.1}>
                <Card variant="dark" className="h-full">
                  <div className="text-4xl" aria-hidden="true">
                    {CO_MARKETING_EMOJIS[idx] ?? '✨'}
                  </div>
                  <h3 className="font-display text-h4 mt-4">{asset.title}</h3>
                  <p className="text-body-sm text-[var(--text-secondary)] mt-3">
                    {asset.body}
                  </p>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — Contact form (light, anchor #partner-signup)       */}
      {/* ============================================================ */}
      <section
        id="partner-signup"
        className="section-light-gradient section-pad-base scroll-mt-32"
      >
        <div className="container-wide px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">
              {t('form.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
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
                <input type="hidden" name="partnerInquiry" value="true" />

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

                <Input
                  name="brokerage"
                  label={t('form.fields.brokerage')}
                  required
                  variant="light"
                  placeholder={t('form.fields.brokeragePlaceholder')}
                />

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
                  name="states"
                  label={statesLabel}
                  variant="light"
                  placeholder={t('form.fields.statesPlaceholder')}
                  helperText={t('form.fields.statesHelper')}
                />

                <Input
                  name="message"
                  label={t('form.fields.message')}
                  multiline
                  rows={4}
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

            {/* Contact info column */}
            <SlideIn direction="right" delay={0.15} className="lg:col-span-2">
              <Card variant="light" hover={false} className="h-full">
                <p className="text-eyebrow text-[var(--accent-deep)]">
                  {t('directContact.eyebrow')}
                </p>
                <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-3">
                  {t('directContact.headline')}
                </h3>
                <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-4">
                  {t('directContact.body')}
                </p>

                <dl className="mt-6 flex flex-col gap-4 text-body-sm">
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('directContact.labels.email')}
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-1">
                      <a
                        href={`mailto:${business.emailFounder}`}
                        className="hover:text-[var(--accent-deep)] transition-colors"
                      >
                        {business.emailFounder}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('directContact.labels.phone')}
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-1">
                      {business.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('directContact.labels.office')}
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-1">
                      {business.address.street}, Ste {business.address.suite}
                      <br />
                      {business.address.city}, {business.address.state}{' '}
                      {business.address.zip}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('directContact.labels.licensed')}
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-1">
                      {business.licensedStatesLong.join(', ')}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 pt-6 border-t border-[rgba(14,27,51,0.08)]">
                  <Badge color="gold">NMLS #{business.nmls}</Badge>
                </div>
              </Card>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — Final CTA (dark)                                   */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-loose">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.08), transparent 60%)',
          }}
        />

        <div className="container-base px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="hero-shimmer font-display text-h1 max-w-3xl mx-auto">
              {t('finalCta.headline')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-body text-[var(--text-secondary)] max-w-xl mx-auto mt-6">
              {finalCtaBody}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8">
              <Button href="#partner-signup" variant="primary" size="lg">
                {t('finalCta.primary')}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
