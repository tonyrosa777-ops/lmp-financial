'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn, durations, easings, prefersReducedMotion } from '@/lib/utils';

interface SlideInProps {
  children: React.ReactNode;
  direction: 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function SlideIn({
  children,
  direction,
  delay = 0,
  duration = durations.base,
  threshold = 0.2,
  className,
}: SlideInProps) {
  const reduced = prefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const offset = direction === 'left' ? -40 : 40;

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, x: offset }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: offset }}
      transition={{ duration, delay, ease: easings.entrance }}
    >
      {children}
    </motion.div>
  );
}
