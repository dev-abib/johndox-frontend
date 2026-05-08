import React from "react";

const Forsellerskeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-300 rounded-b-lg flex flex-col justify-center items-center">
        <div className="h-6 w-1/3 bg-gray-400 mb-2 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-400 mb-4 rounded"></div>
        <div className="h-10 w-32 bg-gray-500 rounded"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="h-6 w-1/4 bg-gray-400 mb-6 rounded mx-auto"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-200 rounded shadow">
            <div className="h-24 w-full bg-gray-400 mb-4 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
          </div>
          <div className="p-4 bg-gray-200 rounded shadow">
            <div className="h-24 w-full bg-gray-400 mb-4 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="h-6 w-1/4 bg-gray-400 mb-6 rounded mx-auto"></div>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 justify-center">
          <div className="p-4 bg-gray-200 rounded shadow w-1/2 mx-auto">
            <div className="h-24 w-full bg-gray-400 mb-4 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div className="h-40 bg-blue-200 flex flex-col justify-center items-center">
        <div className="h-6 w-1/3 bg-blue-400 mb-4 rounded"></div>
        <div className="h-10 w-40 bg-blue-500 rounded"></div>
      </div>
    </div>
  );
};

export default Forsellerskeleton;
