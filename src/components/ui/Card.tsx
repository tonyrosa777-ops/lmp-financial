/**
 * Card — surface container for content blocks (loan programs, LO bios,
 * testimonial cells, stat tiles, blog cards).
 *
 * Two visual variants: 'dark' (default — for dark gradient sections) and
 * 'light' (for cream sections). Optional href wraps the card in next/link.
 * Hover lift is on by default; opt out for static contexts.
 *
 * Server component — no client-side state. Tokens consumed: --bg-card-dark,
 * --bg-card, --border-dark, --accent-muted, --shadow-md, --shadow-lg,
 * --radius-xl.
 */

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'dark' | 'light';
type CardElement = 'div' | 'article' | 'section';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  hover?: boolean;
  href?: string;
  as?: CardElement;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  dark: 'bg-[var(--bg-card-dark)] border border-[var(--border-dark)] backdrop-blur-sm',
  light: 'bg-[var(--bg-card)] shadow-[var(--shadow-md)]',
};

const HOVER_CLASSES: Record<CardVariant, string> = {
  dark:
    'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:border-[var(--accent-muted)]',
  light:
    'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]',
};

function Card({
  children,
  variant = 'dark',
  className,
  hover = true,
  href,
  as = 'div',
}: CardProps) {
  const composed = cn(
    'block rounded-[var(--radius-xl)] p-6',
    VARIANT_CLASSES[variant],
    hover && HOVER_CLASSES[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={composed}>
        {children}
      </Link>
    );
  }

  const Tag = as;
  return <Tag className={composed}>{children}</Tag>;
}

export default Card;
