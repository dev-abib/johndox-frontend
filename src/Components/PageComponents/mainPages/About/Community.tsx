import Container from "@/Components/Common/Container";
import React from "react";

const Community = () => {
  return (
    <section className="">
      <Container>
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="font-medium text-black text-2xl sm:text-4xl xl:text-[38px]">
            A Growing Community of Buyers & Sellers
          </h2>
          <p className="font-normal text-black text-base sm:text-lg lg:text-[18px] mt-4 max-w-3xl mx-auto">
            Connecting real people with real opportunities across Honduras.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-9">
          {[
            { value: "50K+", label: "Active Listings" },
            { value: "100K+", label: "Happy Users" },
            { value: "32", label: "States Covered" },
            { value: "500+", label: "Verified Agents" },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-[16px] bg-[rgba(230,243,255,0.20)] shadow-[0_0_6px_0_rgba(145,158,171,0.40)] py-8 lg:py-10 px-6 lg:px-10 text-center"
            >
              <h3 className="text-3xl lg:text-[38px] text-[#0085FF] font-semibold">
                {item.value}
              </h3>
              <h4 className="text-[#404040] text-base lg:text-[20px] font-medium mt-2">
                {item.label}
              </h4>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Community;
