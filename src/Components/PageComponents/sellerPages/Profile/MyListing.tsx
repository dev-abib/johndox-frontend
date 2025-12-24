import React from "react";
import { BsPlusLg } from "react-icons/bs";

const MyListing = () => {
  return (
    <>
      <div className="flex justify-between items-end">
        <div className="">
          <h2 className="text-[#404040] text-[28px] font-medium">
            My Listings
          </h2>
          <h5 className="text-[18px] text-[#5F5F5F] font-normal mt-3">
            Manage your property listings
          </h5>
        </div>
        <button className="flex gap-x-1 items-center bg-[#0085FF] px-5 py-3 rounded-[12px] cursor-pointer text-white group hover:text-black hover:bg-transparent duration-300 ease-in-out border border-[#0085FF]">
          <BsPlusLg className="text-white group-hover:text-black" />
          Add New Listing
        </button>
      </div>
    </>
  );
};

export default MyListing;
