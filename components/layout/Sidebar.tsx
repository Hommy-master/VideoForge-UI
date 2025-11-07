'use client';
import { Card, CardBody } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { navItems, NavItem } from '@/lib/consts/nav';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePath, setActivePath] = useState('');

  // 在客户端初始化路径
  useEffect(() => {
    const cleanPathname = pathname.replace(/^\/(en|zh)/, '') || '/';
    setActivePath(cleanPathname);
  }, [pathname]);

  // 检查路径是否激活
  const isPathActive = (href: string) => {
    return activePath === href || activePath.startsWith(href + '/');
  };

  // 切换侧边栏折叠状态
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 渲染导航项
  const renderNavItem = (item: NavItem) => {
    const IconComponent = item.icon || Menu;
    const isActive = isPathActive(item.href);

    return (
      <li key={item.key} className="px-3 relative">
        <Link
          href={item.href}
          className={`flex items-center w-full h-10 rounded-lg justify-items-center transition-colors text-left ${isCollapsed ? 'px-2.5' : 'px-3'}
            ${isActive ? 'bg-gray-100 dark:bg-gray-800 font-medium text-black dark:text-white' : 'text-[#191919] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          aria-current={isActive ? 'page' : undefined}
        >
          <IconComponent
            className="w-5 h-5"
            fill={isActive ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={1.5}
          />
          {!isCollapsed && <span className="ml-3">{t(item.key)}</span>}
        </Link>
      </li>
    );
  };

  return (
    <Card
      className={`h-screen border-r rounded-none shadow-sm transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
      aria-label="主导航菜单"
    >
      <CardBody className="p-0 h-full flex flex-col">
        {/* 品牌标识和折叠按钮 */}
        <div className="py-4 px-3 flex items-center justify-between">
          {!isCollapsed && (
            <Link
              href="/"
              className={`flex items-center gap-2 font-bold text-xl ${isCollapsed ? 'justify-center w-full' : ''}`}
            >
              <Image alt="简创AI" width={28} height={28} src="/logo.png" />
              简创AI
            </Link>
          )}
          <button
            className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 ${isCollapsed ? 'w-full justify-center flex' : ''}`}
            onClick={toggleSidebar}
            aria-label={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
          >
            {/* {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />} */}
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM112,72H216a8,8,0,0,0,0-16H112a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM34.34,141.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0,0-11.32l-40-40A8,8,0,0,0,34.34,61.66L68.69,96,34.34,130.34A8,8,0,0,0,34.34,141.66Z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM112,72H216a8,8,0,0,0,0-16H112a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM72,144a8,8,0,0,0,5.66-13.66L43.31,96,77.66,61.66A8,8,0,0,0,66.34,50.34l-40,40a8,8,0,0,0,0,11.32l40,40A8,8,0,0,0,72,144Z"></path>
              </svg>
            )}
          </button>
        </div>

        {/* 导航菜单 */}
        <nav aria-label="主要导航" className="flex-1 py-4">
          <ul className="space-y-1">{navItems.map((item) => renderNavItem(item))}</ul>
        </nav>
      </CardBody>
    </Card>
  );
}
