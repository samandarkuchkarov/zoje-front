'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  const t = useTranslations('home.cta');
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-12 md:py-20 bg-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white text-balance">
            {t('title')}
          </h2>
          <p className="mt-4 text-white/70 text-pretty max-w-xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="mt-8">
            <Link href="/catalog">
              <Button
                size="lg"
                className="bg-white text-brand hover:bg-brand-light font-semibold gap-2 shadow-lg"
              >
                {t('button')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
