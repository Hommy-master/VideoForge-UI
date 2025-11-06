import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const isDevelopment = process.env.NODE_ENV === 'development';

export default getRequestConfig(async ({ locale }) => {
  // 这里可以根据请求动态确定语言
  let curLocale = await locale;

  // 确保语言在支持列表中
  if (!curLocale || !routing.locales.includes(curLocale as any)) {
    curLocale = routing.defaultLocale;
  }

  return {
    locale: curLocale,
    messages: (await import(`../messages/${curLocale}.json`)).default,
    // 关键配置：当翻译 key 不存在时直接返回 key
    onError: isDevelopment
      ? (error) => {
          // 在生产环境中可以忽略错误，避免控制台报错
          if (process.env.NODE_ENV === 'development') {
            console.warn('Translation error:', error);
          }
        }
      : undefined,
    // 确保获取消息时的默认行为
    getMessageFallback: ({ key, namespace }) => {
      // 直接返回 key 作为 fallback
      return key;
    },
  };
});
