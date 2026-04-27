import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Award, Users, MapPin, Clock } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'About' };
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  const stats = [
    { icon: Award, value: '2014', key: 'founded' },
    { icon: Users, value: '5000+', key: 'clients' },
    { icon: MapPin, value: '14', key: 'regions' },
    { icon: Clock, value: '10+', key: 'experience' },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-balance mb-4">
          {t('title')}
        </h1>
        <p className="text-muted-foreground text-lg text-pretty">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {stats.map(({ icon: Icon, value, key }) => (
          <div
            key={key}
            className="rounded-2xl border border-border bg-white p-6 shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-brand" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-2xl text-brand">{value}</p>
              <p className="text-muted-foreground text-sm">{t(`stats.${key}`)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="font-heading font-bold text-2xl mb-4">{t('story')}</h2>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            {t('storyText1')}
          </p>
          <p className="text-muted-foreground leading-relaxed text-pretty mt-4">
            {t('storyText2')}
          </p>
        </div>

        <div>
          <h2 className="font-heading font-bold text-2xl mb-4">{t('mission')}</h2>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            {t('missionText')}
          </p>
        </div>
      </div>
    </div>
  );
}
