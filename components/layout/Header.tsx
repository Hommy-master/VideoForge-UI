'use client';
import { Button, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Crown } from 'lucide-react';
// import { CompactLanguageSwitcher } from '@/components/features/LocaleSwitcher';
import LoginButton from '@/components/features/LoginButton';
// import { ThemeSwitcher } from '@/components/features/ThemeSwitcher';

export default function TopNav() {
  return (
    <Navbar className="sticky jc-top-nav" role="navigation" aria-label="顶部操作栏">
      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <Button className="black-gradient text-[#ffba38]">
            <Crown color="#ffba38" fill="#ffba38" />
            会员
          </Button>
        </NavbarItem>
        <NavbarItem>
          <LoginButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
