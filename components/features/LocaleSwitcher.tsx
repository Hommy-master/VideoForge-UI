// 第1行：添加 useCallback 导入
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Select, SelectItem, SelectSection, Avatar, cn, SharedSelection } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { LANGUAGES } from '@/i18n/config';
import { routing } from '@/i18n/routing';

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
}

export function LanguageSwitcher({ variant = 'default', className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  // 第21行附近：使用 useCallback 包装 getCurrentLocale 函数
  // 从 URL 路径中提取当前语言
  const getCurrentLocale = useCallback(() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments[0] || routing.defaultLocale;
  }, [pathname]); // 添加 pathname 作为依赖项

  const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLocale());
  const [isLoading, setIsLoading] = useState(false);

  // 第32行附近：useEffect 依赖数组保持不变
  // 当路由变化时更新选中状态
  useEffect(() => {
    setSelectedLanguage(getCurrentLocale());
  }, [pathname, getCurrentLocale]);

  const handleLanguageChange = async (keys: SharedSelection) => {
    const keySet = new Set<string>();
    if (typeof keys === 'string') {
      keySet.add(keys);
    } else if (keys && typeof keys === 'object' && 'currentKey' in keys && keys.currentKey) {
      keySet.add(keys.currentKey);
    }
    const newLocale = Array.from(keys)[0] as string;
    if (!newLocale || newLocale === selectedLanguage) return;

    setIsLoading(true);
    setSelectedLanguage(newLocale);

    try {
      // 构建新的 URL - 替换路径中的语言部分
      const pathSegments = pathname.split('/').filter(Boolean);
      const currentLocale = pathSegments[0];

      // 如果当前路径已经有语言前缀，替换它
      if (LANGUAGES.some((lang) => lang.key === currentLocale)) {
        pathSegments[0] = newLocale;
      } else {
        // 否则在开头插入新的语言
        pathSegments.unshift(newLocale);
      }

      const newPath = `/${pathSegments.join('/')}`;
      router.push(newPath);
    } catch (error) {
      console.error('Language switch failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 紧凑模式 - 只显示国旗和语言代码
  if (variant === 'compact') {
    // const currentLang = LANGUAGES.find((lang) => lang.key === selectedLanguage) || LANGUAGES[0];

    return (
      <Select
        aria-label={t('selectLanguage')}
        selectedKeys={new Set([selectedLanguage])}
        onSelectionChange={handleLanguageChange}
        isLoading={isLoading}
        className={cn('min-w-20', className)}
        variant="bordered"
        size="sm"
        disallowEmptySelection
      >
        {LANGUAGES.map((language) => (
          <SelectItem
            key={language.key}
            textValue={language.label}
            startContent={<span className="text-lg">{language.flag}</span>}
          >
            {language.shortName}
          </SelectItem>
        ))}
      </Select>
    );
  }

  // 极简模式 - 只显示下拉选择器
  if (variant === 'minimal') {
    return (
      <Select
        aria-label={t('selectLanguage')}
        selectedKeys={new Set([selectedLanguage])}
        onSelectionChange={handleLanguageChange}
        isLoading={isLoading}
        className={cn('min-w-24', className)}
        variant="flat"
        size="sm"
        disallowEmptySelection
      >
        {LANGUAGES.map((language) => (
          <SelectItem key={language.key} textValue={language.label}>
            {language.shortName}
          </SelectItem>
        ))}
      </Select>
    );
  }

  // 默认模式 - 完整显示
  return (
    <Select
      aria-label={t('selectLanguage')}
      selectedKeys={new Set([selectedLanguage])}
      onSelectionChange={handleLanguageChange}
      isLoading={isLoading}
      className={cn('min-w-40', className)}
      variant="bordered"
      size="md"
      disallowEmptySelection
      label={t('language')}
      labelPlacement="outside-left"
    >
      <SelectSection showDivider>
        {LANGUAGES.map((language) => (
          <SelectItem
            key={language.key}
            textValue={language.label}
            startContent={
              <div className="flex items-center gap-2">
                <span className="text-xl">{language.flag}</span>
                <Avatar
                  alt={language.label}
                  className="w-6 h-6"
                  src={`/flags/${language.key}.svg`} // 可选：使用 SVG 国旗图标
                />
              </div>
            }
          >
            <div className="flex flex-col">
              <span className="text-small">{language.label}</span>
              <span className="text-tiny text-default-400">{language.shortName}</span>
            </div>
          </SelectItem>
        ))}
      </SelectSection>
    </Select>
  );
}

// 简化版本 - 用于导航栏
export function CompactLanguageSwitcher() {
  return <LanguageSwitcher variant="compact" />;
}

// 极简版本 - 用于移动端或空间紧张的地方
export function MinimalLanguageSwitcher() {
  return <LanguageSwitcher variant="minimal" />;
}
