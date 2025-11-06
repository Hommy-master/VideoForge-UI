// i18n/server-helpers.ts
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { routing } from './routing';

/**
 * 根据当前 URL 返回「路由名称」+「对应语言包 t 函数」
 * 用法：
 *   const { routeKey, t } = await getRouteIntl();
 */
export async function getRouteIntl(namespace = 'global') {
  // 1. 取当前完整路径
  // ✅ 先 await 拿到真正的 header 对象
  const headerList = await headers();
  const pathname = headerList.get('x-invoke-path') || headerList.get('next-url') || '';

  // 2. 去掉 locale 前缀 → 路由名称（也是命名空间）
  const locale = pathname.match(/^\/(\w{2})(\/|$)/)?.[1] || routing.defaultLocale;
  const routeKey = pathname.replace(`/${locale}`, '').replace(/^\//, '');

  // 3. 按需加载命名空间字典（messages/[locale]/[routeKey].json）
  const t = await getTranslations({ locale, namespace });

  return { locale, routeKey, t };
}
