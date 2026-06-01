'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ROTATE_MS = 5000;

type Slide = {
  eyebrow: string;
  badge: string;
  badgeIcon: LucideIcon;
  titleHighlight: string;
  titleRest: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string; icon?: LucideIcon };
  image: { src: string; alt: string };
  accent: 'green' | 'gold' | 'deep';
};

export function HeroSection() {
  const t = useTranslations('home.hero');
  const locale = useLocale() as 'uz' | 'ru';
  const shouldReduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = useMemo<Slide[]>(
    () => [
      {
        eyebrow: locale === 'ru' ? '01 — Машины' : '01 — Mashinalar',
        badge: t('badge'),
        badgeIcon: Zap,
        titleHighlight: locale === 'ru' ? 'Швейные машины' : 'ZOJE tikuv',
        titleRest: locale === 'ru' ? 'ZOJE' : 'mashinalari',
        subtitle: t('subtitle'),
        primary: { label: t('cta'), href: '/catalog' },
        secondary: { label: t('ctaSecondary'), href: '/contact' },
        image: {
          src: '/hero/zoje-zj-m7-hero.png',
          alt: 'ZOJE ZJ-M7 industrial sewing machine',
        },
        accent: 'green',
      },
      {
        eyebrow: locale === 'ru' ? '02 — Сервис' : '02 — Servis',
        badge:
          locale === 'ru'
            ? 'Сертифицированный сервис ZOJE'
            : 'Sertifikatlangan ZOJE servisi',
        badgeIcon: Wrench,
        titleHighlight:
          locale === 'ru' ? 'Быстрая' : 'Tezkor',
        titleRest:
          locale === 'ru' ? 'диагностика за 24 часа' : 'diagnostika 24 soatda',
        subtitle:
          locale === 'ru'
            ? 'Электроника, мотор, механика и калибровка швейных машин ZOJE — диагностика и ремонт с гарантией.'
            : "Elektronika, motor, mexanika va kalibrlash — ZOJE tikuv mashinalari uchun kafolatli diagnostika va ta'mirlash.",
        primary: {
          label: locale === 'ru' ? 'Заказать сервис' : 'Servisga buyurtma',
          href: '/repair',
        },
        secondary: {
          label: locale === 'ru' ? 'Позвонить' : "Qo'ng'iroq qilish",
          href: 'tel:+998997205511',
          icon: Phone,
        },
        image: {
          src: '/hero/zoje-sewing-machine-hero.png',
          alt: 'ZOJE service diagnostics',
        },
        accent: 'gold',
      },
      {
        eyebrow: locale === 'ru' ? '03 — Запчасти' : '03 — Ehtiyot qismlar',
        badge:
          locale === 'ru'
            ? 'Оригинальные запчасти со склада'
            : 'Ombordagi original qismlar',
        badgeIcon: Sparkles,
        titleHighlight:
          locale === 'ru' ? 'Оригинальные' : 'Original',
        titleRest:
          locale === 'ru' ? 'запчасти ZOJE' : 'ehtiyot qismlar ZOJE',
        subtitle:
          locale === 'ru'
            ? 'Иглы, транспортеры, моторы, платы, ремни и расходники для промышленных и бытовых машин ZOJE — в наличии.'
            : "Igna, transportyor, motor, plata, kamar va sarflanadigan qismlar — ZOJE sanoat va uy mashinalari uchun omborda mavjud.",
        primary: {
          label: locale === 'ru' ? 'Смотреть запчасти' : "Qismlarni ko'rish",
          href: '/catalog/spare-parts',
        },
        secondary: {
          label: locale === 'ru' ? 'Связаться' : "Bog'lanish",
          href: '/contact',
        },
        image: {
          src: '/hero/third.png',
          alt: 'ZOJE original spare parts',
        },
        accent: 'deep',
      },
    ],
    [locale, t]
  );

  useEffect(() => {
    if (paused || shouldReduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, shouldReduce, slides.length]);

  const slide = slides[index];
  const BadgeIcon = slide.badgeIcon;
  const SecondaryIcon = slide.secondary.icon;
  const accentStops = {
    green: { from: '#E8F5EC', to: '#D9EFE0' },
    gold: { from: '#FDF3D3', to: '#E8F5EC' },
    deep: { from: '#D9EFE0', to: '#C7E7D2' },
  }[slide.accent];

  return (
    <section
      className="relative min-h-0 lg:min-h-[620px] flex items-start overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label={locale === 'ru' ? 'Главный баннер' : 'Asosiy banner'}
    >
      <div className="absolute inset-0 -z-10 hero-gradient" />
      <AnimatePresence>
        <motion.div
          key={`bg-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at top left, ${accentStops.from}, transparent 55%), radial-gradient(ellipse at bottom right, ${accentStops.to}, transparent 55%)`,
          }}
        />
      </AnimatePresence>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 h-[360px] w-[360px] rounded-full bg-accent-gold/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={`eyebrow-${index}`}
                initial={shouldReduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3 }}
                className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-brand"
              >
                <span className="h-px w-6 bg-brand" />
                {slide.eyebrow}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${index}`}
                initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <Badge className="mb-6 bg-brand-light text-brand border-brand/20 hover:bg-brand-light">
                  <BadgeIcon className="w-3 h-3 mr-1" />
                  {slide.badge}
                </Badge>
              </motion.div>
            </AnimatePresence>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance min-h-[2.4em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`title-${index}`}
                  initial={shouldReduce ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  <span className="text-brand">{slide.titleHighlight}</span>{' '}
                  <span className="block sm:inline">{slide.titleRest}</span>
                </motion.span>
              </AnimatePresence>
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${index}`}
                initial={shouldReduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mt-6 text-lg text-muted-foreground max-w-lg text-pretty"
              >
                {slide.subtitle}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${index}`}
                initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link href={slide.primary.href}>
                  <Button
                    size="lg"
                    className="bg-brand hover:bg-brand-deep text-white font-semibold gap-2 animate-glow-pulse shadow-lg shadow-brand/20"
                  >
                    {slide.primary.label}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                {slide.secondary.href.startsWith('tel:') ? (
                  <a href={slide.secondary.href}>
                    <Button size="lg" variant="outline" className="gap-2">
                      {SecondaryIcon && <SecondaryIcon className="w-4 h-4" />}
                      {slide.secondary.label}
                    </Button>
                  </a>
                ) : (
                  <Link href={slide.secondary.href}>
                    <Button size="lg" variant="outline" className="gap-2">
                      {SecondaryIcon && <SecondaryIcon className="w-4 h-4" />}
                      {slide.secondary.label}
                    </Button>
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-brand/20 bg-brand-light/80 px-5 py-3 backdrop-blur"
            >
              <ShieldCheck className="w-8 h-8 text-brand shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                  {t('warrantyLabel')}
                </p>
                <p className="text-xl font-extrabold text-brand leading-tight">
                  {t('warrantyValue')}
                </p>
              </div>
            </motion.div>

            <div
              className="mt-10 flex items-center gap-4"
              role="tablist"
              aria-label={locale === 'ru' ? 'Слайды' : 'Slaydlar'}
            >
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
                <span className="mx-1 text-muted-foreground/40">/</span>
                {String(slides.length).padStart(2, '0')}
              </span>
              <div
                className="flex items-center gap-2"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`${locale === 'ru' ? 'Слайд' : 'Slayd'} ${i + 1}`}
                    onClick={() => setIndex(i)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                    className="group relative h-1.5 overflow-hidden rounded-full transition-[width] duration-500 ease-out"
                    style={{ width: i === index ? 40 : 14 }}
                  >
                    <span
                      className={
                        i === index
                          ? 'absolute inset-0 rounded-full bg-brand/15'
                          : 'absolute inset-0 rounded-full bg-foreground/15 transition-colors group-hover:bg-foreground/30'
                      }
                    />
                    {i === index && (
                      <motion.span
                        key={`fill-${index}-${paused ? 'p' : 'r'}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                          duration: paused || shouldReduce ? 0 : ROTATE_MS / 1000,
                          ease: 'linear',
                        }}
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand via-brand to-accent-gold"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative w-[460px] h-[460px]">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2.4rem] bg-gradient-to-br from-brand/15 via-transparent to-accent-gold/10 blur-2xl"
              />
              <div className="absolute inset-0 animate-float">
                <div className="absolute inset-0 rounded-3xl border border-brand/15 bg-gradient-to-br from-brand-light via-white to-brand-muted shadow-2xl shadow-brand/15 overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.18]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(27,122,58,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(27,122,58,0.18) 1px, transparent 1px)',
                      backgroundSize: '36px 36px',
                    }}
                  />
                  <motion.div
                    aria-hidden
                    initial={{ y: '-30%' }}
                    animate={{ y: '130%' }}
                    transition={{
                      duration: 5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'mirror',
                    }}
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`img-${index}`}
                      initial={shouldReduce ? false : { opacity: 0, scale: 1.05, x: 24 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: -24 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={slide.image.src}
                        alt={slide.image.alt}
                        fill
                        priority={index === 0}
                        sizes="460px"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`tag-${index}`}
                    initial={shouldReduce ? false : { opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="absolute -bottom-3 left-6 right-6 rounded-2xl border border-brand/15 bg-white/95 px-4 py-3 shadow-xl shadow-brand/10 backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-md shadow-brand/30">
                        <BadgeIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand">
                          {slide.eyebrow}
                        </p>
                        <p className="truncate text-sm font-bold text-foreground">
                          {slide.badge}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
