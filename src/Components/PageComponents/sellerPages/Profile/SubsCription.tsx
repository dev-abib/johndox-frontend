import { CheckSvg } from "@/Components/Svg/SvgContainer2";

const SubsCription = () => {
  return (
    <div>
      <h2 className="text-[#404040] text-[28px] font-medium">
        Subscription Plans
      </h2>
      <h5 className="text-[18px] text-[#5F5F5F] font-normal mt-3">
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

            <button className="lg:mt-8 mt-3 md:mt-[50px] mb-8 md:mb-10 w-full rounded-xl border-2 text-base md:text-lg xl:text-2xl leading-tight md:leading-[36px] border-[#0085FF] xl:py-3 py-2 text-[#0085FF] font-semibold group-hover:bg-[#0085FF] group-hover:text-white transition">
              Get Started
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

              <button className="lg:mt-8 mt-3 md:mt-[50px] mb-8 md:mb-10 w-full rounded-xl border-2 text-base md:text-lg xl:text-2xl leading-tight md:leading-[36px] border-[#0085FF] xl:py-3 py-2 text-[#0085FF] font-semibold group-hover:bg-[#0085FF] group-hover:text-white transition">
                Start Free Trial
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
              Contact Sales
            </button>

            <ul className=" lg:mt-8 space-y-4 lg:space-y-[28px] text-base md:text-xl leading-relaxed md:leading-[30px] font-medium text-[#5F5F5F]">
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
    </div>
  );
};

export default SubsCription;
