'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Award, Building2, MapPin, ShieldCheck, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

const statKeys = ['founded', 'clients', 'regions', 'experience'] as const;
const statValues = ['2014', '5000+', '12', '10+'] as const;
const statIcons = [Building2, Users, MapPin, Award];

export function AboutCompanySection() {
  const t = useTranslations('home.aboutCompany');
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(27,122,58,0.13),transparent_34%),radial-gradient(circle_at_82%_0%,rgba(212,160,23,0.14),transparent_30%),linear-gradient(135deg,#FFFFFF_0%,#F5FBF7_42%,#EAF6EE_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(27,122,58,0.25),transparent)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, x: -22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[420px] overflow-hidden rounded-2xl border border-border bg-[#0F1B14] shadow-xl shadow-brand/10"
        >
          <div className="repair-grid absolute inset-0 opacity-20" />
          <div className="repair-flow absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent,#D4A017,#1B7A3A,transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgba(27,122,58,0.35))]" />

          <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-accent-gold-light backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t('badge')}
          </div>

          <Image
            src="/company/zoje-uzbekistan-showroom.png"
            alt="ZOJE company showroom"
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,27,20,0.05),rgba(15,27,20,0.52))]" />

          <div className="absolute bottom-5 left-5 right-5 z-10 grid gap-2 sm:grid-cols-3">
            {[t('visual1'), t('visual2'), t('visual3')].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold leading-snug text-white/90 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-light px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-brand">
            <Building2 className="h-3.5 w-3.5" />
            {t('eyebrow')}
          </div>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-balance md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground text-pretty md:text-lg">
            {t('subtitle')}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statKeys.map((key, index) => {
              const Icon = statIcons[index];
              return (
                <div key={key} className="rounded-lg border border-border bg-white p-4 shadow-sm">
                  <Icon className="mb-3 h-5 w-5 text-brand" />
                  <p className="font-heading text-2xl font-extrabold text-foreground">{statValues[index]}</p>
                  <p className="mt-1 text-xs font-semibold leading-snug text-muted-foreground">{t('stats.' + key)}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-3 border-l-2 border-brand/20 pl-5">
            <p className="text-sm leading-6 text-muted-foreground text-pretty">{t('point1')}</p>
            <p className="text-sm leading-6 text-muted-foreground text-pretty">{t('point2')}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about">
              <Button className="gap-2 bg-brand text-white hover:bg-brand-deep">
                {t('button')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="gap-2">
                {t('contact')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
