import { ReactNode } from 'react';

const PageBody = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 transition-shadow duration-300 animate-fadeInUp duration-700 ease-out delay-100">
      {children}
    </div>
  );
};
export default PageBody;
