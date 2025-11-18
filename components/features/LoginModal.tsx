'use client';
import { useState, useEffect } from 'react';
import { Modal, ModalContent, Card, CardBody, ModalHeader, Image } from '@nextui-org/react';
import { X, RefreshCw, Sparkles, Gift, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TIMER = 60; // 60秒倒计时

export default function LoginModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations('common');
  const [countdown, setCountdown] = useState(TIMER);
  const [isExpired, setIsExpired] = useState(false); // 二维码是否过期
  const [showTags, setShowTags] = useState(false); // 控制标签显示状态

  // 倒计时逻辑
  useEffect(() => {
    if (!isOpen) {
      setCountdown(TIMER);
      setIsExpired(false);
      setShowTags(false);
      return;
    }

    // 延迟显示标签，创建渐隐效果
    const tagTimeout = setTimeout(() => {
      setShowTags(true);
    }, 100);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(tagTimeout);
    };
  }, [isOpen]);

  // 重置倒计时和刷新二维码
  const refreshQrCode = () => {
    setCountdown(TIMER);
    setIsExpired(false);
  };

  // 模拟扫码成功
  const simulateScanSuccess = () => {
    // 在实际项目中，这里应该通过Websocket或轮询检查登录状态
    alert('登录成功！');
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="backdrop-blur-sm">
      <ModalContent className="w-full sm:w-[400px] p-0 overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-2xl border-0">
        {/* 扎染风格头部背景 */}
        <ModalHeader className="relative overflow-hidden bg-gradient-to-br from-purple-300 via-blue-300 to-cyan-200 p-6">
          {/* 添加扎染效果的叠加层 */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/30 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-300/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent"></div>

          {/* 创意装饰元素 - 调整颜色以匹配扎染风格 */}
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

          {/* 中央装饰元素 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-2xl"></div>

          {/* 几何装饰 */}
          <div className="absolute top-2 left-1/4 w-4 h-4 bg-purple-300/30 rotate-45"></div>
          <div className="absolute bottom-2 right-1/4 w-6 h-6 bg-cyan-200/30 rounded-full"></div>

          {/* 标签区域 - 重新分布位置避免重叠，并添加渐隐效果 */}

          {/* FREE标签 - 右上角 */}
          <div
            className={`absolute top-2 right-14 transform rotate-[5deg] z-10 transition-opacity duration-700 ease-out ${showTags ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="bg-gradient-to-r from-red-500/90 to-orange-500/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
              <div className="flex items-center text-white text-xs font-bold">
                <span>FREE</span>
              </div>
            </div>
          </div>

          {/* 新用户限时免费标签 - 左上角 */}
          <div
            className={`absolute top-2 left-32 transform -rotate-[2deg] z-10 transition-opacity duration-700 ease-out ${showTags ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="border-2 border-dashed border-purple-500/50 bg-gradient-to-r from-purple-100/90 to-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
              <div className="flex items-center text-purple-800 text-xs">
                <Clock size={10} className="mr-1 animate-pulse" />
                <span>新用户限时免费</span>
              </div>
            </div>
          </div>

          {/* 会员专享优惠标签 - 右侧上部 */}
          <div
            className={`absolute bottom-1 right-12 transform -translate-y-1/2 rotate-[3deg] z-20 transition-opacity duration-700 ease-out ${showTags ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <div className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
              <div className="flex items-center text-white text-xs">
                <Sparkles size={10} className="mr-1" />
                <span>会员专享优惠</span>
              </div>
            </div>
          </div>

          {/* 登录礼包标签 - 左侧下部 */}
          <div
            className={`absolute bottom-6 left-4 transform -translate-y-1/2 -rotate-[4deg] z-10 transition-opacity duration-700 ease-out ${showTags ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="bg-gradient-to-r from-green-600/90 to-teal-600/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
              <div className="flex items-center text-white text-xs">
                <Gift size={10} className="mr-1" />
                <span>登录即送大礼包</span>
              </div>
            </div>
          </div>

          {/* 7天免费体验标签 - 右侧下部 */}
          <div
            className={`absolute bottom-2 right-48 transform rotate-[2deg] z-20 transition-opacity duration-700 ease-out ${showTags ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            <div className="bg-gradient-to-r from-cyan-600/90 to-blue-500/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
              <div className="flex items-center text-white text-xs">
                <Clock size={10} className="mr-1" />
                <span>7天免费体验</span>
              </div>
            </div>
          </div>

          {/* 确保关闭按钮在顶层且不被遮挡 */}
          <div className="relative z-30 flex justify-end w-full">
            <button
              className="rounded-full bg-black/30 hover:bg-black/40 p-2 transition-all duration-300"
              onClick={() => onOpenChange(false)}
              aria-label="关闭"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </ModalHeader>

        {/* 移除原来的外部标签区域 */}

        <div className="p-6 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl mb-1 font-bold text-gray-800 dark:text-white">微信扫码登录</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">扫码关注公众号快捷登录</p>
          </div>

          {/* 二维码区域 */}
          <Card className="border w-[160px] h-[160px] mx-auto border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden">
            <CardBody className="relative size-full p-2 flex flex-col items-center justify-center overflow-hidden">
              {/* 模拟二维码图片 */}
              <div className="size-full flex items-center justify-center">
                {/* <QrCode size={240} className="text-gray-800 dark:text-white" /> */}
                <Image src="/QUserQR.jpg" alt="二维码" className="size-full" />
                {/* 二维码过期遮罩层 */}
                {isExpired && (
                  <div className="absolute z-10 inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-base">
                    <RefreshCw size={48} className="mb-3 cursor-pointer" onClick={refreshQrCode} />
                    刷新二维码
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </ModalContent>
    </Modal>
  );
}
