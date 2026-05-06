import type { MetadataRoute } from 'next';
import { getAllCategories, getProducts } from '@/lib/products';

export const revalidate = 3600;

const BASE = 'https://zojeshop.uz';
const LOCALES = ['uz', 'ru'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let categories: Awaited<ReturnType<typeof getAllCategories>> = [];
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    [categories, products] = await Promise.all([
      getAllCategories(),
      getProducts(),
    ]);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Dynamic server usage')) {
      throw error;
    }

    console.warn(
      '[zoje sitemap] backend data unavailable',
      error instanceof Error ? error.message : error
    );
  }

  const staticPages = ['', '/catalog', '/about', '/contact'].flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  );

  const categoryPages = categories.flatMap((cat) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}/catalog/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  const productPages = products
    .filter((p) => !p.hidden && !p.placeholder)
    .flatMap((p) =>
      LOCALES.map((locale) => ({
        url: `${BASE}/${locale}/product/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    );

  return [...staticPages, ...categoryPages, ...productPages];
}
