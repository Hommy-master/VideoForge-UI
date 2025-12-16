import { getMessages } from 'next-intl/server';
import { NextIntlProviderWrapper, NextUIProviderWrapper } from '@/app/providers';

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
    <>
      <head>
        <meta name="description" content="Demo应用 - 您的应用描述" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://example.com/${locale}`} />
      </head>
      <body className="antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
        <NextIntlProviderWrapper messages={messages} locale={locale}>
          <NextUIProviderWrapper>{children}</NextUIProviderWrapper>
        </NextIntlProviderWrapper>
      </body>
    </>
  );
}
