import React from "react";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import Container from "@/Components/Common/Container";

interface CategoryyProps {
  AllCategory?: any;
}

const Browser = ({ AllCategory }: CategoryyProps) => {
  return (
    <section className="xl:px-5 px-0">
      <Container>
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-3 sm:px-0">
          <h2 className="font-medium text-black text-2xl sm:text-3xl md:text-4xl lg:text-[38px]">
            {AllCategory?.sectionData?.title}
          </h2>
          <p className="font-normal text-black text-sm sm:text-base lg:text-[18px] mt-3 sm:mt-4 max-w-3xl mx-auto px-2 sm:px-0">
            {AllCategory?.sectionData?.subTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 xl:gap-11">
          {AllCategory?.categories?.map((item: any) => (
            <div
              key={item?._id}
              className="bg-white shadow-xl rounded-xl sm:rounded-[18px] overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer px-3 sm:px-4 md:px-4.5 pt-3 sm:pt-4 md:pt-4.5 pb-5 sm:pb-6 md:pb-7"
            >
              <figure className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] overflow-hidden">
                <Image
                  src={item?.bgImg}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
                />
              </figure>

              <div className="mt-4 sm:mt-5 md:mt-7.5">
                <div className="flex mb-3 sm:mb-4">
                  <figure className="relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 overflow-hidden">
                    <Image
                      src={item?.iconImg}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
                    />
                  </figure>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#212B36]">
                  {item.name}
                </h3>

                <p className="text-[#637381] text-xs sm:text-sm lg:text-base mt-1 sm:mt-0">
                  {item.title}
                </p>

                <div className="flex items-center justify-between gap-2 mt-3 sm:mt-4 text-[#0085FF] font-medium">
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl">
                    {item?.propertyCount} Listings
                  </span>
                  <BsArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Browser;
