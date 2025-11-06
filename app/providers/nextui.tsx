'use client';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ALL_THEMES } from '@/lib/consts/common';

export function NextUIProviderWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemeProvider
        attribute="class"
        // defaultTheme={DEFAULT_THEME}
        enableSystem
        // @ts-ignore
        themes={ALL_THEMES}
      >
        {children}
      </NextThemeProvider>
    </NextUIProvider>
  );
}
