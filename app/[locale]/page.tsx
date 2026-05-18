import { getTranslations, getLocale } from 'next-intl/server';
import { connection } from 'next/server';
import { HeroSection } from '@/components/home/HeroSection';
import { WhyUsSection } from '@/components/home/WhyUsSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { TelegramNewsStrip } from '@/components/home/TelegramNewsStrip';
import { CtaSection } from '@/components/home/CtaSection';
import { AboutCompanySection } from '@/components/home/AboutCompanySection';
import { ProductCard } from '@/components/catalog/ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import { getLatestChannelPosts } from '@/lib/telegram-channel';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const locale = (await getLocale()) as 'uz' | 'ru';
  await connection();
  const [featured, telegramPosts] = await Promise.all([
    getFeaturedProducts(),
    getLatestChannelPosts('ZOJEUZBEKISTAN', 8),
  ]);

  return (
    <>
      <HeroSection />

      <section className="py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t('featured.title')}
            subtitle={t('featured.subtitle')}
          />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/catalog">
              <Button variant="outline" className="gap-2">
                {tCommon('seeAll')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <AboutCompanySection />
      <WhyUsSection />
      <TelegramNewsStrip posts={telegramPosts} channel="ZOJEUZBEKISTAN" locale={locale} />
      <ReviewsSection locale={locale} />
      <CtaSection />
    </>
  );
}
