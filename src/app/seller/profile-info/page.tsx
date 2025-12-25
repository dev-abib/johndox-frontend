import React from "react";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Container from "@/Components/Common/Container";
import Profilepic from "../../../Assets/profilepic.png";

const AccountSettingsPage = () => {
  return (
    <section className="mt-10">
      <Container>
        {/* Header */}
        <h3 className="flex items-center gap-x-2 cursor-pointer text-[24px] lg:text-[32px] font-medium text-[#0085FF] mb-12">
          <IoIosArrowBack className="size-8" />
          Account Settings
        </h3>

        {/* Main Card */}
        <div className="bg-[#F5F5F5] p-3 lg:p-10 rounded-[28px]">
          <h4 className="text-[24px] lg:text-[32px] font-medium text-[#101010] lg:mb-10 mb-5">
            My Profile
          </h4>

          {/* White Inner Card */}
          <div className="bg-white rounded-[28px] p-4 lg:p-12">
            {/* Personal Info Section */}
            <h4 className="text-[28px] font-medium text-[#101010] lg:mb-10 mb-5">
              Personal Info
            </h4>

            {/* Profile Photo */}
            <div className="border-b border-[#B5B5B5] pb-5 lg:mb-10 mb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h2 className="text-[#404040] lg:text-[24px] text-[20px] font-medium">
                    Profile Photo
                  </h2>
                  <p className="text-[#5F5F5F] lg:text-[18px] text-base mt-3">
                    Personalize your profile pic with a custom photo.
                  </p>
                </div>
                <div className="flex items-center gap-4 cursor-pointer">
                  <div className="relative">
                    <Image
                      src={Profilepic}
                      alt="Profile"
                      width={90}
                      height={90}
                      className="rounded-full object-cover border-4 border-white shadow-md"
                    />
                  </div>
                  <FaRegEdit className="text-[#0085FF] text-2xl" />
                  <span className="text-[#0085FF] text-xl lg:text-2xl font-medium">
                    Edit
                  </span>
                </div>
              </div>
            </div>

            {/* Name - Input Field */}
            <div className="border-b border-[#B5B5B5] pb-5 lg:mb-10 mb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-[#404040] lg:text-[24px] text-[20px] font-medium mb-2">
                    Name
                  </h2>
                  <input
                    type="text"
                    defaultValue="Full names"
                    className="w-full pt-3 text-[#5F5F5F] rounded-xl focus:outline-none  lg:text-[18px] text-base"
                    placeholder="Full name"
                  />
                </div>
                <button className="text-[#0085FF] text-xl lg:text-2xl font-medium flex items-center gap-2 whitespace-nowrap">
                  <FaRegEdit className="text-2xl" />
                  Edit
                </button>
              </div>
            </div>

            {/* Sign in & Security Section */}
            <h4 className="text-[20px] lg:text-[28px] font-medium text-[#101010] lg:mb-10 mb-5">
              Sign in & Security
            </h4>

            {/* Email - Input Field */}
            <div className="border-b border-[#B5B5B5] pb-5 lg:mb-10 mb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-[#404040] lg:text-[24px] text-[18px] font-medium mb-2">
                    Email
                  </h2>
                  <input
                    type="email"
                    defaultValue="slatfvshsw@gmail.com"
                    className="w-full  pt-3  text-[#101010]  rounded-xl outline-0 lg:text-[18px] text-base"
                    placeholder="Enter your email"
                  />
                </div>
                <button className="text-[#0085FF] border border-[#0085FF] px-2.5 py1.5 rounded-xl cursor-pointer text-xl lg:text-2xl font-medium whitespace-nowrap">
                  Verify
                </button>
              </div>
            </div>

            {/* Phone Number - Input Field */}
            <div className="border-b border-[#B5B5B5] pb-5 lg:mb-10 mb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-[#404040] lg:text-[24px] text-[20px] font-medium mb-2">
                    Phone Number
                  </h2>
                  <input
                    type="tel"
                    placeholder="Add your phone number"
                    className="w-full pt-3 text-[#5F5F5F]  rounded-xl outline-none lg:text-[18px] text-base"
                  />
                </div>
                <button className="text-[#0085FF] border border-[#0085FF] px-2.5 py1.5 rounded-xl cursor-pointer text-xl lg:text-2xl font-medium whitespace-nowrap">
                  Add
                </button>
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-[#B5B5B5] pb-5">
                <div className="flex-1 w-full">
                  <h2 className="text-[#404040] lg:text-[24px] text-[20px] font-medium mb-2">
                    Password
                  </h2>
                  <input
                    type="password"
                    defaultValue="Set a unique password"
                    className="w-full pt-3 text-[#101010] outline-0 lg:text-[18px] text-base"
                    placeholder="Set a unique password"
                  />
                </div>
                <button className="text-[#0085FF] border border-[#0085FF] px-2.5 py1.5 rounded-xl cursor-pointer text-xl lg:text-2xl font-medium whitespace-nowrap">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AccountSettingsPage;
