import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const backendUrl = (
  process.env.ZOJE_API_URL ?? 'http://87.106.190.187:11286'
).replace(/\/$/, '');
const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

function assetRemotePatterns() {
  const patterns: NonNullable<NonNullable<NextConfig['images']>['remotePatterns']> = [
    {
      protocol: 'http' as const,
      hostname: 'localhost',
      port: '4000',
      pathname: '/assets/**',
    },
    {
      protocol: 'http' as const,
      hostname: '127.0.0.1',
      port: '4000',
      pathname: '/assets/**',
    },
    {
      protocol: 'http' as const,
      hostname: '87.106.190.187',
      port: '11286',
      pathname: '/assets/**',
    },
  ];

  if (publicSiteUrl?.startsWith('http')) {
    const url = new URL(publicSiteUrl);
    patterns.push({
      protocol: url.protocol.replace(':', '') as 'http' | 'https',
      hostname: url.hostname,
      port: url.port,
      pathname: '/assets/**',
    });
  }

  return patterns;
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    dangerouslyAllowLocalIP: true,
    remotePatterns: assetRemotePatterns(),
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/backend-api/:path*',
          destination: `${backendUrl}/:path*`,
        },
        {
          source: '/backend-assets/:path*',
          destination: `${backendUrl}/assets/:path*`,
        },
      ],
    };
  },
};

export default withNextIntl(nextConfig);
