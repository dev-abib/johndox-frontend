import React from "react";
import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import Container from "../Common/Container";

export const MyListingSkeleton = () => {
  return (
    <>
      {/* Header Section */}
      <Container>
        <div className="md:flex justify-between items-end">
          <div>
            <div className="h-8 lg:h-10 w-48 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-6 w-64 mt-3 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <Link href={"/seller/new-listing"}>
            <button className="flex md:mt-0 mt-3 gap-x-1 items-center bg-[#0085FF] px-5 py-3 rounded-[12px] cursor-pointer text-white">
              <BsPlusLg />
              Add New Listing
            </button>
          </Link>
        </div>

        {/* Listings Container */}
        <div className="mt-7.5">
          <div className="bg-[#F5F5F5] p-2 lg:p-10 rounded-[28px] flex flex-col gap-5">
            {/* Repeat 5–7 skeleton items for realistic loading */}
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white border border-[#E7E7E7] px-5 py-7 rounded-[28px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-5 flex-1">
                  {/* Image Placeholder */}
                  <div className="shrink-0 w-full lg:w-[180px] lg:h-[150px] h-[300px] bg-gray-200 rounded-[16px] animate-pulse" />

                  <div className="flex-1 w-full mt-4 lg:mt-0">
                    {/* Title */}
                    <div className="h-7 lg:h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
                    {/* Address */}
                    <div className="h-6 w-2/3 mt-2 bg-gray-200 rounded-lg animate-pulse" />

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-6 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      <div className="h-9 w-28 bg-gray-200 rounded-[12px] animate-pulse" />
                      <div className="h-9 w-20 bg-gray-200 rounded-[12px] animate-pulse" />
                      <div className="h-9 w-24 bg-red-100 rounded-[12px] animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Price & Listing Type */}
                <div className="text-center lg:text-right shrink-0 mt-6 lg:mt-0">
                  <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse mx-auto lg:mx-0" />
                  <div className="h-10 w-32 mt-4 bg-gray-200 rounded-[12px] animate-pulse mx-auto lg:mx-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};
