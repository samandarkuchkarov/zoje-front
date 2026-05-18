'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, MapPin, Quote, Star } from 'lucide-react';

const ROTATE_MS = 7000;

type Review = {
  name: string;
  initials: string;
  role: { uz: string; ru: string };
  location: { uz: string; ru: string };
  quote: { uz: string; ru: string };
  rating: number;
  years: string;
};

const REVIEWS: Review[] = [
  {
    name: 'Sherzod Karimov',
    initials: 'SK',
    role: {
      uz: "Tikuv ustaxonasi egasi",
      ru: 'Владелец швейной мастерской',
    },
    location: { uz: 'Toshkent', ru: 'Ташкент' },
    quote: {
      uz: "ZOJE mashinalarini 3 yildan beri ishlatamiz. Kafolat shartlari halol, har qanday muammoda servis tez yetib keladi. Boshqa brendlardan farqli — chindan ishonchli.",
      ru: 'Используем машины ZOJE уже три года. Гарантия честная, сервис оперативный. В отличие от других брендов — действительно надёжно.',
    },
    rating: 5,
    years: '3+',
  },
  {
    name: 'Alisher Yusupov',
    initials: 'AY',
    role: {
      uz: "‘Elegant’ fabrikasi direktori",
      ru: 'Директор фабрики «Elegant»',
    },
    location: { uz: 'Samarqand', ru: 'Самарканд' },
    quote: {
      uz: "60 ta ZOJE mashinasi bilan ishlaymiz — kunlik mahsuldorlik 30% ga oshdi. Eski parkdan keyin ZOJE — boshqa darajadagi sifat.",
      ru: 'Работаем с 60 машинами ZOJE — производительность выросла на 30%. После старого парка ZOJE — это другой уровень качества.',
    },
    rating: 5,
    years: '4+',
  },
  {
    name: 'Madina Akhmedova',
    initials: 'MA',
    role: { uz: 'Brend tikuvchisi', ru: 'Дизайнер бренда' },
    location: { uz: 'Toshkent', ru: 'Ташкент' },
    quote: {
      uz: "Texnik xizmat doim aloqada. Murakkab buyurtmalar uchun maxsus sozlamalarni o'rgatishdi — bunday darajadagi qo'llab-quvvatlash kam uchraydi.",
      ru: 'Техподдержка всегда на связи. Под сложные заказы научили специальным настройкам — такого уровня поддержки нечасто встретишь.',
    },
    rating: 5,
    years: '2+',
  },
  {
    name: 'Bobur Tursunov',
    initials: 'BT',
    role: { uz: 'Sanoat tikuv mas’uli', ru: 'Руководитель производства' },
    location: { uz: "Farg'ona", ru: 'Фергана' },
    quote: {
      uz: "Farg'onaga ikki kunda yetkazib berishdi — original ehtiyot qismlar ham omborda topildi. Ishlab chiqarish bir kun ham to'xtamadi.",
      ru: 'Доставка в Фергану за два дня — оригинальные запчасти были в наличии. Производство не простаивало ни дня.',
    },
    rating: 5,
    years: '5+',
  },
  {
    name: 'Dilshod Nazarov',
    initials: 'DN',
    role: { uz: 'Ustaxona egasi', ru: 'Владелец мастерской' },
    location: { uz: 'Buxoro', ru: 'Бухара' },
    quote: {
      uz: '5 yildan beri ZOJE bilan ishlaymiz. Mashinalar ishonchli, narxlar adolatli — chinakam strategik hamkor.',
      ru: 'Работаем с ZOJE уже пять лет. Машины надёжные, цены справедливые — настоящий стратегический партнёр.',
    },
    rating: 5,
    years: '5+',
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
    yearsLabel: locale === 'ru' ? 'лет с ZOJE' : 'yil ZOJE bilan',
    verified: locale === 'ru' ? 'Подтверждённый клиент' : 'Tasdiqlangan mijoz',
  };

  const go = (next: number) => {
    setDirection(next > index || (index === total - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#0F1B14] via-[#11241A] to-[#0A1410] py-16 text-white md:py-24"
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
        className="repair-flow pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#D4A017,#1B7A3A,transparent)]"
      />
      <div className="repair-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-[460px] w-[460px] rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-24 h-[460px] w-[460px] rounded-full bg-accent-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-accent-gold-light">
              <span className="h-px w-6 bg-accent-gold-light/60" />
              {labels.eyebrow}
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-balance md:text-5xl">
              {labels.title}
            </h2>
            <p className="mt-4 max-w-xl text-white/65 text-pretty md:text-lg">
              {labels.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go((index - 1 + total) % total)}
              aria-label={labels.prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:border-white/30 hover:bg-white/10"
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
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-10 lg:p-12">
            <Quote
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-8 h-44 w-44 text-white/[0.04] md:-right-2 md:h-56 md:w-56"
              strokeWidth={1}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-6 select-none font-heading text-[120px] font-extrabold leading-none text-brand/15 md:text-[180px]"
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
                    <span className="ml-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                      {review.rating}.0 / 5.0
                    </span>
                  </div>

                  <p className="mt-6 text-balance font-heading text-xl font-semibold leading-relaxed text-white md:text-2xl lg:text-3xl">
                    “{review.quote[locale]}”
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep font-heading text-base font-extrabold text-white shadow-lg shadow-brand/30 ring-2 ring-white/10">
                      {review.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-base font-extrabold leading-tight text-white">
                        {review.name}
                      </p>
                      <p className="mt-0.5 text-sm text-white/65">
                        {review.role[locale]}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold-light">
                        <MapPin className="h-3 w-3" />
                        {review.location[locale]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3 md:flex-col md:items-end md:gap-4">
                  <div className="flex flex-col items-start rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur md:items-end">
                    <span className="font-heading text-3xl font-extrabold leading-none text-accent-gold-light md:text-4xl">
                      {review.years}
                    </span>
                    <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                      {labels.yearsLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 self-end rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand-light/70" />
                      <span className="relative h-2 w-2 rounded-full bg-brand-light" />
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-light">
                      {labels.verified}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs font-bold tracking-[0.22em] text-white/55">
              {String(index + 1).padStart(2, '0')}
              <span className="mx-1 text-white/25">/</span>
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
                        ? 'absolute inset-0 rounded-full bg-white/10'
                        : 'absolute inset-0 rounded-full bg-white/15 transition-colors group-hover:bg-white/35'
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
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-light via-accent-gold to-brand-light"
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
