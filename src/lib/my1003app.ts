/**
 * src/lib/my1003app.ts
 *
 * Centralized URL builder for the LO-specific my1003app.com (ARIVE-hosted)
 * application destination. Phase 1J: every link out to my1003app must carry
 * UTM attribution so Mike can see how many borrowers reach the application
 * from which surface (LO landing page vs. Borrower Portal vs. anywhere else).
 *
 * Phase 3 / Mike-question: ARIVE may also accept URL-param prefill
 * (firstName, lastName, email, phone). When confirmed, pass `prefill` and the
 * builder appends those params alongside the UTM tags. Until confirmed, prefill
 * is silently dropped — no broken-app risk on the my1003app side.
 *
 * Single source of truth: every "Continue your application" CTA on lmpfinancial.com
 * routes through this builder. Never hand-roll URL strings against my1003appUrl.
 */

export interface My1003AppPrefill {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export type My1003AppMedium =
  | 'lo_page'
  | 'borrower_portal'
  | 'team_index'
  | 'quiz_results'
  | 'homepage'
  | 'footer';

export interface BuildMy1003AppUrlOptions {
  /** The LO's raw `*.my1003app.com/<id>/register` URL from siteConfig.loanOfficers[i].my1003appUrl */
  baseUrl: string;
  /** The LO slug — emitted as the `lo` UTM param so attribution carries even after the click. */
  loSlug: string;
  /** Where on lmpfinancial.com the click came from. Drives utm_medium. */
  medium: My1003AppMedium;
  /** Optional prefill — only applied when ARIVE confirmation is received (Mike-question, Phase 3). */
  prefill?: My1003AppPrefill;
}

/**
 * Build a fully-tagged my1003app deep link.
 *
 * @example
 *   buildMy1003AppUrl({
 *     baseUrl: lo.my1003appUrl,
 *     loSlug: lo.slug,
 *     medium: 'lo_page',
 *   })
 *   // → https://mikecomerford.my1003app.com/184368/register
 *   //     ?utm_source=lmpfinancial.com
 *   //     &utm_medium=lo_page
 *   //     &utm_campaign=continue_application
 *   //     &lo=mike-comerford
 */
export function buildMy1003AppUrl(options: BuildMy1003AppUrlOptions): string {
  const { baseUrl, loSlug, medium, prefill } = options;

  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    // Malformed base URL — fall through to the original string so we don't
    // crash the page. The bad URL will surface in the LO record itself.
    return baseUrl;
  }

  // UTM attribution — always applied.
  url.searchParams.set('utm_source', 'lmpfinancial.com');
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', 'continue_application');
  url.searchParams.set('lo', loSlug);

  // Prefill — applied only when explicitly supplied. Param names mirror the
  // common ARIVE-hosted `register` form fields. Unsupported keys silently
  // ignored on the my1003app side, so this is forward-safe.
  if (prefill?.firstName) url.searchParams.set('firstName', prefill.firstName);
  if (prefill?.lastName) url.searchParams.set('lastName', prefill.lastName);
  if (prefill?.email) url.searchParams.set('email', prefill.email);
  if (prefill?.phone) url.searchParams.set('phone', prefill.phone);

  return url.toString();
}
