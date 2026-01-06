"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {  Location, Bed, Bathtub, Acceleration, Favourites } from "@/Components/Svg/SvgContainer";

const favoritesData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1000",
    price: "$240,000",
    title: "Residential Land in Yocón",
    location: "LA MIEL, Honduras",
    beds: "3 Beds",
    baths: "2 Baths",
    size: "3,200 M",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000",
    price: "$320,000",
    title: "Downtown Office Space",
    location: "LA MIEL, Honduras",
    beds: "3 Beds",
    baths: "2 Baths",
    size: "3,200 M",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1000",
    price: "$620,000",
    title: "Modern House in LA MIEL",
    location: "LA MIEL, Honduras",
    beds: "3 Beds",
    baths: "2 Baths",
    size: "3,200 M",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000",
    price: "$720,000",
    title: "Investment Land in Caldas",
    location: "LA MIEL, Honduras",
    beds: "3 Beds",
    baths: "2 Baths",
    size: "3,200 M",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000",
    price: "$620,000",
    title: "Commercial Space in Caldas",
    location: "LA MIEL, Honduras",
    beds: "3 Beds",
    baths: "2 Baths",
    size: "3,200 M",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1000",
    price: "$120,000",
    title: "Modern House in LA MIEL",
    location: "LA MIEL, Honduras",
    beds: "3 Beds",
    baths: "2 Baths",
    size: "3,200 M",
  },
];

const MyFavorites = () => {
  const [favorites, setFavorites] = useState(favoritesData);
  const removeFavorite = (id: any) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 bg-[#F9FAFB] rounded-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#212B36]">
            My Favorites
          </h2>
          <p className="text-sm text-[#919191] mt-1">
            {favorites.length} saved properties
          </p>
        </div>

        <Link
          href="/browse"
          className="bg-primary-blue text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition text-center cursor-pointer"
        >
          Find More Properties
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {favorites.map(item => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-[22px] overflow-hidden border border-[#F1F1F1] hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative p-3">
              <figure className="h-[300px] overflow-hidden rounded-[16px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* Heart */}
              <button
                onClick={() => removeFavorite(item.id)}
                className="absolute top-6 right-6 bg-white/90 text-red-600 backdrop-blur-sm p-2 rounded-full hover:bg-white transition cursor-pointer"
              >
                <Favourites  />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 pb-5">
              {/* Price */}
              <h3 className="text-lg font-bold text-primary-blue">
                {item.price}{" "}
                <span className="text-xs font-medium text-[#919191]">USD</span>
              </h3>

              {/* Title */}
              <p className="text-[15px] font-medium text-[#5F5F5F] mt-2">
                {item.title}
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 mt-3">
                <Location className="w-[14px] h-[14px]" />
                <p className="text-xs text-[#919191]">{item.location}</p>
              </div>

              {/* Features */}
              <div className="flex items-center gap-4 mt-4 text-xs text-[#919191]">
                <div className="flex items-center gap-1">
                  <Bed />
                  <span>{item.beds}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Bathtub />
                  <span>{item.baths}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Acceleration />
                  <span>{item.size}</span>
                </div>
              </div>

              {/* Button */}
              <button className="mt-5 w-full bg-primary-blue text-white py-3 rounded-lg text-sm font-medium hover:bg-transparent hover:text-primary-blue border border-primary-blue transition-all duration-300 cursor-pointer">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
