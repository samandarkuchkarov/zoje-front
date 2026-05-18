'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Clock3, Camera, Mail, MapPin, Menu, PercentCircle, Phone, Search, Send, ShoppingCart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useCartStore } from '@/store/cart';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

const DEFAULT_REGION = "toshkent-shahri";

const UZBEKISTAN_REGIONS = [
  { value: "toshkent-shahri", uz: "Toshkent shahri", ru: "город Ташкент" },
  { value: "andijon", uz: "Andijon", ru: "Андижанская область" },
  { value: "buxoro", uz: "Buxoro", ru: "Бухарская область" },
  { value: "fargona", uz: "Farg'ona", ru: "Ферганская область" },
  { value: "jizzax", uz: "Jizzax", ru: "Джизакская область" },
  { value: "xorazm", uz: "Xorazm", ru: "Хорезмская область" },
  { value: "namangan", uz: "Namangan", ru: "Наманганская область" },
  { value: "navoiy", uz: "Navoiy", ru: "Навоийская область" },
  { value: "qashqadaryo", uz: "Qashqadaryo", ru: "Кашкадарьинская область" },
  { value: "samarqand", uz: "Samarqand", ru: "Самаркандская область" },
  { value: "sirdaryo", uz: "Sirdaryo", ru: "Сырдарьинская область" },
  { value: "surxondaryo", uz: "Surxondaryo", ru: "Сурхандарьинская область" },
  { value: "toshkent", uz: "Toshkent", ru: "Ташкентская область" },
] as const;

function useHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );
}

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>(DEFAULT_REGION);

  const hydrated = useHydrated();
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const savedRegion = localStorage.getItem('zoje-region');
    if (savedRegion && UZBEKISTAN_REGIONS.some((region) => region.value === savedRegion)) {
      setSelectedRegion(savedRegion);
    }
  }, []);

  const switchLocale = () => {
    router.replace(pathname, { locale: locale === 'uz' ? 'ru' : 'uz' });
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    localStorage.setItem('zoje-region', value);
  };

  const navLinks = [
    { href: '/catalog', label: t('catalog') },
    { href: '/about', label: t('about') },
    { href: '/repair', label: t('repair') },
    { href: '/contact', label: t('contact') },
  ];

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    router.push((query ? ('/catalog?q=' + encodeURIComponent(query)) : '/catalog') as never);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'relative z-30 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-white'
        )}
      >
        <div className="bg-brand-deep text-white">
          <div className="mx-auto max-w-7xl truncate px-4 py-1 text-center text-[11px] font-bold leading-5 sm:px-6 sm:text-sm lg:px-8">
            {t('announcement')}
          </div>
        </div>

        <div className="hidden max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[240px_minmax(260px,1fr)_330px_120px] lg:items-center lg:gap-7">
          <Link href="/" className="shrink-0" aria-label="ZOJE home">
            <Image
              src="/logo.PNG"
              alt="ZOJE"
              width={128}
              height={50}
              priority
              className="block h-12 w-auto"
            />
            <p className="mt-2 max-w-52 text-xs font-semibold leading-snug text-muted-foreground">
              {t("tagline")}
            </p>
          </Link>

          <div className="space-y-2">
            <label className="flex max-w-full items-center gap-2 text-sm font-bold text-foreground">
              <MapPin className="h-5 w-5 shrink-0 text-brand" />
              <select
                value={selectedRegion}
                onChange={(event) => handleRegionChange(event.target.value)}
                aria-label={t("cityLabel")}
                className="min-w-0 max-w-full cursor-pointer rounded-md border-0 bg-transparent py-0 pl-0 pr-7 font-bold text-foreground outline-none transition-colors hover:text-brand focus:text-brand"
              >
                {UZBEKISTAN_REGIONS.map((region) => (
                  <option key={region.value} value={region.value}>
                    {locale === "ru" ? region.ru : region.uz}
                  </option>
                ))}
              </select>
            </label>
            <form onSubmit={submitSearch} className="relative">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("search")}
                className="h-11 w-full rounded-none border border-border bg-white px-4 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground/55 focus:border-brand"
              />
              <button
                type="submit"
                aria-label={t("search")}
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-brand"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-red-600 transition-colors hover:text-red-700"
            >
              <PercentCircle className="h-5 w-5" />
              {t("sale")}
            </Link>
          </div>

          <div className="grid gap-2 text-sm">
            <a href="tel:+998990975511" className="flex items-center gap-3 font-extrabold text-foreground hover:text-brand">
              <Phone className="h-5 w-5 text-brand" />
              +998 99 097 55 11
            </a>
            <div className="flex items-start gap-3 font-semibold leading-snug text-foreground">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span>{t("hoursShort")}</span>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://www.instagram.com/zoje_tashkent?igsh=MmJkOWdzc2toYmJo" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E1306C] text-white transition-transform hover:-translate-y-0.5">
                <Camera className="h-4 w-4" />
              </a>
              <a href="https://t.me/ZOJEUZBEKISTAN" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#229ED9] text-white transition-transform hover:-translate-y-0.5">
                <Send className="h-4 w-4" />
              </a>
              <Link href="/contact" className="ml-1 inline-flex items-center gap-2 font-bold text-brand underline-offset-4 hover:underline">
                {t("callback")}
              </Link>
            </div>
            <a href="mailto:zoje.tashkent20@gmail.com" className="flex items-center gap-3 font-semibold text-foreground hover:text-brand">
              <Mail className="h-5 w-5 text-brand" />
              zoje.tashkent20@gmail.com
            </a>
          </div>

          <button type="button" onClick={() => setCartOpen(true)} className="group relative ml-auto flex min-w-20 flex-col items-center gap-1 text-center text-xs font-bold text-foreground transition-colors hover:text-brand">
            <ShoppingCart className="h-7 w-7 text-muted-foreground group-hover:text-brand" />
            {t("cart")}
            <AnimatePresence>
              {hydrated && totalItems > 0 && (
                <motion.span key={totalItems} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.25, ease: "backOut" }} className="absolute -top-2 right-5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between">
            <Link href="/" className="shrink-0 lg:hidden" aria-label="ZOJE home">
              <Image
                src="/logo.PNG"
                alt="ZOJE"
                width={92}
                height={36}
                priority
                className="block h-9 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={switchLocale}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-border hover:bg-brand-light hover:border-brand/30 transition-colors text-muted-foreground hover:text-brand"
              >
                {locale === 'uz' ? 'RU' : 'UZ'}
              </button>

              <Button
                variant="ghost"
                size="icon"
                className="relative lg:hidden"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {hydrated && totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.25, ease: 'backOut' }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center"
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border bg-white"
            >
              <div className="space-y-4 p-4">
                <form onSubmit={submitSearch} className="relative">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={t("search")}
                    className="h-11 w-full rounded-lg border border-border bg-white px-3 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand"
                  />
                  <button
                    type="submit"
                    aria-label={t("search")}
                    className="absolute right-0 top-0 flex h-11 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-brand"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </form>

                <div className="grid gap-2 rounded-lg bg-brand-light p-3 text-sm">
                  <label className="flex min-w-0 items-center gap-2 font-bold text-brand">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <select
                      value={selectedRegion}
                      onChange={(event) => handleRegionChange(event.target.value)}
                      aria-label={t("cityLabel")}
                      className="min-w-0 flex-1 cursor-pointer border-0 bg-transparent p-0 font-bold text-brand outline-none"
                    >
                      {UZBEKISTAN_REGIONS.map((region) => (
                        <option key={region.value} value={region.value}>
                          {locale === "ru" ? region.ru : region.uz}
                        </option>
                      ))}
                    </select>
                  </label>
                  <a href="tel:+998990975511" className="flex items-center gap-2 font-bold text-brand" onClick={() => setMobileOpen(false)}>
                    <Phone className="h-4 w-4" />
                    +998 99 097 55 11
                  </a>
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <Clock3 className="h-4 w-4 text-brand" />
                    {t("hoursShort")}
                  </span>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-brand-light hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
