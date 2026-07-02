"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { setItem, getItem } from "@/lib/localStorage";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

const STORAGE_KEY = "draft_location";

export interface AddressInfo {
  fullAddress: string;
  city: string;
  state: string;
}

interface LocationPickerProps {
  latitude?: number;
  longitude?: number;
  onLocationChange: (lat: number, lng: number) => void;
  onAddressFound?: (address: AddressInfo) => void;
}

// Default center (Honduras)
const DEFAULT_CENTER = { lat: 15.199999, lng: -86.241905 };
const DEFAULT_ZOOM = 7;

// Sets the map to a specific position on initial mount (from localStorage/props)
function MapInitializer({
  initialPosition,
}: {
  initialPosition: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  const hasSet = useRef(false);

  useEffect(() => {
    if (!map || !initialPosition || hasSet.current) return;
    map.setCenter(initialPosition);
    map.setZoom(15);
    hasSet.current = true;
  }, [map, initialPosition]);

  return null;
}

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        onMapClick(lat, lng);
        // Programmatically center and zoom — doesn't block user zoom
        map.setCenter({ lat, lng });
        map.setZoom(15);
      }
    });
    return () => google.maps.event.removeListener(listener);
  }, [map, onMapClick]);

  return null;
}

// Extract city, state, and full address from Google address components
function extractAddress(
  components: google.maps.GeocoderAddressComponent[],
  formattedAddress: string
): AddressInfo {
  let city = "";
  let state = "";

  for (const component of components) {
    const types = component.types;
    if (types.includes("locality") || types.includes("postal_town")) {
      city = component.long_name;
    } else if (types.includes("administrative_area_level_1")) {
      state = component.long_name;
    } else if (city === "" && types.includes("administrative_area_level_2")) {
      city = component.long_name;
    }
  }

  return {
    fullAddress: formattedAddress,
    city,
    state,
  };
}

function SearchBox({
  onPlaceSelected,
  onAddressFromPlace,
}: {
  onPlaceSelected: (lat: number, lng: number) => void;
  onAddressFromPlace: (address: AddressInfo) => void;
}) {
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  useEffect(() => {
    if (!placesLib || !map) return;

    const input = document.getElementById(
      "location-search-input"
    ) as HTMLInputElement;
    if (!input) return;

    const sb = new placesLib.SearchBox(input);

    sb.addListener("places_changed", () => {
      const places = sb.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          onPlaceSelected(lat, lng);
          map.setCenter({ lat, lng });
          map.setZoom(15);

          // Extract address from Place result directly
          if (place.address_components) {
            const address = extractAddress(
              place.address_components as google.maps.GeocoderAddressComponent[],
              place.formatted_address || ""
            );
            onAddressFromPlace(address);
          }
        }
      }
    });

    return () => {
      google.maps.event.clearInstanceListeners(sb);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placesLib, map, onPlaceSelected, onAddressFromPlace]);

  return null;
}

export default function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
  onAddressFound,
}: LocationPickerProps) {
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(
    latitude !== undefined && longitude !== undefined
      ? { lat: latitude, lng: longitude }
      : null
  );
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // On mount, restore from localStorage if no props provided
  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      setPosition({ lat: latitude, lng: longitude });
    } else {
      const saved = getItem(STORAGE_KEY);
      if (saved) {
        try {
          const { lat, lng } = JSON.parse(saved);
          if (lat !== undefined && lng !== undefined) {
            setPosition({ lat, lng });
            onLocationChange(lat, lng);
          }
        } catch {
          // ignore corrupted data
        }
      }
    }
  }, []);

  // Reverse geocode to get address from lat/lng (for map clicks and Places results)
  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      if (!onAddressFound) return;

      // Initialize geocoder once
      if (!geocoderRef.current && typeof google !== "undefined") {
        geocoderRef.current = new google.maps.Geocoder();
      }

      if (geocoderRef.current) {
        geocoderRef.current.geocode(
          { location: { lat, lng } },
          (results, status) => {
            if (status === "OK" && results && results[0]) {
              const address = extractAddress(
                results[0].address_components,
                results[0].formatted_address
              );
              onAddressFound(address);
            }
          }
        );
      }
    },
    [onAddressFound]
  );

  const saveToStorage = useCallback((lat: number, lng: number) => {
    setItem(STORAGE_KEY, JSON.stringify({ lat, lng }));
  }, []);

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      setPosition({ lat, lng });
      onLocationChange(lat, lng);
      saveToStorage(lat, lng);
      reverseGeocode(lat, lng);
    },
    [onLocationChange, saveToStorage, reverseGeocode]
  );

  const handlePlaceSelected = useCallback(
    (lat: number, lng: number) => {
      setPosition({ lat, lng });
      onLocationChange(lat, lng);
      saveToStorage(lat, lng);
      // Places search already provides address via onAddressFromPlace
    },
    [onLocationChange, saveToStorage]
  );

  const handleAddressFromPlace = useCallback(
    (address: AddressInfo) => {
      if (onAddressFound) {
        onAddressFound(address);
      }
    },
    [onAddressFound]
  );

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium mb-1">
        Property Location on Map <span className="text-red-500">*</span>
      </label>
      <p className="text-xs text-gray-500 mb-2">
        Click on the map or search for a location to place a pin
      </p>

      {/* Search Input */}
      <input
        id="location-search-input"
        type="text"
        placeholder="Search for a location..."
        className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
      />

      {/* Google Map */}
      <div className="w-full h-[350px] rounded-lg overflow-hidden border border-gray-200">
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
          libraries={["places"]}
        >
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapId={
              process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "DEMO_MAP_ID"
            }
          >
            <MapInitializer initialPosition={position} />
            <MapClickHandler onMapClick={handleMapClick} />
            <SearchBox
              onPlaceSelected={handlePlaceSelected}
              onAddressFromPlace={handleAddressFromPlace}
            />

            {position && (
              <AdvancedMarker position={position}>
                <div className="bg-[#0085FF] text-white font-bold text-xs px-2.5 py-1.5 rounded-full shadow-md border-2 border-white">
                  📍
                </div>
              </AdvancedMarker>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* Lat/Lng Display */}
      {position && (
        <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <span translate="no">
            <strong>Lat:</strong> {position.lat.toFixed(6)}
          </span>
          <span translate="no">
            <strong>Lng:</strong> {position.lng.toFixed(6)}
          </span>
        </div>
      )}
    </div>
  );
}
