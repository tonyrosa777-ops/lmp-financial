'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { siteConfig } from '@/data/site';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useTranslation } from '@/hooks/useTranslation';
import MobileNav from './MobileNav';

interface TranslatedNavItem {
  href: string;
  label: string;
  isInternal?: boolean;
}

// Hrefs that move into the "More" dropdown on desktop. Mobile drawer keeps
// the flat list. Internal/Optimus tools (currently /pricing) belong here so
// the public-facing top-line nav stays focused on borrower conversion paths.
const MORE_DROPDOWN_HREFS = new Set(['/team', '/blog', '/pricing']);

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const { status } = useSession();
  const isAuthed = status === 'authenticated';
  const { t, ta } = useTranslation('common');

  // Scroll-state listener — flips nav from transparent to navy backdrop after 20px
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll(); // sync on mount (handles refresh-while-scrolled)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the More dropdown on outside click + Escape.
  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [moreOpen]);

  // Close dropdown when route changes.
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const phone = siteConfig.business.phone;
  const businessName = siteConfig.business.name;

  // Navigation labels come from the translated nav.items array; CTA fields
  // come from the translated nav.ctaPrimary object. siteConfig.nav stays as
  // fallback if the JSON lookup misses (defensive — JSON should always have it).
  const navItems =
    ta<TranslatedNavItem[]>('nav.items') ??
    siteConfig.nav.filter((n) => !n.isCta);

  const primaryItems = navItems.filter((i) => !MORE_DROPDOWN_HREFS.has(i.href));
  const moreItems = navItems.filter((i) => MORE_DROPDOWN_HREFS.has(i.href));

  const ctaPrimary =
    ta<{ label: string; href: string }>('nav.ctaPrimary') ??
    siteConfig.hero.ctaPrimary;

  const homeAriaLabel = t('nav.homeAriaTemplate').replace(
    '{businessName}',
    businessName,
  );

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          height: 'clamp(80px, 9vw, 112px)',
          background: scrolled ? 'color-mix(in srgb, var(--primary-deep) 95%, transparent)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-dark)' : '1px solid transparent',
        }}
      >
        <div className="container-wide flex h-full items-center justify-between gap-6 px-6">
          {/* Left — brand wordmark */}
          <Link
            href="/"
            className="font-display text-h3 transition-colors"
            style={{ color: 'var(--text-primary)' }}
            aria-label={homeAriaLabel}
          >
            {businessName}
          </Link>

          {/* Center — desktop nav links (lg+) */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label={t('nav.primaryAriaLabel')}
          >
            <ul className="flex items-center gap-7">
              {primaryItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {/* "More" dropdown — Team, Blog, internal Pricing tucked away */}
              {moreItems.length > 0 && (
                <li ref={moreRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setMoreOpen((v) => !v)}
                    aria-expanded={moreOpen}
                    aria-haspopup="menu"
                    aria-label={t('nav.moreAriaLabel')}
                    className="font-body text-sm transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    style={{
                      color: moreOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {t('nav.moreLabel')}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 inline-block"
                      style={{
                        fontSize: '0.65rem',
                        transform: moreOpen ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    >
                      ▾
                    </span>
                  </button>

                  {moreOpen && (
                    <ul
                      role="menu"
                      className="absolute right-0 top-full mt-3 min-w-[200px] rounded-md py-2 shadow-2xl"
                      style={{
                        background: 'var(--primary-deep)',
                        border: '1px solid var(--border-dark)',
                      }}
                    >
                      {moreItems.map((item) => (
                        <li key={item.href} role="none">
                          <Link
                            href={item.href}
                            role="menuitem"
                            onClick={() => setMoreOpen(false)}
                            className="block px-4 py-2.5 font-body text-sm transition-colors"
                            style={{
                              color: item.isInternal
                                ? 'var(--accent)'
                                : 'var(--text-primary)',
                            }}
                          >
                            {item.isInternal ? (
                              <>
                                <span aria-hidden="true">⬥ </span>
                                {item.label}
                              </>
                            ) : (
                              item.label
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </nav>

          {/* Right — language toggle + phone + primary CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* EN/ES/PT language toggle — desktop only. Sylvia-pattern port. */}
            <div className="hidden lg:flex">
              <LanguageToggle size="sm" />
            </div>

            {/* Phone — icon-only on desktop. Tap-to-call via tel: link, the full
                number lives in the title tooltip + aria-label. Modern luxury
                pattern (Linear/Stripe/Vercel) — keeps the call affordance while
                freeing horizontal space for the primary CTA. */}
            {phone ? (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{
                  background: 'rgba(245, 239, 226, 0.06)',
                  color: 'var(--text-secondary)',
                }}
                aria-label={t('callAriaTemplate').replace('{phone}', phone)}
                title={phone}
              >
                <span aria-hidden="true" style={{ fontSize: '1.1rem', lineHeight: 1 }}>
                  📞
                </span>
              </a>
            ) : null}

            {/* Auth-aware portal link — Sign In when logged out, My Account when logged in.
                Phase 1J. Hidden on small screens where the mobile drawer carries it. */}
            <Link
              href={isAuthed ? '/account' : '/account/sign-in'}
              className="hidden lg:inline font-body text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              {isAuthed ? t('auth.myAccount') : t('auth.signIn')}
            </Link>

            {/* Hairline divider — separates utility cluster (language + phone + sign in)
                from the primary CTA so Get Pre-Approved reads as the dominant action. */}
            <span
              aria-hidden="true"
              className="hidden lg:block h-7 w-px ml-1"
              style={{ background: 'rgba(245, 239, 226, 0.28)' }}
            />

            {/* Primary CTA — desktop */}
            <Link
              href={ctaPrimary.href}
              className="hidden lg:inline-flex items-center justify-center rounded-md font-body font-semibold transition-all"
              style={{
                background: 'var(--accent)',
                color: 'var(--primary-deep)',
                padding: '0.625rem 1.25rem',
                fontSize: '0.9375rem',
                letterSpacing: '-0.005em',
              }}
            >
              {ctaPrimary.label}
            </Link>

            {/* Mobile hamburger — visible <lg */}
            <button
              type="button"
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-md"
              onClick={() => setMobileOpen(true)}
              aria-label={t('nav.openNav')}
              aria-expanded={mobileOpen}
              style={{ color: 'var(--text-primary)' }}
            >
              <span aria-hidden="true" style={{ fontSize: '1.5rem', lineHeight: 1 }}>
                ☰
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — owns its own z-50 layers */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
