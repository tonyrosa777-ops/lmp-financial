'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn, prefersReducedMotion } from '@/lib/utils';

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function CountUp({
  end,
  duration = 1.6,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) {
  const reduced = prefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const [value, setValue] = useState<number>(reduced ? end : 0);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef<boolean>(false);

  useEffect(() => {
    if (reduced) {
      setValue(end);
      return;
    }
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [inView, end, duration, reduced]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
