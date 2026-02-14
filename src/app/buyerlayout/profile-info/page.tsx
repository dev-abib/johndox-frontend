"use client";
import Link from "next/link";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { getItem } from "@/lib/localStorage";
import { PiSpinnerBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import Profilepic from "../../../Assets/dummy.jpg";
import React, { useEffect, useState } from "react";
import { Mail } from "@/Components/Svg/SvgContainer";
import Container from "@/Components/Common/Container";
import {
  useGetUserData,
  useLogout,
  useUpdateUserBuyer,
} from "@/Hooks/api/auth_api";
import { useGetConversations } from "@/Hooks/api/message.api";

const AccountSettingsPage = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { mutate, isPending } = useUpdateUserBuyer();
  const [tempLastName, setTempLastName] = useState("");
  const [tempFirstName, setTempFirstName] = useState("");
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  useEffect(() => {
    setToken(getItem("token"));
  }, []);

  const { data } = useGetUserData(token);
  const { data: msgData } = useGetConversations(token);

  useEffect(() => {
    if (data?.data) {
      setFirstName(data.data.firstName || "");
      setLastName(data.data.lastName || "");
      setPhoneNumber(data.data.phoneNumber || "");

      setTempFirstName(data.data.firstName || "");
      setTempLastName(data.data.lastName || "");
      setTempPhoneNumber(data.data.phoneNumber || "");
    }
    if (msgData) {
      console.log(msgData);
    }
  }, [data, msgData]);

  const handleApplyName = () => {
    mutate({
      firstName: tempFirstName,
      lastName: tempLastName,
    });

    setFirstName(tempFirstName);
    setLastName(tempLastName);
    setIsNameModalOpen(false);
  };

  const handleCancelName = () => {
    setTempFirstName(firstName);
    setTempLastName(lastName);
    setIsNameModalOpen(false);
  };

  const handleApplyPhone = () => {
    mutate({
      phoneNumber: tempPhoneNumber,
    });

    setPhoneNumber(tempPhoneNumber);
    setTimeout(() => {
      setIsPhoneModalOpen(false);
    }, 1000);
  };

  const handleCancelPhone = () => {
    setTempPhoneNumber(phoneNumber);
    setIsPhoneModalOpen(false);
  };

  const openPhoneModal = () => {
    setTempPhoneNumber(phoneNumber);
    setIsPhoneModalOpen(true);
  };

  return (
    <section className="mt-10">
      <Container>
        <Link href={"/buyerlayout/profile"}>
          <h3 className="flex items-center gap-x-2 cursor-pointer text-[24px] lg:text-[32px] font-medium text-[#0085FF] mb-12">
            <IoIosArrowBack className="size-8" />
            Account Settings
          </h3>
        </Link>
        <div className="bg-[#F5F5F5] p-3 lg:p-10 rounded-[28px]">
          <h4 className="text-[24px] lg:text-[32px] font-medium text-[#101010] lg:mb-10 mb-5">
            My Profile
          </h4>
          <div className="bg-white rounded-[28px] p-4 lg:p-12">
            <h4 className="text-[20px] lg:text-[28px] font-medium text-[#101010] lg:mb-10 mb-5">
              Personal Info
            </h4>
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
                <Link href={"/buyerlayout/upload-image"}>
                  <div className="flex items-center gap-4 cursor-pointer">
                    <div className="relative">
                      <Image
                        src={data?.data?.profilePicture || Profilepic}
                        alt="Profile"
                        width={90}
                        height={90}
                        className="rounded-full object-cover border-4 border-white shadow-md w-22 h-22"
                      />
                    </div>
                    <FaRegEdit className="text-[#0085FF] text-2xl" />
                    <span className="text-[#0085FF] text-xl lg:text-2xl font-medium">
                      Edit
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="border-b border-[#B5B5B5] pb-5 lg:mb-10 mb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-[#404040] lg:text-[24px] text-[20px] font-medium mb-2">
                    Name
                  </h2>
                  <p className="pt-3 text-[#5F5F5F] lg:text-[18px] text-base">
                    {firstName} {lastName}
                  </p>
                </div>
                <button
                  onClick={() => setIsNameModalOpen(true)}
                  className="text-[#0085FF] text-xl lg:text-2xl font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <FaRegEdit className="text-2xl" />
                  Edit
                </button>
              </div>
            </div>
            <h4 className="text-[20px] lg:text-[28px] font-medium text-[#101010] lg:mb-10 mb-5">
              Sign in & Security
            </h4>
            <div className="border-b border-[#B5B5B5] pb-5 lg:mb-10 mb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-[#404040] lg:text-[24px] text-[18px] font-medium mb-2">
                    Email
                  </h2>
                  <input
                    type="email"
                    defaultValue="slatfvshsw@gmail.com"
                    className="w-full pt-3 text-[#101010] rounded-xl outline-0 lg:text-[18px] text-base"
                    placeholder="Enter your email"
                  />
                </div>
                {/* <button className="text-[#0085FF] border border-[#0085FF] px-2.5 py-1.5 rounded-xl cursor-pointer text-xl lg:text-2xl font-medium whitespace-nowrap">
                  Verify
                </button> */}
              </div>
            </div>
            <div className="border-b border-[#B5B5B5] pb-5 lg:mb-10 mb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-[#404040] lg:text-[24px] text-[20px] font-medium mb-2">
                    Phone Number
                  </h2>
                  <p className="pt-3 text-[#5F5F5F] lg:text-[18px] text-base">
                    {phoneNumber || "Add your phone number"}
                  </p>
                </div>
                <button
                  onClick={openPhoneModal}
                  className="text-[#0085FF] border border-[#0085FF] px-2.5 py-1.5 rounded-xl cursor-pointer text-xl lg:text-2xl font-medium whitespace-nowrap"
                >
                  {phoneNumber ? "Edit" : "Add"}
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
                <Link href={"/auth/change-password"}>
                  <button className="text-[#0085FF] border border-[#0085FF] px-2.5 py-1.5 rounded-xl cursor-pointer text-xl lg:text-2xl font-medium whitespace-nowrap">
                    Change Password
                  </button>
                </Link>
              </div>
              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                  className="bg-red-500 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  {isLoggingOut && <PiSpinnerBold className="animate-spin" />}
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Name Edit Modal */}
      {isNameModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-8 relative">
            <button
              onClick={handleCancelName}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-medium text-[#101010] text-center mb-8">
              Edit Name
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#404040] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={tempFirstName}
                  onChange={e => setTempFirstName(e.target.value)}
                  className="w-full px-4 lg:py-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0085FF] text-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-[#404040] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={tempLastName}
                  onChange={e => setTempLastName(e.target.value)}
                  className="w-full px-4 lg:py-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0085FF] text-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleCancelName}
                className="px-6 lg:py-3 py-2 rounded-lg border border-[#0085FF] text-[#0085FF] hover:bg-[#0085FF]/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyName}
                className="px-6 lg:py-3 py-2 rounded-lg bg-[#0085FF] text-white hover:bg-[#006edc] transition cursor-pointer"
              >
                {isPending ? (
                  <PiSpinnerBold className="animate-spin size-[20px] fill-white mx-auto" />
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phone Number Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-8 relative">
            <button
              onClick={handleCancelPhone}
              className="absolute top-6 right-6  hover:text-gray-600 text-5xl text-[#0085FF]"
            >
              ×
            </button>
            <h3 className="text-2xl font-medium text-[#0085FF] text-center mb-8">
              {phoneNumber ? "Edit Phone Number" : "Add Phone Number"}
            </h3>
            <div className="lg:w-[270px] w-25 lg:h-[270px] h-25 bg-[#E6F3FF] rounded-full flex justify-center items-center mx-auto lg:mt-20 lg:mb-5 my-5">
              <Mail className="lg:w-[220px] lg:h-[220px] h-20 w-20" />
            </div>
            <div className="max-w-md mx-auto">
              <label className="block text-sm text-[#0085FF] mb-2 text-center">
                To add number put your number here
              </label>
              <input
                type="tel"
                value={tempPhoneNumber}
                onChange={e => setTempPhoneNumber(e.target.value)}
                className="w-full px-4 lg:py-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0085FF] text-lg"
              />
            </div>
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={handleApplyPhone}
                className="px-6 lg:py-3 py-2 cursor-pointer rounded-lg bg-[#0085FF] text-white hover:bg-[#006edc] transition"
              >
                {isPending ? (
                  <PiSpinnerBold className="animate-spin size-[20px] fill-white mx-auto" />
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AccountSettingsPage;
