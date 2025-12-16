const Platform = () => {
  return (
    <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 animate-fadeInUp duration-700 ease-out delay-200">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
          <svg
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </span>
        支持平台
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {['抖音', '快手', 'B站', '小红书', '西瓜视频', '腾讯视频', '优酷', '爱奇艺'].map((platform, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 text-center border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-md cursor-pointer"
          >
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{platform}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platform;
