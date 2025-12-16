'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

export default function AiToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-blue-100 to-white dark:from-blue-800 dark:to-gray-900 relative">
      {/* 全局背景动效 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        {/* <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div> */}
      </div>
      <div className="fixed top-0 left-0 py-4 px-8 z-10">
        <Button
          as={Link}
          href="/"
          variant="light"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 transition-all duration-300"
          startContent={<ArrowLeft className="h-4 w-4" />}
          radius="sm"
          size="md"
        >
          返回
        </Button>
      </div>
      <main className="h-full flex-1 focus:outline-none min-w-[800px]" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
