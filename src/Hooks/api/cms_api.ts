import { useServerApi } from "@/Hooks/useServerApi";

// =======================================================
//  CSR (Client Side Rendering)
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
