"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getItem } from "@/lib/localStorage";
import User from "../../../../Assets/dummy.jpg";
import Container from "../../../Common/Container";
import { IoShareSocialOutline } from "react-icons/io5";
import {
  Acceleration,
  Bathtub,
  Bed,
  Converter,
  Email,
  Location,
  Mobile,
  Save,
  Star,
  Video,
} from "@/Components/Svg/SvgContainer";
import { useGetUserData } from "@/Hooks/api/auth_api";
import MessageModal from "../../buyerPages/MessageModal";
import React, { useEffect, useRef, useState } from "react";
import TourRequestModal from "../../buyerPages/TourRequestModal";

interface BrowswProps {
  data: any;
}

const BrowseDetails: React.FC<BrowswProps> = ({ data }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  const { data: userdata } = useGetUserData(token);
  const isBuyer = userdata?.data?.role === "buyer";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [openConverter, setOpenConverter] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = (): void => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = (): void => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTourRequestClick = () => {
    if (isBuyer) {
      setIsModalOpen(true);
    } else {
      router.push("/auth/login");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const openMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  const videoUrl =
    data?.media?.find((item: any) => item.fileType === "video")?.url ||
    "/property.mp4";
  
  console.log(data?.author?._id);
  

  return (
    <>
      <section className="pt-10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-y-4.5 lg:gap-x-4.5 2xl:gap-x-8.5">
            <div className="w-full flex-1 rounded-lg overflow-hidden relative h-[440px] cursor-pointer">
              <video
                ref={videoRef}
                preload="metadata"
                className="w-full h-full object-cover"
                onClick={handlePause}
                playsInline
              >
                <source
                  src={videoUrl ? videoUrl : "/property.mp4"}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {!isPlaying && (
                <div
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <Video className="cursor-pointer animate-spin [animation-duration:3s]" />
                </div>
              )}
            </div>

            <div className=" flex-1 rounded-lg p-3">
              <div className="flex flex-col sm:flex-row gap-2.5 md:gap-5 2xl:gap-20">
                <div className="flex gap-x-4 2xl:gap-x-8">
                  <h3 className="font-semibold text-[20px] 2xl:text-[28px] 2xl:max-w-[300px] text-[#0085FF]">
                    {data?.propertyName}
                  </h3>
                  <div className="flex gap-x-3 bg-[#F9FAFB] p-2 items-center h-fit rounded-[5px] cursor-pointer">
                    <p className="font-medium text-[14px] 2xl:text-[18px] text-[#0085FF]">
                      Share
                    </p>
                    <IoShareSocialOutline className="text-[#0085FF]" />
                  </div>
                </div>
                <div className="">
                  <div className="flex  gap-x-6 2xl:gap-x-20 w-full">
                    <h4 className="font-semibold text-[18px] 2xl:text-[28px] text-[#0085FF] shrink-0">
                      ${data?.price?.toLocaleString()}
                    </h4>
                    <div className="flex flex-row md:flex-col gap-3 md:gap-6">
                      <Save className="w-[25px] h-[25px] 2xl:w-[38px] 2xl:h-[38px] cursor-pointer" />
                      <Converter
                        onClick={() => setOpenConverter(true)}
                        className="w-[25px] h-[25px] 2xl:w-[38px] 2xl:h-[38px] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2.5 2xl:pt-5 pb-4 2xl:pb-8">
                <div className="flex items-center gap-2.5 ">
                  <Location
                    className={"w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]  "}
                  />
                  <p className="text-[13px] xl:text-[16px] font-medium text-[#404040]">
                    {data?.fullAddress}
                    <span>,{data?.city}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-5 mt-2.5">
                  <div className="flex items-center gap-2.5">
                    <Bed
                      className={
                        "w-[14px] h-[14px]  2xl:w-[18px] 2xl:h-[18px]        "
                      }
                    />
                    <span className="text-xs lg:text-[14px] font-normal text-[#404040]">
                      {data?.bedrooms} Beds
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Bathtub
                      className={
                        "w-[14px] h-[14px]  2xl:w-[18px] 2xl:h-[18px] "
                      }
                    />
                    <span className="text-xs lg:text-[14px] font-normal text-[#404040]">
                      {data?.bathrooms} Baths
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Acceleration
                      className={
                        "w-[14px] h-[14px]  2xl:w-[18px] 2xl:h-[18px] "
                      }
                    />
                    <span className="text-sm lg:text-[16px] font-normal text-[#404040]">
                      {data?.areaInSqMeter} m
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-[#101010] text-[14px] 2xl:text-[24px] font-medium">
                  AGENT INFORMATION
                </h5>

                <div className="flex flex-col sm:flex-row gap-x-5 mt-2.5 2xl:mt-5">
                  <figure>
                    <Image
                      src={data?.author?.profilePicture || User}
                      alt="User"
                      width={70}
                      height={70}
                      className="rounded-full h-20 w-20 object-center"
                    />
                  </figure>
                  <div
                    className={`${
                      !isBuyer ? "blur-xs pointer-events-none select-none" : ""
                    }`}
                  >
                    <div className="flex gap-x-5">
                      <ul className="flex flex-col gap-1">
                        <li className="text-[18px] 2xl:text-[24px] font-medium text-[#0085FF]">
                          {data?.author?.firstName}
                        </li>
                        <li className="text-[13px] 2xl:text-[18px] font-medium text-[#5F5F5F]">
                          Senior Real Estate Agent
                        </li>
                        <li className="flex gap-x-2 text-[13px] 2xl:text-[18px] font-medium text-[#5F5F5F] mt-2">
                          <Star />
                          {data?.author?.rating?.ratingCount} (
                          {data?.author?.rating?.ratingCount} review)
                        </li>
                      </ul>

                      <ul className="flex flex-col gap-1 justify-end">
                        <li className="flex gap-x-2 text-[13px] 2xl:text-[18px] font-medium text-[#5F5F5F] lg:mt-0 mt-2">
                          <Mobile />
                          {data?.author?.phoneNumber || "+52 384 123 4568"}
                        </li>
                        <li className="flex gap-x-2 text-[13px] 2xl:text-[18px] font-medium text-[#5F5F5F] mt-2">
                          <Email />
                          {data?.author?.email}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-x-7 mt-8">
                <button
                  onClick={handleTourRequestClick}
                  className="w-full bg-[#0085FF] text-white font-medium text-[13px] 2xl:text-lg py-2 2xl:py-3 rounded-2xl hover:bg-transparent hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300 cursor-pointer"
                >
                  Request a tour
                </button>
                <button
                  onClick={openMessageModal}
                  className="w-full hover:bg-[#0085FF] hover:text-white font-medium text-[13px] 2xl:text-lg py-2 2xl:py-3 rounded-2xl bg-transparent text-[#0085FF] border border-[#0085FF] transition-all duration-300 cursor-pointer"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
          {openConverter && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 sm:px-0">
              <div className="bg-white w-full sm:w-[90%] max-w-[520px] rounded-xl p-4 sm:p-6 relative">
                {/* Close */}
                <button
                  onClick={() => setOpenConverter(false)}
                  className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-400 hover:text-black cursor-pointer"
                >
                  ✕
                </button>

                <h3 className="text-[#0085FF] text-base sm:text-lg font-semibold mb-4 sm:mb-5">
                  Currency Converter
                </h3>

                {/* From */}
                <div className="border rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center overflow-hidden mb-4">
                  <input
                    type="number"
                    defaultValue={1}
                    className="w-full sm:w-1/2 px-4 py-3 outline-none border-b md:border-0"
                  />
                  <select className="w-full sm:w-1/2 px-4 py-3 outline-none bg-transparent">
                    <option>Honduran Lempira</option>
                    <option>Dollar</option>
                  </select>
                </div>

                <div className="flex justify-center my-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                    ⇅
                  </div>
                </div>

                <div className="border rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center overflow-hidden mb-5 sm:mb-6">
                  <input
                    type="number"
                    defaultValue={0.038}
                    className="w-full sm:w-1/2 px-4 py-3 outline-none border-b md:border-0"
                  />
                  <select className="w-full sm:w-1/2 px-4 py-3 outline-none bg-transparent">
                    <option>Dollar</option>
                    <option>Honduran Lempira</option>
                  </select>
                </div>

                <button
                  onClick={() => setOpenConverter(false)}
                  className="w-full bg-[#0085FF] text-white py-3 sm:py-3.5 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Modal */}
      <TourRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        propertyId={data?._id}
      />

      {/* Modal */}
      <MessageModal
        userId={data?.author?._id}
        isOpen={isMessageModalOpen}
        onClose={closeMessageModal}
      />
    </>
  );
};

export default BrowseDetails;
