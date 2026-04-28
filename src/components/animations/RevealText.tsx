'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn, easings, prefersReducedMotion } from '@/lib/utils';

interface RevealTextProps {
  text: string;
  type?: 'words' | 'chars';
  stagger?: number;
  delay?: number;
  className?: string;
}

export default function RevealText({
  text,
  type = 'words',
  stagger = 0.05,
  delay = 0,
  className,
}: RevealTextProps) {
  const reduced = prefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  if (reduced) {
    return <span className={cn(className)}>{text}</span>;
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easings.entrance },
    },
  };

  if (type === 'words') {
    const words = text.split(' ');
    return (
      <motion.span
        ref={ref}
        className={cn(className)}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ display: 'inline-block' }}
      >
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <motion.span
              variants={childVariants}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </motion.span>
    );
  }

  // chars: split by word, then by character — preserves spaces between words
  const words = text.split(' ');
  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ display: 'inline-block' }}
    >
      {words.map((word, wIdx) => (
        <React.Fragment key={`w-${wIdx}`}>
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {Array.from(word).map((char, cIdx) => (
              <motion.span
                key={`c-${wIdx}-${cIdx}`}
                variants={childVariants}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wIdx < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </motion.span>
  );
}
