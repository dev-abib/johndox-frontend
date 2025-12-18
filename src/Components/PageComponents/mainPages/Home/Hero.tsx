"use client";
import { CiSearch } from "react-icons/ci";
import Container from "@/Components/Common/Container";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Location, Lookingfor } from "@/Components/Svg/SvgContainer";

type TabType = "buy" | "rent";

interface SearchFormData {
  lookingFor: string;
  location: string;
}

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("buy");
  const [formData, setFormData] = useState<SearchFormData>({
    lookingFor: "",
    location: "",
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const payload = {
      type: activeTab,
      lookingFor: formData.lookingFor,
      location: formData.location,
    };

    console.log("SEARCH DATA:", payload);
  };

  return (
    <section className="mainhero pt-8 pb-20 md:pt-16 md:pb-32 lg:pt-21 lg:pb-[280px] bg-cover bg-center">
      <Container>
        {/* Flex container: column on small screens, row on lg+ */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="max-w-full lg:max-w-[880px] text-center lg:text-left">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-[55px] font-bold leading-tight xl:leading-[84px]">
              Own a Piece of Honduras — From City Apartments to Seaside Land
            </h1>
            <p className="text-[#F9FAFB] font-medium  sm:text-base lg:text-[20px] pt-5 lg:pt-6 mx-auto lg:mx-0">
              Discover a modern way to explore, compare, and invest in verified
              properties across Honduras — from urban apartments to beachfront
              land, all in one trusted platform.
            </p>
          </div>

          {/* Search Card */}
          <div className="w-full lg:w-auto flex-shrink-0">
            <div className="bg-white rounded-2xl lg:rounded-[28px] p-6 sm:p-8 lg:p-7.5 shadow-2xl">
              <h3 className="text-[#212B36] font-medium text-lg sm:text-xl lg:text-[20px] mb-4 lg:mb-6 text-center lg:text-left">
                Find the Place That Fits You
              </h3>

              {/* Tabs */}
              <div className="bg-[#E6F3FF] p-1.5 rounded-3xl lg:rounded-[40px] flex gap-x-2 lg:gap-x-3 mb-6 lg:mb-7">
                <button
                  type="button"
                  onClick={() => setActiveTab("buy")}
                  className={`rounded-3xl lg:rounded-[40px] py-2.5 px-6 lg:py-1 lg:px-0 w-full text-center font-medium transition-all duration-200
                    ${
                      activeTab === "buy"
                        ? "bg-[#0085FF] text-white shadow-md"
                        : "bg-transparent text-[#212B36] hover:bg-blue-50"
                    }
                  `}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("rent")}
                  className={`rounded-3xl lg:rounded-[40px] py-2.5 px-6 lg:py-1 lg:px-0 w-full text-center font-medium transition-all duration-200
                    ${
                      activeTab === "rent"
                        ? "bg-[#0085FF] text-white shadow-md"
                        : "bg-transparent text-[#212B36] hover:bg-blue-50"
                    }
                  `}
                >
                  Rent
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Looking For */}
                <div className="relative mb-5 lg:mb-0">
                  <h4 className="text-[#454F5B] font-normal text-base lg:text-[18px] mb-2">
                    Looking For
                  </h4>
                  <select
                    name="lookingFor"
                    value={formData.lookingFor}
                    onChange={handleChange}
                    className="border border-[#DAE6E9] rounded-2xl lg:rounded-[18px] pl-12 pr-4 py-3.5 w-full appearance-none bg-white focus:outline-none focus:border-[#0085FF]"
                  >
                    <option value="">Select Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="land">Land</option>
                  </select>
                  <div className="absolute top-11 lg:top-12 left-4 pointer-events-none">
                    <Lookingfor />
                  </div>
                </div>

                {/* Location */}
                <div className="relative mt-5 lg:mt-2.5">
                  <h4 className="text-[#454F5B] font-normal text-base lg:text-[18px] mb-2">
                    Location
                  </h4>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border border-[#DAE6E9] rounded-2xl lg:rounded-[18px] pl-12 pr-4 py-3.5 w-full appearance-none bg-white focus:outline-none focus:border-[#0085FF]"
                  >
                    <option value="">Select a Location</option>
                    <option value="tegucigalpa">Tegucigalpa</option>
                    <option value="san-pedro-sula">San Pedro Sula</option>
                    <option value="roatan">Roatán</option>
                  </select>
                  <div className="absolute top-11 lg:top-12 left-4 pointer-events-none">
                    <Location />
                  </div>
                </div>

                {/* Search Button */}
                <div className="mt-6 lg:mt-8 relative group">
                  <button
                    type="submit"
                    className="bg-[#0085FF] rounded-2xl lg:rounded-[18px] px-8 xl:py-4 py-3 text-center text-white font-medium text-base w-full border border-[#0085FF] hover:bg-transparent hover:text-[#0085FF] transition-all duration-300 group"
                  >
                    Search Properties
                  </button>
                  <CiSearch className="absolute xl:top-4 top-3 left-8 text-white group-hover:text-[#0085FF] size-6 transition-colors duration-300" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
