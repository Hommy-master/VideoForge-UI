import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts'); // 路径指向上面文件

const nextConfig: import('next').NextConfig = {
    eslint: {
        // 仅在生产构建时对 'pages' 和 'components' 目录运行 ESLint
        dirs: ['app', 'components', 'lib'],
      },
};
export default withNextIntl(nextConfig);