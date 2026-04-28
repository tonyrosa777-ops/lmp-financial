/**
 * Badge — compact pill-shaped status/label indicator.
 *
 * Used for: status chips ("FUNDED", "ELIGIBLE", "PRE-APPROVED"), tag pills on
 * blog cards, NMLS-prefixed identifiers, eyebrow chips above hero copy.
 * Mono uppercase typography — see design-system.md §10.
 *
 * Server component. Tokens consumed: --accent, --accent-muted, --success,
 * --error, --bg-card-dark, --text-secondary, --border-dark, --radius-pill.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeColor = 'gold' | 'success' | 'error' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
}

const COLOR_CLASSES: Record<BadgeColor, string> = {
  gold: 'bg-[rgba(197,165,114,0.15)] text-[var(--accent)] border border-[var(--accent-muted)]',
  success: 'bg-[rgba(92,138,111,0.15)] text-[var(--success)]',
  error: 'bg-[rgba(184,84,80,0.15)] text-[var(--error)]',
  neutral:
    'bg-[var(--bg-card-dark)] text-[var(--text-secondary)] border border-[var(--border-dark)]',
};

function Badge({ children, color = 'gold', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-[var(--radius-pill)] font-mono text-[0.6875rem] uppercase tracking-[0.08em] font-semibold',
        COLOR_CLASSES[color],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
