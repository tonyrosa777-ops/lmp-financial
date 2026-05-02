'use client';
import { useI18n } from '@/contexts/I18nContext';
import { resolvePath } from '@/lib/i18n';
import type { Translations } from '@/locales';

/**
 * useTranslation(namespace)
 *
 * Returns:
 *   t(key)       string lookup with dot-notation, falls back to raw key on miss
 *   ta<T>(key)   typed array/object lookup (returns undefined on miss; use ?? for fallback)
 *   locale       current locale ('en' | 'es')
 *   setLocale    switch locale (sets cookie + re-renders)
 *
 * Bilingual Copy Rule (CLAUDE.md): every translatable string in `en/<namespace>.json`
 * must have a matching key in `es/<namespace>.json`. Missing ES keys render the raw
 * dot-notation key (e.g. "hero.tagline") so QA spots them at a glance.
 */
export function useTranslation(namespace: keyof Translations) {
  const { locale, setLocale, t: allTranslations } = useI18n();
  const ns = allTranslations[namespace] as Record<string, unknown>;

  function t(key: string): string {
    const value = resolvePath(ns, key);
    if (typeof value === 'string') return value;
    return key;
  }

  function ta<T>(key: string): T | undefined {
    const value = resolvePath(ns, key);
    return value === undefined ? undefined : (value as T);
  }

  return { t, ta, locale, setLocale };
}
