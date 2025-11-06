import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-yellow-200 dark:border-yellow-800 bg-gradient-to-b from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-950/20">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2"></div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start">
            <Image
              alt="AI Editor"
              width={32}
              height={32}
              src="/logo.png"
            />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              @2025 简创AIGC 版权所有.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
