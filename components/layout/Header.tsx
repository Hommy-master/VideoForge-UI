'use client';
import { Button, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Crown } from 'lucide-react';
// import { CompactLanguageSwitcher } from '@/components/features/LocaleSwitcher';
import LoginButton from '@/components/features/LoginButton';
// import { ThemeSwitcher } from '@/components/features/ThemeSwitcher';

export default function TopNav() {
  return (
    <Navbar className="sticky" role="navigation" aria-label="顶部操作栏">
      <NavbarContent justify="end" className="gap-4">
        {/* <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem> */}
        {/* <NavbarItem>
          <CompactLanguageSwitcher />
        </NavbarItem> */}
        <NavbarItem>
          <Button className="bg-gradient-to-br from-[#111113] to-[#3f3f47] text-[#ffe1c1] hover:opacity-90">
            <Crown />会员
          </Button>
        </NavbarItem>
        <NavbarItem>
          <LoginButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
