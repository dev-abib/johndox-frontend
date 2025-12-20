"use client";

import { Featuredata } from "@/Components/Data/data";
import {
  Acceleration,
  Bathtub,
  Bed,
  Favourite,
  Location,
} from "@/Components/Svg/SvgContainer";
import Image from "next/image";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import {
  AngleBottomSvg,
  SideBarCloseSvg,
  SideBarSvg,
} from "@/Components/Svg/SvgContainer2";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";

const page = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProperties = showAll ? Featuredata : Featuredata.slice(0, 4);
  const options = [
    "Newest First",
    "Price: Low to High",
    "Price: High to Low",
    "Most Popular",
  ];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Newest First");

  const [openn, setOpenn] = useState({
    propertyType: true,
    priceRange: true,
    location: true,
    feature: true,
  });
  const [showSidebar, setShowSidebar] = useState(false);

  const toggle = (key: keyof typeof openn) => {
    setOpenn(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [propertyType, setPropertyType] = useState("All");
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  return (
    <>
      <div className="px-6 mb-[150px]">
        <div className="">
          <div className="flex justify-between items-end  mb-4 lg:mb-6">
            <div className="">
              <h2 className="font-semibold text-[#212B36] text-[28px] ">
                Browse Properties
              </h2>
              <p className="font-normal text-[#212B36] text-base ">
                Find your perfect property
              </p>
            </div>
            <div className="-ml-[200px]">
              <h2 className="font-semibold text-[#212B36] text-xl ">
                Real Estate & Homes For Rent
              </h2>
              <p className="font-normal text-[#212B36] text-base">
                ( Showing 24 properties )
              </p>
            </div>
            <div className="">
              <div className="relative inline-block w-[200px]">
                {/* Trigger */}
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-[#E7E7E7] bg-[#F3F3F4] px-2 py-3 shadow-sm hover:bg-gray-50 transition"
                >
                  <span>{selected}</span>
                  <span
                    className={`transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    <AngleBottomSvg />
                  </span>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute left-0 mt-2 w-full rounded-lg border bg-white shadow-lg transition-all duration-200 z-50 ${
                    open
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  {options.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-2 py-3 hover:bg-gray-100 transition"
                    >
                      <span>{option}</span>
                      {selected === option && (
                        <FaCheck className="text-primary-blue text-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex-grow w-[40%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58420.16573309009!2d90.36343509144125!3d23.77374133110238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c769ad5e7f6f%3A0x1d928a50d9cbcc90!2sSKS%20Shopping%20Mall!5e0!3m2!1sen!2sbd!4v1766118436976!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            />
          </div>
          <div className="flex-grow w-[60%]">
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 xl:gap-11">
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
                        className={
                          "w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]  "
                        }
                      />
                      <p className="text-base lg:text-lg xl:text-[18px] font-medium text-[#919191]">
                        {item.location}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-5 mt-5">
                      {item.details.split(" • ").map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          {i === 0 && <Bed />}
                          {i === 1 && <Bathtub />}
                          {i === 2 && <Acceleration />}
                          <span className="text-sm lg:text-[14px] font-normal text-[#919191] whitespace-nowrap inline-block">
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
          </div>
          <div
            className={`flex-grow transition-all duration-300 overflow-hidden ${
              showSidebar ? "max-w-[320px] opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            <div className="max-w-[320px] rounded-2xl border border-[#E7E7E7] shadow-[0_0_8px_0_rgba(145,158,171,0.24)] bg-white p-6 ">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <span
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-400 cursor-pointer"
                >
                  <SideBarCloseSvg />
                </span>
              </div>

              {/* PROPERTY TYPE */}
              <div className="mb-6">
                <div
                  onClick={() => toggle("propertyType")}
                  className="flex items-center justify-between mb-3 cursor-pointer"
                >
                  <h3 className="font-medium">Property Type</h3>
                  <span className="text-xl">
                    {openn.propertyType ? "–" : "+"}
                  </span>
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openn.propertyType
                      ? "max-h-[300px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {["All", "House", "Land", "Commercial"].map(type => (
                    <label
                      key={type}
                      className="flex items-center gap-3 mb-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        checked={propertyType === type}
                        onChange={() => setPropertyType(type)}
                        className="h-4 w-4 accent-primary-blue"
                      />
                      <span className="text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PRICE RANGE */}
              <div className="mb-6">
                <div
                  onClick={() => toggle("priceRange")}
                  className="flex items-center justify-between mb-3 cursor-pointer"
                >
                  <h3 className="font-medium">Price Range</h3>
                  <span className="text-xl">
                    {openn.priceRange ? "–" : "+"}
                  </span>
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openn.priceRange
                      ? "max-h-[200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      placeholder="$10k"
                      className="w-full rounded-lg border border-[#C4CDD5] px-3 py-2 text-sm"
                    />
                    <span className="text-sm text-gray-500">To</span>
                    <input
                      placeholder="$500k"
                      className="w-full rounded-lg border  border-[#C4CDD5] px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="mb-6">
                <div
                  onClick={() => toggle("location")}
                  className="flex items-center justify-between mb-3 cursor-pointer"
                >
                  <h3 className="font-medium">Location</h3>
                  <span className="text-xl">{openn.location ? "–" : "+"}</span>
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openn.location
                      ? "max-h-[120px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <input
                    placeholder="City or State"
                    className="w-full rounded-lg border border-[#C4CDD5] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* FEATURE */}
              <div className="mb-6">
                <div
                  onClick={() => toggle("feature")}
                  className="flex items-center justify-between mb-3 cursor-pointer"
                >
                  <h3 className="font-medium">Feature</h3>
                  <span className="text-xl">{openn.feature ? "–" : "+"}</span>
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openn.feature
                      ? "max-h-[300px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-gray-600 mb-2">Bedrooms</p>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => setBedrooms(num)}
                        className={`h-9 w-9 rounded-lg border border-[#C4CDD5] text-sm ${
                          bedrooms === num
                            ? "bg-primary-blue text-white border-[#C4CDD5]"
                            : "hover:bg-gray-100 border-[#C4CDD5]"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 mb-2">Bathrooms</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => setBathrooms(num)}
                        className={`h-9 w-9 rounded-lg border text-sm ${
                          bathrooms === num
                            ? "bg-primary-blue text-white border-[#C4CDD5]"
                            : "hover:bg-gray-100 border-[#C4CDD5]"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SEARCH */}
              <button className="w-full rounded-xl bg-primary-blue py-3 text-white text-sm font-medium hover:opacity-90 transition">
                Search
              </button>
            </div>
          </div>
          {!showSidebar && (
            <div
              onClick={() => setShowSidebar(true)}
              className="cursor-pointer"
            >
              <SideBarSvg />
            </div>
          )}
        </div>
      </div>
      <ListPropertyCTA />
    </>
  );
};

export default page;
