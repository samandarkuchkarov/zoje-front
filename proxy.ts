import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|backend-api|backend-assets|_next|_vercel|.*\\..*).*)'],
};
