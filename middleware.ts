import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配所有路径，除了静态文件、API路由等
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/(zh|en|ja)/:path*'
  ]
};