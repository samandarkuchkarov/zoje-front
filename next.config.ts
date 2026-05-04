import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const backendUrl = (
  process.env.ZOJE_API_URL ?? 'http://87.106.190.187:11286'
).replace(/\/$/, '');

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/assets/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
        pathname: '/assets/**',
      },
      {
        protocol: 'http',
        hostname: '87.106.190.187',
        port: '11286',
        pathname: '/assets/**',
      },
    ],
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
