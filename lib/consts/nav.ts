import { FileText, Home, Image, Video } from 'lucide-react';

// 更新NavItem类型定义，将icon属性类型更改为React组件类型
export type NavItem = {
  key: string; // i18n 键
  icon?: React.ElementType; // 图标组件类型
  href: string; // 路由
  children?: NavItem[]; // 子菜单
};

enum NavKeys {
  Home = 'home',
  Image = 'image-generator',
  Video = 'video-generator',
  Product = 'product',
}

export const navItems: NavItem[] = [
  {
    key: NavKeys.Home,
    icon: Home,
    href: '/',
  },
  // {
  //   key: NavKeys.Image,
  //   icon: Image,
  //   href: `/image-generator`,
  // },
  {
    key: NavKeys.Video,
    icon: Video,
    href: `/video-generator`,
  },
  // {
  //   key: NavKeys.Product,
  //   icon: FileText,
  //   href: `/${NavKeys.Product}`,
  // },
];
