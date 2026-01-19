"use client";

import Image from "next/image";
import { useState } from "react";
import Container from "@/Components/Common/Container";
import {
  Acceleration,
  Bathtub,
  Bed,
  Favourite,
  Favourites,
  Location,
} from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import { FeaturedSkeleton } from "@/Components/Skeleton/FeaturedSkeleton";

interface PropertyProps {
  data: any[];
}

const Featured = ({ data = [] }: PropertyProps) => {
  const [showAll, setShowAll] = useState(false);

  const displayedProperties = showAll ? data : data.slice(0, 6);

  const [favoriteStates, setFavoriteStates] = useState<{
    [key: string]: boolean;
  }>(
    Object.fromEntries(data.map(item => [item._id, item.isFavorite || false])),
  );

  const toggleFavorite = (id: string) => {
    setFavoriteStates(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!displayedProperties || displayedProperties.length === 0) {
    return <FeaturedSkeleton />;
  }

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
          {displayedProperties.map(item => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-[28px] overflow-hidden group hover:shadow-2xl transition-all duration-500 px-4.5 pt-4.5 pb-7.5"
            >
              <div className="relative overflow-hidden">
                <figure className="h-[260px] sm:h-[280px] lg:h-[300px] overflow-hidden">
                  <Image
                    src={item.media?.[0]?.url}
                    alt={item.propertyName}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
                  />
                </figure>

                <div
                  onClick={() => toggleFavorite(item._id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full cursor-pointer hover:bg-white transition-colors"
                >
                  {favoriteStates[item._id] ? <Favourites /> : <Favourite />}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-xl lg:text-2xl xl:text-[28px] font-bold text-[#0085FF]">
                  {new Intl.NumberFormat().format(item.price)}
                  <span className="text-lg lg:text-[18px] font-medium text-[#919191] pl-1">
                    USD
                  </span>
                </h3>

                <h4 className="text-base lg:text-lg xl:text-[24px] font-medium text-[#5F5F5F] mt-3 line-clamp-2">
                  {item.propertyName}
                </h4>

                <div className="flex items-center gap-2.5 mt-4">
                  <Location className="w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
                  <p className="text-base lg:text-lg xl:text-[18px] font-medium text-[#919191]">
                    {item.city}, {item.state}
                  </p>
                </div>

                <div className="flex flex-wrap gap-5 mt-5">
                  <div className="flex items-center gap-2.5">
                    <Bed className="shrink-0" />
                    <span className="text-sm lg:text-[14px] font-normal text-[#919191]">
                      {item.bedrooms} Bed
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Bathtub className="shrink-0" />
                    <span className="text-sm lg:text-[14px] font-normal text-[#919191]">
                      {item.bathrooms} Bath
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Acceleration className="shrink-0" />
                    <span className="text-sm lg:text-[14px] font-normal text-[#919191]">
                      {item.areaInSqMeter} sqft
                    </span>
                  </div>
                </div>

                <Link href={`/browse/${item._id}`}>
                  <button className="mt-8 w-full bg-[#0085FF] text-white font-medium text-base lg:text-lg py-3 xl:py-4 rounded-2xl hover:bg-transparent hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300 cursor-pointer">
                    Contact
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {!showAll && data.length > 6 && (
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
