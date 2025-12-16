'use client';
import { useState, useRef } from 'react';
import { Input, Card, CardBody, Textarea, Image, Divider, Chip, Tabs, Tab, Tooltip, Button } from '@nextui-org/react';
import {
  Upload,
  Copy,
  RefreshCw,
  Download,
  Check,
  ChevronRight,
  ExternalLink,
  ImagePlus,
  ShoppingCart,
  Store,
  Smartphone,
  Monitor,
  LayoutDashboard,
  Palette,
  Zap,
  Shield,
  Clock,
} from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/features/ThemedButton';
import PageTitle from '@/app/[locale]/ai-tools/features/PageTitle';
import PageBody from '@/app/[locale]/ai-tools/features/PageBody';
import Feature from '../features/Feature';

export default function EcommerceImagePage() {
  const [step, setStep] = useState(1); // 1: 输入信息, 2: 生成中, 3: 完成
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState('1:1');
  const [imageStyle, setImageStyle] = useState('product');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const copyRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('请输入图片描述');
      return;
    }

    setLoading(true);
    setStep(2);

    try {
      // 模拟API请求延迟
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 模拟生成的图片URL
      const mockImages = [
        'https://picsum.photos/800/800?random=1',
        'https://picsum.photos/800/800?random=2',
        'https://picsum.photos/800/800?random=3',
        'https://picsum.photos/800/800?random=4',
      ];

      setGeneratedImages(mockImages);
      setSelectedImage(mockImages[0]);
      setStep(3);
    } catch (error) {
      console.error('生成图片失败:', error);
      alert('生成图片失败，请重试');
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `ecommerce-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请重试');
    }
  };

  const presetPrompts = [
    '高端护肤品广告图，白色背景，产品特写，光线柔和',
    '时尚服装展示图，模特穿着，自然场景，清新风格',
    '电子产品促销图，黑色背景，科技感，产品多角度展示',
    '美食商品图，餐厅环境，食物特写，诱人色彩',
  ];

  const imageStyles = [
    { value: 'product', label: '产品展示', icon: <ImagePlus size={16} /> },
    { value: 'lifestyle', label: '生活场景', icon: <LayoutDashboard size={16} /> },
    { value: 'minimalist', label: '简约风格', icon: <Palette size={16} /> },
    { value: 'luxury', label: '奢华质感', icon: <Shield size={16} /> },
  ];

  const imageSizes = [
    { value: '1:1', label: '正方形 (1:1)' },
    { value: '4:5', label: '竖版 (4:5)' },
    { value: '16:9', label: '横版 (16:9)' },
    { value: '3:4', label: '小红书 (3:4)' },
  ];

  const supportedPlatforms = [
    { name: '淘宝', icon: <ShoppingCart size={16} /> },
    { name: '京东', icon: <Store size={16} /> },
    { name: '拼多多', icon: <Smartphone size={16} /> },
    { name: '抖音', icon: <Monitor size={16} /> },
    { name: '快手', icon: <Monitor size={16} /> },
    { name: '小红书', icon: <Smartphone size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageTitle title="AI电商图片制作" description="一键生成高品质电商商品图片，支持多种平台尺寸和风格" />
        <PageBody>
          {/* 主要功能区 */}
          {step === 1 && (
            <div className="space-y-6">
              {/* 输入方式切换 */}
              <Tabs fullWidth defaultSelectedKey="text" className="w-full">
                <Tab key="text" title="文字描述生成">
                  <div className="space-y-4 pt-4">
                    <div>
                      <Textarea
                        label="图片描述"
                        placeholder="请详细描述您想要的电商图片，例如：'高端运动鞋，白色背景，产品特写，光线充足，细节清晰'"
                        minRows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="mb-4"
                      />

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-sm text-slate-500 dark:text-slate-400">预设描述：</span>
                        {presetPrompts.map((pre, index) => (
                          <Chip
                            key={index}
                            size="sm"
                            variant="flat"
                            onClick={() => setPrompt(pre)}
                            className="cursor-pointer"
                          >
                            {pre}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab key="upload" title="上传图片生成">
                  <div className="space-y-4 pt-4">
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">点击或拖拽上传参考图片</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">支持 JPG、PNG 格式，最大 10MB</p>
                      <Button variant="ghost" className="mt-4" startContent={<Upload size={16} />}>
                        选择图片
                      </Button>
                    </div>
                  </div>
                </Tab>
              </Tabs>

              {/* 图片设置 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">图片风格</p>
                  <div className="flex flex-wrap gap-2">
                    {imageStyles.map((style) => (
                      <Chip
                        key={style.value}
                        size="sm"
                        variant={imageStyle === style.value ? 'solid' : 'flat'}
                        onClick={() => setImageStyle(style.value)}
                        startContent={style.icon}
                        className="cursor-pointer"
                      >
                        {style.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">图片尺寸</p>
                  <div className="flex flex-wrap gap-2">
                    {imageSizes.map((size) => (
                      <Chip
                        key={size.value}
                        size="sm"
                        variant={imageSize === size.value ? 'solid' : 'flat'}
                        onClick={() => setImageSize(size.value)}
                        className="cursor-pointer"
                      >
                        {size.label}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>

              <PrimaryButton
                size="lg"
                className="w-full"
                onPress={handleGenerate}
                isLoading={loading}
                startContent={<ImagePlus size={20} />}
              >
                生成电商图片
              </PrimaryButton>
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mb-4"></div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">正在生成图片...</h3>
              <p className="text-slate-500 dark:text-slate-400">AI 正在根据您的描述创建精美的电商图片，请稍候</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">生成结果</h3>

                {/* 图片网格 */}
                <div className="w-full overflow-x-auto pb-4">
                  <div className="flex gap-4">
                    {generatedImages.map((img, index) => (
                      <Card
                        key={index}
                        isPressable
                        onPress={() => setSelectedImage(img)}
                        className={`max-w-xs cursor-pointer transition-all duration-300 ${selectedImage === img ? 'ring-2 ring-primary' : ''}`}
                      >
                        <CardBody className="p-0">
                          <Image
                            src={img}
                            alt={`Generated ecommerce image ${index + 1}`}
                            className="object-cover h-64 w-full"
                          />
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* 大图预览 */}
                <div className="mt-6">
                  <Card>
                    <CardBody className="p-4">
                      <Image
                        src={selectedImage}
                        alt="Selected ecommerce image"
                        className="object-contain max-h-[500px] mx-auto"
                      />
                    </CardBody>
                  </Card>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-4 mt-4">
                  <SecondaryButton
                    onPress={() => {
                      setStep(1);
                      setGeneratedImages([]);
                    }}
                    startContent={<RefreshCw size={18} />}
                  >
                    重新生成
                  </SecondaryButton>
                  <PrimaryButton onPress={() => handleDownload(selectedImage)} startContent={<Download size={18} />}>
                    下载图片
                  </PrimaryButton>
                </div>
              </div>
            </div>
          )}
        </PageBody>

        <Feature
          items={[
            {
              title: '多种风格',
              desc: '支持产品展示、生活场景、简约风格等多种图片风格',
              icon: <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
            },
            {
              title: '快速生成',
              desc: 'AI 智能生成，只需几秒即可获得高质量商品图片',
              icon: <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
            },
            {
              title: '版权安全',
              desc: '生成图片可安全用于商业用途，无版权纠纷',
              icon: <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
            },
          ]}
        />
      </div>
    </div>
  );
}
