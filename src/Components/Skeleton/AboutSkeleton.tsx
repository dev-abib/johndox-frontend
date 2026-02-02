export const AboutSkeleton = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-10 py-10 animate-pulse">
      {/* Visual Side Skeleton */}
      <div className="hidden lg:flex xl:w-[65%] lg:w-[50%] h-full">
        <div className="w-full h-full bg-gray-200 rounded-2xl"></div>
      </div>

      {/* Form Side Skeleton */}
      <div className="w-full xl:w-[35%] lg:w-[50%] px-6">
        <div className="space-y-6">
          {/* Title & Subtitle */}
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded-md w-3/4 mx-auto lg:mx-0"></div>
            <div className="h-5 bg-gray-200 rounded-md w-1/2 mx-auto lg:mx-0"></div>
          </div>

          {/* Input Fields */}
          {[1, 2].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
            </div>
          ))}

          {/* Remember Me / Forgot Pass Row */}
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Buttons */}
          <div className="h-12 bg-blue-100 rounded-lg w-full"></div>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="h-12 bg-gray-100 rounded-lg w-full"></div>

          {/* Footer Text */}
          <div className="h-5 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};
