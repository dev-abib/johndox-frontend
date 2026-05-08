import React from "react";
import Container from "@/Components/Common/Container";

export const FeaturedSkeleton = () => {
  return (
    <section className="py-16 md:py-24 xl:py-[150px]">
      <Container>
        <div className="text-center mb-12 lg:mb-16 flex flex-col items-center">
          <div className="h-10 w-64 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="h-5 w-full max-w-lg bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-11">
          {[1, 2, 3, 4, 5, 6].map(index => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-[28px] overflow-hidden px-4.5 pt-4.5 pb-7.5 border border-gray-100"
            >
              <div className="h-[260px] sm:h-[280px] lg:h-[300px] bg-gray-200 animate-pulse rounded-lg mb-5"></div>

              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md mb-3"></div>

              <div className="h-6 w-full bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded-md mb-4"></div>

              <div className="flex gap-2 mb-5">
                <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-5 w-40 bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              <div className="flex gap-5 mb-8">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="h-14 w-full bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
