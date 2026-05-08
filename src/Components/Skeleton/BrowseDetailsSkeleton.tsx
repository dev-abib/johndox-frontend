"use client";
import React from "react";
import Container from "@/Components/Common/Container";

export const BrowseDetailsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <section className="pt-10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-y-4.5 lg:gap-x-4.5 2xl:gap-x-8.5">
            <div className="w-full flex-1 rounded-lg bg-gray-200 h-[440px]" />

            <div className="flex-1 p-3 space-y-6">
              <div className="flex justify-between items-start">
                <div className="h-10 bg-gray-200 rounded w-3/4" />
                <div className="h-10 bg-gray-200 rounded w-16" />
              </div>

              <div className="h-8 bg-gray-200 rounded w-1/3" />

              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <div className="h-14 bg-gray-200 rounded-2xl flex-1" />
                <div className="h-14 bg-gray-200 rounded-2xl flex-1" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="lg:pt-10 pt-5 pb-20">
        <Container>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg"
                  />
                ))}
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="h-64 bg-gray-200 rounded-lg w-full" />{" "}
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/4" />
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
