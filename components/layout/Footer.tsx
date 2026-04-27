import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#0E5226] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading font-extrabold text-2xl">
              ZOJE<span className="font-medium text-white/60">.uz</span>
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
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                <a href="tel:+998712345678" className="hover:text-white transition-colors">
                  +998 71 234-56-78
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                <a href="mailto:info@zoje.uz" className="hover:text-white transition-colors">
                  info@zoje.uz
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                <span>{t('contact.hoursValue')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Zoje.uz. {t('footer.copyright')}
          </p>
          <p className="text-xs text-white/40">
            {t('footer.dealer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
