'use client';

// /faq — FaqClient (interactive + translation layer).
//
// Phase 1E content + bilingual EN/ES migration. Chrome (eyebrows, headlines,
// CTAs) + Q&A items all flow through useTranslation('faq'). Q&A items are
// pulled via ta<FaqItem[]>('groups.<key>.items') so the translated dictionary
// owns BOTH the structure and the answers — letting ES copy re-shape grouping
// if compliance ever splits a Spanish topic differently.
//
// Section rhythm:
//   1. Hero       → dark  → intent (common questions, honest answers)
//   2. Accordion  → light → education (12 Qs in 3 groups)
//   3. CTA        → dark  → conversion (book a call / take quiz)
//
// All answers are [DEMO COPY — pending client review]. Compliance review pending
// for any quantifiable claims (close time, down-payment specifics).

import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import { faqPageSchema, schemaScript } from '@/lib/schema';
import { useTranslation } from '@/hooks/useTranslation';

interface FaqItem {
  question: string;
  answer: string;
  flag?: string;
}

interface FaqGroup {
  key: 'process' | 'programs' | 'workingWith';
  eyebrow: string;
  title: string;
  items: FaqItem[];
}

// Compliance flags — kept in code (not in JSON) because they're build-status
// metadata, not translatable copy. Keyed by the question's English source text
// (compliance flags travel with the topic, not the localized phrasing).
const COMPLIANCE_FLAGS: Record<string, string> = {
  'How long does closing take?':
    '[SOURCING-REQUIRED — 14-day claim] [COMPLIANCE-REVIEW-PENDING]',
  'FHA vs Conventional, which one is right for me?': '[COMPLIANCE-REVIEW-PENDING]',
  'What is the minimum down payment?': '[COMPLIANCE-REVIEW-PENDING]',
};

const GROUP_KEYS: Array<'process' | 'programs' | 'workingWith'> = [
  'process',
  'programs',
  'workingWith',
];

// English question keys for compliance-flag lookup. We keep a parallel list of
// English question text so the flag survives a locale switch — flags travel
// with the topic, not the localized phrasing.
const ENGLISH_QUESTION_BY_KEY: Record<
  'process' | 'programs' | 'workingWith',
  string[]
> = {
  process: [
    'How do I get pre-approved?',
    'What documents do I need?',
    'How long does closing take?',
    'Will this affect my credit score?',
  ],
  programs: [
    'FHA vs Conventional, which one is right for me?',
    'What is the minimum down payment?',
    'Do you offer refinancing?',
    'Why use a broker instead of going to my bank?',
  ],
  workingWith: [
    'What languages do you speak?',
    'Do you work with first-time buyers?',
    'Do you work with realtors?',
    'I am an LO looking for a new shop. Who do I talk to?',
  ],
};

export default function FaqClient() {
  const { t, ta } = useTranslation('faq');

  const groups: FaqGroup[] = GROUP_KEYS.map((key) => {
    const items = ta<Array<{ question: string; answer: string }>>(
      `groups.${key}.items`,
    ) ?? [];
    const englishQuestions = ENGLISH_QUESTION_BY_KEY[key];
    return {
      key,
      eyebrow: t(`groups.${key}.eyebrow`),
      title: t(`groups.${key}.title`),
      items: items.map((it, idx) => {
        // Compliance flag lookup uses the English question at the same index
        // (preserves the flag across locale switches).
        const englishQ = englishQuestions[idx] ?? it.question;
        return {
          question: it.question,
          answer: it.answer,
          flag: COMPLIANCE_FLAGS[englishQ],
        };
      }),
    };
  });

  // Flat {q,a} list for JSON-LD schema in the active locale.
  const faqsFlat = groups.flatMap((g) =>
    g.items.map((it) => ({ q: it.question, a: it.answer })),
  );

  return (
    <>
      {/* JSON-LD: FAQPage schema with all Q/A pairs (current locale) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(faqPageSchema(faqsFlat))}
      />

      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark)                                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/faq.jpg" priority />
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
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — FAQ Accordion (light)                              */}
      {/* ============================================================ */}
      {/* [DEMO COPY — pending client review — all 12 answers] */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          {groups.map((group, gIdx) => (
            <div key={group.key} className={gIdx > 0 ? 'mt-16' : ''}>
              <FadeUp>
                <p className="text-eyebrow text-[var(--accent-deep)]">{group.eyebrow}</p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3">
                  {group.title}
                </h2>
              </FadeUp>

              <div className="mt-8 flex flex-col gap-3">
                {group.items.map((item, iIdx) => (
                  <FadeUp key={item.question} delay={0.1 + iIdx * 0.05}>
                    <details
                      className="group bg-[var(--bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] overflow-hidden transition-all duration-200 open:shadow-[var(--shadow-lg)]"
                    >
                      <summary className="cursor-pointer list-none flex items-start justify-between gap-6 p-6 hover:bg-[rgba(197,165,114,0.04)] transition-colors">
                        <h3 className="font-display text-h5 text-[var(--text-on-light)]">
                          {item.question}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(197,165,114,0.12)] text-[var(--accent-deep)] flex items-center justify-center font-mono text-lg leading-none transition-transform duration-200 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <div className="px-6 pb-6 -mt-2">
                        <p className="text-body text-[var(--text-on-light-secondary)]">
                          {item.answer}
                        </p>
                        {item.flag && (
                          <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-3">
                            {item.flag}
                          </p>
                        )}
                      </div>
                    </details>
                  </FadeUp>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Final CTA (dark)                                   */}
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
              {t('cta.headline')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-body text-[var(--text-secondary)] max-w-xl mx-auto mt-6">
              {t('cta.body')}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                {t('cta.primary')}
              </Button>
              <Button href="/quiz" variant="secondary" size="lg">
                {t('cta.secondary')}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
