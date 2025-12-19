"use client";
import React, { useRef, useState } from "react";
import Container from "@/Components/Common/Container";
import { Video } from "@/Components/Svg/SvgContainer";

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
          <div className="bg-red-300 w-full rounded-lg overflow-hidden relative h-[440px] cursor-pointer">
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
                <Video className="cursor-pointer" />
              </div>
            )}
          </div>

          <div className="bg-red-300 w-full aspect-video rounded-lg"></div>
        </div>
      </Container>
    </section>
  );
};

export default BrowseDetails;
