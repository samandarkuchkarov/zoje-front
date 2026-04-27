'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
};

export function SectionHeader({ title, subtitle, className, align = 'left' }: Props) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(align === 'center' && 'text-center mx-auto max-w-2xl', className)}
    >
      <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-pretty">{subtitle}</p>
      )}
    </motion.div>
  );
}
