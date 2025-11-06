'use client';

import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

export default function LoginButton() {
  const t = useTranslations('common');
  return <Button color="warning">{t('login')}</Button>;
}
