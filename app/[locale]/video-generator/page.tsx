'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import DefaultLayout from '../defaultLayout';

import {
  PlayCircle,
  Image as ImageIcon,
  Film,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  CirclePlus,
  Plus,
} from 'lucide-react';
// import { getTranslations } from 'next-intl/server';

// 视频灵感数据
const videoInspirations = [
  { id: 1, thumbnail: '/showcase/1.png', title: '动态风景' },
  { id: 2, thumbnail: '/showcase/2.png', title: '城市日落' },
  { id: 3, thumbnail: '/showcase/3.png', title: '科技感UI' },
  { id: 4, thumbnail: '/showcase/4.png', title: '自然探索' },
  { id: 5, thumbnail: '/showcase/1.png', title: '创意动画' },
  { id: 6, thumbnail: '/showcase/2.png', title: '商业宣传' },
  { id: 7, thumbnail: '/showcase/3.png', title: '产品展示' },
  { id: 8, thumbnail: '/showcase/4.png', title: '抽象艺术' },
  { id: 9, thumbnail: '/showcase/1.png', title: '旅行记录' },
  { id: 10, thumbnail: '/showcase/2.png', title: '美食制作' },
  { id: 11, thumbnail: '/showcase/3.png', title: '时尚走秀' },
  { id: 12, thumbnail: '/showcase/4.png', title: '体育赛事' },
  { id: 13, thumbnail: '/showcase/1.png', title: '教育讲解' },
  { id: 14, thumbnail: '/showcase/2.png', title: '音乐现场' },
  { id: 15, thumbnail: '/showcase/3.png', title: '游戏实况' },
  { id: 16, thumbnail: '/showcase/4.png', title: '宠物日常' },
];

// 主组件
const VideoGeneratorPage: React.FC<{ params: { locale: string } }> = ({ params }) => {
  // const { locale } = params;
  // const t = getTranslations({ locale, namespace: 'video-generator' });

  const [prompt, setPrompt] = useState('');
  const [showInspiration, setShowInspiration] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'image' | 'video'>('video');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // 检查滚动区域是否可以滚动
  const checkScrollability = () => {
    if (scrollAreaRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollAreaRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // 监听滚动和窗口大小变化
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      // 初始检查
      checkScrollability();

      // 监听滚动事件
      scrollArea.addEventListener('scroll', checkScrollability);
      // 监听窗口大小变化
      window.addEventListener('resize', checkScrollability);

      // 清理事件监听
      return () => {
        scrollArea.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  // 当灵感库显示状态改变时，重新检查滚动状态
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showInspiration) {
      // 使用setTimeout确保DOM已更新
      timeoutId = setTimeout(() => {
        checkScrollability();
      }, 10);
    }
    // 清理函数，清除定时器
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showInspiration]);

  // 滚动控制函数
  const scrollInspirations = (direction: 'left' | 'right') => {
    if (scrollAreaRef.current) {
      const scrollAmount = 300;
      scrollAreaRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <DefaultLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-background to-background/95">
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <h1 className="text-center pb-[28px] text-[36px] text-[#191919] dark:text-[#fff] font-[500]">{'视频生成'}</h1>
          <div className="flex flex-col transition-opacity duration-300 ease-in-out w-full max-w-[760px] mx-auto">
            <div className="input_imageInput w-full">
              <div className="flex items-start gap-2 px-2">
                {/* 左侧区域 */}
                <div className="flex-1 space-y-4 relative">
                  <div className="flex gap-1 md:pt-4">
                    <div className="flex-shrink-0 w-[56px] h-[64px] undefined">
                      <button className="rounded-[4px] border-[0.5px] border-[var(--color-editor-border)] bg-[var(--color-upload-button-bg)] w-full h-full flex items-center justify-center cursor-pointer transition-all duration-200">
                        <div className="flex items-center justify-center gap-0 flex-col">
                          <Plus size={18} color="rgb(102, 102, 102)" className="text-[#666] dark:!text-[#666]" />
                          <div className="text-[#999] dark:!text-[#666] text-[12px]">首帧</div>
                        </div>
                      </button>
                    </div>
                    <div className="flex"></div>
                    <div className="flex-shrink-0 w-[56px] h-[64px] undefined">
                      <button className="rounded-[4px] border-[0.5px] border-[var(--color-editor-border)] bg-[var(--color-upload-button-bg)] w-full h-full flex items-center justify-center cursor-pointer transition-all duration-200">
                        <div className="flex items-center justify-center gap-0 flex-col">
                          <Plus size={18} color="rgb(102, 102, 102)" className="text-[#666] dark:!text-[#666]" />
                          <div className="text-[#999] dark:!text-[#666] text-[12px]">尾帧</div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      placeholder="试试描述一段简短的故事情节，最关键的是主体、环境、时间、风格"
                      maxLength={2000}
                      className="min-h-[40px] md:max-h-[140px] max-h-[100px] overflow-auto overscroll-none flex-1 w-full text-[var(--color-text-ant-tag)] text-[14px] rounded-none resize-none leading-5 focus:outline-none focus:border-transparent bg-transparent input_inputStyle"
                    />
                  </div>
                </div>

                {/* 右侧视频预览区域 */}
                <div className="w-[content-fit] shrink-0 relative">
                  <div className="w-[108px] md:w-[156px] md:h-[92px] h-[64px] flex flex-shrink-0 items-center justify-center rounded-[8px] gap-2 mt-4">
                    <div className="w-full h-full md:rounded-[12px] rounded-[6px] flex items-center justify-center gap-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] cursor-pointer relative">
                      <div className="text-[#fff] text-[12px] w-full h-full bg-black/20 absolute top-0 left-0 flex justify-center items-center md:rounded-[12px] rounded-[6px] gap-1">
                        <CirclePlus />
                        添加特效
                      </div>
                      <video
                        preload="none"
                        src="https://liblibai-online.oss-accelerate.aliyuncs.com/img/2fbf2f241bb2491d8fc02691b06059ce/f320ba66bd7fd51a90d225a58b025fdd795d2ec21f07568655d67c2a4a496015.mp4"
                        className="w-full h-full object-cover md:rounded-[12px] rounded-[6px] object-position-top"
                        loop
                        playsInline
                        autoPlay
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* 底部工具栏 */}
              <div className="flex justify-between items-center gap-4 mt-2">
                {/* 左侧工具按钮 */}
                <div className="relative flex items-center gap-2 overflow-x-auto flex-1 min-w-0 hide-scrollbar">
                  <Button
                    // variant={selectedTab === 'image' ? 'default' : 'ghost'}
                    onClick={() => setSelectedTab('image')}
                    className="gap-2"
                  >
                    <ImageIcon size={16} />
                    图片生成
                  </Button>
                  <Button
                    // variant={selectedTab === 'video' ? 'default' : 'ghost'}
                    onClick={() => setSelectedTab('video')}
                    className="gap-2"
                  >
                    <Film size={16} />
                    视频生成
                  </Button>
                </div>

                <div className="relative flex items-center gap-2 text-[#666] shrink-0 ml-2">
                  {/* 右侧生成按钮 */}
                  <Button className="gap-2 black-gradient text-cyan-50 text-base">
                    <Sparkles size={16} />
                    生成视频
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*底部可折叠灵感库 */}
        <div className={`transition-all duration-300 ease-in-out`}>
          <div className="bg-background/80 backdrop-blur-sm pb-11 ">
            {/* 折叠控制按钮 */}
            <div
              className="w-full p-4 flex justify-end items-center cursor-pointer"
              onClick={() => setShowInspiration(!showInspiration)}
            >
              <span className="text-muted-foreground ">视频灵感库</span>
              {showInspiration ? <ChevronUp size={20} color="#9f9f9f" /> : <ChevronDown size={20} color="#9f9f9f" />}
            </div>

            {/* 灵感库内容 */}
            <div className={`transition-all duration-300 ease-in-out ${showInspiration ? '' : 'hidden'}`}>
              <div className="relative px-4">
                {/* 左右滚动按钮 - 只在有可滚动内容时显示 */}
                {canScrollLeft && (
                  <div
                    className="cursor-pointer flex items-center justify-center absolute poiter left-24 top-1/2 -translate-y-1/2 z-10 h-16 w-16 rounded-full bg-background/80 backdrop-blur-sm shadow-lg"
                    onClick={() => scrollInspirations('left')}
                  >
                    <ChevronLeft size={32} className="opacity-60" />
                  </div>
                )}

                {canScrollRight && (
                  <div
                    className="cursor-pointer flex items-center justify-center absolute right-24 top-1/2 -translate-y-1/2 z-10 h-16 w-16 rounded-full bg-background/80 backdrop-blur-sm shadow-lg"
                    onClick={() => scrollInspirations('right')}
                  >
                    <ChevronRight size={32} className="opacity-60" />
                  </div>
                )}

                {/* 灵感库滚动区域 */}
                <div
                  ref={scrollAreaRef}
                  className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {videoInspirations.map((inspiration) => (
                    <div
                      key={inspiration.id}
                      className="flex-shrink-0 w-[142px] h-[184px] cursor-pointer group flex flex-col"
                      onClick={() => setPrompt(inspiration.title)}
                    >
                      <div className="flex-grow bg-muted rounded-lg overflow-hidden relative">
                        <Image
                          src={inspiration.thumbnail}
                          alt={inspiration.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                          <PlayCircle className="text-white/90 h-8 w-8" />
                        </div>
                      </div>
                      {/* <p className="text-sm mt-2 text-center line-clamp-1">{inspiration.title}</p> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VideoGeneratorPage;
