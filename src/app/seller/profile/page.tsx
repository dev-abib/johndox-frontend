import React from "react";
import Container from "@/Components/Common/Container";

const page = () => {
  return (
    <section className="py-10">
      <Container>
        <h3 className="text-[32px] font-medium text-[#101010]">
          Seller Profile
        </h3>
        <p className="text-[20px] font-normal text-[#404040] mt-3">
          Manage your listings and grow your business
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-9">
          {[
            { value: "3", label: "Active Listings" },
            { value: "4,444", label: "Total Views" },
            { value: "80", label: "Total Leads" },
            { value: "2", label: "Unread Messages" },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-[16px] bg-[rgba(230,243,255,0.20)] shadow-[0_0_6px_0_rgba(145,158,171,0.40)] py-8 lg:py-10 px-6 lg:px-10"
            >
              <h4 className="text-[#5F5F5F] text-base lg:text-lg font-normal">
                {item.label}
              </h4>
              <h3 className="text-3xl lg:text-[38px] text-[#404040] font-medium mt-4">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default page;
