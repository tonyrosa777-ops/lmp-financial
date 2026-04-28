'use client';

/**
 * Button — primary interactive primitive for LMP Financial.
 *
 * Three variants × three sizes, polymorphic over button / Link / external <a>.
 * All hover, focus, disabled, and loading states wired to design-system.md §10.
 *
 * Tokens consumed: --accent, --accent-deep, --primary-deep, --shadow-glow-gold,
 *                  --radius-md.
 */

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
}

const BASE_CLASSES =
  'inline-flex items-center justify-center font-body font-semibold rounded-[var(--radius-md)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--accent)] text-[var(--primary-deep)] hover:bg-[var(--accent-deep)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-gold)]',
  secondary:
    'bg-transparent text-[var(--accent)] border-[1.5px] border-[var(--accent)] hover:bg-[rgba(197,165,114,0.08)]',
  tertiary:
    'bg-transparent text-[var(--accent)] border-b border-transparent hover:border-[var(--accent)] rounded-none px-1',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4 text-lg',
};

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
    />
  );
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className,
  fullWidth = false,
  ariaLabel,
}: ButtonProps) {
  const isInactive = disabled || loading;

  const composed = cn(
    BASE_CLASSES,
    // tertiary handles its own padding/border-radius reset
    variant !== 'tertiary' && SIZE_CLASSES[size],
    variant === 'tertiary' && (size === 'sm' ? 'text-sm py-1' : size === 'lg' ? 'text-lg py-1' : 'text-base py-1'),
    VARIANT_CLASSES[variant],
    fullWidth && 'w-full',
    isInactive && 'opacity-60 cursor-not-allowed pointer-events-none',
    className
  );

  const inner = loading ? (
    <span className="inline-flex items-center justify-center gap-2">
      <Spinner />
      <span className="sr-only">Loading</span>
    </span>
  ) : (
    children
  );

  if (href && !isInactive) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={composed}
          aria-label={ariaLabel}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={composed} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isInactive}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={composed}
    >
      {inner}
    </button>
  );
}

export default Button;
