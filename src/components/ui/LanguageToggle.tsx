'use client';
import { useI18n } from '@/contexts/I18nContext';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n';

const LANGS: { locale: Locale; label: string; ariaLabel: string }[] = [
  { locale: 'en', label: 'EN', ariaLabel: 'Switch to English' },
  { locale: 'es', label: 'ES', ariaLabel: 'Cambiar a español' },
];

/**
 * LanguageToggle — segmented pill control, EN / ES.
 * Active locale: solid brass (var(--accent) #C5A572) with deep-navy text.
 * Inactive: muted cream, hover lifts to ~70% opacity.
 *
 * size="sm" — desktop nav inline use (default)
 * size="md" — mobile drawer footer use
 *
 * Pattern ported from Sylvia Rich Hungarian Consul (EN/HU). LMP serves a large
 * Spanish-speaking borrower population across MA + 8 other licensed states;
 * the toggle persists locale via NEXT_LOCALE cookie + re-renders client-side.
 */
export function LanguageToggle({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'flex items-center rounded-[3px] border p-[3px] gap-[3px]',
      )}
      style={{
        borderColor: 'var(--accent-muted)',
        background: 'rgba(6, 16, 33, 0.55)',
      }}
    >
      {LANGS.map(({ locale: lang, label, ariaLabel }) => {
        const active = locale === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLocale(lang)}
            aria-pressed={active}
            aria-label={ariaLabel}
            className={cn(
              'rounded-[2px] font-mono uppercase tracking-[0.1em] transition-all duration-200 select-none cursor-pointer',
              size === 'sm'
                ? 'px-2.5 py-[5px] text-[10px]'
                : 'px-4 py-2 text-[11px]',
            )}
            style={
              active
                ? {
                    background: 'var(--accent)',
                    color: 'var(--primary-deep)',
                    fontWeight: 600,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                  }
                : {
                    color: 'rgba(245, 239, 226, 0.42)',
                  }
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
