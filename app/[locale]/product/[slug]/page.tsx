import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getProductBySlug, getProducts, getRelatedProducts } from '@/lib/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { ProductCard } from '@/components/catalog/ProductCard';
import { PriceTag } from '@/components/shared/PriceTag';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SpecsTable } from '@/components/product/SpecsTable';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const lang = locale as 'uz' | 'ru';
  return {
    title: product.name[lang],
    description: product.shortDescription[lang],
    openGraph: {
      title: product.name[lang],
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, locale } = await params;
  const lang = locale as 'uz' | 'ru';
  const t = await getTranslations({ locale, namespace: 'product' });
  const tCat = await getTranslations({ locale, namespace: 'catalog' });

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        crumbs={[
          { label: tCat('title'), href: '/catalog' },
          { label: tCat(`categories.${product.category}`), href: `/catalog/${product.category}` },
          { label: product.model },
        ]}
        className="mb-6"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery
          images={product.images}
          videoUrls={product.videoUrls}
          alt={product.name[lang]}
        />

        <div className="space-y-5">
          <div>
            <Badge variant="secondary" className="mb-3 text-xs">
              {tCat(`categories.${product.category}`)}
            </Badge>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-balance">
              {product.name[lang]}
            </h1>
            <p className="text-muted-foreground text-sm mt-1 font-medium">{t('model')}: {product.model}</p>
          </div>

          <PriceTag price={product.price} oldPrice={product.oldPrice} size="lg" />

          <Badge
            className={
              product.inStock
                ? 'bg-brand-light text-brand border-brand/20'
                : 'bg-muted text-muted-foreground'
            }
          >
            {product.inStock ? t('inStock') : t('outOfStock')}
          </Badge>

          <p className="text-muted-foreground text-pretty leading-relaxed">
            {product.shortDescription[lang]}
          </p>

          <Separator />

          <div className="flex flex-wrap gap-3">
            <AddToCartButton product={product} />
          </div>

          <Separator />

          <div>
            <h2 className="font-heading font-bold text-lg mb-4">{t('specs')}</h2>
            <SpecsTable specs={product.specs} />
          </div>
        </div>
      </div>

      {product.description[lang] && (
        <div className="mt-16">
          <h2 className="font-heading font-bold text-2xl mb-4">{t('description')}</h2>
          <p className="text-muted-foreground leading-relaxed text-pretty max-w-3xl">
            {product.description[lang]}
          </p>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-20">
          <SectionHeader title={t('related')} className="mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name[lang],
            description: product.shortDescription[lang],
            sku: product.model,
            brand: { '@type': 'Brand', name: 'Zoje' },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'UZS',
              availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              seller: { '@type': 'Organization', name: 'Zoje' },
            },
          }),
        }}
      />
    </div>
  );
}
