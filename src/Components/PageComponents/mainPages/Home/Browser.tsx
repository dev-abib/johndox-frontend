import React from "react";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import Container from "@/Components/Common/Container";
import { PropertyCategories } from "@/Components/Data/data";

const Browser = () => {
  return (
    <section className="">
      <Container>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-medium text-black text-3xl sm:text-4xl lg:text-[38px]">
            Browse by Category
          </h2>
          <p className="font-normal text-black text-base sm:text-lg lg:text-[18px] mt-4 max-w-3xl mx-auto">
            Explore properties that match your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-11">
          {PropertyCategories.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-[18px] overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer px-4.5 pt-4.5 pb-7"
            >
              <figure className="relative h-[260px] sm:h-[280px] lg:h-[300px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
                />
              </figure>

              <div className="mt-7.5">
                <div className="flex mb-4">
                  <item.icon_name className="w-10 h-10 lg:w-12 lg:h-12 text-[#0085FF]" />
                </div>

                <h3 className="text-xl lg:text-2xl font-medium text-[#212B36]">
                  {item.title}
                </h3>

                <p className=" text-[#637381] text-sm lg:text-base">
                  {item.subtitle}
                </p>

                <div className="flex items-center justify-between gap-2 mt-4 text-[#0085FF] font-medium">
                  <span className="text-lg lg:text-xl">
                    {item.listings.toLocaleString()} Listings
                  </span>
                  <BsArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
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
