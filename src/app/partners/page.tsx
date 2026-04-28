import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import SlideIn from '@/components/animations/SlideIn';

// /partners — Realtor Referral Funnel
//
// Audience 2 of Mike's three-headed monster (per CLAUDE.md operating principle 2 +
// initial-business-data.md Section 9A). First-class conversion page, NOT footer-buried.
//
// Section rhythm — strict dark/light alternation per CLAUDE.md Homepage Section
// Architecture Rule. Each section serves a distinct PURPOSE.
//
// 1. Hero                  → dark  → conversion (primary CTA + how-it-works secondary)
// 2. Why partner with LMP  → light → empathy + value props (5 cards)
// 3. How it works          → dark  → education (3-step flow)
// 4. What partners say     → light → social proof (3 realtor testimonials)
// 5. Co-marketing kits     → dark  → asset preview (RESPA-compliant flyers etc)
// 6. Contact form          → light → conversion (partner signup)
// 7. Final CTA             → dark  → conversion (final nudge)
//
// Compliance posture (per CLAUDE.md Compliance Rule + LMP-specific build rules):
//   - ZERO rate displays (Reg Z exposure)
//   - SMS opt-in disclaimer verbatim from siteConfig.compliance.smsOptInDisclaimer
//   - Demo copy + invented stats flagged inline in JSX

export const metadata: Metadata = {
  title: 'Realtor Partners',
  description:
    'Send your buyers to a mortgage broker who closes on time, communicates weekly, and shows up at the closing table. RESPA-compliant co-marketing kits at no cost. 14-day average close.',
};

interface PartnerValueProp {
  emoji: string;
  title: string;
  body: string;
  flag?: string;
}

const PARTNER_VALUE_PROPS: PartnerValueProp[] = [
  {
    emoji: '⚡',
    title: '14-day average close',
    body: 'Our team works conditions same-day. Your closing date holds, your buyer stays calm, you keep your reputation.',
    flag: '[SOURCING-REQUIRED]',
  },
  {
    emoji: '🤝',
    title: 'In-person at every closing',
    body: 'Mike or your assigned LO comes to the closing table when geography allows. The deal is too important for a phone call.',
  },
  {
    emoji: '📋',
    title: 'Pre-approval in hours',
    body: 'Same-day pre-approval letters for clean files. Your buyer makes a credible offer the moment they walk out of the open house.',
  },
  {
    emoji: '🎨',
    title: 'Co-branded marketing kits at no cost',
    body: 'RESPA-compliant joint flyers, open-house collateral, email blast templates. We split the marketing lift, not the disclosure.',
  },
  {
    emoji: '🌎',
    title: '9 states, 22 loan officers',
    body: 'Cross-state buyer? We are licensed in MA, NH, ME, RI, CT, FL, CO, VT, and TX. One partnership covers your relocation pipeline.',
  },
];

interface RealtorTestimonial {
  name: string;
  title: string;
  body: string;
}

// [DEMO COPY — pending client review]
// Voice: real realtor on the phone. No em dashes. Specific timeline + dollar references.
const REALTOR_TESTIMONIALS: RealtorTestimonial[] = [
  {
    name: 'Tina C.',
    title: 'Realtor, Lowell MA',
    body: 'I send everyone I can to LMP now. Last month I had a first-time buyer with a tricky 1099 file. Aisha had the pre-approval back the same afternoon, and Mike showed up to the closing with a card for the buyer. That is the level I expect from a partner.',
  },
  {
    name: 'Mark D.',
    title: 'Realtor, Salem NH',
    body: 'Most lenders ghost you between the loan estimate and the closing disclosure. LMP sends a Friday update, every week, on every active file. I have not had a deal die at LMP in two years. That number alone is why I refer.',
  },
  {
    name: 'Hector M.',
    title: 'Investor agent, Houston TX',
    body: 'DSCR, bank-statement, multi-state buyers. Ryan McConihe knows wholesale cold and the file moves the way it should. Closed three of mine in 21 days or less last quarter. The co-branded flyers helped me run a full open-house circuit too.',
  },
];

interface HowItWorksStep {
  number: string;
  title: string;
  body: string;
}

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: '1',
    title: 'Refer',
    body: 'Introduce your buyer or refinance client to your LMP loan officer of choice. Not sure who fits? Ask us and we will assign based on state, language, and program need.',
  },
  {
    number: '2',
    title: 'We work',
    body: 'Pre-approval, lender shop across 30-plus wholesale lenders, document collection, conditions, underwriting. Communication stays tight with you the whole way.',
  },
  {
    number: '3',
    title: 'Close together',
    body: 'In person at the closing table when geography allows. Both signs on the table. Your buyer remembers who showed up. So do you.',
  },
];

interface CoMarketingAsset {
  emoji: string;
  title: string;
  body: string;
}

const CO_MARKETING_ASSETS: CoMarketingAsset[] = [
  {
    emoji: '🏡',
    title: 'Open-house flyers',
    body: 'Co-branded one-pagers with your photo, your contact info, our pre-approval CTA. Print-ready PDFs, your brokerage compliance line included.',
  },
  {
    emoji: '✉️',
    title: 'Email blast templates',
    body: 'New-listing announcements, just-sold updates, market-shift refinance nudges. RESPA-compliant joint marketing language reviewed by our compliance partner.',
  },
  {
    emoji: '📱',
    title: 'Social-ready graphics',
    body: 'Square and story-format Instagram and Facebook templates, swap your headshot in, post the same day. State-program callouts ready for MassHousing, NHHFA, CHFA, RIHousing, FL Hometown Heroes, TSAHC.',
  },
];

const PARTNER_STATES = siteConfig.business.licensedStates;

export default function PartnersPage() {
  const { compliance, business } = siteConfig;

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
            <p className="text-eyebrow text-[var(--accent)]">For Real Estate Agents</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              Close more deals. Faster.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              Your buyer needs pre-approval today, not next week. We pre-approve in
              hours, work conditions same-day, and show up at the closing table. One
              partnership across {business.licensedStates.length} licensed states.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button href="#partner-signup" variant="primary" size="lg">
                Become a Referral Partner
              </Button>
              <Button href="#how-it-works" variant="secondary" size="lg">
                How it works
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.5}>
            <p className="font-mono text-micro text-[var(--text-muted)] mt-8 max-w-xl">
              NMLS #{business.nmls} · {business.licensedStates.length} states · RESPA-compliant co-marketing
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
            <p className="text-eyebrow text-[var(--accent-deep)]">Why Partner With LMP</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              We close on time. We communicate weekly. We show up.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-6 max-w-2xl">
              The five reasons local realtors send us their next pre-approval and the
              one after that.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {PARTNER_VALUE_PROPS.map((vp, idx) => (
              <FadeUp key={vp.title} delay={0.1 + idx * 0.075}>
                <Card variant="light" className="h-full">
                  <div className="text-4xl" aria-hidden="true">
                    {vp.emoji}
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
            <p className="text-eyebrow text-[var(--accent)]">How It Works</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              Three steps. No surprises.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <FadeUp key={step.number} delay={0.2 + idx * 0.15}>
                <Card variant="dark" hover={false} className="h-full">
                  <div className="font-mono text-eyebrow text-[var(--accent)]">
                    Step {step.number}
                  </div>
                  <h3 className="font-display text-h4 mt-3">{step.title}</h3>
                  <p className="text-body-sm text-[var(--text-secondary)] mt-3">
                    {step.body}
                  </p>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — What partners say (light)                          */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">In Their Words</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              Realtors who send their next deal to LMP.
            </h2>
          </FadeUp>
          {/* [DEMO COPY — pending client review] */}
          <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-2">
            [DEMO COPY — pending client review]
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {REALTOR_TESTIMONIALS.map((t, idx) => (
              <FadeUp key={t.name} delay={0.1 + idx * 0.1}>
                <Card variant="light" className="h-full">
                  <p className="text-body text-[var(--text-on-light)] italic">
                    &ldquo;{t.body}&rdquo;
                  </p>
                  <div className="mt-6 pt-4 border-t border-[rgba(14,27,51,0.08)]">
                    <p className="font-display text-h5 text-[var(--text-on-light)]">
                      {t.name}
                    </p>
                    <p className="font-mono text-eyebrow text-[var(--text-on-light-secondary)] mt-1">
                      {t.title}
                    </p>
                  </div>
                </Card>
              </FadeUp>
            ))}
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
            <p className="text-eyebrow text-[var(--accent)]">Co-Marketing Kits</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              RESPA-compliant assets. Free to our partners.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              We share the marketing lift, never the disclosure. Every asset reviewed
              by our compliance partner before it hits print or pixel.
            </p>
          </FadeUp>
          <p className="font-mono text-[10px] text-[var(--text-muted)] mt-3">
            [ASSET-PENDING — kits PDF set, Phase 1G]
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {CO_MARKETING_ASSETS.map((asset, idx) => (
              <FadeUp key={asset.title} delay={0.2 + idx * 0.1}>
                <Card variant="dark" className="h-full">
                  <div className="text-4xl" aria-hidden="true">
                    {asset.emoji}
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
            <p className="text-eyebrow text-[var(--accent-deep)]">Become a Partner</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              Send us your next pre-approval. We will take it from there.
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
                    label="First name"
                    required
                    variant="light"
                    placeholder="Tina"
                  />
                  <Input
                    name="lastName"
                    label="Last name"
                    required
                    variant="light"
                    placeholder="Costa"
                  />
                </div>

                <Input
                  name="brokerage"
                  label="Brokerage"
                  required
                  variant="light"
                  placeholder="Coldwell Banker, Compass, KW, independent..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    required
                    variant="light"
                    placeholder="you@brokerage.com"
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label="Phone"
                    required
                    variant="light"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <Input
                  name="states"
                  label={`States you work in (${PARTNER_STATES.join(', ')})`}
                  variant="light"
                  placeholder="MA, NH..."
                  helperText="Tell us where your active book is."
                />

                <Input
                  name="message"
                  label="Tell us about your typical buyer"
                  multiline
                  rows={4}
                  variant="light"
                  placeholder="First-time buyers, jumbo, investor, multi-family, relocation..."
                />

                {/* SMS opt-in — verbatim disclaimer per CLAUDE.md Compliance Rule */}
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
                    Send to LMP
                  </Button>
                </div>

                <p className="font-mono text-micro text-[var(--text-on-light-muted)]">
                  {compliance.brokerDisclosure}
                </p>
              </form>
            </SlideIn>

            {/* Contact info column */}
            <SlideIn direction="right" delay={0.15} className="lg:col-span-2">
              <Card variant="light" hover={false} className="h-full">
                <p className="text-eyebrow text-[var(--accent-deep)]">Direct Contact</p>
                <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-3">
                  Talk to us directly.
                </h3>
                <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-4">
                  Mike Comerford, President &amp; CEO, takes partner introductions
                  personally. Reach out and we will reply same business day.
                </p>

                <dl className="mt-6 flex flex-col gap-4 text-body-sm">
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      Email
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
                      Phone
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-1">
                      {business.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      Office
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
                      Licensed
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
              Ready to send your next pre-approval to LMP?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-body text-[var(--text-secondary)] max-w-xl mx-auto mt-6">
              One partnership. {business.licensedStates.length} states. {siteConfig.loanOfficers.length - 1} loan
              officers ready to work your next file.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8">
              <Button href="#partner-signup" variant="primary" size="lg">
                Become a Referral Partner
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
