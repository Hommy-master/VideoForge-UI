import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-white to-gray-300 dark:from-gray-900 dark:to-white">
      <div className="mx-auto max-w-7xl p-6 md:flex md:items-center md:justify-between lg:px-8">
        {/* <div className="flex justify-center space-x-6 md:order-2"></div> */}
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start">
            {/* <Image alt="AI Editor" width={16} height={16} src="/logo.png" /> */}
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">@2025简创AIGC版权所有.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
