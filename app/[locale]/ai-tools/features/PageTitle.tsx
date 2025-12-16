const PageTitle = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="text-center mb-16 animate-fadeInUp duration-700 ease-out">
      {/* <div className="inline-block bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-6 shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-800/50 transition-shadow duration-300">
            <Video className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div> */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#191919] dark:text-white mb-6 tracking-tight drop-shadow-lg relative inline-block">
        {title}
        <svg
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4 h-6"
          viewBox="0 0 300 30"
          preserveAspectRatio="none"
        >
          <path
            d="M0,15 C40,2 80,28 120,15 C160,2 200,28 240,15 C280,2 300,28 300,15"
            fill="none"
            stroke="url(#handwritingGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          ></path>
          <defs>
            <linearGradient id="handwritingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-lg">{description}</p>
    </div>
  );
};

export default PageTitle;
