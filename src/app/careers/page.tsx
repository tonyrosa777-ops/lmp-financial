import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import FadeUp from '@/components/animations/FadeUp';
import SlideIn from '@/components/animations/SlideIn';

// /careers — Loan Officer Recruiting Funnel
//
// Audience 3 of Mike's three-headed monster (per CLAUDE.md operating principle 2 +
// initial-business-data.md Section 9A). First-class conversion page for LO recruits.
// Brian Walsh is the named recruiter contact (per IBD §10 + market-intelligence.md §9).
//
// Section rhythm — strict dark/light alternation per CLAUDE.md Homepage Section
// Architecture Rule. Each section serves a distinct PURPOSE.
//
// 1. Hero                   → dark  → conversion (Talk to Brian primary CTA)
// 2. Why LMP                → light → empathy (Mike's founder essay condensed)
// 3. Comp transparency      → dark  → trust + numbers (220-275 bps)
// 4. Who we're looking for  → light → self-identification (4 LO archetypes)
// 5. Tools you'll have      → dark  → capability proof (6 capabilities w/ badges)
// 6. What it's like         → light → social proof (3 LO testimonials)
// 7. Contact form           → dark  → conversion (Talk to Brian form)
// 8. Final CTA              → light → conversion (final nudge)
//
// Note on alternation: the spec lists Section 8 as dark, but Section 7 is also dark
// per spec. CLAUDE.md "no two adjacent sections share tone" is non-negotiable and
// overrides; Section 8 is rendered light to preserve strict alternation.
//
// Compliance: 220-275 bps comp range flagged [COMPLIANCE-REVIEW-PENDING] inline.
// SMS opt-in disclaimer verbatim from siteConfig.compliance.smsOptInDisclaimer.

export const metadata: Metadata = {
  title: 'Careers — Loan Officers',
  description:
    'More book. More tools. More money. 220-275 bps comp range, in-person Lowell training, bilingual marketing assets, 30-plus wholesale lenders. Talk to Brian Walsh.',
};

interface LoArchetype {
  emoji: string;
  title: string;
  body: string;
}

// [DEMO COPY — pending client review] — based on MI §2 LO recruit personas.
const LO_ARCHETYPES: LoArchetype[] = [
  {
    emoji: '🌎',
    title: 'Multi-state operator',
    body: 'You have a book in two or more states and you are tired of license headaches at your current shop. We carry MA, NH, ME, RI, CT, FL, CO, VT, and TX. License extension help is built in.',
  },
  {
    emoji: '🗣️',
    title: 'Bilingual specialist',
    body: 'Spanish or Portuguese fluency, serving communities most retail lenders ignore. Marketing assets in EN, PT, and ES. ITIN comfort. Your community deserves a broker that talks the way they talk.',
  },
  {
    emoji: '🏘️',
    title: 'State-program expert',
    body: 'You know MassHousing, NHHFA, MaineHousing, RIHousing, CHFA, VHFA, FL Hometown Heroes, TSAHC, TDHCA, and metroDPA cold. We do too. Your DPA stacks close, every time.',
  },
  {
    emoji: '💼',
    title: 'Self-employed-borrower closer',
    body: 'Bank-statement loans, DSCR, 1099, ITIN. You read tax returns the way some people read mystery novels. Our wholesale bench actually underwrites non-W-2 income, instead of just declining it.',
  },
];

interface CareersTool {
  badge: string;
  title: string;
  body: string;
}

const CAREERS_TOOLS: CareersTool[] = [
  {
    badge: '30+ Lenders',
    title: 'Full wholesale bench',
    body: 'UWM, Rocket Pro TPO, and 30-plus wholesale lender relationships. The right pricing, every file, no captive overlays.',
  },
  {
    badge: 'Non-QM',
    title: 'ITIN, DSCR, Bank Statement',
    body: 'Programs your retail shop probably will not approve. Our investors do, and our processors know how to package the file.',
  },
  {
    badge: 'State DPA',
    title: 'Every state program',
    body: 'MassHousing, NHHFA, MaineHousing, RIHousing, CHFA, VHFA, TSAHC, TDHCA, FL Hometown Heroes, metroDPA. Stacked, layered, closed.',
  },
  {
    badge: 'EN · PT · ES',
    title: 'Bilingual marketing kits',
    body: 'Co-branded flyers and email templates in three languages. If you serve a Portuguese or Spanish community, you are not building from scratch.',
  },
  {
    badge: 'Lowell HQ',
    title: 'In-person training',
    body: 'New to wholesale? Spend a week at the Lowell HQ with Mike and the senior LOs. Or stay fully remote. Both options open.',
  },
  {
    badge: '9 States',
    title: 'License extension help',
    body: 'Want to add MA, NH, FL, TX, CO? We pay the testing and SAFE filing costs once you commit. Your book grows where you grow.',
  },
];

interface LoTestimonial {
  name: string;
  title: string;
  body: string;
}

// [DEMO COPY — pending client review]
// Senior-LO perspective. No em dashes.
const LO_TESTIMONIALS: LoTestimonial[] = [
  {
    name: 'Mike Comerford',
    title: 'President & CEO, originating since 2003',
    body: 'I built LMP because I wanted a place where the LO is the product. Not the bank. Not the brand. The LO. Everything we do is engineered around that simple idea, and the team we have is proof it works. Twenty-two LOs, three languages, nine states, and we are still hiring.',
  },
  {
    name: 'Senior LO, originated $42M in 2024',
    title: 'Joined LMP from a national retail shop',
    body: 'I moved my book over because I was tired of a comp plan I could not read. Two-twenty-five bps from day one, weekly draw available, full lender shop, and Mike actually picks up the phone. My pull-through is up. My take-home is up. My weekends are mine again.',
  },
  {
    name: 'Bilingual LO, originated $28M in 2024',
    title: 'Joined LMP after running a remote-only shop solo',
    body: 'Going remote solo was good for the comp. Lonely for the work. At LMP I get the splits I had as an indie plus an actual processor, real marketing kits in Portuguese, and a recruiter who returns texts. I close more files now and I work fewer hours doing it.',
  },
];

const RECRUIT_STATES = siteConfig.business.licensedStates;

export default function CareersPage() {
  const { compliance, business, loanOfficers } = siteConfig;

  // Brian Walsh is the named recruiter per IBD §10. Source by role.
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

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark, breathing-orb ambient)                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
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
            <p className="text-eyebrow text-[var(--accent)]">For Loan Officers</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              More book. More tools. More money.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              220 to 275 bps. In-person Lowell training. Bilingual marketing assets in
              EN, PT, ES. Thirty-plus wholesale lenders, every file. You bring the
              book, we bring the rest.
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
                Talk to Brian
              </Button>
              <Button href="#why-lmp" variant="secondary" size="lg">
                Why LMP
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.5}>
            <p className="font-mono text-micro text-[var(--text-muted)] mt-8 max-w-xl">
              [COMPLIANCE-REVIEW-PENDING] · NMLS #{business.nmls} · {business.licensedStates.length} states · 22 active LOs
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
            <p className="text-eyebrow text-[var(--accent-deep)]">Why LMP</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              A note from Mike Comerford, founder.
            </h2>
          </FadeUp>
          <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-2">
            [DEMO COPY — pending client review]
          </p>

          {/* [DEMO COPY — Mike-voice. Modeled on existing published bio.] */}
          <div className="mt-10 max-w-3xl flex flex-col gap-6">
            <FadeUp delay={0.15}>
              <p className="text-body text-[var(--text-on-light-secondary)]">
                I have been originating loans for two decades and training LOs for
                most of them. The reason I built LMP is simple. The LO is the product.
                Not the bank, not the brand, not the website. The relationship between
                a loan officer and a borrower is the entire business, and every
                decision we make at LMP starts from that.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="text-body text-[var(--text-on-light-secondary)]">
                That is why we run a real wholesale bench instead of pushing one
                lender's product. Why we put together full bilingual marketing kits in
                English, Portuguese, and Spanish, because most retail shops still
                pretend the entire borrower base speaks one language. Why we offer
                in-person training at our Lowell HQ for new LOs and a fully remote
                option for everyone else. And why we expand state by state alongside
                our LOs, not on a corporate map drawn by someone who has never met our
                book.
              </p>
            </FadeUp>
            <FadeUp delay={0.35}>
              <p className="text-body text-[var(--text-on-light-secondary)]">
                If you are reading this and you are tired of a comp plan you cannot
                read, captive overlays declining your borrowers for no reason, or a
                shop where nobody picks up the phone, get in touch. Brian Walsh is our
                recruiter. He will set up a confidential intro call this week. Twenty
                two LOs and counting. We are still hiring.
              </p>
            </FadeUp>
            <FadeUp delay={0.45}>
              <p className="font-display text-h5 text-[var(--text-on-light)] italic">
                Mike Comerford
              </p>
              <p className="font-mono text-eyebrow text-[var(--text-on-light-secondary)] mt-1">
                President &amp; CEO · NMLS #184368
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
            <p className="text-eyebrow text-[var(--accent)]">What We Pay</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              Comp on the page. Not in the closet.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
            {/* The number, big */}
            <FadeUp delay={0.15} className="lg:col-span-3">
              <Card variant="dark" hover={false} className="h-full">
                <p className="text-eyebrow text-[var(--accent)]">Comp Range</p>
                <p className="font-display text-display mt-3">
                  220 to 275 <span className="text-h2">bps</span>
                </p>
                <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl">
                  Anchored to NEXA's published comp structure. Daily and weekly draw
                  options available. Comp tier set during onboarding, no surprises,
                  documented in your offer letter.
                </p>
                <p className="font-mono text-[10px] text-[var(--text-muted)] mt-4">
                  [COMPLIANCE-REVIEW-PENDING] — final published comp range pending
                  Mike Comerford sign-off + compliance partner review.
                </p>
              </Card>
            </FadeUp>

            {/* What you get vs solo */}
            <FadeUp delay={0.25} className="lg:col-span-2">
              <Card variant="dark" hover={false} className="h-full">
                <p className="text-eyebrow text-[var(--accent)]">vs Going Solo</p>
                <h3 className="font-display text-h4 mt-3">
                  What you get that you would not have alone.
                </h3>
                <ul className="mt-6 flex flex-col gap-4 text-body-sm text-[var(--text-secondary)]">
                  <li className="flex gap-3">
                    <span aria-hidden="true">✅</span>
                    <span>
                      <strong className="text-[var(--text-primary)]">
                        W-2 with comp split.
                      </strong>{' '}
                      Tax simplicity, benefits eligibility on qualifying tiers.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true">✅</span>
                    <span>
                      <strong className="text-[var(--text-primary)]">
                        Marketing assets included.
                      </strong>{' '}
                      Bilingual flyers, social templates, email sequences.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true">✅</span>
                    <span>
                      <strong className="text-[var(--text-primary)]">
                        Multi-state license assistance.
                      </strong>{' '}
                      We pay testing and SAFE filings once you commit.
                    </span>
                  </li>
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
            <p className="text-eyebrow text-[var(--accent-deep)]">Who Fits</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              Four kinds of LO who thrive at LMP.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-6 max-w-2xl">
              Recognize yourself in any of these? Brian wants to hear from you.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {LO_ARCHETYPES.map((arch, idx) => (
              <FadeUp key={arch.title} delay={0.1 + idx * 0.1}>
                <Card variant="light" className="h-full">
                  <div className="text-4xl" aria-hidden="true">
                    {arch.emoji}
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
            <p className="text-eyebrow text-[var(--accent)]">Tools You Will Have</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              Everything you need to close. Nothing in your way.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {CAREERS_TOOLS.map((tool, idx) => (
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
            <p className="text-eyebrow text-[var(--accent-deep)]">In Their Words</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              Mike, plus two senior LOs on what changed when they joined.
            </h2>
          </FadeUp>
          <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-2">
            [DEMO COPY — pending client review]
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {LO_TESTIMONIALS.map((t, idx) => (
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
            <p className="text-eyebrow text-[var(--accent)]">Talk to Brian</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-3xl">
              Confidential intro call this week.
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
                    label="First name"
                    required
                    variant="dark"
                    placeholder="Alex"
                  />
                  <Input
                    name="lastName"
                    label="Last name"
                    required
                    variant="dark"
                    placeholder="Rivera"
                  />
                </div>

                <Input
                  name="currentEmployer"
                  label="Current employer"
                  required
                  variant="dark"
                  placeholder="loanDepot, CrossCountry, indie shop, between roles..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    required
                    variant="dark"
                    placeholder="you@personal.com"
                    helperText="Personal email preferred for confidentiality."
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label="Phone"
                    required
                    variant="dark"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <Input
                  name="states"
                  label={`States licensed (${RECRUIT_STATES.join(', ')})`}
                  variant="dark"
                  placeholder="MA, NH, FL..."
                  helperText="Where you currently hold an MLO license."
                />

                <Input
                  name="annualVolume"
                  label="Annual production volume (USD)"
                  variant="dark"
                  placeholder="$18M"
                  helperText="Most recent full-year origination total. Range OK."
                />

                <Input
                  name="missing"
                  label="What's missing from your current shop?"
                  multiline
                  rows={4}
                  variant="dark"
                  placeholder="Comp clarity, lender bench, marketing support, mentorship, multi-state path..."
                />

                {/* SMS opt-in — verbatim disclaimer per CLAUDE.md Compliance Rule */}
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
                    Send to Brian
                  </Button>
                </div>

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
                      Email
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
                      NMLS
                    </dt>
                    <dd className="text-[var(--text-primary)] mt-1">
                      {brian.nmls}{' '}
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">
                        (recruiter, not LO)
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-muted)]">
                      Office
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
                    Email Brian Direct
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
              Ready to talk?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-body text-[var(--text-on-light-secondary)] max-w-xl mx-auto mt-6">
              Confidential intro call with Brian this week. Or read Mike's note again
              first. Both work.
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
                Email Brian Walsh
              </Button>
              <Button href="#why-lmp" variant="secondary" size="lg">
                Read Mike's note
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
