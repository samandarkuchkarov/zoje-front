import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/uz/admin', '/ru/admin', '/admin'],
    },
    sitemap: 'https://zoje.uz/sitemap.xml',
  };
}
