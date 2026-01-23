import useClientApi from "../useClientApi";
import { useServerApi } from "@/Hooks/useServerApi";

// =======================================================
//  CSR (Client Side Rendering) — NO CACHE
export const useGetProperties = (filters: any = {}) => {
  const sortMap: Record<string, string> = {
    "Newest First": "createdAt_desc",
    "Price: Low to High": "price_asc",
    "Price: High to Low": "price_desc",
    "Most Popular": "popularity_desc",
  };

  const queryParams = new URLSearchParams();

  if (filters?.propertyType && filters?.propertyType !== "All")
    queryParams.append("propertyType", filters.propertyType.toLowerCase());

  if (filters?.minPrice) queryParams.append("minPrice", filters.minPrice);
  if (filters?.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
  if (filters?.bedrooms) queryParams.append("minBedrooms", filters.bedrooms);
  if (filters?.bathrooms) queryParams.append("minBathrooms", filters.bathrooms);
  if (filters?.location) queryParams.append("location", filters.location);

  if (filters?.sort)
    queryParams.append("sort", sortMap[filters.sort] || "createdAt_desc");

  queryParams.append("page", "1");
  queryParams.append("limit", "20");

  return useClientApi({
    method: "get",
    key: ["get-properties", filters],
    endpoint: `/all-listings?${queryParams.toString()}`,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });
};

// Why Choose Us
export const useWhyChoose = () => {
  return useClientApi({
    method: "get",
    key: ["why-choose-us"],
    endpoint: "/get-why-sell-with-us-section",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Why it Works
export const whyitWorks = () => {
  return useClientApi({
    method: "get",
    key: ["whyitwork"],
    endpoint: "/get-how-it-works-section",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// Seller Banner
export const forSellerBanner = () => {
  return useClientApi({
    method: "get",
    key: ["forsellerbanner"],
    endpoint: "/get-sellers-hero",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// List Property Browse
export const ListPropertyBrowse = () => {
  return useClientApi({
    method: "get",
    key: ["list-property-browse"],
    endpoint: "/list-property-sections",
    isPrivate: false,
    queryOptions: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  });
};

// =======================================================
//  SSR (Server Side Rendering) — NO CACHE (REAL TIME)

export async function getFeaturedListings() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/get-featured-properties",
  });
}

// Get Category
export async function Category() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/get-category-section",
  });
}

// Why Choose Us
export async function Whychooseus() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/get-why-sell-with-us-section",
  });
}

// Landing Banner
export async function Banner() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/get-property-hero",
  });
}

// List Property
export async function ListProperty() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/list-property-sections",
  });
}

// =======================================================
// Site Settings — NO CACHE

export async function getSiteSettings() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/api/site-settings",
  });
}
