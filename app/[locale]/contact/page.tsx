import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  Building2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tFooter = await getTranslations("footer");
  const locale = (await getLocale()) as "uz" | "ru";
  const isRu = locale === "ru";
  const address = tFooter("address");
  const mapsUrl = "https://yandex.uz/maps/org/219478143637/?ll=69.228109%2C41.262848&mode=search&sctx=ZAAAAAgBEAAaKAoSCcueBDbnUVFAERGPxMvTp0RAEhIJTYOieQCL2j8RmX%2F0TZoGzT8iBgABAgMEBSgKOABA31BIAWoCdXqdAc3MzD2gAQCoAQC9AYq4GJLCAQaV5arPsQaCAgR6b2pligIAkgIAmgIMZGVza3RvcC1tYXBz&sll=69.228109%2C41.262848&sspn=0.012960%2C0.007092&text=zoje&z=17";
  const mapEmbedUrl = "https://yandex.uz/map-widget/v1/?ll=69.228109%2C41.262848&mode=search&oid=219478143637&ol=biz&z=17";

  const copy = {
    eyebrow: "ZOJE Uzbekistan",
    heroTitle: isRu ? "Контакты ZOJE" : "ZOJE bilan aloqa",
    heroText: isRu
      ? "Подберем модель, ответим по наличию, доставке, сервису и запчастям. Напишите или позвоните удобным способом."
      : "Model tanlash, mavjudlik, yetkazib berish, servis va ehtiyot qismlar bo‘yicha yordam beramiz. Qulay usulda yozing yoki qo‘ng‘iroq qiling.",
    callNow: isRu ? "Позвонить" : "Qo‘ng‘iroq qilish",
    response: isRu ? "Быстрый ответ" : "Tez javob",
    responseText: isRu
      ? "Менеджер свяжется с вами в рабочее время."
      : "Menejer ish vaqtida siz bilan bog‘lanadi.",
    visit: isRu ? "Шоурум и сервис" : "Showroom va servis",
    route: isRu ? "Построить маршрут" : "Yo‘nalish olish",
    formTitle: isRu ? "Оставьте заявку" : "Ariza qoldiring",
    formText: isRu
      ? "Укажите имя, телефон и вопрос. Мы перезвоним."
      : "Ism, telefon va savolingizni yozing. Biz qayta qo‘ng‘iroq qilamiz.",
    primaryPhone: isRu ? "Отдел продаж" : "Savdo bo‘limi",
    serviceLine: isRu ? "Линия сервиса" : "Servis liniyasi",
    official: isRu ? "Официальный дистрибьютор ZOJE" : "ZOJE rasmiy distribyutori",
    mapTitle: isRu ? "Как нас найти" : "Bizni qanday topasiz",
  };

  const cards = [
    { icon: Phone, label: copy.primaryPhone, value: "+998 99 097 55 11", href: "tel:+998990975511" },
    { icon: Headphones, label: copy.serviceLine, value: "+998 99 720 55 11", href: "tel:+998997205511" },
    { icon: Mail, label: t("email"), value: "Otabek.zoje@gmail.com", href: "mailto:Otabek.zoje@gmail.com" },
    { icon: Clock, label: t("hours"), value: t("hoursValue"), href: undefined },
  ];

  const dealers: Array<{
    city: string;
    region: { uz: string; ru: string };
    phone: string;
    tel: string;
  }> = [
    { city: "Farhod bozori", region: { uz: "Toshkent shahri", ru: "г. Ташкент" }, phone: "+998 90 993 3473", tel: "+998909933473" },
    { city: "Jizzax", region: { uz: "Jizzax viloyati", ru: "Джизакская обл." }, phone: "+998 33 611 2222", tel: "+998336112222" },
    { city: "Samarqand", region: { uz: "Samarqand viloyati", ru: "Самаркандская обл." }, phone: "+998 90 606 5775", tel: "+998906065775" },
    { city: "Urgut", region: { uz: "Samarqand viloyati", ru: "Самаркандская обл." }, phone: "+998 97 406 5101", tel: "+998974065101" },
    { city: "Buxoro", region: { uz: "Buxoro viloyati", ru: "Бухарская обл." }, phone: "+998 99 707 7997", tel: "+998997077997" },
    { city: "Qoraqalpog‘iston", region: { uz: "Nukus", ru: "Каракалпакстан, Нукус" }, phone: "+998 88 650 6016", tel: "+998886506016" },
    { city: "Qashqadaryo", region: { uz: "Qarshi", ru: "Кашкадарьинская обл., Карши" }, phone: "+998 93 905 6509", tel: "+998939056509" },
    { city: "Surxondaryo", region: { uz: "Termiz", ru: "Сурхандарьинская обл., Термез" }, phone: "+998 97 351 1180", tel: "+998973511180" },
    { city: "Andijon", region: { uz: "Andijon viloyati", ru: "Андижанская обл." }, phone: "+998 93 259 6633", tel: "+998932596633" },
    { city: "Farg‘ona", region: { uz: "Farg‘ona viloyati", ru: "Ферганская обл." }, phone: "+998 95 008 9191", tel: "+998950089191" },
    { city: "Namangan", region: { uz: "Namangan viloyati", ru: "Наманганская обл." }, phone: "+998 91 366 0607", tel: "+998913660607" },
    { city: "Qo‘qon", region: { uz: "Farg‘ona viloyati", ru: "Ферганская обл." }, phone: "+998 91 150 0052", tel: "+998911500052" },
  ];

  const dealerCopy = {
    eyebrow: isRu ? "Дилерская сеть" : "Dillerlar tarmog‘i",
    title: isRu
      ? "12 дилерских магазинов по всему Узбекистану"
      : "O‘zbekiston bo‘ylab 12 ta diller do‘koni",
    subtitle: isRu
      ? "Свяжитесь с ближайшим официальным дилером ZOJE напрямую — нажмите на номер, чтобы позвонить."
      : "Sizga eng yaqin rasmiy ZOJE dilleri bilan to‘g‘ridan-to‘g‘ri bog‘laning — qo‘ng‘iroq qilish uchun raqamga bosing.",
    dealerLabel: isRu ? "Дилер" : "Diller",
  };

  return (
    <main className="overflow-x-hidden bg-white">
      <section className="relative overflow-hidden border-b border-border/70 bg-[linear-gradient(180deg,#F7FAF8_0%,#FFFFFF_78%)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-16">
          <div className="min-w-0 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-brand/15 bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-brand shadow-sm">
              <Building2 className="h-3.5 w-3.5" />
              {copy.eyebrow}
            </div>
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground text-pretty md:text-lg">
              {copy.heroText}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+998990975511">
                <Button size="lg" className="gap-2 bg-brand text-white hover:bg-brand-deep">
                  <PhoneCall className="h-4 w-4" />
                  {copy.callNow}
                </Button>
              </a>
              <a href="https://t.me/ZOJEUZBEKISTAN" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2 bg-white">
                  <MessageCircle className="h-4 w-4" />
                  Telegram
                </Button>
              </a>
            </div>
          </div>

          <div className="relative min-w-0 overflow-hidden rounded-lg border border-brand/15 bg-[#0F1B14] p-5 text-white shadow-xl shadow-brand/10">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand/30 blur-3xl" />
            <div className="absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-accent-gold/15 blur-3xl" />
            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-brand shadow-lg shadow-black/20">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <p className="break-words font-heading text-xl font-extrabold leading-tight sm:text-2xl">{copy.official}</p>
              <p className="mt-3 text-sm leading-6 text-white/70">{copy.responseText}</p>
              <div className="mt-6 grid gap-3">
                <a href="tel:+998990975511" className="flex flex-col items-start gap-1 rounded-lg border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold transition-colors hover:bg-white/12 sm:flex-row sm:items-center sm:justify-between">
                  <span className="min-w-0 break-words">{copy.primaryPhone}</span>
                  <span className="break-words sm:text-right">+998 99 097 55 11</span>
                </a>
                <a href="tel:+998997205511" className="flex flex-col items-start gap-1 rounded-lg border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold transition-colors hover:bg-white/12 sm:flex-row sm:items-center sm:justify-between">
                  <span className="min-w-0 break-words">{copy.serviceLine}</span>
                  <span className="break-words sm:text-right">+998 99 720 55 11</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1fr_480px] lg:px-8">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="rounded-lg border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-lg hover:shadow-black/5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brand/15 bg-brand-light text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block break-words font-heading text-lg font-extrabold transition-colors hover:text-brand">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 break-words font-heading text-lg font-extrabold">{value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
            <div className="grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-72 overflow-hidden bg-[#F5F8F6] md:min-h-full">
                <iframe
                  src={mapEmbedUrl}
                  title={isRu ? "Карта ZOJE в Yandex Maps" : "ZOJE Yandex xaritasi"}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
              </div>
              <div className="p-6 md:p-7">
                <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-brand/15 bg-brand-light px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-brand">
                  <Navigation className="h-3.5 w-3.5" />
                  {copy.visit}
                </div>
                <h2 className="font-heading text-2xl font-extrabold leading-tight md:text-3xl">{copy.mapTitle}</h2>
                <div className="mt-5 rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t("address")}</p>
                  <p className="mt-1 whitespace-pre-line font-semibold leading-6">{address}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2 bg-brand text-white hover:bg-brand-deep">
                      {copy.route}
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-border bg-white p-5 shadow-xl shadow-black/5 md:p-6">
            <div className="mb-5">
              <p className="text-xs font-extrabold uppercase tracking-wide text-brand">{copy.response}</p>
              <h2 className="mt-2 font-heading text-2xl font-extrabold md:text-3xl">{copy.formTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.formText}</p>
            </div>
            <ContactForm />
          </div>
        </aside>
      </section>

      <section className="border-t border-border/70 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAF8_100%)] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-6 bg-brand" />
              {dealerCopy.eyebrow}
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-balance md:text-4xl lg:text-5xl">
              {dealerCopy.title}
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground text-pretty md:text-lg">
              {dealerCopy.subtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dealers.map((dealer, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <a
                  key={dealer.tel}
                  href={`tel:${dealer.tel}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-4 select-none font-heading text-[90px] font-extrabold leading-none text-brand/[0.06] transition-colors duration-300 group-hover:text-brand/[0.1]"
                  >
                    {num}
                  </span>

                  <div className="relative flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/15 bg-brand-light text-brand shadow-sm">
                      <MapPin className="h-5 w-5" strokeWidth={2.25} />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                      {dealerCopy.dealerLabel} · {num}
                    </span>
                  </div>

                  <div className="relative mt-5">
                    <h3 className="font-heading text-xl font-extrabold leading-tight text-foreground transition-colors group-hover:text-brand">
                      {dealer.city}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {dealer.region[locale]}
                    </p>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between border-t border-dashed border-border/70 pt-4">
                    <span className="font-heading text-base font-extrabold tracking-wide text-brand">
                      {dealer.phone}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-sm shadow-brand/30 transition-transform group-hover:scale-110">
                      <PhoneCall className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
