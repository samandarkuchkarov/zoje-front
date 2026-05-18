import { ArrowRight, CircuitBoard, Gauge, ShieldCheck, Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function RepairServiceBlock() {
  const t = useTranslations('home.repair');

  const highlights = [
    { icon: Gauge, label: t('highlight1') },
    { icon: CircuitBoard, label: t('highlight2') },
    { icon: ShieldCheck, label: t('highlight3') },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0F1B14] py-14 text-white md:py-20">
      <div className="repair-grid absolute inset-0 opacity-20" />
      <div className="repair-flow absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent,#D4A017,#1B7A3A,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(14,82,38,0.45))]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-gold-light">
            <Wrench className="h-3.5 w-3.5" />
            {t('eyebrow')}
          </div>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-balance md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 text-pretty md:text-lg">
            {t('subtitle')}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/8 p-3 backdrop-blur">
                <Icon className="mb-2 h-5 w-5 text-accent-gold-light" />
                <p className="text-sm font-semibold leading-snug text-white/88">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/repair">
              <Button size="lg" className="bg-white text-brand hover:bg-brand-light font-bold gap-2">
                {t('button')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="tel:+998997205511" className="inline-flex h-9 items-center justify-center rounded-lg border border-white/15 px-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
              +998 99 720 55 11
            </a>
          </div>
        </div>

        <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/25">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#F7FAF8_0%,#E8F5EC_48%,#FFFFFF_100%)]" />
          <div className="repair-grid absolute inset-0 opacity-40" />
          <div className="repair-scanline absolute left-0 top-10 h-0.5 w-full bg-brand/70" />
          <Image
            src="/hero/zoje-zj-m7-hero.png"
            alt="ZOJE servis"
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-contain p-8 pt-14"
          />
          <div className="absolute left-5 top-5 rounded-lg border border-brand/15 bg-white/88 px-3 py-2 shadow-sm backdrop-blur">
            <p className="text-xs font-extrabold uppercase tracking-wide text-brand">ZOJE service</p>
            <p className="text-[11px] font-medium text-muted-foreground">{t('diagnostics')}</p>
          </div>
          <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg bg-[#0F1B14] px-3 py-2 text-white shadow-lg">
            <span className="h-2 w-2 rounded-full bg-accent-gold animate-pulse" />
            <span className="text-xs font-bold">{t('ready')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
