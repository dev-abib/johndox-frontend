"use client";
import React, { useState } from "react";
import Container from "@/Components/Common/Container";

interface BrowswProps {
  data: any;
}

const BrowseDescription: React.FC<BrowswProps> = ({ data }) => {
  const [showMoreImages, setShowMoreImages] = useState<boolean>(false);
  // State for managing the currently expanded lightbox image
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const apiImages =
    data?.media
      ?.filter((m: any) => m.fileType === "image")
      .map((m: any) => m.url) || [];

  const allImages = [...apiImages];
  const visibleImages = allImages.slice(0, 4);
  const hiddenImages = allImages.slice(4);

  return (
    <section className="xxl:pt-0 lg:pt-10 pt-5 pb-10">
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {visibleImages.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 cursor-pointer"
                  onClick={() => setLightboxImage(url)}
                >
                  <img
                    src={url}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {index === 3 &&
                    hiddenImages.length > 0 &&
                    !showMoreImages && (
                      <div
                        onClick={e => {
                          e.stopPropagation(); // Prevents opening the lightbox immediately when clicking the "+" overlay
                          setShowMoreImages(true);
                        }}
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
                    className="aspect-square rounded-lg overflow-hidden bg-gray-200 cursor-pointer"
                    onClick={() => setLightboxImage(url)}
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

          <div className="space-y-8 lg:mt-0 mt-4">
            <div>
              <h2 className="text-[24px] font-medium text-[#000000] mb-4 uppercase">
                Description
              </h2>
              <p className="lg:text-[18px] text-base text-[#404040] font-normal leading-relaxed">
                {data?.description ||
                  "No description available for this property."}
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-medium text-[#000000] uppercase mb-4">
                Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="font-normal text-[12px] text-[#919EAB] mb-1">
                    Full Address
                  </p>
                  <p className="font-normal text-[14px] text-[#404040]">
                    {data?.fullAddress}
                  </p>
                </div>
                <div>
                  <p className="font-normal text-[12px] text-[#919EAB] mb-1 underline">
                    City
                  </p>
                  <p className="font-normal text-[14px] text-[#404040]">
                    {data?.city}
                  </p>
                </div>
                <div>
                  <p className="font-normal text-[12px] text-[#919EAB] mb-1 underline">
                    State
                  </p>
                  <p className="font-normal text-[14px] text-[#404040]">
                    {data?.state}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[24px] font-medium text-[#000000] uppercase mb-4">
                DETAILS
              </h2>
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] mb-1 underline">
                      Property Id
                    </p>
                    <p className="font-normal text-[14px] text-[#404040] truncate">
                      {data?._id?.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-1">
                      Price
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      $ {new Intl.NumberFormat().format(data?.price)}
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-1">
                      Land Area
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      {data?.areaInMeter} m²
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-1">
                      Bedrooms
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      {data?.bedrooms} Rooms
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-1">
                      Bathrooms
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      {data?.bathrooms} Baths
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 border-t pt-6">
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] mb-1 underline">
                      Listing Type
                    </p>
                    <p className="font-normal text-[14px] text-[#404040] capitalize">
                      {data?.listingType}
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-1">
                      Structure
                    </p>
                    <p className="font-normal text-[14px] text-[#404040] capitalize">
                      {data?.propertyType}
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-1">
                      Year Built
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      {data?.yearBuilt}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-normal text-[12px] text-[#919EAB] underline mb-1">
                      Amenities
                    </p>
                    <p className="font-normal text-[14px] text-[#404040]">
                      {data?.amenities?.join(" • ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Lightbox Modal UI Element */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-gray-300 transition-colors cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            ✕
          </button>
          <div
            className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Expanded property view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default BrowseDescription;
