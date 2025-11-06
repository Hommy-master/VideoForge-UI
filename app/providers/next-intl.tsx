// app/providers/next-intl.tsx
'use client';

import { NextIntlClientProvider } from 'next-intl';

interface NextIntlProviderWrapperProps {
  messages: any;
  locale: string;
  children: React.ReactNode;
}

export function NextIntlProviderWrapper({ messages, locale, children }: NextIntlProviderWrapperProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      getMessageFallback={({ key }) => key}
      onError={(error) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Translation error:', error);
        }
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
