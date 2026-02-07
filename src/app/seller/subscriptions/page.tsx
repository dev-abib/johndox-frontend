"use client";
import React, { useState } from "react";
import Container from "@/Components/Common/Container";
import { CheckSvg } from "@/Components/Svg/SvgContainer2";
import { useGetUserData } from "@/Hooks/api/auth_api";
import { PricingPlan } from "@/Hooks/api/cms_api";

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const token = localStorage.getItem("token");
  const { data: userRes } = useGetUserData(token);
  const currentPlanKey = userRes?.data?.subscription?.planKey;

  const { data: planRes, isLoading } = PricingPlan();
  const plans = planRes?.data?.plans || [];

  if (isLoading) return null;

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
          {plans.map((plan: any) => {
            const isCurrentPlan = currentPlanKey === plan.key;

            return (
              <div
                key={plan._id}
                className="rounded-2xl border border-gray-200 bg-[rgba(230,243,255,0.20)] p-4 xl:p-8 group shadow-sm hover:border hover:border-[#0085FF] transition-all"
              >
                {plan.isPopular && (
                  <div className="bg-[#0085FF] text-white text-center py-3 text-xl md:text-2xl font-medium rounded-t-lg -mx-4 -mt-4 xl:-mx-8 xl:-mt-8 mb-4">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl md:text-[32px] leading-tight md:leading-[48px] font-semibold text-black">
                  {plan.name}
                </h3>

                <p className="text-base md:text-lg font-medium leading-[28px] text-[#404040] mt-1">
                  {plan.description}
                </p>

                <div className="lg:mt-6 mt-3">
                  <span className="text-lg lg:text-3xl xl:text-[44px] font-bold text-[#0085FF]">
                    ${plan.pricing.monthly.amount}
                  </span>
                  <span className="text-gray-500"> /month</span>
                </div>

                {isCurrentPlan ? (
                  <button className="lg:mt-8 mt-3 md:mt-[50px] mb-8 md:mb-10 w-full rounded-xl border-2 text-base md:text-lg xl:text-2xl leading-tight md:leading-[36px] border-[#0085FF] xl:py-3 py-2 text-[#0085FF] font-semibold cursor-default">
                    Current
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsModalOpen(true);
                    }}
                    className="lg:mt-8 mt-3 md:mt-[50px] mb-8 md:mb-10 w-full rounded-xl border-2 text-base md:text-lg xl:text-2xl leading-tight md:leading-[36px] border-[#0085FF] xl:py-3 py-2 text-[#0085FF] font-semibold group-hover:bg-[#0085FF] group-hover:text-white transition cursor-pointer"
                  >
                    Upgrade
                  </button>
                )}

                <ul className="lg:mt-8 space-y-4 lg:space-y-[28px] text-base md:text-xl leading-relaxed md:leading-[30px] font-medium text-[#5F5F5F]">
                  {plan.features.map((item: string) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-base xl:text-[20px]"
                    >
                      <CheckSvg />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL (UNCHANGED DESIGN) */}
      {isModalOpen && selectedPlan && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#0085FF] to-blue-600 text-white text-center py-8 px-6 rounded-t-3xl sticky top-0 z-10">
              <h3 className="text-3xl font-bold">{selectedPlan.name}</h3>
              <p className="mt-2 text-lg opacity-90">
                {selectedPlan.description}
              </p>
            </div>

            <div className="p-8">
              <ul className="space-y-4 mb-8">
                {selectedPlan.features.map((item: string) => (
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
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${selectedPlan.pricing.monthly.amount}.00</span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-4 rounded-xl border-2 border-[#0085FF] text-[#0085FF] font-semibold hover:bg-[#0085FF] hover:text-white transition"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Subscription;
