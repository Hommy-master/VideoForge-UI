import {nextui} from '@nextui-org/react';
import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* 使用themes.css中的变量 */
        primary: 'hsl(var(--nextui-primary) / <alpha-value>)',
        'primary-foreground': 'hsl(var(--nextui-primary-foreground) / <alpha-value>)',
        secondary: 'hsl(var(--nextui-secondary) / <alpha-value>)',
        'secondary-foreground': 'hsl(var(--nextui-secondary-foreground) / <alpha-value>)',
        background: 'hsl(var(--nextui-background) / <alpha-value>)',
        foreground: 'hsl(var(--nextui-foreground) / <alpha-value>)',
        // 从dark主题中添加的变量
        'dark-bg': 'var(--color-background)',
        'dark-text': 'var(--color-text)',
        'dark-border': 'var(--color-border)',
      },
      fontSize: {
        base: 'var(--font-size-base)',
      },
      spacing: {
        unit: 'var(--spacing-unit)',
      },
    },
  },
  plugins: [nextui()],
};
export default config;