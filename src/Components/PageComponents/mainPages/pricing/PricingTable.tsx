"use client";

import { useState } from "react";
import Container from "@/Components/Common/Container";
import { CheckSvg } from "@/Components/Svg/SvgContainer2";
import { getItem } from "@/lib/localStorage";
import { checkOutPlan } from "@/Hooks/api/payment.api";
import toast from "react-hot-toast";

interface pricingprops {
  data?: any;
  plan?: any;
}

const PricingTable = ({ data, plan }: pricingprops) => {
  const [isYearly, setIsYearly] = useState(false);
  const [token] = useState<string | undefined>(getItem("token"));
  const { mutate, isPending } = checkOutPlan(token);

  const plansArray = plan?.data?.plans || [];

  const sortedPlans = [...plansArray].sort(
    (a, b) =>
      (a.pricing?.monthly?.amount || 0) - (b.pricing?.monthly?.amount || 0),
  );

  const handleCheckOut = (
    billingCycle: "monthly" | "yearly",
    planKey: string,
  ) => {
    if (!token) {
      toast.error("Please login to continue");
      return;
    }

    console.log(plan, planKey);
    

    if (isPending) return;

    mutate(
      {
        token,
        planKey,
        billingCycle: billingCycle,
      },
      {
        onSuccess: (response: any) => {
          console.log(response.data);

          if (response?.data?.url) {
            window.location.href = response?.data?.url;
            return;
          }
        },
        onError: (err: any) => {
          console.error("Checkout error:", err);
        },
      },
    );
  };

  return (
    <section className="lg:px-6 px-3 lg:pt-10">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-3xl lg:text-[56px] font-bold text-[#0085FF]">
            {data?.data?.mainTitle || "Pricing Plans"}
          </h2>
          <p className="mt-3 text-sm md:text-base lg:text-[20px] font-medium text-[#404040]">
            {data?.data?.subTitle}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            <span
              className={
                !isYearly
                  ? "font-semibold text-[#101010] text-base md:text-lg lg:text-[26px] leading-[36px]"
                  : "text-base md:text-xl"
              }
            >
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`w-12 h-6 rounded-full transition ${isYearly ? "bg-[#0085FF]" : "bg-gray-300"}`}
            >
              <span
                className={`block w-5 h-5 bg-white rounded-full transition transform ${isYearly ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>

            <span
              className={
                isYearly
                  ? "font-semibold text-[#101010] text-base md:text-lg lg:text-[26px]"
                  : "text-base md:text-xl"
              }
            >
              Yearly{" "}
              <span className="text-[#0085FF]">
                Save {data?.data?.discountAmount || 0}%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-[45px]">
          {sortedPlans.map((item: any) => {
            console.log(item);

            const isPopular = item.isPopular;
            const price = isYearly
              ? item.pricing?.yearly?.amount
              : item.pricing?.monthly?.amount;

            let buttonText = "Get Started";
            if (item.key === "enterprise") buttonText = "Contact Sales";
            else if (item.trialDays > 0) buttonText = "Start Free Trial";

            return (
              <div
                key={item._id}
                className={`rounded-2xl border border-gray-200 bg-[rgba(230,243,255,0.20)] group shadow-sm hover:border hover:border-[#0085FF] transition-all flex flex-col ${
                  isPopular ? "" : "p-4 xl:p-8"
                }`}
              >
                {isPopular && (
                  <div className="bg-[#0085FF] text-white text-center py-3 text-xl md:text-2xl font-medium rounded-t-lg">
                    Most Popular
                  </div>
                )}

                <div
                  className={isPopular ? "p-4 xl:p-8 flex-grow" : "flex-grow"}
                >
                  <h3 className="text-2xl md:text-[32px] leading-tight md:leading-[48px] font-semibold text-black">
                    {item.name}
                  </h3>
                  <p className="text-base md:text-lg font-medium leading-[28px] text-[#404040] mt-1 whitespace-pre-line">
                    {item.description}
                  </p>

                  <div className="lg:mt-6 mt-3">
                    <span className="text-lg lg:text-3xl xl:text-[44px] font-bold text-[#0085FF]">
                      ${price}
                    </span>
                    <span className="text-gray-500">
                      {" "}
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleCheckOut(isYearly ? "yearly" : "monthly", item?.key)
                    }
                    className="lg:mt-8 mt-3 md:mt-[50px] mb-8 md:mb-10 w-full rounded-xl border-2 text-base md:text-lg xl:text-2xl leading-tight md:leading-[36px] border-[#0085FF] xl:py-3 py-2 text-[#0085FF] font-semibold group-hover:bg-[#0085FF] group-hover:text-white transition"
                  >
                    {buttonText}
                  </button>

                  <ul className="lg:mt-8 space-y-4 lg:space-y-[28px] text-base md:text-xl leading-relaxed md:leading-[30px] font-medium text-[#5F5F5F]">
                    {item.features?.map((feature: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-base xl:text-[20px]"
                      >
                        <CheckSvg />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default PricingTable;
