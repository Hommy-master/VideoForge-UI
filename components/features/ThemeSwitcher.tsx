'use client';

import { Button, ButtonProps } from '@nextui-org/react';
import { Moon, SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const iconProps = {
  size: 16,
};

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const buttonProps: ButtonProps = {
    radius: 'full',
    isIconOnly: true,
    variant: 'light',
  };

  return (
    <>
      {theme === 'dark' ? (
        <Button {...buttonProps} onPress={() => setTheme('light')} startContent={<Moon {...iconProps} />} />
      ) : (
        <Button {...buttonProps} onPress={() => setTheme('dark')} startContent={<SunDim {...iconProps} />} />
      )}
    </>
  );
}
