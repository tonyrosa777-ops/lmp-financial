'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn, durations, easings, prefersReducedMotion } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = durations.base,
  threshold = 0.2,
  className,
}: FadeInProps) {
  const reduced = prefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay, ease: easings.entrance }}
    >
      {children}
    </motion.div>
  );
}
