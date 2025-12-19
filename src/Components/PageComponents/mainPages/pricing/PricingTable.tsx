"use client";

import Container from "@/Components/Common/Container";
import { CheckSvg } from "@/Components/Svg/SvgContainer2";
import { useState } from "react";

const PricingTable = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="px-6 pm-20 pt-30 ">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#0085FF]">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-3 text-gray-600">
          Choose the perfect plan for your real estate business
        </p>

        {/* Toggle */}
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <span className={!isYearly ? "font-semibold text-[#101010] text-[26px] leading-[36px]" : ""}>Monthly</span>

          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`w-12 h-6 rounded-full transition ${
              isYearly ? "bg-[#0085FF]" : "bg-gray-300"
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full transition transform ${
                isYearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>

          <span className={isYearly ? "font-semibold text-xl " : ""}>
            <span className="text-xl">Yearly </span>
            <span className="text-[#0085FF] text-xl">Save 17%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <Container>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-[45px]">
        {/* Starter */}
        <div className="rounded-2xl border border-gray-200 bg-[rgba(230,243,255,0.20)] p-8 shadow-sm">
          <h3 className="text-[32px] leading-[48px] font-semibold text-black">Starter</h3>
          <p className="text-lg font-medium leading-[28px] text-[#404040] mt-1">
            Perfect for new sellers
          </p>

          <div className="mt-6">
            <span className="text-3xl font-bold text-[#0085FF]">
              ${isYearly ? "24" : "29"}
            </span>
            <span className="text-gray-500"> /month</span>
          </div>

          <button className="mt-[50px] mb-10 w-full rounded-xl border text-2xl leading-[36px] border-[#0085FF] py-3 text-[#0085FF] font-semibold hover:bg-[#0085FF] hover:text-white transition">
            Get Started
          </button>

          <ul className="mt-8 space-y-[28px] text-xl leading-[30px] font-medium text-[#5F5F5F]">
            {[
              "Up to 3 active listings",
              "Basic property photos",
              "Standard support",
              "Basic analytics",
              "Email notifications",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckSvg  />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Professional (Most Popular) */}
        <div className="rounded-2xl border-2 border-[#0085FF] bg-[rgba(230,243,255,0.20)] shadow-lg overflow-hidden">
          <div className="bg-[#0085FF] text-white text-center py-3 text-2xl font-medium">
            Most Popular
          </div>

          <div className="p-8">
            <h3 className="text-xl font-semibold">Professional</h3>
            <p className="text-lg font-medium leading-[28px] text-[#404040] mt-1">
              For active sellers
            </p>

            <div className="mt-6">
              <span className="text-3xl font-bold text-[#0085FF]">
                ${isYearly ? "65" : "79"}
              </span>
              <span className="text-gray-500"> /month</span>
            </div>

            <button className="mt-6  mb-10 w-full text-2xl leading-[36px] font-semibold rounded-xl bg-[#0085FF] py-3 text-white hover:opacity-90 transition">
              Start Free Trial
            </button>

            <ul className="mt-8 space-y-[28px] text-xl leading-[30px] font-medium text-[#5F5F5F]">
              {[
                "Up to 15 active listings",
                "Unlimited photos & videos",
                "Priority support",
                "Advanced analytics",
                "Featured listings (5/month)",
                "Social media integration",
                "Lead management tools",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckSvg  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enterprise */}
        <div className="rounded-2xl border border-gray-200 bg-[rgba(230,243,255,0.20)] p-8 shadow-sm">
          <h3 className="text-[32px] leading-[48px] font-semibold text-black">Enterprise</h3>
          <p className="text-lg font-medium leading-[28px] text-[#404040] mt-1">
            For agencies & teams
          </p>

          <div className="mt-6">
            <span className="text-3xl font-bold text-[#0085FF]">
              ${isYearly ? "165" : "199"}
            </span>
            <span className="text-gray-500"> /month</span>
          </div>

          <button className="mt-6 mb-10 w-full text-2xl leading-[36px] font-semibold rounded-xl border border-[#0085FF] py-3 text-[#0085FF]  hover:bg-[#0085FF] hover:text-white transition">
            Contact Sales
          </button>

          <ul className="mt-8 space-y-[28px] text-xl leading-[30px] font-medium text-[#5F5F5F]">
            {[
              "Unlimited listings",
              "Unlimited photos & videos",
              "24/7 dedicated support",
              "Custom analytics",
              "Unlimited featured listings",
              "Team management",
              "API access",
              "Custom branding",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckSvg />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
        </Container>
    </section>
  );
};

export default PricingTable;
