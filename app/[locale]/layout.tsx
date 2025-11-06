import { getMessages } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { NextIntlProviderWrapper, NextUIProviderWrapper } from '@/app/providers';
import { Suspense } from 'react';
import Footer from '@/components/layout/Footer';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  // 预加载关键组件以改善性能
  const PreloadedSidebar = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    return <Sidebar />;
  };

  return (
    <html lang={locale} className="light" suppressHydrationWarning>
      <head>
        {/* 基础SEO元信息 - 实际项目中应根据具体页面内容动态生成 */}
        <meta name="description" content="Demo应用 - 您的应用描述" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://example.com/${locale}`} />
      </head>
      <body className="antialiased text-gray-900 bg-white">
        <NextIntlProviderWrapper messages={messages} locale={locale}>
          <NextUIProviderWrapper>
            <div className="h-screen flex overflow-hidden">
              {/* 左侧导航栏 - 使用Suspense确保页面内容优先加载 */}
              <aside className="shrink-0">
                <Suspense fallback={null}>
                  <Sidebar />
                </Suspense>
              </aside>

              {/* 右侧内容区 */}
              <div className="h-screen flex-1 flex flex-col overflow-y-auto">
                {/* 顶部操作按钮 */}
                <Header />

                {/* 主要内容区域 */}
                <main className="flex-1 py-[24px] px-[64px] focus:outline-none" tabIndex={-1}>
                  {children}
                </main>
                
                {/* 将Footer移到main标签外，确保始终在底部 */}
                <Footer />
              </div>
            </div>
          </NextUIProviderWrapper>
        </NextIntlProviderWrapper>
      </body>
    </html>
  );
}
