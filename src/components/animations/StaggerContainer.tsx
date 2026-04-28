'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn, prefersReducedMotion } from '@/lib/utils';

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  threshold?: number;
  className?: string;
}

export default function StaggerContainer({
  children,
  staggerDelay = 0.1,
  threshold = 0.2,
  className,
}: StaggerContainerProps) {
  const reduced = prefersReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
    >
      {children}
    </motion.div>
  );
}
