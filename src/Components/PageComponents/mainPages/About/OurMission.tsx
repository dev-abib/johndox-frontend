import React from "react";
import Image from "next/image";
import Mission from "../../../../Assets/mission.png";
import { Mark } from "@/Components/Svg/SvgContainer";
import Container from "@/Components/Common/Container";

interface MissionProps {
  mission: any;
}

const OurMission = ({ mission }: MissionProps) => {
  return (
    <section className="py-[80px] lg:py-[150px]">
      <Container>
        <div className="flex flex-col xl:flex-row items-start lg:items-end gap-y-14 lg:gap-x-12">
          {/* Content */}
          <div className="w-full xl:w-1/2">
            <h2 className="text-[28px] lg:text-[38px] font-medium text-black">
              {mission?.data?.title}
            </h2>

            <p className="text-[16px] lg:text-[20px] text-[#404040] font-normal mt-4">
              {mission?.data?.description}
            </p>

            {/* Features */}
            <div className="flex xl:flex-col md:flex-row flex-col gap-6 mt-8 lg:mt-10">
              {mission?.data?.featureItems?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-4">
                  <Mark className="shrink-0 lg:size-8 size-5" />
                  <div>
                    <h4 className="text-[20px] md:text-base xl:text-[28px] text-[#0085FF] font-medium">
                      {item.title}
                    </h4>
                    <h5 className="text-[14px] md:text-[12px] xl:text-[18px] text-[#5F5F5F] font-normal">
                      {item.subTitle}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <figure className="w-full xl:w-1/2">
            <Image
              src={mission?.data?.bgImg}
              alt="mission"
              className="w-full h-auto rounded-xl"
              priority
              height={500}
              width={500}
            />
          </figure>
        </div>
      </Container>
    </section>
  );
};

export default OurMission;
