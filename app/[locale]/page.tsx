'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import {
  ChevronRight,
  ArrowRight,
  PlayCircle,
  Heart,
  Image as ImageIcon,
  FileText,
  Video,
  Code,
  Mic,
  Music,
  MessageSquare,
  Palette,
  Layers,
  Zap,
  Share2,
  Settings,
} from 'lucide-react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import { linkClassName } from '@/lib/consts/className';
import Footer from '@/components/layout/Footer';

// Mock数据 - 修改为三个不同色系的淡颜色渐变
const section1Data = [
  {
    id: 1,
    title: 'AI绘画创作',
    subtitle: '使用人工智能生成精美画作',
    videoUrl: '/showcase/1.png', // 这里用图片代替视频
    bgColor: 'from-blue-100 to-blue-200', // 蓝色系淡颜色渐变
  },
  {
    id: 2,
    title: '智能内容生成',
    subtitle: '快速创建高质量文章和脚本',
    videoUrl: '/showcase/2.png',
    bgColor: 'from-purple-100 to-purple-200', // 紫色系淡颜色渐变
  },
  {
    id: 3,
    title: '视频编辑助手',
    subtitle: '轻松剪辑和优化您的视频',
    videoUrl: '/showcase/3.png',
    bgColor: 'from-green-100 to-green-200', // 绿色系淡颜色渐变
  },
];

// AI工具数据（10+个工具）
const toolsData = [
  {
    id: 1,
    title: 'AI绘画助手',
    subtitle: '根据描述生成精美图像',
    icon: <ImageIcon />,
    tag: '热门',
  },
  {
    id: 2,
    title: '文案生成器',
    subtitle: '快速创作高质量文章和营销文案',
    icon: <FileText />,
  },
  {
    id: 3,
    title: '视频生成器',
    subtitle: 'AI一键生成创意短视频',
    icon: <Video />,
    tag: '新品',
  },
  {
    id: 4,
    title: '代码助手',
    subtitle: '智能编码和代码优化建议',
    icon: <Code />,
  },
  {
    id: 5,
    title: '语音转文字',
    subtitle: '高效准确的语音识别服务',
    icon: <Mic />,
  },
  {
    id: 6,
    title: '音乐创作',
    subtitle: 'AI辅助音乐作曲和编曲',
    icon: <Music />,
    tag: '会员',
  },
  {
    id: 7,
    title: '对话机器人',
    subtitle: '智能客服和问答系统',
    icon: <MessageSquare />,
  },
  {
    id: 8,
    title: '设计助手',
    subtitle: 'UI/UX设计元素生成',
    icon: <Palette />,
    tag: '推荐',
  },
  {
    id: 9,
    title: '3D模型生成',
    subtitle: '从2D到3D的快速转换',
    icon: <Layers />,
  },
  {
    id: 10,
    title: '智能翻译',
    subtitle: '多语言精准翻译服务',
    icon: <Share2 />,
  },
  {
    id: 11,
    title: '内容优化',
    subtitle: 'SEO和可读性提升',
    icon: <Zap />,
    tag: '热门',
  },
  {
    id: 12,
    title: '个性化设置',
    subtitle: '定制您的AI创作偏好',
    icon: <Settings />,
  },
];

const section4Data = [
  { id: 1, image: '/showcase/1.png', isMemberOnly: true, link: '/product' },
  { id: 2, image: '/showcase/2.png', isMemberOnly: false, link: '/product' },
  { id: 3, image: '/showcase/3.png', isMemberOnly: true, link: '/product' },
  { id: 4, image: '/showcase/4.png', isMemberOnly: false, link: '/product' },
  { id: 5, image: '/showcase/1.png', isMemberOnly: true, link: '/product' },
  { id: 6, image: '/showcase/2.png', isMemberOnly: false, link: '/product' },
  { id: 7, image: '/showcase/3.png', isMemberOnly: true, link: '/product' },
];

// 移除async关键字，因为Client Components不能是异步的
export default function HomePage({ params }: { params: { locale: string } }) {
  // 状态管理
  const [expanded, setExpanded] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理滚动
  const scrollLeft = () => {
    if (containerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 300);
      containerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const newPosition = Math.min(
        containerRef.current.scrollWidth - containerRef.current.clientWidth,
        scrollPosition + 300
      );
      containerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  // 控制显示的工具数量
  const displayTools = useMemo(() => {
    return expanded ? toolsData : toolsData.slice(0, 8);
  }, [expanded]);

  // 监听滚动位置并更新按钮显示状态
  useEffect(() => {
    const updateScrollButtons = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

        // 当滚动位置大于0时可以向左滚动
        setCanScrollLeft(scrollLeft > 5); // 添加小阈值避免抖动

        // 当滚动到底部时不能向右滚动（添加小阈值避免抖动）
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    // 初始检查
    updateScrollButtons();

    // 添加滚动事件监听
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
    }

    // 添加窗口大小变化监听（响应式布局变化）
    window.addEventListener('resize', updateScrollButtons);

    // 清理函数
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollButtons);
      }
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [containerRef]);

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-1 flex-grow  py-[24px] px-[64px] ">
        {/* Section 1: 三个卡片 */}
        <section className="pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {section1Data.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-r ${item.bgColor} p-6 rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow`}
              >
                <div className="flex flex-col md:flex-row h-full gap-4">
                  {/* 左侧内容 */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.subtitle}</p>
                    </div>
                    <Button className="bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 self-start w-fit">
                      了解更多 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  {/* 右侧视频 */}
                  <div className="w-full md:w-1/2 bg-white/40 relative rounded-xl h-[135px] overflow-hidden">
                    <Image
                      src={item.videoUrl}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full">
                        <PlayCircle className="h-8 w-8 text-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 ">AI工具 · 助力创作</h2>
            <Button className={linkClassName} onPress={() => setExpanded(!expanded)}>
              {expanded ? '收起工具' : '展开全部'} <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 ${!expanded && 'max-h-[560px] overflow-hidden'}`}
          >
            {displayTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-gray-100 h-[100px] rounded-lg p-4 flex items-center gap-4 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {/* 图标 */}
                <div className="bg-white rounded-full p-3 w-fit">
                  <div className="text-blue-500">{tool.icon}</div>
                </div>

                {/* 内容 */}
                <div className="flex-grow">
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium text-gray-900">{tool.title}</h3>
                    {tool.tag && (
                      <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded-full ${tool.tag === '热门' ? 'bg-red-100 text-red-600' : tool.tag === '新品' ? 'bg-green-100 text-green-600' : tool.tag === '会员' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}
                      >
                        {tool.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{tool.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: 可滑动卡片 */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">热门作品</h2>
            <Link href="/product" className={linkClassName} aria-label="查看全部作品">
              全部作品 <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            {/* 左箭头 - 只在可以向左滚动时显示 */}
            {canScrollLeft && (
              <div
                onClick={scrollLeft}
                className="left-slide-gradient absolute left-0 top-0 h-full w-20 z-10 flex items-center justify-start px-4"
              >
                <Image
                  src="/icons/arrow-left-big.png"
                  alt="Scroll left"
                  width={20}
                  height={20}
                  className="ml-[-20px]"
                />
              </div>
            )}

            {/* 右箭头 - 只在可以向右滚动时显示 */}
            {canScrollRight && (
              <div
                onClick={scrollRight}
                className="right-slide-gradient absolute right-0 top-0 h-full w-20 z-10 flex items-center justify-end px-4 "
              >
                <Image
                  src="/icons/arrow-right-big.png"
                  alt="Scroll right"
                  width={20}
                  height={20}
                  className="mr-[-20px]"
                />
              </div>
            )}

            {/* 滚动容器 */}
            <div
              ref={containerRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-2"
              onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
            >
              {section4Data.map((item) => (
                <a key={item.id} href={item.link} className="flex-shrink-0 w-64 relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`作品 ${item.id}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* 会员标记 */}
                    {item.isMemberOnly && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                        会员专享
                      </div>
                    )}

                    {/* 收藏按钮 (hover时显示) */}
                    <button
                      className="absolute top-2 right-2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="收藏"
                    >
                      <Heart className="h-4 w-4 text-gray-700" />
                    </button>

                    {/* 创作视频按钮 (hover时显示) */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="bg-black/80 text-white hover:bg-black text-sm" size="sm">
                        <PlayCircle className="mr-1 h-4 w-4" />
                        创作视频
                      </Button>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
