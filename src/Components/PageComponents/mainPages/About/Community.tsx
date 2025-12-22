import Container from "@/Components/Common/Container";
import React from "react";

const Community = () => {
  return (
    <section>
      <Container>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-medium text-black text-2xl sm:text-4xl xl:text-[38px]">
            A Growing Community of Buyers & Sellers
          </h2>
          <p className="font-normal text-black text-base sm:text-lg lg:text-[18px] mt-4 max-w-3xl mx-auto">
            Connecting real people with real opportunities across Honduras.
          </p>
        </div>
        <div className="mt-15 flex gap-x-9">
          <div className="rounded-[16px] bg-[rgba(230,243,255,0.20)] shadow-[0_0_6px_0_rgba(145,158,171,0.40)] py-10 px-15 text-center w-full">
            <h3 className="text-[38px] text-[#0085FF] font-semibold">50K+</h3>
            <h4 className="text-[#404040] text-[20px] font-medium mt-2">
              Active Listings
            </h4>
          </div>
          <div className="rounded-[16px] bg-[rgba(230,243,255,0.20)] shadow-[0_0_6px_0_rgba(145,158,171,0.40)] py-10 px-15 text-center w-full">
            <h3 className="text-[38px] text-[#0085FF] font-semibold">100K+</h3>
            <h4 className="text-[#404040] text-[20px] font-medium mt-2">
              Happy Users
            </h4>
          </div>
          <div className="rounded-[16px] bg-[rgba(230,243,255,0.20)] shadow-[0_0_6px_0_rgba(145,158,171,0.40)] py-10 px-15 text-center w-full">
            <h3 className="text-[38px] text-[#0085FF] font-semibold">32</h3>
            <h4 className="text-[#404040] text-[20px] font-medium mt-2">
              States Covered
            </h4>
          </div>
          <div className="rounded-[16px] bg-[rgba(230,243,255,0.20)] shadow-[0_0_6px_0_rgba(145,158,171,0.40)] py-10 px-15 text-center w-full">
            <h3 className="text-[38px] text-[#0085FF] font-semibold">500+</h3>
            <h4 className="text-[#404040] text-[20px] font-medium mt-2">
              Verified Agents
            </h4>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Community;
