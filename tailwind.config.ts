import {nextui} from '@nextui-org/react';
import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // ❶ 关键：让 Tailwind 扫描 NextUI 的样式源
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // darkMode: ['class', '[data-theme="dark"]'], // 与 next-themes 属性保持一致
  darkMode: 'class',
  theme: {
    // extend: {
    //   colors: {
    //     /* 关键：只写一行，所有主题共用变量名 */
    //     primary: 'hsl(var(--color-primary) / <alpha-value>)',
    //     'primary-foreground': 'hsl(var(--color-primary-foreground) / <alpha-value>)',
    //     background: 'hsl(var(--color-background) / <alpha-value>)',
    //     foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
    //   },
    //   fontSize: {
    //     base: 'var(--font-size-base)',
    //   },
    //   spacing: {
    //     unit: 'var(--spacing-unit)',
    //   },
    //   borderRadius: {
    //     DEFAULT: 'var(--radius)',
    //   },
    // },
  },
  plugins: [nextui()], // ❷ 注册插件
};
export default config;