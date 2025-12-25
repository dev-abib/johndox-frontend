"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/Common/Container";
import { IoIosArrowBack, IoMdCloudUpload } from "react-icons/io";
import DefaultProfilePic from "../../../Assets/profilepic.png";

const EditPhotoPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!previewUrl) {
      alert("No photo selected!");
      return;
    }
    console.log("Saving new profile photo:", previewUrl);
  };

  const displayImage = previewUrl || DefaultProfilePic;

  return (
    <section className="mt-10 ">
      <Container>
        <Link
          href="/seller/profile-info"
          className="flex items-center gap-x-2 text-[#0085FF] text-[24px] lg:text-[32px] font-medium mb-8 hover:underline"
        >
          <IoIosArrowBack className="size-7 lg:size-9" />
          Return to profile
        </Link>

        <h1 className="text-[20px] lg:text-[28px] font-medium text-[#101010] mb-8">
          Edit photo
        </h1>

        <div className="bg-[#F9FAFB] rounded-2xl lg:py-12 p-3 border border-[#B0D9FF] lg:px-20">
          <p className="text-center text-[#404040] text-lg sm:text-xl lg:text-2xl font-normal lg:mb-12 mb-5">
            Add an updated photo of yourself to help fill out your profile.
          </p>

          <div className="flex justify-center lg:mb-12 mb-5">
            <div className="relative">
              <Image
                src={displayImage}
                alt="Profile preview"
                width={200}
                height={200}
                className="rounded-full object-cover border-8 border-white shadow-lg h-[170px] w-[170px]"
              />
            </div>
          </div>

          <div className=" mx-auto mb-8 w-fit">
            <label
              htmlFor="photo-upload"
              className="flex lg:flex-row flex-col gap-x-5 items-center justify-center w-full border-2 border-dashed border-[#0085FF]/30 rounded-2xl bg-white/60 cursor-pointer hover:bg-white/80 transition  px-7 py-5"
            >
              <IoMdCloudUpload className="text-[#0085FF] text-4xl" />
              <span className="text-[#0085FF] text-base lg:text-lg font-medium text-center">
                Add an updated photo of yourself to help fill out your profile.
              </span>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden "
              />
            </label>
          </div>

          <p className="text-center text-[#0085FF] text-base sm:text-lg mb-12">
            Preview and make size adjustments
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleSave}
              disabled={!previewUrl}
              className="bg-[#0085FF] text-white px-10 py-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EditPhotoPage;
