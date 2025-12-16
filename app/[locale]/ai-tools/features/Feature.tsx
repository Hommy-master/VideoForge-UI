const Feature = ({ title = '功能特点', items = [] }: { title?: string; items: any[] }) => {
  return (
    <div className="max-w-4xl mx-auto mt-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2 animate-fadeInUp duration-700 ease-out delay-300"
            style={{ animationDelay: `${300 + index * 100}ms` }}
          >
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Feature;
