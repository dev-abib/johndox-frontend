import React from "react";
import { CiUser } from "react-icons/ci";

const Messages = () => {
  return (
    <>
      <div className="bg-[#F9FAFB] py-15 px-10 rounded-[24px]">
        <h2 className="text-[#404040] text-[28px] font-medium">Messages</h2>
        <h5 className="text-[18px] text-[#5F5F5F] font-normal mt-3">
          tay connected with interested buyers in real time
        </h5>
        <div className="bg-white py-10 px-6 rounded-2xl mt-7 flex flex-col gap-6">
          <div className="rounded-[18px] border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] p-5 flex justify-between items-start">
            <div className="">
              <h3 className="text-[#404040] font-medium text-[20px]">
                Oceanview Villa in Riviera Maya
              </h3>
              <div className="flex gap-x-4 py-1">
                <h5 className="flex gap-x-1 items-center text-[#404040] font-medium text-[16px]">
                  <CiUser />
                  Maria Rodriguez
                </h5>
                <h6 className="text-[#404040] font-normal text-[16px]">
                  10/26/2025
                </h6>
              </div>
              <p className="text-[#404040] font-normal text-[16px]">
                Thank you for your interest! I'd be happy to arrange a
                viewing...
              </p>
            </div>
            <button className="bg-[#0085FF] px-2.5 py-1 rounded-[12px] text-white font-medium cursor-pointer capitalize">
              new
            </button>
          </div>
          <div className="rounded-[18px] border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] p-5 flex justify-between items-start">
            <div className="">
              <h3 className="text-[#404040] font-medium text-[20px]">
                Oceanview Villa in Riviera Maya
              </h3>
              <div className="flex gap-x-4 py-1">
                <h5 className="flex gap-x-1 items-center text-[#404040] font-medium text-[16px]">
                  <CiUser />
                  Maria Rodriguez
                </h5>
                <h6 className="text-[#404040] font-normal text-[16px]">
                  10/26/2025
                </h6>
              </div>
              <p className="text-[#404040] font-normal text-[16px]">
                Thank you for your interest! I'd be happy to arrange a
                viewing...
              </p>
            </div>
            <button className="bg-[#0085FF] px-2.5 py-1 rounded-[12px] text-white font-medium cursor-pointer capitalize">
              new
            </button>
          </div>
          <div className="rounded-[18px] border border-[#E6F3FF] bg-[rgba(230,243,255,0.6)] p-5 flex justify-between items-start">
            <div className="">
              <h3 className="text-[#404040] font-medium text-[20px]">
                Oceanview Villa in Riviera Maya
              </h3>
              <div className="flex gap-x-4 py-1">
                <h5 className="flex gap-x-1 items-center text-[#404040] font-medium text-[16px]">
                  <CiUser />
                  Maria Rodriguez
                </h5>
                <h6 className="text-[#404040] font-normal text-[16px]">
                  10/26/2025
                </h6>
              </div>
              <p className="text-[#404040] font-normal text-[16px]">
                Thank you for your interest! I'd be happy to arrange a
                viewing...
              </p>
            </div>
            <button className="bg-[#0085FF] px-2.5 py-1 rounded-[12px] text-white font-medium cursor-pointer capitalize">
              new
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
