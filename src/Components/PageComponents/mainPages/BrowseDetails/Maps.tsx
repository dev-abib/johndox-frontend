"use client";
import React, { useState } from "react";
import Container from "@/Components/Common/Container";
import Image from "next/image";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

interface MapsProps {
  item?: any; 
}

const Maps: React.FC<MapsProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!item?.location?.lat || !item?.location?.lng) {
    return null;
  }

  const position = {
    lat: item.location.lat,
    lng: item.location.lng,
  };

  return (
    <section className="lg:py-[150px] py-10">
      <Container>
        <h2 className="text-[24px] font-medium text-[#000000] mb-5">MAP</h2>

        <div className="relative w-full xl:h-[700px] h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
          >
            <Map
              style={{ width: "100%", height: "100%" }}
              defaultCenter={position}
              defaultZoom={15}
              gestureHandling="greedy"
              disableDefaultUI
            >
              <Marker
                position={position}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
              />

              {isHovered && (
                <InfoWindow
                  position={position}
                  pixelOffset={[0, -35]}
                  headerDisabled={true}
                >
                  <div className="p-1 bg-white rounded-lg pointer-events-none">
                    <div className="relative w-[130px] h-[90px] mb-1">
                      <Image
                        src={item.media?.[0]?.url || "/placeholder.jpg"}
                        alt={item.propertyName}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#0085FF] font-bold text-sm">
                        ${new Intl.NumberFormat().format(item.price)}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate w-[120px]">
                        {item.propertyName}
                      </p>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      </Container>
    </section>
  );
};

export default Maps;
