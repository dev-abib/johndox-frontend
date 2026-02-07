import React from "react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import Container from "@/Components/Common/Container";
import { Document, Notification } from "@/Components/Svg/SvgContainer";

const Setting = () => {
  return (
    <Container>
      <div className="bg-[#F9FAFB] p-4 lg:p-10 rounded-[24px]">
        <h2 className="text-[#404040] text-[24px] lg:text-[28px] font-medium">
          Account Settings
        </h2>
        <h5 className="text-base lg:text-[18px] text-[#5F5F5F] font-normal mt-3">
          Manage your personal information and preferences.
        </h5>

        <div className="mt-7 flex flex-col gap-6">
          <Link href={"/seller/profile-info"}>
            <div className="rounded-[18px] border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] lg:p-5 p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex gap-x-4 sm:gap-x-5 items-start sm:items-center w-full">
                <CiUser className="size-10 sm:size-13 flex-shrink-0 fill-[#0085FF]" />

                <div className="flex-1">
                  <h2 className="text-[#404040] text-[20px] sm:text-[24px] font-medium">
                    Profile
                  </h2>
                  <h5 className="text-[16px] sm:text-[18px] text-[#5F5F5F] font-normal mt-1">
                    Update your personal info and security preferences.
                  </h5>
                </div>
              </div>

              <div className="self-end sm:self-center">
                <MdArrowForwardIos className="size-8 sm:size-10 fill-[#0085FF]" />
              </div>
            </div>
          </Link>
          <Link href={"/seller/notifications"}>
            <div className="rounded-[18px] border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] lg:p-5 p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex gap-x-4 sm:gap-x-5 items-start sm:items-center w-full">
                <Notification className="size-10 sm:size-13 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-[#404040] text-[20px] lg:text-[24px] font-medium">
                    Notifications
                  </h2>
                  <h5 className="text-[16px] lg:text-[18px] text-[#5F5F5F] font-normal mt-1">
                    Update your personal info and security preferences.
                  </h5>
                </div>
              </div>

              <div className="self-end sm:self-center">
                <MdArrowForwardIos className="size-8 sm:size-10 fill-[#0085FF]" />
              </div>
            </div>
          </Link>
          <Link href={"/seller/upload-documents"}>
            <div className="rounded-[18px] border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] lg:p-5 p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex gap-x-4 sm:gap-x-5 items-start sm:items-center w-full">
                <Document className="size-10 sm:size-13 flex-shrink-0 " />
                <div className="flex-1">
                  <h2 className="text-[#404040] text-[20px] sm:text-[24px] font-medium">
                    Document Preferences
                  </h2>
                  <h5 className="text-[16px] sm:text-[18px] text-[#5F5F5F] font-normal mt-1">
                    Update your personal info and security preferences.
                  </h5>
                </div>
              </div>

              <div className="self-end sm:self-center">
                <MdArrowForwardIos className="size-8 sm:size-10 fill-[#0085FF]" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Setting;
