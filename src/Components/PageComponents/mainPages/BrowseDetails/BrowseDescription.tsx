"use client";

import Container from "@/Components/Common/Container";
import React, { useState } from "react";

const BrowseDescription: React.FC = () => {
  const [showMoreImages, setShowMoreImages] = useState<boolean>(false);

  const imageUrls: string[] = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  const visibleImages = imageUrls.slice(0, 4);
  const hiddenImages = imageUrls.slice(4);

  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* Top 4 images */}
            <div className="grid grid-cols-2 gap-4">
              {visibleImages.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-200"
                >
                  <img
                    src={url}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* 4+ overlay */}
                  {index === 3 &&
                    hiddenImages.length > 0 &&
                    !showMoreImages && (
                      <div
                        onClick={() => setShowMoreImages(true)}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                      >
                        <span className="text-white text-4xl font-bold">
                          {hiddenImages.length}+
                        </span>
                      </div>
                    )}
                </div>
              ))}
            </div>

            {showMoreImages && (
              <div className="grid grid-cols-2 gap-4">
                {hiddenImages.map((url, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-200"
                  >
                    <img
                      src={url}
                      alt={`Hidden image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8 mt-8">
            <div>
              <h2 className="text-[24px] font-medium text-[#000000] mb-4 uppercase">
                Description
              </h2>
              <p className="text-[18px] text-[#404040] font-normal leading-relaxed">
                Nestled in a charming suburban area, this stunning home rests on
                a spacious lot, offering picturesque views of the nearby rolling
                hills. Located in the tranquil heart of Pleasantville, it
                features contemporary design elements that make it truly
                exceptional. With expansive frontage on a peaceful cul-de-sac
                and all essential utilities in place, this is the ideal setting
                for your dream family home.
                <br />
                <br /> If serene living is what you're after, this property is a
                must-see! Located within the 200-acre Green Valley community,
                managed by Heritage Developments, this area is renowned as the
                most family-friendly and well-planned suburb in Ohio. Green
                Valley's standout features include its meticulous landscaping
                and thoughtfully designed layout, evident throughout the entire
                community.
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-medium text-[#000000] uppercase mb-4">
                Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div>
                  <p className="font-normal text-[12px] text-[#919EAB] mb-4">
                    State
                  </p>
                  <p className="font-normal text-[14px] text-[#404040]">
                    Hope Bvd, no 45
                  </p>
                </div>
                <div>
                  <p className="font-normal text-[12px] text-[#919EAB] underline mb-4">
                    City
                  </p>
                  <p className="font-normal text-[14px] text-[#404040]">
                    Comayagua
                  </p>
                </div>
                <div>
                  <p className="font-normal text-[12px] text-[#919EAB] underline mb-4">
                    Country
                  </p>
                  <p className="font-normal text-[14px] text-[#404040]">
                    Bangladesh
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-[24px] font-medium text-[#000000] uppercase mb-4">
                DETAILS
              </h2>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] mb-4 underline">
                      Property Id
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      31746
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-4">
                      Price Info
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      $ 2,450 / M
                    </p>
                  </div>

                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-4 shrink-0 text-nowrap">
                      Property Lot Size
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      Size 1,000 M
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-4">
                      Bedrooms
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      1 Room
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-4">
                      Garages
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      3 cars
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] mb-4 underline">
                      Area/Landmark
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      Greenville
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-4">
                      State
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      Honduras
                    </p>
                  </div>

                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-4 shrink-0 text-nowrap">
                      Country
                    </p>
                    <p className="font-normal text-[14px] text-[#404040] text-nowrap">
                      Central America
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-4">
                      Price
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      $ 950,000
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-4">
                      Property Size
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      560 M
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-4">
                      Structure Type
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      Apartment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrowseDescription;
