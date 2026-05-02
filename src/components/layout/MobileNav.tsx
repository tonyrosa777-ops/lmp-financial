'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { siteConfig } from '@/data/site';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const { status } = useSession();
  const isAuthed = status === 'authenticated';

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const ctaPrimary = siteConfig.hero.ctaPrimary;
  const phone = siteConfig.business.phone;

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-[min(85%,360px)] flex flex-col lg:hidden"
            style={{
              background: 'var(--primary-deep)',
              borderLeft: '1px solid var(--border-dark)',
            }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid var(--border-dark)' }}
            >
              <Link
                href="/"
                onClick={onClose}
                className="font-display text-h3 transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                {siteConfig.business.name}
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="flex h-11 w-11 items-center justify-center rounded-md transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <span aria-hidden="true" style={{ fontSize: '1.75rem', lineHeight: 1 }}>
                  ✕
                </span>
              </button>
            </div>

            {/* Nav list */}
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="flex flex-col gap-1">
                {siteConfig.nav.map((item) => {
                  const isCta = item.isCta === true;
                  if (isCta) return null; // CTA rendered below in fixed footer
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-4 text-h4 font-display transition-colors"
                        style={{
                          color: item.isInternal
                            ? 'var(--accent)'
                            : 'var(--text-primary)',
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

            {/* Drawer footer: language, phone, primary CTA */}
            <div
              className="px-6 py-6 flex flex-col gap-4"
              style={{ borderTop: '1px solid var(--border-dark)' }}
            >
              {/* EN/ES language toggle — Sylvia-pattern port. */}
              <LanguageToggle size="md" />

              {/* Phone */}
              {phone ? (
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="font-mono text-body-sm transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {phone}
                </a>
              ) : null}

              {/* Auth-aware portal link — Phase 1J Borrower Portal */}
              <Link
                href={isAuthed ? '/account' : '/account/sign-in'}
                onClick={onClose}
                className="font-body text-body-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {isAuthed ? 'My Account →' : 'Sign In →'}
              </Link>

              {/* Primary CTA */}
              <Link
                href={ctaPrimary.href}
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md font-body font-semibold transition-all"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--primary-deep)',
                  padding: '0.875rem 1.75rem',
                  letterSpacing: '-0.005em',
                }}
              >
                {ctaPrimary.label}
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
