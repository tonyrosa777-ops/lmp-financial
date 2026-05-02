'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { siteConfig } from '@/data/site';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import MobileNav from './MobileNav';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { status } = useSession();
  const isAuthed = status === 'authenticated';

  // Scroll-state listener — flips nav from transparent to navy backdrop after 20px
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll(); // sync on mount (handles refresh-while-scrolled)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ctaPrimary = siteConfig.hero.ctaPrimary;
  const phone = siteConfig.business.phone;

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
            aria-label={`${siteConfig.business.name} home`}
          >
            {siteConfig.business.name}
          </Link>

          {/* Center — desktop nav links (lg+) */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-7">
              {siteConfig.nav.map((item) => {
                if (item.isCta) return null; // CTA rendered in right cluster
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-sm transition-colors"
                      style={{
                        color: item.isInternal
                          ? 'var(--accent)'
                          : 'var(--text-secondary)',
                      }}
                    >
                      {item.isInternal ? (
                        <>
                          <span style={{ color: 'var(--accent)' }} aria-hidden="true">
                            ⬥{' '}
                          </span>
                          {item.label}
                        </>
                      ) : (
                        item.label
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right — language toggle + phone + primary CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* EN/ES language toggle — desktop only. Sylvia-pattern port. */}
            <div className="hidden lg:flex">
              <LanguageToggle size="sm" />
            </div>

            {/* Phone — desktop only */}
            {phone ? (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="hidden xl:inline font-mono text-micro transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {phone}
              </a>
            ) : null}

            {/* Auth-aware portal link — Sign In when logged out, My Account when logged in.
                Phase 1J. Hidden on small screens where the mobile drawer carries it. */}
            <Link
              href={isAuthed ? '/account' : '/account/sign-in'}
              className="hidden lg:inline font-body text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              {isAuthed ? 'My Account' : 'Sign In'}
            </Link>

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
              aria-label="Open navigation"
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
