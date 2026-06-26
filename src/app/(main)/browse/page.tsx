"use client";
import {
  Acceleration,
  Bathtub,
  Bed,
  Favourite,
  Favourites,
  Location,
} from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import {
  AngleBottomSvg,
  SideBarCloseSvg,
} from "@/Components/Svg/SvgContainer2";
import { ListPropertyBrowse, useGetProperties } from "@/Hooks/api/cms_api";
import { BrowseDetailsSkeleton } from "@/Components/Skeleton/BrowseDetailsSkeleton";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { usePathname, useRouter } from "next/navigation";
import { AddFavourite, usePropertyView } from "@/Hooks/api/post_api";

// ─── Shared Filter Panel ───────────────────────────────────────────────────────
const FilterPanel = ({
  listingType,
  setListingType,
  propertyType,
  setPropertyType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  location,
  setLocation,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  handleSearch,
  onClose,
}: any) => (
  <div className="rounded-2xl border border-[#E7E7E7] shadow-[0_0_8px_0_rgba(145,158,171,0.24)] bg-white p-6">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">Filters</h2>
      {onClose && (
        <span onClick={onClose} className="text-gray-400 cursor-pointer">
          <SideBarCloseSvg />
        </span>
      )}
    </div>

    {/* Fix: Added Buy or Rental Tab Switcher */}
    <div className="mb-6">
      <div className="flex bg-[#F3F3F4] p-1 rounded-xl">
        <button
          type="button"
          onClick={() => setListingType("buy")}
          className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-all cursor-pointer ${
            listingType === "buy"
              ? "bg-white text-primary-blue shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setListingType("rent")}
          className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-all cursor-pointer ${
            listingType === "rent"
              ? "bg-white text-primary-blue shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Rent
        </button>
      </div>
    </div>

    {/* PROPERTY TYPE */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Property Type</h3>
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

    {/* PRICE RANGE */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Price Range</h3>
      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder="$10k"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="w-full rounded-lg border border-[#C4CDD5] px-3 py-2 text-sm"
        />
        <span className="text-sm text-gray-500">To</span>
        <input
          type="number"
          placeholder="$500k"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="w-full rounded-lg border border-[#C4CDD5] px-3 py-2 text-sm"
        />
      </div>
    </div>

    {/* LOCATION */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Location</h3>
      <input
        placeholder="City or State"
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="w-full rounded-lg border border-[#C4CDD5] px-3 py-2 text-sm"
      />
    </div>

    {/* FEATURE */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Feature</h3>
      <p className="text-sm text-gray-600 mb-2">Bedrooms</p>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            onClick={() => setBedrooms(num)}
            className={`h-9 w-9 rounded-lg border border-[#C4CDD5] text-sm cursor-pointer ${
              bedrooms === num
                ? "bg-primary-blue text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {num === 5 ? "5+" : num}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-2">Bathrooms</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            onClick={() => setBathrooms(num)}
            className={`h-9 w-9 rounded-lg border border-[#C4CDD5] text-sm cursor-pointer ${
              bathrooms === num
                ? "bg-primary-blue text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {num === 5 ? "5+" : num}
          </button>
        ))}
      </div>
    </div>

    {/* SEARCH */}
    <button
      onClick={handleSearch}
      className="w-full rounded-xl cursor-pointer bg-primary-blue py-3 text-white text-sm font-medium hover:opacity-90 transition"
    >
      Search
    </button>
  </div>
);

// ─── Page ──────────────────────────────────────────────────────────────────────
const page = () => {
  const router = useRouter();
  const { mutate } = AddFavourite();
  const [open, setOpen] = useState(false);
  const { data: cta } = ListPropertyBrowse();
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState("Newest First");
  const [loadingFavorites, setLoadingFavorites] = useState<
    Record<string, boolean>
  >({});
  // State for full image modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState<any>({});

  // Handle Escape key and body scroll when modal is open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  // Fix: Setup state hook for listing status selection ("buy" or "rent")
  const [listingType, setListingType] = useState("buy");
  const [propertyType, setPropertyType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState("Newest First");
  const { data, isLoading } = useGetProperties(activeFilters);
  const propertyViewMutation = usePropertyView();
  const listRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const handleContact = async (id: string) => {
    if (!id) return;
    try {
      await propertyViewMutation.mutateAsync({
        endpoint: `/property/${id}/view`,
      });
      router.push(`/browse/${id}`);
    } catch (err) {
      console.error("Tracking failed, navigating anyway", err);
      router.push(`/browse/${id}`);
    }
  };

  const handleSearch = () => {
    const filters = {
      // Fix: Feed status into request mapping schema fields
      listingType: listingType,
      propertyType:
        propertyType === "All" ? undefined : propertyType.toLowerCase(),
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      location: location || undefined,
      minBedrooms: bedrooms || undefined,
      minBathrooms: bathrooms || undefined,
      sort:
        selectedSort === "Price: Low to High"
          ? "price_asc"
          : selectedSort === "Price: High to Low"
            ? "price_desc"
            : "newest",
    };
    setActiveFilters(filters);
  };

  const pathname = usePathname();
  const isBuyerLayout = pathname.startsWith("/buyerlayout");

  const displayedProperties = showAll
    ? data?.data?.items
    : data?.data?.items?.slice(0, 4);

  const [favoriteStates, setFavoriteStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const items = data?.data?.items;
    if (items && items.length > 0) {
      const initialFavorites = Object.fromEntries(
        items.map((item: any) => [item._id, item.isFavorite || false]),
      );
      setFavoriteStates(initialFavorites);
    }
  }, [data]);

  const toggleFavorite = (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add favourites");
      return;
    }
    setLoadingFavorites(prev => ({ ...prev, [id]: true }));
    setFavoriteStates(prev => ({ ...prev, [id]: !prev[id] }));
    mutate(
      { endpoint: `/toggle-favourite-listing/${id}` },
      {
        onSettled: () =>
          setLoadingFavorites(prev => ({ ...prev, [id]: false })),
        onError: () =>
          setFavoriteStates(prev => ({ ...prev, [id]: !prev[id] })),
      },
    );
  };

  const options = [
    "Newest First",
    "Price: Low to High",
    "Price: High to Low",
    "Most Popular",
  ];

  if (isLoading) {
    return <BrowseDetailsSkeleton />;
  }

  const MapContent = ({ properties }: { properties: any[] }) => {
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(
      null,
    );
    const map = useMap();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (!map || !properties || properties.length === 0) return;
      const bounds = new google.maps.LatLngBounds();
      properties.forEach(item => {
        if (item.location?.lat && item.location?.lng) {
          bounds.extend({ lat: item.location.lat, lng: item.location.lng });
        }
      });
      map.fitBounds(bounds);
    }, [map, properties]);

    const handleMouseEnter = (id: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setHoveredPropertyId(id);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => setHoveredPropertyId(null), 200);
    };

    return (
      <Map
        style={{ width: "100%", height: "100%", borderRadius: "12px" }}
        defaultZoom={3}
        gestureHandling="greedy"
        defaultCenter={{ lat: 0, lng: 0 }}
        disableDefaultUI
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "DEMO_MAP_ID"}
      >
        {properties?.map(item => (
          <React.Fragment key={item._id}>
            <Marker
              position={{ lat: item.location.lat, lng: item.location.lng }}
              onMouseOver={() => handleMouseEnter(item._id)}
              onMouseOut={handleMouseLeave}
            />
            {hoveredPropertyId === item._id && (
              <InfoWindow
                position={{ lat: item.location.lat, lng: item.location.lng }}
                pixelOffset={[0, -35]}
                headerDisabled={true}
              >
                <Link
                  href={`${isBuyerLayout ? `/buyerlayout/browse/${item._id}` : `/browse/${item._id}`}`}
                >
                  <div
                    className="p-1 cursor-pointer outline-none bg-white rounded-lg"
                    onMouseEnter={() => handleMouseEnter(item._id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative w-[130px] h-[90px] mb-1">
                      <Image
                        src={item.media?.[0]?.url}
                        alt={item.propertyName}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#0085FF] font-bold text-sm">
                        ${new Intl.NumberFormat().format(item.price)}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate w-[120px]"></p>
                    </div>
                  </div>
                </Link>
              </InfoWindow>
            )}
          </React.Fragment>
        ))}
      </Map>
    );
  };

  // shared filter props
  const filterProps = {
    listingType,
    setListingType,
    propertyType,
    setPropertyType,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    location,
    setLocation,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    handleSearch,
  };

  return (
    <>
      <div className="px-4 sm:px-6 mb-[100px] sm:mb-[150px]">
        {/* ── Header Row ── */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-4 lg:mb-6">
          <div>
            <h2 className="font-semibold text-[#212B36] lg:text-[28px] text-lg">
              Browse Properties
            </h2>
            <p className="font-normal text-[#212B36] lg:text-base text-sm">
              Find your perfect property
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[#212B36] lg:text-[28px] text-lg">
              Real Estate & Homes For Rent
            </h2>
            <p className="font-normal text-[#212B36] lg:text-base text-sm">
              ( Showing {displayedProperties?.length} properties )
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-auto">
            <div className="relative w-full lg:w-[220px]">
              <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-2.5 rounded-lg border border-[#E7E7E7] bg-[#F3F3F4] px-3 py-3 shadow-sm hover:bg-gray-50 transition"
              >
                <span>{selected}</span>
                <span
                  className={`transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
                >
                  <AngleBottomSvg />
                </span>
              </button>
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
                    className="flex w-full items-center justify-between px-3 py-2 hover:bg-gray-100 transition"
                  >
                    <span className="lg:text-lg text-sm text-left">
                      {option}
                    </span>
                    {selected === option && (
                      <FaCheck className="text-primary-blue text-xs shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
          {/* ── MOBILE: List/Map toggle + Filter ── */}
          <div className="block xl:hidden order-1 mt-6">
            <div className="flex bg-[#F3F3F4] p-1 rounded-xl mb-4">
              <button
                onClick={() => setViewMode("list")}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-white text-primary-blue shadow-sm"
                    : "text-gray-500"
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "map"
                    ? "bg-white text-primary-blue shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Map View
              </button>
            </div>
            <FilterPanel {...filterProps} />
          </div>

          {/* ── Property List — order-1 on desktop ── */}
          <div
            ref={listRef}
            className={`w-full xl:flex-1 order-2  ${
              isMobile && viewMode !== "list" ? "hidden" : "block"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4 sm:gap-6">
              {displayedProperties?.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-white shadow-lg rounded-[28px] overflow-hidden group hover:shadow-2xl transition-all duration-500 px-4.5 pt-4.5 pb-7.5"
                >
                  <div className="relative overflow-hidden">
                    <figure className="h-[260px] sm:h-[280px] lg:h-[300px] overflow-hidden rounded-lg relative group/image">
                      <Image
                        src={item.media?.[0]?.url}
                        alt={item.propertyName}
                        width={500}
                        height={300}
                        onClick={() => setSelectedImage(item.media?.[0]?.url)}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 rounded-lg"
                      />
                      {/* Hover Overlay with Click Indicator */}
                      <div
                        className="absolute inset-0 bg-black/0 group-hover/image:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center cursor-pointer"
                        onClick={() => setSelectedImage(item.media?.[0]?.url)}
                      >
                        <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                          <div className="bg-white/95 p-3 rounded-full">
                            <svg
                              className="w-6 h-6 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                              />
                            </svg>
                          </div>
                          <span className="text-white font-medium text-sm">
                            Click to view
                          </span>
                        </div>
                      </div>
                    </figure>
                    <div
                      onClick={() =>
                        !loadingFavorites[item._id] && toggleFavorite(item._id)
                      }
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full cursor-pointer hover:bg-white transition-colors"
                    >
                      {loadingFavorites[item._id] ? (
                        <span className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : favoriteStates[item._id] ? (
                        <Favourites />
                      ) : (
                        <Favourite />
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-xl lg:text-2xl xl:text-[28px] font-bold text-[#0085FF]" translate="no">
                      ${item?.price?.toLocaleString()}
                      <span className="text-lg lg:text-[18px] font-medium text-[#919191] pl-1">
                        USD
                      </span>
                    </h3>
                    <h4 className="text-base lg:text-lg xl:text-[24px] font-medium text-[#5F5F5F] mt-3 line-clamp-1" translate="no">
                      {item.propertyName}
                    </h4>
                    <div className="flex items-center gap-2.5 mt-4">
                      <Location className="w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
                      <p className="text-base lg:text-lg xl:text-[18px] font-medium text-[#919191] line-clamp-1" translate="no">
                        {item.city}, {item.state}
                      </p>
                    </div>
                    <div className="flex flex-nowrap items-center gap-5 mt-5 overflow-hidden line-clamp-1">
                      <div className="flex items-center gap-2.5 shrink-0">
                        <Bed className="shrink-0" />
                        <span className="text-sm lg:text-[14px] font-normal text-[#919191] whitespace-nowrap" translate="no">
                          {item.bedrooms} Bed
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <Bathtub className="shrink-0" />
                        <span className="text-sm lg:text-[14px] font-normal text-[#919191] whitespace-nowrap" translate="no">
                          {item.bathrooms} Bath
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <Acceleration className="shrink-0" />
                        <span className="text-sm lg:text-[14px] font-normal text-[#919191] whitespace-nowrap" translate="no">
                          {item.areaInSqMeter} m²
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleContact(item._id)}
                      className="mt-8 w-full bg-[#0085FF] text-white font-medium text-base lg:text-lg py-3 xl:py-4 rounded-2xl hover:bg-transparent hover:text-[#0085FF] border border-[#0085FF] transition-all duration-300 cursor-pointer"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              ))}

              {!showAll && data?.data?.items?.length > 4 && (
                <div className="col-span-full text-center">
                  <button
                    onClick={() => setShowAll(true)}
                    className="bg-[#0085FF] text-white font-medium text-lg px-10 py-4 rounded-2xl transition-all shadow-lg hover:bg-white hover:text-black border border-blue-600 cursor-pointer"
                  >
                    View All Properties
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Map — order-2 on desktop ── */}
          <div
            ref={mapRef}
            className={`w-full xl:w-[35%] h-[500px] lg:h-[calc(100vh-150px)] xl:sticky lg:top-[20px] order-1 relative shrink-0 overflow-hidden ${
              isMobile && viewMode !== "map" ? "hidden" : "block"
            }`}
          >
            <div className="w-full h-full">
              <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              >
                <MapContent properties={data?.data?.items || []} />
              </APIProvider>
            </div>
          </div>

          {/* ── DESKTOP: Filter always visible — order-3 = RIGHT SIDE ── */}
          <div className="hidden lg:block w-[280px] shrink-0 order-3">
            <div className="sticky top-[20px]">
              <FilterPanel {...filterProps} />
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl h-[90vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button (X) */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2 z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image Display Container */}
            <div className="relative w-full h-full  rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="Property full view"
                fill
                priority
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── CTA Section ── */}
      <section
        className="relative w-full py-16 xl:py-24 px-6 flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/VW8vzVDx/Group-35-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="relative z-10">
          <h2 className="text-2xl 2xl:text-[32px] font-semibold leading-8 xl:leading-[48px] text-[#212B36] mb-4">
            {cta?.data?.title}
          </h2>
          <p className="2xl:text-[24px] font-semibold xl:leading-[36px] text-[#454F5B] mb-5 xl:mb-10">
            {cta?.data?.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href={"/browse"}>
              <button className="px-8 cursor-pointer xl:text-xl py-2.5 xl:py-[20px] rounded-xl bg-primary-blue text-white font-medium hover:bg-primary-blue transition">
                {cta?.data?.btnTxt?.[0] ?? "Start Selling Today"}
              </button>
            </Link>
            <Link href={"/pricing"}>
              <button className="px-8 cursor-pointer xl:text-xl py-2.5 xl:py-[20px] rounded-xl border-2 border-primary-blue text-primary-blue font-medium hover:bg-blue-50 transition">
                {cta?.data?.btnTxt?.[1] ?? "View Pricing Plans"}
              </button>
            </Link>
          </div>
          <p className="text-[#212B36] xl:text-lg">
            No credit card required. Get started in minutes.
          </p>
        </div>
      </section>
    </>
  );
};

export default page;
