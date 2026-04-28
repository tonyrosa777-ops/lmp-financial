import { siteConfig } from '@/data/site';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet the Team',
  description:
    '22 loan officers across 9 states. Each licensed individually with NMLS, each with their own specialty. Bilingual capacity in English, Portuguese, and Spanish.',
};

export default function TeamPage() {
  const { loanOfficers, business } = siteConfig;

  return (
    <>
      {/* Page header — dark gradient, breathing orb ambient */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/team.jpg" priority />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">Our Team</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {loanOfficers.length} loan officers, one Lowell HQ.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              Every LMP loan officer is licensed individually with their own
              NMLS. We work in {business.licensedStatesLong.length} states and
              three languages.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* LO grid — light section */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          {/* Filter UI placeholder — Phase 1F functional. Visual stub for demo. */}
          <FadeUp>
            <div className="mb-12 flex flex-wrap gap-3 items-center">
              <span className="text-eyebrow text-[var(--text-on-light-secondary)]">
                Filter:
              </span>
              <Badge color="gold">All states</Badge>
              <Badge color="neutral">All languages</Badge>
              <span className="text-micro text-[var(--text-on-light-muted)] italic ml-2">
                [Phase 1F — interactive filters]
              </span>
            </div>
          </FadeUp>

          {/* 22-LO grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loanOfficers.map((lo, i) => (
              <FadeUp key={lo.slug} delay={i * 0.03}>
                <Card
                  variant="light"
                  href={`/team/${lo.slug}`}
                  className="text-center h-full flex flex-col"
                >
                  {/* Photo placeholder — circular initials */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-[var(--accent-muted)] flex items-center justify-center font-display text-h3 text-[var(--primary-deep)] font-bold">
                    {lo.name
                      .split(' ')
                      .map((p) => p.charAt(0))
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <h2 className="font-display text-h4 text-[var(--text-on-light)] mt-4">
                    {lo.name}
                  </h2>
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-1">
                    {lo.role}
                  </p>
                  <p className="text-micro font-mono text-[var(--accent-deep)] mt-2">
                    NMLS #{lo.nmls}
                  </p>
                  {lo.languages.length > 1 && (
                    <p
                      className="text-micro text-[var(--text-on-light-muted)] mt-2"
                      aria-label={`Languages: ${lo.languages.join(', ')}`}
                    >
                      {lo.languages
                        .map((l) =>
                          l === 'en'
                            ? '🇺🇸'
                            : l === 'es'
                              ? '🇪🇸'
                              : l === 'pt'
                                ? '🇧🇷'
                                : ''
                        )
                        .filter(Boolean)
                        .join(' ')}
                    </p>
                  )}
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-3 line-clamp-3 flex-1">
                    {lo.bio.split('.')[0]}.
                  </p>
                  <span className="text-eyebrow text-[var(--accent-deep)] mt-4">
                    Schedule with {lo.name.split(' ')[0]} →
                  </span>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 max-w-2xl mx-auto">
              Not sure who to talk to?
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
              Take the 5-question quiz. We&apos;ll match you to the right LO
              based on your situation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/quiz" size="lg">
                Take the Quiz
              </Button>
              <Button href="/booking" variant="secondary" size="lg">
                Get Pre-Approved
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
