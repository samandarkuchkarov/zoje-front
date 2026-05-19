'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  Award,
  Building2,
  Clock,
  Factory,
  Handshake,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: Award, value: '2014', key: 'founded' },
  { icon: Users, value: '5000+', key: 'clients' },
  { icon: MapPin, value: '12', key: 'regions' },
  { icon: Clock, value: '10+', key: 'experience' },
] as const;

export function AboutContent() {
  const t = useTranslations('about');
  const locale = useLocale() as 'uz' | 'ru';
  const shouldReduce = useReducedMotion();

  const eyebrow = locale === 'ru' ? 'О компании' : 'Kompaniya haqida';
  const sinceLabel = locale === 'ru' ? 'С 2014 года' : '2014-yildan beri';
  const storyEyebrow = locale === 'ru' ? 'Путь' : 'Yo‘l';
  const missionEyebrow = locale === 'ru' ? 'Миссия' : 'Missiya';
  const ctaTitle =
    locale === 'ru'
      ? 'Готовы оснастить ваше производство?'
      : 'Ishlab chiqarishingizni jihozlashga tayyormisiz?';
  const ctaSubtitle =
    locale === 'ru'
      ? 'Подберём оборудование под ваши задачи и обеспечим полное сопровождение.'
      : 'Vazifalaringizga mos uskunani tanlaymiz va to‘liq qo‘llab-quvvatlash beramiz.';
  const catalogLabel = locale === 'ru' ? 'Каталог' : 'Katalog';
  const contactLabel = locale === 'ru' ? 'Связаться' : 'Bog‘lanish';

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0F1B14] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10rem] h-[460px] w-[460px] rounded-full bg-brand/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-[-8rem] h-[420px] w-[420px] rounded-full bg-accent-gold/15 blur-3xl"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,160,23,0.4),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-accent-gold-light">
              <span className="h-px w-6 bg-accent-gold-light" />
              {eyebrow}
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight text-balance md:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 text-pretty md:text-lg">
              {t('subtitle')}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-accent-gold-light backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              {sinceLabel}
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4">
            {stats.map(({ icon: Icon, value, key }, i) => (
              <motion.div
                key={key}
                initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + i * 0.06,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/40 hover:bg-white/[0.06]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/0 blur-2xl transition-all duration-500 group-hover:bg-brand/30"
                />
                <div className="relative flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-lg shadow-black/30 ring-1 ring-white/10">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-white/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="relative mt-5 font-heading text-3xl font-extrabold leading-none text-white md:text-4xl">
                  {value}
                </p>
                <p className="relative mt-2 text-xs font-semibold leading-snug text-white/65">
                  {t(`stats.${key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(27,122,58,0.12),transparent_36%),radial-gradient(circle_at_88%_8%,rgba(212,160,23,0.12),transparent_32%),linear-gradient(135deg,#FFFFFF_0%,#F5FBF7_45%,#EAF6EE_100%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:gap-14">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[420px] overflow-hidden rounded-2xl border border-border bg-[#0F1B14] shadow-xl shadow-brand/10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent,#D4A017,#1B7A3A,transparent)]" />

            <Image
              src="/company/zoje-uzbekistan-showroom.png"
              alt="ZOJE showroom"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,27,20,0.1),rgba(15,27,20,0.6))]" />

            <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-accent-gold-light backdrop-blur">
              <Factory className="h-3.5 w-3.5" />
              {locale === 'ru' ? 'Шоурум в Ташкенте' : 'Toshkentdagi shourum'}
            </div>

            <div className="absolute bottom-5 left-5 right-5 z-10 grid grid-cols-3 gap-2">
              {[
                { value: '5000+', label: locale === 'ru' ? 'клиентов' : 'mijoz' },
                { value: '12', label: locale === 'ru' ? 'регионов' : 'viloyat' },
                { value: '100+', label: locale === 'ru' ? 'моделей' : 'model' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white backdrop-blur"
                >
                  <p className="font-heading text-lg font-extrabold leading-none">{s.value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-white/70">
                    {s.label}
                  </p>
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
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-6 bg-brand" />
              {storyEyebrow}
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-balance md:text-4xl">
              {t('story')}
            </h2>

            <div className="mt-6 grid gap-5 border-l-2 border-brand/25 pl-5">
              <p className="text-base leading-7 text-muted-foreground text-pretty">
                {t('storyText1')}
              </p>
              <p className="text-base leading-7 text-muted-foreground text-pretty">
                {t('storyText2')}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Handshake,
                  label:
                    locale === 'ru'
                      ? 'Авторизованный партнёр'
                      : 'Vakolatli hamkor',
                },
                {
                  icon: ShieldCheck,
                  label: locale === 'ru' ? 'Оригинальная техника' : 'Original texnika',
                },
                {
                  icon: Sparkles,
                  label: locale === 'ru' ? 'Сервис и обучение' : 'Servis va o‘qitish',
                },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-white px-3 py-2.5 shadow-sm"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                  </div>
                  <span className="text-xs font-bold leading-snug text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative overflow-hidden bg-[#F7FAF8] py-16 md:py-24">
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
          className="pointer-events-none absolute -top-20 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-6 bg-brand" />
              {missionEyebrow}
              <span className="h-px w-6 bg-brand" />
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-balance md:text-4xl">
              {t('mission')}
            </h2>
          </motion.div>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-xl shadow-brand/5 md:p-12"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent-gold/10 blur-3xl"
            />
            <Quote
              aria-hidden
              className="absolute left-6 top-6 h-12 w-12 text-brand/15 md:h-16 md:w-16"
              strokeWidth={1.5}
            />
            <p className="relative mt-10 text-center font-heading text-xl font-semibold leading-relaxed text-foreground text-pretty md:text-2xl md:leading-relaxed">
              {t('missionText')}
            </p>
            <div className="relative mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand/40" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
                ZOJE Uzbekistan
              </span>
              <span className="h-px w-10 bg-brand/40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(27,122,58,0.14),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(212,160,23,0.12),transparent_36%),linear-gradient(135deg,#FFFFFF_0%,#F5FBF7_100%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl border border-border bg-[#0F1B14] p-8 text-white shadow-xl shadow-brand/10 md:p-12"
          >
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-accent-gold-light">
                  <Building2 className="h-3.5 w-3.5" />
                  ZOJE
                </span>
                <h3 className="mt-3 font-heading text-2xl font-extrabold leading-tight text-balance md:text-3xl">
                  {ctaTitle}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70 md:text-base">
                  {ctaSubtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/catalog">
                  <Button className="gap-2 bg-accent-gold text-[#0F1B14] hover:bg-accent-gold-light">
                    {catalogLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    {contactLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
