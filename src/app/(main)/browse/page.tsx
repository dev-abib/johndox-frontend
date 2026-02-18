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
  SideBarSvg,
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

const page = () => {
  const { mutate } = AddFavourite();
  const [open, setOpen] = useState(false);
  const { data: cta } = ListPropertyBrowse();
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState("Newest First");
  const [loadingFavorites, setLoadingFavorites] = useState<
    Record<string, boolean>
  >({});

  const [activeFilters, setActiveFilters] = useState<any>({});
  const [propertyType, setPropertyType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState("Newest First");
  const { data, isLoading } = useGetProperties(activeFilters);
  const router = useRouter();
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

    // start loader for this item
    setLoadingFavorites(prev => ({ ...prev, [id]: true }));

    // optimistic UI
    setFavoriteStates(prev => ({
      ...prev,
      [id]: !prev[id],
    }));

    mutate(
      {
        endpoint: `/toggle-favourite-listing/${id}`,
      },
      {
        onSettled: () => {
          setLoadingFavorites(prev => ({ ...prev, [id]: false }));
        },
        onError: () => {
          setFavoriteStates(prev => ({
            ...prev,
            [id]: !prev[id],
          }));
        },
      },
    );
  };

  const options = [
    "Newest First",
    "Price: Low to High",
    "Price: High to Low",
    "Most Popular",
  ];

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

  if (isLoading) {
    return <BrowseDetailsSkeleton />;
  }

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (!isMobile || !ref.current) return;

    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
      timeoutRef.current = setTimeout(() => {
        setHoveredPropertyId(null);
      }, 200);
    };

    return (
      <Map
        style={{ width: "100%", height: "100%", borderRadius: "12px" }}
        defaultZoom={3}
        gestureHandling="greedy"
        defaultCenter={{ lat: 0, lng: 0 }}
        disableDefaultUI
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
                      <p className="text-[10px] text-gray-500 truncate w-[120px]">
                        {item.propertyName}
                      </p>
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

  return (
    <>
      <div className="px-4 sm:px-6 mb-[100px] sm:mb-[150px]">
        <div className="">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-4 lg:mb-6">
            <div className="">
              <h2 className="font-semibold text-[#212B36] lg:text-[28px] text-lg">
                Browse Properties
              </h2>
              <p className="font-normal text-[#212B36] lg:text-base text-sm">
                Find your perfect property
              </p>
            </div>
            <div className="xl:-ml-[200px]">
              <h2 className="font-semibold text-[#212B36] lg:text-[28px] text-lg ">
                Real Estate & Homes For Rent
              </h2>
              <p className="font-normal text-[#212B36] lg:text-base text-sm">
                ( Showing {displayedProperties?.length} properties )
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="relative inline-block w-full lg:w-[200px]">
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
                      className="flex w-full items-center justify-between px-1 py-2 hover:bg-gray-100 transition"
                    >
                      <span className="lg:text-lg text-sm">{option}</span>
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
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="block lg:hidden order-1 mt-6">
            <div className="rounded-2xl border border-[#E7E7E7] shadow-[0_0_8px_0_rgba(145,158,171,0.24)] bg-white p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
              </div>

              <div className="block lg:hidden order-1 my-6">
                <div className="flex bg-[#F3F3F4] p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${viewMode === "list" ? "bg-white text-primary-blue shadow-sm" : "text-gray-500"}`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setViewMode("map")}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${viewMode === "map" ? "bg-white text-primary-blue shadow-sm" : "text-gray-500"}`}
                  >
                    Map View
                  </button>
                </div>
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
                    value={location}
                    onChange={e => setLocation(e.target.value)}
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
                        className={`h-9 w-9 rounded-lg border border-[#C4CDD5] text-sm cursor-pointer ${
                          bedrooms === num
                            ? "bg-primary-blue text-white border-[#C4CDD5]"
                            : "hover:bg-gray-100 border-[#C4CDD5]"
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
                        className={`h-9 w-9 rounded-lg border text-sm cursor-pointer ${
                          bathrooms === num
                            ? "bg-primary-blue text-white border-[#C4CDD5]"
                            : "hover:bg-gray-100 border-[#C4CDD5]"
                        }`}
                      >
                        {num === 5 ? "5+" : num}
                      </button>
                    ))}
                  </div>
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
          </div>
          <div
            ref={listRef}
            className={`w-full lg:flex-grow lg:w-[60%] order-2 lg:order-2 ${
              isMobile && viewMode !== "list" ? "hidden" : "block"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 xl:gap-11">
              {displayedProperties?.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-white shadow-lg rounded-[28px] overflow-hidden group hover:shadow-2xl transition-all duration-500 px-4.5 pt-4.5 pb-7.5"
                >
                  <div className="relative overflow-hidden">
                    <figure className="h-[260px] sm:h-[280px] lg:h-[300px] overflow-hidden">
                      <Image
                        src={item.media?.[0]?.url}
                        alt={item.propertyName}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
                      />
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
                    <h3 className="text-xl lg:text-2xl xl:text-[28px] font-bold text-[#0085FF]">
                      {new Intl.NumberFormat().format(item.price)}
                      <span className="text-lg lg:text-[18px] font-medium text-[#919191] pl-1">
                        USD
                      </span>
                    </h3>

                    <h4 className="text-base lg:text-lg xl:text-[24px] font-medium text-[#5F5F5F] mt-3 line-clamp-2">
                      {item.propertyName}
                    </h4>

                    <div className="flex items-center gap-2.5 mt-4">
                      <Location className="w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
                      <p className="text-base lg:text-lg xl:text-[18px] font-medium text-[#919191]">
                        {item.city}, {item.state}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-5 mt-5">
                      <div className="flex items-center gap-2.5">
                        <Bed className="shrink-0" />
                        <span className="text-sm lg:text-[14px] font-normal text-[#919191]">
                          {item.bedrooms} Bed
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Bathtub className="shrink-0" />
                        <span className="text-sm lg:text-[14px] font-normal text-[#919191]">
                          {item.bathrooms} Bath
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Acceleration className="shrink-0" />
                        <span className="text-sm lg:text-[14px] font-normal text-[#919191]">
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
                <div className="text-center">
                  <button
                    onClick={() => setShowAll(true)}
                    className="bg-[#0085FF] text-white font-medium text-lg px-10 py-4 rounded-2xl transition-all shadow-lg hover:bg-white hover:text-black border border-blue-600 cursor-pointer flex justify-end"
                  >
                    View All Properties
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            ref={mapRef}
            className={`w-full lg:w-[40%] h-[500px] lg:h-[calc(100vh-150px)] lg:sticky lg:top-[20px] order-2 lg:order-1 relative ${
              isMobile && viewMode !== "map" ? "hidden" : "block"
            }`}
          >
            <APIProvider
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            >
              <MapContent properties={data?.data?.items || []} />
            </APIProvider>
          </div>

          <div
            className={`hidden lg:block flex-grow transition-all duration-300 overflow-hidden order-3 ${
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
                    value={location}
                    onChange={e => setLocation(e.target.value)}
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
                        className={`h-9 w-9 rounded-lg border border-[#C4CDD5] text-sm cursor-pointer ${
                          bedrooms === num
                            ? "bg-primary-blue text-white border-[#C4CDD5]"
                            : "hover:bg-gray-100 border-[#C4CDD5]"
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
                        className={`h-9 w-9 rounded-lg border text-sm cursor-pointer ${
                          bathrooms === num
                            ? "bg-primary-blue text-white border-[#C4CDD5]"
                            : "hover:bg-gray-100 border-[#C4CDD5]"
                        }`}
                      >
                        {num === 5 ? "5+" : num}
                      </button>
                    ))}
                  </div>
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
          </div>
          {!showSidebar && (
            <div
              onClick={() => setShowSidebar(true)}
              className="hidden lg:block cursor-pointer order-4"
            >
              <SideBarSvg />
            </div>
          )}
        </div>
      </div>
      <section
        className="relative w-full  py-16 xl:py-24 px-6 flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/VW8vzVDx/Group-35-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="relative z-10 ">
          <h2 className=" text-2xl 2xl:text-[32px] font-semibold leading-8 xl:leading-[48px] text-[#212B36] mb-4">
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
