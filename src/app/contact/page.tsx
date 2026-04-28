import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import SlideIn from '@/components/animations/SlideIn';

// /contact — Direct Contact Page
//
// Phase 1E (Static Pages Bundle Agent). Section rhythm:
//   1. Hero            → dark  → conversion (intent + trust)
//   2. Form + info     → light → conversion (primary form) + relationship (info card)
//   3. Trust strip     → dark  → social proof (NMLS / 9 states / 22 LOs / Lowell)
//
// Compliance posture (per CLAUDE.md Compliance Rule):
//   - SMS opt-in disclaimer rendered VERBATIM from siteConfig.compliance.smsOptInDisclaimer
//   - Broker disclosure printed under form
//   - Form action="/api/contact" — Phase 2A wires the route. Acceptable as a stub for demo.

export const metadata: Metadata = {
  title: 'Contact LMP Financial',
  description:
    'Talk to a Lowell-based mortgage broker who answers texts the same day. Twenty-two loan officers across nine states. One application, one team, one closing.',
};

export default function ContactPage() {
  const { business, social, compliance } = siteConfig;

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
            <p className="text-eyebrow text-[var(--accent)]">Get in Touch</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              Lowell handshake. Email-or-text speed.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              Real people, in our Cabot Street office, on the other side of every
              message you send. Same-day reply on weekdays, and weekends when life
              demands it.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="font-mono text-micro text-[var(--text-muted)] mt-8 max-w-xl">
              NMLS #{business.nmls} · {business.licensedStates.length} licensed states · {siteConfig.loanOfficers.length - 1} loan officers
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
                <p className="text-eyebrow text-[var(--accent-deep)]">Send a Message</p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3">
                  Tell us what you need.
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-4 max-w-xl">
                  Pre-approval, refinance, partner inquiry, language preference, anything.
                  We will route your note to the right loan officer the same day.
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
                    label="First name"
                    required
                    variant="light"
                    placeholder="Maria"
                  />
                  <Input
                    name="lastName"
                    label="Last name"
                    required
                    variant="light"
                    placeholder="Silva"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    required
                    variant="light"
                    placeholder="you@email.com"
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
                  name="message"
                  label="How can we help?"
                  required
                  multiline
                  rows={5}
                  variant="light"
                  placeholder="First-time buyer in NH, looking at FHA. What is the next step?"
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
                    Send Message
                  </Button>
                </div>

                <p className="font-mono text-micro text-[var(--text-on-light-muted)]">
                  {compliance.brokerDisclosure}
                </p>
              </form>
            </SlideIn>

            {/* Contact info column (right) */}
            <SlideIn direction="right" delay={0.15} className="lg:col-span-2">
              <Card variant="light" hover={false} className="h-full">
                <p className="text-eyebrow text-[var(--accent-deep)]">Direct Lines</p>
                <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-3">
                  Reach us where it works for you.
                </h3>

                <dl className="mt-8 flex flex-col gap-6 text-body-sm">
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      Office
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
                      Phone
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
                      General Email
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
                      Mike Comerford, President
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
                        LinkedIn
                      </dt>
                      <dd className="text-[var(--text-on-light)] mt-2">
                        <a
                          href={social.linkedinPersonal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--accent-deep)] transition-colors"
                        >
                          Mike Comerford on LinkedIn
                        </a>
                      </dd>
                    </div>
                  )}

                  {/* [DEMO COPY — pending client review — generic office hours] */}
                  <div>
                    <dt className="font-mono text-eyebrow text-[var(--text-on-light-secondary)]">
                      Office Hours
                    </dt>
                    <dd className="text-[var(--text-on-light)] mt-2">
                      Mon to Fri, 9am to 6pm ET
                      <br />
                      Sat by appointment
                    </dd>
                    <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-2">
                      [DEMO COPY — pending client review]
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
              Local Broker, Multi-State Reach
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <FadeUp delay={0.1}>
              <Card variant="dark" hover={false} className="h-full text-center">
                <p className="font-display text-h3 text-[var(--accent)]">
                  #{business.nmls}
                </p>
                <p className="font-mono text-eyebrow text-[var(--text-secondary)] mt-2">
                  Company NMLS
                </p>
              </Card>
            </FadeUp>
            <FadeUp delay={0.15}>
              <Card variant="dark" hover={false} className="h-full text-center">
                <p className="font-display text-h3 text-[var(--accent)]">
                  {business.licensedStates.length}
                </p>
                <p className="font-mono text-eyebrow text-[var(--text-secondary)] mt-2">
                  States Licensed
                </p>
              </Card>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Card variant="dark" hover={false} className="h-full text-center">
                <p className="font-display text-h3 text-[var(--accent)]">
                  {siteConfig.loanOfficers.length - 1}
                </p>
                <p className="font-mono text-eyebrow text-[var(--text-secondary)] mt-2">
                  Loan Officers
                </p>
              </Card>
            </FadeUp>
            <FadeUp delay={0.25}>
              <Card variant="dark" hover={false} className="h-full text-center">
                <p className="font-display text-h3 text-[var(--accent)]">Lowell</p>
                <p className="font-mono text-eyebrow text-[var(--text-secondary)] mt-2">
                  Massachusetts
                </p>
              </Card>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
