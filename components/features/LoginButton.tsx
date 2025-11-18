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
        className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
      >
        {t('login')}
      </Button>
      <LoginModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
