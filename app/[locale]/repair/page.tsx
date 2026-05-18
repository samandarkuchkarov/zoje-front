import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircuitBoard,
  Clock3,
  LifeBuoy,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { HeroFeatureBanner } from '@/components/repair/HeroFeatureBanner';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

const content = {
  uz: {
    metaTitle: 'ZOJE tikuv uskunalarini ta\'mirlash',
    metaDescription: 'ZOJE sanoat tikuv mashinalari uchun diagnostika, ta\'mirlash va profilaktik servis.',
    crumb: 'Servis',
    eyebrow: 'ZOJE servis markazi',
    title: 'ZOJE tikuv uskunalarini ta\'mirlash',
    subtitle:
      'Sanoat tikuv mashinalari, elektron boshqaruv bloklari, motorlar, igna mexanizmlari va uzatmalar uchun tezkor diagnostika hamda sifatli ta\'mirlash xizmati.',
    cta: 'Usta chaqirish',
    call: '+998 99 720 55 11',
    metrics: [
      ['24 soat', 'diagnostika javobi'],
      ['10 yil', 'ZOJE tajribasi'],
      ['Original', 'ehtiyot qismlar'],
    ],
    servicesTitle: 'Nimalarni ta\'mirlaymiz',
    servicesSubtitle: 'Uskunani faqat ishga tushirib qo\'ymaymiz — tikuv liniyangiz barqaror ishlashi uchun sababni topamiz.',
    services: [
      ['Elektronika', 'Boshqaruv plata, displey, sensor, pedal va elektr zanjir diagnostikasi.'],
      ['Mexanika', 'Igna yurishi, transportyor, moylash tizimi, pichoq va val sozlamalari.'],
      ['Motor va privod', 'Servo motor, kamar, tezlik nazorati va kuchlanish muammolari.'],
      ['Profilaktika', 'Tozalash, moylash, kalibrlash va ishlab chiqarish oldi tekshiruv.'],
    ],
    processTitle: 'Servis qanday ishlaydi',
    process: [
      ['Ariza', 'Muammo, model va joylashuvni yozib qoldirasiz.'],
      ['Diagnostika', 'Usta nosozlik sababini aniqlab, yechim va narxni kelishadi.'],
      ['Ta\'mirlash', 'Kerakli qismlar almashtiriladi, mexanizm va elektronika sozlanadi.'],
      ['Sinov', 'Mashina tikuvda tekshiriladi va ishga tayyor holatda topshiriladi.'],
    ],
    formTitle: 'Servisga ariza qoldiring',
    formSubtitle: 'Model, muammo va telefon raqamingizni yozing. Mutaxassis siz bilan bog\'lanadi.',
    panelTitle: 'Tezkor servis zonasi',
    panelItems: ['Toshkent bo\'ylab chiqib xizmat', 'Ustaxona va fabrikalar bilan ishlaymiz', 'ZOJE modellariga moslangan sozlamalar'],
  },
  ru: {
    metaTitle: 'Ремонт швейного оборудования ZOJE',
    metaDescription: 'Диагностика, ремонт и профилактический сервис промышленных швейных машин ZOJE.',
    crumb: 'Ремонт',
    eyebrow: 'Сервисный центр ZOJE',
    title: 'Ремонт швейного оборудования ZOJE',
    subtitle:
      'Диагностика и ремонт промышленных швейных машин, электронных блоков, моторов, игольных механизмов и узлов подачи ткани.',
    cta: 'Вызвать мастера',
    call: '+998 99 720 55 11',
    metrics: [
      ['24 часа', 'ответ по диагностике'],
      ['10 лет', 'опыта с ZOJE'],
      ['Original', 'запчасти и настройки'],
    ],
    servicesTitle: 'Что ремонтируем',
    servicesSubtitle: 'Мы не просто запускаем машину — находим причину сбоя, чтобы линия работала стабильно.',
    services: [
      ['Электроника', 'Платы управления, дисплей, датчики, педаль и электрические цепи.'],
      ['Механика', 'Ход иглы, транспортер, смазка, ножи, валы и точная регулировка.'],
      ['Мотор и привод', 'Servo motor, ремни, контроль скорости и проблемы с напряжением.'],
      ['Профилактика', 'Очистка, смазка, калибровка и проверка перед производством.'],
    ],
    processTitle: 'Как проходит сервис',
    process: [
      ['Заявка', 'Вы оставляете модель, проблему и удобный контакт.'],
      ['Диагностика', 'Мастер определяет причину, решение и согласует стоимость.'],
      ['Ремонт', 'Меняем детали, настраиваем механику и электронные узлы.'],
      ['Тест', 'Проверяем машину на шве и передаем готовой к работе.'],
    ],
    formTitle: 'Оставьте заявку на сервис',
    formSubtitle: 'Напишите модель, проблему и номер телефона. Специалист свяжется с вами.',
    panelTitle: 'Зона быстрого сервиса',
    panelItems: ['Выезд по Ташкенту', 'Работаем с цехами и фабриками', 'Настройки под модели ZOJE'],
  },
} as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === 'ru' ? 'ru' : 'uz';
  const copy = content[lang];
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
  };
}

export default async function RepairPage({ params }: Props) {
  const { locale } = await params;
  const lang = locale === 'ru' ? 'ru' : 'uz';
  const copy = content[lang];

  const serviceIcons = [CircuitBoard, Settings2, Zap, ShieldCheck];
  const processIcons = [LifeBuoy, Activity, Wrench, CheckCircle2];

  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#0F1B14] text-white">
        <div className="repair-grid absolute inset-0 opacity-20" />
        <div className="repair-flow absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent,#D4A017,#1B7A3A,transparent)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(232,245,236,0.08))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <Breadcrumbs
            crumbs={[
              { label: lang === 'ru' ? 'Каталог' : 'Mahsulotlar', href: '/catalog' },
              { label: copy.crumb },
            ]}
            className="mb-8 text-white/70"
          />

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-gold-light">
                <Sparkles className="h-3.5 w-3.5" />
                {copy.eyebrow}
              </div>
              <h1 className="font-heading text-4xl font-extrabold leading-tight text-balance md:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 text-pretty md:text-lg">
                {copy.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#repair-form" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-extrabold text-brand transition-colors hover:bg-brand-light">
                  {copy.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="tel:+998997205511" className="inline-flex h-10 items-center justify-center rounded-lg border border-white/15 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10">
                  {copy.call}
                </a>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {copy.metrics.map(([value, label]) => (
                  <div key={value} className="rounded-lg border border-white/10 bg-white/8 p-4 backdrop-blur">
                    <p className="text-2xl font-extrabold text-accent-gold-light">{value}</p>
                    <p className="mt-1 text-xs font-semibold leading-snug text-white/70">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/30 lg:min-h-[470px]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#F7FAF8_0%,#FFFFFF_42%,#E8F5EC_100%)]" />
              <div className="repair-grid absolute inset-0 opacity-45" />
              <div className="repair-scanline absolute left-0 top-20 h-0.5 w-full bg-brand/70" />
              <Image
                src="/hero/zoje-zj-m7-hero.png"
                alt="ZOJE repair diagnostics"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-contain p-7 pt-16"
              />
              <div className="absolute left-5 top-5 rounded-lg border border-brand/15 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
                <p className="text-xs font-extrabold uppercase tracking-wide text-brand">ZOJE diagnostic</p>
                <p className="text-[11px] font-medium text-muted-foreground">servo / sensor / stitch</p>
              </div>
              <HeroFeatureBanner items={copy.panelItems} lang={lang} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20">
        <div className="repair-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 max-w-3xl">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                <span className="h-px w-6 bg-brand" />
                {lang === 'ru' ? 'Сервисные модули' : 'Servis modullari'}
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-balance md:text-4xl">{copy.servicesTitle}</h2>
              <p className="mt-3 text-muted-foreground text-pretty">{copy.servicesSubtitle}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.services.map(([title, text], index) => {
              const Icon = serviceIcons[index];
              const moduleNum = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                >
                  <div className="repair-grid absolute inset-0 opacity-[0.12] transition-opacity duration-300 group-hover:opacity-25" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/0 blur-3xl transition-all duration-500 group-hover:bg-brand/20"
                  />

                  <div className="relative">
                    <div className="mb-5 flex items-start justify-between">
                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F1B14] to-[#1A2C20] text-brand-light shadow-lg shadow-black/20 ring-1 ring-white/5">
                          <Icon className="h-6 w-6" strokeWidth={2.25} />
                        </div>
                        <span
                          aria-hidden
                          className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand shadow-sm shadow-brand/40"
                        >
                          <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />
                        </span>
                      </div>

                      <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-muted-foreground/70">
                        {moduleNum}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-extrabold leading-tight">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>

                    <div className="mt-5 flex items-center justify-between border-t border-dashed border-border/70 pt-4">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand/80">
                        {lang === 'ru' ? 'Готов к работе' : 'Tayyor'}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted py-14 md:py-20">
        <div className="repair-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              <span className="h-px w-6 bg-brand" />
              {lang === 'ru' ? 'Процесс сервиса' : 'Servis bosqichlari'}
            </div>
            <h2 className="font-heading text-3xl font-extrabold md:text-4xl">{copy.processTitle}</h2>
          </div>

          <div className="relative mt-12">
            <div
              aria-hidden
              className="absolute left-[7%] right-[7%] top-9 hidden h-px lg:block"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(27,122,58,0.35) 50%, transparent 50%)',
                backgroundSize: '12px 1px',
                backgroundRepeat: 'repeat-x',
              }}
            />

            <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {copy.process.map(([title, text], index) => {
                const Icon = processIcons[index];
                const stepNum = String(index + 1).padStart(2, '0');
                const isLast = index === copy.process.length - 1;
                return (
                  <li
                    key={title}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-4 select-none font-heading text-[120px] font-extrabold leading-none text-brand/[0.06] transition-colors duration-300 group-hover:text-brand/10"
                    >
                      {stepNum}
                    </span>

                    {!isLast && (
                      <ChevronRight
                        aria-hidden
                        className="absolute -right-3 top-7 hidden h-6 w-6 text-brand/60 lg:block"
                        strokeWidth={2.5}
                      />
                    )}

                    <div className="relative">
                      <div className="relative inline-flex">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-white shadow-lg shadow-brand/30 ring-4 ring-brand-light">
                          <Icon className="h-5 w-5" strokeWidth={2.25} />
                        </div>
                        <span className="absolute -bottom-1 -right-1 flex h-6 min-w-[1.75rem] items-center justify-center rounded-full border-2 border-white bg-[#0F1B14] px-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-accent-gold-light">
                          {stepNum}
                        </span>
                      </div>

                      <h3 className="mt-5 font-heading text-lg font-extrabold leading-tight">{title}</h3>
                      <div className="mt-1.5 h-0.5 w-8 origin-left scale-x-50 rounded-full bg-brand/40 transition-all duration-300 group-hover:scale-x-100 group-hover:bg-brand" />
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section id="repair-form" className="relative overflow-hidden bg-[#0F1B14] py-14 text-white md:py-20">
        <div className="repair-grid absolute inset-0 opacity-15" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-gold-light">
              <Clock3 className="h-3.5 w-3.5" />
              {copy.panelTitle}
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-balance md:text-5xl">{copy.formTitle}</h2>
            <p className="mt-4 max-w-xl text-white/70 text-pretty">{copy.formSubtitle}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white p-5 text-foreground shadow-2xl shadow-black/25 md:p-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
