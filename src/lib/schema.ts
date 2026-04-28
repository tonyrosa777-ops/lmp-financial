// src/lib/schema.ts
//
// Phase 1F (Schema Markup + robots.ts Agent). Schema.org JSON-LD builder
// utilities for the LMP Financial site. Per CLAUDE.md SEO Rule, every page
// gets schema markup of the appropriate type — FinancialService for the
// company root, LocalBusiness for the Lowell office, Person per LO with
// NMLS as identifier, Service per loan program, FAQPage on /faq.
//
// Per CLAUDE.md Compliance Rule, NMLS appears as a PropertyValue identifier
// on both FinancialService (company NMLS #2754084) and Person (per-LO NMLS).
//
// All builder functions are pure (no side effects). Output objects are
// JSON-LD-shaped and serialized via schemaScript() into <script
// type="application/ld+json"> tags using dangerouslySetInnerHTML — the
// Next.js standard for inline JSON-LD per the App Router metadata docs.

import type { LoanOfficer, LoanProgram } from '@/data/site';
import { siteConfig } from '@/data/site';

const BASE_URL = 'https://lmpfinancial.com';

// ============================================================================
// Types — local to this module. Kept loose (Record<string, unknown>) on the
// schema return shape because Schema.org JSON-LD has too many optional fields
// to model strictly without pulling in a generated types package.
// ============================================================================

type JsonLd = Record<string, unknown>;

interface FaqItem {
  q: string;
  a: string;
}

// ============================================================================
// Language code mapping — used by Person schema. Returns full English names
// per Schema.org `knowsLanguage` convention (BCP-47 names, not 2-letter codes).
// ============================================================================

function languageName(code: string): string {
  switch (code) {
    case 'en':
      return 'English';
    case 'es':
      return 'Spanish';
    case 'pt':
      return 'Portuguese';
    default:
      return code;
  }
}

// ============================================================================
// FinancialService — root schema for the company. Anchored at #organization
// so per-LO Person schemas can reference it via worksFor: { '@id': ... }.
// ============================================================================

export function financialServiceSchema(): JsonLd {
  const { business } = siteConfig;
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${BASE_URL}#organization`,
    name: business.name,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    image: `${BASE_URL}/opengraph-image`,
    telephone: business.phone,
    email: business.emailMain,
    description:
      'Independent mortgage broker shopping 30+ wholesale lenders across 9 states.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.street}, Ste ${business.address.suite}`,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: 'US',
    },
    areaServed: business.licensedStatesLong.map((s) => ({
      '@type': 'State',
      name: s,
    })),
    identifier: {
      '@type': 'PropertyValue',
      name: 'NMLS',
      value: business.nmls,
    },
    sameAs: [siteConfig.social.linkedinPersonal].filter(
      (link): link is string =>
        typeof link === 'string' &&
        link.length > 0 &&
        !link.includes('CONFIRM-WITH-CLIENT')
    ),
  };
}

// ============================================================================
// LocalBusiness — for the Lowell office specifically. Anchored at
// #localbusiness, separate node from #organization.
// ============================================================================

export function localBusinessSchema(): JsonLd {
  const { business } = siteConfig;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}#localbusiness`,
    name: business.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.street}, Ste ${business.address.suite}`,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: 'US',
    },
    telephone: business.phone,
    url: BASE_URL,
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };
}

// ============================================================================
// Person — per LO. NMLS as PropertyValue identifier per CLAUDE.md
// Compliance Rule. worksFor anchors to the FinancialService #organization
// node so search engines understand the relationship.
// ============================================================================

export function personSchema(lo: LoanOfficer): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/team/${lo.slug}#person`,
    name: lo.name,
    jobTitle: lo.role,
    worksFor: { '@id': `${BASE_URL}#organization` },
    email: lo.email,
    url: `${BASE_URL}/team/${lo.slug}`,
    description: lo.bio,
    knowsLanguage: lo.languages.map(languageName),
    identifier: {
      '@type': 'PropertyValue',
      name: 'NMLS',
      value: lo.nmls,
    },
  };
}

// ============================================================================
// Service — per loan program. Provider anchors to #organization.
// areaServed lists all 9 licensed states.
// ============================================================================

export function serviceSchema(program: LoanProgram): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: program.name,
    serviceType: 'Mortgage Origination',
    provider: { '@id': `${BASE_URL}#organization` },
    description: program.blurb,
    areaServed: siteConfig.business.licensedStatesLong.map((s) => ({
      '@type': 'State',
      name: s,
    })),
    url: `${BASE_URL}/services/${program.slug}`,
    eligibleCustomerType: program.eligibility,
  };
}

// ============================================================================
// FAQPage — list of Question/Answer pairs. Caller passes a flat array of
// { q, a } objects; we wrap in mainEntity per Schema.org FAQPage spec.
// ============================================================================

export function faqPageSchema(faqs: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

// ============================================================================
// Helper — wraps any schema object into the {__html: ...} shape required by
// React's dangerouslySetInnerHTML prop. This is the Next.js-standard pattern
// for inline JSON-LD scripts per the App Router metadata docs.
// ============================================================================

export function schemaScript(schema: JsonLd): { __html: string } {
  return {
    __html: JSON.stringify(schema),
  };
}
