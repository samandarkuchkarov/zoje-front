import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title') };
}

export default async function ContactPage() {
  const t = await getTranslations('contact');
  const tFooter = await getTranslations('footer');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-balance mb-3">
          {t('title')}
        </h1>
        <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          {[
            { icon: Phone, label: t('phone'), value: '+998990975511', href: 'tel:+998990975511' },
            { icon: Mail, label: t('email'), value: 'zoje.tashkent20@gmail.com', href: 'mailto:zoje.tashkent20@gmail.com' },
            { icon: MapPin, label: t('address'), value: tFooter('address'), href: undefined },
            { icon: Clock, label: t('hours'), value: t('hoursValue'), href: undefined },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                  {label}
                </p>
                {href ? (
                  <a href={href} className="font-semibold hover:text-brand transition-colors">
                    {value}
                  </a>
                ) : (
                  <p className="font-semibold whitespace-pre-line">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
