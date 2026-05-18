'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Quote,
  Send,
} from 'lucide-react';
import type { TelegramPost } from '@/lib/telegram-channel';

const TG = '#229ED9';

type Props = {
  posts: TelegramPost[];
  channel: string;
  locale: 'uz' | 'ru';
};

function formatRelative(dateStr: string, locale: 'uz' | 'ru'): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  if (mins < 1) return locale === 'ru' ? 'только что' : 'hozirgina';
  if (mins < 60) {
    return locale === 'ru' ? `${mins} мин назад` : `${mins} daqiqa oldin`;
  }
  if (hours < 24) {
    return locale === 'ru' ? `${hours} ч назад` : `${hours} soat oldin`;
  }
  if (days < 7) {
    return locale === 'ru' ? `${days} дн назад` : `${days} kun oldin`;
  }
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return locale === 'ru' ? `${weeks} нед назад` : `${weeks} hafta oldin`;
  }
  try {
    return new Intl.DateTimeFormat(locale === 'uz' ? 'uz-Latn-UZ' : 'ru-RU', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export function TelegramNewsStrip({ posts, channel, locale }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [edge, setEdge] = useState<'start' | 'middle' | 'end'>('start');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 4) return setEdge('end');
      if (el.scrollLeft <= 4) setEdge('start');
      else if (el.scrollLeft >= max - 4) setEdge('end');
      else setEdge('middle');
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [posts.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-news-card]');
    const step = card ? card.clientWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  if (posts.length === 0) return null;

  const labels = {
    eyebrow:
      locale === 'ru' ? 'Прямой эфир Telegram' : 'Telegram kanalimiz',
    live: locale === 'ru' ? 'В прямом эфире' : 'Jonli efir',
    title:
      locale === 'ru'
        ? 'Новости из канала ZOJE'
        : 'ZOJE kanalidagi yangiliklar',
    subtitle:
      locale === 'ru'
        ? 'Свежие посты прямо из нашего Telegram — акции, новые модели и инсайты сервиса.'
        : "Telegram kanalimizdan eng so'nggi xabarlar — aksiyalar, yangi modellar va servis yangiliklari.",
    open: locale === 'ru' ? 'Открыть канал' : 'Kanalga o\'tish',
    readMore: locale === 'ru' ? 'Открыть в Telegram' : "Telegramda ochish",
    prev: locale === 'ru' ? 'Назад' : 'Oldingi',
    next: locale === 'ru' ? 'Дальше' : 'Keyingi',
    photoOnly: locale === 'ru' ? 'Фото без подписи' : 'Faqat foto',
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F4FAFD] to-white py-14 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,158,217,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(34,158,217,0.14) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[-6rem] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ backgroundColor: `${TG}1A` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-4rem] h-[360px] w-[360px] rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: TG }}
            >
              <span
                className="relative flex h-2 w-2"
                aria-hidden
              >
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: TG }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: TG }}
                />
              </span>
              {labels.live}
              <span className="h-px w-8 bg-[#229ED9]/40" />
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
            <a
              href={`https://t.me/${channel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-extrabold text-white shadow-lg shadow-[#229ED9]/30 transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: TG }}
            >
              <Send className="h-4 w-4" />
              @{channel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label={labels.prev}
                disabled={edge === 'start'}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-all hover:border-brand/40 hover:text-brand disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label={labels.next}
                disabled={edge === 'end'}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-all hover:border-brand/40 hover:text-brand disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-10">
          <div
            ref={scrollerRef}
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((post, i) => {
              const plain = post.text.replace(/\s+/g, ' ').trim();
              const lines = post.text.split('\n').map((l) => l.trim()).filter(Boolean);
              const titleLine = lines[0] ?? '';
              const restLines = lines.slice(1).join(' ');
              const hasImage = Boolean(post.image);
              const hasTitle = titleLine.length > 0;
              const hasExcerpt = restLines.length > 0;

              return (
                <motion.a
                  key={post.id}
                  data-news-card
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(i * 0.05, 0.2),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#229ED9]/40 hover:shadow-xl hover:shadow-[#229ED9]/10 sm:w-[44vw] md:w-[320px] lg:w-[340px]"
                >
                  {hasImage ? (
                    <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-gradient-to-br from-[#0F1B14] via-[#11241A] to-[#0A1410]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image!}
                        alt={titleLine || labels.photoOnly}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 via-black/0 to-transparent" />
                      <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                        <Send className="h-3 w-3" style={{ color: '#7CC4ED' }} />
                        {formatRelative(post.date, locale)}
                      </div>
                      {post.views && (
                        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-white backdrop-blur">
                          <Eye className="h-3 w-3" />
                          {post.views}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative h-16 shrink-0 overflow-hidden bg-gradient-to-br from-[#0F1B14] via-[#11241A] to-[#0A1410]">
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-25"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
                          backgroundSize: '24px 24px',
                        }}
                      />
                      <Quote
                        aria-hidden
                        className="absolute right-3 top-1 h-14 w-14 text-white/15"
                        strokeWidth={1.2}
                      />
                      <div className="absolute left-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                        <Send className="h-3 w-3" style={{ color: '#7CC4ED' }} />
                        {formatRelative(post.date, locale)}
                      </div>
                      {post.views && (
                        <div className="absolute right-12 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-full bg-white/10 px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-white backdrop-blur">
                          <Eye className="h-3 w-3" />
                          {post.views}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="relative flex flex-1 flex-col p-5">
                    {hasTitle && (
                      <h3 className="line-clamp-2 font-heading text-base font-extrabold leading-snug text-foreground transition-colors group-hover:text-[#1A88C1]">
                        {titleLine}
                      </h3>
                    )}
                    {hasExcerpt ? (
                      <p
                        className={`text-sm leading-6 text-muted-foreground ${
                          hasTitle ? 'mt-2 line-clamp-3' : 'line-clamp-5'
                        }`}
                      >
                        {restLines}
                      </p>
                    ) : (
                      !hasTitle && (
                        <p className="line-clamp-5 text-sm leading-6 text-muted-foreground">
                          {plain || labels.photoOnly}
                        </p>
                      )
                    )}

                    <div className="mt-auto flex items-center justify-between border-t border-dashed border-border/70 pt-4">
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: TG }}
                      >
                        {labels.readMore}
                      </span>
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full text-white shadow-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ backgroundColor: TG }}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
