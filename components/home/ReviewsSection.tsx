'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const ROTATE_MS = 7000;

type Review = {
  name: string;
  image: string;
  role: { uz: string; ru: string };
  brand: string;
  quote: { uz: string; ru: string };
  rating: number;
};

const REVIEWS: Review[] = [
  {
    name: 'Abduvahobov Abdulloh',
    image: '/Abduvahobov.png',
    role: {
      uz: '“Morobolsin” brendi asoschisi',
      ru: 'Основатель бренда «Morobolsin»',
    },
    brand: 'Morobolsin',
    quote: {
      uz: "Biz professional oshpazlar uchun forma ishlab chiqaramiz, shuning uchun tikuv sifati biz uchun juda muhim. Zoje mashinalari bilan ishlaganimizdan beri ishimiz ancha tezlashdi va sifat ham ancha yaxshilandi. Eng muhimi — mashinalar ishonchli va og‘ir yuklamada ham muammosiz ishlaydi. Zoje — bu bizning ishlab chiqarishdagi asosiy tayanchimiz.",
      ru: 'Мы производим форму для профессиональных поваров, поэтому качество шитья для нас очень важно. С тех пор как работаем на машинах Zoje, наша работа стала значительно быстрее, а качество — заметно лучше. Главное — машины надёжные и без сбоев справляются с большой нагрузкой. Zoje — наша главная опора в производстве.',
    },
    rating: 5,
  },
  {
    name: 'Muslima Maxkamova',
    image: '/Muslima.jpg',
    role: {
      uz: 'MMAX akademiyasi asoschisi',
      ru: 'Основатель академии MMAX',
    },
    brand: 'MMAX',
    quote: {
      uz: "Biz akademiyada tikuvchilikni no’ldan o‘rgatamiz va o‘quvchilarimizga sifatli uskunada ishlashni muhim deb bilamiz. Zoje mashinalari o‘rganish uchun ham, professional ishlash uchun ham juda qulay. O‘quvchilarimiz tez o‘zlashtiradi va natijalar ham ancha yaxshi chiqadi. Zoje bilan ishlash — bu o‘sish va ishonch degani.",
      ru: 'В нашей академии мы обучаем шитью с нуля, и нам важно, чтобы ученики работали на качественном оборудовании. Машины Zoje удобны как для обучения, так и для профессиональной работы. Ученики быстро их осваивают, и результаты получаются заметно лучше. Работа с Zoje — это рост и уверенность.',
    },
    rating: 5,
  },
];

type Props = {
  locale: 'uz' | 'ru';
};

export function ReviewsSection({ locale }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduceMotion = useReducedMotion();

  const reviews = useMemo(() => REVIEWS, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % reviews.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, reviews.length]);

  const review = reviews[index];
  const total = reviews.length;
  const labels = {
    eyebrow: locale === 'ru' ? 'Отзывы клиентов' : 'Mijozlar fikri',
    title:
      locale === 'ru'
        ? 'Нам доверяют производства по всему Узбекистану'
        : "O'zbekiston bo'ylab korxonalar bizga ishonadi",
    subtitle:
      locale === 'ru'
        ? 'Реальный опыт от владельцев швейных предприятий, мастерских и брендов, работающих с ZOJE.'
        : "ZOJE bilan ishlayotgan ustaxona egalari, fabrikalar va brendlarning haqiqiy tajribasi.",
    prev: locale === 'ru' ? 'Назад' : 'Oldingi',
    next: locale === 'ru' ? 'Дальше' : 'Keyingi',
    brandLabel: locale === 'ru' ? 'Бренд' : 'Brend',
    verified: locale === 'ru' ? 'Подтверждённый клиент' : 'Tasdiqlangan mijoz',
  };

  const go = (next: number) => {
    setDirection(next > index || (index === total - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  };

  return (
    <section
      className="relative overflow-hidden bg-white py-16 text-foreground md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.eyebrow}
    >
      <div
        aria-hidden
        className="hidden"
      />
      <div className="hidden" />
      <div
        aria-hidden
        className="hidden"
      />
      <div
        aria-hidden
        className="hidden"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-6 bg-brand/60" />
              {labels.eyebrow}
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-balance md:text-5xl">
              {labels.title}
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground text-pretty md:text-lg">
              {labels.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go((index - 1 + total) % total)}
              aria-label={labels.prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-all hover:border-brand/30 hover:text-brand"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go((index + 1) % total)}
              aria-label={labels.next}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-white shadow-lg shadow-brand/30 ring-1 ring-white/15 transition-transform hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-lg shadow-black/5 md:p-10 lg:p-12">
            <Quote
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-8 h-44 w-44 text-brand/[0.05] md:-right-2 md:h-56 md:w-56"
              strokeWidth={1}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-6 select-none font-heading text-[120px] font-extrabold leading-none text-brand/8 md:text-[180px]"
            >
              “
            </span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`review-${index}`}
                custom={direction}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: direction * 40, filter: 'blur(6px)' }
                }
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -direction * 40, filter: 'blur(6px)' }
                }
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-accent-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < review.rating
                            ? 'h-4 w-4 fill-accent-gold text-accent-gold'
                            : 'h-4 w-4 text-white/20'
                        }
                      />
                    ))}
                    <span className="ml-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {review.rating}.0 / 5.0
                    </span>
                  </div>

                  <p className="mt-6 text-balance font-heading text-xl font-semibold leading-relaxed text-foreground md:text-2xl lg:text-3xl">
                    “{review.quote[locale]}”
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-brand-light shadow-lg shadow-brand/15 ring-2 ring-brand/20">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-base font-extrabold leading-tight text-foreground">
                        {review.name}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {review.role[locale]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3 md:flex-col md:items-end md:gap-4">
                  <div className="flex flex-col items-start rounded-2xl border border-brand/15 bg-brand-light px-4 py-3 md:items-end">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand/70">
                      {labels.brandLabel}
                    </span>
                    <span className="mt-1 font-heading text-2xl font-extrabold leading-none text-brand md:text-3xl">
                      {review.brand}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 self-end rounded-full border border-brand/15 bg-brand-light px-3 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />
                      <span className="relative h-2 w-2 rounded-full bg-brand" />
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                      {labels.verified}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs font-bold tracking-[0.22em] text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
              <span className="mx-1 text-muted-foreground/35">/</span>
              {String(total).padStart(2, '0')}
            </span>
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label={labels.eyebrow}
            >
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${labels.eyebrow} ${i + 1}`}
                  onClick={() => go(i)}
                  className="group relative h-1.5 overflow-hidden rounded-full transition-[width] duration-500 ease-out"
                  style={{ width: i === index ? 44 : 14 }}
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
                        duration: paused || reduceMotion ? 0 : ROTATE_MS / 1000,
                        ease: 'linear',
                      }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand via-accent-gold to-brand"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
