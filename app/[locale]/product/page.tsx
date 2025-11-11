import { getTranslations } from 'next-intl/server';

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'product' });
  return <h1 className="text-2xl">{t('title')}</h1>;
}
