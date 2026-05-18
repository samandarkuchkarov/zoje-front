'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { Shield, Truck, Wrench, Award, ArrowUpRight, type LucideIcon } from 'lucide-react';

const KEYS = ['warranty', 'delivery', 'support', 'original'] as const;
const ICONS: Record<(typeof KEYS)[number], LucideIcon> = {
  warranty: Shield,
  delivery: Truck,
  support: Wrench,
  original: Award,
};

const STATS: Record<
  (typeof KEYS)[number],
  { value: string; unit: { uz: string; ru: string } }
> = {
  warranty: { value: '5', unit: { uz: 'yil', ru: 'лет' } },
  delivery: { value: '1-3', unit: { uz: 'kun', ru: 'дня' } },
  support: { value: '24/7', unit: { uz: 'qo‘llab-quvvatlash', ru: 'поддержка' } },
  original: { value: '100%', unit: { uz: 'original', ru: 'оригинал' } },
};

export function WhyUsSection() {
  const t = useTranslations('home.whyUs');
  const locale = useLocale() as 'uz' | 'ru';
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F7FAF8] py-14 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(27,122,58,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(27,122,58,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-6rem] h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-4rem] h-[360px] w-[360px] rounded-full bg-accent-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
            <span className="h-px w-6 bg-brand" />
            {locale === 'ru' ? 'Наши преимущества' : 'Bizning afzalliklar'}
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-balance md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground text-pretty md:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {KEYS.map((key, i) => {
            const Icon = ICONS[key];
            const stat = STATS[key];
            const num = String(i + 1).padStart(2, '0');
            return (
              <motion.div
                key={key}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/15"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.12] transition-opacity duration-300 group-hover:opacity-[0.22]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(27,122,58,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(27,122,58,0.2) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/0 blur-3xl transition-all duration-500 group-hover:bg-brand/20"
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-heading text-[110px] font-extrabold leading-none text-brand/[0.06] transition-colors duration-300 group-hover:text-brand/10"
                >
                  {num}
                </span>

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F1B14] to-[#1A2C20] text-brand-light shadow-lg shadow-black/20 ring-1 ring-white/5">
                        <Icon className="h-6 w-6" strokeWidth={2.25} />
                      </div>
                      <span
                        aria-hidden
                        className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-brand shadow-sm shadow-brand/40"
                      >
                        <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-muted-foreground/70">
                      {num}
                    </span>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-extrabold leading-none text-brand md:text-5xl">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/80">
                      {stat.unit[locale]}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-base font-extrabold leading-tight md:text-lg">
                    {t(`${key}.title`)}
                  </h3>
                  <div className="mt-1.5 h-0.5 w-8 origin-left scale-x-50 rounded-full bg-brand/40 transition-all duration-300 group-hover:scale-x-100 group-hover:bg-brand" />
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {t(`${key}.desc`)}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-dashed border-border/70 pt-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand/80">
                      {locale === 'ru' ? 'Гарантировано' : 'Kafolatlangan'}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
