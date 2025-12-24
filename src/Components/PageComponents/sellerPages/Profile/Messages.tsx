import React from "react";
import { CiUser } from "react-icons/ci";

const Messages = () => {
  return (
    <>
      <div className="bg-[#F9FAFB] py-8 px-3 lg:py-15 lg:px-10 rounded-[24px]">
        <h2 className="text-[#404040] lg:text-[28px] text-[24px] font-medium">
          Messages
        </h2>
        <h5 className="lg:text-[18px] text-base text-[#5F5F5F] font-normal mt-3">
          Stay connected with interested buyers in real time
        </h5>

        <div className="bg-white py-4 px-4 lg:py-10 lg:px-6 rounded-2xl mt-7 flex flex-col gap-6">
          {/* Repeated Message Item – Made responsive */}
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="rounded-[18px] border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] p-5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
            >
              <div className="flex-1">
                <h3 className="text-[#404040] font-medium lg:text-[20px] text-lg">
                  Oceanview Villa in Riviera Maya
                </h3>

                <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1 py-1 mt-1">
                  <h5 className="flex gap-x-1 items-center text-[#404040] font-medium text-[16px]">
                    <CiUser className="text-lg" />
                    Maria Rodriguez
                  </h5>
                  <h6 className="text-[#404040] font-normal text-[16px]">
                    10/26/2025
                  </h6>
                </div>

                <p className="text-[#404040] font-normal text-[16px] mt-3">
                  Thank you for your interest! I'd be happy to arrange a
                  viewing...
                </p>
              </div>

              <button className="self-start sm:self-center bg-[#0085FF] px-4 py-1.5 rounded-[12px] text-white font-medium cursor-pointer capitalize hover:bg-[#0070db] transition">
                new
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Messages;
