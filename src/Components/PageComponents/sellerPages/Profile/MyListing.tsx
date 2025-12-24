import React from "react";
import Image from "next/image";
import { BsPlusLg } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import { listingsData } from "@/Components/Data/data";
import { BsEye, BsFillChatDotsFill, BsCalendar3 } from "react-icons/bs";

const MyListing = () => {
  return (
    <>
      <div className="flex justify-between items-end">
        <div>
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

      <div className="mt-7.5">
        <div className="bg-[#F5F5F5] p-10 rounded-[28px] flex flex-col gap-5">
          {listingsData?.map(item => (
            <div
              key={item.id}
              className="bg-white border border-[#E7E7E7] px-5 py-7 rounded-[28px] flex items-center justify-between gap-8"
            >
              <div className="flex items-center gap-x-5 flex-1">
                <figure className="shrink-0">
                  <Image
                    src={item?.imageUrl || "/images/placeholder.png"}
                    alt={item?.title || "image"}
                    width={150}
                    height={150}
                    className="rounded-[16px] object-cover"
                  />
                </figure>

                <div className="flex-1">
                  <h3 className="text-[24px] font-medium text-[#404040]">
                    {item.title}
                  </h3>
                  <p className="text-[20px] font-medium  text-[#919191] mt-1">
                    {item.location}
                  </p>

                  <div className="flex items-center gap-6 mt-4 text-[18px] text-[#5F5F5F]">
                    <span className="flex items-center gap-2 ">
                      <BsEye /> {item.views} views
                    </span>
                    <span className="flex items-center gap-2">
                      <BsFillChatDotsFill /> {item.leads} leads
                    </span>
                    <span className="flex items-center gap-2">
                      <BsCalendar3 /> Posted: {item.postedDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-5">
                    <button className="text-[#5F5F5F] cursor-pointer flex items-center gap-1 border border-[#E7E7E7] px-2.5 py-1 rounded-[12px]">
                      <BsEye className="text-lg" /> View Post
                    </button>
                    <button className="text-[#5F5F5F] cursor-pointer flex items-center gap-1 border border-[#E7E7E7] px-2.5 py-1 rounded-[12px]">
                      <MdEdit className="text-lg" /> Edit
                    </button>
                    <button className="cursor-pointer flex items-center gap-1 border border-[#FCC9CB] text-[#E7000B] px-2.5 py-1 rounded-[12px] bg-[#FFE9EA]">
                      <MdDelete className="text-lg" /> Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[28px] font-bold text-[#0085FF]">
                  ${item.price}
                  <span className="text-[#919191] text-[18px] font-normal">
                    {item.currency}
                  </span>
                </p>
                <div className="text-[#5F5F5F] cursor-pointer flex items-center gap-1 border border-[#E7E7E7] px-2.5 py-1 rounded-[12px] w-fit mt-4 text-[16px] font-medium mx-auto">
                  {item?.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyListing;
