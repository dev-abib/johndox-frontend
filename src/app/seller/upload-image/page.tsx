"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { PiSpinnerBold } from "react-icons/pi";
import Container from "@/Components/Common/Container";
import { useUpdateUserBuyer } from "@/Hooks/api/auth_api";
import DefaultProfilePic from "../../../Assets/profilepic.png";
import { IoIosArrowBack, IoMdCloudUpload } from "react-icons/io";

const EditPhotoPage = () => {
  const { mutate, isPending } = useUpdateUserBuyer();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!selectedFile) {
      alert("No photo selected!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    mutate(formData);
  };

  const displayImage = previewUrl || DefaultProfilePic;

  return (
    <section className="mt-10">
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
          <p className="text-center text-[#404040] text-lg sm:text-xl lg:text-2xl mb-5 lg:mb-12">
            Add an updated photo of yourself to help fill out your profile.
          </p>

          <div className="flex justify-center mb-5 lg:mb-12">
            <Image
              src={displayImage}
              alt="Profile preview"
              width={200}
              height={200}
              className="rounded-full object-cover border-8 border-white shadow-lg h-[170px] w-[170px]"
            />
          </div>

          <div className="mx-auto mb-8 w-fit">
            <label
              htmlFor="photo-upload"
              className="flex lg:flex-row flex-col gap-x-5 items-center justify-center border-2 border-dashed border-[#0085FF]/30 rounded-2xl bg-white/60 cursor-pointer px-7 py-5 hover:bg-white/80 transition"
            >
              <IoMdCloudUpload className="text-[#0085FF] text-4xl" />
              <span className="text-[#0085FF] text-base lg:text-lg font-medium text-center">
                Upload new profile photo
              </span>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <p className="text-center text-[#0085FF] text-base sm:text-lg mb-12">
            Preview and make size adjustments
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleSave}
              disabled={!selectedFile || isPending}
              className="bg-[#0085FF] text-white px-10 py-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPending && <PiSpinnerBold className="animate-spin" />}
              Save
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EditPhotoPage;
