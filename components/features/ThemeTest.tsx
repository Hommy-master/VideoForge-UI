'use client';
import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/react';
import { ALL_THEMES } from '@/lib/consts/common';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2">
      {ALL_THEMES.map((t) => (
        <Button key={t} size="sm" color={t === theme ? 'primary' : 'default'} onPress={() => setTheme(t)}>
          {t}
        </Button>
      ))}
    </div>
  );
}
