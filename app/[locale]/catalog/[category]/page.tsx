import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getProductsByCategory, getAllCategories } from '@/lib/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import type { ProductCategory } from '@/types/product';

type Props = {
  params: Promise<{ category: string; locale: string }>;
};

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'catalog.categories' });
  return { title: t(category as ProductCategory) };
}

export default async function CategoryPage({ params }: Props) {
  const { category, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'catalog' });

  const cats = await getAllCategories();
  if (!cats.includes(category as ProductCategory)) notFound();

  const cat = category as ProductCategory;
  const prods = await getProductsByCategory(cat);
  const catLabel = t(`categories.${cat}`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        crumbs={[
          { label: t('title'), href: '/catalog' },
          { label: catLabel },
        ]}
        className="mb-6"
      />
      <h1 className="font-heading font-extrabold text-3xl md:text-4xl mb-8">
        {catLabel}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
        {prods.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
