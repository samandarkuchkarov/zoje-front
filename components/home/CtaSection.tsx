'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Headphones, PhoneCall, ShieldCheck, Truck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  const t = useTranslations('home.cta');
  const shouldReduce = useReducedMotion();
  const locale = useLocale();
  const features = locale === "ru"
    ? ["Быстрая связь", "Официальная гарантия", "Доставка по Узбекистану"]
    : ["Tezkor aloqa", "Rasmiy kafolat", "O\u0027zbekiston bo\u0027ylab yetkazish"];
  const featureIcons = [Headphones, ShieldCheck, Truck];

  return (
    <section className="relative overflow-hidden bg-[#0F1B14] py-12 text-white md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(27,122,58,0.55),transparent_34%),radial-gradient(circle_at_82%_80%,rgba(212,160,23,0.2),transparent_28%),linear-gradient(135deg,#0F1B14_0%,#145B2B_55%,#1B7A3A_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-accent-gold-light backdrop-blur">
              <Headphones className="h-3.5 w-3.5" />
              {locale === "ru" ? "Консультация" : "Menejer maslahati"}
            </div>
            <h2 className="max-w-2xl font-heading text-3xl font-extrabold leading-tight text-balance md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/74 text-pretty md:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <div key={feature} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm font-bold text-white/90 backdrop-blur">
                    <Icon className="h-4 w-4 text-accent-gold-light" />
                    <span>{feature}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalog">
                <Button size="lg" className="gap-2 bg-white font-bold text-brand shadow-xl shadow-black/20 hover:bg-brand-light">
                  {t("button")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+998990975511" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10">
                <PhoneCall className="h-4 w-4" />
                +998 99 097 55 11
              </a>
            </div>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/25 md:min-h-[360px]">
            <Image
              src="/cta/zoje-order-consultation.png"
              alt="ZOJE order consultation"
              fill
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,27,20,0.46),transparent_44%,rgba(15,27,20,0.08))]" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
              <div className="rounded-lg border border-white/12 bg-[#0F1B14]/76 px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-white backdrop-blur">
                {locale === "ru" ? "Официальный дилер ZOJE" : "ZOJE rasmiy dileri"}
              </div>
              <div className="rounded-full border border-white/12 bg-white/90 px-3 py-1.5 text-xs font-extrabold text-brand shadow-sm">
                {locale === "ru" ? "Ответим быстро" : "Tez javob beramiz"}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
