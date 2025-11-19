'use client';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import LoginModal from './LoginModal';

export default function LoginButton() {
  const t = useTranslations('common');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginPress = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        color="primary"
        onPress={handleLoginPress}
        className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white"
      >
        {t('login')}
      </Button>
      <LoginModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
