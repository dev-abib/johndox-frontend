"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Location,
  Bed,
  Bathtub,
  Acceleration,
  Favourites,
} from "@/Components/Svg/SvgContainer";
import { GetAllFavourite } from "@/Hooks/api/dashboard_api";
import { AddFavourite } from "@/Hooks/api/post_api"; // Assuming this handles removal too

const MyFavorites = () => {
  // 1. Get and Clean Token safely
  const rawToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token =
    rawToken && rawToken.startsWith('"') ? JSON.parse(rawToken) : rawToken;

  // 2. Fetch Data from API
  const { data: apiResponse, isLoading } = GetAllFavourite(token);
  const { mutate: toggleFav } = AddFavourite();

  // 3. Sync local state with API data for immediate UI removal
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    if (apiResponse?.data) {
      setFavorites(apiResponse.data);
    }
  }, [apiResponse]);

  const removeFavorite = (id: string) => {
    // Optimistic UI update
    setFavorites(prev => prev.filter(item => item._id !== id));

    // API Call to remove
    toggleFav({
      endpoint: `/toggle-favourite-listing/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  if (isLoading)
    return <div className="p-10 text-center">Loading Favorites...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 bg-[#F9FAFB] rounded-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#212B36]">
            My Favorites
          </h2>
          <p className="text-sm text-[#919191] mt-1">
            {favorites?.length || 0} saved properties
          </p>
        </div>

        <Link
          href="/buyerlayout/browse"
          className="bg-primary-blue text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition text-center cursor-pointer"
        >
          Find More Properties
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {favorites?.map((item: any) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-[22px] overflow-hidden border border-[#F1F1F1] hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative p-3">
              <figure className="h-[300px] overflow-hidden rounded-[16px]">
                <Image
                  src={item.media?.[0]?.url || "/placeholder.jpg"}
                  alt={item.propertyName}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* Heart Button (Remove) */}
              <button
                onClick={() => removeFavorite(item._id)}
                className="absolute top-6 right-6 bg-white/90 text-red-600 backdrop-blur-sm p-2 rounded-full hover:bg-white transition cursor-pointer"
              >
                <Favourites />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 pb-5">
              {/* Price */}
              <h3 className="text-lg font-bold text-primary-blue">
                {new Intl.NumberFormat().format(item.price)}{" "}
                <span className="text-xs font-medium text-[#919191]">USD</span>
              </h3>

              {/* Title */}
              <p className="text-[15px] font-medium text-[#5F5F5F] mt-2 line-clamp-1">
                {item.propertyName}
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 mt-3">
                <Location className="w-[14px] h-[14px]" />
                <p className="text-xs text-[#919191]">
                  {item.city}, {item.state}
                </p>
              </div>

              {/* Features */}
              <div className="flex items-center gap-4 mt-4 text-xs text-[#919191]">
                <div className="flex items-center gap-1">
                  <Bed />
                  <span>{item.bedrooms} Bed</span>
                </div>

                <div className="flex items-center gap-1">
                  <Bathtub />
                  <span>{item.bathrooms} Bath</span>
                </div>

                <div className="flex items-center gap-1">
                  <Acceleration />
                  <span>{item.areaInSqMeter} sqft</span>
                </div>
              </div>

              {/* Button */}
              <Link href={`/buyerlayout/browse/${item._id}`}>
                <button className="mt-5 w-full bg-primary-blue text-white py-3 rounded-lg text-sm font-medium hover:bg-transparent hover:text-primary-blue border border-primary-blue transition-all duration-300 cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          You haven't saved any properties yet.
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
