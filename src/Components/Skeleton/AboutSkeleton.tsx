"use client";
import React from "react";

type SkeletonProps = {
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
};

const AboutSkeleton = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative h-[320px] md:h-[420px] w-full bg-gray-300 animate-pulse">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-[420px] max-w-full" />
          <Skeleton className="h-4 w-[360px] max-w-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <Skeleton className="h-6 w-44" />

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />

          <div className="space-y-4 pt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </div>

        <Skeleton className="h-72 w-full rounded-xl" />
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="border rounded-xl p-6 flex flex-col items-center gap-3"
          >
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 space-y-3">
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-4 w-72 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="border rounded-xl p-6 space-y-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-11/12" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-blue-200 py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <Skeleton className="h-6 w-64 mx-auto" />
          <Skeleton className="h-4 w-80 mx-auto" />

          <div className="flex justify-center gap-4 pt-4">
            <Skeleton className="h-10 w-40 rounded-md" />
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSkeleton;
