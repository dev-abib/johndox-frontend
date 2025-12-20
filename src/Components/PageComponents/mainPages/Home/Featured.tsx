"use client";

import Image from "next/image";
import { useState } from "react";
import Container from "@/Components/Common/Container";
import { Featuredata } from "@/Components/Data/data";
import {
  Acceleration,
  Bathtub,
  Bed,
  Favourite,
  Location,
} from "@/Components/Svg/SvgContainer";

const Featured = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProperties = showAll ? Featuredata : Featuredata.slice(0, 6);

  return (
    <section className="py-16 md:py-24 xl:py-[150px]">
      <Container>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-medium text-black text-3xl sm:text-4xl lg:text-[38px]">
            Featured Properties
          </h2>
          <p className="font-normal text-black text-base sm:text-lg lg:text-[18px] mt-4 max-w-3xl mx-auto">
            Explore top-tier homes and land carefully curated for quality and
            value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-11">
          {displayedProperties.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-[28px] overflow-hidden group hover:shadow-2xl transition-all duration-500 px-4.5 pt-4.5 pb-7.5"
            >
              <div className="relative overflow-hidden">
                <figure className="h-[260px] sm:h-[280px] lg:h-[300px] overflow-hidden">
                  <Image
                    src={item.Image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
                  />
                </figure>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full cursor-pointer hover:bg-white transition-colors">
                  <Favourite />
                </div>
              </div>

              <div className="mt-5">
                <h3 className=" text-xl lg:text-2xl xl:text-[28px] font-bold text-[#0085FF]">
                  {item.price.replace(" USD", "")}
                  <span className="text-lg lg:text-[18px] font-medium text-[#919191] pl-1">
                    USD
                  </span>
                </h3>

                <h4 className="text-base lg:text-lg xl:text-[24px] font-medium text-[#5F5F5F] mt-3 line-clamp-2">
                  {item.title}
                </h4>

                <div className="flex items-center gap-2.5 mt-4">
                  <Location
                    className={"w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]  "}
                  />
                  <p className="text-base lg:text-lg xl:text-[18px] font-medium text-[#919191]">
                    {item.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-5 mt-5">
                  {item.details.split(" • ").map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      {i === 0 && <Bed className="shrink-0" />}
                      {i === 1 && <Bathtub className="shrink-0" />}
                      {i === 2 && <Acceleration className="shrink-0" />}

                      <span className="text-sm lg:text-[14px] whitespace-nowrap inline-block font-normal text-[#919191]">
                        {feature.trim()}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="mt-8 w-full bg-[#0085FF] text-white font-medium text-base lg:text-lg py-3 xl:py-4 rounded-2xl hover:bg-transparent hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300 cursor-pointer">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {!showAll && Featuredata.length > 6 && (
          <div className="text-center mt-12 lg:mt-16">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-3 bg-[#0085FF] text-white font-medium text-lg px-10 xl:py-4 py-3 rounded-2xl transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:bg-transparent hover:text-black border border-blue-600"
            >
              View All Properties
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Featured;
