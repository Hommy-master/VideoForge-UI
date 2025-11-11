/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jcaigc.cn', // 替换为您的网站URL
  generateRobotsTxt: true, // 同时生成robots.txt
  exclude: [], // 要排除的路径
  // 多语言配置
  alternateRefs: [
    { hrefLang: 'zh', href: 'https://jcaigc.cn/zh' },
    { hrefLang: 'en', href: 'https://jcaigc.cn/en' },
    { hrefLang: 'x-default', href: 'https://jcaigc.cn/zh' }, // 默认语言
  ],
  // 自定义sitemap生成函数，处理多语言路由
  transform: async (config, path) => {
    // 基础URL结构
    const basePath = path.replace(/^\/(zh|en)/, '');

    // 为每个支持的语言生成URL
    const alternates = [];
    ['zh', 'en'].forEach((locale) => {
      alternates.push({
        href: `${config.siteUrl}/${locale}${basePath || ''}`,
        hreflang: locale,
      });
    });

    return {
      loc: path === '/' ? `${config.siteUrl}/zh` : `${config.siteUrl}${path}`,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: alternates,
    };
  },
};
