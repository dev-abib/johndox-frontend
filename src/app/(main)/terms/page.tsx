"use client";
import React from "react";
import { Mark } from "@/Components/Svg/SvgContainer";
import Container from "@/Components/Common/Container";
import { TermsCondition } from "@/Hooks/api/cms_api";

const TermsPage = () => {
  const { data } = TermsCondition();
  const termsData = data?.data?.sections || [];

  return (
    <section>
      <Container>
        <div className="mt-15 flex flex-col gap-7">
          {termsData.map((section: any) => (
            <div key={section._id}>
              <div className="flex gap-3 items-center">
                <Mark className="shrink-0 lg:size-6 size-5" />
                <h3 className="lg:text-[24px] text-lg text-[#404040] font-medium">
                  {section.title}
                </h3>
              </div>
              <p className="mt-6 text-[#616161] text-base lg:text-[18px] font-medium">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TermsPage;
