import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* 左侧导航栏 */}
      <aside className="shrink-0">
        <Sidebar />
      </aside>

      {/* 右侧内容区 */}
      <div className="h-screen flex-1 flex flex-col overflow-y-auto">
        <Header />

        <main className="h-[calc(100vh-64px)] flex-1 focus:outline-none min-w-[800px]" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}