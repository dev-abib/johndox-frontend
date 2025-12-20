"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import User from "../../../../Assets/user.png";
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

const BrowseDetails: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  return (
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
              <source src="/property.mp4" type="video/mp4" />
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
                  Modern 3-Bedroom Apartment For Rent
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
                    $ 10,000
                  </h4>
                  <div className="flex flex-row md:flex-col gap-3 md:gap-6">
                    <Save className="w-[25px] h-[25px] 2xl:w-[38px] 2xl:h-[38px]" />
                    <Converter className="w-[25px] h-[25px] 2xl:w-[38px] 2xl:h-[38px]" />
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
                  Caldas, Honduras
                </p>
              </div>
              <div className="flex flex-wrap gap-5 mt-2.5">
                <div className="flex items-center gap-2.5">
                  <Bed
                    className={"w-[14px] h-[14px]  2xl:w-[18px] 2xl:h-[18px] "}
                  />
                  <span className="text-xs lg:text-[14px] font-normal text-[#404040]">
                    3 Beds
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Bathtub
                    className={"w-[14px] h-[14px]  2xl:w-[18px] 2xl:h-[18px] "}
                  />
                  <span className="text-xs lg:text-[14px] font-normal text-[#404040]">
                    2 Baths
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Acceleration
                    className={"w-[14px] h-[14px]  2xl:w-[18px] 2xl:h-[18px] "}
                  />
                  <span className="text-sm lg:text-[16px] font-normal text-[#404040]">
                    2200 M
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <h5 className="text-[#101010] text-[14px] 2xl:text-[24px] font-medium ">
                AGENT INFORMATION
              </h5>
              <div className="flex flex-col sm:flex-row gap-x-5 mt-2.5 2xl:mt-5 sm:items-end">
                <figure>
                  <Image src={User} alt="User" width={70} height={70} />
                </figure>
                <ul className="flex flex-col gap-1">
                  <li className="text-[18px] 2xl:text-[24px] font-medium text-[#0085FF]">
                    Jessy King
                  </li>
                  <li className="text-[13px] 2xl:text-[18px] font-medium text-[#5F5F5F]">
                    Senior Real Estate Agent
                  </li>
                  <li className="flex gap-x-2 text-[13px] 2xl:text-[18px] font-medium text-[#5F5F5F] mt-2">
                    <Star />
                    4.8 (127 review)
                  </li>
                </ul>
                <ul className="flex flex-col gap-1">
                  <li className="flex gap-x-2  text-[13px] 2xl:text-[18px] font-medium text-[#5F5F5F] lg:mt-0 mt-2">
                    <Mobile />
                    +52 384 123 4568
                  </li>
                  <li className="flex gap-x-2  text-[13px] 2xl:text-[18px] font-medium text-[#5F5F5F] mt-2">
                    <Email />
                    jessayking@gmail.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-x-7 mt-8">
              <button className="w-full bg-[#0085FF] text-white font-medium text-[13px] 2xl:text-lg py-2 2xl:py-3 rounded-2xl hover:bg-transparent hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300 cursor-pointer">
                Request a tour
              </button>
              <button className="w-full hover:bg-[#0085FF] hover:text-white font-medium text-[13px]  2xl:text-lg py-2 2xl:py-3 rounded-2xl bg-transparent text-[#0085FF] border border-[#0085FF] transition-all duration-300 cursor-pointer">
                Message
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrowseDetails;
