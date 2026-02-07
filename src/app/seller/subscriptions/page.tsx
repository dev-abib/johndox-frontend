"use client";
import React, { useState } from "react";
import Container from "@/Components/Common/Container";
import { CheckSvg } from "@/Components/Svg/SvgContainer2";

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <h2 className="text-[#404040] lg:text-[28px] text-[24px] font-medium">
        Subscription Plans
      </h2>
      <h5 className="lg:text-[18px] text-base text-[#5F5F5F] font-normal mt-3">
        Select a plan that fits your selling goals
      </h5>
      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-[45px]">
          <div className="rounded-2xl border border-gray-200 bg-[rgba(230,243,255,0.20)] p-4 xl:p-8 group shadow-sm hover:border hover:border-[#0085FF] transition-all">
            <h3 className="text-2xl md:text-[32px] leading-tight md:leading-[48px] font-semibold text-black">
              Starter
            </h3>
            <p className="text-base md:text-lg font-medium leading-[28px] text-[#404040] mt-1">
              Perfect for new sellers
            </p>

            <div className="lg:mt-6 mt-3">
              <span className="text-lg lg:text-3xl xl:text-[44px] font-bold text-[#0085FF]">
                $0
              </span>
              <span className="text-gray-500"> /month</span>
            </div>

            <button className="lg:mt-8 mt-3 md:mt-[50px] mb-8 md:mb-10 w-full rounded-xl border-2 text-base md:text-lg xl:text-2xl leading-tight md:leading-[36px] border-[#0085FF] xl:py-3 py-2 text-[#0085FF] font-semibold group-hover:bg-[#0085FF] group-hover:text-white transition cursor-pointer">
              Current
            </button>

            <ul className=" lg:mt-8 space-y-4 lg:space-y-[28px] text-base md:text-xl leading-relaxed md:leading-[30px] font-medium text-[#5F5F5F]">
              {[
                "Up to 3 active listings",
                "Basic property photos",
                "Standard support",
                "Basic analytics",
                "Email notifications",
              ].map(item => (
                <li
                  key={item}
                  className="flex items-center gap-3  text-base xl:text-[20px]"
                >
                  <CheckSvg />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[rgba(230,243,255,0.20)] group shadow-sm hover:border hover:border-[#0085FF] transition-all">
            <div className="bg-[#0085FF] text-white text-center py-3 text-xl md:text-2xl font-medium rounded-t-lg">
              Most Popular
            </div>
            <div className="p-4 xl:p-8 ">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-2xl md:text-[32px] leading-tight md:leading-[48px] font-semibold text-black">
                    Professional
                  </h3>
                  <p className="text-base md:text-lg font-medium leading-[28px] text-[#404040] mt-1">
                    For active sellers
                  </p>
                </div>
                <button className="rounded-[23px] bg-[rgba(241,237,255,0.6)] text-[#8462FF] text-[14px] cursor-pointer p-3.5 h-fit">
                  14 Days Free Trial
                </button>
              </div>

              <div className="lg:mt-6 mt-3">
                <span className="text-lg lg:text-3xl xl:text-[44px] font-bold text-[#0085FF]">
                  $79
                </span>
                <span className="text-gray-500"> /month</span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="lg:mt-8 mt-3 md:mt-[50px] mb-8 md:mb-10 w-full rounded-xl border-2 text-base md:text-lg xl:text-2xl leading-tight md:leading-[36px] border-[#0085FF] xl:py-3 py-2 text-[#0085FF] font-semibold group-hover:bg-[#0085FF] group-hover:text-white transition"
              >
                Upgrade
              </button>

              <ul className=" lg:mt-8 space-y-4 lg:space-y-[28px] text-base md:text-xl leading-relaxed md:leading-[30px] font-medium text-[#5F5F5F]">
                {[
                  "Up to 15 active listings",
                  "Unlimited photos & videos",
                  "Priority support",
                  "Advanced analytics",
                  "Featured listings (5/month)",
                  "Social media integration",
                  "Lead management tools",
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-center gap-3  text-base xl:text-[20px]"
                  >
                    <CheckSvg />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[rgba(230,243,255,0.20)] p-4 xl:p-8 group shadow-sm hover:border hover:border-[#0085FF] transition-all">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-2xl md:text-[32px] leading-tight md:leading-[48px] font-semibold text-black">
                  Enterprise
                </h3>
                <p className="text-base md:text-lg font-medium leading-[28px] text-[#404040] mt-1">
                  For agencies & teams
                </p>
              </div>
              <button className="rounded-[23px] bg-[rgba(241,237,255,0.6)] text-[#8462FF] text-[14px] cursor-pointer p-3.5 h-fit">
                14 Days Free Trial
              </button>
            </div>

            <div className="lg:mt-6 mt-3">
              <span className="text-lg lg:text-3xl xl:text-[44px] font-bold text-[#0085FF]">
                $199
              </span>
              <span className="text-gray-500"> /month</span>
            </div>

            <button className="lg:mt-8 mt-3 md:mt-[50px] mb-8 md:mb-10 w-full rounded-xl border-2 text-base md:text-lg xl:text-2xl leading-tight md:leading-[36px] border-[#0085FF] xl:py-3 py-2 text-[#0085FF] font-semibold group-hover:bg-[#0085FF] group-hover:text-white transition">
              Upgrade
            </button>

            <ul className="lg:mt-8 space-y-4 lg:space-y-[28px] text-base md:text-xl leading-relaxed md:leading-[30px] font-medium text-[#5F5F5F]">
              {[
                "Unlimited listings",
                "Unlimited photos & videos",
                "24/7 dedicated support",
                "Custom analytics",
                "Unlimited featured listings",
                "Team management",
                "API access",
                "Custom branding",
              ].map(item => (
                <li
                  key={item}
                  className="flex items-center gap-3  text-base xl:text-[20px]"
                >
                  <CheckSvg />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#0085FF] to-blue-600 text-white text-center py-8 px-6 rounded-t-3xl sticky top-0 z-10">
              <h3 className="text-3xl font-bold">Professional</h3>
              <p className="mt-2 text-lg opacity-90">
                Upgrade to unlock powerful features
              </p>
            </div>

            <div className="p-8">
              <ul className="space-y-4 mb-8">
                {[
                  "Up to 15 active listings",
                  "Unlimited photos & videos",
                  "Priority support",
                  "Advanced analytics",
                  "Featured listings (5/month)",
                  "Social media integration",
                  "Lead management tools",
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[#404040]"
                  >
                    <CheckSvg />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monthly subscription</span>
                    <span>$79.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-600">-$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (0%)</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>$79.00</span>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white pt-4 -mx-8 px-8 pb-8 border-t border-gray-200">
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 rounded-xl border-2 border-[#0085FF] text-[#0085FF] font-semibold hover:bg-[#0085FF] hover:text-white transition w-full cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Subscription;
