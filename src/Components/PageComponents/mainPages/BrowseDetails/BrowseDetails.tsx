"use client";
import React, { useRef, useState } from "react";
import Container from "@/Components/Common/Container";
import { Save, Video } from "@/Components/Svg/SvgContainer";
import { IoShareSocialOutline } from "react-icons/io5";

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
        <div className="flex gap-x-8.5">
          <div className=" w-full rounded-lg overflow-hidden relative h-[440px] cursor-pointer">
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

          <div className=" w-full rounded-lg">
            <div className="flex gap-x-20">
              <div className="flex gap-x-8">
                <h3 className="font-semibold text-[28px] text-[#0085FF]">
                  Modern 3-Bedroom Apartment For Rent
                </h3>
                <div className="flex gap-x-3 bg-[#F9FAFB] p-2 items-center h-fit rounded-[5px] cursor-pointer">
                  <p className="font-medium  text-[18px] text-[#0085FF]">
                    Share
                  </p>
                  <IoShareSocialOutline className="text-[#0085FF]" />
                </div>
              </div>
              <div className="flex gap-x-10">
                <h4 className="font-semibold text-[28px] text-[#0085FF] shrink-0">
                  $ 10,000
                </h4>
                <Save className="shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrowseDetails;
