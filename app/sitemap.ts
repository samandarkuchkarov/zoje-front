import type { MetadataRoute } from 'next';
import { getAllCategories, getProducts } from '@/lib/products';

const BASE = 'https://zoje.uz';
const LOCALES = ['uz', 'ru'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getProducts(),
  ]);

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

  const productPages = products.flatMap((p) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}/product/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...categoryPages, ...productPages];
}
