import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

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
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.7s ease-out forwards',
        blob: 'blob 7s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -20px) scale(1.1)' },
          '50%': { transform: 'translate(0, 20px) scale(0.9)' },
          '75%': { transform: 'translate(-20px, -20px) scale(1.1)' },
        },
      },
    },
  },
  plugins: [nextui()], // ❷ 注册插件
};
export default config;
