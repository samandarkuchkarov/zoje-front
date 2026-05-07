import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#0E5226] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading font-extrabold text-2xl">
              ZOJE
            </span>
            <p className="mt-3 text-sm text-white/70 text-pretty">
              {t('footer.tagline')}
            </p>
           
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">{t('footer.pages')}</h4>
            <ul className="space-y-2">
              {[
                { href: '/catalog', label: t('nav.catalog') },
                { href: '/about', label: t('nav.about') },
                { href: '/contact', label: t('nav.contact') },
                { href: '/cart', label: t('nav.cart') },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">{t('footer.categories')}</h4>
            <ul className="space-y-2">
              {(
                [
                  ['industrial', '/catalog/industrial'],
                  ['overlock', '/catalog/overlock'],
                  ['heavy-duty', '/catalog/heavy-duty'],
                  ['domestic', '/catalog/domestic'],
                  ['embroidery', '/catalog/embroidery'],
                ] as const
              ).map(([key, href]) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {t(`catalog.categories.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <a
                  href="https://t.me/zoje_uzb"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#229ED9]/20 hover:bg-[#229ED9]/40 text-[#229ED9] text-xs font-medium transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
                <a
                  href="https://www.instagram.com/zoje_tashkent?igsh=MmJkOWdzc2toYmJo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E1306C]/20 hover:bg-[#E1306C]/40 text-[#E1306C] text-xs font-medium transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                <a href="tel:+998990975511" className="hover:text-white transition-colors tracking-wide">
                  +998 99 097 55 11
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0 text-white/40" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 text-xs">Servis center</span>
                  <a href="tel:+998997205511" className="hover:text-white transition-colors tracking-wide">
                    +998 99 720 55 11
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                <a href="mailto:zoje.tashkent20@gmail.com" className="hover:text-white transition-colors">
                  zoje.tashkent20@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                <span className="whitespace-pre-line">{t('footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ZOJE {t('footer.copyright')}
          </p>
          <p className="text-xs text-white/40">
            {t('footer.dealer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
