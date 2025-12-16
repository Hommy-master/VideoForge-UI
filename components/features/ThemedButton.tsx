import { Button as NextButton, ButtonProps } from '@nextui-org/button';
import React from 'react';

// 主按钮变体 - 蓝色渐变
const primaryButtonClasses = "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 dark:from-blue-400 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-600 px-6 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0";

// 次要按钮变体 - 灰色背景
const secondaryButtonClasses = "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 border border-gray-200 dark:border-gray-700";

// 主要操作按钮组件
export const PrimaryButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <NextButton 
      className={`${primaryButtonClasses} ${className || ''}`} 
      {...props} 
    />
  );
};

// 次要操作按钮组件
export const SecondaryButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <NextButton 
      variant="ghost" 
      className={`${secondaryButtonClasses} ${className || ''}`} 
      {...props} 
    />
  );
};

// 导出默认组件
const ThemedButton = { Primary: PrimaryButton, Secondary: SecondaryButton };
export default ThemedButton;