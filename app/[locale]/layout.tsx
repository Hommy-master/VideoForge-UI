import { getMessages } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { NextIntlProviderWrapper, NextUIProviderWrapper } from '@/app/providers';
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

  return (
    <html lang={locale} className="light">
      <head>
        <meta name="description" content="Demo应用 - 您的应用描述" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://example.com/${locale}`} />
      </head>
      <body className="antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
        <NextIntlProviderWrapper messages={messages} locale={locale}>
          <NextUIProviderWrapper>
            <div className="h-screen flex overflow-hidden">
              {/* 左侧导航栏 */}
              <aside className="shrink-0">
                <Sidebar />
              </aside>

              {/* 右侧内容区 */}
              <div className="h-screen flex-1 flex flex-col overflow-y-auto">
                <Header />

                <main className="h-[calc(100vh-64px)] flex-1 focus:outline-none min-w-[800px]" tabIndex={-1}>
                  {children}
                </main>
              </div>
            </div>
          </NextUIProviderWrapper>
        </NextIntlProviderWrapper>
      </body>
    </html>
  );
}
