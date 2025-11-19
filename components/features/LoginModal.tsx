'use client';
import { useState, useEffect } from 'react';
import { Modal, ModalContent, Card, CardBody, ModalHeader, Image } from '@nextui-org/react';
import { X, RefreshCw, Sparkles, Gift, Clock, Star, CheckCircle2, Zap, BarChart3 } from 'lucide-react';
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
      <ModalContent className="w-full max-w-[932px] p-0 overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-2xl border-0">
        <div className="flex flex-col md:flex-row w-full">
          {/* 左侧宣传广告区域 - 占2/5宽度 */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-gray-700 via-blue-600 to-blue-500 p-8 relative overflow-hidden">
            {/* 背景装饰元素 */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-blue-300/20 rounded-full blur-2xl"></div>

            {/* 宣传内容 */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* 顶部Logo和品牌名称 */}
              <div className="flex items-center mb-8">
                <Image src="/logo.png" alt="简创AI" className="w-8 h-8 mr-2" />
                <span className="font-bold text-xl text-white">简创AI</span>
              </div>

              <div>
                <div className="mb-6">
                  <p className="text-white text-lg">让视频创作变得简单、高效、专业</p>
                </div>

                {/* 功能特点列表 */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-white">
                    <Zap className="mr-3 text-yellow-300" size={20} />
                    <span>AI智能生成，快速创作</span>
                  </div>
                  <div className="flex items-center text-white">
                    <CheckCircle2 className="mr-3 text-green-300" size={20} />
                    <span>丰富模板，轻松上手</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Star className="mr-3 text-yellow-300" size={20} />
                    <span>专业级编辑功能</span>
                  </div>
                  <div className="flex items-center text-white">
                    <BarChart3 className="mr-3 text-blue-300" size={20} />
                    <span>数据分析，精准优化</span>
                  </div>
                </div>

                {/* 促销标签 */}
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs">限时优惠</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs">新用户专享</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs">会员特权</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧微信扫码登录区域 - 占3/5宽度 */}
          <div className="w-full md:w-3/5">
            <div className="p-[40px] flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-center mb-6">
                <h2 className="text-2xl mb-1 font-bold text-gray-800 dark:text-white">微信扫码登录</h2>
                <p className="text-center text-gray-400 dark:text-gray-300 text-sm">扫码关注公众号快捷登录</p>
              </div>

              {/* 二维码区域 */}
              <Card className="border w-[200px] h-[200px] border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden mb-6">
                <CardBody className="relative size-full p-2 flex flex-col items-center justify-center overflow-hidden">
                  {/* 模拟二维码图片 */}
                  <div className="size-full flex items-center justify-center">
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

            {/* 登录提示 */}
            <div className="flex gap-2 justify-center items-center text-sm bg-[#f5f6fa] dark:bg-gray-800 h-[60px] text-gray-500 dark:text-gray-300">
              <span>登录即表示您同意并遵守</span>
              <span className="text-blue-600 dark:text-blue-400 hover:underline">《用户协议》</span>
              <span className="text-blue-600 dark:text-blue-400 hover:underline">《隐私政策》</span>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
