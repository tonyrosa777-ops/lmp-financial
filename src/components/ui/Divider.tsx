/**
 * Divider — gold-tinted gradient horizontal rule.
 *
 * Fades from transparent → --accent-muted → transparent. Three weights for
 * structural emphasis (thin = section internal, medium = section break,
 * thick = page break / hero cap).
 *
 * Server component. Tokens consumed: --accent-muted.
 */

import { cn } from '@/lib/utils';

type DividerWidth = 'thin' | 'medium' | 'thick';

interface DividerProps {
  width?: DividerWidth;
  className?: string;
}

const WIDTH_CLASSES: Record<DividerWidth, string> = {
  thin: 'h-px',
  medium: 'h-0.5',
  thick: 'h-1',
};

function Divider({ width = 'thin', className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        'w-full bg-gradient-to-r from-transparent via-[var(--accent-muted)] to-transparent',
        WIDTH_CLASSES[width],
        className
      )}
    />
  );
}

export default Divider;
