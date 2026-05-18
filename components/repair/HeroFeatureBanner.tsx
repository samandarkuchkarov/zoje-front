'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Factory, MapPin, SlidersHorizontal, type LucideIcon } from 'lucide-react';

const ICONS: LucideIcon[] = [MapPin, Factory, SlidersHorizontal];
const LABELS_UZ = ['Joylashuv', 'Mijozlar', 'Sozlash'];
const LABELS_RU = ['Локация', 'Клиенты', 'Настройка'];

const ROTATE_MS = 5000;

type Props = {
  items: readonly string[];
  lang: 'uz' | 'ru';
};

export function HeroFeatureBanner({ items, lang }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const labels = lang === 'ru' ? LABELS_RU : LABELS_UZ;

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [items.length, paused, reduceMotion]);

  const Icon = ICONS[index] ?? ICONS[0];
  const label = labels[index] ?? '';
  const text = items[index] ?? '';
  const total = items.length;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={lang === 'ru' ? 'Сервисные преимущества' : 'Servis afzalliklari'}
      className="absolute bottom-5 left-5 right-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1B14] via-[#11241A] to-[#0A1410] text-white shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur"
    >
      <div
        aria-hidden
        className="repair-flow pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#D4A017,#1B7A3A,transparent)]"
      />
      <div className="repair-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-accent-gold/15 blur-3xl"
      />

      <div className="relative flex items-center gap-4 px-4 py-4 sm:px-5 sm:py-5">
        <div className="relative shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`icon-${index}`}
              initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.6, opacity: 0, rotate: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-lg shadow-brand/40 ring-1 ring-white/15 sm:h-16 sm:w-16"
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.25} />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent"
              />
            </motion.div>
          </AnimatePresence>
          <span
            aria-hidden
            className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-gold/70 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-[#0F1B14] bg-accent-gold" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent-gold-light">
              {String(index + 1).padStart(2, '0')}
              <span className="mx-1 text-white/30">/</span>
              {String(total).padStart(2, '0')}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.span
                key={`label-${index}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 sm:inline"
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative mt-1.5 h-[2.75em] sm:h-[1.6em]">
            <AnimatePresence mode="wait">
              <motion.p
                key={`text-${index}`}
                initial={{ opacity: 0, x: 14, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -14, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 text-balance text-sm font-bold leading-snug text-white sm:text-base"
              >
                {text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${lang === 'ru' ? 'Слайд' : 'Slayd'} ${i + 1}`}
                aria-current={i === index}
                className="group relative h-1.5 overflow-hidden rounded-full transition-[width] duration-500 ease-out"
                style={{ width: i === index ? 28 : 8 }}
              >
                <span
                  className={
                    i === index
                      ? 'absolute inset-0 rounded-full bg-white/15'
                      : 'absolute inset-0 rounded-full bg-white/20 transition-colors group-hover:bg-white/40'
                  }
                />
                {i === index && (
                  <motion.span
                    key={`fill-${index}`}
                    initial={{ width: '0%' }}
                    animate={{ width: paused || reduceMotion ? '100%' : '100%' }}
                    transition={{
                      duration: paused || reduceMotion ? 0 : ROTATE_MS / 1000,
                      ease: 'linear',
                    }}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand via-accent-gold to-brand-light"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-0.5 bg-white/[0.06]">
        <motion.div
          key={`bar-${index}-${paused ? 'p' : 'r'}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: paused || reduceMotion ? 0 : ROTATE_MS / 1000,
            ease: 'linear',
          }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand via-accent-gold to-brand"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        />
      </div>
    </div>
  );
}
