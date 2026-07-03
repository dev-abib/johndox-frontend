"use client";
import Image from "next/image";
import React, { useState } from "react";
import Container from "@/Components/Common/Container";
import {
  APIProvider,
  Map,
  AdvancedMarker, // Replaced standard Marker with AdvancedMarker for custom Airbnb styling
  InfoWindow,
} from "@vis.gl/react-google-maps";

interface MapsProps {
  item?: any;
}

const Maps: React.FC<MapsProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Severe Guardrail: If lat/lng are completely missing, don't crash or render a map in West Africa/Mexico
  if (!item?.location?.lat || !item?.location?.lng) {
    return (
      <section className="py-6 lg:py-12 px-3 sm:px-0">
        <Container>
          <h2 className="text-lg sm:text-xl md:text-[22px] font-medium text-[#000000] mb-3 sm:mb-4">
            Property Location
          </h2>
          <div className="w-full xl:h-[450px] h-[250px] sm:h-[300px] bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-xs sm:text-sm text-gray-400 px-4 text-center">
            Coordinates not available for this property.
          </div>
        </Container>
      </section>
    );
  }

  const position = {
    lat: Number(item.location.lat),
    lng: Number(item.location.lng),
  };

  const imageUrl = item.media?.[0]?.url || "/placeholder.jpg";
  const propertyTitle = item.propertyName || "Property Image";
  const formattedPrice = `$${new Intl.NumberFormat().format(item.price || 0)}`;

  // FIX: Replaced the broken '0' typo string with the valid template string expression literal
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}`;

  return (
    <section className="py-6 lg:py-12 px-3 sm:px-0">
      <Container>
        <h2 className="text-lg sm:text-xl md:text-[22px] font-medium text-[#000000] mb-3 sm:mb-4">
          Property Location
        </h2>

        <div className="relative w-full xl:h-[450px] h-[250px] sm:h-[300px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            // FIX: Lock map engine to regional location native names instead of auto-translating to English
            language="local"
          >
            <Map
              // FIX: Forcing React re-renders upon routing between details updates map centers natively
              key={`${item?._id || "single-property"}-${position.lat}-${position.lng}`}
              style={{ width: "100%", height: "100%" }}
              defaultCenter={position}
              center={position}
              defaultZoom={15}
              gestureHandling="greedy"
              disableDefaultUI
              // FIX: Connects Map ID configuration for proper custom DOM pins rendering
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "DEMO_MAP_ID"}
            >
              {/* FIX: RESTORED AIRBNB STYLE PIN POPUP */}
              <AdvancedMarker
                position={position}
                onClick={() => setIsOpen(prev => !prev)}
              >
                <div className="bg-white text-black font-bold text-xs px-2.5 py-1.5 rounded-full shadow-md border border-gray-300 hover:scale-105 transition-transform cursor-pointer whitespace-nowrap" translate="no">
                  {formattedPrice}
                </div>
              </AdvancedMarker>

              {isOpen && (
                <InfoWindow
                  position={position}
                  pixelOffset={[0, -15]}
                  onCloseClick={() => setIsOpen(false)}
                >
                  <div className="p-1 bg-white rounded-lg max-w-[150px]">
                    <div
                      className="relative w-[130px] h-[90px] mb-2 cursor-zoom-in group overflow-hidden rounded-md"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <Image
                        src={imageUrl}
                        alt={propertyTitle}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[#0085FF] font-bold text-sm leading-tight" translate="no">
                        {formattedPrice}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate w-[120px]" translate="no">
                        {propertyTitle}
                      </p>

                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-center text-[10px] bg-[#0085FF] text-white font-medium py-1 px-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      </Container>

      {/* Lightbox Modal Expansion */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full aspect-video">
            <Image
              src={imageUrl}
              alt={propertyTitle}
              fill
              className="object-contain"
              unoptimized
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/40 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-black/60"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Maps;
