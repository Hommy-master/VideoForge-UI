'use client';

import React, { useState } from 'react';
import { PrimaryButton, SecondaryButton } from '@/components/features/ThemedButton';
import { FileText, Copy, CheckCircle, Trash2, Play } from 'lucide-react';
import PageTitle from '@/app/[locale]/ai-tools/features/PageTitle';
import PageBody from '@/app/[locale]/ai-tools/features/PageBody';
import Feature from '../features/Feature';
import Platform from '../features/Platform';

const EXAMPLE_URL = 'https://v.douyin.com/gVa7VmLFJ-8/';

// 主组件
const VideoCopyExtractionPage: React.FC<{ params: { locale: string } }> = ({ params }) => {
  // 状态管理
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedCopy, setExtractedCopy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // 处理视频URL输入变化
  const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideoUrl(e.target.value);
    setError('');
  };

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
      setExtractedCopy(null);

      // 这里模拟API调用，实际项目中应该替换为真实API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 模拟提取的文案
      const mockCopy =
        '笑有新生 余钦南保安的暗示都快溢出屏幕了，外卖小哥的反应也太可爱了吧！#搞笑 #生活趣事 #日常 v.douyin.com/gVa7VmLFJ-8/';
      setExtractedCopy(mockCopy);
    } catch (err: any) {
      setError(err.message || '提取文案时出错');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // 处理重置按钮点击
  const handleReset = () => {
    setVideoUrl('');
    setExtractedCopy(null);
    setError('');
  };

  // 处理示例链接填充
  const handleUseExample = () => {
    setVideoUrl(EXAMPLE_URL);
    setError('');
  };

  // 处理复制功能
  const handleCopy = async () => {
    if (!extractedCopy) return;

    try {
      await navigator.clipboard.writeText(extractedCopy);
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
        <PageTitle title="视频智能文案提取" description="从视频中智能提取标题、描述和关键词，支持多平台视频分析" />

        {/* 主要功能区 */}
        <PageBody>
          {/* URL输入区域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">视频链接</label>
            <div className="space-y-3">
              <div className="relative">
                <Play className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
                <textarea
                  value={videoUrl}
                  onChange={handleUrlChange}
                  placeholder={'请输入视频链接'}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[80px] max-h-[200px] resize-vertical transition-all duration-300 ease-in-out"
                  rows={3}
                />
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
                <PrimaryButton
                  onPress={handleSubmit}
                  disabled={isProcessing || !videoUrl.trim()}
                  className="w-full sm:w-auto"
                >
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
                      提取中...
                    </span>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      提取文案
                    </>
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
                <p className="text-gray-600 dark:text-gray-300">正在分析视频，请稍候...</p>
              </div>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}

          {/* 处理结果区域 */}
          {extractedCopy && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 animate-fadeInUp duration-500 ease-out">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">提取结果</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 relative">
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  title="复制文案"
                >
                  {copySuccess ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </button>
                <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{extractedCopy}</div>
              </div>
              <SecondaryButton onClick={handleReset} startContent={<Trash2 className="h-4 w-4" />}>
                重新提取
              </SecondaryButton>
            </div>
          )}

          {/* 支持的平台 */}
          <Platform />
        </PageBody>

        {/* 功能特点 */}
        <Feature
          items={[
            { title: '智能提取', desc: 'AI驱动的文案提取技术，准确率高', icon: '🧠' },
            { title: '多平台支持', desc: '覆盖主流视频平台，适应性强', icon: '🌐' },
            { title: '快速分析', desc: '高效处理，秒级提取文案内容', icon: '⚡' },
          ]}
        />
      </div>
    </div>
  );
};

export default VideoCopyExtractionPage;
