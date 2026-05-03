/**
 * i18n.ts — lightweight i18n utilities for LMP Financial.
 * Custom React Context + cookie pattern (next-intl/next-i18next would be overkill).
 * Pattern ported from Sylvia Rich Hungarian Consul (tonyrosa777-ops/Sylvia-Rich-Hungary-Consul-NE).
 * Locale set: EN (default) + ES + PT (Brazilian Portuguese, added 2026-05-02 for
 * Lowell's BR-American audience — LMP's highest-leverage demographic wedge).
 */

export type Locale = 'en' | 'es' | 'pt';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'es', 'pt'];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE = 'NEXT_LOCALE';

/** Resolve a dot-notation key path against an object. Returns undefined if not found. */
export function resolvePath(obj: Record<string, unknown>, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

/** Parse locale from cookie string (server-side, App Router). */
export function parseLocaleCookie(cookieHeader: string | null | undefined): Locale {
  if (!cookieHeader) return DEFAULT_LOCALE;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]*)`));
  const value = match?.[1];
  return SUPPORTED_LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE;
}

/** Set locale cookie (client-side). 1-year max-age, SameSite=Lax. */
export function setLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

/** Map locale → OpenGraph locale string. */
export function ogLocale(locale: Locale): string {
  switch (locale) {
    case 'es': return 'es_US';
    case 'pt': return 'pt_BR';
    case 'en':
    default:   return 'en_US';
  }
}
