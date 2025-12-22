import React from "react";
import Image from "next/image";
import Mission from "../../../../Assets/mission.png";
import Container from "@/Components/Common/Container";
import { Mark } from "@/Components/Svg/SvgContainer";

const OurMission = () => {
  return (
    <section className="py-[150px]">
      <Container>
        <div className="flex items-end gap-x-12">
          <div className="w-1/2">
            <h2 className="text-[38px] font-medium text-black">Our Mission</h2>
            <p className="text-[20px] text-[#404040] font-normal">
              At Terralink, we believe that finding the perfect property should
              be simple, transparent, and accessible to everyone. Our mission is
              to revolutionize the real estate industry in Honduras by
              leveraging cutting-edge technology and human expertise.
              <br />
              <br />
              We empower buyers to make informed decisions, help sellers reach
              the right audience, and support agents in growing their business.
              Together, we're building a more efficient and trustworthy real
              estate marketplace.
            </p>
            <div className="flex flex-col gap-5 mt-10">
              <div className="flex gap-x-5 items-center">
                <Mark />
                <div className="">
                  <h4 className="text-[28px] text-[#0085FF] font-medium ">
                    Transparency First
                  </h4>
                  <h5 className="text-[18px] text-[#5F5F5F] font-normal">
                    All listings are verified and authentic
                  </h5>
                </div>
              </div>
              <div className="flex gap-x-5 items-center">
                <Mark />
                <div className="">
                  <h4 className="text-[28px] text-[#0085FF] font-medium ">
                    Technology Driven
                  </h4>
                  <h5 className="text-[18px] text-[#5F5F5F] font-normal">
                    Advanced tools for better property discovery
                  </h5>
                </div>
              </div>
              <div className="flex gap-x-5 items-center">
                <Mark />
                <div className="">
                  <h4 className="text-[28px] text-[#0085FF] font-medium ">
                    Customer Focused
                  </h4>
                  <h5 className="text-[18px] text-[#5F5F5F] font-normal">
                    24/7 support for all your needs
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <figure className="w-1/2">
            <Image
              src={Mission}
              alt="mission"
              className="w-full h-auto"
              priority
            />
          </figure>
        </div>
      </Container>
    </section>
  );
};

export default OurMission;
