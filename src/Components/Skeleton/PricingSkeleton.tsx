const PricingSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-16 animate-pulse">
      <div className="text-center mb-10">
        <div className="h-6 w-64 bg-gray-200 rounded mx-auto mb-3" />
        <div className="h-4 w-96 bg-gray-200 rounded mx-auto" />
      </div>

      <div className="flex justify-center mb-12">
        <div className="h-10 w-48 bg-gray-200 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="border rounded-xl p-6 shadow-sm bg-white">
            <div className="h-5 w-24 bg-gray-200 rounded mb-4" />
            <div className="h-8 w-20 bg-gray-200 rounded mb-6" />

            <div className="h-10 w-full bg-gray-200 rounded mb-6" />

            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-200 rounded-full" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="h-6 w-72 bg-gray-200 rounded mx-auto mb-8" />

        <div className="space-y-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white">
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSkeleton;
