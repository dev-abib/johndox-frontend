import React from "react";
import { CiUser } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";

const Setting = () => {
  return (
    <>
      <div className="bg-[#F9FAFB] py-15 px-10 rounded-[24px]">
        <h2 className="text-[#404040] text-[28px] font-medium">
          Account Settings
        </h2>
        <h5 className="text-[18px] text-[#5F5F5F] font-normal mt-3">
          Manage your personal information and preferences.
        </h5>
        <div className="px-10 py-7 flex flex-col gap-6">
          <div className="rounded-[18px] border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] p-5 flex justify-between items-center cursor-pointer">
            <div className="flex gap-x-5 items-center">
              <CiUser className="size-13 fill-[#0085FF]" />
              <div className="">
                <h2 className="text-[#404040] text-[24px] font-medium">
                  Profile
                </h2>
                <h5 className="text-[18px] text-[#5F5F5F] font-normal mt-1">
                  Update your personal info and security preferences.
                </h5>
              </div>
            </div>
            <div className="flex justify-end">
              <MdArrowForwardIos className="size-10 fill-[#0085FF]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
