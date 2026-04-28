import { notFound } from 'next/navigation';
import { siteConfig } from '@/data/site';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import FadeUp from '@/components/animations/FadeUp';
import BookingCalendar from '@/components/BookingCalendar';
import { personSchema, schemaScript } from '@/lib/schema';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return siteConfig.loanOfficers.map((lo) => ({ 'lo-slug': lo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'lo-slug': string }>;
}): Promise<Metadata> {
  const { 'lo-slug': slug } = await params;
  const lo = siteConfig.loanOfficers.find((l) => l.slug === slug);
  if (!lo) return { title: 'Loan Officer Not Found' };
  return {
    title: `${lo.name} · NMLS #${lo.nmls}`,
    description: `${lo.role} at LMP Financial. ${lo.bio.split('.')[0]}.`,
  };
}

export default async function LoanOfficerPage({
  params,
}: {
  params: Promise<{ 'lo-slug': string }>;
}) {
  const { 'lo-slug': slug } = await params;
  const lo = siteConfig.loanOfficers.find((l) => l.slug === slug);
  if (!lo) notFound();

  const langFlags = lo.languages
    .map((l) =>
      l === 'en' ? '🇺🇸' : l === 'es' ? '🇪🇸' : l === 'pt' ? '🇧🇷' : ''
    )
    .filter(Boolean)
    .join(' ');

  const langNames = lo.languages
    .map((l) =>
      l === 'en'
        ? 'English'
        : l === 'es'
          ? 'Spanish'
          : l === 'pt'
            ? 'Portuguese'
            : ''
    )
    .filter(Boolean)
    .join(', ');

  const stateLicensureUnconfirmed =
    lo.stateLicensure.length === 1 &&
    lo.stateLicensure[0].includes('CONFIRM');

  return (
    <>
      {/* JSON-LD: Person schema (NMLS as PropertyValue identifier) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(personSchema(lo))}
      />

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
                    [ASSET-PENDING — {lo.name} portrait]
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Identity block */}
            <div className="lg:col-span-2">
              <FadeUp delay={0.2}>
                <p className="text-eyebrow text-[var(--accent)]">{lo.role}</p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <h1 className="hero-shimmer font-display text-h1 mt-3">
                  {lo.name}
                </h1>
              </FadeUp>
              <FadeUp delay={0.4}>
                <p className="text-body font-mono text-[var(--accent)] mt-3">
                  NMLS #{lo.nmls}
                </p>
              </FadeUp>
              <FadeUp delay={0.5}>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Badge color="gold">
                    {stateLicensureUnconfirmed
                      ? 'States: [CONFIRM-WITH-CLIENT]'
                      : `Licensed in ${lo.stateLicensure.join(', ')}`}
                  </Badge>
                  <Badge color="neutral">
                    {langFlags} {langNames}
                  </Badge>
                </div>
              </FadeUp>
              <FadeUp delay={0.6}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href={`mailto:${lo.email}`}>
                    Email {lo.name.split(' ')[0]}
                  </Button>
                  <Button href={lo.my1003appUrl} variant="secondary" external>
                    Continue your application
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
              About {lo.name.split(' ')[0]}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-6 whitespace-pre-line">
              {lo.bio}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-micro text-[var(--text-on-light-muted)] italic mt-6">
              {/* [DEMO COPY — pending client review] */}
              [DEMO COPY — pending client review]
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Booking calendar — dark section */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">
              Schedule with {lo.name.split(' ')[0]}
            </p>
            <h2 className="font-display text-h2 mt-3 max-w-2xl">
              Book a 30-minute call.
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl">
              Pick a time that works. {lo.name.split(' ')[0]} will call you to
              walk through your situation, talk through programs, and answer
              questions.
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
              Or send a message
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
              Prefer email? Drop {lo.name.split(' ')[0]} a note. Replies
              typically within one business day.
            </p>
          </FadeUp>
          <form
            action="/api/contact"
            method="POST"
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input type="hidden" name="loSlug" value={lo.slug} />
            <Input name="firstName" label="First name" required variant="light" />
            <Input name="lastName" label="Last name" required variant="light" />
            <div className="md:col-span-2">
              <Input
                name="email"
                label="Email"
                type="email"
                required
                variant="light"
              />
            </div>
            <div className="md:col-span-2">
              <Input name="phone" label="Phone" type="tel" variant="light" />
            </div>
            <div className="md:col-span-2">
              <Input
                name="message"
                label="What's your situation?"
                multiline
                rows={5}
                required
                variant="light"
                placeholder="First-time buyer, refinance, wondering about FHA, etc."
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-start gap-3 text-body-sm text-[var(--text-on-light-secondary)]">
                <input type="checkbox" name="smsOptIn" className="mt-1" />
                <span>{siteConfig.compliance.smsOptInDisclaimer}</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" size="lg">
                Send to {lo.name.split(' ')[0]}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Trust strip — dark, bottom */}
      <section className="section-dark-gradient section-pad-tight">
        <div className="container-base px-6">
          <p className="text-center text-micro font-mono text-[var(--text-muted)]">
            {lo.name} · NMLS #{lo.nmls} ·{' '}
            {stateLicensureUnconfirmed
              ? '[STATE-LICENSURE CONFIRM-WITH-CLIENT]'
              : `Licensed in ${lo.stateLicensure.join(', ')}`}
            {' · '}
            {langNames}
          </p>
        </div>
      </section>
    </>
  );
}
