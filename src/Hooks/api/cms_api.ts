import { useServerApi } from "@/Hooks/useServerApi";
import useClientApi from "../useClientApi";

// =======================================================
//  CSR (Client Side Rendering)
export const useGetProperties = () => {
  return useClientApi({
    method: "get",
    key: ["get-properties"],
    endpoint:
      "/all-listings?propertyType=house&sort=price_asc&minBedrooms=3&location=Dhaka&page=1&limit=10",
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
    endpoint:
      "/all-listings?propertyType=house&sort=price_asc&minBedrooms=3&location=Dhaka&page=1&limit=10",
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
