'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  const t = useTranslations('home.hero');
  const shouldReduce = useReducedMotion();

  const words = t('title').split(' ');

  return (
    <section className="relative min-h-[75vh] sm:min-h-[90vh] flex items-center overflow-hidden hero-gradient">
      <div className="absolute inset-0 -z-10 hero-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge className="mb-6 bg-brand-light text-brand border-brand/20 hover:bg-brand-light">
                <Zap className="w-3 h-3 mr-1" />
                {t('badge')}
              </Badge>
            </motion.div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.3em]"
                >
                  {i < 2 ? (
                    <span className="text-brand">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-6 text-lg text-muted-foreground max-w-lg text-pretty"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="/catalog">
                <Button
                  size="lg"
                  className="bg-brand hover:bg-brand-deep text-white font-semibold gap-2 animate-glow-pulse shadow-lg shadow-brand/20"
                >
                  {t('cta')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2">
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-brand/20 bg-brand-light px-5 py-3"
            >
              <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{t('warrantyLabel')}</p>
                <p className="text-xl font-extrabold text-brand leading-tight">{t('warrantyValue')}</p>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:flex justify-center">
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="animate-float"
            >
              <div className="w-[420px] h-[420px] rounded-3xl bg-brand-light border border-brand/10 flex items-center justify-center shadow-2xl shadow-brand/10 relative overflow-hidden">
                <Image
                  src="/hero/zoje-zj-m7-hero.png"
                  alt="ZOJE ZJ-M7 automatic industrial sewing machine"
                  fill
                  preload
                  sizes="420px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
