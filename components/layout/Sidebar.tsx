'use client';
import { Card, CardBody } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { navItems } from '@/lib/consts/nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, FileText, Users, Bell, HelpCircle, Menu } from 'lucide-react'; // 导入图标组件

export default function Sidebar() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  // 过滤掉语言前缀，如/en或/zh
  const cleanPathname = pathname.replace(/^\/(en|zh)/, '') || '/';

  // 图标映射，为不同的导航项分配对应的图标
  const iconMap: Record<string, React.ElementType> = {
    home: Home,
    product: FileText,
    users: Users,
    settings: Settings,
    notifications: Bell,
    help: HelpCircle,
  };

  return (
    <Card className="h-screen border-r rounded-none w-64 shadow-sm" aria-label="主导航菜单">
      <CardBody className="p-0 h-full flex flex-col">
        {/* 品牌标识 */}
        <div className="py-4 px-3">
          <Link href="/" className="font-bold text-amber-600 hover:text-amber-400 flex item-center text-xl">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
            简创AI
          </Link>
        </div>

        {/* 导航菜单 */}
        <nav aria-label="主要导航" className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map(({ key, href }) => {
              // 使用过滤后的路径进行匹配
              const isActive = cleanPathname === href || cleanPathname.startsWith(href + '/');

              // 获取当前导航项对应的图标，如果没有匹配的图标则使用Home图标作为默认值
              const IconComponent = iconMap[key] || Menu;

              return (
                <li key={key} className="px-3">
                  <Link
                    href={href}
                    className={`flex items-center w-full h-10 px-3 rounded-lg transition-colors text-left 
                      text-[#191919] hover:bg-gray-100 hover:text-black hover:opacity-100 
                      ${isActive ? 'bg-gray-100 font-medium text-black opacity-100' : 'opacity-50'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <IconComponent
                      className="w-5 h-5 mr-3"
                      // 修改填充和描边样式
                      fill={isActive ? 'black' : 'none'} // 激活时填充为黑色
                      stroke={isActive ? 'white' : 'currentColor'} // 激活时内部线条为白色
                      strokeWidth={1.5} // 保持适当的描边宽度
                    />
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </CardBody>
    </Card>
  );
}
