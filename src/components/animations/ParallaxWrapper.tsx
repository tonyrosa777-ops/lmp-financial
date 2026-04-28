'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn, prefersReducedMotion } from '@/lib/utils';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export default function ParallaxWrapper({
  children,
  intensity = 0.3,
  className,
}: ParallaxWrapperProps) {
  const reduced = prefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Translate range scaled by intensity. Default intensity 0.3 → ±60px range.
  const range = 200 * intensity;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}
