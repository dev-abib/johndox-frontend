import { useServerApi } from "@/Hooks/useServerApi";
import useClientApi from "../useClientApi";

// =======================================================
//  CSR (Client Side Rendering)
export const useGetProperties = (filters: any) => {
  const sortMap: Record<string, string> = {
    "Newest First": "createdAt_desc",
    "Price: Low to High": "price_asc",
    "Price: High to Low": "price_desc",
    "Most Popular": "popularity_desc",
  };

  const queryParams = new URLSearchParams();

  if (filters?.propertyType && filters?.propertyType !== "All")
    queryParams.append("propertyType", filters.propertyType.toLowerCase());

  if (filters?.minPrice) queryParams.append("minPrice", filters?.minPrice);
  if (filters?.maxPrice) queryParams.append("maxPrice", filters?.maxPrice);
  if (filters?.bedrooms) queryParams.append("minBedrooms", filters?.bedrooms);
  if (filters?.bathrooms)
    queryParams.append("minBathrooms", filters?.bathrooms);
  if (filters?.location) queryParams.append("location", filters?.location);
  if (filters?.sort)
    queryParams.append("sort", sortMap[filters.sort] || "createdAt_desc");

  queryParams.append("page", "1");
  queryParams.append("limit", "20");

  return useClientApi({
    method: "get",
    key: ["get-properties", filters],
    endpoint: `/all-listings?${queryParams.toString()}`,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60,
    },
  });
};

// =======================================================

// All CSR here.....

// =======================================================
//  SSR (Server Side Rendering)

export async function getFeaturedListings() {
  return useServerApi({
    mode: "ISR",
    revalidate: 3600,
    endpoint: "/get-featured-properties",
  });
}
// =======================================================

// Site Settings
export async function getSiteSettings() {
  return useServerApi({
    mode: "ISR",
    revalidate: 86400,
    endpoint: "/api/site-settings",
  });
}
