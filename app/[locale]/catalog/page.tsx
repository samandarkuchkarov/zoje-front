import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { CatalogView } from '@/components/catalog/CatalogView';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { MobileFiltersDrawer } from '@/components/catalog/MobileFiltersDrawer';
import { ProductCardSkeleton } from '@/components/catalog/ProductCardSkeleton';
import { getProducts } from '@/lib/products';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'catalog' });
  return { title: `${t('title')} — ${t('subtitle')}` };
}

export default async function CatalogPage() {
  const t = await getTranslations('catalog');
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-3xl md:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Mobile filter bar */}
      <div className="md:hidden mb-4">
        <Suspense>
          <MobileFiltersDrawer />
        </Suspense>
      </div>

      <div className="flex gap-8">
        <div className="hidden md:block w-52 shrink-0">
          <Suspense>
            <CatalogFilters />
          </Suspense>
        </div>

        <div className="flex-1 min-w-0">
          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <CatalogView products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
