'use client';

import React, { useState } from 'react';
import { Video, Download, Link, Trash2, CheckCircle } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/features/ThemedButton';
import PageTitle from '@/app/[locale]/ai-tools/features/PageTitle';
import PageBody from '@/app/[locale]/ai-tools/features/PageBody';
import Feature from '../features/Feature';
import Platform from '../features/Platform';

const EXAMPLE_URL =
  '1.25 复制打开抖音，看看【央视文艺的作品】# 笑有新生 余钦南保安的暗示都快溢出屏幕了，外卖... https://v.douyin.com/gVa7VmLFJ-8/ u@F.hb LWM:/ 07/30 ';

// 主组件
const RemoveWatermarkPage: React.FC<{ params: { locale: string } }> = ({ params }) => {
  // 状态管理
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedVideo, setProcessedVideo] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Ref for textarea auto-resize
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // 处理视频URL输入变化
  const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideoUrl(e.target.value);
    setError('');

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // 处理示例链接填充时也自动调整高度
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [videoUrl]);

  // 处理提交按钮点击
  const handleSubmit = async () => {
    // 简单的URL验证
    if (!videoUrl.trim()) {
      setError('请输入视频URL');
      return;
    }

    try {
      setIsProcessing(true);
      setError('');
      setProcessedVideo(null);

      // 调用视频下载API
      const response = await fetch(`/api/video-download?url=${encodeURIComponent(videoUrl)}`);
      if (!response.ok) throw new Error('请求失败');
      const data = await response.json();
      setProcessedVideo(data);
    } catch (err: any) {
      setError(err.message || '处理视频时出错');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // 处理重置按钮点击
  const handleReset = () => {
    setVideoUrl('');
    setProcessedVideo(null);
    setError('');
  };

  // 处理示例链接填充
  const handleUseExample = () => {
    setVideoUrl(EXAMPLE_URL);
    setError('');
  };

  // 处理复制功能
  const handleCopy = async () => {
    if (!videoUrl.trim()) return;

    try {
      await navigator.clipboard.writeText(videoUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* 页面内容 */}
      <div className="container mx-auto px-4 py-24">
        {/* 标题部分 */}
        <PageTitle title="视频无水印下载" description="支持抖音、快手、B站等主流平台，一键下载无水印视频" />

        {/* 主要功能区 */}
        <PageBody>
          {/* URL输入区域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">视频链接</label>
            <div className="space-y-3">
              <div className="relative">
                <Link className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
                <textarea
                  ref={textareaRef}
                  value={videoUrl}
                  onChange={handleUrlChange}
                  placeholder={'请输入视频链接'}
                  className="w-full pl-10 pr-14 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[100px] max-h-[300px] resize-vertical transition-all duration-300 ease-in-out"
                  rows={4}
                />
                <button
                  onClick={handleCopy}
                  disabled={!videoUrl.trim()}
                  className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="复制链接"
                >
                  {copySuccess ? (
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <SecondaryButton onPress={handleUseExample}>
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  使用示例
                </SecondaryButton>
                <PrimaryButton onPress={handleSubmit} disabled={isProcessing || !videoUrl.trim()}>
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      处理中...
                    </span>
                  ) : (
                    '开始下载'
                  )}
                </PrimaryButton>
              </div>
            </div>
            {error && (
              <div className="mt-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg animate-fadeInUp duration-500 ease-out">
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* 加载状态 */}
          {isProcessing && (
            <div className="mt-6 animate-fadeInUp duration-500 ease-out">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-300">正在解析视频链接，请稍候...</p>
              </div>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}

          {/* 处理结果区域 */}
          {processedVideo && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 animate-fadeInUp duration-500 ease-out">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">下载成功</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-200">视频已准备好下载</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{processedVideo}</div>
              </div>
              <div className="flex gap-3">
                <PrimaryButton startContent={<Download className="h-4 w-4" />}>下载视频</PrimaryButton>
                <SecondaryButton onPress={handleReset} startContent={<Trash2 className="h-4 w-4" />}>
                  重新处理
                </SecondaryButton>
              </div>
            </div>
          )}

          {/* 支持的平台 */}
          <Platform />
        </PageBody>

        {/* 功能特点 */}
        <Feature
          items={[
            { title: '多平台支持', desc: '覆盖主流短视频和长视频平台', icon: '🌐' },
            { title: '高清无水印', desc: '下载原始画质，去除所有水印', icon: '🎬' },
            { title: '快速稳定', desc: '高效处理，下载速度快', icon: '⚡' },
          ]}
        />
      </div>
    </div>
  );
};

export default RemoveWatermarkPage;
